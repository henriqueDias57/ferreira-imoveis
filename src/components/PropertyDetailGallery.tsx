'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyDetailGalleryProps {
  photos: { id: string; url: string }[];
  title: string;
}

export default function PropertyDetailGallery({ photos, title }: PropertyDetailGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const photoList =
    photos.length > 0
      ? photos
      : [
          {
            id: 'default',
            url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
          },
        ];

  return (
    <div className="space-y-4">
      {/* Imagem Principal em Destaque */}
      <div className="relative w-full h-[320px] sm:h-[480px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <Image
          src={photoList[activePhotoIndex].url}
          alt={`${title} - Foto ${activePhotoIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      {/* Miniaturas Se Mais de 1 Foto */}
      {photoList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {photoList.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                activePhotoIndex === idx
                  ? 'border-brandRed-500 scale-105 shadow-md shadow-brandRed-900/40'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={photo.url} alt="Miniatura" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
