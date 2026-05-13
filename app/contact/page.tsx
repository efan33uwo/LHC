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

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("en");

  const contactPaths = [
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
  ];

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
                Contact and directions
              </p>
              <h1
                className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1]"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                Find us, call reception, or plan your visit.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                This page is for directions, clinic access, and choosing the
                fastest way to reach the front desk. Appointment requests should
                still go through the booking page.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a]"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Request appointment
                </Link>
                <a
                  href={`tel:${clinicContent.phone}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#b7c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#173f32] transition hover:bg-[#eef5ef]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call reception
                </a>
              </div>
            </div>

            <div className="flex min-h-[420px] flex-col rounded-[3px] border border-[#d8ded7] bg-white p-5 shadow-[0_20px_45px_rgba(16,38,31,0.12)] sm:min-h-[520px] sm:p-6">
              <div className="border-l-4 border-l-[#173f32] bg-[#f8faf6] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                  Visit Langham Health Center
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
                Open in Google Maps
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
                  Fastest next step
                </p>
                <h2
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  Use contact for the right reason.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Booking is for appointment requests. Contact is for directions,
                urgent scheduling questions, and help deciding which service to
                ask about.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {contactPaths.map((item) => {
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
                alt="Langham Health Center clinic space"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/52 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                Visit details
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                Know where to go before you arrive.
              </h2>

              <div className="mt-7 grid gap-3">
                <div className="flex gap-3 border border-[#d8ded7] bg-[#f8faf6] p-4">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2f6f4f]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      Clinic address
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
                      Clinic hours
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
                      General email
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
                For urgent or emergency symptoms, call 911 or go to the nearest
                emergency department instead of using the website.
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
