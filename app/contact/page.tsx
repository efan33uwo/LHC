"use client";

import { useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionTitle from "@/components/section-title";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>("en");

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
              eyebrow={t(language, "contactPageEyebrow")}
              title={t(language, "contactPageTitle")}
              subtitle={t(language, "contactPageSubtitle")}
            />
          </div>
        </section>

        <section className="bg-green-50/60 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionTitle
                eyebrow={t(language, "contactInfoEyebrow")}
                title={t(language, "contactInfoTitle")}
                subtitle={t(language, "contactInfoSubtitle")}
              />

              <div className="mt-10 grid gap-y-8 sm:grid-cols-2 sm:gap-x-10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                    {t(language, "contactCallTitle")}
                  </h3>
                  <a
                    href={`tel:${clinicContent.phone}`}
                    className="mt-3 block text-sm leading-7 text-slate-600 hover:text-green-700"
                  >
                    {clinicContent.phone}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                    {t(language, "contactEmailTitle")}
                  </h3>
                  <a
                    href={`mailto:${clinicContent.email}`}
                    className="mt-3 block text-sm leading-7 text-slate-600 hover:text-green-700"
                  >
                    {clinicContent.email}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                    {t(language, "contactVisitTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {clinicContent.address}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                    {t(language, "contactHoursTitle")}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {clinicContent.hours}
                  </p>
                </div>
              </div>

              <p className="mt-10 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                For urgent medical concerns, please contact emergency services
                or attend the nearest urgent care or emergency department.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Visit the Clinic
              </h2>
              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                Use the map link below for directions to Langham Health Centre.
              </p>

              <div className="mt-8">
                <a
                  href={clinicContent.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-200 px-6 py-3 text-sm font-medium text-green-950 transition hover:bg-green-300"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-8">
                <p className="text-sm font-semibold text-slate-900">
                  Booking and Questions
                </p>
                <p className="mt-3 text-sm leading-8 text-slate-600">
                  You can call the clinic directly or submit an appointment
                  request online through the booking page.
                </p>
              </div>
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