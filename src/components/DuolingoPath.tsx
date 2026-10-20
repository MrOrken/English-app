import React from 'react';
import { VocabularyDeck, VocabularyWord, UserAccount } from '../types';
import { getAllProgress } from '../utils/storage';
import { Star, Trophy, Check, Sparkles, BookOpen, Crown } from 'lucide-react';

interface DuolingoPathProps {
  decks: VocabularyDeck[];
  user: UserAccount;
  onStartWordLesson: (deck: VocabularyDeck, wordIndex: number) => void;
  onOpenDeckReview: (deck: VocabularyDeck) => void;
}

export const DuolingoPath: React.FC<DuolingoPathProps> = ({
  decks,
  user,
  onStartWordLesson,
  onOpenDeckReview,
}) => {
  const progress = getAllProgress();

  // Winding offset sequence to give the authentic Duolingo snake trail feel
  const offsetClasses = [
    'translate-x-0',
    'translate-x-12 sm:translate-x-16',
    'translate-x-20 sm:translate-x-28',
    'translate-x-12 sm:translate-x-16',
    'translate-x-0',
    '-translate-x-12 sm:-translate-x-16',
    '-translate-x-20 sm:-translate-x-28',
    '-translate-x-12 sm:-translate-x-16',
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-16">
      {/* Friendly Welcome Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl p-2 bg-white/20 rounded-2xl">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
              Welcome back, {user.name}!
            </h2>
            <p className="text-xs text-emerald-100 font-bold mt-0.5">
              Practice today to protect your {user.streak}-day streak! 🔥
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-2xl font-black text-xs">
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>{user.xp} XP</span>
        </div>
      </div>

      {/* Units Loop */}
      {decks.map((deck, unitIdx) => {
        // Calculate unit progress
        let unitMasteredCount = 0;
        deck.words.forEach((w) => {
          const p = progress[w.id];
          if (p && p.completedSteps && p.completedSteps.length === 5) {
            unitMasteredCount++;
          }
        });
        const isUnitFinished = unitMasteredCount === deck.words.length;

        // Theme colors per unit
        const unitThemes = [
          { bg: 'bg-emerald-500', shadow: 'shadow-[0_6px_0_#047857]', border: 'border-emerald-600', text: 'text-emerald-600' },
          { bg: 'bg-amber-500', shadow: 'shadow-[0_6px_0_#b45309]', border: 'border-amber-600', text: 'text-amber-600' },
          { bg: 'bg-purple-500', shadow: 'shadow-[0_6px_0_#7e22ce]', border: 'border-purple-600', text: 'text-purple-600' },
          { bg: 'bg-rose-500', shadow: 'shadow-[0_6px_0_#be123c]', border: 'border-rose-600', text: 'text-rose-600' },
          { bg: 'bg-cyan-500', shadow: 'shadow-[0_6px_0_#0e7490]', border: 'border-cyan-600', text: 'text-cyan-600' },
          { bg: 'bg-indigo-500', shadow: 'shadow-[0_6px_0_#4338ca]', border: 'border-indigo-600', text: 'text-indigo-600' },
        ];
        const theme = unitThemes[unitIdx % unitThemes.length];

        return (
          <div key={deck.id} className="space-y-8">
            {/* Unit Header Banner */}
            <div className={`p-5 rounded-3xl ${theme.bg} text-white shadow-md flex items-center justify-between`}>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider opacity-90 block">
                  {deck.emoji || '⭐'} Unit {unitIdx + 1} · {deck.level}
                </span>
                <h3 className="text-xl font-black tracking-tight mt-0.5">
                  {deck.title}
                </h3>
                <p className="text-xs opacity-90 font-medium mt-1">
                  {deck.description}
                </p>
              </div>

              <button
                onClick={() => onOpenDeckReview(deck)}
                className="px-3.5 py-2 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                Review List ({unitMasteredCount}/{deck.words.length})
              </button>
            </div>

            {/* Winding Trail of Stepping Stones */}
            <div className="flex flex-col items-center gap-6 sm:gap-8 py-4">
              {deck.words.map((word, wordIdx) => {
                const p = progress[word.id];
                const stepsCount = p?.completedSteps?.length || 0;
                const isMastered = stepsCount === 5;
                const offset = offsetClasses[wordIdx % offsetClasses.length];

                return (
                  <div
                    key={word.id}
                    className={`flex flex-col items-center transition-transform ${offset}`}
                  >
                    {/* Stepping Stone 3D Button */}
                    <button
                      onClick={() => onStartWordLesson(deck, wordIdx)}
                      className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center font-extrabold transition-all cursor-pointer group hover:scale-105 active:translate-y-1.5 active:shadow-none ${
                        isMastered
                          ? 'bg-amber-400 text-slate-900 shadow-[0_6px_0_#d97706]'
                          : stepsCount > 0
                          ? `${theme.bg} text-white ${theme.shadow}`
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-[0_6px_0_#94a3b8] dark:shadow-[0_6px_0_#475569]'
                      }`}
                      title={`Learn "${word.term}" with 5 methods`}
                    >
                      {/* Word Emoji or Icon */}
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {word.emoji || '📖'}
                      </span>

                      {/* Small Stars / Progress badge */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {isMastered ? (
                          <Crown className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                        ) : (
                          <span className="text-[10px] font-black opacity-90">
                            {stepsCount}/5
                          </span>
                        )}
                      </div>

                      {/* Mini completed checkmark ring */}
                      {isMastered && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>

                    {/* Word Label */}
                    <span className="mt-2 text-xs font-black tracking-tight text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                      {word.term}
                    </span>
                  </div>
                );
              })}

              {/* End of Unit Chest / Trophy Node */}
              <div className="flex flex-col items-center mt-2">
                <button
                  onClick={() => onOpenDeckReview(deck)}
                  className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center font-black transition-all cursor-pointer ${
                    isUnitFinished
                      ? 'bg-amber-400 text-amber-950 shadow-[0_6px_0_#d97706] animate-bounce'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 shadow-[0_6px_0_#cbd5e1] dark:shadow-[0_6px_0_#334155]'
                  }`}
                  title="Unit Trophy Chest"
                >
                  <Trophy className={`w-8 h-8 ${isUnitFinished ? 'fill-amber-600 text-amber-900' : 'text-slate-400'}`} />
                </button>
                <span className="mt-2 text-xs font-bold text-slate-500">
                  {isUnitFinished ? 'Unit Completed! 🏆' : 'Complete Unit to Unlock'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
