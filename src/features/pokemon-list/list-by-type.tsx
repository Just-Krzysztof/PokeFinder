"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePokemonByType } from "@/hooks/use-pokemon-by-type";
import { PokemonCard } from "@/components/pokemon-card";
import { Pagination } from "./pagination";

const LIMIT = 9;

interface PokemonListByTypeProps {
  typeName: string;
}

export function PokemonListByType({ typeName }: PokemonListByTypeProps) {
  const t = useTranslations("list");
  const [page, setPage] = useState(1);
  const { data: allNames, isLoading, isError } = usePokemonByType(typeName);

  const totalPages = allNames ? Math.ceil(allNames.length / LIMIT) : null;
  const pageNames = allNames ? allNames.slice((page - 1) * LIMIT, page * LIMIT) : [];

  if (isLoading) return <p className="text-zinc-500">{t("loading")}</p>;
  if (isError) return <p className="text-red-500">{t("typeError")}</p>;

  return (
    <div>
      <p className="mb-4 text-sm text-zinc-500">
        {t("typeTotal", { count: allNames?.length ?? 0, type: typeName })}
      </p>
      <ul className="grid grid-cols-3 gap-4">
        {pageNames.map((name) => (
          <li key={name}>
            <PokemonCard name={name} />
          </li>
        ))}
      </ul>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
