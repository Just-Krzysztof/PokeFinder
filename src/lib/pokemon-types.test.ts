import { describe, it, expect } from "vitest";
import { TYPE_GRADIENT, getTypeGradient } from "./pokemon-types";

const FALLBACK = "bg-gradient-to-br from-zinc-400 to-zinc-300";

describe("getTypeGradient", () => {
  it("returns correct gradient for each known type", () => {
    for (const [type, gradient] of Object.entries(TYPE_GRADIENT)) {
      expect(getTypeGradient(type)).toBe(gradient);
    }
  });

  it("returns fallback for unknown type", () => {
    expect(getTypeGradient("unknown")).toBe(FALLBACK);
    expect(getTypeGradient("")).toBe(FALLBACK);
    expect(getTypeGradient("FIRE")).toBe(FALLBACK);
  });

  it("covers all 18 standard pokemon types", () => {
    const expectedTypes = [
      "normal", "fire", "water", "electric", "grass", "ice",
      "fighting", "poison", "ground", "flying", "psychic", "bug",
      "rock", "ghost", "dragon", "dark", "steel", "fairy",
    ];
    expect(Object.keys(TYPE_GRADIENT)).toEqual(expect.arrayContaining(expectedTypes));
    expect(Object.keys(TYPE_GRADIENT)).toHaveLength(18);
  });
});
