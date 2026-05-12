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
    "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-100 px-6 py-3 text-sm font-medium text-green-900 transition hover:bg-green-200";

  return (
    <section className="relative overflow-hidden rounded-[2rem] border-2 border-green-300 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-12">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-100/70 blur-2xl" />
      <div className="absolute -bottom-16 left-0 h-44 w-44 rounded-full bg-[#e5f2e9] blur-2xl" />

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
            <span className="rounded-full border border-green-200 bg-white px-4 py-2">
              Quick request form
            </span>
            <span className="rounded-full border border-green-200 bg-white px-4 py-2">
              Clinic follow-up
            </span>
            <span className="rounded-full border border-green-200 bg-white px-4 py-2">
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