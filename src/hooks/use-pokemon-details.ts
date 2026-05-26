"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "@/lib/pokemon-api";

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ["pokemon-details", name],
    queryFn: () => fetchPokemonDetails(name),
  });
}
