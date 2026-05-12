"use client";

import { useState } from "react";
import Link from "next/link";
import BookingCTA from "@/components/booking-cta";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ScrollReveal from "@/components/scroll-reveal";
import SectionTitle from "@/components/section-title";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  const staffCards = Array.from({ length: 4 }).map((_, index) => {
    const practitioner = clinicContent.practitioners[language][index] ?? {
      name: "Staff Member",
      role: "Team Member",
      bio: "Add staff photo, role, and short bio here when ready.",
    };

    return {
      ...practitioner,
      slot: index + 1,
    };
  });

  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-800">
      <Header
        clinicName={clinicContent.name}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main>
        <Hero
          badge={t(language, "heroBadge")}
          title={t(language, "heroTitle")}
          subtitle={t(language, "heroSubtitle")}
          primaryCta={t(language, "heroPrimaryCta")}
          secondaryCta={t(language, "heroSecondaryCta")}
          primaryHref="/booking"
          secondaryHref="/services"
        />

        <section id="services" className="w-full bg-[#eef5f0] py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                  Services
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Care designed for day to day health and long term wellness
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Langham Health Center brings together family medicine,
                  chiropractic care, and supportive wellness services in one
                  accessible setting.
                </p>

                <div className="mt-8">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-full border border-green-300 bg-white px-6 py-3 text-sm font-medium text-green-900 transition hover:bg-green-100"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              {clinicContent.services[language].map((service, index) => (
                <ScrollReveal key={service.title}>
                  <article
                    className={`rounded-[2rem] p-8 shadow-sm ${
                      index % 3 === 0
                        ? "bg-white"
                        : index % 3 === 1
                        ? "bg-[#dfeee4]"
                        : "bg-[#f3f6f4]"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-green-800 shadow-sm">
                      {service.icon}
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
                      {service.title}
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
                      {service.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-900 py-24 text-white">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <ScrollReveal>
              <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-300">
                    Why Patients Choose Us
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Professional care in a setting that feels clear, calm, and well run
                  </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {clinicContent.whyChooseUs[language].map((card) => (
                    <div
                      key={card.title}
                      className="border-t border-white/15 pt-6"
                    >
                      <h3 className="text-xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-4 text-sm leading-8 text-white/75 sm:text-base">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="w-full bg-white py-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <ScrollReveal>
              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                    Meet Your Staff
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    A clinic team focused on comfort, coordination, and patient care
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  As your clinic grows, you can replace these placeholders with
                  real staff portraits and individual biographies to make the
                  site feel even more personal and established.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {staffCards.map((practitioner) => (
                <ScrollReveal key={`${practitioner.name}-${practitioner.slot}`}>
                  <article className="overflow-hidden rounded-[2rem] border border-[#e3ebe6] bg-[#f8fcf9]">
                    <div className="flex h-[300px] items-center justify-center bg-[#dfeee4] text-center text-sm font-semibold uppercase tracking-[0.14em] text-green-800">
                      Staff Photo
                    </div>

                    <div className="p-7">
                      <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                        {practitioner.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-green-700">
                        {practitioner.role}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {practitioner.bio}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#e9f3ec] py-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <ScrollReveal>
              <div className="grid gap-10 rounded-[2rem] border border-green-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                    Our Location
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Easy to find and easy to reach
                  </h2>
                  <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
                    {clinicContent.address}
                  </p>
                  <p className="text-sm leading-8 text-slate-600 sm:text-base">
                    {clinicContent.hours}
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
                </div>

                <div className="overflow-hidden rounded-[1.5rem] border border-green-100">
                  <iframe
                    title="Langham Health Center map"
                    src={clinicContent.mapEmbedLink}
                    className="h-[340px] w-full border-0 sm:h-[420px]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="book" className="w-full bg-[#d7ebdd] py-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <ScrollReveal>
              <BookingCTA
                title={t(language, "bookingTitle")}
                description={t(language, "bookingDescription")}
                buttonText={t(language, "bookingCta")}
                buttonHref="/booking"
              />
            </ScrollReveal>
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