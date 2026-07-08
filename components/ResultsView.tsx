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

  return (
    <div className="flex-grow w-full max-w-2xl mx-auto px-6 py-8 md:py-16 flex flex-col justify-start min-h-[90vh] font-sans animate-fadeIn selection:bg-[#E040FB] selection:text-black">
      {/* Reset/Retake trigger */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#E040FB] font-semibold bg-[#E040FB]/5 border border-[#E040FB]/10 rounded-full px-3 py-1">
          Analysis Complete
        </span>
        {showResetConfirm ? (
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-[#888]">Confirm reset?</span>
            <button
              onClick={onReset}
              className="text-[10px] uppercase tracking-[0.1em] text-red-500 font-semibold hover:underline"
            >
              Yes
            </button>
            <span className="text-[10px] text-[#444]">|</span>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="text-[10px] uppercase tracking-[0.1em] text-[#888] font-semibold hover:underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-[10px] uppercase tracking-[0.15em] text-[#888888] hover:text-white transition-colors flex items-center space-x-1 font-medium"
          >
            <span>Retake Quiz</span>
            <span>↺</span>
          </button>
        )}
      </div>

      {/* Main Results Card */}
      <div className="space-y-8">
        {/* Header Block */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-medium leading-none block">
            Your Readiness Report — {firstName.toUpperCase()}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-white font-medium leading-snug">
            {result.headline}
          </h1>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#E040FB]/40 via-[#222] to-transparent"></div>
        </div>

        {/* Narrative Block */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#444] font-medium block">
              Situation Summary
            </span>
            <p className="text-sm text-[#888888] font-light leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Glowing emphasis on diagnosis */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E040FB]/10 to-transparent rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
            <div className="relative bg-[#161616] border border-[#222] p-6 rounded-lg space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E040FB]"></div>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#E040FB] font-semibold">
                  Allie&rsquo;s Diagnosis
                </span>
              </div>
              <p className="text-sm text-white font-light leading-relaxed italic">
                &ldquo;{result.diagnosis}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Status Grid (2x2) */}
        <div className="space-y-3">
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#444] font-medium block">
            Structural Parameters
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111111] border border-[#222]/80 p-4 rounded flex flex-col justify-between space-y-1">
              <span className="text-[10px] text-[#444] font-medium uppercase tracking-[0.1em]">Offer Status</span>
              <span className="text-sm font-semibold text-white font-serif">{result.status_tiles.offer_status}</span>
            </div>
            <div className="bg-[#111111] border border-[#222]/80 p-4 rounded flex flex-col justify-between space-y-1">
              <span className="text-[10px] text-[#444] font-medium uppercase tracking-[0.1em]">Validation</span>
              <span className={`text-sm font-semibold font-serif ${
                result.status_tiles.validation === 'Proven' ? 'text-green-500' : 'text-white'
              }`}>
                {result.status_tiles.validation}
              </span>
            </div>
            <div className="bg-[#111111] border border-[#222]/80 p-4 rounded flex flex-col justify-between space-y-1">
              <span className="text-[10px] text-[#444] font-medium uppercase tracking-[0.1em]">Conversion Health</span>
              <span className={`text-sm font-semibold font-serif ${
                result.status_tiles.conversion === 'Working' ? 'text-[#E040FB]' : 'text-white'
              }`}>
                {result.status_tiles.conversion}
              </span>
            </div>
            <div className="bg-[#111111] border border-[#222]/80 p-4 rounded flex flex-col justify-between space-y-1">
              <span className="text-[10px] text-[#444] font-medium uppercase tracking-[0.1em]">Target Timeline</span>
              <span className="text-sm font-semibold text-white font-serif">{result.status_tiles.timeline}</span>
            </div>
          </div>
        </div>

        {/* Price Block */}
        <div className="bg-gradient-to-br from-[#161616] to-[#0f0a12] border border-[#E040FB]/20 p-6 rounded-lg space-y-2">
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#E040FB] font-semibold block">
            PRE-FRAMED INVESTMENT
          </span>
          <div className="flex flex-col md:flex-row md:items-baseline md:space-x-3">
            <span className="text-2xl md:text-3xl font-serif text-white font-medium">
              {result.price_anchor}
            </span>
          </div>
          <p className="text-xs text-[#888888] font-light leading-relaxed pt-1 border-t border-[#222222]/50">
            {result.price_note || 'Investment thresholds reflect the design, copywriting, and setup standards matching this segment.'}
          </p>
        </div>

        {/* Dynamic Scheduler & CTA Block */}
        <div className="pt-6 border-t border-[#222222]/50 space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-white font-medium">
              Ready to talk?
            </h3>
            <p className="text-xs text-[#888888] font-light">
              Your personalized high-ticket diagnostic report has been compiled. Let&rsquo;s audit this report together and map your actual build plan.
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] p-5 rounded-lg space-y-4">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#E040FB] font-semibold block text-center">
              Book a Strategy Call with Allie
            </span>

            <button
              type="button"
              onClick={() => setShowBookingModal(true)}
              className="w-full py-4 text-sm font-semibold rounded bg-[#E040FB] text-black hover:shadow-[0_0_15px_rgba(224,64,251,0.4)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Schedule My Strategy Call</span>
              <span>→</span>
            </button>

            <span className="text-[10px] text-[#444] block text-center font-light">
              No pressure. No pitch. Just a clear, pre-framed technical roadmap.
            </span>
          </div>
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
