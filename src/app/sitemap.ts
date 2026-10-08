import type { MetadataRoute } from "next";
import { modulos } from "@/lib/modulos";

const baseUrl = "https://fwaas-gram.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas = [
    { path: "", priority: 1 },
    { path: "/empresas", priority: 0.9 },
    { path: "/provedores", priority: 0.9 },
    { path: "/modulos", priority: 0.8 },
    ...modulos.map((m) => ({ path: `/modulos/${m.slug}`, priority: 0.7 })),
    { path: "/demonstracao", priority: 0.8 },
    { path: "/contato", priority: 0.8 },
  ];

  return rotas.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}
