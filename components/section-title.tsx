type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  const alignClasses = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClasses}`}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.14em] text-green-700">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}