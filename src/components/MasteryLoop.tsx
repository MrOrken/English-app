import React, { useState } from 'react';
import { VocabularyDeck, VocabularyWord, SensoryMethod } from '../types';
import { StepSee } from './steps/StepSee';
import { StepSay } from './steps/StepSay';
import { StepMove } from './steps/StepMove';
import { StepConnect } from './steps/StepConnect';
import { StepRecall } from './steps/StepRecall';
import { Eye, Volume2, Activity, Link2, HelpCircle, Check, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { updateWordStep, getWordProgress } from '../utils/storage';

interface MasteryLoopProps {
  deck: VocabularyDeck;
  wordIndex: number;
  onChangeWordIndex: (index: number) => void;
  onBackToDecks: () => void;
}

const STEP_ORDER: SensoryMethod[] = ['see', 'say', 'move', 'connect', 'recall'];

const STEP_META: Record<
  SensoryMethod,
  { label: string; icon: React.FC<{ className?: string }>; color: string; activeColor: string }
> = {
  see: {
    label: '1. See',
    icon: Eye,
    color: 'text-indigo-600 dark:text-indigo-400',
    activeColor: 'bg-indigo-600 text-white',
  },
  say: {
    label: '2. Say',
    icon: Volume2,
    color: 'text-purple-600 dark:text-purple-400',
    activeColor: 'bg-purple-600 text-white',
  },
  move: {
    label: '3. Move',
    icon: Activity,
    color: 'text-emerald-600 dark:text-emerald-400',
    activeColor: 'bg-emerald-600 text-white',
  },
  connect: {
    label: '4. Connect',
    icon: Link2,
    color: 'text-amber-600 dark:text-amber-400',
    activeColor: 'bg-amber-600 text-white',
  },
  recall: {
    label: '5. Recall',
    icon: HelpCircle,
    color: 'text-rose-600 dark:text-rose-400',
    activeColor: 'bg-rose-600 text-white',
  },
};

export const MasteryLoop: React.FC<MasteryLoopProps> = ({
  deck,
  wordIndex,
  onChangeWordIndex,
  onBackToDecks,
}) => {
  const [currentStep, setCurrentStep] = useState<SensoryMethod>('see');
  const currentWord: VocabularyWord = deck.words[wordIndex] || deck.words[0];
  const progress = getWordProgress(currentWord?.id);
  const completedSteps = progress?.completedSteps || [];

  const handleStepComplete = (step: SensoryMethod, personalAnchor?: string) => {
    updateWordStep(currentWord.id, step, personalAnchor);
  };

  const handleNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  };

  const handleNextWord = () => {
    if (wordIndex < deck.words.length - 1) {
      onChangeWordIndex(wordIndex + 1);
      setCurrentStep('see');
    } else {
      // Loop or finish
      onBackToDecks();
    }
  };

  const handlePrevWord = () => {
    if (wordIndex > 0) {
      onChangeWordIndex(wordIndex - 1);
      setCurrentStep('see');
    }
  };

  const isWordFullyMastered = STEP_ORDER.every((s) => completedSteps.includes(s));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Deck & Word Carousel Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onBackToDecks}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 mb-1"
          >
            ← Back to All Decks
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {deck.title}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {deck.level}
            </span>
          </div>
        </div>

        {/* Word Pagination & Mastery Pill */}
        <div className="flex items-center gap-3">
          {isWordFullyMastered && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> 5-Method Mastered
            </span>
          )}

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={handlePrevWord}
              disabled={wordIndex === 0}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
              title="Previous Word"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 tabular-nums">
              Word {wordIndex + 1} of {deck.words.length}
            </span>
            <button
              onClick={handleNextWord}
              disabled={wordIndex === deck.words.length - 1}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
              title="Next Word"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Stepper Tabs */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/70 rounded-2xl">
        {STEP_ORDER.map((step) => {
          const meta = STEP_META[step];
          const StepIcon = meta.icon;
          const isActive = currentStep === step;
          const isDone = completedSteps.includes(step);

          return (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`p-2.5 sm:p-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 relative ${
                isActive
                  ? `${meta.activeColor} shadow-sm`
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-700/60'
              }`}
            >
              <StepIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">{meta.label}</span>
              {isDone && !isActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
              )}
              {isDone && isActive && (
                <Check className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Step Render Area */}
      {currentStep === 'see' && (
        <StepSee
          word={currentWord}
          isCompleted={completedSteps.includes('see')}
          onComplete={() => handleStepComplete('see')}
          onNextStep={handleNextStep}
        />
      )}

      {currentStep === 'say' && (
        <StepSay
          word={currentWord}
          isCompleted={completedSteps.includes('say')}
          onComplete={() => handleStepComplete('say')}
          onNextStep={handleNextStep}
        />
      )}

      {currentStep === 'move' && (
        <StepMove
          word={currentWord}
          isCompleted={completedSteps.includes('move')}
          onComplete={() => handleStepComplete('move')}
          onNextStep={handleNextStep}
        />
      )}

      {currentStep === 'connect' && (
        <StepConnect
          word={currentWord}
          isCompleted={completedSteps.includes('connect')}
          onComplete={(anchor) => handleStepComplete('connect', anchor)}
          onNextStep={handleNextStep}
        />
      )}

      {currentStep === 'recall' && (
        <StepRecall
          word={currentWord}
          isCompleted={completedSteps.includes('recall')}
          onComplete={() => handleStepComplete('recall')}
          onNextWord={handleNextWord}
          isLastWord={wordIndex === deck.words.length - 1}
        />
      )}
    </div>
  );
};
