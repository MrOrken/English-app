import { MethodExploration } from '../types';

export const SENSORY_METHODS: MethodExploration[] = [
  {
    id: 'see',
    name: 'See',
    cognitiveSystem: 'Visual Cortex & Dual Coding Theory',
    tagline: 'Encode the orthographic, morphological, and pictorial imagery of the word.',
    scientificBasis:
      'Allan Paivio’s Dual Coding Theory proves that combining verbal information with vivid mental or pictorial imagery creates two separate associative memory traces in the brain, doubling retention probability compared to text alone.',
    classroomStrategy:
      'Flash image cards before revealing spelling. Color-code morphological roots, prefixes, and suffixes. Have students analyze the word’s visual silhouette and create visual mind maps on the whiteboard.',
    studentTip:
      'Don’t just glance at the letters. Picture a high-contrast mental movie featuring the word in action, and note the prefix or root.',
    colorScheme: {
      bg: 'bg-indigo-50/70 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-800',
      accent: 'text-indigo-600 dark:text-indigo-400',
      badge: 'bg-indigo-600 text-white',
    },
  },
  {
    id: 'say',
    name: 'Say',
    cognitiveSystem: 'Phonological Loop & Auditory Motor Cortex',
    tagline: 'Articulate the phonemes, emphasize the stressed syllable, and vocalize aloud.',
    scientificBasis:
      'Baddeley’s model of working memory identifies the Phonological Loop as essential for language acquisition. Speaking activates motor-speech areas (Broca’s area) and acoustic processing (Wernicke’s area), forging a muscular memory of pronunciation.',
    classroomStrategy:
      'Use choral repetition drills with dynamic volume (whisper then shout). Exaggerate the stressed syllable with a clap or desk tap. Conduct paired pronunciation checks with speech recognition tools.',
    studentTip:
      'Say the word aloud at least three times. Pay close attention to which syllable carries the primary stress and feels loudest on your tongue.',
    colorScheme: {
      bg: 'bg-purple-50/70 dark:bg-purple-950/20',
      border: 'border-purple-200 dark:border-purple-800',
      accent: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-600 text-white',
    },
  },
  {
    id: 'move',
    name: 'Move',
    cognitiveSystem: 'Embodied Cognition & Somatosensory Motor Cortex',
    tagline: 'Pair the vocabulary term with a physical gesture, sketch, or bodily movement.',
    scientificBasis:
      'Embodied Cognition research demonstrates that physical motor enactment (Total Physical Response - TPR) creates motor cortex neural pathways. When you physically mime an action or trace a shape, recall rates increase by up to 75%.',
    classroomStrategy:
      'Assign an iconic hand gesture or full-body pose to every new vocabulary item. Have students mirror you, then conduct "Freeze & Act" games where hearing the word triggers the gesture immediately.',
    studentTip:
      'Perform a physical action every time you review the word. Even a subtle finger movement or quick sketchpad doodle anchors the definition in muscle memory.',
    colorScheme: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      accent: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-600 text-white',
    },
  },
  {
    id: 'connect',
    name: 'Connect',
    cognitiveSystem: 'Elaborative Rehearsal & Semantic Association Networks',
    tagline: 'Bridge the new word to familiar memories, phonetic puns, and emotional anchors.',
    scientificBasis:
      'Craik & Lockhart’s Levels of Processing framework demonstrates that deep semantic elaboration produces the strongest long-term memory traces. Meaningful associations hook into existing hippocampal schemas rather than floating in isolation.',
    classroomStrategy:
      'Ask students: "What sound does this word remind you of in your native language?" or "When was the last time you felt this way?" Encourage funny, exaggerated, or emotional mnemonic stories.',
    studentTip:
      'Invent a ridiculous or personal story. The funnier, weirder, or more personal the connection is, the faster your brain will retrieve it during conversations.',
    colorScheme: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-800',
      accent: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-600 text-white',
    },
  },
  {
    id: 'recall',
    name: 'Recall',
    cognitiveSystem: 'Retrieval Practice Effect & Spaced Consolidation',
    tagline: 'Test your retrieval strength under active challenge without looking at the answer.',
    scientificBasis:
      'The "Testing Effect" (Roediger & Karpicke) proves that actively pulling an answer out of memory alters neural pathways more than re-reading notes five times. Effortful retrieval halts the Ebbinghaus forgetting curve.',
    classroomStrategy:
      'Use cloze sentences, 5-second rapid-fire recall rounds, and prompt-free definition reconstruction before providing answers. Ask students to self-rate their retrieval confidence.',
    studentTip:
      'Never flip the flashcard right away. Force your brain to search for 3-5 seconds. That brief struggle is the exact moment permanent memory connections are forged.',
    colorScheme: {
      bg: 'bg-rose-50/70 dark:bg-rose-950/20',
      border: 'border-rose-200 dark:border-rose-800',
      accent: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-600 text-white',
    },
  },
];
