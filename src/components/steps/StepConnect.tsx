import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../../types';
import { Link2, Lightbulb, Heart, CheckCircle2, Save, Quote } from 'lucide-react';
import { getWordProgress } from '../../utils/storage';

interface StepConnectProps {
  word: VocabularyWord;
  isCompleted: boolean;
  onComplete: (personalAnchor?: string) => void;
  onNextStep: () => void;
}

export const StepConnect: React.FC<StepConnectProps> = ({
  word,
  isCompleted,
  onComplete,
  onNextStep,
}) => {
  const [personalAnchor, setPersonalAnchor] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    const progress = getWordProgress(word.id);
    if (progress?.personalAnchor) {
      setPersonalAnchor(progress.personalAnchor);
    }
  }, [word.id]);

  const handleSaveAnchor = () => {
    onComplete(personalAnchor);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleFinish = () => {
    onComplete(personalAnchor);
    onNextStep();
  };

  return (
    <div className="space-y-6">
      {/* Method Header Banner */}
      <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Method 4 of 5
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Elaborative Rehearsal & Semantic Network Bridging
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Hook new vocabulary into existing memories, humorous stories, rhymes, or emotional events.
            </p>
          </div>
        </div>
      </div>

      {/* Main Connection Studio */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Curated Mnemonic Story */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 dark:from-amber-950/20 dark:to-orange-950/10 border border-amber-200/80 dark:border-amber-900/40">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-base mb-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span>Memory Hook / Mnemonic</span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-base leading-relaxed font-medium">
            {word.connect.mnemonic}
          </p>

          {/* Rhyme Hook */}
          {word.connect.rhymeHook && (
            <div className="mt-4 pt-4 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center gap-2 text-sm text-amber-900 dark:text-amber-200 italic">
              <Quote className="w-4 h-4 text-amber-500 shrink-0" />
              <span>"{word.connect.rhymeHook}"</span>
            </div>
          )}
        </div>

        {/* Association Pillars */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Concept Category: <strong className="text-slate-700 dark:text-slate-300">{word.connect.conceptCategory}</strong>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {word.connect.associations.map((assoc, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                ⚓ {assoc}
              </span>
            ))}
          </div>
        </div>

        {/* Student's Personal Connection Anchor */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Your Personal Anchor (Make it Unforgettable)</span>
            </div>
            {isSavedNotice && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Write down a friend, childhood memory, favorite movie, or funny situation this word reminds you of.
          </p>

          <div className="flex gap-2">
            <textarea
              rows={2}
              value={personalAnchor}
              onChange={(e) => setPersonalAnchor(e.target.value)}
              placeholder={`e.g. "Reminds me of my grandmother because she never gave up during the storm..."`}
              className="w-full text-sm rounded-xl p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
            <button
              onClick={handleSaveAnchor}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-semibold hover:bg-slate-800 dark:hover:bg-white self-end transition-colors flex items-center gap-1.5 shrink-0"
              title="Save connection"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Completion CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Connected
            </span>
          )}
        </div>
        <button
          onClick={handleFinish}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-amber-500/20 flex items-center gap-2"
        >
          <span>I've Connected It</span>
          <span className="text-xs bg-amber-500/80 px-2 py-0.5 rounded">Next: Recall →</span>
        </button>
      </div>
    </div>
  );
};
