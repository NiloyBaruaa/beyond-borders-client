"use client";
import React from 'react';

export default function WatermarkPlayer({ youtubeId, email }: { youtubeId: string, email: string }) {
  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden rounded-xl border border-gray-800">
      
      {/* 1. The YouTube Iframe */}
      {/* modestbranding=1 removes the YouTube logo, rel=0 stops random suggested videos */}
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0&controls=1`}
        className="absolute top-0 left-0 w-full h-full"
        allowFullScreen
      ></iframe>

      {/* 2. The Floating Watermark Overlay */}
      {/* pointer-events-none is CRITICAL: it lets the user click "Play" through the watermark */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10 overflow-hidden opacity-20">
        <div className="animate-diagonal-float absolute text-white font-black text-xl whitespace-nowrap drop-shadow-md">
          {email} • SAWN BD
        </div>
      </div>
    </div>
  );
}