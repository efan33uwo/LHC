import { NextResponse } from "next/server";
import { isBookingTimeSlot } from "@/lib/booking-options";
import { clinicContent } from "@/lib/clinic-content";

export const runtime = "nodejs";

type BookingBody = {
  company?: string;
  name?: string;
  phone?: string;
  email?: string;
  reason?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  language?: string;
};

const MAX_LEN = 4000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();

const CLINIC_DISPLAY_NAME = "Langham Health Center";

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isChinese(language: string): boolean {
  return language.toLowerCase().startsWith("zh");
}

function localizedError(language: string, en: string, zh: string): string {
  return isChinese(language) ? zh : en;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = submissionsByIp.get(ip);

  if (!current || current.resetAt < now) {
    submissionsByIp.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

async function sendViaResend(payload: {
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  to: string;
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "Resend not configured" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      reply_to: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      to: [payload.to],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return { ok: false, error: errText || res.statusText };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  let body: BookingBody;

  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = trimField(body.name, 200);
  const phone = trimField(body.phone, 80);
  const email = trimField(body.email, 200);
  const reason = trimField(body.reason, MAX_LEN);
  const service = trimField(body.service, 200);
  const preferredDate = trimField(body.preferredDate, 20);
  const preferredTime = trimField(body.preferredTime, 40);
  const language = trimField(body.language, 20);
  const company = trimField(body.company, 200);

  // Honeypot spam protection.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone || !service || !preferredDate || !preferredTime) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Name, phone, service, preferred date, and preferred time are required.",
          "请填写姓名、电话，并选择服务项目、希望日期和希望时间。"
        ),
      },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Please enter a valid email address.",
          "请输入有效的电邮地址。"
        ),
      },
      { status: 400 }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Please choose a valid preferred date.",
          "请选择有效的希望日期。"
        ),
      },
      { status: 400 }
    );
  }

  const validServices = new Set([
    ...clinicContent.services.en.map((item) => item.title),
    ...clinicContent.services.zh.map((item) => item.title),
  ]);

  if (!validServices.has(service)) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Please choose a valid service.",
          "请选择有效的服务项目。"
        ),
      },
      { status: 400 }
    );
  }

  if (!isBookingTimeSlot(preferredTime)) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Please choose a valid preferred time.",
          "请选择有效的希望时间。"
        ),
      },
      { status: 400 }
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Too many requests. Please call the clinic.",
          "提交次数过多，请直接致电诊所。"
        ),
      },
      { status: 429 }
    );
  }

  const clinicDetails = clinicContent as typeof clinicContent & {
    phone?: string;
    address?: string;
    email?: string;
    name?: string;
  };

  const clinicPhone =
    clinicDetails.phone?.trim() || "Please contact the clinic directly.";
  const clinicAddress =
    clinicDetails.address?.trim() ||
    "Please visit our website for location details.";

  const to = process.env.BOOKING_TO_EMAIL?.trim() || clinicDetails.email?.trim();

  const from = process.env.BOOKING_FROM_EMAIL?.trim();

  if (!process.env.RESEND_API_KEY || !from || !to) {
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Booking email is not configured. Please call the clinic.",
          "预约电邮尚未设定，请直接致电诊所。"
        ),
      },
      { status: 503 }
    );
  }

  const clinicNotificationText = [
    `New appointment request for ${CLINIC_DISPLAY_NAME}`,
    "",
    "Patient Details",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "-"}`,
    `Language preference: ${language || "-"}`,
    "",
    "Appointment Request",
    `Requested service: ${service}`,
    `Preferred date: ${preferredDate}`,
    `Preferred time: ${preferredTime}`,
    "Note: preferred date/time is not confirmed until staff contacts the patient.",
    "",
    "Notes or symptoms:",
    reason || "-",
    "",
    `Submitted at: ${new Date().toISOString()}`,
  ].join("\n");

  const clinicResult = await sendViaResend({
    from,
    replyTo: email || undefined,
    subject: `New appointment request - ${name}`,
    text: clinicNotificationText,
    to,
  });

  if (!clinicResult.ok) {
    console.error("Resend clinic notification error:", clinicResult.error);
    return NextResponse.json(
      {
        error: localizedError(
          language,
          "Could not send notification. Please call the clinic.",
          "无法发送预约通知，请直接致电诊所。"
        ),
      },
      { status: 502 }
    );
  }

  let confirmationSent = false;

  if (email) {
    const confirmationText = isChinese(language)
      ? [
          `${name} 您好，`,
          "",
          `感谢您联系 ${CLINIC_DISPLAY_NAME}。`,
          "",
          "我们已经收到您的预约申请。",
          "",
          `申请服务：${service}`,
          `希望日期：${preferredDate}`,
          `希望时间：${preferredTime}`,
          "",
          "请注意：以上日期和时间只是您的偏好，并不代表预约已经确认。工作人员会查看申请，并联系您确认最接近的可预约时间。",
          "",
          "诊所资料",
          `电话：${clinicPhone}`,
          `地址：${clinicAddress}`,
          "",
          "如果情况紧急，请直接致电诊所，不要等待电邮回复。如有严重或紧急症状，请拨打 911 或前往急诊。",
          "",
          "谢谢，",
          CLINIC_DISPLAY_NAME,
        ].join("\n")
      : [
          `Hi ${name},`,
          "",
          `Thank you for contacting ${CLINIC_DISPLAY_NAME}.`,
          "",
          "This email confirms that we have received your appointment request.",
          "",
          `Requested service: ${service}`,
          `Preferred date: ${preferredDate}`,
          `Preferred time: ${preferredTime}`,
          "",
          "Please note that your preferred date and time are not confirmed until a member of our team contacts you directly.",
          "",
          "Our team will review your request and get back to you as soon as possible.",
          "",
          "Clinic Information",
          `Phone: ${clinicPhone}`,
          `Address: ${clinicAddress}`,
          "",
          "If your matter is urgent, please call the clinic directly instead of waiting for an email response.",
          "",
          "Thank you,",
          CLINIC_DISPLAY_NAME,
        ].join("\n");

    const confirmationResult = await sendViaResend({
      from,
      subject: isChinese(language)
        ? `我们已收到您的预约申请 - ${CLINIC_DISPLAY_NAME}`
        : `We received your appointment request - ${CLINIC_DISPLAY_NAME}`,
      text: confirmationText,
      to: email,
    });

    if (!confirmationResult.ok) {
      console.error(
        "Resend customer confirmation error:",
        confirmationResult.error
      );
    } else {
      confirmationSent = true;
    }
  }

  return NextResponse.json({
    ok: true,
    channel: "resend",
    confirmationSent,
  });
}
