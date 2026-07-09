'use client';

import React, { useState } from 'react';

interface SidebarProps {
  currentStep: string;
  // Progress phases: 0=Identity, 1=Situation, 2=Offer Path, 3=Operations, 4=Assets, 5=Timeline
  activePhaseIndex: number;
}

const phases = [
  { name: 'Identity', desc: 'Who you are' },
  { name: 'Situation', desc: 'Your current offer state' },
  { name: 'Offer Path', desc: 'Offer validation & history' },
  { name: 'Operations', desc: 'System & conversion health' },
  { name: 'Assets', desc: 'Existing collateral' },
  { name: 'Timeline', desc: 'Urgency & goals' }
];

export default function Sidebar({ currentStep, activePhaseIndex }: SidebarProps) {
  const [imageError, setImageError] = useState(false);

  // Highlight the 7th item (index 6) when the results screen is active
  const effectivePhaseIndex = currentStep === 'results' ? 6 : activePhaseIndex;

  const sidebarPhases = [
    ...phases,
    ...(currentStep === 'results' ? [{ name: 'Superpower Blueprint', desc: 'Where You Are, What You Need To DO Next' }] : [])
  ];

  return (
    <aside className="w-full md:w-[240px] md:fixed md:top-0 md:bottom-0 md:left-0 bg-[#111111] border-b md:border-b-0 md:border-r border-[#222222] p-6 flex flex-col justify-between z-30 transition-all duration-300">
      {/* Top Branding & Headshot */}
      <div className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
        {/* Wordmark */}
        <div className="text-center w-full flex justify-center -my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/askalliepasag_logo.png"
            alt="ask Allie Pasag Logo"
            className="w-full h-auto max-w-[190px] object-contain"
          />
        </div>

        {/* Headshot with zero border/circle, fading into page background */}
        <div className="relative group flex flex-col items-center justify-center w-full">
          <div className="relative w-28 h-36 sm:w-32 sm:h-40 overflow-hidden bg-gradient-to-tr from-[#161616] to-[#25102a] flex items-center justify-center shadow-2xl transition-all duration-300">
            {imageError ? (
              <span className="font-serif text-2xl font-bold text-[#E040FB]">AP</span>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/allie_portrait.jpg"
                  alt="Allie Pasag"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={() => setImageError(true)}
                />
                {/* Custom Gradient Overlays to melt image into the background (#111111) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#111111] to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-[#111111] to-transparent pointer-events-none" />
              </>
            )}
          </div>
          {/* Subtle online status indicator */}
          <div className="absolute bottom-2 right-12 w-2.5 h-2.5 bg-[#E040FB] rounded-full border border-[#111111] shadow-md animate-pulse"></div>
        </div>

        {/* Tagline */}
        <div className="text-center w-full">
          <p className="text-xs text-[#888888] italic leading-relaxed max-w-[200px] mx-auto">
            &ldquo;This takes 3 minutes. What you get at the end is worth it.&rdquo;
          </p>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="my-6 md:my-8 py-4 md:py-0 border-t border-b border-[#222222] md:border-0 flex md:flex-col items-center justify-center md:items-start md:justify-start space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-x-visible no-scrollbar">
        {sidebarPhases.map((phase, idx) => {
          const isComplete = idx < effectivePhaseIndex;
          const isActive = idx === effectivePhaseIndex;
          const isSuperpower = phase.name === 'Superpower Blueprint';
          
          return (
            <div key={phase.name} className="flex items-center space-x-3 group relative cursor-pointer flex-shrink-0">
              {/* Dot Icon */}
              <div className="relative flex items-center justify-center">
                {isComplete ? (
                  /* Completed Dot */
                  <div className="w-5 h-5 rounded-full bg-[#E040FB]/10 border border-[#E040FB] flex items-center justify-center text-[10px] text-[#E040FB] font-bold shadow-sm shadow-[#E040FB]/20 transition-all duration-300">
                    ✓
                  </div>
                ) : isActive ? (
                  /* Active Dot */
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 rounded-full bg-[#E040FB]/20 animate-ping"></div>
                    <div className="relative w-5 h-5 rounded-full bg-[#E040FB] border border-[#E040FB] flex items-center justify-center shadow-md shadow-[#E040FB]/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                ) : (
                  /* Remaining Dot */
                  <div className="w-5 h-5 rounded-full bg-[#161616] border border-[#333] group-hover:border-[#555] transition-colors duration-300"></div>
                )}
              </div>

              {/* Label (Visible on md+) */}
              <div className="hidden md:flex flex-col text-left">
                <span className={`text-[10px] uppercase tracking-[0.15em] font-medium leading-none ${
                  isActive 
                    ? isSuperpower 
                      ? 'text-[#E040FB] font-bold shadow-sm' 
                      : 'text-white font-semibold' 
                    : isComplete 
                      ? 'text-[#888888]' 
                      : 'text-[#444444]'
                }`}>
                  {phase.name}
                </span>
                <span className={`text-[9px] font-light mt-0.5 max-w-[170px] ${
                  isSuperpower ? 'text-[#888888]' : 'text-[#555]'
                }`}>
                  {phase.desc}
                </span>
              </div>

              {/* Tooltip for mobile */}
              <div className="absolute md:hidden -top-8 left-1/2 -translate-x-1/2 bg-[#161616] text-white text-[10px] py-1 px-2 rounded border border-[#222] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-40">
                {phase.name}: {phase.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Branding info / footer */}
      <div className="hidden md:block text-[9px] text-[#444444] font-light text-center w-full">
        <p>&copy; {new Date().getFullYear()} askalliepasag.</p>
        <p className="mt-0.5">All rights reserved.</p>
      </div>
    </aside>
  );
}
