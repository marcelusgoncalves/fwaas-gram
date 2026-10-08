"use client";

import type { Ref } from "react";
import IncidentSimulator, { type SimuladorHandle } from "./IncidentSimulator";
import SectionShell from "./SectionShell";

export default function Jornada({ simRef }: { simRef?: Ref<SimuladorHandle> }) {
  return (
    <SectionShell
      id="jornada"
      eyebrow="Jornada do incidente"
      accent="amber"
      title="Da detecção ao retorno ao cliente."
      intro="Escolha um cenário e acompanhe os quatro passos: detecção, ação automática, escalonamento humano e retorno ao cliente."
    >
      <IncidentSimulator ref={simRef} />
    </SectionShell>
  );
}
