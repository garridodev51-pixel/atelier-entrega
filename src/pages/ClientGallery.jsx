import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { STUDIO } from "../data/seed";
import { allPhotos, getGallery } from "../lib/store";

export default function ClientGallery() {
  const { slug } = useParams();
  const gallery = getGallery(slug);
  const [unlocked, setUnlocked] = useState(!gallery?.password);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("all");
  const [favs, setFavs] = useState(() => new Set(JSON.parse(sessionStorage.getItem(`fav_${slug}`) || "[]")));
  const [current, setCurrent] = useState(null);
  const [zipping, setZipping] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(`fav_${slug}`, JSON.stringify([...favs]));
  }, [favs, slug]);

  const photos = useMemo(() => (gallery ? allPhotos(gallery) : []), [gallery]);
  const visible = useMemo(() => {
    if (tab === "fav") return photos.filter((p) => favs.has(p.id));
    if (tab === "all") return photos;
    return photos.filter((p) => p.collection === tab);
  }, [photos, tab, favs]);

  if (!gallery) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="text-center">
          <p className="font-serif text-3xl">Galeria não encontrada</p>
          <Link to="/" className="mt-4 inline-block text-sm text-mist">Voltar</Link>
        </div>
      </div>
    );
  }

  function unlock(e) {
    e.preventDefault();
    if (pin.trim() === gallery.password) setUnlocked(true);
    else setError("Senha incorreta.");
  }

  function toggleFav(id) {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function downloadOne(photo) {
    const res = await fetch(photo.src);
    saveAs(await res.blob(), photo.name || "foto.jpg");
  }

  async function downloadMany(list, filename) {
    if (!list.length) return;
    setZipping(true);
    const zip = new JSZip();
    const folder = zip.folder(gallery.slug);
    for (const photo of list) {
      try {
        const res = await fetch(photo.src);
        folder.file(photo.name || `${photo.id}.jpg`, await res.blob());
      } catch {}
    }
    saveAs(await zip.generateAsync({ type: "blob" }), filename);
    setZipping(false);
  }

  if (!unlocked) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: gallery.cover ? `url(${gallery.cover})` : undefined }} />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative flex min-h-screen items-center justify-center px-6">
          <form onSubmit={unlock} className="w-full max-w-md bg-paper p-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{STUDIO.name}</p>
            <h1 className="mt-4 font-serif text-4xl">{gallery.title}</h1>
            <p className="mt-3 text-sm text-mist">Esta galeria é privada. Digite a senha recebida.</p>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="mt-8 w-full border border-sand bg-white px-4 py-3 text-center outline-none focus:border-gold" placeholder="Senha" />
            {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
            <button type="submit" className="mt-6 w-full bg-ink py-3 text-xs uppercase tracking-widest text-paper">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="relative isolate overflow-hidden">
        <div className="h-[52vh] min-h-[320px] bg-sand bg-cover bg-center" style={{ backgroundImage: gallery.cover ? `url(${gallery.cover})` : undefined }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-paper md:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">{STUDIO.name}</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">{gallery.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80">{gallery.message}</p>
          <p className="mt-2 text-xs text-white/60">
            {photos.length} fotos{gallery.date ? ` · ${new Date(gallery.date + "T00:00:00").toLocaleDateString("pt-BR")}` : ""}
          </p>
        </div>
      </header>

      <div className="sticky top-0 z-20 border-b border-sand bg-paper/95 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-10">
          <nav className="flex flex-wrap gap-2">
            <Tab active={tab === "all"} onClick={() => setTab("all")}>Todas ({photos.length})</Tab>
            {gallery.collections.map((c) => (
              <Tab key={c.id} active={tab === c.name} onClick={() => setTab(c.name)}>{c.name}</Tab>
            ))}
            <Tab active={tab === "fav"} onClick={() => setTab("fav")}>Favoritas ({favs.size})</Tab>
          </nav>
          <div className="flex flex-wrap gap-2">
            <button disabled={zipping} onClick={() => downloadMany(photos, `${gallery.slug}.zip`)} className="bg-ink px-4 py-2 text-xs uppercase tracking-widest text-paper disabled:opacity-60">
              {zipping ? "Preparando ZIP..." : "Baixar tudo"}
            </button>
            <button disabled={zipping || !favs.size} onClick={() => downloadMany(photos.filter((p) => favs.has(p.id)), `${gallery.slug}-favoritas.zip`)} className="border border-sand px-4 py-2 text-xs uppercase tracking-widest disabled:opacity-40">
              Baixar favoritas
            </button>
          </div>
        </div>
      </div>

      <main className="px-3 py-6 md:px-10">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-mist">Nenhuma foto nesta pasta.</p>
        ) : (
          <div className="masonry">
            {visible.map((photo, idx) => (
              <button key={photo.id} className="masonry-item group relative block w-full overflow-hidden" onClick={() => setCurrent(photo)}>
                <img src={photo.src} alt={photo.name} className="w-full object-cover" />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
                <span className="absolute bottom-2 left-2 hidden text-[11px] text-paper group-hover:block">{idx + 1} · {photo.collection}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      {current && (
        <Lightbox photos={visible} current={current} onChange={setCurrent} onClose={() => setCurrent(null)} favs={favs} onFav={toggleFav} onDownload={downloadOne} />
      )}
    </div>
  );
}

function Tab({ active, children, onClick }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 text-xs uppercase tracking-widest ${active ? "bg-ink text-paper" : "text-mist hover:text-ink"}`}>
      {children}
    </button>
  );
}

function Lightbox({ photos, current, onChange, onClose, favs, onFav, onDownload }) {
  const index = photos.findIndex((p) => p.id === current.id);
  const prev = photos[(index - 1 + photos.length) % photos.length];
  const next = photos[(index + 1) % photos.length];
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange(prev);
      if (e.key === "ArrowRight") onChange(next);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onChange, onClose]);
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-paper">
      <div className="flex items-center justify-between px-4 py-3 text-xs uppercase tracking-widest">
        <span>{index + 1} / {photos.length}</span>
        <div className="flex gap-4">
          <button onClick={() => onFav(current.id)}>{favs.has(current.id) ? "♥ Favorita" : "♡ Favoritar"}</button>
          <button onClick={() => onDownload(current)}>Baixar foto</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8">
        <button className="absolute left-2 text-3xl text-white/70 md:left-6" onClick={() => onChange(prev)}>‹</button>
        <img src={current.src} alt={current.name} className="max-h-full max-w-full object-contain" />
        <button className="absolute right-2 text-3xl text-white/70 md:right-6" onClick={() => onChange(next)}>›</button>
      </div>
    </div>
  );
}
