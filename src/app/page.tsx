import { PokemonList } from "@/components/pokemon-list";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Pokémony</h1>
      <PokemonList />
    </main>
  );
}
