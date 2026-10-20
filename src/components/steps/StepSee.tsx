import React from 'react';
import { VocabularyWord } from '../../types';
import { Eye, Volume2, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { speakWord } from '../../utils/speech';

interface StepSeeProps {
  word: VocabularyWord;
  isCompleted: boolean;
  onComplete: () => void;
  onNextStep: () => void;
}

export const StepSee: React.FC<StepSeeProps> = ({
  word,
  isCompleted,
  onComplete,
  onNextStep,
}) => {
  const handlePlayAudio = (text: string) => {
    speakWord(text, 0.95);
  };

  const handleFinish = () => {
    onComplete();
    onNextStep();
  };

  return (
    <div className="space-y-6">
      {/* Method Header Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                Method 1 of 5
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Visual & Morphological Encoding
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Study the word's physical shape, roots, and mental image before speaking it aloud.
            </p>
          </div>
        </div>
      </div>

      {/* Main Visual Presentation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {word.term}
              </h2>
              <button
                onClick={() => handlePlayAudio(word.term)}
                className="p-2 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                title="Listen to pronunciation"
                aria-label={`Listen to ${word.term}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-sm">
              <span className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 px-2 py-0.5 rounded text-xs font-semibold">
                {word.phonetic}
              </span>
              <span className="text-slate-400">·</span>
              <span className="italic text-slate-600 dark:text-slate-400 text-xs">
                {word.partOfSpeech}
              </span>
            </div>
          </div>

          <div className="max-w-md bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 text-left">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Definition
            </span>
            <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-relaxed">
              {word.definition}
            </p>
          </div>
        </div>

        {/* Visual Cue & Imagery Anchor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/10 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Vivid Mental Picture</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {word.see.visualCue}
            </p>
            <div className="mt-4 pt-3 border-t border-indigo-100/80 dark:border-indigo-900/30 text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-indigo-700 dark:text-indigo-300">Action:</strong> Close your eyes for 3 seconds and picture this scene in full color.
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200 font-semibold text-sm mb-2">
              <Compass className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>Etymology & Roots</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm font-mono leading-relaxed">
              {word.see.roots}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              Understanding ancient roots helps decode hundreds of related words.
            </div>
          </div>
        </div>

        {/* Example in Context */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Contextual Example
          </span>
          <p className="text-slate-800 dark:text-slate-200 text-sm italic leading-relaxed">
            "{word.example}"
          </p>
        </div>

        {/* Collocations */}
        {word.see.collocations.length > 0 && (
          <div className="mt-6">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Natural Collocations
            </span>
            <div className="flex flex-wrap gap-2">
              {word.see.collocations.map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlayAudio(col)}
                  className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <Volume2 className="w-3 h-3 text-slate-400" />
                  <span>{col}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Completion CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Visualized
            </span>
          )}
        </div>
        <button
          onClick={handleFinish}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-indigo-500/20 flex items-center gap-2"
        >
          <span>I've Visualized It</span>
          <span className="text-xs bg-indigo-500/80 px-2 py-0.5 rounded">Next: Say →</span>
        </button>
      </div>
    </div>
  );
};
