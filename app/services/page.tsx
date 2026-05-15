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
    image: "/services/mva-insurance-claims.png",
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
    image: "/services/spinal-cord-injury.png",
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
    image: "/services/sports-injury.png",
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
    image: "/services/slip-and-fall-injuries.png",
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
    image: "/services/physiotherapy.png",
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
    image: "/services/chiropractic.png",
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
    image: "/services/rmt.png",
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
    image: "/services/acupuncture.png",
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
    image: "/services/extended-healthcare.png",
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

const chineseServiceGuides: ServiceGuide[] = [
  {
    image: "/services/mva-insurance-claims.png",
    lead: "适合车祸后需要评估、治疗计划、文件说明和理赔相关协助的患者。",
    helps: ["车祸相关评估", "治疗计划指导", "理赔与保险协调"],
    note: "请携带理赔号码、保险资料，以及已经收到的相关文件。",
  },
  {
    image: "/services/spinal-cord-injury.png",
    lead: "适合有脊椎相关损伤、活动能力改变、僵硬、疼痛，或需要康复计划的患者。",
    helps: ["脊椎重点评估", "活动与功能支持", "康复路径规划"],
    note: "如果症状紧急或严重，请先前往急诊，再预约诊所跟进。",
  },
  {
    image: "/services/sports-injury.png",
    lead: "适合扭伤、拉伤、过度使用疼痛、训练受阻，或希望恢复运动活动的患者。",
    helps: ["动作评估", "力量与活动度训练", "恢复活动计划"],
    note: "适用于近期受伤，也适用于运动时反复出现的问题。",
  },
  {
    image: "/services/slip-and-fall-injuries.png",
    lead: "适合在家中、工作场所或公共地方跌倒后出现疼痛、僵硬、软组织不适或活动困难的患者。",
    helps: ["疼痛与僵硬评估", "关节与软组织支持", "康复文件说明"],
    note: "如果跌倒涉及理赔，请带上事故资料、报告或保险福利资料。",
  },
  {
    image: "/services/physiotherapy.png",
    lead: "通过动作训练、力量训练、活动度练习、教育和实际康复目标来帮助恢复。",
    helps: ["重建力量", "改善活动和功能", "居家运动指导"],
    note: "当活动受限或康复需要清楚计划时，物理治疗通常是很好的开始。",
  },
  {
    image: "/services/chiropractic.png",
    lead: "适合背部、颈部、脊椎、关节、姿势和肌肉骨骼相关问题，需要手法护理的患者。",
    helps: ["脊椎与关节评估", "背痛与颈痛护理", "姿势压力支持"],
    note: "如果不确定应选择脊椎矫正还是物理治疗，前台可以协助引导。",
  },
  {
    image: "/services/rmt.png",
    lead: "注册按摩治疗可帮助软组织紧张、恢复支持、压力相关肌肉紧绷和损伤康复计划。",
    helps: ["软组织紧张", "恢复支持", "肌肉紧绷护理"],
    note: "可单独预约，也可作为综合康复计划的一部分。",
  },
  {
    image: "/services/acupuncture.png",
    lead: "针灸可作为综合护理的一部分，支持疼痛管理、紧张缓解、恢复和整体健康。",
    helps: ["疼痛支持", "紧张管理", "恢复护理"],
    note: "可向前台询问预约时间，以及是否适合您的护理目标。",
  },
  {
    image: "/services/extended-healthcare.png",
    lead: "适合使用延伸医疗保险福利，需要收据、预约资料或服务规划支持的患者。",
    helps: ["福利使用支持", "收据与就诊资料", "合资格服务规划"],
    note: "保险计划各有不同，如有需要，请先向保险公司确认福利细节。",
  },
];

const servicesPageCopy = {
  en: {
    requestCta: "Request appointment",
    callCta: "Call the clinic",
    guideEyebrow: "Clinic service guide",
    guideText:
      "Explore accident care, rehabilitation, therapy, and coverage support in one place.",
    jumpTo: "Jump to",
    detailsEyebrow: "Detailed services",
    detailsTitle: "Each service has its own care path.",
    detailsBody:
      "Instead of repeating the homepage cards, this page explains when each service may be useful and what patients should expect before booking.",
    careFocus: "Care focus",
    bookService: "Book this service",
    serviceFallbackNote:
      "Reception can help confirm the best appointment type for your visit.",
    photoAltSuffix: "at Langham Health Center",
  },
  zh: {
    requestCta: "提交预约申请",
    callCta: "致电诊所",
    guideEyebrow: "诊所服务指南",
    guideText: "集中了解车祸护理、康复治疗、理疗服务和保险支持。",
    jumpTo: "快速前往",
    detailsEyebrow: "服务详情",
    detailsTitle: "每项服务都有合适的护理方向。",
    detailsBody:
      "此页面不会重复首页卡片，而是说明每项服务适合什么情况，以及预约前患者可以先了解什么。",
    careFocus: "护理重点",
    bookService: "预约此服务",
    serviceFallbackNote: "前台可以协助确认最适合您的预约类型。",
    photoAltSuffix: "Langham Health Center 服务照片",
  },
} as const;

const fallbackServiceImages = ["/clinic-1.jpg", "/clinic-2.jpg", "/clinic-3.jpg"];

function getServiceAnchor(index: number) {
  return `service-${index + 1}`;
}

function getServiceGuide(
  language: Language,
  service: ServiceItem,
  highlights: string[],
  index: number
): ServiceGuide {
  if (language === "zh") {
    return (
      chineseServiceGuides[index] ?? {
        image: "/clinic-1.jpg",
        lead: service.description,
        helps: highlights,
        note: servicesPageCopy.zh.serviceFallbackNote,
      }
    );
  }

  return (
    serviceGuides[service.title] ?? {
      image: "/clinic-1.jpg",
      lead: service.description,
      helps: highlights,
      note: servicesPageCopy.en.serviceFallbackNote,
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
    <div className="relative h-52 overflow-hidden bg-slate-200 sm:h-60 lg:h-full lg:min-h-[240px]">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 26vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 to-transparent" />
    </div>
  );
}

export default function ServicesPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = servicesPageCopy[language];
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
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-12">
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
                  {copy.requestCta}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#b7c7b8] bg-white px-5 py-3 text-sm font-semibold text-[#173f32] transition hover:bg-[#eef5ef]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {copy.callCta}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative min-h-[300px] overflow-hidden rounded-[3px] border border-[#d8ded7] bg-slate-900 shadow-[0_20px_45px_rgba(16,38,31,0.16)] sm:min-h-[360px] lg:min-h-[430px]">
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
                    {copy.guideEyebrow}
                  </p>
                  <p className="mt-2 max-w-lg text-lg font-semibold leading-7">
                    {copy.guideText}
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
          <div className="no-scrollbar mx-auto flex w-full max-w-7xl items-center gap-3 overflow-x-auto px-6 py-5 lg:flex-wrap lg:overflow-visible lg:px-10">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-[#2f6f4f]">
              {copy.jumpTo}
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
                  {copy.detailsEyebrow}
                </p>
                <h2
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                  style={{ fontFamily: "var(--font-source-serif)" }}
                >
                  {copy.detailsTitle}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {copy.detailsBody}
              </p>
            </div>

            <div className="space-y-5">
              {serviceRows.map(({ service, visual, index }) => {
                const Icon = visual.icon;
                const guide = getServiceGuide(
                  language,
                  service,
                  visual.highlights,
                  index
                );

                return (
                  <ScrollReveal key={service.title}>
                    <article
                      id={getServiceAnchor(index)}
                      className={`scroll-mt-32 overflow-hidden border border-[#d8ded7] border-l-4 ${categoryAccent[service.category]} bg-white shadow-[0_14px_30px_rgba(22,52,42,0.06)]`}
                    >
                      <div className="grid lg:grid-cols-[minmax(240px,0.52fr)_minmax(0,1.48fr)]">
                        <ServiceSectionPhoto
                          src={guide.image}
                          fallbackSrc={
                            fallbackServiceImages[
                              index % fallbackServiceImages.length
                            ]
                          }
                          alt={`${service.title} ${copy.photoAltSuffix}`}
                        />

                        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.72fr)] lg:items-start lg:gap-7">
                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] ${visual.iconClass}`}
                              >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </span>
                              <p
                                className={`text-xs font-semibold uppercase tracking-[0.16em] ${categoryText[service.category]}`}
                              >
                                {categories[service.category].eyebrow}
                              </p>
                            </div>

                            <h2
                              className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                              style={{ fontFamily: "var(--font-source-serif)" }}
                            >
                              {service.title}
                            </h2>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                              {service.description}
                            </p>

                            <p
                              className={`${categoryWash[service.category]} mt-4 border border-[#d8ded7] px-4 py-3 text-sm leading-7 text-slate-700`}
                            >
                              {guide.lead}
                            </p>
                          </div>

                          <div className="border-t border-[#d8ded7] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#173f32]">
                              <ClipboardList className="h-4 w-4" aria-hidden="true" />
                              {copy.careFocus}
                            </div>

                            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                              {guide.helps.map((item) => (
                                <div
                                  key={item}
                                  className="flex min-h-0 items-start gap-2 border border-[#d8ded7] bg-[#fbfdfb] px-3 py-2.5"
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

                            <p className="mt-4 flex items-start gap-2 border-t border-[#d8ded7] pt-4 text-sm leading-6 text-slate-600">
                              <ShieldCheck
                                className="mt-1 h-4 w-4 shrink-0 text-[#2f6f4f]"
                                aria-hidden="true"
                              />
                              {guide.note}
                            </p>

                            <Link
                              href="/booking"
                              className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[3px] bg-[#173f32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#225c49]"
                            >
                              {copy.bookService}
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </div>
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
        phoneLabel={t(language, "contactCallTitle")}
        emailLabel={t(language, "contactEmailTitle")}
        visitLabel={t(language, "contactVisitTitle")}
      />
    </div>
  );
}
