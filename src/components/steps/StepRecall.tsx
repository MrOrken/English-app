import React, { useState } from 'react';
import { VocabularyWord } from '../../types';
import { HelpCircle, CheckCircle2, XCircle, Trophy, Star, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { setWordConfidence } from '../../utils/storage';

interface StepRecallProps {
  word: VocabularyWord;
  isCompleted: boolean;
  onComplete: () => void;
  onNextWord: () => void;
  isLastWord: boolean;
}

export const StepRecall: React.FC<StepRecallProps> = ({
  word,
  isCompleted,
  onComplete,
  onNextWord,
  isLastWord,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [confidence, setConfidence] = useState<number>(4);
  const [showDefinitionReveal, setShowDefinitionReveal] = useState(false);

  const handleSelectOption = (opt: string) => {
    if (hasChecked) return;
    setSelectedOption(opt);
    const correct = opt.toLowerCase() === word.recall.clozeAnswer.toLowerCase();
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      onComplete();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {
        // fallback
      }
    }
  };

  const handleResetChallenge = () => {
    setSelectedOption(null);
    setHasChecked(false);
    setIsCorrect(false);
  };

  const handleRateConfidence = (level: number) => {
    setConfidence(level);
    setWordConfidence(word.id, level);
  };

  return (
    <div className="space-y-6">
      {/* Method Header Banner */}
      <div className="p-4 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Method 5 of 5
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Active Retrieval & Testing Effect
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Pull the term out of memory without hints to consolidate synaptic pathways.
            </p>
          </div>
        </div>
      </div>

      {/* Main Recall Challenge Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Cloze Sentence Fill-in */}
        <div className="text-center max-w-xl mx-auto py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-3">
            Active Retrieval Cloze
          </span>
          <p className="text-lg sm:text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
            {word.recall.clozeSentence}
          </p>
        </div>

        {/* Multiple Choice Retrieval Grid */}
        <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {word.recall.options.map((opt, idx) => {
            const isThisSelected = selectedOption === opt;
            const isTarget = opt.toLowerCase() === word.recall.clozeAnswer.toLowerCase();

            let buttonStyle = 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-300 hover:bg-rose-50/50';

            if (hasChecked) {
              if (isTarget) {
                buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30';
              } else if (isThisSelected && !isTarget) {
                buttonStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
              } else {
                buttonStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={hasChecked}
                className={`p-3.5 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
              >
                <span>{opt}</span>
                {hasChecked && isTarget && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {hasChecked && isThisSelected && !isTarget && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        {hasChecked && (
          <div
            className={`p-4 rounded-xl border max-w-md mx-auto text-center transition-all ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 font-bold text-sm mb-1">
              {isCorrect ? (
                <>
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>Brilliant Retrieval! All 5 Methods Complete!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Not quite. The correct term is "{word.recall.clozeAnswer}".</span>
                </>
              )}
            </div>
            <p className="text-xs">
              {isCorrect
                ? 'Your multi-sensory circuit (Visual + Audio + Motor + Semantic + Retrieval) is fully consolidated!'
                : 'Review the Say and Move cues once more to reinforce the memory pathway.'}
            </p>
            {!isCorrect && (
              <button
                onClick={handleResetChallenge}
                className="mt-3 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:underline inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try retrieval again
              </button>
            )}
          </div>
        )}

        {/* Direct Definition Prompt Peek */}
        <div className="max-w-md mx-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            onClick={() => setShowDefinitionReveal(!showDefinitionReveal)}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline"
          >
            {showDefinitionReveal ? 'Hide Definition Prompt' : 'Peek Definition Recall Prompt'}
          </button>
          {showDefinitionReveal && (
            <p className="mt-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-300 italic">
              {word.recall.definitionPrompt}
            </p>
          )}
        </div>

        {/* Self-Rated Retention Confidence */}
        <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
            Rate Your Memory Confidence (1-5)
          </span>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleRateConfidence(lvl)}
                className={`p-2 rounded-lg border transition-all ${
                  confidence >= lvl
                    ? 'bg-amber-500/10 border-amber-400 text-amber-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
                }`}
                title={`Confidence level ${lvl}`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {confidence === 5 ? 'Mastered!' : confidence >= 3 ? 'Solid retention' : 'Needs spaced review'}
          </span>
        </div>
      </div>

      {/* Completion & Next Word Navigation */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Loop Complete
            </span>
          )}
        </div>
        <button
          onClick={onNextWord}
          className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-sm transition-all shadow-md flex items-center gap-2"
        >
          <span>{isLastWord ? 'Review Deck Summary' : 'Next Vocabulary Word'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
