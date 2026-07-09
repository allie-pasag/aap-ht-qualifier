'use client';

import React, { useState } from 'react';
import { QuizResult } from '../lib/quizLogic';

interface ResultsViewProps {
  result: QuizResult;
  firstName: string;
  lastName: string;
  email: string;
  onReset: () => void;
  dbSaved?: boolean;
}

interface ClientProfileData {
  title: string;
  subtitle: string;
  percentage: number;
  statusTitle: string;
  statusSubtext: string;
  whatToBuildNext: string[];
}

const clientProfiles: Record<string, ClientProfileData> = {
  '1': {
    title: 'The Multi-Passionate',
    subtitle: 'Capable of everything, committed to nothing — yet.',
    percentage: 44,
    statusTitle: 'Warming up.',
    statusSubtext: 'The pieces are there; they\'re just not connected yet. This is a positioning and structure job, not a rebuild.',
    whatToBuildNext: [
      'Diagnose which of your ideas actually earns — not just which excites you.',
      'Synthesize the single coherent thread where your skills meet the market.',
      'Name it clearly so the offer stops shape-shifting every week.'
    ]
  },
  '2': {
    title: 'The Unpackaged Genius',
    subtitle: 'Proven delivery, zero packaging — yet.',
    percentage: 44,
    statusTitle: 'Warming up.',
    statusSubtext: 'The expertise is fully proven; it just remains unstructured. This is a packaging and positioning job, not a rebuild.',
    whatToBuildNext: [
      'Audit your raw expertise and lock down the primary commercial skill.',
      'Structure your deliverables into a repeating, high-ticket package.',
      'Draft the core messaging so strangers immediately see your price logic.'
    ]
  },
  '3': {
    title: 'The Inconsistent Validator',
    subtitle: 'Active offer, inconsistent conversion — for now.',
    percentage: 68,
    statusTitle: 'In Motion.',
    statusSubtext: 'The offer exists and has generated traction, but leaks in the conversion funnel are holding you back from high-ticket status.',
    whatToBuildNext: [
      'Conduct a friction audit of your active landing pages and intake forms.',
      'Reposition the hook so it is specialized for high-intent, high-ticket buyers.',
      'Deploy a clear, pre-framed conversion pathway to warm up cold leads.'
    ]
  },
  '5': {
    title: 'The Manual Operator',
    subtitle: 'Product-market fit is proven, systems are missing.',
    percentage: 88,
    statusTitle: 'Ready to Scale.',
    statusSubtext: 'Your product-market fit is proven. Your delivery works. You just need a professional, automated engine matching your authority.',
    whatToBuildNext: [
      'Map your active client journey from first contact to signed contract.',
      'Automate the intake scheduler, qualification form, and reminder sequence.',
      'Deploy a professional checkout flow and digital onboarding portal.'
    ]
  },
  '4': {
    title: 'The Ceiling Hitter',
    subtitle: 'Successful systems, but outgrowing your pricing.',
    percentage: 88,
    statusTitle: 'Ready to Scale.',
    statusSubtext: 'Your product-market fit is proven. Your delivery works. You just need a professional, automated engine matching your authority.',
    whatToBuildNext: [
      'Re-engineer your pricing floor and raise your minimum investment standard.',
      'Design a premium launch layer that reflects your true tier of authority.',
      'Automate cold-to-warm assets so you filter out low-ticket tire kickers.'
    ]
  },
  'live_improve': {
    title: 'The High-Performance Optimizer',
    subtitle: 'Core system working, but holes in the bucket.',
    percentage: 88,
    statusTitle: 'Ready to Scale.',
    statusSubtext: 'Your product-market fit is proven. Your delivery works. You just need a professional, automated engine matching your authority.',
    whatToBuildNext: [
      'Audit active automated nurture loops to plug leaking pipeline leads.',
      'Fine-tune page speeds, intake forms, and checkout pathways.',
      'Establish crystal-clear key results tracking from clicks to consultation calls.'
    ]
  }
};

export default function ResultsView({
  result,
  firstName,
  lastName,
  email,
  onReset,
  dbSaved,
}: ResultsViewProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Retrieve client profile based on the output category (with safety fallback)
  const profile = clientProfiles[result.client_type] || clientProfiles['1'];

  return (
    <div className="flex-grow w-full max-w-2xl mx-auto px-6 py-8 md:py-16 flex flex-col justify-start min-h-[90vh] font-sans animate-fadeIn selection:bg-[#E040FB] selection:text-black">
      
      {/* Top Bar Branding Navigation */}
      <div className="flex justify-between items-center pb-5 border-b border-[#E040FB] mb-8">
        <div className="h-5 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/askalliepasag_logo.png" 
            className="h-full object-contain filter brightness-110" 
            alt="askalliepasag" 
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold">
          YOUR RESULT
        </span>
        
        {showResetConfirm ? (
          <div className="flex items-center space-x-2 bg-[#161616] border border-[#222] px-3 py-1 rounded-full animate-fadeIn">
            <span className="text-[9px] text-[#888]">Retake?</span>
            <button
              onClick={onReset}
              className="text-[9px] uppercase tracking-[0.1em] text-red-500 font-bold hover:underline"
            >
              Yes
            </button>
            <span className="text-[9px] text-[#444]">|</span>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="text-[9px] uppercase tracking-[0.1em] text-[#888] font-bold hover:underline"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-8 h-8 rounded-full border border-[#222] hover:border-[#E040FB]/40 flex items-center justify-center text-xs text-[#888] hover:text-white transition-all duration-300"
            title="Retake Quiz"
          >
            ✕
          </button>
        )}
      </div>

      {/* Inline Animation styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.1deg); }
        }
        .animate-subtle-bob {
          animation: subtleBob 3s ease-in-out infinite;
        }
      `}} />

      {/* Client Profile Header Block */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#E040FB] font-bold block">
          YOUR CLIENT TYPE
        </span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-none">
          {profile.title}
        </h1>
        <p className="font-serif italic text-lg md:text-xl text-[#E040FB]/90 leading-relaxed font-normal">
          {profile.subtitle}
        </p>
      </div>

      {/* Main Narrative & Cartoon Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left: Dynamic Copy & Custom Diagnosis */}
        <div className="md:col-span-8 space-y-6">
          <p className="text-sm text-[#888888] font-light leading-relaxed">
            {result.summary}
          </p>

          {/* Allie's Strategic Diagnosis Block */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E040FB]/5 to-transparent rounded-xl blur-md"></div>
            <div className="relative bg-[#111111]/40 border border-[#222222]/50 p-6 rounded-xl space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E040FB]"></div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#E040FB] font-bold">
                  Allie&rsquo;s Diagnosis
                </span>
              </div>
              <p className="text-sm text-white/90 font-light leading-relaxed italic">
                &ldquo;{result.diagnosis}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right: Premium Bobbing Headshot/Cartoon */}
        <div className="md:col-span-4 flex justify-center md:justify-end self-center md:pt-4">
          <div className="relative w-36 h-36 md:w-40 md:h-40 flex-shrink-0 animate-subtle-bob">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/allie_cartoon_answer.png" 
              alt="Allie Cartoon" 
              className="w-full h-full object-contain relative z-10"
            />
          </div>
        </div>
      </div>

      {/* High-Ticket Readiness Progress Card */}
      <div className="bg-[#111111]/40 border border-[#222222]/50 rounded-xl p-6 mt-8 space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-bold">
            HIGH-TICKET READINESS
          </span>
          <span className="font-serif text-3xl font-medium text-[#E040FB]">
            {profile.percentage}%
          </span>
        </div>
        
        {/* Sleek horizontal bar */}
        <div className="w-full bg-[#161619] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#E040FB] h-full rounded-full transition-all duration-1000 ease-out shadow-sm shadow-[#E040FB]/30"
            style={{ width: `${profile.percentage}%` }}
          ></div>
        </div>
        
        {/* Progress Subtext */}
        <p className="text-xs text-[#888888] font-light leading-relaxed">
          <span className="font-bold text-white mr-1.5">{profile.statusTitle}</span>
          {profile.statusSubtext}
        </p>
      </div>

      {/* What To Build Next Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-bold block">
          WHAT TO BUILD NEXT
        </h2>
        
        <div className="border-t border-[#222222] divide-y divide-[#222222]">
          {profile.whatToBuildNext.map((step, idx) => (
            <div key={idx} className="py-4 flex items-start space-x-4">
              <span className="font-serif text-sm text-[#E040FB] font-medium pt-0.5">
                0{idx + 1}
              </span>
              <p className="text-sm text-white/90 font-light leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Framed Investment Block */}
      <div className="mt-12 bg-[#111111]/30 border border-[#222222]/50 p-6 rounded-xl space-y-3">
        <span className="text-[9px] uppercase tracking-[0.15em] text-[#E040FB] font-bold block">
          PRE-FRAMED INVESTMENT
        </span>
        <div className="flex flex-col md:flex-row md:items-baseline md:space-x-3">
          <span className="text-2xl md:text-3xl font-serif text-white font-medium">
            {result.price_anchor}
          </span>
        </div>
        <p className="text-xs text-[#888888] font-light leading-relaxed pt-2.5 border-t border-[#222222]/40">
          {result.price_note || 'Investment thresholds reflect the design, copywriting, and setup standards matching this segment.'}
        </p>
      </div>

      {/* Want Allie to Build it With You? CTA Card */}
      <div className="bg-gradient-to-br from-[#1A111E]/40 to-[#0A0A0C]/40 border border-[#E040FB]/15 rounded-2xl p-8 mt-12 space-y-6">
        <h3 className="font-serif text-2xl text-white font-medium leading-snug">
          Want Allie to build it with you?
        </h3>
        <p className="text-sm text-[#888888] font-light leading-relaxed">
          Bring this result to a consultation call. It's the exact starting point Allie uses to map your offer &mdash; no pitch, just the plan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="flex-grow py-4 text-sm font-semibold rounded bg-[#E040FB] text-black hover:shadow-[0_0_20px_rgba(224,64,251,0.5)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Book a consultation call</span>
            <span>&rarr;</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-6 py-4 text-sm font-medium rounded border border-[#222222] hover:border-white/20 hover:bg-white/5 active:scale-[0.99] text-[#888888] hover:text-white transition-all duration-300"
          >
            Retake the quiz
          </button>
        </div>
      </div>

      {/* Embedded Popup Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[9999] p-0 md:p-6 animate-fadeIn">
          <div className="relative bg-[#111] md:border md:border-[#222] w-full h-full md:h-[85vh] md:max-w-2xl md:rounded-2xl overflow-hidden shadow-2xl animate-scaleIn flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#141414] border-b border-[#222] flex justify-between items-center flex-shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E040FB] animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-[#E040FB] font-semibold">Live Booking Scheduler</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-xs text-[#888] hover:text-white transition-all p-2 flex items-center space-x-1"
              >
                <span>✕</span>
                <span>Close</span>
              </button>
            </div>

            {/* Embedded BLAB Iframe */}
            <div className="flex-grow w-full relative bg-[#111]">
              <iframe
                src={`https://bookme.name/askalliepasag/lite/discovery-call?firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`}
                width="100%"
                height="100%"
                style={{ border: 'none', background: '#111' }}
                title="Book Allie Pasag Discovery Call"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
