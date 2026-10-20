import React, { useState } from 'react';
import { VocabularyDeck } from '../types';
import { Printer, FileText, CreditCard, Sparkles } from 'lucide-react';

interface PrintableStudioProps {
  decks: VocabularyDeck[];
}

export const PrintableStudio: React.FC<PrintableStudioProps> = ({ decks }) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(decks[0]?.id || '');
  const [printableType, setPrintableType] = useState<'flashcards' | 'worksheet'>('worksheet');

  const currentDeck = decks.find((d) => d.id === selectedDeckId) || decks[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Configuration bar (hidden during print) */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-600" />
            <span>Classroom Print & Export Studio</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate clean, professional worksheets and printable multi-sensory flashcards for physical classroom drills.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Deck selector */}
          <select
            value={selectedDeckId}
            onChange={(e) => setSelectedDeckId(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
          >
            {decks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.words.length} terms)
              </option>
            ))}
          </select>

          {/* Type Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setPrintableType('worksheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                printableType === 'worksheet'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Worksheet</span>
            </button>
            <button
              onClick={() => setPrintableType('flashcards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                printableType === 'flashcards'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>
          </div>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Viewport */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Memory Boost: 5-Method Vocabulary Sheet
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Deck: <strong>{currentDeck.title}</strong> ({currentDeck.level} Level) · Techniques: See · Say · Move · Connect · Recall
            </p>
          </div>
          <div className="text-right text-xs text-slate-700 space-y-1">
            <div>Name: ______________________</div>
            <div>Date: _________ Class: _______</div>
          </div>
        </div>

        {printableType === 'worksheet' ? (
          /* WORKSHEET FORMAT */
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs text-slate-700 print-break-inside-avoid">
              <strong>Instructions:</strong> Complete each section using the 5 sensory methods. Pronounce aloud, practice the physical gesture with a partner, and test yourself on the cloze sentence.
            </div>

            <div className="space-y-6">
              {currentDeck.words.map((w, index) => (
                <div
                  key={w.id}
                  className="border border-slate-300 rounded-xl p-4 space-y-3 print-break-inside-avoid bg-white"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {w.term}
                      </h3>
                      <span className="font-mono text-xs text-slate-600">
                        {w.phonetic}
                      </span>
                      <span className="text-xs italic text-slate-500">
                        ({w.partOfSpeech})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span>Checklist:</span>
                      <span className="border border-slate-400 px-1 py-0.5 rounded">See □</span>
                      <span className="border border-slate-400 px-1 py-0.5 rounded">Say □</span>
                      <span className="border border-slate-400 px-1 py-0.5 rounded">Move □</span>
                      <span className="border border-slate-400 px-1 py-0.5 rounded">Connect □</span>
                      <span className="border border-slate-400 px-1 py-0.5 rounded">Recall □</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <strong className="text-slate-700 block mb-0.5">1. Meaning & Context:</strong>
                      <p className="text-slate-800 leading-relaxed">{w.definition}</p>
                      <p className="text-slate-600 italic mt-1">"{w.example}"</p>
                    </div>

                    <div>
                      <strong className="text-slate-700 block mb-0.5">2. Move (Gesture):</strong>
                      <p className="text-slate-800 leading-relaxed font-medium">"{w.move.actionPrompt}"</p>
                      <div className="mt-2 text-[11px] text-slate-500">
                        Rhythm: <span className="font-mono">{w.move.rhythmPattern}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
                    <div>
                      <strong className="text-slate-700 block mb-0.5">3. Memory Hook (Connect):</strong>
                      <p className="text-slate-800">{w.connect.mnemonic}</p>
                      <div className="mt-2 text-slate-500">
                        My Personal Anchor: ____________________________________
                      </div>
                    </div>

                    <div>
                      <strong className="text-slate-700 block mb-0.5">4. Retrieval Practice (Recall):</strong>
                      <p className="text-slate-800 font-medium">
                        Fill in: {w.recall.clozeSentence}
                      </p>
                      <div className="mt-2 text-slate-500">
                        My Answer: ____________________________________
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* FLASHCARD FORMAT */
          <div>
            <div className="text-xs text-slate-500 mb-4 no-print">
              Cut along the dashed lines. Fold along center or glue back-to-back for 2-sided multi-sensory flashcards.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentDeck.words.map((w, index) => (
                <div
                  key={w.id}
                  className="border-2 border-dashed border-slate-400 rounded-xl p-5 space-y-3 print-break-inside-avoid bg-white"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold">
                      Card #{index + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      {w.partOfSpeech}
                    </span>
                  </div>

                  {/* Front: Word & Audio/Movement cues */}
                  <div className="text-center py-2">
                    <h2 className="text-3xl font-extrabold text-slate-900">
                      {w.term}
                    </h2>
                    <p className="font-mono text-sm text-slate-600 mt-1">
                      {w.phonetic}
                    </p>
                    <div className="mt-2 text-xs text-emerald-800 font-medium bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      <strong>Move:</strong> {w.move.actionPrompt}
                    </div>
                  </div>

                  {/* Back: Meaning & Mnemonic */}
                  <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5">
                    <p className="font-semibold text-slate-900">
                      {w.definition}
                    </p>
                    <p className="text-slate-600 italic">
                      "{w.example}"
                    </p>
                    <p className="text-amber-800 bg-amber-50 p-1.5 rounded text-[11px]">
                      <strong>Hook:</strong> {w.connect.mnemonic}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-center text-[11px] text-slate-500">
          Memory Boost Vocabulary System · Based on Allan Paivio's Dual-Coding & Embodied Cognition Framework
        </div>
      </div>
    </div>
  );
};
