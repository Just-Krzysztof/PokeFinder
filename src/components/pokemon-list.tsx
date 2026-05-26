"use client";

import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { usePokemonList } from "@/hooks/use-pokemon-list";
import { PokemonCard } from "@/components/pokemon-card";

const LIMIT = 9;

export function PokemonList() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { data, isLoading, isError, error, isFetching } = usePokemonList(
    { limit: LIMIT, offset },
    { placeholderData: keepPreviousData },
  );

  const totalPages = data ? Math.ceil(data.count / LIMIT) : null;

  if (isLoading) return <p className="text-zinc-500">Ładowanie...</p>;
  if (isError) return <p className="text-red-500">Błąd: {error.message}</p>;

  return (
    <div>
      <p className="mb-4 text-sm text-zinc-500">
        Łącznie: {data?.count} pokemonów
      </p>

      <ul
        className={`grid grid-cols-3 gap-4 ${isFetching ? "opacity-60" : ""}`}
      >
        {data?.results.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonCard name={pokemon.name} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          prev
        </button>

        <span className="text-sm text-zinc-500">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          next
        </button>
      </div>
    </div>
  );
}
