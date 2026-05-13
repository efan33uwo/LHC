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
      ? "rounded-[3px] bg-green-100 px-3.5 py-2 font-medium text-green-900"
      : "rounded-[3px] px-3.5 py-2 text-slate-700 transition hover:bg-green-50 hover:text-green-700";
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
        <div className="flex w-full items-center justify-between gap-5 px-5 py-3 sm:px-8 xl:px-10">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
            <Image
              src="/Langham-Health-Logo.png"
              alt={`${clinicName} logo`}
              width={96}
              height={96}
              className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
              priority
            />
            <span
              className="max-w-[15rem] truncate text-2xl font-semibold tracking-tight text-slate-900 sm:max-w-[24rem] sm:text-3xl xl:text-2xl 2xl:text-3xl"
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

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/booking"
              className="rounded-[3px] border border-green-200 bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 transition hover:bg-green-200 sm:px-6 sm:text-base"
            >
              {t(language, "navBooking")}
            </Link>

            <LanguageToggle language={language} onChange={onLanguageChange} />
          </div>
        </div>

        <div className="border-t border-green-100 px-8 py-3 xl:hidden xl:px-14">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-base">
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
