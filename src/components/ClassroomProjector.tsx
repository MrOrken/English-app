import React, { useState } from 'react';
import { VocabularyDeck } from '../types';
import { Presentation, Volume2, ChevronLeft, ChevronRight, Eye, Sparkles, Activity, Link2, HelpCircle } from 'lucide-react';
import { speakWord } from '../utils/speech';

interface ClassroomProjectorProps {
  decks: VocabularyDeck[];
  onExit: () => void;
}

export const ClassroomProjector: React.FC<ClassroomProjectorProps> = ({
  decks,
  onExit,
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(decks[0]?.id || '');
  const [wordIdx, setWordIdx] = useState(0);
  const [revealStage, setRevealStage] = useState<number>(1); // 1 = See, 2 = Say, 3 = Move, 4 = Connect, 5 = Recall

  const currentDeck = decks.find((d) => d.id === selectedDeckId) || decks[0];
  const word = currentDeck?.words[wordIdx] || currentDeck?.words[0];

  const handleNextWord = () => {
    if (wordIdx < currentDeck.words.length - 1) {
      setWordIdx(wordIdx + 1);
      setRevealStage(1);
    }
  };

  const handlePrevWord = () => {
    if (wordIdx > 0) {
      setWordIdx(wordIdx - 1);
      setRevealStage(1);
    }
  };

  const handleChoralPronounce = () => {
    speakWord(word.term, 0.9);
  };

  if (!word) {
    return <div className="p-8 text-center">No vocabulary selected.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Teacher Presentation Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Classroom Smartboard / Projector Stage
            </h2>
            <p className="text-xs text-slate-500">
              High-visibility projection mode for whole-class choral repetition and physical movement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDeckId}
            onChange={(e) => {
              setSelectedDeckId(e.target.value);
              setWordIdx(0);
              setRevealStage(1);
            }}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
          >
            {decks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.words.length} words)
              </option>
            ))}
          </select>

          <button
            onClick={onExit}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
          >
            Exit Stage
          </button>
        </div>
      </div>

      {/* Main Classroom Projection Screen */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl min-h-[580px] flex flex-col justify-between relative overflow-hidden border border-slate-800">
        {/* Subtle background stage ambience */}
        <div className="absolute inset-0 bg-radial from-indigo-950/30 to-slate-950 pointer-events-none" />

        {/* Slide Header: Word Counter & Step Reveal Pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Class Drill · Term {wordIdx + 1} of {currentDeck.words.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setRevealStage(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                revealStage >= 1 ? 'bg-indigo-600 text-white' : 'text-slate-500'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> 1. See
            </button>
            <button
              onClick={() => setRevealStage(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                revealStage >= 2 ? 'bg-purple-600 text-white' : 'text-slate-500'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" /> 2. Say
            </button>
            <button
              onClick={() => setRevealStage(3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                revealStage >= 3 ? 'bg-emerald-600 text-white' : 'text-slate-500'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> 3. Move
            </button>
            <button
              onClick={() => setRevealStage(4)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                revealStage >= 4 ? 'bg-amber-600 text-white' : 'text-slate-500'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" /> 4. Connect
            </button>
            <button
              onClick={() => setRevealStage(5)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                revealStage >= 5 ? 'bg-rose-600 text-white' : 'text-slate-500'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> 5. Recall
            </button>
          </div>
        </div>

        {/* Central Projection Stage Content */}
        <div className="relative z-10 py-8 space-y-6">
          {/* Stage 1: See */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-md">
              {revealStage === 5 ? '?? [Guess the Term] ??' : word.term}
            </h1>
            <div className="flex items-center justify-center gap-3 text-lg">
              <span className="font-mono text-indigo-400 font-semibold">{word.phonetic}</span>
              <span className="text-slate-500">·</span>
              <span className="italic text-slate-400">{word.partOfSpeech}</span>
            </div>
            <p className="max-w-2xl mx-auto text-xl text-slate-200 font-medium pt-2">
              "{word.definition}"
            </p>
          </div>

          {/* Reveal Blocks based on current revealStage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 max-w-4xl mx-auto">
            {revealStage >= 2 && (
              <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Choral Pronunciation
                  </span>
                  <button
                    onClick={handleChoralPronounce}
                    className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Speak
                  </button>
                </div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  {word.say.syllables.join(' · ')}
                </div>
                <p className="text-xs text-purple-200/80 mt-1">
                  Teacher prompt: "Repeat after me 3 times with stressed volume!"
                </p>
              </div>
            )}

            {revealStage >= 3 && (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-2">
                  Classroom TPR Physical Gesture
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  "{word.move.actionPrompt}"
                </p>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Teacher prompt: "Everyone stand up and perform the action together!"
                </p>
              </div>
            )}

            {revealStage >= 4 && (
              <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                  Catchy Mnemonic Hook
                </span>
                <p className="text-sm font-medium text-white">
                  {word.connect.mnemonic}
                </p>
                {word.connect.rhymeHook && (
                  <p className="text-xs text-amber-300 italic mt-1 font-semibold">
                    "{word.connect.rhymeHook}"
                  </p>
                )}
              </div>
            )}

            {revealStage >= 5 && (
              <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300 block mb-2">
                  Classroom Rapid-Fire Recall
                </span>
                <p className="text-sm font-semibold text-white">
                  Fill in: {word.recall.clozeSentence}
                </p>
                <p className="text-xs text-rose-300/80 mt-1 font-mono">
                  Target Answer: <strong>{word.recall.clozeAnswer}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Slide Controls Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevWord}
              disabled={wordIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-30 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Term
            </button>
            <button
              onClick={handleNextWord}
              disabled={wordIdx === currentDeck.words.length - 1}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-30 transition-colors flex items-center gap-1"
            >
              Next Term <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {revealStage < 5 ? (
              <button
                onClick={() => setRevealStage(revealStage + 1)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reveal Next Method ({revealStage + 1}/5)</span>
              </button>
            ) : (
              <button
                onClick={handleNextWord}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
              >
                Done! Next Word →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
