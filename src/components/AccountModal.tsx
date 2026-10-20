import React, { useState } from 'react';
import { UserAccount } from '../types';
import { getStoredAccounts, setActiveAccountId, createAccount, DEFAULT_AVATARS } from '../utils/storage';
import { X, UserPlus, Check, Sparkles, GraduationCap, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AccountModalProps {
  currentAccount: UserAccount;
  onClose: () => void;
  onAccountChange: (account: UserAccount) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  currentAccount,
  onClose,
  onAccountChange,
}) => {
  const [mode, setMode] = useState<'switch' | 'create'>('switch');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [grade, setGrade] = useState('Grade 2-3');
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  const accounts = getStoredAccounts();

  const handleSelectAccount = (acc: UserAccount) => {
    setActiveAccountId(acc.id);
    onAccountChange(acc);
    onClose();
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAcc = createAccount({
      name: name.trim(),
      avatar: selectedAvatar,
      role,
      grade,
    });

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    onAccountChange(newAcc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch: Join Existing or Create New */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setMode('switch')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              mode === 'switch'
                ? 'bg-emerald-500 text-white shadow-[0_3px_0_#047857]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Switch Profile ({accounts.length})
          </button>
          <button
            onClick={() => setMode('create')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              mode === 'create'
                ? 'bg-emerald-500 text-white shadow-[0_3px_0_#047857]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            + Create Account
          </button>
        </div>

        {mode === 'switch' ? (
          /* LIST SAVED ACCOUNTS */
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Select Your Profile:
            </h3>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {accounts.map((acc) => {
                const isCurrent = acc.id === currentAccount.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectAccount(acc)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {acc.avatar}
                      </span>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{acc.name}</span>
                          {acc.role === 'teacher' && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                              Teacher
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {acc.grade} · ⭐ {acc.xp} XP · 🔥 {acc.streak} day streak
                        </div>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setMode('create')}
              className="w-full mt-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Another Student or Teacher Account</span>
            </button>
          </div>
        ) : (
          /* CREATE ACCOUNT FORM */
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                Your Name / Nickname *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Leo or Emma"
                required
                className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1.5">
                Choose Your Animal Avatar:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DEFAULT_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.emoji)}
                    className={`p-2.5 rounded-2xl border-2 text-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedAvatar === av.emoji
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 scale-105 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span>{av.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-1 truncate max-w-full">
                      {av.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                  Grade Level:
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="Grade 1-2">Grade 1-2 (Beginner)</option>
                  <option value="Grade 3-4">Grade 3-4 (Intermediate)</option>
                  <option value="Grade 5-6">Grade 5-6 (Advanced)</option>
                  <option value="Teacher / Parent">Teacher / Parent</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                  Role:
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
                  className="w-full p-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="student">Student Learner</option>
                  <option value="teacher">Classroom Teacher</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-3.5 mt-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-extrabold text-sm shadow-[0_4px_0_#047857] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Learning Adventure!</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
