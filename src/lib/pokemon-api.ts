import type {
  PokemonApiResponse,
  PokemonBasic,
  PokemonByTypeResponse,
  PokemonDetails,
  PokemonListParams,
  PokemonListResponse,
  PokemonTypesResponse,
} from "@/types/pokemon";

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

export async function fetchPokemonBasic(
  nameOrId: string | number
): Promise<PokemonBasic> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error(`PokeAPI error: ${response.status}`);
  }

  const data = (await response.json()) as PokemonApiResponse;

  return {
    id: data.id,
    name: data.name,
    spriteUrl: data.sprites.front_default,
    types: data.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name),
  };
}

export function getPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) throw new Error(`Cannot parse ID from URL: ${url}`);
  return Number(match[1]);
}

export async function fetchPokemonTypes(): Promise<PokemonTypesResponse> {
  const response = await fetch(`${BASE_URL}/type?limit=100`);
  if (!response.ok) throw new Error(`PokeAPI error: ${response.status}`);
  return response.json() as Promise<PokemonTypesResponse>;
}

export async function fetchPokemonByType(typeName: string): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/type/${typeName}`);
  if (!response.ok) throw new Error(`PokeAPI error: ${response.status}`);
  const data = (await response.json()) as PokemonByTypeResponse;
  return data.pokemon.map((entry) => entry.pokemon.name);
}

export async function fetchPokemonDetails(
  nameOrId: string | number
): Promise<PokemonDetails> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error(`PokeAPI error: ${response.status}`);
  const data = (await response.json()) as PokemonApiResponse & {
    height: number;
    weight: number;
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string }; is_hidden: boolean }[];
  };
  return {
    id: data.id,
    name: data.name,
    spriteUrl: data.sprites.front_default,
    types: data.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    abilities: data.abilities
      .filter((a) => !a.is_hidden)
      .map((a) => a.ability.name),
  };
}
