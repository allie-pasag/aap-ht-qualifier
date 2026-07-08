'use client';

import React, { useState } from 'react';
import { QuizResult } from '../lib/quizLogic';

interface ResultsViewProps {
  result: QuizResult;
  firstName: string;
  onReset: () => void;
  dbSaved?: boolean;
}

const mockTimeslots = [
  "9:00 AM EST",
  "10:30 AM EST",
  "1:00 PM EST",
  "3:30 PM EST",
  "5:00 PM EST"
];

// Helper to get next 3 business days
const getNextBusinessDays = () => {
  const days: { date: Date; label: string; weekday: string }[] = [];
  let current = new Date();
  
  while (days.length < 3) {
    current.setDate(current.getDate() + 1);
    const dayOfWeek = current.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const weekday = current.toLocaleDateString('en-US', { weekday: 'short' });
      const label = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days.push({ date: new Date(current), label, weekday });
    }
  }
  return days;
};

export default function ResultsView({ result, firstName, onReset, dbSaved }: ResultsViewProps) {
  const [selectedDayIdx, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'confirmed'>('idle');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const businessDays = getNextBusinessDays();

  const handleBook = () => {
    if (selectedDayIdx === null || !selectedTime) return;
    setBookingStatus('booking');
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 1500);
  };

  const selectedDateLabel = selectedDayIdx !== null 
    ? `${businessDays[selectedDayIdx].weekday}, ${businessDays[selectedDayIdx].label}` 
    : '';

  return (
    <div className="flex-grow w-full max-w-2xl mx-auto px-6 py-8 md:py-16 flex flex-col justify-start min-h-[90vh] font-sans animate-fadeIn selection:bg-[#E040FB] selection:text-black">
      {dbSaved && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400 font-light flex items-center space-x-2 animate-fadeIn">
          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>Success! Your diagnostic details have been securely synchronized with the Supabase database.</span>
        </div>
      )}
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
        <div className="pt-4 border-t border-[#222222]/50 space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-white font-medium">
              Ready to talk?
            </h3>
            <p className="text-xs text-[#888888] font-light">
              Your personalized high-ticket diagnostic report has been compiled. Let&rsquo;s audit this report together and maps your actual build plan.
            </p>
          </div>

          {bookingStatus === 'idle' && (
            <div className="bg-[#111] border border-[#222] p-5 rounded-lg space-y-5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#E040FB] font-semibold block text-center">
                Select a strategy call slot with Allie
              </span>
              
              {/* Day selection */}
              <div className="grid grid-cols-3 gap-3">
                {businessDays.map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedDayIndex(idx);
                      setSelectedTime(null); // Clear selected time on day change
                    }}
                    className={`p-3 rounded border text-center transition-all duration-300 ${
                      selectedDayIdx === idx
                        ? 'bg-[#E040FB]/10 border-[#E040FB] text-white shadow-sm'
                        : 'bg-[#161616] border-[#222] text-[#888] hover:border-[#444]'
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider font-light">{day.weekday}</div>
                    <div className="text-xs font-semibold mt-1 font-serif">{day.label}</div>
                  </button>
                ))}
              </div>

              {/* Time selection (only if day selected) */}
              {selectedDayIdx !== null && (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-[9px] uppercase tracking-[0.1em] text-[#888] block text-center">
                    Available timeslots for {selectedDateLabel}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {mockTimeslots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2.5 rounded border text-center text-xs font-light transition-all duration-300 ${
                          selectedTime === time
                            ? 'bg-[#E040FB]/10 border-[#E040FB] text-white'
                            : 'bg-[#161616] border-[#222] text-[#888] hover:border-[#444]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking CTA Button */}
              <button
                type="button"
                onClick={handleBook}
                disabled={selectedDayIdx === null || !selectedTime}
                className={`w-full py-4 text-sm font-semibold rounded transition-all duration-300 flex items-center justify-center space-x-2 ${
                  selectedDayIdx !== null && selectedTime
                    ? 'bg-[#E040FB] text-black hover:shadow-[0_0_15px_rgba(224,64,251,0.4)] active:scale-[0.99]'
                    : 'bg-[#1c1c1c] text-[#444444] border border-[#222] cursor-not-allowed'
                }`}
              >
                <span>Book my strategy call</span>
                <span className="text-xs font-light">
                  {selectedTime ? `for ${selectedDateLabel} @ ${selectedTime}` : '→'}
                </span>
              </button>

              <span className="text-[10px] text-[#444] block text-center font-light">
                No pressure. No pitch. Just a clear, pre-framed technical roadmap.
              </span>
            </div>
          )}

          {bookingStatus === 'booking' && (
            <div className="bg-[#111] border border-[#222] p-8 rounded-lg flex flex-col items-center justify-center space-y-4 text-center min-h-[220px]">
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#E040FB] animate-spin"></div>
              <p className="text-sm text-[#888] font-light">Registering booking slot on pipeline...</p>
            </div>
          )}

          {bookingStatus === 'confirmed' && (
            <div className="bg-gradient-to-br from-[#111] to-[#121c13] border border-green-500/20 p-6 md:p-8 rounded-lg flex flex-col items-center justify-center space-y-4 text-center animate-scaleIn">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 text-lg">
                ✓
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl text-white font-medium">Strategy Call Confirmed!</h4>
                <p className="text-xs text-[#888888] font-light max-w-sm leading-relaxed">
                  Congratulations, {firstName}! Allie has locked your booking slot for <strong>{selectedDateLabel} @ {selectedTime}</strong>. A calendar invite has been sent to your email.
                </p>
              </div>
              <div className="bg-[#161616]/60 border border-[#222]/50 p-4 rounded text-left text-xs font-light space-y-1 w-full max-w-sm">
                <div className="text-[10px] uppercase tracking-wider text-[#E040FB] font-semibold">PRE-DIAGNOSED PRE-FRAME:</div>
                <div className="text-white mt-1">Client Type: <span className="font-serif font-medium">{result.client_type}</span></div>
                <div className="text-white">Assigned Bucket: <span className="font-serif font-medium">Bucket {result.client_bucket}</span></div>
                <div className="text-white">Starting Price Floor: <span className="font-serif font-medium">{result.price_anchor}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
