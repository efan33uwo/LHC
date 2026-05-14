import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardCheck, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import type { ServiceItem } from "@/lib/clinic-content";
import type { Language } from "@/lib/translations";
import { getServiceVisual } from "@/components/service-visuals";

type ServicesShowcaseProps = {
  services: ServiceItem[];
  language: Language;
};

const categoryAccent: Record<ServiceItem["category"], string> = {
  claims: "border-t-[#b78338]",
  injury: "border-t-[#3d6f48]",
  therapy: "border-t-[#2f6870]",
  coverage: "border-t-[#714a7d]",
};

const showcaseCopy = {
  en: {
    eyebrow: "Services",
    title: "Find the right clinic service fast.",
    subtitle:
      "Choose the reason for your visit: accident claims, injury care, rehab therapy, or extended coverage support.",
    allServices: "View all services",
    appointment: "Request appointment",
    details: "Details",
    categoryLabels: {
      claims: "Claims",
      injury: "Injury",
      therapy: "Therapy",
      coverage: "Coverage",
    },
    highlights: [
      ["Accident care", "Claims help"],
      ["Mobility", "Rehab plan"],
      ["Performance", "Recovery"],
      ["Fall recovery", "Pain care"],
      ["Strength", "Mobility"],
      ["Spine care", "Joints"],
      ["Soft tissue", "Relax"],
      ["Pain support", "Tension"],
      ["Coverage", "Receipts"],
    ],
    features: [
      {
        icon: ClipboardCheck,
        title: "Claims and coverage handled clearly",
        body: "MVA claims and extended healthcare support without making patients guess the next step.",
      },
      {
        icon: CalendarCheck,
        title: "Booking stays direct",
        body: "A clear request path lets reception follow up and guide patients into the right service.",
      },
      {
        icon: ArrowRight,
        title: "Recovery can evolve",
        body: "Patients can move between chiropractic, physiotherapy, RMT, and acupuncture as needs change.",
      },
    ],
  },
  zh: {
    eyebrow: "服务项目",
    title: "快速找到合适的诊所服务",
    subtitle: "请选择就诊原因：事故理赔、损伤护理、康复治疗或延伸保险支持。",
    allServices: "查看全部服务",
    appointment: "预约",
    details: "详情",
    categoryLabels: {
      claims: "理赔",
      injury: "损伤",
      therapy: "治疗",
      coverage: "保险",
    },
    highlights: [
      ["事故护理", "理赔协助"],
      ["活动能力", "康复计划"],
      ["运动表现", "恢复"],
      ["跌倒恢复", "疼痛护理"],
      ["力量训练", "活动能力"],
      ["脊椎护理", "关节"],
      ["软组织", "放松"],
      ["疼痛支持", "紧张缓解"],
      ["保险福利", "收据"],
    ],
    features: [
      {
        icon: ClipboardCheck,
        title: "理赔与保险支持更清晰",
        body: "为车祸理赔和延伸医疗保险患者说明下一步，不让患者自己猜流程。",
      },
      {
        icon: CalendarCheck,
        title: "预约流程直接明了",
        body: "清楚的预约入口方便前台跟进，并引导患者选择合适服务。",
      },
      {
        icon: ArrowRight,
        title: "康复方案可以调整",
        body: "患者可按需要在脊椎矫正、物理治疗、按摩和针灸之间配合护理。",
      },
    ],
  },
};

export default function ServicesShowcase({
  services,
  language,
}: ServicesShowcaseProps) {
  if (services.length === 0) {
    return null;
  }

  const copy = showcaseCopy[language];
  const serviceRows = services.map((service, index) => ({
    service,
    visual: getServiceVisual(index),
    highlights: copy.highlights[index] ?? getServiceVisual(index).highlights,
  }));

  return (
    <section
      id="services"
      className="relative isolate w-full scroll-mt-32 overflow-hidden bg-[#eef7ef] py-12 text-slate-900 sm:py-14"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#d8ded7]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.68),rgba(238,247,241,0.9)_48%,rgba(250,244,233,0.76))]" />

      <div className="mx-auto w-full max-w-[1500px] px-4 min-[390px]:px-5 sm:px-6 lg:px-12">
        <ScrollReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-[3px] border border-[#cfd9cf] bg-white/82 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#3d6f48] shadow-sm sm:px-4 sm:text-sm sm:tracking-[0.14em]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {copy.eyebrow}
              </div>

              <h2
                className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-slate-950 min-[390px]:text-3xl sm:text-4xl lg:text-5xl lg:leading-[1]"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                {copy.title}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {copy.subtitle}
              </p>
            </div>

            <div className="grid gap-3 min-[440px]:flex min-[440px]:flex-wrap">
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] bg-[#173f32] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#225c49] sm:px-6"
              >
                {copy.allServices}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/booking"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a] sm:px-6"
              >
                {copy.appointment}
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <div className="-mx-4 snap-x overflow-x-auto px-4 pb-3 min-[390px]:-mx-5 min-[390px]:px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <div className="grid auto-cols-[minmax(190px,74vw)] grid-flow-col gap-3 md:auto-cols-[220px] lg:min-w-[1320px] lg:grid-flow-row lg:grid-cols-9 lg:gap-4 2xl:min-w-0">
              {serviceRows.map(({ service, visual, highlights }, index) => {
                const Icon = visual.icon;
                const serviceNumber = String(index + 1).padStart(2, "0");

                return (
                  <Link
                    key={service.title}
                    href="/services"
                    className={`group flex min-h-[188px] snap-start flex-col overflow-hidden rounded-[4px] border border-[#d8ded7] border-t-4 ${categoryAccent[service.category]} bg-white p-4 shadow-[0_12px_26px_rgba(20,48,40,0.065)] transition hover:-translate-y-0.5 hover:border-[#9db09f] hover:shadow-[0_18px_34px_rgba(22,52,42,0.12)] lg:min-h-[194px]`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] ${visual.iconClass}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {serviceNumber}
                      </span>
                    </div>

                    <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {copy.categoryLabels[service.category]}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-950">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {highlights.join(" / ")}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#173f32]">
                      {copy.details}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <div className="grid gap-3 border-t border-[#d8ded7] pt-6 md:grid-cols-3">
            {copy.features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 border-l-4 border-l-[#173f32] bg-white/78 p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-[#173f32] text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
