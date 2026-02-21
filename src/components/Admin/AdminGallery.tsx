'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = {
  public_id: string;
  secure_url: string;
  approved: boolean;
};

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string[]>([]);

  const fetchPhotos = async () => {
    const res = await fetch('/api/admin/photos');
    const data = await res.json();
    setPhotos(data.photos);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const toggle = async (public_id: string, currentlyApproved: boolean) => {
    setPending(p => [...p, public_id]);
    await fetch('/api/admin/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id, action: currentlyApproved ? 'reject' : 'approve' })
    });
    await fetchPhotos();
    setPending(p => p.filter(id => id !== public_id));
  };

  if (loading) return <p className="text-center text-gray-400">Chargement...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.public_id} className="relative group rounded-2xl overflow-hidden shadow">
          <Image
            src={photo.secure_url}
            alt={photo.public_id}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          {/* Badge statut */}
          <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full text-white ${photo.approved ? 'bg-green-400' : 'bg-gray-400'}`}>
            {photo.approved ? '✅ Approuvée' : '⏳ En attente'}
          </div>

          {/* Bouton toggle */}
          <button
            onClick={() => toggle(photo.public_id, photo.approved)}
            disabled={pending.includes(photo.public_id)}
            className={`absolute bottom-2 right-2 text-sm font-schoolbell px-3 py-1 rounded-full text-white transition ${
              photo.approved ? 'bg-red-400 hover:bg-red-500' : 'bg-green-400 hover:bg-green-500'
            } disabled:opacity-50`}
          >
            {pending.includes(photo.public_id) ? '...' : photo.approved ? 'Rejeter' : 'Approuver'}
          </button>
        </div>
      ))}
    </div>
  );
}