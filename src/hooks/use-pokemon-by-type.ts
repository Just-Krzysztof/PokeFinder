"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByType } from "@/lib/pokemon-api";

export function usePokemonByType(typeName: string | null) {
  return useQuery({
    queryKey: ["pokemon-by-type", typeName],
    queryFn: () => fetchPokemonByType(typeName!),
    enabled: typeName !== null,
    staleTime: Infinity,
  });
}
