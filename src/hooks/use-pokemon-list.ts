"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/lib/pokemon-api";
import type { PokemonListParams } from "@/types/pokemon";

export function usePokemonList(params: PokemonListParams = {}) {
  return useQuery({
    queryKey: ["pokemon-list", params],
    queryFn: () => fetchPokemonList(params),
  });
}
