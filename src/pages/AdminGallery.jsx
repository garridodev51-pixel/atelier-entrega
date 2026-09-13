import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  countPhotos,
  deleteGallery,
  fileToDataUrl,
  getGallery,
  uid,
  upsertGallery,
} from "../lib/store";

export default function AdminGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initial = getGallery(id);
  const [gallery, setGallery] = useState(initial);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const total = useMemo(() => (gallery ? countPhotos(gallery) : 0), [gallery]);

  if (!gallery) {
    return (
      <div className="p-10">
        Galeria não encontrada. <Link to="/painel">Voltar</Link>
      </div>
    );
  }

  const link = `${window.location.origin}/g/${gallery.slug}`;

  function save(next) {
    const g = { ...gallery, ...next };
    setGallery(g);
    upsertGallery(g);
  }

  async function addFiles(collectionId, files) {
    if (!files?.length) return;
    setBusy(true);
    setStatus(`Enviando ${files.length} foto(s)...`);
    const photos = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      photos.push({ id: uid("ph"), name: file.name, src: await fileToDataUrl(file) });
    }
    const collections = gallery.collections.map((c) =>
      c.id === collectionId ? { ...c, photos: [...c.photos, ...photos] } : c
    );
    save({ collections, cover: gallery.cover || photos[0]?.src || "" });
    setBusy(false);
    setStatus(`${photos.length} foto(s) adicionadas.`);
  }

  function addCollection() {
    const name = prompt("Nome da pasta (ex: Cerimônia, Festa, Making of)");
    if (!name) return;
    save({
      collections: [...gallery.collections, { id: uid("col"), name: name.trim(), photos: [] }],
    });
  }

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setStatus("Link copiado. Envie no WhatsApp para o cliente.");
  }

  return (
    <div className="min-h-screen bg-paper pb-16">
      <header className="border-b border-sand px-6 py-5 md:px-10">
        <Link to="/painel" className="text-xs uppercase tracking-[0.3em] text-mist">← Painel</Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl">{gallery.title}</h1>
            <p className="mt-1 text-sm text-mist">
              {gallery.client} · {total} fotos · senha: {gallery.password || "nenhuma"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`/g/${gallery.slug}`} target="_blank" rel="noreferrer" className="border border-sand px-4 py-2 text-xs uppercase tracking-widest">
              Ver como cliente
            </a>
            <button onClick={copyLink} className="bg-ink px-4 py-2 text-xs uppercase tracking-widest text-paper">Copiar link</button>
            <button
              onClick={() => {
                if (confirm("Excluir esta galeria?")) {
                  deleteGallery(gallery.id);
                  navigate("/painel");
                }
              }}
              className="px-4 py-2 text-xs uppercase tracking-widest text-red-800"
            >
              Excluir
            </button>
          </div>
        </div>
        {status && <p className="mt-3 text-sm text-gold">{status}</p>}
      </header>

      <section className="grid gap-6 px-6 py-8 md:grid-cols-2 md:px-10">
        <label className="text-xs uppercase tracking-widest text-mist">
          Título
          <input className="mt-2 w-full border border-sand bg-white px-3 py-2" value={gallery.title} onChange={(e) => save({ title: e.target.value })} />
        </label>
        <label className="text-xs uppercase tracking-widest text-mist">
          Cliente
          <input className="mt-2 w-full border border-sand bg-white px-3 py-2" value={gallery.client} onChange={(e) => save({ client: e.target.value })} />
        </label>
        <label className="text-xs uppercase tracking-widest text-mist">
          Senha da galeria
          <input className="mt-2 w-full border border-sand bg-white px-3 py-2" value={gallery.password} onChange={(e) => save({ password: e.target.value })} />
        </label>
        <label className="text-xs uppercase tracking-widest text-mist">
          Data
          <input type="date" className="mt-2 w-full border border-sand bg-white px-3 py-2" value={gallery.date || ""} onChange={(e) => save({ date: e.target.value })} />
        </label>
        <label className="md:col-span-2 text-xs uppercase tracking-widest text-mist">
          Recado
          <textarea className="mt-2 w-full border border-sand bg-white px-3 py-2" rows={2} value={gallery.message} onChange={(e) => save({ message: e.target.value })} />
        </label>
        <p className="md:col-span-2 text-sm text-mist">Link do cliente: <span className="text-ink">{link}</span></p>
      </section>

      <section className="px-6 md:px-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Pastas</h2>
          <button onClick={addCollection} className="text-xs uppercase tracking-widest text-gold">+ Nova pasta</button>
        </div>
        <div className="space-y-10">
          {gallery.collections.map((col) => (
            <div key={col.id} className="border border-sand bg-white/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-serif text-xl">{col.name} <span className="text-sm text-mist">({col.photos.length})</span></h3>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-ink px-4 py-2 text-xs uppercase tracking-widest text-paper">
                    {busy ? "Enviando..." : "Enviar fotos"}
                    <input type="file" accept="image/*" multiple className="hidden" disabled={busy} onChange={(e) => { addFiles(col.id, Array.from(e.target.files || [])); e.target.value = ""; }} />
                  </label>
                  <button onClick={() => { if (confirm("Excluir esta pasta e as fotos dela?")) save({ collections: gallery.collections.filter((c) => c.id !== col.id) }); }} className="text-xs text-mist">Excluir pasta</button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {col.photos.map((p) => (
                  <div key={p.id} className="group relative">
                    <img src={p.src} alt={p.name} className="aspect-square w-full object-cover" />
                    <button onClick={() => save({ collections: gallery.collections.map((c) => c.id === col.id ? { ...c, photos: c.photos.filter((x) => x.id !== p.id) } : c) })} className="absolute right-1 top-1 hidden bg-ink/80 px-2 py-0.5 text-[10px] text-paper group-hover:block">X</button>
                    <button onClick={() => save({ cover: p.src })} className="absolute bottom-1 left-1 hidden bg-paper/90 px-2 py-0.5 text-[10px] group-hover:block">Capa</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
