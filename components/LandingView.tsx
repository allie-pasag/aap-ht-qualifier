'use client';

import React, { useState } from 'react';

interface LandingViewProps {
  onStart: () => void;
}

const valueProps = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#E040FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Diagnostic Clarity",
    description: "Identify exactly which of the 5 Client Types matches your current situation, and know exactly what is slowing down your sales."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#E040FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Allie's Voice-Tuned AI",
    description: "No templated results. Get a personalized situation summary and direct honest feedback written based on Allie's strategy rules."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#E040FB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Pre-Framed Pricing",
    description: "See a clear starting price anchor matching your exact service requirements before booking, so there are zero financial surprises."
  }
];

const faqs = [
  {
    q: "I don't even know if I'm ready for this. What if I'm too early?",
    a: "That's actually the best reason to fill this out. You don't need to have everything figured out first. Just answer honestly and the report will tell you exactly where you are and what makes sense as a first step. Being early is a starting point, not a problem."
  },
  {
    q: "I've tried things before and wasted money. How is this different?",
    a: "Most people lose money because they built things before their offer was ready. Pages, funnels, tech — all of it on a foundation that wasn't solid yet. This diagnostic is specifically designed to catch that before it happens. We won't recommend building anything until we know it will actually work."
  },
  {
    q: "What if I fill this out and you just try to sell me something I don't need?",
    a: "If you don't need it, we'll tell you. The report gives you an honest picture of where you are. If the call reveals that what we offer isn't the right fit for your situation, we'll say that out loud. No runaround."
  },
  {
    q: "I can't afford a big investment right now.",
    a: "Good to know before the call, not on it. The report shows you a starting investment range upfront so there are no surprises. And if the timing genuinely isn't right, we would rather say so now than take money that doesn't make sense for where you are."
  },
  {
    q: "I don't have time to build a whole funnel or system.",
    a: "You don't have to build everything at once. The report shows you what to do first and what to leave alone until you're ready. Most people are trying to do too many things at the same time and that's exactly what's slowing them down."
  },
  {
    q: "What if my offer isn't good enough to launch?",
    a: "Then we start there. An offer that isn't ready yet is just a starting point. Knowing that before you spend money on infrastructure is honestly the most valuable thing this diagnostic can give you."
  },
  {
    q: "I've been burned by coaches and agencies before.",
    a: "That's a fair thing to bring to this. We don't promise results we can't control. What we can tell you is that we will always be honest about what you need, we build what we say we will build, and we will tell you when the answer is not yet rather than take your money anyway."
  },
  {
    q: "What actually happens on the call? Is it going to be a sales pitch?",
    a: "No pitch and no pressure. It's thirty minutes where we look at your report together, confirm what it's telling us, and give you a clear picture of what the right next step looks like. Whether that ends up being working together or not, you will leave the call knowing something useful that you didn't know when you got on it."
  }
];

export default function LandingView({ onStart }: LandingViewProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-[#E040FB] selection:text-black">
      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-[#222222]/30">
        <div className="flex items-center -my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/askalliepasag_logo.png"
            alt="ask Allie Pasag Logo"
            className="w-48 md:w-56 h-auto object-contain"
          />
        </div>
        <button
          onClick={onStart}
          className="text-xs uppercase tracking-[0.12em] font-medium text-[#888888] hover:text-white hover:border-[#E040FB]/40 border border-[#222] rounded-full px-4 py-2 transition-all duration-300"
        >
          Find out where you are →
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 md:py-24 text-center flex flex-col items-center justify-center space-y-6">
        {/* Eyebrow */}
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#E040FB] font-semibold bg-[#E040FB]/5 border border-[#E040FB]/10 rounded-full px-4 py-1.5 shadow-sm animate-pulse">
          Free diagnostic for coaches and course creators
        </span>

        {/* Headline */}
        <h1 className="font-serif text-4xl md:text-6xl text-white font-medium leading-tight max-w-3xl">
          Find out exactly where you are and what to build next.
        </h1>

        {/* Subheadline */}
        <p className="text-sm md:text-lg text-[#888888] max-w-xl font-light leading-relaxed">
          Answer 6 questions. Get your personalized high-ticket readiness report instantly.
        </p>

        {/* CTA Block */}
        <div className="pt-4 flex flex-col items-center space-y-3">
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-[#E040FB] text-black font-semibold text-sm rounded border border-[#E040FB] hover:shadow-[0_0_20px_rgba(224,64,251,0.4)] transition-all duration-300 transform active:scale-[0.98]"
          >
            Get my readiness report
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
          </button>
          
          <span className="text-xs text-[#444444] font-light">
            3 minutes. No pitch. No waiting.
          </span>
        </div>
      </main>

      {/* Credibility / Allie Bio Fold */}
      <section className="bg-[#111111] border-t border-b border-[#222222] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex justify-center">
            {/* Elegant bio photo frame */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#E040FB]/10 rounded-lg blur-md group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden border border-[#222] group-hover:border-[#E040FB] bg-[#161616] flex items-center justify-center shadow-2xl transition-all duration-500">
                {/* Visual fallback if allie_.jpeg fails to load */}
                <img
                  src="/allie_.jpeg"
                  alt="Allie Pasag"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'font-serif text-4xl font-semibold text-[#E040FB]';
                      placeholder.innerText = 'AP';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col justify-center space-y-4 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#E040FB] font-medium">
              MEET ALLIE PASAG
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white font-medium">
              &ldquo;Stop guessing what niche or funnel will save you.&rdquo;
            </h2>
            <p className="text-xs md:text-sm text-[#888888] font-light leading-relaxed max-w-2xl">
              I spend my time engineering launch systems, tech stack pipelines, and premium high-ticket sales mechanisms for high-performing coaches and course creators who have real authority but need the operational engine to scale.
            </p>
            <p className="text-xs md:text-sm text-[#888888] font-light leading-relaxed max-w-2xl">
              Most projects stall because creators buy software or build pages for an offer that hasn&rsquo;t actually been diagnosed or positioned. This assessment is the exact framework I use on consultation calls to separate marketing noise from your actual technical bottleneck.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 w-full">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#E040FB] font-semibold">
            WHAT YOU GET
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-white font-medium mt-2">
            No standard templates. Clear, custom strategy.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop, idx) => (
            <div
              key={idx}
              className="bg-[#161616] border border-[#222222] hover:border-[#E040FB]/30 p-6 rounded-md hover:shadow-[0_4px_25px_rgba(224,64,251,0.03)] transition-all duration-300 flex flex-col space-y-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#111] border border-[#222] group-hover:border-[#E040FB]/20 flex items-center justify-center transition-colors duration-300">
                {prop.icon}
              </div>
              <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#E040FB] transition-colors duration-300">
                {prop.title}
              </h3>
              <p className="text-xs text-[#888888] font-light leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-[#111111]/40 border-t border-b border-[#222222]/50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#E040FB] font-semibold">
              FAQ
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white font-medium mt-2">
              Every objection answered. No runaround.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#161616] border border-[#222222] rounded overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between hover:bg-[#1c1c1c] transition-colors duration-300"
                  >
                    <span className="font-serif text-sm md:text-base text-white font-medium pr-4">
                      {faq.q}
                    </span>
                    <span className={`text-[#E040FB] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 border-t border-[#222]/50' : 'max-h-0'
                    }`}
                  >
                    <p className="p-5 text-xs md:text-sm text-[#888888] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Repeat CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center space-y-6">
        <h2 className="font-serif text-2xl md:text-4xl text-white font-medium">
          Ready to diagnose your high-ticket infrastructure?
        </h2>
        <p className="text-xs md:text-sm text-[#888888] max-w-md font-light leading-relaxed">
          Takes less than three minutes to answer. Get immediate answers and direct alignment on your starting requirements.
        </p>
        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-[#E040FB] text-black font-semibold text-sm rounded border border-[#E040FB] hover:shadow-[0_0_20px_rgba(224,64,251,0.4)] transition-all duration-300 transform active:scale-[0.98]"
        >
          Get my readiness report
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#090909] border-t border-[#222222]/30 py-8 text-center text-xs text-[#444444] font-light mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center -my-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/askalliepasag_logo.png"
              alt="ask Allie Pasag Logo"
              className="w-36 md:w-44 h-auto object-contain"
            />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
          <span>&copy; {new Date().getFullYear()} askalliepasag.com. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
