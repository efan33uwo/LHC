"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionTitle from "@/components/section-title";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

export default function ServicesPage() {
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
              eyebrow={t(language, "servicesPageEyebrow")}
              title={t(language, "servicesPageTitle")}
              subtitle={t(language, "servicesPageSubtitle")}
            />
          </div>
        </section>

        <section className="bg-green-50/60 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              {clinicContent.services[language].map((service) => (
                <article
                  key={service.title}
                  className="border-b border-green-200 pb-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
                      {service.icon}
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {service.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                        {service.description}
                      </p>

                      <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                        Please contact the clinic if you have questions about
                        appointment availability, service suitability, or next
                        steps before booking.
                      </p>

                      <div className="mt-6">
                        <Link
                          href="/booking"
                          className="inline-flex items-center justify-center rounded-full bg-green-200 px-5 py-2.5 text-sm font-medium text-green-950 transition hover:bg-green-300"
                        >
                          {t(language, "bookingCta")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
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