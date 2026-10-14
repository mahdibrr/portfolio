import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("Published portfolio sitemap", () => {
  it("includes every English and French page on the canonical domain", () => {
    const paths = [
      "/",
      "/about/",
      "/services/",
      "/work/ghassla/",
      "/work/iloveblogs/",
      "/work/travail-en-hauteur/",
      "/work/tukai/",
      "/work/tukai-pro/",
      "/work/tukhnanutha/",
      "/work/tukai-developers/",
      "/work/vtc-a-votre-service/",
      "/work/bsk-le-robuste/",
      "/work/people/",
      "/work/monastir-3d/",
      "/work/",
      "/open-source/",
      "/open-source/dev-error-explainers/",
      "/open-source/nextjs-supabase-production-incidents/",
      "/open-source/nextjs-seo-content-engine/",
      "/writing/",
      "/tools/",
      "/resources/",
      "/stats/iloveblogs/",
    ];
    const expected = paths.flatMap((path) => [
      "https://mahdibr.online" + path,
      "https://mahdibr.online/fr" + path,
    ]);
    expect(
      sitemap()
        .map((entry) => entry.url)
        .sort(),
    ).toEqual(expected.sort());
  });
  it("uses reciprocal English, French and default alternatives without fragments", () => {
    const entries = sitemap();
    for (const entry of entries) {
      const alternatives = entry.alternates!.languages!;
      expect(Object.keys(alternatives).sort()).toEqual([
        "en",
        "fr",
        "x-default",
      ]);
      expect(alternatives["x-default"]).toBe(alternatives.en);
      for (const url of Object.values(alternatives)) {
        expect(entries.some((other) => other.url === url)).toBe(true);
        const parsed = new URL(url);
        expect(parsed.origin).toBe("https://mahdibr.online");
        expect(parsed.hash).toBe("");
        expect(parsed.search).toBe("");
      }
    }
  });
});
