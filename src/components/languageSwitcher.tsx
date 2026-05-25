"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { locales, type Locale } from "@/i18n/config";
import { setLocale } from "@/i18n/actions";

export function LanguageSwitcher() {
  const router = useRouter();
  const current = useLocale();
  const [isPending, startTransition] = useTransition();

  function switchLocale(locale: Locale) {
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  }

  return (
    <div className="flex gap-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={isPending}
          aria-pressed={locale === current}
          className="px-2 py-1 text-sm rounded uppercase aria-pressed:font-bold aria-pressed:underline disabled:opacity-50 cursor-pointer"
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
