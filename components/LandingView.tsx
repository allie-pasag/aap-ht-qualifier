'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';

interface LandingViewProps {
  onStart: () => void;
}

interface ClientType {
  num: string;
  name: string;
  description: string;
  signs: string[];
  imageSrc: string;
}

const CLIENT_TYPES: ClientType[] = [
  {
    num: '01',
    name: 'The Multi-Passionate',
    description: 'Capable of everything, committed to nothing — too many ideas, no single offer.',
    signs: [
      'You launch something new every time inspiration strikes.',
      'Your niche and bio seem to change every few months.',
      'You can do five things well — which is exactly the problem.'
    ],
    imageSrc: '/ct-type-1.jpg'
  },
  {
    num: '02',
    name: 'The Blank Slate',
    description: 'Starting from zero. No offer yet — and nothing to un-build.',
    signs: [
      'You have the skills and credibility, but nothing packaged to sell.',
      'You’re done trading hours for money, unsure what to build instead.',
      'Every “start here” guide assumes you already have an offer.'
    ],
    imageSrc: '/ct-type-2.jpg'
  },
  {
    num: '03',
    name: 'The Flatliner',
    description: 'The offer exists. It just isn’t converting — usually a positioning problem, not a product one.',
    signs: [
      'People say “this sounds amazing” — then never buy.',
      'Your discovery calls feel good but rarely close.',
      'You’ve rebuilt the funnel a dozen times and nothing moves.'
    ],
    imageSrc: '/ct-type-3.jpg'
  },
  {
    num: '04',
    name: 'The Outgrower',
    description: 'It converts, but it no longer fits who you’ve become.',
    signs: [
      'You’ve quietly outgrown the offer that still pays the bills.',
      'You dread delivering the thing people keep buying.',
      'Your dream clients aren’t the ones you’re attracting.'
    ],
    imageSrc: '/ct-type-4.jpg'
  },
  {
    num: '05',
    name: 'The Invisible Expert',
    description: 'Real authority, but the offer hides it — you can’t yet say it in one sentence.',
    signs: [
      'Clients trust you, but can’t explain what you actually do.',
      'Your results are far stronger than your messaging.',
      'You lose deals to louder experts who know less.'
    ],
    imageSrc: '/ct-type-5.jpg'
  }
];

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "I don't even know if I'm ready for this. What if I'm too early?",
    a: "There's no such thing as too early — the whole point is to find out exactly where you are. If you're at the foundation stage, the report tells you that plainly, and what to do first. No wasted steps."
  },
  {
    q: "I've tried things before and wasted money. How is this different?",
    a: "Most programs sell you a template and hope it fits. This starts by diagnosing your actual situation before anyone recommends a thing — so you're not paying to solve the wrong problem."
  },
  {
    q: "What if I fill this out and you just try to sell me something I don't need?",
    a: "The report is genuinely useful on its own. If a call makes sense for your situation it'll say so, and if it doesn't, it'll say that too. No pressure, no bait."
  },
  {
    q: "I can't afford a big investment right now.",
    a: "Then this is exactly where to start — it's free, and it gives you a clear starting price anchor so there are no surprises. You'll know what a next step actually costs before you ever commit."
  },
  {
    q: "I don't have time to build a whole funnel or system.",
    a: "Good — because building a funnel before you've diagnosed the offer is how time gets wasted. This takes three minutes and tells you whether a funnel is even your real bottleneck."
  },
  {
    q: "What if my offer isn't good enough to launch?",
    a: "That's a diagnosis, not a verdict. The report names which of the 5 Client Types you are and what specifically needs to change — often it's positioning, not the offer itself."
  },
  {
    q: "I've been burned by coaches and agencies before.",
    a: "Fair. This is built to give you clarity you can act on with or without Allie — the value isn't gated behind a call. You leave with a real read either way."
  },
  {
    q: 'What actually happens on the call? Is it going to be a sales pitch?',
    a: "It's a working session, not a pitch. You bring your result, Allie maps your offer against it, and you leave with a plan — whether or not you work together."
  }
];

export default function LandingView({ onStart }: LandingViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const carouselTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-play interval effect for carousel
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    carouselTimer.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CLIENT_TYPES.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (carouselTimer.current) {
      clearInterval(carouselTimer.current);
    }
  };

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    startAutoPlay(); // Reset timer on manual click
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CLIENT_TYPES.length) % CLIENT_TYPES.length);
    startAutoPlay();
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CLIENT_TYPES.length);
    startAutoPlay();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative bg-[#15110E] min-h-screen overflow-hidden selection:bg-[#EC5FB4]/30 selection:text-white">
      
      {/* Dynamic Style overrides for responsive pixel-faithful layout scaling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .hero-lead {
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: clamp(11px, 1.28vw, 15px);
          line-height: 1.4;
          color: #C6BAAC;
          font-weight: 400;
          margin-bottom: 0.55em;
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          font-size: clamp(28px, 5.7vw, 70px);
          line-height: 0.98;
          letter-spacing: -0.015em;
          color: #F6F0E8;
          margin: 0.35em 0 0;
        }
        .hero-sub {
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: clamp(11px, 1.42vw, 17px);
          line-height: 1.55;
          color: #C6BAAC;
          margin: 0.9em 0 0;
          font-weight: 300;
        }
        .hero-cta {
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: clamp(11px, 1.28vw, 16px);
          font-weight: 600;
          color: #1A140F;
          letter-spacing: 0.01em;
          padding: 1.05em 2.4em;
        }
        .hero-result-m {
          display: none;
        }
        .hero-img {
          transition: transform .35s ease;
        }
        @media (max-width: 1024px) {
          .hero {
            min-height: auto !important;
            align-items: flex-start !important;
            flex-direction: column !important;
          }
          .hero-img {
            transform: translateX(9%) scale(1.04);
            transform-origin: center;
          }
          .hero-copy {
            width: 42% !important;
            left: 4.5% !important;
          }
          .hero-result {
            display: none !important;
          }
          .hero-result-m {
            display: block !important;
          }
        }
        @media (max-width: 760px) {
          .hero-img {
            transform: translateX(16%) scale(1.1);
          }
          .hero-copy {
            width: 48% !important;
            left: 4.5% !important;
          }
          .hero-h1 {
            font-size: clamp(15px, 4.7vw, 30px) !important;
          }
          .hero-lead {
            font-size: clamp(9px, 2vw, 13px) !important;
          }
          .hero-sub {
            font-size: clamp(9px, 2vw, 13px) !important;
          }
          .hero-cta {
            font-size: clamp(9px, 2.1vw, 13px) !important;
            padding: 0.9em 1.6em !important;
          }
        }
        @media (max-width: 480px) {
          .hero-img {
            transform: translateX(23%) scale(1.16);
          }
          .hero-copy {
            width: 55% !important;
          }
        }
        @media (max-width: 820px) {
          .allie-grid {
            grid-template-columns: 1fr !important;
          }
          .allie-media {
            order: 1 !important;
            margin-bottom: 28px !important;
            max-width: 360px;
          }
          .allie-text {
            order: 2 !important;
          }
          .ct-slide {
            grid-template-columns: 1fr !important;
          }
          .ct-imgcell {
            min-height: 440px !important;
          }
          .ct-textcell {
            padding: 34px 28px !important;
          }
          .get-grid {
            grid-template-columns: 1fr !important;
          }
          .how-grid {
            grid-template-columns: 1fr !important;
          }
          .how-col {
            padding: 24px 0 !important;
            border-left: none !important;
            border-top: 1px solid rgba(233,224,212,0.10) !important;
          }
        }
      `}</style>

      {/* ===== AMBIENT SILK / GLOW FIELD ===== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-320px] right-[-140px] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,95,180,0.22),transparent_62%)] filter blur-[20px] float-silk-1"></div>
        <div className="absolute top-[520px] left-[-260px] w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(58,50,42,0.55),transparent_60%)] filter blur-[30px] float-silk-2"></div>
        <div className="absolute top-[1500px] right-[-200px] w-[820px] h-[820px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,95,180,0.12),transparent_60%)] filter blur-[34px] float-silk-3"></div>
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_74%_-6%,rgba(236,95,180,0.10),transparent_60%),radial-gradient(1000px_800px_at_8%_46%,rgba(255,255,255,0.025),transparent_55%)]"></div>
      </div>

      {/* ===== FAINT FILM GRAIN OVERLAY ===== */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}></div>

      <div className="relative z-20 max-w-[1140px] mx-auto px-6 md:px-10">

        {/* ===== TOP BANNER ===== */}
        <div className="relative w-screen left-1/2 ml-[-50vw] bg-[#EC5FB4] md:bg-black border-b border-white/10 md:border-luxe-cream/10 transition-colors duration-300">
          <div className="max-w-[1140px] mx-auto px-6 md:px-10 py-[18px] flex flex-wrap items-center justify-center gap-4 text-center">
            <span className="font-sans text-[13px] tracking-[0.22em] uppercase text-black md:text-[#EC5FB4] font-bold">
              For coaches &amp; course creators
            </span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-luxe-cream/30"></span>
            <span className="font-sans text-[15.5px] text-black md:text-white font-semibold md:font-light">
              You’ve got the audience and the authority — now make the offer prove it.
            </span>
          </div>
        </div>

        {/* ===== HERO SECTION (Minimalist Black Canvas & Headline in Black background container) ===== */}
        <header className="hero relative w-screen left-1/2 ml-[-50vw] bg-black py-16 sm:py-24 md:py-32 flex items-center justify-center border-b border-white/5">
          <div className="max-w-[1140px] mx-auto px-6 md:px-10 w-full flex flex-col items-center justify-center text-center space-y-6">
            
            <span className="hidden md:block font-serif tracking-[0.25em] uppercase text-xs sm:text-sm text-[#8A7F73] font-semibold">
              Allie Pasag Hero Landscape
            </span>

            <div className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-[#EC5FB4] font-medium tracking-wide leading-relaxed max-w-2xl">
              Still guessing which niche, funnel, or price will finally click?
            </div>

            {/* Headline wrapped in black background highlight */}
            <div className="bg-black px-4 py-2 rounded-lg">
              <h1 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight max-w-3xl mx-auto">
                Find out exactly where you <span className="font-serif italic font-normal text-[#EC5FB4]">are</span> — and what to fix first.
              </h1>
            </div>

            <p className="font-sans text-sm sm:text-base md:text-lg text-[#C6BAAC] font-light leading-relaxed max-w-2xl mx-auto">
              Answer 6 questions. Get a personalized high-ticket readiness report — instantly.
            </p>

            <div className="pt-6">
              <button
                onClick={onStart}
                className="hero-cta inline-block text-[#1A140F] bg-gradient-to-br from-[#FF92D5] via-[#EC5FB4] to-[#A82B67] rounded-full tracking-wide shadow-[0_14px_44px_rgba(236,95,180,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-sm sm:text-base font-semibold px-8 py-4"
              >
                Start the assessment &rarr;
              </button>
            </div>

          </div>
        </header>

        {/* ===== NEW SECTION: DIAGNOSTIC SAMPLE (IMAGE LEFT, TEXT RIGHT) WITH HERO BACKGROUND ===== */}
        <section className="relative w-screen left-1/2 ml-[-50vw] bg-[#140F0C] border-b border-luxe-cream/10 py-20 overflow-hidden z-20">
          {/* Ambient Glows from the original hero background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-320px] right-[-140px] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,95,180,0.15),transparent_62%)] filter blur-[20px]"></div>
            <div className="absolute top-[520px] left-[-260px] w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(58,50,42,0.40),transparent_60%)] filter blur-[30px]"></div>
          </div>

          <div className="relative z-10 max-w-[1140px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Image of the one (Allie landscape) */}
              <div className="lg:col-span-6 w-full">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/40">
                  <img 
                    src="/hero-allie.png" 
                    alt="Allie Pasag Hero Landscape" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Diagnostic Text */}
              <div className="lg:col-span-6 text-left flex flex-col justify-center space-y-4">
                <div className="inline-block font-sans text-[10px] tracking-[0.24em] uppercase text-[#EC5FB4] font-bold border border-[#EC5FB4]/30 rounded-full px-4 py-1.5 w-fit bg-[#EC5FB4]/5">
                  Your Diagnosis Preview
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl lg:text-[32px] leading-[1.22] text-white">
                  Good news, Sam — you have a <span className="font-serif italic text-[#EC5FB4]">great offer.</span> Bad news — <span className="font-serif italic text-[#EC5FB4]">nobody can tell</span> yet what it is.
                </h3>
                <div className="h-[1px] bg-white/10 my-4 w-full"></div>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#C6BAAC] font-light">
                  Clear beats clever. Every time. Most founders build complex funnels and niche down endlessly, but if people can't grasp your high-ticket offer in one simple sentence, none of it clicks.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ===== SECTION 2: HOW IT WORKS ===== */}
        <section className="py-[100px] border-b border-luxe-cream/10 text-center relative z-20">
          <div className="font-sans text-xs tracking-[0.24em] uppercase text-rose-glow font-semibold">
            How it works
          </div>
          <h2 className="font-serif font-medium text-[44px] md:text-[52px] leading-[1.05] text-luxe-white mt-3.5">
            Three minutes to <span className="font-serif italic text-rose-glow">real clarity.</span>
          </h2>
          <div className="how-grid grid grid-cols-1 md:grid-cols-3 gap-0 mt-[60px] text-left">
            
            <div className="how-col pr-0 md:pr-[34px] py-4 md:py-0">
              <div className="font-serif italic text-[40px] text-rose-glow leading-none">01</div>
              <div className="font-sans font-semibold text-lg md:text-xl text-luxe-white mt-4">
                Answer 6 questions
              </div>
              <p className="font-sans text-sm md:text-[14.5px] leading-relaxed text-taupe font-light mt-2">
                Honest, plain-language questions about where your offer really stands. No forms, no fluff.
              </p>
            </div>

            <div className="how-col px-0 md:px-[34px] py-4 md:py-0 border-t md:border-t-0 md:border-l border-luxe-cream/10">
              <div className="font-serif italic text-[40px] text-rose-glow leading-none">02</div>
              <div className="font-sans font-semibold text-lg md:text-xl text-luxe-white mt-4">
                Get matched to your type
              </div>
              <p className="font-sans text-sm md:text-[14.5px] leading-relaxed text-taupe font-light mt-2">
                We name which of the 5 Client Types you are and score your high-ticket readiness.
              </p>
            </div>

            <div className="how-col pl-0 md:pl-[34px] py-4 md:py-0 border-t md:border-t-0 md:border-l border-luxe-cream/10">
              <div className="font-serif italic text-[40px] text-rose-glow leading-none">03</div>
              <div className="font-sans font-semibold text-lg md:text-xl text-luxe-white mt-4">
                See what to fix first
              </div>
              <p className="font-sans text-sm md:text-[14.5px] leading-relaxed text-taupe font-light mt-2">
                The exact moves for your situation — and where a call fits in.
              </p>
            </div>

          </div>
        </section>

        {/* ===== SECTION 3: MEET ALLIE PASAG (FULL-BLEED WHITE) ===== */}
        <section className="relative w-screen left-1/2 ml-[-50vw] bg-white border-b border-black/10 z-20">
          <div className="max-w-[1140px] mx-auto px-6 md:px-10 py-24">
            <div className="allie-grid grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-14 items-center">
              
              {/* Portrait Image Column */}
              <div className="allie-media relative self-center">
                <div className="absolute inset-[-18px] bg-[radial-gradient(circle_at_40%_30%,rgba(236,95,180,0.26),transparent_66%)] filter blur-3xl z-0"></div>
                <div className="relative z-10 aspect-[3/4] rounded-lg overflow-hidden border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                  <img 
                    src="/portrait-warm.png" 
                    alt="Allie Pasag Consulting portrait" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              {/* Text / Quote Column */}
              <div className="allie-text flex flex-col justify-center">
                <div className="allie-eyebrow font-sans text-xs tracking-[0.24em] uppercase text-[#EC5FB4] font-semibold mb-3.5">
                  Meet Allie Pasag
                </div>
                <blockquote className="font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-dark-ink max-w-[20ch] m-0 mb-4.5">
                  “Stop guessing what niche or funnel will <span className="font-serif italic text-[#EC5FB4]">save you.</span>”
                </blockquote>
                <p className="font-sans text-base md:text-[16.5px] leading-relaxed text-dark-body font-light mb-4 max-w-[56ch]">
                  I build offers that sell themselves — the launch systems, positioning, and high-ticket sales mechanics for coaches and course creators who have real authority but need the engine to scale.
                </p>
                <p className="font-sans text-base md:text-[16.5px] leading-relaxed text-dark-body font-light mb-4.5 max-w-[56ch]">
                  Most offers stall because they were never actually diagnosed or positioned. This assessment is the exact framework I use on consultation calls — it separates the marketing noise from your real bottleneck.
                </p>
                <div className="mt-8">
                  <div className="inline-flex flex-col items-center">
                    <button
                      onClick={onStart}
                      className="inline-block font-sans text-sm md:text-[15px] font-semibold text-dark-ink bg-gradient-to-br from-[#FF92D5] via-rose-glow to-[#A82B67] rounded-full px-8 py-3.5 tracking-wide shadow-[0_12px_34px_rgba(236,95,180,0.26)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                    >
                      Put my offer under the microscope &rarr;
                    </button>
                    <div className="font-sans text-[13px] md:text-sm leading-relaxed text-[#8A7F73] italic mt-3 text-center">
                      It’s free, it’s fast, and Allie won’t sugarcoat it.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== SECTION 4: WHAT YOU GET ===== */}
        <section className="py-[100px] border-b border-luxe-cream/10 text-center relative z-20">
          <div className="font-sans text-xs tracking-[0.24em] uppercase text-rose-glow font-semibold">
            What you get
          </div>
          <h2 className="font-serif font-medium text-[44px] md:text-[52px] leading-[1.05] text-luxe-white mt-3.5">
            No standard templates. <span className="font-serif italic text-rose-glow">Clear, custom strategy.</span>
          </h2>
          
          <div className="get-grid grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-14 text-left">
            
            {/* Card 1: Diagnostic Clarity */}
            <div className="group bg-espresso border border-luxe-cream/10 rounded-lg p-9 transition-all duration-300 hover:border-rose-glow/40 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-rose-glow/[0.12] hover:to-espresso hover:shadow-[0_20px_60px_rgba(236,95,180,0.12)]">
              <div className="w-[46px] h-[46px] rounded-full bg-rose-glow/10 border border-rose-glow/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-rose-glow/20 group-hover:border-rose-glow/40 group-hover:scale-105">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#EC5FB4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h3 className="font-serif font-medium text-2xl lg:text-[27px] leading-tight text-luxe-white transition-colors duration-300 group-hover:text-white">
                Diagnostic clarity
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-taupe font-light mt-3 transition-colors duration-300 group-hover:text-[#C9BEB0]">
                Know exactly which of the 5 Client Types you are — and what's actually slowing your sales down.
              </p>
            </div>

            {/* Card 2: Personalized Read (HIGHLIGHTED GRID) */}
            <div className="group bg-gradient-to-br from-rose-glow/20 to-espresso border border-rose-glow/32 rounded-lg p-9 shadow-[0_20px_60px_rgba(236,95,180,0.12)] transition-all duration-300 hover:border-rose-glow/50 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(236,95,180,0.18)]">
              <div className="w-[46px] h-[46px] rounded-full bg-rose-glow/20 border border-rose-glow/44 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-rose-glow/30 group-hover:border-rose-glow/60 group-hover:scale-105">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#EC5FB4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                  <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>
                </svg>
              </div>
              <h3 className="font-serif font-medium text-2xl lg:text-[27px] leading-tight text-white transition-colors duration-300">
                Personalized read
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-[#C9BEB0] font-light mt-3 transition-colors duration-300 group-hover:text-white">
                No templated results. Get a situation summary and direct, honest feedback written on Allie's strategy rules.
              </p>
            </div>

            {/* Card 3: Pre-framed Pricing */}
            <div className="group bg-espresso border border-luxe-cream/10 rounded-lg p-9 transition-all duration-300 hover:border-rose-glow/40 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-rose-glow/[0.12] hover:to-espresso hover:shadow-[0_20px_60px_rgba(236,95,180,0.12)]">
              <div className="w-[46px] h-[46px] rounded-full bg-rose-glow/10 border border-rose-glow/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-rose-glow/20 group-hover:border-rose-glow/40 group-hover:scale-105">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#EC5FB4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="font-serif font-medium text-2xl lg:text-[27px] leading-tight text-luxe-white transition-colors duration-300 group-hover:text-white">
                Pre-framed pricing
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-taupe font-light mt-3 transition-colors duration-300 group-hover:text-[#C9BEB0]">
                See a clear starting price anchor matched to your situation before booking — zero financial surprises.
              </p>
            </div>

          </div>
        </section>

        {/* ===== SECTION 5: THE 5 CLIENT TYPES CAROUSEL (FULL-BLEED WHITE) ===== */}
        <section className="relative w-screen left-1/2 ml-[-50vw] bg-white border-t border-b border-black/5 z-20">
          <div className="max-w-[1140px] mx-auto px-6 md:px-10 py-24">
            
            <div className="text-center max-w-[640px] mx-auto mb-11">
              <div className="font-sans text-xs tracking-[0.24em] uppercase text-rose-glow font-semibold">
                The 5 Client Types
              </div>
              <h2 className="font-serif font-medium text-[42px] md:text-[50px] leading-[1.06] text-dark-ink mt-3.5">
                Every founder lands on <span className="font-serif italic text-rose-glow">one of five.</span>
              </h2>
            </div>

            {/* Carousel Frame */}
            <div className="relative overflow-hidden border border-luxe-cream/12 rounded-[14px] bg-espresso shadow-xl max-w-5xl mx-auto">
              
              {/* Slide Track */}
              <div 
                className="flex transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {CLIENT_TYPES.map((type, idx) => (
                  <div 
                    key={idx} 
                    className="ct-slide flex-shrink-0 w-full grid grid-cols-[1.05fr_0.95fr] items-stretch text-left"
                  >
                    
                    {/* Image Cell */}
                    <div className="ct-imgcell relative min-h-[460px] bg-[#140F0C] overflow-hidden">
                      <img 
                        src={type.imageSrc} 
                        alt={`${type.name} Portrait`} 
                        className="absolute inset-0 w-full h-full object-cover object-center" 
                      />
                    </div>

                    {/* Text / Copy Cell */}
                    <div className="ct-textcell p-10 md:p-14 flex flex-col justify-center text-left">
                      <div className="font-serif italic text-[52px] text-rose-glow leading-none select-none">
                        {type.num}
                      </div>
                      <h3 className="font-serif font-medium text-3xl md:text-[38px] leading-[1.06] text-luxe-white mt-4">
                        {type.name}
                      </h3>
                      <p className="font-sans text-base md:text-[17px] leading-relaxed text-taupe font-light mt-4 max-w-[44ch]">
                        {type.description}
                      </p>
                      
                      {/* Checkbox Checklist */}
                      <div className="mt-6 flex flex-col gap-2.5">
                        <div className="font-sans text-[11px] tracking-[0.18em] uppercase text-ash font-bold">
                          You’ll recognize yourself if
                        </div>
                        {type.signs.map((sign, sIdx) => (
                          <div key={sIdx} className="flex gap-3 items-start text-left">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-glow mt-2 flex-shrink-0"></div>
                            <span className="font-sans text-sm md:text-[15px] leading-relaxed text-taupe font-light text-left">
                              {sign}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Navigation Overlay Arrows */}
              <button 
                onClick={handlePrevSlide} 
                aria-label="Previous Slide" 
                className="absolute top-1/2 left-[18px] -translate-y-1/2 w-11 h-11 rounded-full bg-[#140F0C]/60 hover:bg-[#140F0C]/85 backdrop-blur-sm border border-luxe-cream/18 text-luxe-white text-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-rose-glow focus:outline-none focus:ring-1 focus:ring-rose-glow"
              >
                &lsaquo;
              </button>
              <button 
                onClick={handleNextSlide} 
                aria-label="Next Slide" 
                className="absolute top-1/2 right-[18px] -translate-y-1/2 w-11 h-11 rounded-full bg-[#140F0C]/60 hover:bg-[#140F0C]/85 backdrop-blur-sm border border-luxe-cream/18 text-luxe-white text-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-rose-glow focus:outline-none focus:ring-1 focus:ring-rose-glow"
              >
                &rsaquo;
              </button>

            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2.5 justify-center items-center mt-6.5 flex-wrap">
              {CLIENT_TYPES.map((_, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button 
                    key={idx} 
                    onClick={() => handleSlideChange(idx)} 
                    aria-label={`Go to slide ${idx + 1}`} 
                    className="p-2 bg-transparent border-none cursor-pointer flex items-center focus:outline-none"
                  >
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'w-[30px] bg-rose-glow' : 'w-1.5 bg-black/20 hover:bg-black/40'
                      }`}
                    ></div>
                  </button>
                );
              })}
            </div>

            <p className="text-center font-sans text-base md:text-[16.5px] leading-relaxed text-dark-body font-light max-w-[52ch] mx-auto mt-10">
              The quiz won’t tell you which one you are — that part’s on you. Read each type, find the one that sounds like where you’re stuck right now, then take the assessment to see <span className="font-sans font-normal text-dark-ink">what to fix first.</span>
            </p>
            
            <div className="text-center mt-[30px] relative z-20">
              <button
                onClick={onStart}
                className="inline-block font-sans text-sm md:text-base font-semibold text-dark-ink bg-gradient-to-br from-[#FF92D5] via-rose-glow to-[#A82B67] rounded-full px-10 py-4 tracking-wide shadow-[0_14px_40px_rgba(236,95,180,0.26)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                Find out what to fix first &rarr;
              </button>
              <div className="font-sans text-[13px] md:text-sm leading-relaxed text-[#8A7F73] font-light mt-3 max-w-[46ch] mx-auto">
                Or… stay right where you are and keep your audience guessing. Your call.
              </div>
            </div>

          </div>
        </section>

        {/* ===== SECTION 6: FAQ ACCORDION (DARK BG) ===== */}
        <section className="py-[100px] border-b border-luxe-cream/10 relative z-20">
          <div className="text-center">
            <div className="font-sans text-xs tracking-[0.24em] uppercase text-rose-glow font-semibold">
              FAQ
            </div>
            <h2 className="font-serif font-medium text-[44px] md:text-[52px] leading-[1.05] text-luxe-white mt-3.5">
              Every objection answered. <span className="font-serif italic text-rose-glow">No runaround.</span>
            </h2>
          </div>

          <div className="max-w-[840px] mx-auto mt-[52px] flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = idx === openFaq;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'bg-gradient-to-br from-rose-glow/[0.12] to-espresso border-rose-glow/40 shadow-[0_15px_45px_rgba(236,95,180,0.08)]' 
                      : 'bg-espresso border-luxe-cream/10 hover:border-luxe-cream/20'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)} 
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-5 text-left bg-transparent border-none cursor-pointer p-[22px_26px] focus:outline-none focus:ring-1 focus:ring-rose-glow"
                  >
                    <span className={`font-serif text-lg md:text-[21px] leading-snug transition-colors duration-300 ${
                      isOpen ? 'text-white font-semibold' : 'text-luxe-white'
                    }`}>
                      {item.q}
                    </span>
                    <span 
                      className="text-2xl text-rose-glow flex-shrink-0 transition-transform duration-250 leading-none select-none"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className={`font-sans text-sm md:text-[15.5px] leading-relaxed font-light px-[26px] pb-6 max-w-[64ch] transition-colors duration-300 ${
                      isOpen ? 'text-luxe-cream' : 'text-taupe'
                    }`}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== SECTION 7: FINAL CTA (DARK BG) ===== */}
        <section className="py-[120px] pb-[108px] text-center relative z-20">
          <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[60px] leading-[1.04] text-luxe-white max-w-[20ch] mx-auto">
            Ready to see what’s really <span className="font-serif italic text-rose-glow">holding your offer back?</span>
          </h2>
          <p className="font-sans text-base md:text-[17px] leading-relaxed text-taupe font-light max-w-[44ch] mx-auto mt-5.5">
            Takes less than three minutes. Answer 6 questions and get an honest read on where your offer really stands.
          </p>
          <div className="mt-14 md:mt-16">
            <button
              onClick={onStart}
              className="inline-block font-sans text-sm md:text-base font-semibold text-dark-ink bg-gradient-to-br from-[#FF92D5] via-rose-glow to-[#A82B67] rounded-full px-10 py-4.5 tracking-wide shadow-[0_14px_44px_rgba(236,95,180,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              Get my readiness report &rarr;
            </button>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="py-11 pb-15 flex flex-wrap items-center justify-between gap-6 border-t border-luxe-cream/10 relative z-20">
          <div className="flex items-baseline gap-3 select-none">
            <span className="font-script font-normal text-[46px] leading-none text-rose-glow">
              ask
            </span>
            <span className="font-serif tracking-[0.3em] uppercase text-sm text-taupe">
              Allie Pasag
            </span>
          </div>
          
          <div className="font-sans text-xs tracking-wide text-ash">
            &copy; {new Date().getFullYear()} askalliepasag.com · All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  );
}
