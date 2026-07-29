'use client';

import React from 'react';

export interface GoogleMapEmbedProps {
  address?: string;
  height?: string;
}

export default function GoogleMapEmbed({
  address = 'Rua Professor Virgílio Antunes, 57, Centro, Cruzeiro - SP',
  height = '400px',
}: GoogleMapEmbedProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF-8&iwloc=&output=embed`;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 relative">
      <iframe
        title="Localização da Ferreira Imóveis"
        width="100%"
        height={height}
        style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }}
        src={mapSrc}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
