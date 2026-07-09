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
  percentage: number;
  statusTitle: string;
  statusSubtext: string;
  whatToBuildNext: string[];
}

const clientProfiles: Record<string, ClientProfileData> = {
  '1': {
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
    percentage: 64,
    statusTitle: 'In Motion.',
    statusSubtext: 'The offer exists and has generated traction, but leaks in the conversion funnel are holding you back from high-ticket status.',
    whatToBuildNext: [
      'Conduct a friction audit of your active landing pages and intake forms.',
      'Reposition the hook so it is specialized for high-intent, high-ticket buyers.',
      'Deploy a clear, pre-framed conversion pathway to warm up cold leads.'
    ]
  },
  '5': {
    percentage: 78,
    statusTitle: 'Strong foundation.',
    statusSubtext: 'The machine is running — it\'s leaking, not broken. This is an optimization job, not a rebuild.',
    whatToBuildNext: [
      'Map your active client journey from first contact to signed contract.',
      'Automate the intake scheduler, qualification form, and reminder sequence.',
      'Deploy a professional checkout flow and digital onboarding portal.'
    ]
  },
  '4': {
    percentage: 78,
    statusTitle: 'Strong foundation.',
    statusSubtext: 'The machine is running — it\'s leaking, not broken. This is an optimization job, not a rebuild.',
    whatToBuildNext: [
      'Re-engineer your pricing floor and raise your minimum investment standard.',
      'Design a premium launch layer that reflects your true tier of authority.',
      'Automate cold-to-warm assets so you filter out low-ticket tire kickers.'
    ]
  },
  'live_improve': {
    percentage: 78,
    statusTitle: 'Strong foundation.',
    statusSubtext: 'The machine is running — it\'s leaking, not broken. This is an optimization job, not a rebuild.',
    whatToBuildNext: [
      'Audit active pages and nurture sequences to find where qualified leads are dropping off.',
      'Tighten pipeline stage logic so no deal stalls without a clear next action.',
      'Layer in LTV-focused automation — upsells, re-engagement, and post-purchase flows — to lift total customer value.'
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

  // Bucket C uses optimization language, while Buckets A & B use build language
  const buildHeading = result.client_bucket === 'C' ? 'WHAT TO OPTIMIZE NEXT' : 'WHAT TO BUILD NEXT';

  return (
    <div className="flex-grow w-full max-w-2xl mx-auto px-6 py-8 md:py-16 flex flex-col justify-start min-h-[90vh] font-sans animate-fadeIn selection:bg-[#E040FB] selection:text-black">
      
      {/* Top Header Row (Reset/Retake and Status Indicator) */}
      <div className="flex justify-between items-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#E040FB] font-semibold bg-[#E040FB]/5 border border-[#E040FB]/10 rounded-full px-3 py-1">
          Analysis Complete
        </span>
        
        {showResetConfirm ? (
          <div className="flex items-center space-x-2 bg-[#161616] border border-[#222] px-3 py-1 rounded-full animate-fadeIn">
            <span className="text-[9px] text-[#888]">Confirm reset?</span>
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
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-[10px] uppercase tracking-[0.15em] text-[#888888] hover:text-white transition-colors duration-300 flex items-center space-x-1 font-semibold"
          >
            <span>Retake Quiz</span>
            <span>↺</span>
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

      {/* Headline & Avatar Split Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 mb-8">
        <div className="space-y-3 text-center sm:text-left flex-grow">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold leading-none block">
            YOUR SUPERPOWER BLUEPRINT — {firstName.toUpperCase()}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight">
            {result.headline}
          </h1>
        </div>
        
        {/* Bobbing Cartoon Avatar */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 animate-subtle-bob">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/allie_cartoon_answer.png" 
            alt="Allie Cartoon" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>
      </div>

      {/* Situation Summary */}
      <div className="space-y-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-bold block">
          SITUATION SUMMARY
        </span>
        <p className="text-sm text-[#888888] font-light leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Allie's Diagnosis Card */}
      <div className="relative group mb-8">
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

      {/* High-Ticket Readiness Progress Card */}
      <div className="bg-[#111111]/40 border border-[#222222]/50 rounded-xl p-6 mb-8 space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-bold">
            HIGH-TICKET READINESS
          </span>
          <span className="font-serif text-3xl font-medium text-[#E040FB]">
            {profile.percentage}%
          </span>
        </div>
        
        {/* Sleek horizontal progress bar */}
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

      {/* Structural Parameters Grid (2x2) */}
      <div className="space-y-3 mb-12">
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-bold block">
          STRUCTURAL PARAMETERS
        </span>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#111111]/40 border border-[#222222]/50 p-4 rounded-xl flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-[0.1em]">Offer Status</span>
            <span className="text-sm font-semibold text-white font-serif">{result.status_tiles.offer_status}</span>
          </div>
          <div className="bg-[#111111]/40 border border-[#222222]/50 p-4 rounded-xl flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-[0.1em]">Validation</span>
            <span className={`text-sm font-semibold font-serif ${
              result.status_tiles.validation === 'Proven' ? 'text-green-500' : 'text-white'
            }`}>
              {result.status_tiles.validation}
            </span>
          </div>
          <div className="bg-[#111111]/40 border border-[#222222]/50 p-4 rounded-xl flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-[0.1em]">Conversion Health</span>
            <span className={`text-sm font-semibold font-serif ${
              result.status_tiles.conversion === 'Working' ? 'text-[#E040FB]' : 'text-white'
            }`}>
              {result.status_tiles.conversion}
            </span>
          </div>
          <div className="bg-[#111111]/40 border border-[#222222]/50 p-4 rounded-xl flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-[#444] font-bold uppercase tracking-[0.1em]">Target Timeline</span>
            <span className="text-sm font-semibold text-white font-serif">{result.status_tiles.timeline}</span>
          </div>
        </div>
      </div>

      {/* What To Optimize/Build Next checklist */}
      <div className="mb-12 space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold block">
          {buildHeading}
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
      <div className="mb-12 bg-[#111111]/30 border border-[#222222]/50 p-6 rounded-xl space-y-3">
        <span className="text-[9px] uppercase tracking-[0.15em] text-[#E040FB] font-bold block">
          PRE-FRAMED INVESTMENT
        </span>
        <div className="flex flex-col md:flex-row md:items-baseline md:space-x-3">
          <span className="text-3xl md:text-4xl font-serif text-white font-medium">
            {result.price_anchor}
          </span>
        </div>
        <p className="text-xs text-[#888888] font-light leading-relaxed pt-2.5 border-t border-[#222222]/40">
          {result.price_note || 'Investment thresholds reflect the design, copywriting, and setup standards matching this segment.'}
        </p>
      </div>

      {/* Call to Action Schedule Block */}
      <div className="pt-6 border-t border-[#222222]/50 space-y-6 text-center">
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-serif text-2xl text-white font-medium">
            Ready to talk?
          </h3>
          <p className="text-xs text-[#888888] font-light leading-relaxed">
            Your personalized high-ticket diagnostic report has been compiled. Let&rsquo;s audit this report together and map your actual build plan.
          </p>
        </div>

        <div className="bg-[#111111]/40 border border-[#222222]/50 p-6 rounded-xl space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#E040FB] font-bold block text-center">
            BOOK A STRATEGY CALL WITH ALLIE
          </span>

          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="w-full py-4 text-sm font-semibold rounded bg-[#E040FB] text-black hover:shadow-[0_0_20px_rgba(224,64,251,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Schedule My Strategy Call</span>
            <span>&rarr;</span>
          </button>

          <span className="text-[10px] text-[#444] block text-center font-light">
            No pressure. No pitch. Just a clear, pre-framed technical roadmap.
          </span>
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
