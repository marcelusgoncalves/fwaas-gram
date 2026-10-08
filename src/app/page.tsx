import Hero from "@/components/Hero";
import DoresGrid from "@/components/DoresGrid";
import Provas from "@/components/Provas";
import CTA from "@/components/CTA";
import Shell from "@/components/Shell";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <DoresGrid />
      <Provas />
      <CTA />
    </Shell>
  );
}
