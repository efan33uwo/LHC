"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/header";
import SectionTitle from "@/components/section-title";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

export default function AboutPage() {
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
              eyebrow={t(language, "aboutEyebrow")}
              title={t(language, "aboutPageTitle")}
              subtitle={t(language, "aboutPageSubtitle")}
            />
          </div>
        </section>

        <section className="bg-green-50/70 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[440px]">
              <Image
                src="/clinic-1.jpg"
                alt="Langham Health Centre clinic environment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <SectionTitle
                eyebrow={t(language, "aboutMissionTitle")}
                title={t(language, "aboutPageTitle")}
                subtitle={t(language, "aboutMissionBody")}
              />

              <div className="mt-8 space-y-4">
                {clinicContent.aboutHighlights[language].map((item) => (
                  <div
                    key={item}
                    className="border-b border-green-200 pb-4 text-sm leading-8 text-slate-700 sm:text-base"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionTitle
              eyebrow={t(language, "whyChooseTitle")}
              title={t(language, "whyChooseTitle")}
              subtitle={t(language, "whyChooseSubtitle")}
            />

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {clinicContent.whyChooseUs[language].map((card) => (
                <div key={card.title} className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <SectionTitle
              eyebrow={t(language, "practitionersEyebrow")}
              title={t(language, "practitionersTitle")}
              subtitle={t(language, "practitionersSubtitle")}
            />

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {clinicContent.practitioners[language].map((practitioner) => (
                <article
                  key={practitioner.name}
                  className="rounded-[1.5rem] bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {practitioner.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-green-700">
                    {practitioner.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {practitioner.bio}
                  </p>
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