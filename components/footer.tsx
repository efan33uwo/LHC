type FooterProps = {
  clinicName: string;
  tagline: string;
  copyright: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
};

export default function Footer({
  clinicName,
  tagline,
  copyright,
  phone,
  email,
  address,
  hours,
}: FooterProps) {
  return (
    <footer id="contact" className="border-t border-green-100 bg-white">
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{clinicName}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Telephone</p>
          <a
            href={`tel:${phone}`}
            className="mt-3 block text-sm leading-7 text-slate-600 transition hover:text-green-700"
          >
            {phone}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Email</p>
          <a
            href={`mailto:${email}`}
            className="mt-3 block text-sm leading-7 text-slate-600 transition hover:text-green-700"
          >
            {email}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Visit Us</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">{address}</p>
          <p className="mt-1 text-sm leading-7 text-slate-600">{hours}</p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4 text-center text-xs text-slate-500 sm:px-8">
        © {new Date().getFullYear()} {clinicName}. {copyright}
      </div>
    </footer>
  );
}
