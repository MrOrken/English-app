export type SensoryMethod = 'see' | 'say' | 'move' | 'connect' | 'recall';

export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Academic';

export interface VocabularyWord {
  id: string;
  term: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  emoji?: string;
  imageUrl?: string;
  see: {
    roots: string;
    visualCue: string;
    collocations: string[];
    synonyms: string[];
  };
  say: {
    syllables: string[];
    stressIndex: number;
    pronunciationTip: string;
    mouthShape: string;
  };
  move: {
    actionPrompt: string;
    physicalGesture: string;
    rhythmPattern: string;
    sketchPrompt: string;
  };
  connect: {
    mnemonic: string;
    rhymeHook: string;
    associations: string[];
    conceptCategory: string;
  };
  recall: {
    clozeSentence: string;
    clozeAnswer: string;
    options: string[];
    definitionPrompt: string;
  };
}

export interface VocabularyDeck {
  id: string;
  title: string;
  description: string;
  level: ProficiencyLevel;
  tags: string[];
  emoji?: string;
  unitNumber?: number;
  words: VocabularyWord[];
  isCustom?: boolean;
}

export interface UserWordProgress {
  wordId: string;
  completedSteps: SensoryMethod[];
  personalAnchor?: string;
  confidence: number;
  timesRecalled: number;
  lastPracticed: string;
}

export interface UserAccount {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'teacher';
  grade: string;
  xp: number;
  gems: number;
  streak: number;
  lastActiveDate: string;
  completedWordIds: string[];
}

export interface MethodExploration {
  id: SensoryMethod;
  name: string;
  cognitiveSystem: string;
  tagline: string;
  scientificBasis: string;
  classroomStrategy: string;
  studentTip: string;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
    badge: string;
  };
}
