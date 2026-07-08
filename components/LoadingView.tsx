'use client';

import React, { useEffect, useState } from 'react';

interface LoadingStep {
  text: string;
  image: string;
  expression: string;
}

// 3 completely different pools of witty plain-English sequences that cycle randomly on each load
const loadingPools: LoadingStep[][] = [
  // Pool 1: Fun & Conversational
  [
    {
      text: "Grabbing my thinking glasses... Let's see what we're working with here!",
      image: "/allie_cartoon_thinking.png",
      expression: "Pondering your answers"
    },
    {
      text: "Running some quick mental math... Don't worry, the math is totally mathing!",
      image: "/allie_cartoon_calculating.png",
      expression: "Doing some fun arithmetic"
    },
    {
      text: "Aha! I see some truly massive potential in this strategy plan.",
      image: "/allie_cartoon_thinking.png",
      expression: "Lightbulb moment"
    },
    {
      text: "Boom! Adding some final magic sprinkles to your custom report.",
      image: "/allie_cartoon_excited.png",
      expression: "Results are locked and loaded!"
    }
  ],
  // Pool 2: Playful & Enthusiastic
  [
    {
      text: "Warming up my brainstorm engine... This is going to be exciting!",
      image: "/allie_cartoon_thinking.png",
      expression: "Brainstorming active"
    },
    {
      text: "Connecting the dots... I can already see your custom high-ticket plan taking shape!",
      image: "/allie_cartoon_calculating.png",
      expression: "Drawing up the dots"
    },
    {
      text: "Double-checking our secret blueprint parameters... Looks absolutely golden!",
      image: "/allie_cartoon_thinking.png",
      expression: "Double checking parameters"
    },
    {
      text: "Hooray! Your personalized diagnostic is officially hot off the press!",
      image: "/allie_cartoon_excited.png",
      expression: "Success! Revealing results..."
    }
  ],
  // Pool 3: Lighthearted & Encouraging
  [
    {
      text: "Scanning your inputs... Oh, this is a highly interesting setup!",
      image: "/allie_cartoon_thinking.png",
      expression: "Scanning active"
    },
    {
      text: "Crunching some custom numbers... Crunch, crunch, crunch!",
      image: "/allie_cartoon_calculating.png",
      expression: "Abacus mode activated"
    },
    {
      text: "Polishing up a bespoke, custom-tailored checklist just for you...",
      image: "/allie_cartoon_thinking.png",
      expression: "Polishing details"
    },
    {
      text: "Ta-da! Your customized readiness report is fully ready to blow you away!",
      image: "/allie_cartoon_excited.png",
      expression: "All set!"
    }
  ]
];

export default function LoadingView() {
  const [activePool, setActivePool] = useState<LoadingStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Randomly select one of the three witty loading pools on load so it changes every time!
    const randomPool = loadingPools[Math.floor(Math.random() * loadingPools.length)];
    setActivePool(randomPool);

    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < 3) {
          return prev + 1;
        }
        return prev;
      });
    }, 2200); // 4 steps, each lasting exactly 2.2 seconds (8.8s total loading period)

    return () => clearInterval(interval);
  }, []);

  if (activePool.length === 0) {
    return null;
  }

  const currentStep = activePool[stepIndex];

  return (
    <div className="flex-grow w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[75vh] font-sans text-center space-y-6">
      {/* Inline Animation styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-subtle-bob {
          animation: subtleBob 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
      `}} />

      {/* Dynamic Animated Cartoon Avatar */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 animate-subtle-bob flex-shrink-0">
        {/* Soft floating glow ring behind cartoon */}
        <div className="absolute inset-0 rounded-full bg-[#E040FB]/10 blur-xl animate-pulse-glow"></div>
        
        {/* Face Image swapper */}
        <img
          src={currentStep.image}
          alt={`Allie Cartoon: ${currentStep.expression}`}
          className="w-full h-full object-contain rounded-full border border-[#E040FB]/20 relative z-10 transition-all duration-300 transform scale-100 hover:scale-105"
        />

        {/* Playful expression subtitle badge */}
        <div className="absolute -bottom-1 bg-[#111] border border-[#E040FB]/20 text-[#E040FB] font-mono text-[9px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md left-1/2 transform -translate-x-1/2 z-20 whitespace-nowrap">
          {currentStep.expression}
        </div>
      </div>

      {/* Progress Message */}
      <div className="space-y-3 pt-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#E040FB] font-semibold bg-[#E040FB]/5 border border-[#E040FB]/10 rounded-full px-4 py-1">
          Reviewing Your Answers
        </span>
        <h3 className="font-serif text-lg text-white font-medium min-h-[56px] transition-all duration-500 ease-out max-w-sm leading-snug animate-fadeIn">
          {currentStep.text}
        </h3>
      </div>

      {/* Dynamic progress loader bar */}
      <div className="w-56 h-[3px] bg-[#161616] rounded-full overflow-hidden border border-[#222]/30 relative">
        <div
          className="h-full bg-gradient-to-r from-[#E040FB] to-[#ff66ff] transition-all duration-1000 ease-out"
          style={{ width: `${((stepIndex + 1) / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
