"use client";

import type { FormEvent } from "react";
import { ArrowRightIcon } from "./icons";

const inputClass =
  "w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-500/50";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = data.get("nome")?.toString().trim() ?? "";
    const empresa = data.get("empresa")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const telefone = data.get("telefone")?.toString().trim() ?? "";
    const mensagem = data.get("mensagem")?.toString().trim() ?? "";

    const subject = `Solicitação de orçamento — ${nome || "FWAAS"}`;
    const body = [
      `Nome: ${nome}`,
      empresa && `Empresa: ${empresa}`,
      `E-mail: ${email}`,
      telefone && `Telefone: ${telefone}`,
      "",
      "Mensagem:",
      mensagem,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:comercial@gruporam.com.br?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="nome"
          required
          placeholder="Nome"
          className={inputClass}
        />
        <input name="empresa" placeholder="Empresa" className={inputClass} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <input
          name="email"
          type="email"
          required
          placeholder="E-mail"
          className={inputClass}
        />
        <input
          name="telefone"
          placeholder="Telefone / WhatsApp"
          className={inputClass}
        />
      </div>
      <textarea
        name="mensagem"
        rows={4}
        placeholder="Conte um pouco sobre a sua operação e a necessidade de segurança"
        className={`mt-4 resize-none ${inputClass}`}
      />

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110"
      >
        Enviar solicitação
        <ArrowRightIcon className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-slate-500">
        Ao enviar, seu aplicativo de e-mail abre com a mensagem pronta para
        comercial@gruporam.com.br.
      </p>
    </form>
  );
}
