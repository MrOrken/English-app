import { VocabularyDeck, UserWordProgress, SensoryMethod, UserAccount } from '../types';
import { DEFAULT_DECKS } from '../data/defaultDecks';

const CUSTOM_DECKS_KEY = 'memory_boost_custom_decks';
const PROGRESS_KEY = 'memory_boost_progress';
const ACCOUNTS_KEY = 'memory_boost_accounts';
const ACTIVE_ACCOUNT_ID_KEY = 'memory_boost_active_account_id';

export const DEFAULT_AVATARS = [
  { id: 'lion', label: 'Leo the Lion', emoji: '🦁', color: 'bg-amber-100 text-amber-700' },
  { id: 'owl', label: 'Oliver the Owl', emoji: '🦉', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'fox', label: 'Fiona the Fox', emoji: '🦊', color: 'bg-orange-100 text-orange-700' },
  { id: 'bear', label: 'Barnaby Bear', emoji: '🐻', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'bunny', label: 'Bella Bunny', emoji: '🐰', color: 'bg-pink-100 text-pink-700' },
  { id: 'frog', label: 'Frankie Frog', emoji: '🐸', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'teacher', label: 'Teacher Star', emoji: '👩‍🏫', color: 'bg-purple-100 text-purple-700' },
];

export function getStoredAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) {
      // Create a default initial account for easy zero-setup start
      const defaultUser: UserAccount = {
        id: 'user-default',
        name: 'Alex Explorer',
        avatar: '🦁',
        role: 'student',
        grade: 'Grade 2-3',
        xp: 120,
        gems: 35,
        streak: 3,
        lastActiveDate: new Date().toISOString(),
        completedWordIds: [],
      };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([defaultUser]));
      localStorage.setItem(ACTIVE_ACCOUNT_ID_KEY, defaultUser.id);
      return [defaultUser];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading accounts:', err);
    return [];
  }
}

export function getActiveAccount(): UserAccount {
  const accounts = getStoredAccounts();
  if (typeof window === 'undefined' || accounts.length === 0) {
    return {
      id: 'guest',
      name: 'Guest Learner',
      avatar: '🦁',
      role: 'student',
      grade: 'Grade 1-3',
      xp: 0,
      gems: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString(),
      completedWordIds: [],
    };
  }

  const activeId = localStorage.getItem(ACTIVE_ACCOUNT_ID_KEY);
  const found = accounts.find((a) => a.id === activeId);
  return found || accounts[0];
}

export function setActiveAccountId(id: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACTIVE_ACCOUNT_ID_KEY, id);
  }
}

export function createAccount(data: {
  name: string;
  avatar: string;
  role: 'student' | 'teacher';
  grade?: string;
}): UserAccount {
  const accounts = getStoredAccounts();
  const newAccount: UserAccount = {
    id: 'user-' + Date.now(),
    name: data.name.trim() || 'Learner',
    avatar: data.avatar || '🦁',
    role: data.role || 'student',
    grade: data.grade || 'Grade 1-3',
    xp: 0,
    gems: 10,
    streak: 1,
    lastActiveDate: new Date().toISOString(),
    completedWordIds: [],
  };

  accounts.push(newAccount);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(ACTIVE_ACCOUNT_ID_KEY, newAccount.id);
  }
  return newAccount;
}

export function updateActiveAccountRewards(xpGained: number, gemsGained: number, completedWordId?: string): UserAccount {
  const accounts = getStoredAccounts();
  const current = getActiveAccount();

  const idx = accounts.findIndex((a) => a.id === current.id);
  if (idx >= 0) {
    accounts[idx].xp += xpGained;
    accounts[idx].gems += gemsGained;
    accounts[idx].lastActiveDate = new Date().toISOString();

    if (completedWordId && !accounts[idx].completedWordIds.includes(completedWordId)) {
      accounts[idx].completedWordIds.push(completedWordId);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }
    return accounts[idx];
  }
  return current;
}

export function getAllDecks(): VocabularyDeck[] {
  if (typeof window === 'undefined') return DEFAULT_DECKS;
  try {
    const raw = localStorage.getItem(CUSTOM_DECKS_KEY);
    const custom: VocabularyDeck[] = raw ? JSON.parse(raw) : [];
    return [...DEFAULT_DECKS, ...custom];
  } catch (err) {
    console.error('Error loading decks:', err);
    return DEFAULT_DECKS;
  }
}

export function saveCustomDeck(deck: VocabularyDeck): void {
  try {
    const raw = localStorage.getItem(CUSTOM_DECKS_KEY);
    const custom: VocabularyDeck[] = raw ? JSON.parse(raw) : [];
    const index = custom.findIndex((d) => d.id === deck.id);
    if (index >= 0) {
      custom[index] = { ...deck, isCustom: true };
    } else {
      custom.push({ ...deck, isCustom: true });
    }
    localStorage.setItem(CUSTOM_DECKS_KEY, JSON.stringify(custom));
  } catch (err) {
    console.error('Failed to save deck:', err);
  }
}

export function deleteCustomDeck(deckId: string): void {
  try {
    const raw = localStorage.getItem(CUSTOM_DECKS_KEY);
    if (!raw) return;
    const custom: VocabularyDeck[] = JSON.parse(raw);
    const filtered = custom.filter((d) => d.id !== deckId);
    localStorage.setItem(CUSTOM_DECKS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete deck:', err);
  }
}

export function getAllProgress(): Record<string, UserWordProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Error loading progress:', err);
    return {};
  }
}

export function getWordProgress(wordId: string): UserWordProgress | undefined {
  const all = getAllProgress();
  return all[wordId];
}

export function updateWordStep(wordId: string, step: SensoryMethod, personalAnchor?: string): UserWordProgress {
  const all = getAllProgress();
  const existing: UserWordProgress = all[wordId] || {
    wordId,
    completedSteps: [],
    confidence: 3,
    timesRecalled: 0,
    lastPracticed: new Date().toISOString(),
  };

  const stepsSet = new Set(existing.completedSteps);
  const isNewStep = !stepsSet.has(step);
  stepsSet.add(step);
  existing.completedSteps = Array.from(stepsSet) as SensoryMethod[];
  existing.lastPracticed = new Date().toISOString();

  if (step === 'recall') {
    existing.timesRecalled = (existing.timesRecalled || 0) + 1;
  }
  if (personalAnchor) {
    existing.personalAnchor = personalAnchor;
  }

  all[wordId] = existing;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed saving progress:', err);
  }

  // Award XP to active user account!
  if (isNewStep) {
    const isMastered = existing.completedSteps.length === 5;
    updateActiveAccountRewards(20, isMastered ? 5 : 1, isMastered ? wordId : undefined);
  }

  return existing;
}

export function setWordConfidence(wordId: string, confidence: number): void {
  const all = getAllProgress();
  if (all[wordId]) {
    all[wordId].confidence = confidence;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    } catch (err) {
      console.error('Failed saving confidence:', err);
    }
  }
}
