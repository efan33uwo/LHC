"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Language, t } from "@/lib/translations";
import LanguageToggle from "@/components/language-toggle";
import TopBar from "@/components/top-bar";
import { clinicContent } from "@/lib/clinic-content";

type HeaderProps = {
  clinicName: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export default function Header({
  clinicName,
  language,
  onLanguageChange,
}: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t(language, "navHome") },
    { href: "/about", label: t(language, "navAbout") },
    { href: "/services", label: t(language, "navServices") },
    { href: "/contact", label: t(language, "navContact") },
  ];

  const getNavClass = (href: string) => {
    const isActive = pathname === href;

    return isActive
      ? "rounded-[3px] bg-green-100 px-2 py-2 text-xs font-medium text-green-900 sm:px-3.5 sm:text-base"
      : "rounded-[3px] px-2 py-2 text-xs text-slate-700 transition hover:bg-green-50 hover:text-green-700 sm:px-3.5 sm:text-base";
  };

  return (
    <>
      <TopBar
        phone={clinicContent.phone}
        email={clinicContent.email}
        address={clinicContent.address}
        hours={clinicContent.hours}
      />

      <header className="sticky top-0 z-30 border-b border-green-100 bg-white/95 backdrop-blur">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:flex-nowrap sm:px-8 sm:py-3 xl:px-10">
          <Link href="/" className="flex min-w-0 basis-full items-center gap-2.5 sm:basis-auto sm:flex-1 sm:gap-3">
            <Image
              src="/Langham-Health-Logo.png"
              alt={`${clinicName} logo`}
              width={96}
              height={96}
              className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16 xl:h-20 xl:w-20"
              priority
            />
            <span
              className="max-w-[15rem] truncate text-xl font-semibold tracking-tight text-slate-900 sm:max-w-[24rem] sm:text-2xl xl:text-2xl 2xl:text-3xl"
              style={{ fontFamily: "var(--font-source-serif)" }}
            >
              {clinicName}
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-2 text-base xl:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={getNavClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex w-full shrink-0 items-center justify-start gap-2 sm:ml-auto sm:w-auto sm:gap-3">
            <Link
              href="/booking"
              className="rounded-[3px] border border-green-200 bg-green-100 px-3.5 py-2 text-sm font-medium text-green-900 transition hover:bg-green-200 sm:px-6 sm:py-2.5 sm:text-base"
            >
              {t(language, "navBooking")}
            </Link>

            <LanguageToggle language={language} onChange={onLanguageChange} />
          </div>
        </div>

        <div className="border-t border-green-100 px-3 py-2 sm:px-8 sm:py-3 xl:hidden xl:px-14">
          <nav className="mx-auto grid w-full max-w-[22rem] grid-cols-2 items-center gap-1.5 text-center min-[430px]:max-w-none min-[430px]:grid-cols-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={getNavClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
