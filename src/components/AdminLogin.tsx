import React, { useState } from 'react';
import { LockKeyhole, ArrowLeft } from 'lucide-react';

export function AdminLogin({ onLogin, onClose }: { onLogin: (email: string, password: string) => Promise<void>; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  return <main className="min-h-screen grid place-items-center px-6 bg-[#050505]">
    <form className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[.03] p-8" onSubmit={async e => {
      e.preventDefault(); setBusy(true); setError('');
      try { await onLogin(email, password); } catch (err) { setError(err instanceof Error ? err.message : 'Unable to sign in'); }
      finally { setBusy(false); }
    }}>
      <LockKeyhole className="text-[#C8A24A] mb-5" size={30} />
      <h1 className="font-display text-3xl mb-2">Admin access</h1>
      <p className="text-white/50 text-sm mb-7">Enter the password configured on the server.</p>
      <label className="text-xs uppercase tracking-widest text-white/60">Email address</label>
      <input autoFocus required type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 mb-4 w-full rounded-lg border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#C8A24A]" />
      <label className="text-xs uppercase tracking-widest text-white/60">Password</label>
      <input required type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-black px-4 py-3 outline-none focus:border-[#C8A24A]" />
      {error && <p role="alert" className="mt-3 text-sm text-red-400">{error}</p>}
      <button disabled={busy} className="mt-6 w-full rounded-lg bg-[#C8A24A] py-3 font-semibold text-black disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
      <button type="button" onClick={onClose} className="mt-4 w-full flex justify-center items-center gap-2 text-sm text-white/50 hover:text-white"><ArrowLeft size={14}/> Return to site</button>
    </form>
  </main>;
}
