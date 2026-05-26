import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/test/utils";
import { PokemonCard } from "./pokemon-card";
import { useFavoritesStore } from "@/store/favorites";
import { useComparisonStore } from "@/store/comparison";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

vi.mock("@/hooks/use-pokemon-basic", () => ({
  usePokemonBasic: vi.fn(),
}));

import { usePokemonBasic } from "@/hooks/use-pokemon-basic";

const mockUsePokemonBasic = vi.mocked(usePokemonBasic);

const pikachuData = {
  id: 25,
  name: "pikachu",
  spriteUrl: "https://example.com/pikachu.png",
  types: ["electric"],
};

beforeEach(() => {
  useFavoritesStore.setState({ favorites: [] });
  useComparisonStore.setState({ comparison: [] });
  vi.clearAllMocks();
});

describe("PokemonCard", () => {
  it("shows loading state", () => {
    mockUsePokemonBasic.mockReturnValue({ data: undefined, isLoading: true, isError: false } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUsePokemonBasic.mockReturnValue({ data: undefined, isLoading: false, isError: true } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders pokemon name, id and type", () => {
    mockUsePokemonBasic.mockReturnValue({ data: pikachuData, isLoading: false, isError: false } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("#25")).toBeInTheDocument();
    expect(screen.getByText("Electric")).toBeInTheDocument();
  });

  it("renders sprite image", () => {
    mockUsePokemonBasic.mockReturnValue({ data: pikachuData, isLoading: false, isError: false } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);
    const img = screen.getByRole("img", { name: "pikachu" });
    expect(img).toHaveAttribute("src", "https://example.com/pikachu.png");
  });

  it("renders details button and calls onDetails callback", async () => {
    mockUsePokemonBasic.mockReturnValue({ data: pikachuData, isLoading: false, isError: false } as never);
    const onDetails = vi.fn();
    renderWithIntl(<PokemonCard name="pikachu" onDetails={onDetails} />);
    await userEvent.click(screen.getByText("Details"));
    expect(onDetails).toHaveBeenCalledWith("pikachu");
  });

  it("does not render details button without onDetails prop", () => {
    mockUsePokemonBasic.mockReturnValue({ data: pikachuData, isLoading: false, isError: false } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);
    expect(screen.queryByText("Details")).not.toBeInTheDocument();
  });

  it("toggles favorite on heart button click", async () => {
    mockUsePokemonBasic.mockReturnValue({ data: pikachuData, isLoading: false, isError: false } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);

    const btn = screen.getByRole("button", { name: "Add to favorites" });
    await userEvent.click(btn);
    expect(useFavoritesStore.getState().isFavorite("pikachu")).toBe(true);

    const btnAfter = screen.getByRole("button", { name: "Remove from favorites" });
    await userEvent.click(btnAfter);
    expect(useFavoritesStore.getState().isFavorite("pikachu")).toBe(false);
  });

  it("toggles comparison on zap button click", async () => {
    mockUsePokemonBasic.mockReturnValue({ data: pikachuData, isLoading: false, isError: false } as never);
    renderWithIntl(<PokemonCard name="pikachu" />);

    const btn = screen.getByRole("button", { name: "Add to comparison" });
    await userEvent.click(btn);
    expect(useComparisonStore.getState().isInComparison("pikachu")).toBe(true);

    const btnAfter = screen.getByRole("button", { name: "Remove from comparison" });
    await userEvent.click(btnAfter);
    expect(useComparisonStore.getState().isInComparison("pikachu")).toBe(false);
  });
});
