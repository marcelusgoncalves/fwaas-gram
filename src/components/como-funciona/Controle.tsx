import { CheckIcon, ClockIcon, FileTextIcon, ShieldIcon } from "../icons";
import { Card } from "../ui";
import { controlCards } from "./data";
import SectionShell from "./SectionShell";

const visuals = [
  { icon: CheckIcon, accent: "amber" as const },
  { icon: ClockIcon, accent: "cyan" as const },
  { icon: ShieldIcon, accent: "amber" as const },
  { icon: FileTextIcon, accent: "cyan" as const },
];

export default function Controle() {
  return (
    <SectionShell
      id="controle"
      eyebrow="Controle e governança"
      accent="cyan"
      title="Quem decide, quem valida e quem responde."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {controlCards.map((card, i) => (
          <Card key={card.title} {...visuals[i]} {...card} />
        ))}
      </div>
    </SectionShell>
  );
}
