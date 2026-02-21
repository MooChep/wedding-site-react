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
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
					<h1 className="text-4xl font-semi-bold text-gray-900 mb-4">PARTAGEZ VOS PHOTOS</h1>      

      <div className="flex justify-center mb-12 items-center">
        <UploadButton onUploadSuccess={fetchPhotos} />
      </div>

					<h2 className="text-4xl font-semi-bold text-gray-900 mb-4">NOS SOUVENIRS EN IMAGES</h2>      

      {loading ? (
        <p className="text-center text-gray-400">Chargement des photos...</p>
      ) : photos.length === 0 ? (
        <p className="text-center text-gray-400">Aucune photo pour l'instant, soyez le premier !</p>
      ) : (
        
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}