"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Phone,
  ShieldAlert,
} from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { bookingTimeSlots } from "@/lib/booking-options";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

const bookingCopy = {
  en: {
    requestTitle: "Request an Appointment",
    requestSubtitle:
      "Choose the service, preferred day, and preferred time. The clinic will follow up to confirm the actual appointment.",
    introOne:
      "This form is for appointment requests only. It helps reception see what service you need and when you would prefer to come in.",
    introTwo:
      "Your selected time is not guaranteed. Staff will contact you with the closest available appointment time.",
    contactTitle: "Clinic Contact",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactAddress: "Address",
    contactHours: "Hours",
    stepContact: "Your contact information",
    stepService: "What service do you need?",
    stepTime: "Preferred date and time",
    stepNote: "Notes for reception",
    serviceHelp:
      "Choose the main reason for your appointment. If you are unsure, choose the closest option.",
    dateLabel: "Preferred date",
    timeLabel: "Preferred time",
    timeHelp:
      "This is only a preference. It is not confirmed until the clinic contacts you.",
    notesLabel: "Notes or symptoms",
    notesPlaceholder:
      "Example: pain area, claim number, recent injury, or anything staff should know.",
    optional: "Optional",
    requiredError:
      "Please enter your name, phone number, service, preferred date, and preferred time.",
    submitHelp:
      "After you submit, reception will review your request and contact you to confirm.",
    urgentNote:
      "For urgent or emergency symptoms, call 911 or go to the nearest emergency department. For same-day clinic matters, call the office.",
    selectedLabel: "Selected",
  },
  zh: {
    requestTitle: "提交预约申请",
    requestSubtitle:
      "请选择服务项目、希望日期和希望时间。诊所会再联系您确认真正的预约时间。",
    introOne:
      "此表格只是预约申请，方便前台了解您需要哪项服务，以及您希望什么时候到诊所。",
    introTwo:
      "您选择的时间不代表已经预约成功。工作人员会联系您，确认最接近的可预约时间。",
    contactTitle: "诊所联系方式",
    contactPhone: "电话",
    contactEmail: "电邮",
    contactAddress: "地址",
    contactHours: "营业时间",
    stepContact: "您的联系资料",
    stepService: "您需要哪项服务？",
    stepTime: "希望日期和时间",
    stepNote: "给前台的备注",
    serviceHelp: "请选择主要就诊原因。如果不确定，请选择最接近的一项。",
    dateLabel: "希望日期",
    timeLabel: "希望时间",
    timeHelp: "这只是希望时间，必须等诊所联系您后才算确认预约。",
    notesLabel: "症状或备注",
    notesPlaceholder: "例如：疼痛部位、理赔号码、近期受伤情况，或想让前台知道的事。",
    optional: "可不填",
    requiredError: "请填写姓名、电话，并选择服务项目、希望日期和希望时间。",
    submitHelp: "提交后，前台会查看您的申请并联系您确认。",
    urgentNote:
      "如有紧急或严重症状，请拨打 911 或前往最近的急诊。如需当天诊所协助，请直接致电诊所。",
    selectedLabel: "已选择",
  },
} as const;

const chineseTimeLabels: Record<string, string> = {
  "10:00 AM": "上午 10:00",
  "10:30 AM": "上午 10:30",
  "11:00 AM": "上午 11:00",
  "11:30 AM": "上午 11:30",
  "12:00 PM": "中午 12:00",
  "12:30 PM": "下午 12:30",
  "1:00 PM": "下午 1:00",
  "1:30 PM": "下午 1:30",
  "2:00 PM": "下午 2:00",
  "2:30 PM": "下午 2:30",
  "3:00 PM": "下午 3:00",
  "3:30 PM": "下午 3:30",
  "4:00 PM": "下午 4:00",
  "4:30 PM": "下午 4:30",
  "5:00 PM": "下午 5:00",
  "5:30 PM": "下午 5:30",
  "6:00 PM": "下午 6:00",
};

function timeLabel(slot: string, language: Language) {
  return language === "zh" ? chineseTimeLabels[slot] ?? slot : slot;
}

export default function BookingPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(
    null
  );
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copy = bookingCopy[language];
  const services = clinicContent.services[language];
  const selectedService =
    selectedServiceIndex === null ? null : services[selectedServiceIndex];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    if (!name || !phone || !selectedService || !preferredDate || !preferredTime) {
      setStatus("error");
      setErrorMessage(copy.requiredError);
      return;
    }

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
          service: selectedService.title,
          preferredDate,
          preferredTime,
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
      setSelectedServiceIndex(null);
      setPreferredDate("");
      setPreferredTime("");
    } catch {
      setStatus("error");
      setErrorMessage(t(language, "bookingSubmitError"));
    }
  }

  const inputClass =
    "w-full rounded-[4px] border border-[#bfcfc3] bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#2f6f4f] focus:ring-4 focus:ring-green-100";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-700";

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-slate-800">
      <Header
        clinicName={clinicContent.name}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main>
        <section className="border-b border-[#d8ded7] bg-white py-7 sm:py-8">
          <div className="mx-auto flex w-full max-w-[1600px] items-center gap-6 px-5 sm:px-8">
            <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden border border-[#d8ded7] bg-white p-1.5 shadow-sm sm:block">
              <Image
                src="/Langham-Health-Logo.png"
                alt="Langham Health Center logo"
                fill
                sizes="96px"
                className="object-contain p-2"
                priority
              />
            </div>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                {t(language, "bookingPageEyebrow")}
              </p>
              <h1
                className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {t(language, "bookingPageTitle")}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                {t(language, "bookingPageSubtitle")}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#edf7ef_0%,#f8fbf8_55%,#fffaf0_100%)] py-6 sm:py-8">
          <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8">
            <div className="border border-[#c8dacb] bg-white p-4 shadow-[0_16px_36px_rgba(22,52,42,0.08)] sm:p-5">
              <div className="grid gap-4 border-b border-[#e1ebe4] pb-4 xl:grid-cols-[1.05fr_0.9fr_1.45fr] xl:items-stretch">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                    {t(language, "navBooking")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    {copy.requestTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy.requestSubtitle}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {copy.introOne}
                  </p>
                </div>

                <div className="flex h-full items-center justify-center text-sm leading-6 text-slate-600">
                  <p className="w-full max-w-md border-l-4 border-l-[#d9b36f] bg-[#fffaf0] px-4 py-4 font-medium text-slate-800">
                    {copy.introTwo}
                  </p>
                </div>

                <div className="grid gap-2 border border-[#d8ded7] bg-[#f8faf6] p-4 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                  <h3 className="font-semibold text-slate-950 sm:col-span-2">
                    {copy.contactTitle}
                  </h3>
                  <p>
                    <span className="font-semibold text-slate-950">
                      {copy.contactPhone}:
                    </span>{" "}
                    {clinicContent.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">
                      {copy.contactEmail}:
                    </span>{" "}
                    {clinicContent.email}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">
                      {copy.contactAddress}:
                    </span>{" "}
                    {clinicContent.address}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-950">
                      {copy.contactHours}:
                    </span>{" "}
                    {clinicContent.hours}
                  </p>
                </div>
              </div>

              {status === "success" ? (
                <p
                  className="mt-4 flex gap-3 border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900"
                  role="status"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    {t(language, "bookingSubmitSuccess")}
                    <span className="mt-1 block">{copy.timeHelp}</span>
                  </span>
                </p>
              ) : null}

              {status === "error" && errorMessage ? (
                <p
                  className="mt-4 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-900"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <form
                onSubmit={handleSubmit}
                className="mt-5 grid gap-5 2xl:grid-cols-[0.95fr_1.2fr_1.2fr]"
              >
                <div className="flex min-h-[560px] flex-col border border-[#d8ded7] bg-[#fbfdfb] p-4">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                    {copy.stepContact}
                  </h2>
                  <div className="mt-4 flex flex-1 flex-col gap-3">
                    <label className="text-sm text-slate-700">
                      <span className={labelClass}>
                        {t(language, "bookingFormName")}
                      </span>
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

                    <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
                      <label className="text-sm text-slate-700">
                        <span className={labelClass}>
                          {t(language, "bookingFormPhone")}
                        </span>
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
                        <span className={labelClass}>
                          {t(language, "bookingFormEmail")}
                        </span>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                        />
                      </label>
                    </div>

                    <label className="flex flex-1 flex-col text-sm text-slate-700">
                      <span className={labelClass}>
                        {copy.stepNote}{" "}
                        <span className="font-normal normal-case tracking-normal text-slate-500">
                          ({copy.optional})
                        </span>
                      </span>
                      <textarea
                        name="reason"
                        rows={9}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={copy.notesPlaceholder}
                        className={`${inputClass} min-h-52 flex-1 resize-y`}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex min-h-[560px] flex-col border border-[#d8ded7] bg-white p-4">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                    {copy.stepService}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {copy.serviceHelp}
                  </p>

                  <div className="mt-3 grid flex-1 auto-rows-fr gap-2 sm:grid-cols-3 2xl:grid-cols-3">
                    {services.map((service, index) => {
                      const selected = selectedServiceIndex === index;

                      return (
                        <button
                          key={service.title}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setSelectedServiceIndex(index)}
                          className={`flex h-full min-h-24 flex-col items-center justify-center border p-3 text-center transition ${
                            selected
                              ? "border-[#173f32] bg-[#e8f4ec] shadow-[inset_0_0_0_2px_#173f32]"
                              : "border-[#d8ded7] bg-[#fbfdfb] hover:border-[#9eb4a3] hover:bg-[#f2f8f3]"
                          }`}
                        >
                          {selected ? (
                            <span className="mb-1 block text-xs font-semibold text-[#173f32]">
                              {copy.selectedLabel}
                            </span>
                          ) : null}
                          <span className="block text-sm font-semibold leading-5 text-slate-950">
                            {service.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-[#d8ded7] bg-[#fbfdfb] p-4">
                  <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-950">
                    <CalendarDays
                      className="h-5 w-5 text-[#2f6f4f]"
                      aria-hidden="true"
                    />
                    {copy.stepTime}
                  </h2>

                  <div className="mt-4 grid gap-4 xl:grid-cols-[0.72fr_1.28fr] 2xl:grid-cols-1">
                    <label className="text-sm text-slate-700">
                      <span className={labelClass}>{copy.dateLabel}</span>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className={inputClass}
                      />
                    </label>

                    <div>
                      <p className={labelClass}>{copy.timeLabel}</p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 2xl:grid-cols-5">
                        {bookingTimeSlots.map((slot) => {
                          const selected = preferredTime === slot;

                          return (
                            <button
                              key={slot}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => setPreferredTime(slot)}
                              className={`inline-flex min-h-10 items-center justify-center gap-1.5 border px-2 py-2 text-xs font-semibold transition ${
                                selected
                                  ? "border-[#173f32] bg-[#173f32] text-white"
                                  : "border-[#d8ded7] bg-white text-slate-800 hover:border-[#9eb4a3] hover:bg-[#f2f8f3]"
                              }`}
                            >
                              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                              {timeLabel(slot, language)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 flex gap-3 border border-[#eadab5] bg-[#fffaf0] p-3 text-sm leading-6 text-slate-700">
                    <ShieldAlert
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#875d2f]"
                      aria-hidden="true"
                    />
                    {copy.timeHelp}
                  </p>

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

                  <div className="mt-4 border-t border-[#e1ebe4] pt-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-[4px] border border-[#d9b36f] bg-[#d9b36f] px-6 py-3 text-base font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a] disabled:opacity-60"
                    >
                      {status === "sending"
                        ? t(language, "bookingSubmitSending")
                        : t(language, "bookingFormSubmit")}
                    </button>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {copy.submitHelp}
                    </p>
                    <p className="mt-2 flex gap-2 text-xs leading-5 text-slate-600">
                      <Phone
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#2f6f4f]"
                        aria-hidden="true"
                      />
                      {copy.urgentNote}
                    </p>
                  </div>
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
        phoneLabel={t(language, "contactCallTitle")}
        emailLabel={t(language, "contactEmailTitle")}
        visitLabel={t(language, "contactVisitTitle")}
      />
    </div>
  );
}
