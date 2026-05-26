"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonTypes } from "@/lib/pokemon-api";

const LEGACY_TYPES = new Set(["unknown", "shadow"]);

export function usePokemonTypes() {
  return useQuery({
    queryKey: ["pokemon-types"],
    queryFn: async () => {
      const data = await fetchPokemonTypes();
      return data.results.filter((t) => !LEGACY_TYPES.has(t.name));
    },
    staleTime: Infinity,
  });
}
