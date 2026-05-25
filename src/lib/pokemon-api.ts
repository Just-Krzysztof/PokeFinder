import type { PokemonListParams, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList({
  limit = 9,
  offset = 0,
}: PokemonListParams = {}): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error(`PokeAPI error: ${response.status}`);
  }

  return response.json() as Promise<PokemonListResponse>;
}
