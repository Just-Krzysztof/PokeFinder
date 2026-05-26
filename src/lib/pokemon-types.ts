export const TYPE_GRADIENT: Record<string, string> = {
  normal: "bg-gradient-to-br from-zinc-400 to-zinc-300",
  fire: "bg-gradient-to-br from-orange-600 to-amber-400",
  water: "bg-gradient-to-br from-blue-600 to-cyan-400",
  electric: "bg-gradient-to-br from-yellow-500 to-yellow-300",
  grass: "bg-gradient-to-br from-green-600 to-lime-400",
  ice: "bg-gradient-to-br from-cyan-500 to-sky-300",
  fighting: "bg-gradient-to-br from-red-700 to-red-500",
  poison: "bg-gradient-to-br from-purple-600 to-fuchsia-400",
  ground: "bg-gradient-to-br from-yellow-700 to-amber-400",
  flying: "bg-gradient-to-br from-indigo-500 to-sky-400",
  psychic: "bg-gradient-to-br from-pink-600 to-rose-400",
  bug: "bg-gradient-to-br from-lime-600 to-lime-400",
  rock: "bg-gradient-to-br from-yellow-800 to-yellow-600",
  ghost: "bg-gradient-to-br from-purple-900 to-purple-600",
  dragon: "bg-gradient-to-br from-violet-800 to-violet-500",
  dark: "bg-gradient-to-br from-zinc-800 to-zinc-600",
  steel: "bg-gradient-to-br from-slate-500 to-slate-300",
  fairy: "bg-gradient-to-br from-pink-300 to-pink-200",
};

export function getTypeGradient(type: string): string {
  return TYPE_GRADIENT[type] ?? "bg-gradient-to-br from-zinc-400 to-zinc-300";
}
