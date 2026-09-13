import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { STUDIO } from "../data/seed";
import { isAdmin, setAdmin } from "../lib/store";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin()) navigate("/painel", { replace: true });
  }, [navigate]);

  function submit(e) {
    e.preventDefault();
    if (pin.trim() === STUDIO.adminPin) {
      setAdmin(true);
      navigate("/painel");
    } else {
      setError("PIN incorreto.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <form onSubmit={submit} className="w-full max-w-md border border-sand bg-white/60 p-10">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-mist">
          {STUDIO.name}
        </Link>
        <h1 className="mt-6 font-serif text-4xl">Painel do fotógrafo</h1>
        <p className="mt-3 text-sm text-mist">
          Digite o PIN para criar galerias, organizar pastas e copiar o link do cliente.
        </p>
        <label className="mt-8 block text-xs uppercase tracking-widest text-mist">PIN de acesso</label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="mt-2 w-full border border-sand bg-paper px-4 py-3 outline-none focus:border-gold"
          placeholder="••••••••"
        />
        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        <button type="submit" className="mt-6 w-full bg-ink py-3 text-sm uppercase tracking-widest text-paper">
          Entrar
        </button>
        <p className="mt-6 text-xs text-mist">
          PIN inicial: <span className="text-ink">{STUDIO.adminPin}</span>
        </p>
      </form>
    </div>
  );
}
