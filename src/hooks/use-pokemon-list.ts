"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchPokemonList } from "@/lib/pokemon-api";
import type { PokemonListParams, PokemonListResponse } from "@/types/pokemon";

type ExtraOptions = Omit<
  UseQueryOptions<PokemonListResponse>,
  "queryKey" | "queryFn"
>;

export function usePokemonList(
  params: PokemonListParams = {},
  options?: ExtraOptions
) {
  return useQuery({
    queryKey: ["pokemon-list", params],
    queryFn: () => fetchPokemonList(params),
    ...options,
  });
}
