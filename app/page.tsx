'use client';

import React, { useState } from 'react';
import LandingView from '@/components/LandingView';
import Sidebar from '@/components/Sidebar';
import QuizForm from '@/components/QuizForm';
import LoadingView from '@/components/LoadingView';
import ResultsView from '@/components/ResultsView';
import { QuizAnswers, QuizResult, calculateQuizResult } from '@/lib/quizLogic';
import { supabase } from '@/lib/supabase';

type ScreenState = 'landing' | 'quiz' | 'loading' | 'results';

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>('landing');
  const [answers, setAnswers] = useState<QuizAnswers>({
    first_name: '',
    last_name: '',
    email: '',
    what_they_have: [],
  });
  const [result, setResult] = useState<QuizResult | null>(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const startQuiz = () => {
    setScreen('quiz');
    setActivePhaseIndex(0);
  };

  const handleQuizSubmit = async () => {
    setScreen('loading');
    
    // Calculate the diagnostic results in background
    const calculatedResult = calculateQuizResult(answers);
    setResult(calculatedResult);

    // Asynchronous silent Supabase submission
    try {
      const payload = {
        first_name: answers.first_name,
        last_name: answers.last_name,
        email: answers.email,
        offer_status: answers.offer_status || null,
        most_money: answers.most_money || null,
        solved_for_someone: answers.solved_for_someone || null,
        converting: answers.converting || null,
        infrastructure: answers.infrastructure || null,
        new_or_improve: answers.new_or_improve || null,
        what_they_have: answers.what_they_have || [],
        urgency: answers.urgency || null,
        client_bucket: calculatedResult.client_bucket,
        client_type: calculatedResult.client_type,
        ai_result_headline: calculatedResult.headline,
        ai_result_summary: calculatedResult.summary,
        ai_result_diagnosis: calculatedResult.diagnosis,
        price_anchor: calculatedResult.price_anchor,
      };

      // Suppress any console logging unless there's a strict developer trace
      await supabase.from('leads').insert([payload]);
    } catch (dbError) {
      // Gracefully capture database error silently, ensuring standard client experience is unaffected
    }

    // Keep loading screen for exactly 4 seconds to simulate AI computation
    setTimeout(() => {
      setScreen('results');
    }, 4000);
  };

  const handleReset = () => {
    setAnswers({
      first_name: '',
      last_name: '',
      email: '',
      what_they_have: [],
    });
    setResult(null);
    setScreen('landing');
    setActivePhaseIndex(0);
  };

  if (screen === 'landing') {
    return <LandingView onStart={startQuiz} />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col md:flex-row relative">
      {/* 220px Fixed Sidebar Navigation */}
      <Sidebar currentStep={screen} activePhaseIndex={activePhaseIndex} />

      {/* Flexible Content Column */}
      <div className="flex-grow md:ml-[240px] flex flex-col justify-center min-h-screen relative z-10 transition-all duration-300">
        {screen === 'quiz' && (
          <QuizForm
            answers={answers}
            setAnswers={setAnswers}
            onSubmit={handleQuizSubmit}
            onPhaseChange={setActivePhaseIndex}
          />
        )}

        {screen === 'loading' && <LoadingView />}

        {screen === 'results' && result && (
          <ResultsView
            result={result}
            firstName={answers.first_name}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Decorative full layout background blur */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#E040FB]/[0.015] rounded-full blur-[100px] pointer-events-none z-0"></div>
    </div>
  );
}
