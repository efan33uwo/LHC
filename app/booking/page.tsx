"use client";

import { FormEvent, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionTitle from "@/components/section-title";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

export default function BookingPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          reason,
          language,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || t(language, "bookingSubmitError"));
        return;
      }

      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setCompany("");
      setReason("");
    } catch {
      setStatus("error");
      setErrorMessage(t(language, "bookingSubmitError"));
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-green-500";
  const labelClass =
    "mb-2 block text-xs font-medium uppercase tracking-wide text-slate-600";

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-slate-800">
      <Header
        clinicName={clinicContent.name}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionTitle
              eyebrow={t(language, "bookingPageEyebrow")}
              title={t(language, "bookingPageTitle")}
              subtitle={t(language, "bookingPageSubtitle")}
            />
          </div>
        </section>

        <section className="bg-green-50/60 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionTitle
                eyebrow={t(language, "navBooking")}
                title="Request an Appointment"
                subtitle="Complete the form below and the clinic will follow up to confirm the next available appointment."
              />

              <div className="mt-8 space-y-6 text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  Please provide your contact details and a short reason for your
                  visit. This helps the clinic review your request and respond
                  appropriately.
                </p>
                <p>
                  If your concern is urgent, please contact the clinic directly
                  by phone or seek emergency medical care when appropriate.
                </p>
              </div>

              <div className="mt-10 border-3 rounded-[1.5rem] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Clinic Contact
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <p>{clinicContent.phone}</p>
                  <p>{clinicContent.email}</p>
                  <p>{clinicContent.address}</p>
                  <p>{clinicContent.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
              {status === "success" ? (
                <p
                  className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
                  role="status"
                >
                  {t(language, "bookingSubmitSuccess")}
                </p>
              ) : null}

              {status === "error" && errorMessage ? (
                <p
                  className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm text-slate-700 sm:col-span-2">
                  <span className={labelClass}>{t(language, "bookingFormName")}</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="text-sm text-slate-700">
                  <span className={labelClass}>{t(language, "bookingFormPhone")}</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="text-sm text-slate-700">
                  <span className={labelClass}>{t(language, "bookingFormEmail")}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="text-sm text-slate-700 sm:col-span-2">
                  <span className={labelClass}>{t(language, "bookingFormReason")}</span>
                  <textarea
                    name="reason"
                    rows={6}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="hidden" aria-hidden="true">
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </label>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-green-200 px-6 py-3 text-sm font-medium text-green-950 transition hover:bg-green-300 disabled:opacity-60"
                  >
                    {status === "sending"
                      ? t(language, "bookingSubmitSending")
                      : t(language, "bookingFormSubmit")}
                  </button>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {t(language, "bookingFormNote")}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer
        clinicName={clinicContent.name}
        tagline={t(language, "footerTagline")}
        copyright={t(language, "footerCopyright")}
        phone={clinicContent.phone}
        email={clinicContent.email}
        address={clinicContent.address}
        hours={clinicContent.hours}
      />
    </div>
  );
}
