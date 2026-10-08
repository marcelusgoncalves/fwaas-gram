import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Eyebrow } from "./ui";

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
  accent = "amber",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  accent?: "amber" | "cyan";
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 pb-16 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-amber-600/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        <h1 className="font-heading max-w-4xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {children && (
          <div className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
