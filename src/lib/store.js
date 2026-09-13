import { SEED_GALLERIES } from "../data/seed";

const KEY = "atelier_galleries_v1";
const AUTH_KEY = "atelier_admin_ok";
const SETTINGS_KEY = "atelier_settings_v1";

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(galleries) {
  localStorage.setItem(KEY, JSON.stringify(galleries));
}

export function getSettings() {
  try {
    return (
      JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null") || {
        studioName: "Estúdio Garrido",
        whatsapp: "",
      }
    );
  } catch {
    return { studioName: "Estúdio Garrido", whatsapp: "" };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function isAdmin() {
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function setAdmin(ok) {
  if (ok) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
}

export function listGalleries() {
  const local = readLocal();
  const localIds = new Set(local.map((g) => g.id));
  const seeds = SEED_GALLERIES.filter((g) => !localIds.has(g.id));
  return [...local, ...seeds].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export function getGallery(idOrSlug) {
  return listGalleries().find((g) => g.id === idOrSlug || g.slug === idOrSlug);
}

export function upsertGallery(gallery) {
  const local = readLocal();
  const idx = local.findIndex((g) => g.id === gallery.id);
  if (idx >= 0) local[idx] = gallery;
  else local.unshift(gallery);
  writeLocal(local);
  return gallery;
}

export function deleteGallery(id) {
  writeLocal(readLocal().filter((g) => g.id !== id));
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function countPhotos(gallery) {
  return (gallery.collections || []).reduce((n, c) => n + (c.photos?.length || 0), 0);
}

export function allPhotos(gallery) {
  return (gallery.collections || []).flatMap((c) =>
    (c.photos || []).map((p) => ({ ...p, collection: c.name }))
  );
}

export function fileToDataUrl(file, maxEdge = 2000, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
