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
  { name: 'Timeline', desc: 'Urgency & goals' },
  { name: 'Superpower Blueprint', desc: 'Where You Are, What You Need To DO Next' }
];

export default function Sidebar({ currentStep, activePhaseIndex }: SidebarProps) {
  const [imageError, setImageError] = useState(false);

  // Highlight the 7th item (index 6) when the results or loading screen is active
  const effectivePhaseIndex = (currentStep === 'results' || currentStep === 'loading') ? 6 : activePhaseIndex;

  return (
    <aside className="w-full md:w-[280px] md:fixed md:top-0 md:bottom-0 md:left-0 bg-[#111111] border-b md:border-b-0 md:border-r border-[#222222] p-4 md:p-6 flex flex-col md:justify-between z-30 transition-all duration-300 md:overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#E040FB]/30 animate-fade-in">
      {/* Top Branding & Headshot */}
      <div className="flex flex-col items-center space-y-4 md:space-y-8 text-center w-full">
        {/* Wordmark */}
        <div className="text-center w-full flex justify-center md:-my-10 -my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/askalliepasag_logo.png"
            alt="ask Allie Pasag Logo"
            className="w-full h-auto max-w-[130px] md:max-w-[190px] object-contain"
          />
        </div>

        {/* Headshot with zero border/circle, fading into page background (Desktop Only) */}
        <div className="relative group desktop-only-flex flex-col items-center justify-center w-full">
          <div className="relative">
            <div className="sidebar-portrait-container bg-gradient-to-tr from-[#161616] to-[#25102a] flex items-center justify-center shadow-2xl transition-all duration-300">
              {imageError ? (
                <span className="font-serif text-2xl font-bold text-[#E040FB]">AP</span>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/allie_portrait.jpg"
                    alt="Allie Pasag"
                    onError={() => setImageError(true)}
                  />
                  {/* Custom Gradient Overlays to melt image into the background (#111111) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30 pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#111111] to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-[#111111] to-transparent pointer-events-none" />
                </>
              )}
            </div>
            {/* Subtle online status indicator at bottom-right corner of photo container */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#E040FB] rounded-full border border-[#111111] shadow-md animate-pulse z-20"></div>
          </div>
        </div>

        {/* Tagline (Desktop Only) */}
        <div className="text-center w-full desktop-only-block">
          <p className="text-[13.5px] md:text-[14.5px] text-[#A2968A] italic leading-relaxed max-w-[210px] mx-auto">
            &ldquo;This takes 3 minutes. What you get at the end is worth it.&rdquo;
          </p>
        </div>
      </div>

      {/* Progress Dots Section */}
      <div className="my-3 md:my-8 py-2 md:py-0 border-t border-b border-[#222222]/50 md:border-0 flex flex-col items-center md:items-start justify-center md:justify-start w-full md:max-w-[240px] mx-auto md:mx-0">
        
        {/* Horizontal dots on mobile, hidden on desktop */}
        <div className="mobile-only-flex items-center justify-between w-full max-w-[280px] mb-2.5 relative px-2">
          {/* Connector Line behind dots */}
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-[#222222] -translate-y-1/2 z-0"></div>
          
          {phases.map((phase, idx) => {
            const isComplete = idx < effectivePhaseIndex;
            const isActive = idx === effectivePhaseIndex;
            
            return (
              <div key={`dot-${phase.name}`} className="relative z-10 flex items-center justify-center bg-[#111111] px-1">
                {isComplete ? (
                  /* Completed Dot */
                  <div className="w-4 h-4 rounded-full bg-[#E040FB]/10 border border-[#E040FB] flex items-center justify-center text-[8px] text-[#E040FB] font-bold shadow-sm shadow-[#E040FB]/20 transition-all duration-300">
                    ✓
                  </div>
                ) : isActive ? (
                  /* Active Dot */
                  <div className="relative w-4 h-4">
                    <div className="absolute inset-0 rounded-full bg-[#E040FB]/20 animate-ping"></div>
                    <div className="relative w-4 h-4 rounded-full bg-[#E040FB] border border-[#E040FB] flex items-center justify-center shadow-md shadow-[#E040FB]/30">
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                    </div>
                  </div>
                ) : (
                  /* Remaining Dot */
                  <div className="w-4 h-4 rounded-full bg-[#161616] border border-[#333]"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active step label and desc on mobile, hidden on desktop */}
        <div className="mobile-only-flex flex-col items-center justify-center text-center w-full max-w-[280px] px-2 mt-2 pb-1 z-10">
          <span className="text-[11.5px] uppercase tracking-[0.18em] font-bold text-[#EC5FB4] animate-fadeIn">
            {phases[effectivePhaseIndex]?.name || 'Assessment'}
          </span>
          <span className="text-[10px] text-[#A2968A] font-medium mt-1 max-w-[250px] mx-auto leading-normal animate-fadeIn">
            {phases[effectivePhaseIndex]?.desc || 'Answer the questions below'}
          </span>
        </div>

        {/* Desktop Vertical Steps (hidden on mobile) */}
        <div className="desktop-only-flex flex-col space-y-4.5 w-full">
          {phases.map((phase, idx) => {
            const isComplete = idx < effectivePhaseIndex;
            const isActive = idx === effectivePhaseIndex;
            const isSuperpower = phase.name === 'Superpower Blueprint';
            
            return (
              <div key={phase.name} className="flex items-center space-x-3.5 group relative cursor-pointer flex-shrink-0 w-full">
                {/* Dot Icon */}
                <div className="relative flex items-center justify-center flex-shrink-0">
                  {isComplete ? (
                    <div className="w-5 h-5 rounded-full bg-[#E040FB]/10 border border-[#E040FB] flex items-center justify-center text-[10px] text-[#E040FB] font-bold shadow-sm shadow-[#E040FB]/20 transition-all duration-300">
                      ✓
                    </div>
                  ) : isActive ? (
                    <div className="relative w-5 h-5">
                      <div className="absolute inset-0 rounded-full bg-[#E040FB]/20 animate-ping"></div>
                      <div className="relative w-5 h-5 rounded-full bg-[#E040FB] border border-[#E040FB] flex items-center justify-center shadow-md shadow-[#E040FB]/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#161616] border border-[#333] group-hover:border-[#555] transition-colors duration-300"></div>
                  )}
                </div>

                {/* Label */}
                <div className="flex flex-col text-left">
                  <span className={`text-[12px] md:text-[12.5px] uppercase tracking-[0.15em] font-semibold leading-none ${
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
                  <span className={`text-[11px] md:text-[11.5px] font-light mt-1 max-w-[190px] ${
                    isSuperpower ? 'text-[#888888]' : 'text-[#555]'
                  }`}>
                    {phase.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Branding info / footer (Desktop Only) */}
      <div className="desktop-only-block text-[9px] text-[#444444] font-light text-center w-full">
        <p>&copy; {new Date().getFullYear()} askalliepasag.</p>
        <p className="mt-0.5">All rights reserved.</p>
      </div>
    </aside>
  );
}
