'use client';

import React, { useEffect, useState } from 'react';

const loadingSteps = [
  "Securing submission parameters...",
  "Running answers through Gate 1: Offer Clarity...",
  "Assessing Gate 2: Operational Conversions...",
  "Evaluating Gate 3: Technical Infrastructure...",
  "Calibrating diagnostic language layer...",
  "Compiling results & pricing anchors in Allie's voice...",
  "Finalizing personalized report collateral..."
];

export default function LoadingView() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600); // Transitions through steps over 4.2 seconds (7 steps * 600ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-grow w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[70vh] font-sans text-center space-y-8">
      {/* Animated Cortex/Loader */}
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border border-[#E040FB]/10 animate-ping duration-[3000ms]"></div>
        <div className="absolute inset-2 rounded-full border border-[#E040FB]/20 animate-ping duration-[2000ms]"></div>
        
        {/* Core spinning gradient */}
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#E040FB] animate-spin duration-[10000ms] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#161616] to-[#25102a] border border-[#E040FB]/30 flex items-center justify-center">
            {/* Center pulsing core */}
            <div className="w-3 h-3 rounded-full bg-[#E040FB] shadow-[0_0_15px_rgba(224,64,251,0.8)] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Progress Message */}
      <div className="space-y-3">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#E040FB] font-semibold">
          Allie&rsquo;s Cortex Analyzing
        </span>
        <h3 className="font-serif text-lg text-white font-medium min-h-[28px] transition-all duration-300">
          {loadingSteps[stepIndex]}
        </h3>
        <p className="text-[11px] text-[#444444] font-light max-w-[280px] mx-auto leading-relaxed">
          Please wait. Our state engine is evaluating your structural readiness parameters.
        </p>
      </div>

      {/* Subtle loader bar */}
      <div className="w-48 h-[2px] bg-[#161616] rounded-full overflow-hidden border border-[#222]/30">
        <div
          className="h-full bg-gradient-to-r from-[#E040FB] to-[#ff66ff] transition-all duration-500 ease-out"
          style={{ width: `${((stepIndex + 1) / loadingSteps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
