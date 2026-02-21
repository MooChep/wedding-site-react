'use client';

import { CldUploadWidget } from 'next-cloudinary';

export default function UploadButton({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{
        folder: 'mariage',
        sources: ['local', 'camera'],
        multiple: true,
        maxFiles: 20,
        language: 'fr',
        text: { fr: { or: 'ou', menu: { files: 'Mes fichiers', camera: 'Appareil photo' } } }
      }}
      onSuccess={onUploadSuccess}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          className="font-schoolbell text-xl px-8 py-4 rounded-full text-white transition"
          style={{ backgroundColor: 'var(--color-pink)' }}
        >
          📸 Ajouter mes photos
        </button>
      )}
    </CldUploadWidget>
  );
}