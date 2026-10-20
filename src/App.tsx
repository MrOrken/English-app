/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { KidsHeader } from './components/KidsHeader';
import { DuolingoPath } from './components/DuolingoPath';
import { KidsLessonPlayer } from './components/KidsLessonPlayer';
import { AccountModal } from './components/AccountModal';
import { MethodLab } from './components/MethodLab';
import { ClassroomProjector } from './components/ClassroomProjector';
import { PrintableStudio } from './components/PrintableStudio';
import { TeacherStudio } from './components/TeacherStudio';
import { CodeExplainer } from './components/CodeExplainer';
import { VocabularyDeck, UserAccount } from './types';
import { getAllDecks, getActiveAccount } from './utils/storage';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount>(getActiveAccount());
  const [currentTab, setCurrentTab] = useState<'path' | 'methods' | 'classroom' | 'printables' | 'teacher'>('path');
  const [decks, setDecks] = useState<VocabularyDeck[]>([]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Active Lesson State
  const [activeLessonDeck, setActiveLessonDeck] = useState<VocabularyDeck | null>(null);
  const [activeLessonWordIndex, setActiveLessonWordIndex] = useState<number>(0);

  // Initialize
  useEffect(() => {
    setCurrentUser(getActiveAccount());
    setDecks(getAllDecks());
  }, []);

  const handleRefreshDecks = () => {
    setDecks(getAllDecks());
  };

  const handleStartWordLesson = (deck: VocabularyDeck, wordIndex: number) => {
    setActiveLessonDeck(deck);
    setActiveLessonWordIndex(wordIndex);
  };

  const handleFinishWordLesson = () => {
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setActiveLessonDeck(null);
    setCurrentUser(getActiveAccount());
    setDecks(getAllDecks());
  };

  const handleAccountChange = (acc: UserAccount) => {
    setCurrentUser(acc);
    setDecks(getAllDecks());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Gamified Minimalist Top Bar */}
      <KidsHeader
        user={currentUser}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        {currentTab === 'path' && (
          <DuolingoPath
            decks={decks}
            user={currentUser}
            onStartWordLesson={handleStartWordLesson}
            onOpenDeckReview={(deck) => handleStartWordLesson(deck, 0)}
          />
        )}

        {currentTab === 'methods' && <MethodLab />}

        {currentTab === 'classroom' && (
          <ClassroomProjector
            decks={decks}
            onExit={() => setCurrentTab('path')}
          />
        )}

        {currentTab === 'printables' && <PrintableStudio decks={decks} />}

        {currentTab === 'teacher' && (
          <TeacherStudio
            decks={decks}
            onRefreshDecks={handleRefreshDecks}
            onSelectDeckForPractice={(deck) => handleStartWordLesson(deck, 0)}
          />
        )}
      </main>

      {/* Active Kid Lesson Player (Full-screen Duolingo style modal) */}
      {activeLessonDeck && (
        <KidsLessonPlayer
          deck={activeLessonDeck}
          wordIndex={activeLessonWordIndex}
          onClose={() => setActiveLessonDeck(null)}
          onFinishWord={handleFinishWordLesson}
        />
      )}

      {/* Account Modal (Join or Create Account) */}
      {isAccountModalOpen && (
        <AccountModal
          currentAccount={currentUser}
          onClose={() => setIsAccountModalOpen(false)}
          onAccountChange={handleAccountChange}
        />
      )}

      {/* Footer */}
      <footer className="border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <span>⚡ Memory Boost</span>
            <span>·</span>
            <span>5-Method Learning for Kids & Teachers</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setCurrentTab('teacher')}
              className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
            >
              Teacher Deck Studio
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setCurrentTab('classroom')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Smartboard Projector
            </button>
            <span className="text-slate-300">·</span>
            <a
              href="/Memory-Boost-Project.zip"
              download="Memory-Boost-Project.zip"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
              title="Жобаны компьютерге ZIP файл қылып жүктеу"
            >
              📦 Жоба архиві (ZIP)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
