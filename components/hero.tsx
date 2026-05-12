import Link from "next/link";
import HeroSlider from "@/components/hero-slider";

type HeroProps = {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
};

export default function Hero({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="relative isolate left-1/2 right-1/2 w-screen min-h-[420px] -translate-x-1/2 overflow-hidden sm:min-h-[500px] lg:min-h-[580px]">
      <HeroSlider />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-slate-900/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

      <div className="relative z-10 flex min-h-[420px] w-full items-center px-6 py-12 sm:min-h-[500px] sm:px-10 sm:py-16 lg:min-h-[580px] lg:px-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            {badge}
          </span>

          <h1
            className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            Modern care for everyday health, recovery, and family wellness
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            Langham Health Center provides a professional clinic experience with
            family medicine, chiropractic care, and supportive wellness services
            in one welcoming setting.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={primaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-green-200 bg-green-100 px-6 py-3 text-sm font-medium text-green-900 transition hover:bg-green-200"
            >
              {primaryCta}
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-green-200 bg-green-100 px-6 py-3 text-sm font-medium text-green-900 transition hover:bg-green-200"
            >
              {secondaryCta}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/85">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              Family Medicine
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              Chiropractic Care
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              English and Chinese Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}