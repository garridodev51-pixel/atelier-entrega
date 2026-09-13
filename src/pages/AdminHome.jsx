import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { STUDIO } from "../data/seed";
import {
  countPhotos,
  listGalleries,
  setAdmin,
  slugify,
  uid,
  upsertGallery,
} from "../lib/store";

export default function AdminHome() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const galleries = useMemo(() => listGalleries(), [tick]);

  function logout() {
    setAdmin(false);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-sand px-6 py-5 md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Painel</p>
          <h1 className="font-serif text-3xl">{STUDIO.name}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setOpen(true)} className="bg-ink px-4 py-2 text-xs uppercase tracking-widest text-paper">
            Nova galeria
          </button>
          <button onClick={logout} className="px-4 py-2 text-xs uppercase tracking-widest text-mist">Sair</button>
        </div>
      </header>
      <main className="px-6 py-10 md:px-10">
        <p className="text-sm text-mist">{galleries.length} galeria(s) · clique para organizar e enviar o link</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {galleries.map((g) => (
            <Link key={g.id} to={`/painel/${g.id}`} className="overflow-hidden border border-sand bg-white/50 transition hover:border-gold">
              <div className="h-44 bg-sand bg-cover bg-center" style={{ backgroundImage: g.cover ? `url(${g.cover})` : undefined }} />
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-gold">{g.type || "Ensaio"}</p>
                <h2 className="mt-1 font-serif text-2xl">{g.title}</h2>
                <p className="mt-1 text-sm text-mist">{g.client} · {countPhotos(g)} fotos</p>
                <p className="mt-3 text-xs text-mist">/g/{g.slug}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      {open && (
        <NewGallery
          onClose={() => setOpen(false)}
          onCreate={(g) => {
            upsertGallery(g);
            setTick((n) => n + 1);
            setOpen(false);
            navigate(`/painel/${g.id}`);
          }}
        />
      )}
    </div>
  );
}

function NewGallery({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    client: "",
    type: "Casamento",
    date: new Date().toISOString().slice(0, 10),
    password: "",
    message: "Suas fotos estão prontas. Navegue com calma e baixe o que quiser.",
  });
  function change(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const slug = slugify(form.title) || uid("galeria");
    onCreate({
      id: uid("gal"),
      slug,
      title: form.title.trim(),
      client: form.client.trim() || form.title.trim(),
      type: form.type,
      date: form.date,
      password: form.password.trim(),
      message: form.message,
      cover: "",
      expiresAt: "",
      collections: [{ id: uid("col"), name: "Todas as fotos", photos: [] }],
    });
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
      <form onSubmit={submit} className="w-full max-w-lg border border-sand bg-paper p-8">
        <h2 className="font-serif text-3xl">Nova galeria</h2>
        <div className="mt-6 grid gap-4">
          <Field label="Nome da galeria" value={form.title} onChange={(v) => change("title", v)} placeholder="Casamento Ana & Pedro" />
          <Field label="Cliente" value={form.client} onChange={(v) => change("client", v)} placeholder="Ana Souza" />
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs uppercase tracking-widest text-mist">
              Tipo
              <select className="mt-2 w-full border border-sand bg-white px-3 py-2" value={form.type} onChange={(e) => change("type", e.target.value)}>
                {["Casamento", "Ensaio", "Evento", "Formatura", "Newborn", "Outro"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <Field label="Data" type="date" value={form.date} onChange={(v) => change("date", v)} />
          </div>
          <Field label="Senha do cliente (opcional)" value={form.password} onChange={(v) => change("password", v)} placeholder="ex: ana2026" />
          <label className="block text-xs uppercase tracking-widest text-mist">
            Recado na galeria
            <textarea className="mt-2 w-full border border-sand bg-white px-3 py-2" rows={3} value={form.message} onChange={(e) => change("message", e.target.value)} />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-mist">Cancelar</button>
          <button type="submit" className="bg-ink px-5 py-2 text-sm uppercase tracking-widest text-paper">Criar</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block text-xs uppercase tracking-widest text-mist">
      {label}
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full border border-sand bg-white px-3 py-2 outline-none focus:border-gold" />
    </label>
  );
}
