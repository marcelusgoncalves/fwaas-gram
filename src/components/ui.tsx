import type { ComponentType, ReactNode } from "react";
import { CheckIcon } from "./icons";

type Accent = "cyan" | "amber";

const accentText: Record<Accent, string> = {
  cyan: "text-cyan-400",
  amber: "text-amber-400",
};

const accentLine: Record<Accent, string> = {
  cyan: "bg-cyan-400",
  amber: "bg-amber-400",
};

const accentRing: Record<Accent, string> = {
  cyan: "border-cyan-500/40 text-cyan-400",
  amber: "border-amber-500/40 text-amber-400",
};

export function Eyebrow({
  children,
  accent = "cyan",
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={`h-px w-8 ${accentLine[accent]}`} />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${accentText[accent]}`}
      >
        {children}
      </span>
    </div>
  );
}

export function IconCircle({
  icon: Icon,
  accent = "cyan",
}: {
  icon: ComponentType<{ className?: string }>;
  accent?: Accent;
}) {
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full border ${accentRing[accent]}`}
    >
      <Icon className="h-6 w-6" />
    </div>
  );
}

export function Card({
  icon: Icon,
  accent = "cyan",
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
  accent?: Accent;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition hover:border-slate-700 hover:bg-slate-900/70">
      <IconCircle icon={Icon} accent={accent} />
      <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 text-cyan-400">
        <CheckIcon className="h-3.5 w-3.5" />
      </span>
      <span className="text-slate-200">{children}</span>
    </li>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110"
    >
      {children}
    </a>
  );
}

export function GhostButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-400"
    >
      {children}
    </a>
  );
}
