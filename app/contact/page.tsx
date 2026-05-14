"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShieldAlert,
} from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

const contactCopy = {
  en: {
    eyebrow: "Contact and directions",
    title: "Find us, call reception, or plan your visit.",
    subtitle:
      "This page is for directions, clinic access, and choosing the fastest way to reach the front desk. Appointment requests should still go through the booking page.",
    requestCta: "Request appointment",
    callCta: "Call reception",
    visitEyebrow: "Visit Langham Health Center",
    mapCta: "Open in Google Maps",
    nextEyebrow: "Fastest next step",
    nextTitle: "Use contact for the right reason.",
    nextBody:
      "Booking is for appointment requests. Contact is for directions, urgent scheduling questions, and help deciding which service to ask about.",
    detailsEyebrow: "Visit details",
    detailsTitle: "Know where to go before you arrive.",
    addressLabel: "Clinic address",
    hoursLabel: "Clinic hours",
    emailLabel: "General email",
    urgentNote:
      "For urgent or emergency symptoms, call 911 or go to the nearest emergency department instead of using the website.",
    imageAlt: "Langham Health Center clinic space",
    paths: [
      {
        icon: CalendarCheck,
        title: "Book a visit",
        body: "Use the booking form when you are ready to request an appointment.",
        action: "Request appointment",
        href: "/booking",
      },
      {
        icon: Phone,
        title: "Call reception",
        body: "Best for same-day questions, appointment changes, or service guidance.",
        action: clinicContent.phone,
        href: `tel:${clinicContent.phone}`,
      },
      {
        icon: Navigation,
        title: "Get directions",
        body: "Open the clinic address in Google Maps before you leave.",
        action: "Open map",
        href: clinicContent.mapLink,
      },
    ],
  },
  zh: {
    eyebrow: "联系与路线",
    title: "查找诊所、致电前台，或计划到访。",
    subtitle:
      "此页面用于查看路线、诊所地址，以及选择最快联系前台的方式。预约申请请使用预约页面。",
    requestCta: "提交预约申请",
    callCta: "致电前台",
    visitEyebrow: "到访 Langham Health Center",
    mapCta: "打开 Google 地图",
    nextEyebrow: "最快下一步",
    nextTitle: "请选择合适的联系方式。",
    nextBody:
      "预约页面用于提交预约申请。联系页面用于查看路线、询问紧急排期问题，或请前台协助判断应选择哪项服务。",
    detailsEyebrow: "到访资料",
    detailsTitle: "到达前先了解诊所位置。",
    addressLabel: "诊所地址",
    hoursLabel: "营业时间",
    emailLabel: "一般电邮",
    urgentNote:
      "如有紧急或严重症状，请拨打 911 或前往最近急诊，不要只通过网站联系。",
    imageAlt: "Langham Health Center 诊所环境",
    paths: [
      {
        icon: CalendarCheck,
        title: "预约就诊",
        body: "准备预约时，请使用预约表格提交申请。",
        action: "提交预约申请",
        href: "/booking",
      },
      {
        icon: Phone,
        title: "致电前台",
        body: "适合当天问题、修改预约，或询问应选择哪项服务。",
        action: clinicContent.phone,
        href: `tel:${clinicContent.phone}`,
      },
      {
        icon: Navigation,
        title: "查看路线",
        body: "出发前可在 Google 地图打开诊所地址。",
        action: "打开地图",
        href: clinicContent.mapLink,
      },
    ],
  },
} as const;

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = contactCopy[language];

  return (
    <div className="min-h-screen bg-[#f7faf6] text-slate-800">
      <Header
        clinicName={clinicContent.name}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main>
        <section className="border-b border-[#d8ded7] bg-white">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-16">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                {copy.eyebrow}
              </p>
              <h1
                className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1]"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {copy.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a]"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  {copy.requestCta}
                </Link>
                <a
                  href={`tel:${clinicContent.phone}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#b7c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#173f32] transition hover:bg-[#eef5ef]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {copy.callCta}
                </a>
              </div>
            </div>

            <div className="flex min-h-[420px] flex-col rounded-[3px] border border-[#d8ded7] bg-white p-5 shadow-[0_20px_45px_rgba(16,38,31,0.12)] sm:min-h-[520px] sm:p-6">
              <div className="border-l-4 border-l-[#173f32] bg-[#f8faf6] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                  {copy.visitEyebrow}
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-950 sm:text-base">
                  {clinicContent.address}
                </p>
              </div>

              <div className="mt-4 min-h-0 flex-1 overflow-hidden border border-[#c8dacb] bg-[#eef5ef]">
                <iframe
                  title="Langham Health Center Google map"
                  src={clinicContent.mapEmbedLink}
                  className="h-full min-h-[300px] w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href={clinicContent.mapLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-[3px] bg-[#173f32] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#225c49]"
              >
                {copy.mapCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f3ee] py-12 sm:py-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="mb-7 grid gap-4 border-b border-[#d8ded7] pb-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                  {copy.nextEyebrow}
                </p>
                <h2
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {copy.nextTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {copy.nextBody}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {copy.paths.map((item) => {
                const Icon = item.icon;
                const external = item.href.startsWith("http");

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group flex min-h-[220px] flex-col border border-[#d8ded7] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a8b8aa] hover:shadow-[0_14px_30px_rgba(22,52,42,0.09)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-[3px] bg-[#e7f2e9] text-[#173f32]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.body}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#173f32]">
                      {item.action}
                      <ArrowRight
                        className="h-4 w-4 transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8ded7] bg-white py-12 sm:py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <div className="relative min-h-[360px] overflow-hidden rounded-[3px] bg-slate-900">
              <Image
                src="/clinic-3.jpg"
                alt={copy.imageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/52 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                {copy.detailsEyebrow}
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {copy.detailsTitle}
              </h2>

              <div className="mt-7 grid gap-3">
                <div className="flex gap-3 border border-[#d8ded7] bg-[#f8faf6] p-4">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6f4f]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {copy.addressLabel}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">
                      {clinicContent.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 border border-[#d8ded7] bg-[#f8faf6] p-4">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6f4f]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {copy.hoursLabel}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">
                      {clinicContent.hours}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 border border-[#d8ded7] bg-[#f8faf6] p-4">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6f4f]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {copy.emailLabel}
                    </p>
                    <a
                      href={`mailto:${clinicContent.email}`}
                      className="mt-1 block text-sm leading-7 text-slate-600 hover:text-[#173f32]"
                    >
                      {clinicContent.email}
                    </a>
                  </div>
                </div>
              </div>

              <p className="mt-7 flex max-w-2xl gap-3 text-sm leading-7 text-slate-600">
                <ShieldAlert
                  className="mt-1 h-5 w-5 shrink-0 text-[#875d2f]"
                  aria-hidden="true"
                />
                {copy.urgentNote}
              </p>
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
