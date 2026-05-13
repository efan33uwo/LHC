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
  quickLinks: string[];
};

export default function Hero({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
  quickLinks,
}: HeroProps) {
  return (
    <section className="relative isolate left-1/2 right-1/2 w-screen min-h-[520px] -translate-x-1/2 overflow-hidden sm:min-h-[620px] lg:min-h-[760px]">
      <HeroSlider />

      <div className="relative z-10 flex min-h-[520px] w-full items-start px-6 pb-14 pt-20 sm:min-h-[620px] sm:px-10 sm:pb-16 sm:pt-24 lg:min-h-[760px] lg:px-16 lg:pt-28">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-[3px] border border-white/20 bg-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.14)] backdrop-blur-md">
            {badge}
          </span>

          <h1
            className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={primaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_26px_rgba(217,179,111,0.25)] transition hover:bg-[#caa15a]"
            >
              {primaryCta}
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-white bg-white px-6 py-3 text-sm font-semibold text-[#10261f] shadow-[0_10px_26px_rgba(255,255,255,0.16)] transition hover:bg-[#e6f1ea]"
            >
              {secondaryCta}
            </Link>
          </div>

          <div className="mt-8 grid max-w-2xl gap-2 sm:grid-cols-3">
            {quickLinks.map((item, index) => (
              <span
                key={item}
                className="group flex min-h-14 items-center gap-3 rounded-[3px] border border-white/18 bg-white/[0.09] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-md"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] border border-white/16 bg-white/12 font-mono text-[0.65rem] text-[#f0d398]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
