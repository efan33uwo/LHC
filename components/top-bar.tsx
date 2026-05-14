type TopBarProps = {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  
  export default function TopBar({
    phone,
    email,
    address,
    hours,
  }: TopBarProps) {
  return (
    <div className="border-b border-green-200 bg-green-50 text-slate-700">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-1.5 text-[0.72rem] leading-5 sm:px-8 sm:text-sm md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-start">
          <a href={`tel:${phone}`} className="hover:text-slate-900">
            {phone}
          </a>
            <a href={`mailto:${email}`} className="hover:text-slate-900">
              {email}
          </a>
        </div>
  
        <div className="hidden flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center sm:flex md:justify-end">
          <span className="max-w-full">{address}</span>
          <span>{hours}</span>
        </div>
      </div>
    </div>
    );
  }
