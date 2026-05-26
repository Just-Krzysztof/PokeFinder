import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  fetchPokemonList,
  fetchPokemonBasic,
  fetchPokemonTypes,
  fetchPokemonByType,
  fetchPokemonDetails,
  getPokemonIdFromUrl,
} from "./pokemon-api";

function mockFetch(data: unknown, ok = true) {
  return vi.spyOn(global, "fetch").mockResolvedValueOnce({
    ok,
    status: ok ? 200 : 404,
    json: async () => data,
  } as Response);
}

beforeEach(() => {
  vi.restoreAllMocks();
});

// getPokemonIdFromUrl — pure, no fetch
describe("getPokemonIdFromUrl", () => {
  it("extracts id from trailing slash url", () => {
    expect(getPokemonIdFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
  });

  it("extracts id from url without trailing slash", () => {
    expect(getPokemonIdFromUrl("https://pokeapi.co/api/v2/pokemon/132")).toBe(132);
  });

  it("throws on malformed url", () => {
    expect(() => getPokemonIdFromUrl("https://pokeapi.co/no-id-here/")).toThrow();
  });
});

// fetchPokemonList
describe("fetchPokemonList", () => {
  it("returns list response", async () => {
    const payload = { count: 1302, next: "...", previous: null, results: [] };
    mockFetch(payload);
    const result = await fetchPokemonList({ limit: 9, offset: 0 });
    expect(result.count).toBe(1302);
  });

  it("uses default limit=9 offset=0", async () => {
    mockFetch({ count: 0, next: null, previous: null, results: [] });
    await fetchPokemonList();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("limit=9&offset=0"));
  });

  it("throws on non-ok response", async () => {
    mockFetch({}, false);
    await expect(fetchPokemonList()).rejects.toThrow("PokeAPI error: 404");
  });
});

// fetchPokemonBasic
const rawPokemon = {
  id: 25,
  name: "pikachu",
  sprites: { front_default: "https://example.com/pikachu.png" },
  types: [
    { slot: 1, type: { name: "electric", url: "" } },
  ],
};

describe("fetchPokemonBasic", () => {
  it("maps raw api response to PokemonBasic shape", async () => {
    mockFetch(rawPokemon);
    const result = await fetchPokemonBasic("pikachu");
    expect(result).toEqual({
      id: 25,
      name: "pikachu",
      spriteUrl: "https://example.com/pikachu.png",
      types: ["electric"],
    });
  });

  it("sorts types by slot", async () => {
    mockFetch({
      ...rawPokemon,
      types: [
        { slot: 2, type: { name: "flying", url: "" } },
        { slot: 1, type: { name: "normal", url: "" } },
      ],
    });
    const result = await fetchPokemonBasic("pidgey");
    expect(result.types).toEqual(["normal", "flying"]);
  });

  it("throws on non-ok response", async () => {
    mockFetch({}, false);
    await expect(fetchPokemonBasic("unknown")).rejects.toThrow("PokeAPI error: 404");
  });
});

// fetchPokemonTypes
describe("fetchPokemonTypes", () => {
  it("returns types list", async () => {
    const payload = { results: [{ name: "fire", url: "" }, { name: "water", url: "" }] };
    mockFetch(payload);
    const result = await fetchPokemonTypes();
    expect(result.results).toHaveLength(2);
    expect(result.results[0].name).toBe("fire");
  });

  it("throws on non-ok response", async () => {
    mockFetch({}, false);
    await expect(fetchPokemonTypes()).rejects.toThrow("PokeAPI error: 404");
  });
});

// fetchPokemonByType
describe("fetchPokemonByType", () => {
  it("returns array of pokemon names for a type", async () => {
    mockFetch({
      pokemon: [
        { pokemon: { name: "charmander", url: "" }, slot: 1 },
        { pokemon: { name: "charizard", url: "" }, slot: 1 },
      ],
    });
    const result = await fetchPokemonByType("fire");
    expect(result).toEqual(["charmander", "charizard"]);
  });

  it("throws on non-ok response", async () => {
    mockFetch({}, false);
    await expect(fetchPokemonByType("fire")).rejects.toThrow("PokeAPI error: 404");
  });
});

// fetchPokemonDetails
const rawDetails = {
  ...rawPokemon,
  height: 4,
  weight: 60,
  stats: [
    { base_stat: 35, stat: { name: "hp" } },
    { base_stat: 55, stat: { name: "attack" } },
  ],
  abilities: [
    { ability: { name: "static" }, is_hidden: false },
    { ability: { name: "lightning-rod" }, is_hidden: true },
  ],
};

describe("fetchPokemonDetails", () => {
  it("maps raw api response to PokemonDetails shape", async () => {
    mockFetch(rawDetails);
    const result = await fetchPokemonDetails("pikachu");
    expect(result).toEqual({
      id: 25,
      name: "pikachu",
      spriteUrl: "https://example.com/pikachu.png",
      types: ["electric"],
      height: 4,
      weight: 60,
      stats: [
        { name: "hp", value: 35 },
        { name: "attack", value: 55 },
      ],
      abilities: ["static"],
    });
  });

  it("excludes hidden abilities", async () => {
    mockFetch(rawDetails);
    const result = await fetchPokemonDetails("pikachu");
    expect(result.abilities).not.toContain("lightning-rod");
  });

  it("throws on non-ok response", async () => {
    mockFetch({}, false);
    await expect(fetchPokemonDetails("pikachu")).rejects.toThrow("PokeAPI error: 404");
  });
});
