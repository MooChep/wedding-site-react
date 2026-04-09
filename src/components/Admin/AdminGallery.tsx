'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = {
  public_id: string;
  secure_url: string;
  approved: boolean;
  rejected: boolean;
};

export default function AdminGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchPhotos = async () => {
    const res = await fetch('/api/admin/photos');
    const data = await res.json();
    setPhotos(data.photos);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const toggleSelect = (public_id: string) => {
    setSelected(prev =>
      prev.includes(public_id)
        ? prev.filter(id => id !== public_id)
        : [...prev, public_id]
    );
  };

  const bulkAction = async (action: 'approve' | 'reject') => {
    if (selected.length === 0) return;
    setPending(true);
    await Promise.all(
      selected.map(public_id =>
        fetch('/api/admin/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id, action }),
        })
      )
    );
    setSelected([]);
    await new Promise(resolve => setTimeout(resolve, 500));
    await fetchPhotos();
    setPending(false);
  };

  const bulkDelete = async () => {
    if (selected.length === 0) return;
    setPending(true);
    setConfirmDelete(false);
    await fetch('/api/admin/photos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_ids: selected }),
    });
    setSelected([]);
    await new Promise(resolve => setTimeout(resolve, 500));
    await fetchPhotos();
    setPending(false);
  };

  if (loading) return <p className="text-center text-gray-400">Chargement...</p>;

  return (
    <div>
      <h2 className="font-schoolbell text-3xl text-gray-800 mb-6 pt-5">Galerie photos 📸</h2>
      <p className="text-gray-500 text-lg mb-10">
        Approuvez, rejetez ou supprimez les photos
      </p>

      {/* Barre d'actions */}
      {selected.length > 0 && (
        <div className="sticky top-4 z-10 flex items-center justify-between bg-white shadow-lg rounded-2xl px-6 py-3 mb-6">
          <span className="font-schoolbell text-gray-600">
            {selected.length} photo{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setSelected([])}
              className="font-schoolbell px-4 py-1 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
            >
              Désélectionner
            </button>
            <button
              onClick={() => bulkAction('reject')}
              disabled={pending}
              className="font-schoolbell px-4 py-1 rounded-full text-white bg-orange-400 hover:bg-orange-500 disabled:opacity-50"
            >
              🚫 Rejeter
            </button>
            <button
              onClick={() => bulkAction('approve')}
              disabled={pending}
              className="font-schoolbell px-4 py-1 rounded-full text-white bg-green-400 hover:bg-green-500 disabled:opacity-50"
            >
              ✅ Approuver
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              disabled={pending}
              className="font-schoolbell px-4 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 disabled:opacity-50"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      )}

      {/* Modale de confirmation suppression */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-4 text-center space-y-4">
            <p className="text-2xl">🗑️</p>
            <p className="font-semibold text-gray-800">
              Supprimer {selected.length} photo{selected.length > 1 ? 's' : ''} définitivement ?
            </p>
            <p className="text-sm text-gray-500">Cette action est irréversible.</p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={bulkDelete}
                className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grille */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => {
          const isSelected = selected.includes(photo.public_id);
          return (
            <div
              key={photo.public_id}
              onClick={() => toggleSelect(photo.public_id)}
              className={`relative group rounded-2xl overflow-hidden shadow cursor-pointer transition-all ${
                isSelected ? 'ring-4 ring-pink-400 scale-[0.97]' : 'hover:scale-[1.02]'
              }`}
            >
              <Image
                src={photo.secure_url}
                alt={photo.public_id}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              {/* Overlay sélection */}
              {isSelected && (
                <div className="absolute inset-0 bg-pink-400/20 flex items-center justify-center">
                  <div className="bg-pink-400 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                </div>
              )}
              {/* Badge statut */}
              <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full text-white ${
                photo.approved ? 'bg-green-400' : photo.rejected ? 'bg-red-400' : 'bg-gray-400'
              }`}>
                {photo.approved ? 'Approuvée' : photo.rejected ? 'Refusée' : 'En attente'}
              </div>
            </div>
          );
        })}
      </div>

      {photos.length === 0 && (
        <p className="text-center text-gray-400 py-16 font-schoolbell text-xl">
          Aucune photo pour l'instant.
        </p>
      )}
    </div>
  );
}
