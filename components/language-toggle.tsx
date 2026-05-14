"use client";

import { Language, t } from "@/lib/translations";

type LanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
};

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex shrink-0 border border-slate-300 bg-white text-xs">
      {(["en", "zh"] as const).map((option) => {
        const active = option === language;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-2.5 py-1.5 font-medium sm:px-3 ${
              active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {option === "en" ? t(language, "langEnglish") : t(language, "langChinese")}
          </button>
        );
      })}
    </div>
  );
}
