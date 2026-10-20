import React from 'react';
import { UserAccount } from '../types';
import { Sparkles, Flame, Gem, Star, GraduationCap, UserCircle, FolderDown } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface KidsHeaderProps {
  user: UserAccount;
  currentTab: 'path' | 'methods' | 'classroom' | 'printables' | 'teacher';
  onSelectTab: (tab: 'path' | 'methods' | 'classroom' | 'printables' | 'teacher') => void;
  onOpenAccountModal: () => void;
}

export const KidsHeader: React.FC<KidsHeaderProps> = ({
  user,
  currentTab,
  onSelectTab,
  onOpenAccountModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 transition-colors no-print">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => onSelectTab('path')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-[0_4px_0_#047857] group-active:translate-y-1 group-active:shadow-none transition-all">
            ⚡
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none block">
              Memory Boost
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
              Learn Words 5 Ways!
            </span>
          </div>
        </button>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectTab('path')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'path'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Learn
          </button>

          <button
            onClick={() => onSelectTab('methods')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              currentTab === 'methods'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            5 Methods
          </button>

          <button
            onClick={() => onSelectTab('classroom')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer hidden md:flex items-center gap-1 ${
              currentTab === 'classroom'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Projector
          </button>

          <button
            onClick={() => onSelectTab('printables')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer hidden md:flex items-center gap-1 ${
              currentTab === 'printables'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Cards & Print
          </button>
        </nav>

        {/* Right Stats & Profile (Duolingo Style: Streak, Gems, XP, Avatar) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 font-extrabold text-xs" title="Daily Streak">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span className="tabular-nums">{user.streak}</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 font-extrabold text-xs hidden sm:flex" title="Reward Gems">
            <Gem className="w-4 h-4 fill-cyan-500 text-cyan-500" />
            <span className="tabular-nums">{user.gems}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 font-extrabold text-xs" title="Total XP">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="tabular-nums">{user.xp} XP</span>
          </div>

          {/* Download Project ZIP Button */}
          <a
            href="/Memory-Boost-Project.zip"
            download="Memory-Boost-Project.zip"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-[0_3px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
            title="Жобаны ZIP архив ретінде жүктеп алу / Download Project ZIP"
          >
            <FolderDown className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden md:inline">Жоба ZIP</span>
            <span className="md:hidden">ZIP</span>
          </a>

          {/* Install PWA Button */}
          <PWAInstallButton />

          {/* User Profile Avatar Button */}
          <button
            onClick={onOpenAccountModal}
            className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            title="Switch or Create Account"
          >
            <span className="text-base leading-none">{user.avatar}</span>
            <span className="max-w-[70px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
