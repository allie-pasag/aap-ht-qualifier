'use client';

import React from 'react';

interface ErrorViewProps {
  onReset: () => void;
  errorMessage?: string;
}

export default function ErrorView({ onReset, errorMessage }: ErrorViewProps) {
  return (
    <div className="flex-grow w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[80vh] font-sans text-center space-y-6">
      {/* Inline Animation styles for self-containment */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes customGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(224, 64, 251, 0.15)); }
          50% { filter: drop-shadow(0 0 25px rgba(224, 64, 251, 0.35)); }
        }
        .animate-allie-float {
          animation: customFloat 4s ease-in-out infinite;
        }
        .animate-allie-glow {
          animation: customGlow 3s ease-in-out infinite;
        }
      `}} />

      {/* Moving Cartoon Container */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 animate-allie-float animate-allie-glow">
        <img
          src="/allie_witty_strategy.png"
          alt="Apologetic Allie Cartoon"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Witty Message */}
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#E040FB] font-semibold bg-[#E040FB]/5 border border-[#E040FB]/10 rounded-full px-4 py-1.5 shadow-sm">
          Quick Hiccup
        </span>
        <h2 className="font-serif text-2xl text-white font-medium leading-tight">
          Oops! Something went a little off track.
        </h2>
        <p className="text-xs text-[#888888] font-light leading-relaxed max-w-sm mx-auto">
          It looks like our system got slightly overwhelmed by too many amazing, high-ticket ideas at once. 
          I am so sorry about that! Let's get you right back in.
        </p>
      </div>

      {/* CTA Retake button */}
      <button
        type="button"
        onClick={onReset}
        className="px-6 py-3.5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/30 hover:border-red-500 hover:from-red-500 hover:text-black rounded text-xs font-semibold text-red-400 transition-all duration-300"
      >
        Apology Accepted — Try Again
      </button>
    </div>
  );
}
