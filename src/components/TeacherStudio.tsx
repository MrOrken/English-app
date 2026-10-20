import React, { useState } from 'react';
import { VocabularyDeck, VocabularyWord, ProficiencyLevel } from '../types';
import { Plus, Trash2, Edit3, Sparkles, BookOpen, Presentation, Check } from 'lucide-react';
import { saveCustomDeck, deleteCustomDeck } from '../utils/storage';

interface TeacherStudioProps {
  decks: VocabularyDeck[];
  onRefreshDecks: () => void;
  onSelectDeckForPractice: (deck: VocabularyDeck) => void;
}

export const TeacherStudio: React.FC<TeacherStudioProps> = ({
  decks,
  onRefreshDecks,
  onSelectDeckForPractice,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [deckLevel, setDeckLevel] = useState<ProficiencyLevel>('Intermediate');
  const [wordsList, setWordsList] = useState<VocabularyWord[]>([]);

  // Current Word in Form
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentPhonetic, setCurrentPhonetic] = useState('');
  const [currentPos, setCurrentPos] = useState('noun');
  const [currentDefinition, setCurrentDefinition] = useState('');
  const [currentExample, setCurrentExample] = useState('');
  const [currentRoots, setCurrentRoots] = useState('');
  const [currentVisualCue, setCurrentVisualCue] = useState('');
  const [currentActionPrompt, setCurrentActionPrompt] = useState('');
  const [currentMnemonic, setCurrentMnemonic] = useState('');
  const [currentClozeSentence, setCurrentClozeSentence] = useState('');

  const handleAddWordToNewDeck = () => {
    if (!currentTerm.trim() || !currentDefinition.trim()) return;

    const syllables = currentTerm.split(/[-· ]/).filter(Boolean);
    const newWord: VocabularyWord = {
      id: 'custom-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      term: currentTerm.trim(),
      phonetic: currentPhonetic.trim() || `/${currentTerm.toLowerCase()}/`,
      partOfSpeech: currentPos,
      definition: currentDefinition.trim(),
      example: currentExample.trim() || `The ${currentTerm.toLowerCase()} was evident in the outcome.`,
      see: {
        roots: currentRoots.trim() || 'English etymology',
        visualCue: currentVisualCue.trim() || `Picture a bright symbol for ${currentTerm}.`,
        collocations: [`essential ${currentTerm.toLowerCase()}`, `understand the ${currentTerm.toLowerCase()}`],
        synonyms: [],
      },
      say: {
        syllables: syllables.length > 0 ? syllables : [currentTerm],
        stressIndex: 0,
        pronunciationTip: `Pronounce clearly with forward vocal resonance.`,
        mouthShape: 'Relaxed tongue, crisp articulation.',
      },
      move: {
        actionPrompt: currentActionPrompt.trim() || `Use hands to mime the shape and concept of ${currentTerm}.`,
        physicalGesture: 'Concept demonstration gesture',
        rhythmPattern: 'STRONG - short',
        sketchPrompt: `Draw a quick symbol representing ${currentTerm}`,
      },
      connect: {
        mnemonic: currentMnemonic.trim() || `Link ${currentTerm} with something familiar you already know.`,
        rhymeHook: '',
        associations: [currentTerm, 'Classroom lesson'],
        conceptCategory: 'General Vocabulary',
      },
      recall: {
        clozeSentence: currentClozeSentence.trim() || `Can you explain the meaning of ________ in context?`,
        clozeAnswer: currentTerm.trim().toLowerCase(),
        options: [currentTerm.trim().toLowerCase(), 'alternative', 'distractor', 'concept'],
        definitionPrompt: currentDefinition.trim(),
      },
    };

    setWordsList([...wordsList, newWord]);

    // Reset current word form
    setCurrentTerm('');
    setCurrentPhonetic('');
    setCurrentDefinition('');
    setCurrentExample('');
    setCurrentRoots('');
    setCurrentVisualCue('');
    setCurrentActionPrompt('');
    setCurrentMnemonic('');
    setCurrentClozeSentence('');
  };

  const handleSaveDeck = () => {
    if (!deckTitle.trim() || wordsList.length === 0) return;

    const newDeck: VocabularyDeck = {
      id: 'custom-deck-' + Date.now(),
      title: deckTitle.trim(),
      description: deckDescription.trim() || 'Custom teacher vocabulary deck.',
      level: deckLevel,
      tags: ['Custom', 'Teacher Created'],
      words: wordsList,
      isCustom: true,
    };

    saveCustomDeck(newDeck);
    onRefreshDecks();
    setIsCreating(false);
    setDeckTitle('');
    setDeckDescription('');
    setWordsList([]);
  };

  const handleDeleteDeck = (id: string) => {
    deleteCustomDeck(id);
    onRefreshDecks();
  };

  const customDecks = decks.filter((d) => d.isCustom);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Teacher Lesson Studio
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Design targeted multi-sensory vocabulary decks for your classroom curriculum, exams, or reading units.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 self-start cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Custom Deck</span>
          </button>
        )}
      </div>

      {/* Creation Modal / Form */}
      {isCreating && (
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/60 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Create New Vocabulary Deck</span>
            </h2>
            <button
              onClick={() => setIsCreating(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          {/* Deck Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Deck Title *
              </label>
              <input
                type="text"
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                placeholder="e.g. Unit 4: Environmental & Science Terms"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target Level
              </label>
              <select
                value={deckLevel}
                onChange={(e) => setDeckLevel(e.target.value as ProficiencyLevel)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <input
              type="text"
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
              placeholder="e.g. Key vocabulary for upcoming science seminar with multi-sensory drills"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Add Word Sub-form */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Add Words to this Deck ({wordsList.length} added so far)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Vocabulary Term *
                </label>
                <input
                  type="text"
                  value={currentTerm}
                  onChange={(e) => setCurrentTerm(e.target.value)}
                  placeholder="e.g. Obsolete"
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Phonetic (IPA)
                </label>
                <input
                  type="text"
                  value={currentPhonetic}
                  onChange={(e) => setCurrentPhonetic(e.target.value)}
                  placeholder="e.g. /ˌɒb.səˈliːt/"
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Part of Speech
                </label>
                <select
                  value={currentPos}
                  onChange={(e) => setCurrentPos(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="noun">noun</option>
                  <option value="verb">verb</option>
                  <option value="adjective">adjective</option>
                  <option value="adverb">adverb</option>
                  <option value="idiom">idiom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Definition *
                </label>
                <input
                  type="text"
                  value={currentDefinition}
                  onChange={(e) => setCurrentDefinition(e.target.value)}
                  placeholder="e.g. No longer produced or used; out of date."
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Example Sentence
                </label>
                <input
                  type="text"
                  value={currentExample}
                  onChange={(e) => setCurrentExample(e.target.value)}
                  placeholder="e.g. Floppy disks became obsolete after flash drives arrived."
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Sensory method helpers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                  Move (Physical Gesture)
                </label>
                <input
                  type="text"
                  value={currentActionPrompt}
                  onChange={(e) => setCurrentActionPrompt(e.target.value)}
                  placeholder="e.g. Throw an imaginary old phone over your shoulder."
                  className="w-full text-xs p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block mb-1">
                  Connect (Mnemonic Hook)
                </label>
                <input
                  type="text"
                  value={currentMnemonic}
                  onChange={(e) => setCurrentMnemonic(e.target.value)}
                  placeholder="e.g. It was SO LATE to the party, it became OBSOLETE!"
                  className="w-full text-xs p-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block mb-1">
                  Recall (Cloze Sentence)
                </label>
                <input
                  type="text"
                  value={currentClozeSentence}
                  onChange={(e) => setCurrentClozeSentence(e.target.value)}
                  placeholder="e.g. Film cameras were rendered ________ by smartphones."
                  className="w-full text-xs p-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              onClick={handleAddWordToNewDeck}
              disabled={!currentTerm.trim() || !currentDefinition.trim()}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
            >
              + Add Word to List
            </button>
          </div>

          {/* Words Preview in creation form */}
          {wordsList.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 block mb-2">
                Words included in this deck:
              </span>
              <div className="flex flex-wrap gap-2">
                {wordsList.map((w, idx) => (
                  <span
                    key={w.id}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                  >
                    <span>{idx + 1}. {w.term}</span>
                    <button
                      onClick={() => setWordsList(wordsList.filter((item) => item.id !== w.id))}
                      className="text-slate-400 hover:text-rose-500 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Final Save */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDeck}
              disabled={!deckTitle.trim() || wordsList.length === 0}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save & Publish Deck</span>
            </button>
          </div>
        </div>
      )}

      {/* Existing Custom Decks List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Your Custom Classroom Decks ({customDecks.length})
        </h2>

        {customDecks.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No custom decks created yet.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click "New Custom Deck" above to build your first tailored vocabulary set.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customDecks.map((deck) => (
              <div
                key={deck.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold">
                      {deck.level}
                    </span>
                    <button
                      onClick={() => handleDeleteDeck(deck.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete deck"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {deck.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {deck.description}
                  </p>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
                    {deck.words.length} vocabulary words
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onSelectDeckForPractice(deck)}
                    className="flex-1 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Launch Student Practice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
