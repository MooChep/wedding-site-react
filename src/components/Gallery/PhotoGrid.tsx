'use client';

import Image from "next/image";
import { useState } from "react";

export default function PhotoGrid({ photos }: { photos: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((url, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setSelected(url)}
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

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <Image
            src={selected}
            alt="Photo agrandie"
            width={1200}
            height={900}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />
        </div>
      )}
    </>
  );
}