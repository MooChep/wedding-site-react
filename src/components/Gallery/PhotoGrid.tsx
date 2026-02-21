'use client';

import Image from "next/image";
import { useState } from "react";

export default function PhotoGrid({ photos }: { photos: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const prev = () => setSelectedIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null);
  const next = () => setSelectedIndex(i => i !== null ? (i + 1) % photos.length : null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') setSelectedIndex(null);
  };

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((url, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-[1.005] transition-transform"
            onClick={() => setSelectedIndex(i)}
          >
            <Image
              src={url}
              alt={`Photo ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox carrousel */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          autoFocus
        >
          {/* Croix fermeture */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white text-2xl bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition"
          >
            ✕
          </button>
          {/* Flèche gauche */}
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white text-4xl bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center transition"
          >
            ‹
          </button>

          {/* Photo */}
          <div onClick={e => e.stopPropagation()}>
            <Image
              src={photos[selectedIndex]}
              alt={`Photo ${selectedIndex + 1}`}
              width={1200}
              height={900}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
            {/* Compteur */}
            <p className="text-center text-white/60 font-schoolbell text-lg mt-2">
              {selectedIndex + 1} / {photos.length}
            </p>
          </div>

          {/* Flèche droite */}
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white text-4xl bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center transition"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}