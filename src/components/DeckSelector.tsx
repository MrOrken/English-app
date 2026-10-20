import React, { useState } from 'react';
import { VocabularyDeck } from '../types';
import { getAllProgress } from '../utils/storage';
import { BookOpen, Sparkles, Plus, Search, CheckCircle2, ArrowRight } from 'lucide-react';

interface DeckSelectorProps {
  decks: VocabularyDeck[];
  onSelectDeck: (deck: VocabularyDeck) => void;
  onCreateDeckClick: () => void;
  role: 'student' | 'teacher';
}

export const DeckSelector: React.FC<DeckSelectorProps> = ({
  decks,
  onSelectDeck,
  onCreateDeckClick,
  role,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('All');

  const progress = getAllProgress();

  const filteredDecks = decks.filter((deck) => {
    const matchesLevel = levelFilter === 'All' || deck.level === levelFilter || (levelFilter === 'Custom' && deck.isCustom);
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.words.some((w) => w.term.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  // Calculate mastery statistics
  let totalWordsCount = 0;
  let masteredWordsCount = 0;
  decks.forEach((deck) => {
    deck.words.forEach((w) => {
      totalWordsCount++;
      const p = progress[w.id];
      if (p && p.completedSteps && p.completedSteps.length === 5) {
        masteredWordsCount++;
      }
    });
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 5 Cognitive Pathways: See · Say · Move · Connect · Recall</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Stop Forgetting Vocabulary. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-indigo-300">
              Engage All Five Senses.
            </span>
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Rote memorization fades in days. Memory Boost uses dual-coding imagery, speech loop articulation, motor gestures, emotional mnemonics, and active retrieval to lock English words into permanent memory.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="text-amber-400 font-bold tabular-nums text-sm">{totalWordsCount}</span>
              <span>Curated Words</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="text-emerald-400 font-bold tabular-nums text-sm">{masteredWordsCount}</span>
              <span>Fully Mastered (5/5)</span>
            </div>
          </div>
        </div>

        {/* Ambient Hero Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-35 lg:opacity-65 pointer-events-none mix-blend-screen">
          <img
            src="/src/assets/images/hero_memory_boost_1791868807955.jpg"
            alt="Multi-sensory cognitive memory pathways"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Control Bar: Filters, Search & Create */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
          {['All', 'Beginner', 'Intermediate', 'Advanced', 'Custom'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                levelFilter === lvl
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Search & Teacher Create Button */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words or decks..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          {role === 'teacher' && (
            <button
              onClick={onCreateDeckClick}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Deck</span>
            </button>
          )}
        </div>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => {
          let deckMastered = 0;
          deck.words.forEach((w) => {
            const p = progress[w.id];
            if (p && p.completedSteps && p.completedSteps.length === 5) {
              deckMastered++;
            }
          });
          const percent = Math.round((deckMastered / deck.words.length) * 100);

          return (
            <div
              key={deck.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                      {deck.level}
                    </span>
                    {deck.isCustom && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                        Teacher Created
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {deck.words.length} terms
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {deck.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {deck.description}
                </p>

                {/* Word sample preview chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {deck.words.slice(0, 4).map((w) => (
                    <span
                      key={w.id}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      {w.term}
                    </span>
                  ))}
                  {deck.words.length > 4 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{deck.words.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Start CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>5-Step Mastery</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {deckMastered} / {deck.words.length} ({percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <button
                  onClick={() => onSelectDeck(deck)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start 5-Method Loop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDecks.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No matching vocabulary decks found
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search terms or filter.
          </p>
        </div>
      )}
    </div>
  );
};
