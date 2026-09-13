import { Link } from "react-router-dom";
import { SEED_GALLERIES, STUDIO } from "../data/seed";

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
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">Uma página por trabalho</p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            Cada entrega ganha
            <br />
            a própria página.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-mist">
            Casamento, ensaio, formatura, evento. Você cria o trabalho e o cliente recebe um link só dele, com senha e download.
          </p>
        </section>
        <section className="mx-auto mt-16 max-w-5xl border border-sand bg-[#efe6db] p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Páginas de exemplo</p>
          <h2 className="mt-3 font-serif text-3xl">Abra como o cliente abre</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SEED_GALLERIES.map((g) => (
              <DemoCard key={g.id} title={g.title} hint={`${g.type} · senha: ${g.password}`} to={`/g/${g.slug}`} />
            ))}
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
