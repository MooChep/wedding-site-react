'use client';

import { useState, useEffect } from 'react';
import AccordionItem from '@/components/FAQ/AccordionItem';
import DashedBox from '@/components/DashedBox';
import SendFAQ from '@/components/navigation/SendFAQ';

type FAQEntry = {
  id: number;
  question: string;
  answer: string;
  visible: boolean;
};

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQEntry[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', question: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/faq')
      .then(r => r.json())
      .then(setFaqs);
  }, []);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/faq-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactForm),
    });
    setSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', question: '' });
      setSubmitted(false);
    }, 10000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-semi-bold text-gray-900 mb-4">QUESTIONS FRÉQUENTES</h1>
          <p className="text-lg text-gray-600">Retrouvez ci-dessous la plus part des réponses à vos questions.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Merci !</h3>
              <p className="text-green-700">Votre question a été reçue. Nous vous répondrons très bientôt.</p>
            </div>
          ) : (
            <DashedBox color='#DDD' padding={4} strokeWidth={3} borderRadius={30} dashLength={13} gapLength={13}>
              <form onSubmit={handleContactSubmit} className="p-8 space-y-6">
                <h4 className="text-xl mb-4 text-center">Une autre question ?</h4>
                <p className="text-lg text-center text-gray-500">Écrivez-nous dès maintenant à l'aide de ce formulaire !</p>

                <div>
                  <label htmlFor="name" className="block text-gray-900 mb-2">Votre nom :</label>
                  <DashedBox color='var(--color-pink)' padding={4} strokeWidth={3} borderRadius={12} dashLength={13} gapLength={13}>
                    <input type="text" id="name" name="name" value={contactForm.name} onChange={handleContactChange} required className="w-full px-4 py-2" placeholder="Ex: Sanchez Milio" />
                  </DashedBox>
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-900 mb-2">Votre e-mail :</label>
                  <DashedBox color='var(--color-pink)' padding={4} strokeWidth={3} borderRadius={12} dashLength={13} gapLength={13}>
                    <input type="email" id="email" name="email" value={contactForm.email} onChange={handleContactChange} required className="w-full px-4 py-2" placeholder="Ex: camille.ilan1909@gmail.com" />
                  </DashedBox>
                </div>

                <div>
                  <label htmlFor="question" className="block text-gray-900 mb-2">Votre question :</label>
                  <DashedBox color='var(--color-pink)' padding={4} strokeWidth={3} borderRadius={12} dashLength={13} gapLength={13}>
                    <textarea id="question" name="question" value={contactForm.question} onChange={handleContactChange} required rows={4} className="w-full px-4 py-2" placeholder="Ecrivez votre question ici !" />
                  </DashedBox>
                </div>

                <button type="submit" className="cursor-pointer flex items-center justify-center w-full">
                <SendFAQ/>
				</button>
              </form>
            </DashedBox>
          )}
        </div>
      </section>
    </div>
  );
}