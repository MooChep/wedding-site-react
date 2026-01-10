'use client';

import { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const initialFaqs: FAQ[] = [
  {
    id: 1,
    question: 'Quelle est la date et l\'heure du mariage ?',
    answer: 'Notre mariage aura lieu le 19 septembre 2026. La cérémonie commence à 14h au Domaine les 3 Rivages, suivie du vin d\'honneur à 15h et du dîner à partir de 18h.'
  },
  {
    id: 2,
    question: 'Dois-je confirmer ma présence ?',
    answer: 'Oui, veuillez confirmer votre présence avant le 1er septembre 2026. Vous pouvez remplir le formulaire RSVP en ligne ou nous contacter directement à camille.ilan1909@gmail.com.'
  },
  {
    id: 3,
    question: 'Puis-je amener un accompagnant ?',
    answer: 'Votre invitation indiquera si un accompagnant est autorisé. Si vous avez des questions, veuillez nous le faire savoir lors de votre confirmation.'
  },
  {
    id: 4,
    question: 'Quelle est la tenue recommandée ?',
    answer: 'Une tenue chic et festive avec un accessoire de couleur.'
  },
  {
    id: 5,
    question: 'Y aura-t-il des options végétariennes ?',
    answer: 'Absolument ! Lors de votre confirmation, vous pourrez indiquer vos restrictions ou préférences alimentaires.'
  },
  {
    id: 6,
    question: 'Y a-t-il un stationnement disponible ?',
    answer: 'Oui, un parking gratuit est disponible au Domaine les 3 Rivages.'
  },
  {
    id: 7,
    question: 'À quelle heure dois-je arriver ?',
    answer: 'Veuillez arriver à partir de 13h30 pour la cérémonie. Cela nous donne du temps pour installer tout le monde avant de commencer.'
  },
  {
    id: 8,
    question: 'Y aura-t-il un groupe de musique en direct ou un DJ ?',
    answer: 'Nous aurons les deux ! Un groupe pour le vin d\'honneur et le dîner, suivi d\'un DJ pour danser jusqu\'à la fin de la nuit.'
  },
  {
    id: 9,
    question: 'Y a-t-il un hébergement sur place ?',
    answer: 'Oui, plusieurs gîtes sont disponibles au Domaine les 3 Rivages. Contactez nous !'
  },
];

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (editingId !== null) {
      // Modification
      setFaqs(faqs.map(faq =>
        faq.id === editingId
          ? { ...faq, question: formData.question, answer: formData.answer }
          : faq
      ));
      setEditingId(null);
    } else {
      // Ajout
      const newFaq: FAQ = {
        id: Math.max(...faqs.map(f => f.id), 0) + 1,
        question: formData.question,
        answer: formData.answer,
      };
      setFaqs([...faqs, newFaq]);
    }

    setFormData({ question: '', answer: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette FAQ ?')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ question: '', answer: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestionnaire FAQ</h1>
          <p className="text-lg text-gray-600">Ajoutez, modifiez et supprimez les questions fréquemment posées</p>
        </div>
      </section>

      {/* Success Message */}
      {submitted && (
        <div className="fixed top-4 right-4 bg-green-50 border-2 border-green-200 rounded-lg p-4 text-green-900 z-50">
          <p className="font-semibold">{editingId !== null ? '✓ FAQ modifiée' : '✓ FAQ ajoutée'}</p>
        </div>
      )}

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">{editingId !== null ? 'Modifier une FAQ' : 'Ajouter une nouvelle FAQ'}</h2>
          
          <form onSubmit={handleAddOrUpdate} className="bg-white rounded-lg shadow-lg p-8 space-y-6 border border-gray-200">
            {/* Question */}
            <div>
              <label htmlFor="question" className="block text-sm font-semibold text-gray-900 mb-2">
                Question *
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                placeholder="Ex : Quelle est la date du mariage ?"
              />
            </div>

            {/* Answer */}
            <div>
              <label htmlFor="answer" className="block text-sm font-semibold text-gray-900 mb-2">
                Réponse *
              </label>
              <textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                placeholder="Écrivez la réponse complète ici..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-rose-600 text-white font-semibold py-3 rounded-lg hover:bg-rose-700 transition"
              >
                {editingId !== null ? 'Mettre à jour' : 'Ajouter'}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* FAQs List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Liste des FAQ ({faqs.length})</h2>
          
          {faqs.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              <p className="text-lg">Aucune FAQ ajoutée pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow p-6 border-l-4 border-rose-600 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-sm"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
