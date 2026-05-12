import { NextResponse } from "next/server";
import { clinicContent } from "@/lib/clinic-content";

export const runtime = "nodejs";

type BookingBody = {
  name?: string;
  phone?: string;
  email?: string;
  reason?: string;
  language?: string;
};

const MAX_LEN = 4000;

function trimField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function sendViaResend(payload: {
  to: string;
  from: string;
  subject: string;
  text: string;
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
      to: [payload.to],
      subject: payload.subject,
      text: payload.text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return { ok: false, error: errText || res.statusText };
  }
  return { ok: true };
}

async function sendViaFormSubmit(
  toEmail: string,
  fields: Record<string, string>
): Promise<{ ok: boolean; error?: string }> {
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      _subject: `Appointment request — ${clinicContent.name}`,
      _captcha: false,
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

  if (!name || !phone || !reason) {
    return NextResponse.json(
      { error: "Name, phone, and reason for visit are required." },
      { status: 400 }
    );
  }

  const to =
    process.env.BOOKING_TO_EMAIL?.trim() || clinicContent.email.trim();
  if (!to) {
    return NextResponse.json(
      { error: "Server is not configured to receive bookings." },
      { status: 503 }
    );
  }

  const textLines = [
    `Clinic: ${clinicContent.name}`,
    `Language preference (if provided): ${language || "—"}`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || "—"}`,
    ``,
    `Reason for visit:`,
    reason,
    ``,
    `Submitted at: ${new Date().toISOString()}`,
  ];
  const text = textLines.join("\n");

  if (process.env.RESEND_API_KEY) {
    const from = process.env.BOOKING_FROM_EMAIL?.trim();
    if (!from) {
      return NextResponse.json(
        { error: "BOOKING_FROM_EMAIL is required when using Resend." },
        { status: 503 }
      );
    }
    const result = await sendViaResend({
      to,
      from,
      subject: `Appointment request — ${name}`,
      text,
    });
    if (!result.ok) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Could not send notification. Please call the clinic." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, channel: "resend" });
  }

  const result = await sendViaFormSubmit(to, {
    name,
    phone,
    email: email || "not provided",
    reason,
    language: language || "not specified",
  });

  if (!result.ok) {
    console.error("FormSubmit error:", result.error);
    return NextResponse.json(
      { error: "Could not send notification. Please call the clinic." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, channel: "formsubmit" });
}
