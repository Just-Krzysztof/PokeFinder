"use client";

import { useTranslations } from "next-intl";
import { useFavoritesStore } from "@/store/favorites";
import { useComparisonStore } from "@/store/comparison";

export type View = "all" | "favorites" | "comparison";

interface NavProps {
  activeView: View;
  onChange: (view: View) => void;
}

export function Nav({ activeView, onChange }: NavProps) {
  const t = useTranslations("nav");
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);
  const comparisonCount = useComparisonStore((s) => s.comparison.length);

  const tabs: { id: View; label: string; badge?: number }[] = [
    { id: "all", label: t("all") },
    { id: "favorites", label: t("favorites"), badge: favoritesCount },
    { id: "comparison", label: t("comparison"), badge: comparisonCount },
  ];

  return (
    <nav className="flex gap-1 border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            activeView === tab.id
              ? "border-b-2 border-black text-black dark:border-white dark:text-white"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          {tab.label}
          {tab.badge !== undefined && tab.badge > 0 && (
            <span className="ml-1.5 rounded-full bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-700">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
