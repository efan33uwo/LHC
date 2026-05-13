"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ScrollReveal from "@/components/scroll-reveal";
import { getServiceVisual } from "@/components/service-visuals";
import { clinicContent, type ServiceItem } from "@/lib/clinic-content";
import { Language, t } from "@/lib/translations";

const categoryOrder: ServiceItem["category"][] = [
  "claims",
  "injury",
  "therapy",
  "coverage",
];

type CategoryCopy = Record<
  ServiceItem["category"],
  { eyebrow: string; title: string; description: string }
>;

function getCategoryCopy(language: Language): CategoryCopy {
  if (language === "zh") {
    return {
      claims: {
        eyebrow: "理赔",
        title: "车祸保险理赔",
        description: "车祸相关评估、治疗计划与理赔文件支持。",
      },
      injury: {
        eyebrow: "损伤",
        title: "脊柱、运动及跌倒损伤",
        description: "针对疼痛、活动受限与损伤恢复的护理路径。",
      },
      therapy: {
        eyebrow: "治疗",
        title: "康复与治疗项目",
        description: "物理治疗、脊椎矫正、注册按摩治疗及针灸。",
      },
      coverage: {
        eyebrow: "保险",
        title: "延伸医疗保险",
        description: "为符合条件的延伸医疗福利提供诊所服务支持。",
      },
    };
  }

  return {
    claims: {
      eyebrow: "Claims",
      title: "MVA insurance claims",
      description: "Accident assessment, treatment planning, and claim support.",
    },
    injury: {
      eyebrow: "Injury",
      title: "Spine, sport, and fall injuries",
      description: "Focused care for pain, mobility loss, and recovery.",
    },
    therapy: {
      eyebrow: "Therapy",
      title: "Rehab and treatment services",
      description: "Physiotherapy, chiropractic, RMT, and acupuncture.",
    },
    coverage: {
      eyebrow: "Coverage",
      title: "Extended healthcare",
      description: "Support for eligible extended health benefits.",
    },
  };
}

const categoryAccent: Record<ServiceItem["category"], string> = {
  claims: "border-l-[#b78338]",
  injury: "border-l-[#3d6f48]",
  therapy: "border-l-[#2f6870]",
  coverage: "border-l-[#714a7d]",
};

const categoryWash: Record<ServiceItem["category"], string> = {
  claims: "bg-[#fffaf2]",
  injury: "bg-[#f2f8f3]",
  therapy: "bg-[#eef7f7]",
  coverage: "bg-[#f8f3fa]",
};

const categoryText: Record<ServiceItem["category"], string> = {
  claims: "text-[#875d2f]",
  injury: "text-[#3d6f48]",
  therapy: "text-[#2f6870]",
  coverage: "text-[#714a7d]",
};

type ServiceGuide = {
  lead: string;
  helps: string[];
  note: string;
  image: string;
};

const serviceGuides: Record<string, ServiceGuide> = {
  "MVA Insurance Claims": {
    image: "/services/mva-insurance-claims.jpg",
    lead:
      "For patients recovering after a motor vehicle accident who need care, documentation awareness, and a clear starting point.",
    helps: [
      "Accident-related assessment",
      "Treatment plan guidance",
      "Claim and coverage coordination",
    ],
    note: "Bring your claim number, insurer details, and any paperwork you already have.",
  },
  "Spinal Cord Injury": {
    image: "/services/spinal-cord-injury.jpg",
    lead:
      "For spine-related injury concerns, mobility changes, stiffness, pain, and recovery planning after an accident or fall.",
    helps: [
      "Spine-focused assessment",
      "Mobility and function support",
      "Rehab pathway planning",
    ],
    note: "If symptoms are urgent or severe, use emergency care first before booking clinic follow-up.",
  },
  "Sports Injury": {
    image: "/services/sports-injury.jpg",
    lead:
      "For sprains, strains, overuse pain, training setbacks, and return-to-activity goals.",
    helps: [
      "Movement assessment",
      "Strength and mobility work",
      "Return-to-activity planning",
    ],
    note: "Useful for both recent injuries and issues that keep returning during activity.",
  },
  "Slip and Fall Injuries": {
    image: "/services/slip-and-fall-injuries.jpg",
    lead:
      "For pain, stiffness, soft-tissue irritation, and mobility concerns after falling at home, work, or in public spaces.",
    helps: [
      "Pain and stiffness review",
      "Joint and soft-tissue support",
      "Recovery documentation awareness",
    ],
    note: "Bring any incident details, reports, or benefit information if the fall involves a claim.",
  },
  Physiotherapy: {
    image: "/services/physiotherapy.jpg",
    lead:
      "For guided rehabilitation using movement, strengthening, mobility work, education, and practical recovery goals.",
    helps: [
      "Strength rebuilding",
      "Mobility and function work",
      "Home exercise guidance",
    ],
    note: "A good starting point when movement feels limited or recovery needs structure.",
  },
  Chiropractic: {
    image: "/services/chiropractic.jpg",
    lead:
      "For back, neck, spine, joint, posture, and musculoskeletal concerns that benefit from hands-on clinical care.",
    helps: [
      "Spine and joint assessment",
      "Back and neck care",
      "Posture-related strain support",
    ],
    note: "Reception can help direct you if you are unsure whether chiropractic or physiotherapy fits best.",
  },
  RMT: {
    image: "/services/rmt.jpg",
    lead:
      "Registered massage therapy for soft-tissue tension, recovery support, stress-related tightness, and injury care plans.",
    helps: [
      "Soft-tissue tension",
      "Recovery support",
      "Muscle tightness care",
    ],
    note: "Helpful as a standalone visit or as part of a broader recovery plan.",
  },
  Acupuncture: {
    image: "/services/acupuncture.jpg",
    lead:
      "Supportive care for pain management, tension, recovery, and wellness needs within a broader treatment plan.",
    helps: [
      "Pain support",
      "Tension management",
      "Recovery-focused care",
    ],
    note: "Ask reception about appointment availability and whether it fits your care goals.",
  },
  "Extended Healthcare": {
    image: "/services/extended-healthcare.jpg",
    lead:
      "For patients using extended health benefits who need receipts, appointment information, and coverage-aware service planning.",
    helps: [
      "Benefit-use support",
      "Receipts and visit details",
      "Eligible service planning",
    ],
    note: "Coverage varies by plan, so confirm benefit details with your insurer when needed.",
  },
};

const fallbackServiceImages = ["/clinic-1.jpg", "/clinic-2.jpg", "/clinic-3.jpg"];

function getServiceAnchor(index: number) {
  return `service-${index + 1}`;
}

function getServiceGuide(service: ServiceItem, highlights: string[]): ServiceGuide {
  return (
    serviceGuides[service.title] ?? {
      image: "/clinic-1.jpg",
      lead: service.description,
      helps: highlights,
      note: "Reception can help confirm the best appointment type for your visit.",
    }
  );
}

type ServiceSectionPhotoProps = {
  alt: string;
  fallbackSrc: string;
  src: string;
};

function ServiceSectionPhoto({
  alt,
  fallbackSrc,
  src,
}: ServiceSectionPhotoProps) {
  const [imageSrc, setImageSrc] = useState(fallbackSrc);

  useEffect(() => {
    let active = true;
    const probe = new window.Image();

    probe.onload = () => {
      if (active) {
        setImageSrc(src);
      }
    };

    probe.onerror = () => {
      if (active) {
        setImageSrc(fallbackSrc);
      }
    };

    probe.src = src;

    return () => {
      active = false;
    };
  }, [fallbackSrc, src]);

  return (
    <div className="relative mb-6 h-44 overflow-hidden border border-white/70 bg-slate-200 shadow-sm sm:h-52 lg:h-48">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 28vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 to-transparent" />
    </div>
  );
}

export default function ServicesPage() {
  const [language, setLanguage] = useState<Language>("en");
  const categories = getCategoryCopy(language);
  const services = clinicContent.services[language];
  const serviceRows = services.map((service, index) => ({
    service,
    index,
    visual: getServiceVisual(index),
  }));

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-slate-800">
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
                {t(language, "servicesPageEyebrow")}
              </p>
              <h1
                className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1]"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {t(language, "servicesPageTitle")}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {t(language, "servicesPageSubtitle")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a]"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Request appointment
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#b7c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#173f32] transition hover:bg-[#eef5ef]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call the clinic
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative min-h-[380px] overflow-hidden rounded-[3px] border border-[#d8ded7] bg-slate-900 shadow-[0_20px_45px_rgba(16,38,31,0.16)] sm:min-h-[460px] lg:min-h-[560px]">
                <Image
                  src="/clinic-2.jpg"
                  alt="Langham Health Center clinic interior"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/18 to-transparent p-5 text-white sm:p-6">
                  <p className="max-w-md text-sm font-semibold uppercase tracking-[0.16em] text-white/75">
                    Clinic service guide
                  </p>
                  <p className="mt-2 max-w-lg text-lg font-semibold leading-7">
                    A larger look at the clinic before patients choose a care
                    path.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {categoryOrder.map((category) => {
                  const firstService = serviceRows.find(
                    (row) => row.service.category === category
                  );
                  const href = firstService
                    ? `#${getServiceAnchor(firstService.index)}`
                    : "#service-1";

                  return (
                    <a
                      key={category}
                      href={href}
                      className={`border-l-4 ${categoryAccent[category]} bg-[#f8faf6] px-4 py-3 transition hover:bg-[#eef5ef]`}
                    >
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {categories[category].eyebrow}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">
                        {categories[category].title}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8ded7] bg-[#f7faf6]">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-3 overflow-x-auto px-6 py-5 lg:px-10">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
              Jump to
            </span>
            {serviceRows.map(({ service, index }) => (
              <a
                key={service.title}
                href={`#${getServiceAnchor(index)}`}
                className="shrink-0 border border-[#d8ded7] bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#9eb4a3] hover:text-[#173f32]"
              >
                {service.title}
              </a>
            ))}
          </div>
        </section>

        <section className="pt-12 pb-0 sm:pt-16">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="mb-8 grid gap-5 border-b border-[#d8ded7] pb-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
                  Detailed services
                </p>
                <h2
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  Each service has its own care path.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Instead of repeating the homepage cards, this page explains
                when each service may be useful and what patients should expect
                before booking.
              </p>
            </div>

            <div className="space-y-5">
              {serviceRows.map(({ service, visual, index }) => {
                const Icon = visual.icon;
                const guide = getServiceGuide(service, visual.highlights);

                return (
                  <ScrollReveal key={service.title}>
                    <article
                      id={getServiceAnchor(index)}
                      className={`scroll-mt-32 overflow-hidden border border-[#d8ded7] border-l-4 ${categoryAccent[service.category]} bg-white shadow-sm lg:grid lg:grid-cols-[0.62fr_1.38fr]`}
                    >
                      <div className={`${categoryWash[service.category]} p-6 sm:p-7 lg:p-8`}>
                        <ServiceSectionPhoto
                          src={guide.image}
                          fallbackSrc={
                            fallbackServiceImages[
                              index % fallbackServiceImages.length
                            ]
                          }
                          alt={`${service.title} at Langham Health Center`}
                        />

                        <div className="flex items-start justify-between gap-4">
                          <span
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] ${visual.iconClass}`}
                          >
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <span className="font-mono text-sm text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p
                          className={`mt-6 text-xs font-semibold uppercase tracking-[0.16em] ${categoryText[service.category]}`}
                        >
                          {categories[service.category].eyebrow}
                        </p>
                        <h2
                          className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                          style={{ fontFamily: "var(--font-source-serif)" }}
                        >
                          {service.title}
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {service.description}
                        </p>
                      </div>

                      <div className="p-6 sm:p-7 lg:p-8">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#173f32]">
                          <ClipboardList className="h-4 w-4" aria-hidden="true" />
                          Care focus
                        </div>
                        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
                          {guide.lead}
                        </p>

                        <div className="mt-6 grid gap-3 md:grid-cols-3">
                          {guide.helps.map((item) => (
                            <div
                              key={item}
                              className="flex min-h-20 items-start gap-3 border border-[#d8ded7] bg-[#fbfdfb] p-4"
                            >
                              <CheckCircle2
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#2f6f4f]"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium leading-6 text-slate-700">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-7 flex flex-col gap-4 border-t border-[#d8ded7] pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <p className="flex max-w-2xl items-start gap-2 text-sm leading-7 text-slate-600">
                            <ShieldCheck
                              className="mt-1 h-4 w-4 shrink-0 text-[#2f6f4f]"
                              aria-hidden="true"
                            />
                            {guide.note}
                          </p>
                          <Link
                            href="/booking"
                            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-[3px] bg-[#173f32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#225c49]"
                          >
                            Book this service
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
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
