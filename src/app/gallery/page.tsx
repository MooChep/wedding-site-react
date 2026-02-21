'use client';

import { useEffect, useState } from "react";
import UploadButton from "@/components/Gallery/UploadButton";
import PhotoGrid from "@/components/Gallery/PhotoGrid";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    const res = await fetch('/api/photos');
    const data = await res.json();
    setPhotos(data.photos);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-schoolbell text-4xl md:text-5xl text-center text-gray-900 mb-2">
        Nos souvenirs
      </h1>
      <p className="font-schoolbell text-center text-gray-500 text-lg mb-10">
        Partagez vos plus belles photos du week-end 📸
      </p>

      <div className="flex justify-center mb-12">
        <UploadButton onUploadSuccess={fetchPhotos} />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Chargement des photos...</p>
      ) : photos.length === 0 ? (
        <p className="text-center text-gray-400">Aucune photo pour l'instant — soyez le premier ! 🎉</p>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}