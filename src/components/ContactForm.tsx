"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VERSAO_POLITICA_PRIVACIDADE } from "@/lib/privacidade";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "./icons";

const inputClass =
  "w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-500/50";

type Estado = "parado" | "enviando" | "sucesso" | "erro";

function ContactFormFields() {
  const perfil =
    useSearchParams().get("perfil") === "provedor" ? "provedor" : "empresa";
  const [estado, setEstado] = useState<Estado>("parado");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (!endpoint) {
      setEstado("erro");
      return;
    }

    const texto = (campo: string) => data.get(campo)?.toString().trim() ?? "";
    const payload = {
      nome: texto("nome"),
      sou: texto("sou") === "provedor" ? "provedor" : "empresa",
      empresa: texto("empresa"),
      email: texto("email"),
      telefone: texto("telefone"),
      mensagem: texto("mensagem"),
      _gotcha: texto("_gotcha"),
      consentimento_lgpd: "sim",
      consentimento_data_hora: new Date().toISOString(),
      versao_politica_privacidade: VERSAO_POLITICA_PRIVACIDADE,
    };

    setEstado("enviando");
    try {
      const resposta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      form.reset();
      setEstado("sucesso");
    } catch {
      setEstado("erro");
    }
  }

  if (!process.env.NEXT_PUBLIC_FORM_ENDPOINT) {
    return (
      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-left">
        <p className="font-heading text-lg font-semibold text-white">
          Fale direto com nossa equipe comercial
        </p>
        <ul className="mt-5 space-y-3 text-sm">
          <li>
            <a
              href="https://wa.me/5561996719149"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-200 transition hover:text-cyan-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 text-xs font-bold text-emerald-400">
                WA
              </span>
              WhatsApp: (61) 99671-9149
            </a>
          </li>
          <li>
            <a
              href="mailto:comercial@gruporam.com.br"
              className="flex items-center gap-3 text-slate-200 transition hover:text-cyan-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 text-cyan-400">
                <MailIcon className="h-4 w-4" />
              </span>
              E-mail: comercial@gruporam.com.br
            </a>
          </li>
          <li>
            <a
              href="tel:+556130365656"
              className="flex items-center gap-3 text-slate-200 transition hover:text-cyan-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/40 text-amber-400">
                <PhoneIcon className="h-4 w-4" />
              </span>
              Telefone: (61) 3036-5656
            </a>
          </li>
        </ul>
      </div>
    );
  }

  if (estado === "sucesso") {
    return (
      <p
        role="status"
        className="mt-10 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-left text-emerald-200"
      >
        Recebemos sua solicitação. Nossa equipe comercial entra em contato em
        breve.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 text-left">
      <label className="block text-sm text-slate-300">
        Sou
        <select
          name="sou"
          defaultValue={perfil}
          className={`mt-2 ${inputClass}`}
        >
          <option value="empresa">Empresa que quer proteger a própria rede</option>
          <option value="provedor">Provedor ou integrador</option>
        </select>
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
        placeholder="Conte um pouco sobre a sua rede: quantas lojas ou filiais, quantos links de internet e o que mais incomoda hoje"
        className={`mt-4 resize-none ${inputClass}`}
      />

      {/* Campo antispam: deve ficar vazio. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="mt-4 flex items-start gap-3 text-sm text-slate-300">
        <input
          type="checkbox"
          name="consentimento"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-amber-400"
        />
        <span>
          Li e concordo com a{" "}
          <Link
            href="/privacidade"
            className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
          >
            Política de Privacidade
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando..." : "Solicitar proposta"}
        <ArrowRightIcon className="h-4 w-4" />
      </button>

      {estado === "erro" && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          Não foi possível enviar agora. Escreva para
          comercial@gruporam.com.br ou chame no WhatsApp (61) 99671-9149.
        </p>
      )}
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormFields />
    </Suspense>
  );
}
