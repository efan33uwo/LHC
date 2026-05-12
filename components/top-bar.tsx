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
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-2 text-xs sm:px-8 sm:text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
            <a href={`tel:${phone}`} className="hover:text-slate-900">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-slate-900">
              {email}
            </a>
          </div>
  
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
            <span>{address}</span>
            <span>{hours}</span>
          </div>
        </div>
      </div>
    );
  }