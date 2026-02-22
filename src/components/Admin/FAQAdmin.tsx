'use client';

import { useEffect, useState } from 'react';

type FAQEntry = {
  id: number;
  question: string;
  answer: string;
  visible: boolean;
};

type ContactQuestion = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  question: string;
  treated: boolean;
};

// ─── Inline edit form ───────────────────────────────────────────────────────
function FAQEditRow({
  faq,
  onSave,
  onCancel,
}: {
  faq: Partial<FAQEntry>;
  onSave: (data: Partial<FAQEntry>) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState(faq.question ?? '');
  const [a, setA] = useState(faq.answer ?? '');

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
      <input
        className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
        placeholder="Question"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <textarea
        className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none"
        placeholder="Réponse"
        rows={3}
        value={a}
        onChange={e => setA(e.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 transition"
        >
          Annuler
        </button>
        <button
          onClick={() => onSave({ ...faq, question: q, answer: a })}
          disabled={!q.trim() || !a.trim()}
          className="px-4 py-1.5 text-sm rounded-lg bg-amber-400 text-white font-medium hover:bg-amber-500 transition disabled:opacity-40"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<FAQEntry[]>([]);
  const [questions, setQuestions] = useState<ContactQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | 'new' | null>(null);
  const [activeTab, setActiveTab] = useState<'faqs' | 'questions'>('faqs');

  const fetchFAQs = async () => {
    const res = await fetch('/api/faq?admin=true');
    setFaqs(await res.json());
  };

  const fetchQuestions = async () => {
    const res = await fetch('/api/faq-questions');
    setQuestions(await res.json());
  };

  useEffect(() => {
    Promise.all([fetchFAQs(), fetchQuestions()]).then(() => setLoading(false));
  }, []);

  // ── FAQ actions ────────────────────────────────────────────────────────────
  const handleSaveFAQ = async (data: Partial<FAQEntry>) => {
    if (data.id) {
      await fetch('/api/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: data.question, answer: data.answer, visible: true }),
      });
    }
    setEditingId(null);
    fetchFAQs();
  };

  const handleToggleVisible = async (faq: FAQEntry) => {
    await fetch('/api/faq', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: faq.id, visible: !faq.visible }),
    });
    fetchFAQs();
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm('Supprimer cette FAQ ?')) return;
    await fetch('/api/faq', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchFAQs();
  };

  // ── Contact question actions ───────────────────────────────────────────────
  const handleToggleTreated = async (q: ContactQuestion) => {
    await fetch('/api/faq-questions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: q.id, treated: !q.treated }),
    });
    fetchQuestions();
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm('Supprimer cette question ?')) return;
    await fetch('/api/faq-questions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchQuestions();
  };

  // Promote a contact question → new FAQ entry
  const handlePromoteToFAQ = async (q: ContactQuestion) => {
    await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q.question, answer: '', visible: false }),
    });
    await fetchFAQs();
    setActiveTab('faqs');
    // Scroll to newly added (last) item
    setTimeout(() => {
      const lastFaq = faqs[faqs.length - 1];
      if (lastFaq) setEditingId(lastFaq.id);
    }, 300);
  };

  if (loading) {
    return <p className="text-center text-gray-400 py-10 font-schoolbell text-xl animate-pulse">Chargement des FAQs...</p>;
  }

  const untreatedCount = questions.filter(q => !q.treated).length;
  const visibleCount = faqs.filter(f => f.visible).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mt-12">
        <h2 className="font-schoolbell text-3xl text-gray-800">FAQ </h2>
        <div className="flex gap-3 text-sm text-gray-400">
          <span>{visibleCount}/{faqs.length} publiées</span>
          {untreatedCount > 0 && (
            <span className="bg-pink-100 text-pink-600 font-semibold px-2 py-0.5 rounded-full">
              {untreatedCount} question{untreatedCount > 1 ? 's' : ''} en attente
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'faqs'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          FAQs publiées ({faqs.length})
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'questions'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Questions reçues ({questions.length})
          {untreatedCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center leading-none">
              {untreatedCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Tab: FAQs ───────────────────────────────────────────────────────── */}
      {activeTab === 'faqs' && (
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.id}>
              {editingId === faq.id ? (
                <FAQEditRow
                  faq={faq}
                  onSave={handleSaveFAQ}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div
                  className={`rounded-xl border p-4 transition-all ${
                    faq.visible
                      ? 'bg-white border-gray-100 shadow-sm'
                      : 'bg-gray-50 border-dashed border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Index badge */}
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 mb-1">{faq.question}</p>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{faq.answer}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {/* Visibility toggle */}
                      <button
                        onClick={() => handleToggleVisible(faq)}
                        title={faq.visible ? 'Masquer' : 'Publier'}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${
                          faq.visible
                            ? 'bg-green-50 text-green-500 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {faq.visible ? '👁️' : '🙈'}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => setEditingId(faq.id)}
                        title="Modifier"
                        className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 flex items-center justify-center text-base transition-all"
                      >
                        ✏️
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteFAQ(faq.id)}
                        title="Supprimer"
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center text-base transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {!faq.visible && (
                    <p className="mt-2 ml-9 text-xs text-gray-400 italic">Non visible par les invités</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add new FAQ */}
          {editingId === 'new' ? (
            <FAQEditRow
              faq={{}}
              onSave={handleSaveFAQ}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <button
              onClick={() => setEditingId('new')}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-pink-300 hover:text-pink-400 text-sm font-medium transition-all"
            >
              + Ajouter une nouvelle FAQ
            </button>
          )}
        </div>
      )}

      {/* ── Tab: Questions reçues ────────────────────────────────────────────── */}
      {activeTab === 'questions' && (
        <div className="space-y-3">
          {questions.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-schoolbell text-xl">
              Aucune question reçue pour l'instant.
            </div>
          ) : (
            questions
              .sort((a, b) => (a.treated ? 1 : 0) - (b.treated ? 1 : 0))
              .map(q => (
                <div
                  key={q.id}
                  className={`rounded-xl border p-4 transition-all ${
                    q.treated
                      ? 'bg-gray-50 border-gray-100 opacity-60'
                      : 'bg-white border-pink-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Author info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-500 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          {q.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">{q.name}</span>
                        <span className="text-xs text-gray-400">{q.email}</span>
                        <span className="ml-auto text-xs text-gray-300">
                          {new Date(q.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>

                      {/* Question text */}
                      <p className="text-sm text-gray-600 leading-relaxed pl-9">{q.question}</p>

                      {q.treated && (
                        <p className="text-xs text-gray-400 italic pl-9 mt-1">Traitée</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {/* Promote to FAQ */}
                      <button
                        onClick={() => handlePromoteToFAQ(q)}
                        title="Convertir en FAQ"
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-400 hover:bg-blue-100 flex items-center justify-center text-base transition-all"
                      >
                        📌
                      </button>

                      {/* Mark treated */}
                      <button
                        onClick={() => handleToggleTreated(q)}
                        title={q.treated ? 'Marquer non traitée' : 'Marquer traitée'}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all ${
                          q.treated
                            ? 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            : 'bg-green-50 text-green-500 hover:bg-green-100'
                        }`}
                      >
                        {q.treated ? '↩️' : '✅'}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        title="Supprimer"
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center text-base transition-all"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}