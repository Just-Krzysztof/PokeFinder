import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

const MAX_COMPARISON = 2;

interface ComparisonState {
    comparison: string[];
    toggleComparison: (name: string) => void;
    isInComparison: (name: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>()(
    persist(
        (set, get) => ({
            comparison: [],
            toggleComparison: (name) => {
                const { comparison } = get();
                if (comparison.includes(name)) {
                    set({ comparison: comparison.filter((n) => n !== name) });
                    return;
                }
                if (comparison.length >= MAX_COMPARISON) {
                    toast.error(`Mozesz dodać tylko ${MAX_COMPARISON} Pokémonów w tym samym czasie.`);
                    return;
                }
                set({ comparison: [...comparison, name] });
            },
            isInComparison: (name) => get().comparison.includes(name),
        }),
        { name: "pokemon-comparison" },
    ),
);