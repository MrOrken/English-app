import React from 'react';
import { Sparkles, GraduationCap, Presentation, BookOpen, Printer, Compass, Code } from 'lucide-react';

interface TopBarProps {
  currentTab: 'practice' | 'methods' | 'classroom' | 'printables' | 'code' | 'teacher';
  onSelectTab: (tab: 'practice' | 'methods' | 'classroom' | 'printables' | 'code' | 'teacher') => void;
  role: 'student' | 'teacher';
  onToggleRole: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  role,
  onToggleRole,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('practice')}
          className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block leading-tight">
              Memory Boost
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block -mt-0.5">
              5-Method Vocabulary Mastery
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('practice')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'practice'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Practice Loop</span>
          </button>

          <button
            onClick={() => onSelectTab('methods')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'methods'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Method Explorer</span>
          </button>

          <button
            onClick={() => onSelectTab('classroom')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'classroom'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>Classroom Stage</span>
          </button>

          <button
            onClick={() => onSelectTab('printables')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'printables'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Printables</span>
          </button>

          <button
            onClick={() => onSelectTab('code')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'code'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code Guide</span>
          </button>

          {role === 'teacher' && (
            <button
              onClick={() => onSelectTab('teacher')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentTab === 'teacher'
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Deck Studio</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action / Mode Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleRole}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-2 whitespace-nowrap ${
              role === 'teacher'
                ? 'bg-amber-500/10 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20'
                : 'bg-indigo-500/10 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/20'
            }`}
            title="Toggle between Student study mode and Teacher lesson tools"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Role: {role === 'teacher' ? 'Teacher' : 'Student'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
