import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Dashboard from "@/components/Dashboard";
import SecurityChecklist from "@/components/SecurityChecklist";
import PricingModel from "@/components/PricingModel";
import Differentials from "@/components/Differentials";
import Coverage from "@/components/Coverage";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Solutions />
        <Dashboard />
        <SecurityChecklist />
        <PricingModel />
        <Differentials />
        <Coverage />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
