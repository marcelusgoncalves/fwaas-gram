import type { ReactNode } from "react";
import { Eyebrow } from "../ui";

export default function SectionShell({
  id,
  eyebrow,
  accent = "cyan",
  title,
  intro,
  tone = "dark",
  children,
}: {
  id: string;
  eyebrow: string;
  accent?: "cyan" | "amber";
  title: string;
  intro?: ReactNode;
  tone?: "dark" | "soft";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`scroll-mt-20 px-6 py-24 ${
        tone === "dark" ? "bg-slate-950" : "bg-slate-900/30"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        <h2
          id={`${id}-titulo`}
          className="font-heading max-w-3xl text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-3xl text-lg text-slate-400">{intro}</p>
        )}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
