export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListParams {
  limit?: number;
  offset?: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: PokemonType[];
}

export interface PokemonBasic {
  id: number;
  name: string;
  spriteUrl: string | null;
  types: string[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetails extends PokemonBasic {
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: string[];
}

export interface PokemonTypeInfo {
  name: string;
  url: string;
}

export interface PokemonTypesResponse {
  results: PokemonTypeInfo[];
}

export interface PokemonByTypeEntry {
  pokemon: { name: string; url: string };
  slot: number;
}

export interface PokemonByTypeResponse {
  pokemon: PokemonByTypeEntry[];
}
