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
    <section className="relative isolate w-full min-h-[560px] overflow-hidden sm:min-h-[620px] lg:min-h-[760px]">
      <HeroSlider />

      <div className="relative z-10 flex min-h-[560px] w-full items-start px-4 pb-12 pt-8 sm:min-h-[620px] sm:px-10 sm:pb-16 sm:pt-14 lg:min-h-[760px] lg:px-16 lg:pt-16">
        <div className="w-full min-w-0 max-w-3xl">
          <span className="inline-block max-w-[calc(100vw-2rem)] rounded-[3px] border border-white/20 bg-white/14 px-3 py-2 text-[0.66rem] font-semibold uppercase leading-5 tracking-[0.08em] text-white shadow-[0_10px_28px_rgba(0,0,0,0.14)] backdrop-blur-md sm:max-w-full sm:px-4 sm:text-xs sm:tracking-[0.14em]">
            {badge}
          </span>

          <h1
            className="mt-5 max-w-[21rem] break-words text-3xl font-semibold tracking-tight text-white sm:mt-6 sm:max-w-4xl sm:text-5xl lg:text-6xl lg:leading-[1.02]"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            {title}
          </h1>

          <p className="mt-5 max-w-[21rem] text-sm leading-7 text-white/90 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={primaryHref}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[3px] border border-[#d9b36f] bg-[#d9b36f] px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_14px_30px_rgba(217,179,111,0.28)] transition hover:bg-[#caa15a] sm:min-h-14 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              {primaryCta}
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-[3px] border border-white bg-white px-6 py-3.5 text-sm font-semibold text-[#10261f] shadow-[0_14px_30px_rgba(255,255,255,0.18)] transition hover:bg-[#e6f1ea] sm:min-h-14 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              {secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
