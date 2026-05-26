"use client";

import { PokemonListAll } from "./list-all";
import { PokemonListByType } from "./list-by-type";

interface PokemonListProps {
  selectedType?: string | null;
}

export function PokemonList({ selectedType }: PokemonListProps) {
  if (selectedType) {
    return <PokemonListByType typeName={selectedType} />;
  }
  return <PokemonListAll />;
}
