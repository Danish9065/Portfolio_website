import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseAuth";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(supabase ? null : "Supabase env vars are missing. Admin login is disabled until configured.");

  async function login(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else navigate("/admin");
  }

  return (
    <section className="container-shell grid min-h-screen place-items-center">
      <form onSubmit={login} className="panel grid w-full max-w-md gap-4 rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-white">Admin login</h1>
        {message ? <p className="rounded-md border border-gold/30 bg-gold/10 p-3 text-sm text-gold">{message}</p> : null}
        <input className="rounded-md border border-line bg-ink px-3 py-3" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input className="rounded-md border border-line bg-ink px-3 py-3" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button disabled={!supabase} className="rounded-md bg-accent px-4 py-3 font-semibold text-ink disabled:opacity-50">Sign in</button>
      </form>
    </section>
  );
}
