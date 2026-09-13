import { Link } from "react-router-dom";
import { STUDIO } from "../data/seed";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <p className="font-serif text-2xl tracking-wide">{STUDIO.name}</p>
        <Link to="/admin" className="text-sm tracking-widest uppercase text-mist hover:text-ink">
          Área do fotógrafo
        </Link>
      </header>
      <main className="px-6 pb-24 md:px-12">
        <section className="mx-auto max-w-4xl pt-16 text-center md:pt-28">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Galeria de entrega</p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            Suas fotos, organizadas
            <br />
            e prontas para baixar.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-mist">
            {STUDIO.tagline}. Sem pasta no Drive. Um link privado, com senha,
            pastas por momento e download em um clique.
          </p>
        </section>
        <section className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            ["01", "Link exclusivo", "Cada cliente recebe uma galeria só dele, com senha."],
            ["02", "Tudo organizado", "Cerimônia, festa, retratos — separado como no ensaio."],
            ["03", "Download fácil", "Uma foto ou o álbum inteiro em ZIP, no celular ou no computador."],
          ].map(([n, t, d]) => (
            <div key={n} className="border border-sand bg-white/50 p-8">
              <p className="text-xs tracking-[0.3em] text-gold">{n}</p>
              <h2 className="mt-4 font-serif text-2xl">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">{d}</p>
            </div>
          ))}
        </section>
        <section className="mx-auto mt-16 max-w-5xl border border-sand bg-[#efe6db] p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Demonstração</p>
          <h2 className="mt-3 font-serif text-3xl">Abra uma galeria de exemplo</h2>
          <p className="mt-3 max-w-xl text-mist">Veja exatamente o que o seu cliente vê. Use a senha indicada.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <DemoCard title="Casamento Ana & Pedro" hint="senha: anaepedro" to="/g/casamento-ana-pedro" />
            <DemoCard title="Ensaio Família Oliveira" hint="senha: oliveira" to="/g/ensaio-familia-oliveira" />
          </div>
        </section>
      </main>
    </div>
  );
}

function DemoCard({ title, hint, to }) {
  return (
    <Link to={to} className="flex-1 border border-sand bg-paper px-6 py-5 transition hover:border-gold">
      <p className="font-serif text-xl">{title}</p>
      <p className="mt-1 text-sm text-mist">{hint}</p>
    </Link>
  );
}
