import Link from "next/link";

type BookingCTAProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
};

export default function BookingCTA({
  title,
  description,
  buttonText,
  buttonHref = "/booking",
}: BookingCTAProps) {
  const isExternal = buttonHref.startsWith("http");
  const isHash = buttonHref.startsWith("#");

  const buttonClass =
    "inline-flex min-h-11 shrink-0 items-center justify-center rounded-[3px] border border-[#173f32] bg-[#173f32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#225c49]";

  return (
    <section className="relative overflow-hidden rounded-[3px] border border-[#b7c7b8] bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-green-700">
            Book an Appointment
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {title}
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-[3px] border border-green-200 bg-white px-4 py-2">
              Quick request form
            </span>
            <span className="rounded-[3px] border border-green-200 bg-white px-4 py-2">
              Clinic follow-up
            </span>
            <span className="rounded-[3px] border border-green-200 bg-white px-4 py-2">
              English and Chinese support
            </span>
          </div>
        </div>

        <div className="flex shrink-0">
          {isExternal || isHash ? (
            <a href={buttonHref} className={buttonClass}>
              {buttonText}
            </a>
          ) : (
            <Link href={buttonHref} className={buttonClass}>
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
