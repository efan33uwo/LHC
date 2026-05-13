type FooterProps = {
  clinicName: string;
  tagline: string;
  copyright: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  phoneLabel: string;
  emailLabel: string;
  visitLabel: string;
};

export default function Footer({
  clinicName,
  tagline,
  copyright,
  phone,
  email,
  address,
  hours,
  phoneLabel,
  emailLabel,
  visitLabel,
}: FooterProps) {
  return (
    <footer id="contact" className="border-t border-[#dce8df] bg-[#fbfdfb]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.2fr]">
        <div>
          <h3
            className="text-xl font-semibold tracking-tight text-slate-950"
            style={{ fontFamily: "var(--font-source-serif)" }}
          >
            {clinicName}
          </h3>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-600">
            {tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3d6f48]">
            {phoneLabel}
          </p>
          <a
            href={`tel:${phone}`}
            className="mt-4 block text-sm font-medium leading-7 text-slate-700 transition hover:text-green-700"
          >
            {phone}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3d6f48]">
            {emailLabel}
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-4 block text-sm font-medium leading-7 text-slate-700 transition hover:text-green-700"
          >
            {email}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3d6f48]">
            {visitLabel}
          </p>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
            {address}
          </p>
          <p className="mt-1 text-sm leading-7 text-slate-600">{hours}</p>
        </div>
      </div>

      <div className="border-t border-[#e4eee7] px-6 py-5 text-center text-xs font-medium text-slate-500 sm:px-8">
        &copy; {new Date().getFullYear()} {clinicName}. {copyright}
      </div>
    </footer>
  );
}
