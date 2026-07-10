'use client';

import React, { useState, useEffect } from 'react';
import { QuizAnswers } from '../lib/quizLogic';

const COMPANION_DATA: Record<StepId, { text: string; avatar: string; delay: number }> = {
  identity: {
    text: "Before we write a single line of code, we must understand the vision of the leader driving it. Introducing yourself below allows us to customize every single architectural recommendation specifically for your brand, target audience, and current scale.",
    avatar: "/allie_cartoon.png",
    delay: 500
  },
  situation: {
    text: "Establishing your starting point is critical because your client acquisition engine must fit your business model. If we are choosing a direction, we focus on validation; if we are packaging your skills, we focus on authority; and if we are scaling, we focus on automation.",
    avatar: "/allie_cartoon_thinking.png",
    delay: 500
  },
  most_money: {
    text: "It's easy to get overwhelmed when you have multiple talents. We want to identify where the market has already given you commercial validation—doubling down on what has already made money is the fastest, lowest-risk way to scale.",
    avatar: "/allie_cartoon_calculating.png",
    delay: 500
  },
  solved_for_someone: {
    text: "You don't need a massive team or a hundred case studies to command premium prices. Knowing if you've delivered results for at least one person tells us if we need to run a high-ticket pilot program first, or if you're ready for an automated high-ticket funnel.",
    avatar: "/allie_cartoon_answer.png",
    delay: 500
  },
  converting: {
    text: "Sporadic sales are often built on manual hustle, which isn't scalable. Knowing how your sales convert today tells us whether we should build automated conversion assets to free up your calendar, or if we need to optimize your underlying sales messaging.",
    avatar: "/allie_cartoon_calculating.png",
    delay: 500
  },
  infrastructure: {
    text: "We need to look at your existing digital 'engine room'. Knowing if you have functional assets live right now helps us determine if we can salvage and optimize your current pages, or if we should set up a completely fresh, high-ticket system from scratch.",
    avatar: "/allie_cartoon_answer.png",
    delay: 500
  },
  new_or_improve: {
    text: "Since your current system is already generating results, we treat it with absolute care. We need to decide if we should audit and optimize your active setup to plug any conversion leaks, or construct a parallel high-ticket acquisition channel.",
    avatar: "/allie_cartoon_excited.png",
    delay: 500
  },
  drill_down: {
    text: "Tearing down working tech is a waste of time and money. By letting us know what tech you already use, we can map out a seamless system integration that leverages your existing tools and minimizes manual administrative tasks.",
    avatar: "/allie_cartoon_thinking.png",
    delay: 500
  },
  urgency: {
    text: "Your launch timeline dictates our entire engineering sequence. A tight window means we prioritize building and deploying your high-ticket validation core first, while a wider timeline allows us to construct a fully optimized, comprehensive acquisition system.",
    avatar: "/allie_cartoon_timeline.png",
    delay: 500
  }
};

interface QuizFormProps {
  answers: QuizAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<QuizAnswers>>;
  onSubmit: () => void;
  // Callback to update active phase index in parent so the Sidebar updates
  onPhaseChange: (index: number) => void;
}

type StepId = 'identity' | 'situation' | 'most_money' | 'solved_for_someone' | 'converting' | 'infrastructure' | 'new_or_improve' | 'drill_down' | 'urgency';

export default function QuizForm({ answers, setAnswers, onSubmit, onPhaseChange }: QuizFormProps) {
  const [currentStep, setCurrentStep] = useState<StepId>('identity');
  const [stepHistory, setStepHistory] = useState<StepId[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Floating companion states
  const [isMinimized, setIsMinimized] = useState(false);
  const [typedText, setSpeechText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isMinimized) return;

    setSpeechText("");
    setIsTyping(true);

    const stepData = COMPANION_DATA[currentStep];
    if (!stepData) return;

    let index = 0;
    const fullText = stepData.text;
    
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setSpeechText((prev) => prev + fullText.charAt(index));
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20);

      return () => clearInterval(interval);
    }, stepData.delay);

    return () => {
      clearTimeout(startDelay);
    };
  }, [currentStep, isMinimized]);

  // Helper to update answers
  const updateAnswer = (key: keyof QuizAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    // Clear errors when user types or makes selection
    if (errors[key]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  // Phase index getter based on stepId
  const getPhaseIndex = (step: StepId): number => {
    switch (step) {
      case 'identity': return 0;
      case 'situation': return 1;
      case 'most_money':
      case 'solved_for_someone': return 2;
      case 'converting':
      case 'infrastructure':
      case 'new_or_improve': return 3;
      case 'drill_down': return 4;
      case 'urgency': return 5;
      default: return 0;
    }
  };

  // Transition helper with history tracking and phase updates
  const transitionTo = (nextStep: StepId) => {
    setStepHistory(prev => [...prev, currentStep]);
    setCurrentStep(nextStep);
    onPhaseChange(getPhaseIndex(nextStep));
  };

  // Back button helper
  const handleBack = () => {
    if (stepHistory.length === 0) return;
    const historyCopy = [...stepHistory];
    const prevStep = historyCopy.pop() as StepId;
    setStepHistory(historyCopy);
    setCurrentStep(prevStep);
    onPhaseChange(getPhaseIndex(prevStep));
  };

  // Check if an answer has been selected for the current step to enable forward navigation
  const hasAnswerSelected = (): boolean => {
    switch (currentStep) {
      case 'identity':
        return !!(answers.first_name?.trim() && answers.last_name?.trim() && answers.email?.trim());
      case 'situation':
        return !!answers.offer_status;
      case 'most_money':
        return !!answers.most_money;
      case 'solved_for_someone':
        return !!answers.solved_for_someone;
      case 'converting':
        return !!answers.converting;
      case 'infrastructure':
        return !!answers.infrastructure;
      case 'new_or_improve':
        return !!answers.new_or_improve;
      case 'drill_down':
        return !!(answers.what_they_have && answers.what_they_have.length > 0);
      default:
        return false;
    }
  };

  // Universal Forward Navigation Handler
  const handleNext = () => {
    switch (currentStep) {
      case 'identity':
        handleIdentitySubmit(new Event('submit') as any);
        break;
      case 'situation':
        if (answers.offer_status) {
          if (answers.offer_status === 'multiple_ideas') {
            transitionTo('most_money');
          } else if (answers.offer_status === 'one_skill') {
            transitionTo('solved_for_someone');
          } else {
            transitionTo('converting');
          }
        }
        break;
      case 'most_money':
        if (answers.most_money) {
          transitionTo('drill_down');
        }
        break;
      case 'solved_for_someone':
        if (answers.solved_for_someone) {
          if (answers.solved_for_someone === 'yes_paid') {
            transitionTo('converting');
          } else {
            transitionTo('drill_down');
          }
        }
        break;
      case 'converting':
        if (answers.converting) {
          transitionTo('infrastructure');
        }
        break;
      case 'infrastructure':
        if (answers.infrastructure) {
          if (answers.converting === 'yes' && (answers.infrastructure === 'working' || answers.infrastructure === 'needs_improvement')) {
            transitionTo('new_or_improve');
          } else {
            transitionTo('drill_down');
          }
        }
        break;
      case 'new_or_improve':
        if (answers.new_or_improve) {
          transitionTo('drill_down');
        }
        break;
      case 'drill_down':
        handleDrillDownSubmit();
        break;
      default:
        break;
    }
  };

  // Reusable unified navigation row positioned tightly below options/inputs
  const renderNavigation = () => {
    if (currentStep === 'identity') return null;

    const isNextDisabled = !hasAnswerSelected();

    return (
      <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-[#222222]/20 w-full animate-fadeIn">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="px-5 py-2.5 bg-transparent text-[#888888] hover:text-white font-medium text-xs rounded border border-[#222222] hover:border-[#444444] transition-all duration-300 flex items-center space-x-1"
        >
          <span>← Back</span>
        </button>

        {/* Continue Button */}
        {currentStep !== 'urgency' && (
          <button
            type="button"
            disabled={isNextDisabled}
            onClick={handleNext}
            className={`px-8 py-2.5 font-semibold text-xs rounded border transition-all duration-300 flex items-center space-x-1.5 ${
              isNextDisabled
                ? 'bg-[#161616] text-[#444444] border-[#222222] cursor-not-allowed'
                : 'bg-[#E040FB] text-black border-[#E040FB] hover:shadow-[0_0_15px_rgba(224,64,251,0.3)]'
            }`}
          >
            <span>Continue →</span>
          </button>
        )}
      </div>
    );
  };

  // Step 1: Validation and submission
  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!answers.first_name?.trim()) newErrors.first_name = 'First name is required';
    if (!answers.last_name?.trim()) newErrors.last_name = 'Last name is required';
    if (!answers.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    transitionTo('situation');
  };

  // Step 2: Handle routing based on situation choice
  const handleSituationSelect = (value: 'multiple_ideas' | 'one_skill' | 'has_offer') => {
    updateAnswer('offer_status', value);
    if (value === 'multiple_ideas') {
      transitionTo('most_money');
    } else if (value === 'one_skill') {
      transitionTo('solved_for_someone');
    } else {
      // has_offer goes straight to Step 3
      transitionTo('converting');
    }
  };

  // Step 2A: Handle routing from most_money
  const handleMostMoneySelect = (value: 'one_money' | 'all_similar' | 'none' | 'same_skill') => {
    updateAnswer('most_money', value);
    // Directly skips to drill down (Step 5)
    transitionTo('drill_down');
  };

  // Step 2B: Handle routing from solved_for_someone
  const handleSolvedForSomeoneSelect = (value: 'yes_paid' | 'yes_free' | 'not_yet') => {
    updateAnswer('solved_for_someone', value);
    if (value === 'yes_paid') {
      transitionTo('converting');
    } else {
      // free or not_yet go straight to drill down (Step 5)
      transitionTo('drill_down');
    }
  };

  // Step 3: Handle converting
  const handleConvertingSelect = (value: 'yes' | 'somewhat' | 'no') => {
    updateAnswer('converting', value);
    transitionTo('infrastructure');
  };

  // Step 4: Handle infrastructure
  const handleInfrastructureSelect = (value: 'nothing' | 'needs_improvement' | 'working') => {
    updateAnswer('infrastructure', value);
    if (value === 'working' && answers.converting === 'yes') {
      transitionTo('new_or_improve');
    } else {
      // If somewhat/no or nothing/needs_improvement, skips directly to Step 5
      transitionTo('drill_down');
    }
  };

  // Step 4A: Handle new_or_improve
  const handleNewOrImproveSelect = (value: 'new_offer' | 'improve') => {
    updateAnswer('new_or_improve', value);
    transitionTo('drill_down');
  };

  // Step 5: Handle drill-down checkbox triggers
  const handleDrillDownToggle = (item: string) => {
    const currentList = answers.what_they_have || [];
    let newList: string[] = [];

    if (item === 'none') {
      // If none is selected, clear everything else
      newList = ['none'];
    } else {
      // If other selected, remove 'none' and toggle item
      const filtered = currentList.filter(x => x !== 'none');
      if (filtered.includes(item)) {
        newList = filtered.filter(x => x !== item);
      } else {
        newList = [...filtered, item];
      }
    }
    updateAnswer('what_they_have', newList);
  };

  const handleDrillDownSubmit = () => {
    if (!answers.what_they_have || answers.what_they_have.length === 0) {
      setErrors({ what_they_have: 'Please select at least one option (choose "None of the above" if applicable)' });
      return;
    }
    transitionTo('urgency');
  };

  // Step 6: Submit Urgency and complete quiz
  const handleUrgencySelect = (value: '30_days' | '60_90_days' | '3_6_months') => {
    setAnswers(prev => ({ ...prev, urgency: value }));
    // Triggers complete submission
    // Wait for state commit slightly or call onSubmit directly with updated object
    onSubmit();
  };

  return (
    <div className="flex-grow w-full max-w-[1300px] mx-auto px-4 md:px-12 py-6 md:py-12 grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-16 items-center h-auto md:min-h-screen font-sans relative">
      {/* CSS Keyframes for slide-up, fade-in, and sleeping animations */}
      <style>{`
        @keyframes slideUpHalfBody {
          0% {
            transform: translateY(150px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInBubble {
          0% {
            transform: translateY(15px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes sleepFloating {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          30% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-15px, -50px) scale(1.1);
            opacity: 0;
          }
        }
        @keyframes sleepBreathing {
          0%, 100% {
            transform: translateY(32px) rotate(-12deg) scaleY(0.96);
          }
          50% {
            transform: translateY(32px) rotate(-12deg) scaleY(1.02);
          }
        }
        @keyframes sleepBreathingMob {
          0%, 100% {
            transform: translateY(18px) rotate(-12deg) scaleY(0.96);
          }
          50% {
            transform: translateY(18px) rotate(-12deg) scaleY(1.02);
          }
        }
        .animate-slide-up-half {
          animation: slideUpHalfBody 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-bubble {
          animation: fadeInBubble 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-sleep-float-1 {
          animation: sleepFloating 3.5s ease-in-out infinite;
        }
        .animate-sleep-float-2 {
          animation: sleepFloating 3.5s ease-in-out 1.1s infinite;
        }
        .animate-sleep-float-3 {
          animation: sleepFloating 3.5s ease-in-out 2.2s infinite;
        }
        .animate-sleep-breath {
          animation: sleepBreathing 4.5s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .animate-sleep-breath-mob {
          animation: sleepBreathingMob 4.5s ease-in-out infinite;
          transform-origin: bottom center;
        }
      `}</style>

      {/* Left Column: Form Content - centered between sidebar and dialogue boundary */}
      <div className={`col-span-12 ${isMinimized ? 'xl:col-span-12' : 'xl:col-span-8'} w-full max-w-xl mx-auto flex flex-col justify-center space-y-6 transition-all duration-500`}>
        

      {/* Render Steps */}
      {currentStep === 'identity' && (
        <form onSubmit={handleIdentitySubmit} className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              Before we build, let&rsquo;s align.
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              Every world-class technical system starts with the context of the person behind it. Introduce yourself below so we can tailor this high-ticket diagnosis exactly to your name, expertise, and goals.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="first_name" className="text-xs font-medium text-white">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  value={answers.first_name || ''}
                  onChange={e => updateAnswer('first_name', e.target.value)}
                  className={`w-full bg-[#161616] border ${
                    errors.first_name ? 'border-red-500' : 'border-[#222222] hover:border-[#444]'
                  } focus:border-[#E040FB] rounded p-3 text-sm text-white focus:outline-none transition-colors duration-300 min-h-[48px]`}
                />
                {errors.first_name && <span className="text-[10px] text-red-500 block">{errors.first_name}</span>}
              </div>
              <div className="space-y-1">
                <label htmlFor="last_name" className="text-xs font-medium text-white">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Doe"
                  value={answers.last_name || ''}
                  onChange={e => updateAnswer('last_name', e.target.value)}
                  className={`w-full bg-[#161616] border ${
                    errors.last_name ? 'border-red-500' : 'border-[#222222] hover:border-[#444]'
                  } focus:border-[#E040FB] rounded p-3 text-sm text-white focus:outline-none transition-colors duration-300 min-h-[48px]`}
                />
                {errors.last_name && <span className="text-[10px] text-red-500 block">{errors.last_name}</span>}
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-white">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={answers.email || ''}
                onChange={e => updateAnswer('email', e.target.value)}
                autoComplete="email"
                className={`w-full bg-[#161616] border ${
                  errors.email ? 'border-red-500' : 'border-[#222222] hover:border-[#444]'
                } focus:border-[#E040FB] rounded p-3 text-sm text-white focus:outline-none transition-colors duration-300 min-h-[48px]`}
              />
              {errors.email && <span className="text-[10px] text-red-500 block">{errors.email}</span>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#E040FB] text-black font-semibold text-sm rounded border border-[#E040FB] hover:shadow-[0_0_15px_rgba(224,64,251,0.3)] transition-all duration-300"
          >
            Continue →
          </button>
        </form>
      )}

      {currentStep === 'situation' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              What is the current state of your offer?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              An incredible system is useless if it&rsquo;s mapped to the wrong strategy. Let&rsquo;s establish your exact starting point so we know whether we are choosing a direction, packaging an active skill, or scaling what already works.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'multiple_ideas',
                title: "I have multiple things I do and can't decide what to lead with",
                desc: "Too many directions, no clear lead offer"
              },
              {
                id: 'one_skill',
                title: "I have one clear skill but haven't packaged it into something I can sell",
                desc: "Know what I do, haven't built the offer"
              },
              {
                id: 'has_offer',
                title: "I have an offer and I'm actively selling it or trying to",
                desc: "Defined, priced, in market"
              }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleSituationSelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 hover:bg-gradient-to-r hover:from-transparent hover:to-[#E040FB]/[0.01] p-5 rounded-md transition-all duration-300 focus:outline-none focus:border-[#E040FB]/60 flex flex-col space-y-1.5"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[13px] text-[#A2968A] font-light">{option.desc}</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'most_money' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              Let&rsquo;s follow the evidence of your traction.
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              When you have multiple talents, second-guessing is the ultimate progress killer. We want to identify where the market has already shown you a clear green light, even if it was just once, to narrow down your focus.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'one_money', title: "One has made money but I keep second-guessing it" },
              { id: 'all_similar', title: "They've all made similar amounts so I can't decide" },
              { id: 'none', title: "None of them have made money yet" },
              { id: 'same_skill', title: "It's really the same skill just packaged differently each time" }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleMostMoneySelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 p-4 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[#E040FB]/40 text-xs font-light">→</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'solved_for_someone' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              Has this expertise been proven in the real world?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              High-ticket validation doesn&rsquo;t require a massive client roster—it just requires proof of concept. Let us know if you have successfully delivered results for someone else, whether as a paid engagement or a free pilot.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'yes_paid', title: "Yes — and they paid me for it" },
              { id: 'yes_free', title: "Yes — but I did it for free" },
              { id: 'not_yet', title: "Not yet — it's still an idea" }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleSolvedForSomeoneSelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 p-4 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[#E040FB]/40 text-xs font-light">→</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'converting' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              Is your conversion funnel predictable?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              Making sporadic sales is common, but scaling a premium brand requires predictability. Let&rsquo;s evaluate whether your offer currently converts on-demand, or if it still relies on manual hustle and inconsistent launch cycles.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'yes', title: "Yes — people are paying consistently and I can replicate it" },
              { id: 'somewhat', title: "Somewhat — some sales but I can't make it happen on demand" },
              { id: 'no', title: "No — it's not selling the way I want it to" }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleConvertingSelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 p-4 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[#E040FB]/40 text-xs font-light">→</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'infrastructure' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              What is the status of your conversion assets?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              We need to check the active structural layers of your digital home. Tell us if you have a fully live, customer-facing system running right now, or if we are working with a clean, distraction-free slate.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'working', title: "Yes — it's live and it's working" },
              { id: 'needs_improvement', title: "I have something but it's not really working" },
              { id: 'nothing', title: "Nothing built yet" }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleInfrastructureSelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 p-4 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[#E040FB]/40 text-xs font-light">→</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'new_or_improve' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              What is the primary goal of this evolution?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              Since your current engine is functional, we want to treat your setup with extreme precision. Tell us if we are building a brand-new high-ticket channel from scratch, or auditing and fine-tuning your existing layers for peak capacity.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'new_offer', title: "Build for a new offer" },
              { id: 'improve', title: "Fix or improve what I already have" }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleNewOrImproveSelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 p-4 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[#E040FB]/40 text-xs font-light">→</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'drill_down' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              What assets do we have to work with?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              We don&rsquo;t believe in tearing down active machinery if it can be leveraged. Select all the active tech, content, and pipeline elements you currently have set up so we can map out your exact system integration.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'sales_page', label: "Sales page or landing page" },
              { id: 'email_automation', label: "Email automation or sequences" },
              { id: 'crm', label: "CRM or pipeline tool (GHL, HubSpot, etc.)" },
              { id: 'membership', label: "Membership or course platform (Kajabi, Skool, etc.)" },
              { id: 'organic', label: "Organic social presence" },
              { id: 'paid_ads', label: "Paid ads running" },
              { id: 'none', label: "None of the above" }
            ].map(item => {
              const isSelected = (answers.what_they_have || []).includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleDrillDownToggle(item.id)}
                  className={`w-full text-left p-4 rounded-md border transition-all duration-300 focus:outline-none flex items-center justify-between min-h-[48px] ${
                    isSelected
                      ? 'bg-[#E040FB]/5 border-[#E040FB] text-white shadow-[0_0_10px_rgba(224,64,251,0.05)]'
                      : 'bg-[#161616] border-[#222222] text-[#888888] hover:border-[#444]'
                  }`}
                >
                  <span className={`text-sm font-medium transition-colors duration-300 ${isSelected ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ${
                    isSelected ? 'border-[#E040FB] bg-[#E040FB] text-black' : 'border-[#333]'
                  }`}>
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {errors.what_they_have && <span className="text-[10px] text-red-500 block">{errors.what_they_have}</span>}
          {renderNavigation()}
        </div>
      )}

      {currentStep === 'urgency' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight">
              What is your ideal window for deployment?
            </h2>
            <p className="text-base md:text-[16.5px] text-[#A2968A] font-light leading-relaxed">
              Timing dictates our technical sequence and development velocity. Tell us your target launch horizon so we can structure a realistic, high-fidelity roadmap that aligns with your calendar.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: '30_days', title: "As soon as possible — within 30 days" },
              { id: '60_90_days', title: "Within 60–90 days — I have some runway" },
              { id: '3_6_months', title: "Still planning — 3–6 months out" }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => handleUrgencySelect(option.id as any)}
                className="w-full text-left bg-[#161616] border border-[#222222] hover:border-[#E040FB]/40 p-5 rounded-md transition-all duration-300 focus:outline-none flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white">{option.title}</span>
                <span className="text-[#E040FB]/60 text-xs font-semibold uppercase tracking-[0.1em]">Analyze →</span>
              </button>
            ))}
          </div>
          {renderNavigation()}
        </div>
      )}

    </div>

    {/* Right Column: Large Half-Body Cartoon & Speech Bubble */}
    <div className={`col-span-1 xl:col-span-4 ${isMinimized ? 'hidden' : 'xl-only-flex'} flex-col items-center justify-start sticky top-12 h-auto pt-4`}>
      {/* Large Speech / Dialogue Bubble (unless minimized!) */}
      {!isMinimized && (
        <>
          <div key={`bubble-${currentStep}`} className="bg-transparent border-0 p-0 w-full max-w-[380px] relative mb-6 animate-fade-in-bubble select-none">
            {/* Minimize/Close Button */}
            <button 
              type="button"
              onClick={() => setIsMinimized(true)}
              className="absolute top-0 right-0 text-[10px] text-white/40 hover:text-white/80 transition-colors w-5 h-5 flex items-center justify-center rounded-full bg-white/5 border border-white/5"
              title="Minimize Allie to Sleep"
            >
              ✕
            </button>
            {/* Speaker Tag */}
            <span className="text-[10px] uppercase tracking-wider text-[#E040FB] font-bold block mb-2">
              Allie's Guidance
            </span>
            {/* Conversational Text */}
            <p className="font-sans text-base md:text-[16.5px] leading-relaxed text-[#C6BAAC] font-light">
              {COMPANION_DATA[currentStep]?.text}
            </p>
          </div>

          {/* Allie Character Image - styled exactly with your custom CSS parameters */}
          <div 
            onClick={() => setIsMinimized(true)}
            title="Click to sleep"
            key={`character-${currentStep}`} 
            className="avatar-container animate-slide-up-half cursor-pointer mt-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`${COMPANION_DATA[currentStep]?.avatar || "/allie_cartoon.png"}?v=11`} 
              alt="Allie Cartoon Character" 
              className="relative z-10"
            />
          </div>
        </>
      )}
    </div>

    {/* Desktop Minimized Sleeping Character fixed on the bottom-right of the viewport! */}
    {isMinimized && (
      <div 
        onClick={() => setIsMinimized(false)}
        className="xl-only-flex pointer-events-auto cursor-pointer fixed bottom-6 right-12 z-50 w-28 h-28 items-end justify-center select-none group"
        title="Click Allie to wake her up!"
      >
        {/* Floating Sleep Letters */}
        <div className="absolute top-0 left-6 pointer-events-none select-none text-[#E040FB]/80 font-serif font-semibold">
          <span className="absolute animate-sleep-float-1 text-sm">Z</span>
          <span className="absolute animate-sleep-float-2 text-xs left-3 -top-2">z</span>
          <span className="absolute animate-sleep-float-3 text-[10px] left-6 top-1">z</span>
          <span className="absolute animate-sleep-float-1 text-[8px] left-9 -top-1" style={{ animationDelay: '1.5s' }}>z</span>
        </div>

        {/* Sleeping Cartoon character resting half-submerged with breathing animation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/allie_cartoon_thinking.png?v=11" 
          alt="Sleeping Allie" 
          className="w-full h-full object-contain animate-sleep-breath filter brightness-75 contrast-90"
        />
      </div>
    )}


  </div>
);
}
