'use client';

import { useEffect, useState, useMemo } from 'react';

type Attendance = {
  fridayOnSite: boolean;
  cocktailDinatoire: boolean;
  wineReception: boolean;
  party: boolean;
  ceremony: boolean;
  sunday: boolean;
  absent: boolean;
};

type RSVP = {
  id: number;
  createdAt: string;
  lastName: string;
  guestNames: string;
  attendance: Attendance;
  danceMusic: string;
  message: string;
};

const EVENTS: { key: keyof Attendance; label: string; emoji: string; day: string; color: string; bg: string }[] = [
  { key: 'fridayOnSite',       label: 'Sur place vendredi soir', emoji: '🌙', day: 'Vendredi', color: '#7C6AF7', bg: '#EEF2FF' },
  { key: 'ceremony',           label: 'Cérémonie',               emoji: '💒', day: 'Samedi',   color: '#E05AA0', bg: '#FDF2F8' },
  { key: 'wineReception',      label: "Vin d'honneur",           emoji: '🥂', day: 'Samedi',   color: '#D97706', bg: '#FFFBEB' },
  { key: 'cocktailDinatoire',  label: 'Cocktail dînatoire',      emoji: '🍽️', day: 'Samedi',   color: '#059669', bg: '#F0FDF4' },
  { key: 'party',              label: 'Soirée dansante',         emoji: '🎶', day: 'Samedi',   color: '#DC2626', bg: '#FFF1F2' },
  { key: 'sunday',             label: 'Dimanche midi',           emoji: '☀️', day: 'Dimanche', color: '#2563EB', bg: '#EFF6FF' },
  { key: 'absent',             label: 'Absent tout le week-end', emoji: '🙈', day: '—',        color: '#9CA3AF', bg: '#F9FAFB' },
];

function countGuestNames(names: string) {
  return names.split(',').map(n => n.trim()).filter(Boolean).length;
}

export default function RSVPAdmin() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<keyof Attendance | 'all'>('all');
  const [search, setSearch] = useState('');

  const fetchRSVPs = async () => {
    const res = await fetch('/api/rsvp');
    const data = await res.json();
    setRsvps(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette réponse ?')) return;
    await fetch('/api/rsvp', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchRSVPs();
  };

  useEffect(() => { fetchRSVPs(); }, []);

  // Compute counts per event (counting individual guest names)
  const eventCounts = useMemo(() => {
    const counts: Record<keyof Attendance, number> = {
      fridayOnSite: 0, cocktailDinatoire: 0, wineReception: 0,
      party: 0, ceremony: 0, sunday: 0, absent: 0,
    };
    for (const rsvp of rsvps) {
      const n = countGuestNames(rsvp.guestNames);
      for (const key of Object.keys(counts) as (keyof Attendance)[]) {
        if (rsvp.attendance[key]) counts[key] += n;
      }
    }
    return counts;
  }, [rsvps]);

  const totalGuests = useMemo(() =>
    rsvps.reduce((sum, r) => sum + countGuestNames(r.guestNames), 0), [rsvps]);

  const maxCount = Math.max(...Object.values(eventCounts), 1);

  // Filtered list
  const filtered = useMemo(() => {
    return rsvps.filter(r => {
      const matchesFilter = activeFilter === 'all' || r.attendance[activeFilter];
      const matchesSearch =
        search === '' ||
        r.lastName.toLowerCase().includes(search.toLowerCase()) ||
        r.guestNames.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [rsvps, activeFilter, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-400 font-schoolbell text-xl animate-pulse">Chargement des réponses...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-schoolbell text-3xl text-gray-800">Réponses RSVP</h2>
        <span className="text-sm text-gray-400">{rsvps.length} réponse{rsvps.length > 1 ? 's' : ''} · {totalGuests} invité{totalGuests > 1 ? 's' : ''}</span>
      </div>

      {/* ── Timeline visuelle par événement ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-5 font-medium">Présence par moment</p>
        <div className="space-y-3">
          {EVENTS.map(ev => {
            const count = eventCounts[ev.key];
            const pct = Math.round((count / maxCount) * 100);
            return (
              <button
                key={ev.key}
                onClick={() => setActiveFilter(activeFilter === ev.key ? 'all' : ev.key)}
                className={`w-full text-left group transition-all ${activeFilter === ev.key ? 'scale-[1.01]' : ''}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-base w-6 text-center">{ev.emoji}</span>
                  <span className="text-sm text-gray-700 flex-1">{ev.label}</span>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: ev.color }}>
                    {count}
                  </span>
                  <span className="text-xs text-gray-400 w-8 text-right">{Math.round((count / (totalGuests || 1)) * 100)}%</span>
                </div>
                <div className="ml-9 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: ev.color,
                      opacity: activeFilter === ev.key ? 1 : 0.65,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
        {activeFilter !== 'all' && (
          <button
            onClick={() => setActiveFilter('all')}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition"
          >
            ✕ Retirer le filtre
          </button>
        )}
      </div>

      {/* ── Filtres rapides par jour ── */}
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-medium">Filtrer par événement</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              activeFilter === 'all'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            Tous ({rsvps.length})
          </button>
          {EVENTS.map(ev => (
            <button
              key={ev.key}
              onClick={() => setActiveFilter(activeFilter === ev.key ? 'all' : ev.key)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all`}
              style={{
                backgroundColor: activeFilter === ev.key ? ev.color : ev.bg,
                borderColor: activeFilter === ev.key ? ev.color : 'transparent',
                color: activeFilter === ev.key ? 'white' : ev.color,
              }}
            >
              {ev.emoji} {ev.label.split(' ').slice(0, 2).join(' ')} ({eventCounts[ev.key]})
            </button>
          ))}
        </div>
      </div>

      {/* ── Recherche + tableau ── */}
      <div>
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un nom ou prénom..."
            className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-schoolbell text-xl">
            Aucune réponse pour ce filtre.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm bg-white">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-medium">Nom</th>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-medium">Invités</th>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-medium">Présence</th>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-medium">🎵 Musique</th>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-medium">Message</th>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-medium">Date</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-900">{rsvp.lastName}</td>
                    <td className="px-5 py-4 text-gray-600">
                      <div>{rsvp.guestNames}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{countGuestNames(rsvp.guestNames)} pers.</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {EVENTS.filter(ev => rsvp.attendance[ev.key]).map(ev => (
                          <span
                            key={ev.key}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: ev.bg, color: ev.color }}
                          >
                            {ev.emoji} {ev.label.split(' ').slice(-1)[0]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 italic max-w-[160px] truncate">{rsvp.danceMusic || '—'}</td>
                    <td className="px-5 py-4 text-gray-500 max-w-[180px]">
                      {rsvp.message
                        ? <span className="line-clamp-2" title={rsvp.message}>{rsvp.message}</span>
                        : <span className="text-gray-300">—</span>
                      }
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(rsvp.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                        title="Supprimer"
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}