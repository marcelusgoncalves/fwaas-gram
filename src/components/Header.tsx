"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { CloseIcon, MenuIcon } from "./icons";

const links = [
  { href: "/empresas", label: "Para empresas" },
  { href: "/provedores", label: "Para provedores" },
  { href: "/modulos", label: "Módulos" },
  { href: "/demonstracao", label: "Demonstração" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <ul className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-cyan-400">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contato"
          className="hidden rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-110 md:inline-block"
        >
          Solicitar proposta
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-slate-200 md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-slate-950 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-300">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="transition hover:text-cyan-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contato"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950"
          >
            Solicitar proposta
          </Link>
        </div>
      )}
    </header>
  );
}
