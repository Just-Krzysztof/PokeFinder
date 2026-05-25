import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("welcome");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-xl text-zinc-500">{t("subtitle")}</p>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        {t("description")}
      </p>
      <button className="mt-4 rounded-full bg-black px-6 py-2 text-white cursor-pointer dark:bg-white dark:text-black">
        {t("cta")}
      </button>
    </main>
  );
}
