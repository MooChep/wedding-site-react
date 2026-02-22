'use client';

import { useState } from "react";
import AdminGallery from "@/components/Admin/AdminGallery";
import RSVPAdmin from "@/components/Admin/RSVPAdmin";
import FAQAdmin from '@/components/Admin/FAQAdmin';

export default function AdminPage() {
  const [input, setInput] = useState('');
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input }),
    });
    if (res.ok) {
      setAuth(true);
    } else {
      setError(true);
    }
  };
  if (!auth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="font-schoolbell text-3xl text-gray-800">Page admin 🔒</h1>
        <input
          type="password"
          placeholder="Mot de passe"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className="border rounded-xl px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-pink-300"
        />
        {error && <p className="text-red-400 text-sm">Mot de passe incorrect</p>}
        <button
          onClick={handleSubmit}
          className="font-schoolbell text-lg px-6 py-2 rounded-full text-white"
          style={{ backgroundColor: 'var(--color-pink)' }}
        >
          Entrer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-schoolbell text-4xl text-center text-gray-900 mb-2">
        Administration
      </h1>
    {/* Section RSVP */}
    <RSVPAdmin />
    
    <FAQAdmin />
    
    {/* Section Gallerie */}
    <AdminGallery />
    </div>
  );
}