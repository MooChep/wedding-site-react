'use client';

import { useState } from 'react';

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    lastName: '',
    guestNames: '',
    attendance: {
      fridayOnSite: false,
      saturdayPresent: false,
      wineReception: false,
      dinner: false,
      evening: false,
      sunday: false,
    },
    danceMusic: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('RSVP Soumis:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        lastName: '',
        guestNames: '',
        attendance: {
          fridayOnSite: false,
          saturdayPresent: false,
          wineReception: false,
          dinner: false,
          evening: false,
          sunday: false,
        },
        danceMusic: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Merci beaucoup !</h3>
        <p className="text-green-700">Votre réponse a été reçue. Nous avons hâte de célébrer avec vous !</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Nom de famille */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
          Nom de famille *
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
          placeholder="Ex : Sanchez"
        />
      </div>

      {/* Prénoms des invités */}
      <div>
        <label htmlFor="guestNames" className="block text-sm font-semibold text-gray-900 mb-2">
          Prénoms des invités *
        </label>
        <input
          type="text"
          id="guestNames"
          name="guestNames"
          value={formData.guestNames}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
          placeholder="Ex : Camille, Ilan, Milio..."
        />
      </div>

      {/* Présence au week-end */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Présence au week-end *
        </label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fridayOnSite"
              name="fridayOnSite"
              checked={formData.attendance.fridayOnSite}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-rose-600 rounded focus:ring-2 focus:ring-rose-600"
            />
            <label htmlFor="fridayOnSite" className="ml-3 text-gray-700">
              Déjà sur place le vendredi
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saturdayPresent"
              name="saturdayPresent"
              checked={formData.attendance.saturdayPresent}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-rose-600 rounded focus:ring-2 focus:ring-rose-600"
            />
            <label htmlFor="saturdayPresent" className="ml-3 text-gray-700">
              Présent le samedi
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineReception"
              name="wineReception"
              checked={formData.attendance.wineReception}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-rose-600 rounded focus:ring-2 focus:ring-rose-600"
            />
            <label htmlFor="wineReception" className="ml-3 text-gray-700">
              Présent au vin d'honneur
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="dinner"
              name="dinner"
              checked={formData.attendance.dinner}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-rose-600 rounded focus:ring-2 focus:ring-rose-600"
            />
            <label htmlFor="dinner" className="ml-3 text-gray-700">
              Présent au dîner
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="evening"
              name="evening"
              checked={formData.attendance.evening}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-rose-600 rounded focus:ring-2 focus:ring-rose-600"
            />
            <label htmlFor="evening" className="ml-3 text-gray-700">
              Présent à la soirée
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sunday"
              name="sunday"
              checked={formData.attendance.sunday}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-rose-600 rounded focus:ring-2 focus:ring-rose-600"
            />
            <label htmlFor="sunday" className="ml-3 text-gray-700">
              Présent le dimanche
            </label>
          </div>
        </div>
      </div>

      {/* Musique pour danser */}
      <div>
        <label htmlFor="danceMusic" className="block text-sm font-semibold text-gray-900 mb-2">
          La musique qui vous fera danser jusqu'au bout de la nuit *
        </label>
        <input
          type="text"
          id="danceMusic"
          name="danceMusic"
          value={formData.danceMusic}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
          placeholder="Ex : Une belle histoire de Michel Fugain"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
          Un petit mot ou une précision
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
          placeholder="Écrivez ici votre message..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-rose-600 text-white font-semibold py-3 rounded-lg hover:bg-rose-700 transition"
      >
        Envoyer ma réponse
      </button>
    </form>
  );
}
