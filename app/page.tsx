"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ScrollReveal from "@/components/scroll-reveal";
import ServicesShowcase from "@/components/services-showcase";
import { clinicContent } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

const homeCopy = {
  en: {
    whyEyebrow: "Why Patients Choose Us",
    whyTitle:
      "Professional care in a setting that feels clear, calm, and well run",
    staffEyebrow: "Meet Your Staff",
    staffStockNote: "Representative stock images, not actual staff photos.",
    staffTitle:
      "A clinic team focused on comfort, coordination, and patient care",
    staffFallbackName: "Staff Member",
    staffFallbackRole: "Team Member",
    staffFallbackBio: "Add staff photo, role, and short bio here when ready.",
    staffPhoto: "Staff Photo",
    visitEyebrow: "Visit and book",
    visitTitle: "Find the clinic and request your appointment in one place.",
    visitDescription:
      "Use booking for appointment requests, or open the map when you are planning your visit to the clinic.",
    addressLabel: "Address:",
    hoursLabel: "Hours:",
    mapCta: "Open in Google Maps",
  },
  zh: {
    whyEyebrow: "患者选择我们的原因",
    whyTitle: "清晰、安心、专业管理的诊所护理环境",
    staffEyebrow: "认识团队",
    staffTitle: "以舒适、协调和患者护理为核心的诊所团队",
    staffFallbackName: "团队成员",
    staffFallbackRole: "诊所团队",
    staffFallbackBio: "准备好后可在此加入员工照片、职位和简短介绍。",
    staffPhoto: "员工照片",
    visitEyebrow: "到访与预约",
    visitTitle: "在同一处找到诊所并提交预约申请。",
    visitDescription: "可使用预约入口提交申请，也可在计划到访时打开地图查看路线。",
    addressLabel: "地址：",
    hoursLabel: "时间：",
    mapCta: "打开 Google 地图",
  },
} satisfies Record<Language, Record<string, string | string[]>>;

function StaffPhoto({
  slot,
  name,
  label,
}: {
  slot: number;
  name: string;
  label: string;
}) {
  const [isReady, setIsReady] = useState(false);
  const src = `/staff/staff-${slot}.png?v=staff-refresh-20260515`;

  useEffect(() => {
    let isMounted = true;
    const image = new window.Image();
    image.onload = () => {
      if (isMounted) setIsReady(true);
    };
    image.onerror = () => {
      if (isMounted) setIsReady(false);
    };
    image.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-[#dfeee4] text-center text-sm font-semibold uppercase tracking-[0.14em] text-green-800 sm:h-[300px]">
      {isReady ? (
        <Image
          key={src}
          src={src}
          alt={`${name} photo`}
          fill
          unoptimized
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        label
      )}
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = homeCopy[language];
  const staffStockNote =
    language === "zh"
      ? "代表性图片，非实际员工照片。"
      : homeCopy.en.staffStockNote;

  const staffCards = Array.from({ length: 4 }).map((_, index) => {
    const practitioner = clinicContent.practitioners[language][index] ?? {
      name: copy.staffFallbackName as string,
      role: copy.staffFallbackRole as string,
      bio: copy.staffFallbackBio as string,
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

        <ServicesShowcase
          services={clinicContent.services[language]}
          language={language}
        />

        <section className="relative isolate w-full overflow-hidden bg-[#10261f] py-16 text-white sm:py-20 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[url('/backgrounds/why-patients.png')] bg-cover bg-center opacity-55" />
          <div className="absolute inset-0 -z-10 bg-[#10261f]/72" />
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <ScrollReveal>
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-300">
                    {copy.whyEyebrow as string}
                  </p>
                  <h2
                    className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
                    style={{ fontFamily: "var(--font-source-serif)" }}
                  >
                    {copy.whyTitle as string}
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
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

        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 min-[390px]:px-5 sm:px-6 lg:px-10">
            <ScrollReveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                  {copy.staffEyebrow as string}
                </p>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-slate-400">
                  {staffStockNote}
                </p>
                <h2
                  className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-slate-900 min-[390px]:text-4xl sm:text-5xl lg:text-6xl lg:leading-[1.02]"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {copy.staffTitle as string}
                </h2>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
              {staffCards.map((practitioner) => (
                <ScrollReveal key={`${practitioner.name}-${practitioner.slot}`}>
                  <article className="overflow-hidden rounded-[3px] border border-[#e3ebe6] bg-[#f8fcf9]">
                    <StaffPhoto
                      slot={practitioner.slot}
                      name={practitioner.name}
                      label={copy.staffPhoto as string}
                    />

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

        <section
          id="book"
          className="w-full border-t border-[#c8dacb] bg-[linear-gradient(135deg,#edf7ef_0%,#e3f0e6_48%,#f5faf6_100%)] py-8 sm:py-12 lg:py-14"
        >
          <div className="mx-auto w-full max-w-[1500px] px-4 min-[390px]:px-5 sm:px-6 lg:px-12">
            <ScrollReveal>
              <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch">
                <div className="flex flex-col justify-center border border-[#c8dacb] bg-white p-6 shadow-[0_16px_36px_rgba(22,52,42,0.08)] sm:p-9 lg:min-h-[500px]">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                    {copy.visitEyebrow as string}
                  </p>
                  <h2
                    className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 min-[390px]:text-3xl sm:text-4xl lg:text-5xl lg:leading-[1]"
                    style={{ fontFamily: "var(--font-source-serif)" }}
                  >
                    {copy.visitTitle as string}
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                    {copy.visitDescription as string}
                  </p>

                  <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-600 sm:text-base">
                    <p>
                      <span className="font-semibold text-slate-900">
                        {copy.addressLabel as string}
                      </span>{" "}
                      {clinicContent.address}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">
                        {copy.hoursLabel as string}
                      </span>{" "}
                      {clinicContent.hours}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-3 min-[440px]:flex min-[440px]:flex-wrap">
                    <Link
                      href="/booking"
                      className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a]"
                    >
                      {t(language, "bookingCta")}
                    </Link>
                    <a
                      href={clinicContent.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-[#b7c7b8] bg-white px-6 py-3 text-sm font-semibold text-[#173f32] transition hover:bg-[#eef5ef]"
                    >
                      {copy.mapCta as string}
                    </a>
                  </div>
                </div>

                <div className="min-h-[320px] overflow-hidden border border-[#c8dacb] bg-white shadow-[0_16px_36px_rgba(22,52,42,0.08)] sm:min-h-[380px] lg:min-h-[500px]">
                  <iframe
                    title="Langham Health Center Google map"
                    src={clinicContent.mapEmbedLink}
                    className="h-[320px] w-full border-0 sm:h-[380px] lg:h-[500px]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
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
        phoneLabel={t(language, "contactCallTitle")}
        emailLabel={t(language, "contactEmailTitle")}
        visitLabel={t(language, "contactVisitTitle")}
      />
    </div>
  );
}
