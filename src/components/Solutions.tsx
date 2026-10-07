import ServiceRows from "./ServiceRows";

export default function Solutions() {
  return (
    <section id="solucao" className="scroll-mt-20 bg-slate-900/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading max-w-[18ch] text-[length:clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
          O que protege a sua rede
        </h2>
        <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.65] text-slate-300">
          O Firewall as a Service do Grupo RAM entrega segurança avançada com
          flexibilidade entre nuvem e ambiente físico, adaptando-se ao porte
          e à necessidade de cada operação.
        </p>

        <div className="mt-14">
          <ServiceRows />
        </div>
      </div>
    </section>
  );
}
