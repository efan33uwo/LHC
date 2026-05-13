import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardCheck, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import type { ServiceItem } from "@/lib/clinic-content";
import { getServiceVisual } from "@/components/service-visuals";

type ServicesShowcaseProps = {
  services: ServiceItem[];
};

const categoryLabels: Record<ServiceItem["category"], string> = {
  claims: "Claims",
  injury: "Injury",
  therapy: "Therapy",
  coverage: "Coverage",
};

const categoryAccent: Record<ServiceItem["category"], string> = {
  claims: "border-t-[#b78338]",
  injury: "border-t-[#3d6f48]",
  therapy: "border-t-[#2f6870]",
  coverage: "border-t-[#714a7d]",
};

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  if (services.length === 0) {
    return null;
  }

  const serviceRows = services.map((service, index) => ({
    service,
    visual: getServiceVisual(index),
  }));

  return (
    <section
      id="services"
      className="relative isolate w-full scroll-mt-32 overflow-hidden bg-[#f7faf6] py-12 text-slate-900 sm:py-14"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#d8ded7]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(238,247,241,0.84)_48%,rgba(250,244,233,0.76))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-white/70" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-[3px] border border-[#cfd9cf] bg-white/82 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#3d6f48] shadow-sm">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Services
              </div>

              <h2
                className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl lg:leading-[1]"
                style={{ fontFamily: "var(--font-source-serif)" }}
              >
                Find the right clinic service fast.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Choose the reason for your visit: accident claims, injury care,
                rehab therapy, or extended coverage support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] bg-[#173f32] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#225c49]"
              >
                View all services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/booking"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-[#caa15a]"
              >
                Request appointment
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
            <div className="grid min-w-[1180px] grid-cols-9 gap-3 xl:min-w-0">
              {serviceRows.map(({ service, visual }, index) => {
                const Icon = visual.icon;
                const serviceNumber = String(index + 1).padStart(2, "0");

                return (
                  <Link
                    key={service.title}
                    href="/services"
                    className={`group flex min-h-[176px] flex-col overflow-hidden border border-[#d8ded7] border-t-4 ${categoryAccent[service.category]} bg-white p-3.5 shadow-[0_10px_22px_rgba(20,48,40,0.055)] transition hover:-translate-y-0.5 hover:border-[#a8b8aa] hover:shadow-[0_14px_30px_rgba(22,52,42,0.1)]`}
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
                      {categoryLabels[service.category]}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-950">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {visual.highlights.join(" / ")}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#173f32]">
                      Details
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
            {[
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
            ].map((item) => {
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
