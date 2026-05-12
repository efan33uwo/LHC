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
    { href: "/booking", label: t(language, "navBooking") },
    { href: "/contact", label: t(language, "navContact") },
  ];

  const getNavClass = (href: string) => {
    const isActive = pathname === href;

    return isActive
      ? "rounded-full bg-green-100 px-4 py-2 font-medium text-green-900"
      : "rounded-full px-4 py-2 text-slate-700 transition hover:bg-green-50 hover:text-green-700";
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
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-8 px-8 py-4 xl:px-14">
          <Link href="/" className="flex min-w-0 items-center gap-4 justify-self-start">
            <Image
              src="/Langham-Health-Logo.png"
              alt={`${clinicName} logo`}
              width={150}
              height={150}
              className="h-24 w-24 shrink-0 object-contain sm:h-28 sm:w-28"
              priority
            />
            <span
              className="truncate text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-source-serif)" }}
            >
              {clinicName}
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-6 text-lg xl:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={getNavClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 justify-self-end">
            <Link
              href="/booking"
              className="rounded-full border border-green-200 bg-green-100 px-7 py-3 text-base font-medium text-green-900 transition hover:bg-green-200"
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