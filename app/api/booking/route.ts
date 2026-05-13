import { NextResponse } from "next/server";
import { clinicContent } from "@/lib/clinic-content";

export const runtime = "nodejs";

type BookingBody = {
  company?: string;
  name?: string;
  phone?: string;
  email?: string;
  reason?: string;
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
  const language = trimField(body.language, 20);
  const company = trimField(body.company, 200);

  // Honeypot spam protection
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone || !reason) {
    return NextResponse.json(
      { error: "Name, phone, and reason for visit are required." },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please call the clinic." },
      { status: 429 }
    );
  }

  const clinicDetails = clinicContent as typeof clinicContent & {
    phone?: string;
    address?: string;
    email?: string;
    name?: string;
  };

  const clinicPhone = clinicDetails.phone?.trim() || "Please contact the clinic directly.";
  const clinicAddress = clinicDetails.address?.trim() || "Please visit our website for location details.";

  const to =
    process.env.BOOKING_TO_EMAIL?.trim() ||
    clinicDetails.email?.trim();

  const from = process.env.BOOKING_FROM_EMAIL?.trim();

  if (!process.env.RESEND_API_KEY || !from || !to) {
    return NextResponse.json(
      { error: "Booking email is not configured. Please call the clinic." },
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
    "Reason for visit:",
    reason,
    "",
    `Submitted at: ${new Date().toISOString()}`,
  ].join("\n");

  // 1. Send booking request to the clinic/support inbox
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
      { error: "Could not send notification. Please call the clinic." },
      { status: 502 }
    );
  }

  let confirmationSent = false;

  // 2. Send polished confirmation email to the customer
  if (email) {
    const confirmationText = [
      `Hi ${name},`,
      "",
      `Thank you for contacting ${CLINIC_DISPLAY_NAME}.`,
      "",
      "This email confirms that we have received your appointment request.",
      "",
      "Our team will review your request and get back to you within approximately 6–12 hours.",
      "",
      "Please note that this request does not confirm an appointment time until a member of our team contacts you directly.",
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
      subject: `We received your appointment request - ${CLINIC_DISPLAY_NAME}`,
      text: confirmationText,
      to: email,
    });

    if (!confirmationResult.ok) {
      console.error("Resend customer confirmation error:", confirmationResult.error);
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