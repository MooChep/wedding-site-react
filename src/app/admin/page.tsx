// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';

// // Sample RSVP data
// const rsvpData = [
//   { id: 1, lastName: 'Dupont', guestNames: 'Marie, Jean', attendance: { fridayOnSite: true, saturdayPresent: true, wineReception: true, dinner: true, evening: true, sunday: false }, danceMusic: 'Bohemian Rhapsody', message: 'Très impatients !' },
//   { id: 2, lastName: 'Martin', guestNames: 'Sophie, Pierre, Luc', attendance: { fridayOnSite: false, saturdayPresent: true, wineReception: true, dinner: true, evening: false, sunday: true }, danceMusic: 'La vie en rose', message: '' },
//   { id: 3, lastName: 'Bernard', guestNames: 'Claire', attendance: { fridayOnSite: false, saturdayPresent: true, wineReception: false, dinner: false, evening: false, sunday: false }, danceMusic: 'Imagine', message: 'Régime sans gluten svp' },
//   { id: 4, lastName: 'Laurent', guestNames: 'Anne, Thomas, Mathieu', attendance: { fridayOnSite: true, saturdayPresent: true, wineReception: true, dinner: true, evening: true, sunday: true }, danceMusic: 'Mr Brightside', message: 'À très bientôt !' },
// ];

// export default function AdminDashboard() {
//   const [rsvps] = useState(rsvpData);
//   const totalGuests = rsvps.reduce((sum, r) => sum + r.guestNames.split(',').length, 0);
//   const saturdayCount = rsvps.filter(r => r.attendance.saturdayPresent).length;
//   const withMessage = rsvps.filter(r => r.message.length > 0).length;

//   const getAttendanceSummary = (attendance: any) => {
//     const events = [];
//     if (attendance.fridayOnSite) events.push('Ven');
//     if (attendance.saturdayPresent) events.push('Sam');
//     if (attendance.dinner) events.push('Dîner');
//     if (attendance.evening) events.push('Soirée');
//     if (attendance.sunday) events.push('Dim');
//     return events.length > 0 ? events.join(', ') : 'Aucun';
//   };

//   return (
//     <div>
//       {/* Hero */}
//       <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h1>
//           <p className="text-lg text-gray-600">Gérez vos événements de mariage et les réponses RSVP</p>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
//               <div className="text-2xl font-bold text-green-600">{rsvps.length}</div>
//               <p className="text-gray-600 mt-2">Réponses reçues</p>
//             </div>
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
//               <div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
//               <p className="text-gray-600 mt-2">Invités au total</p>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
//               <div className="text-2xl font-bold text-purple-600">{saturdayCount}</div>
//               <p className="text-gray-600 mt-2">Présents samedi</p>
//             </div>
//             <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg">
//               <div className="text-2xl font-bold text-pink-600">{withMessage}</div>
//               <p className="text-gray-600 mt-2">Avec message</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Navigation */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl text-gray-600 font-bold mb-6">Gestion</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Link href="/admin/rsvp-list" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-rose-600">
//               <h3 className="text-xl text-gray-600 font-bold mb-2">📋 Liste RSVP</h3>
//               <p className="text-gray-600">Voir et gérer toutes les réponses RSVP</p>
//             </Link>
//             <Link href="/admin/gallery-manager" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-rose-600">
//               <h3 className="text-xl text-gray-600 font-bold mb-2">🖼️ Gestionnaire de galerie</h3>
//               <p className="text-gray-600">Télécharger et gérer les photos de mariage</p>
//             </Link>
//             <Link href="/admin/faq-manager" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4 border-rose-600">
//               <h3 className="text-xl text-gray-600 font-bold mb-2">❓ Gestionnaire FAQ</h3>
//               <p className="text-gray-600">Ajouter, modifier et supprimer les questions fréquentes</p>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Recent RSVPs */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl font-bold mb-6">Dernières réponses RSVP</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-white rounded-lg shadow">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-6 py-3 text-left font-semibold text-gray-600">Nom</th>
//                   <th className="px-6 py-3 text-left font-semibold text-gray-600">Prénoms des invités</th>
//                   <th className="px-6 py-3 text-left font-semibold text-gray-600">Présence</th>
//                   <th className="px-6 py-3 text-left font-semibold text-gray-600">Musique à danser</th>
//                   <th className="px-6 py-3 text-left font-semibold text-gray-600">Message</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rsvps.map((rsvp) => (
//                   <tr key={rsvp.id} className="border-b hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{rsvp.lastName}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{rsvp.guestNames}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{getAttendanceSummary(rsvp.attendance)}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{rsvp.danceMusic}</td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{rsvp.message || '-'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

'use client';

import { useState } from "react";
import AdminGallery from "@/components/Admin/AdminGallery";

const PASSWORD = "camille-ilan2026"; // changez ici

export default function AdminPage() {
  const [input, setInput] = useState('');
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === PASSWORD) {
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
        Administration 🎛️
      </h1>
      <p className="font-schoolbell text-center text-gray-500 text-lg mb-10">
        Approuvez ou rejetez les photos avant publication
      </p>
      <AdminGallery />
    </div>
  );
}