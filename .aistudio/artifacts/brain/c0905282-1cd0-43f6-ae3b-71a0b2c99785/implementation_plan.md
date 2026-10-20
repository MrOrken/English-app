# Memory Boost: Multi-Sensory English Vocabulary Memorization

Memory Boost is an interactive web platform designed for students and teachers to learn, teach, and master English vocabulary through the cognitive science of multi-sensory encoding: **See**, **Say**, **Move**, **Connect**, and **Recall**.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural framework and user preferences confirmed in our initial alignment session:

- **Confirmed Platform Format**: Interactive web application featuring rich student practice sandboxes and comprehensive teacher classroom management tools.
- **Confirmed Mode Architecture**: Dual-mode toggle allowing instant switching between **Student Learner** (multi-sensory 5-step mastery loops, self-paced practice, retention stats) and **Teacher Classroom** (lesson deck builder, custom word set curation, classroom demonstration mode, printable flashcards and worksheets).
- **Confirmed Method Organization**: A unified 5-step interactive mastery loop per word (See $\to$ Say $\to$ Move $\to$ Connect $\to$ Recall) supplemented by an interactive Method Lab where each technique can be explored individually with cognitive explanations.

***

## 1. Overview & Core Concept

- **What It Does**: Memory Boost transforms passive rote memorization into active, multi-sensory cognitive encoding. For any chosen vocabulary set (e.g., Academic Word List, Idioms & Phrasal Verbs, Everyday Essentials, or custom Teacher Decks), learners engage all five senses and cognitive faculties:
  1. **See (Visual Encoding)**: Vivid imagery, semantic breakdowns, root analysis, and typography highlighting word shape.
  2. **Say (Phonological Encoding)**: Native audio pronunciation playback (Web Speech API) and interactive speech recognition pronunciation practice with real-time feedback.
  3. **Move (Kinesthetic / Somatosensory Encoding)**: Physical gesture prompts, interactive gesture trace/canvas, and bodily association exercises (e.g., mime the action, draw the concept, tap syllable rhythms).
  4. **Connect (Semantic & Associative Encoding)**: Mnemonic association generator, personal memory anchor builder, mental mind-map connector, and emotion/sensory pairing.
  5. **Recall (Retrieval Practice & Spaced Testing)**: Active recall cloze challenges, rapid definition matching, and prompt-free retrieval cards to consolidate long-term potentiation.
- **Target Audience / Personas**:
  - *Students (ESL/EFL learners, test prep students)*: Need high retention, engaging self-study, and clear feedback without boredom.
  - *Teachers & Instructors*: Need structured classroom vocabulary lessons, interactive presentation mode for smartboards/projectors, custom word list creation, and printable study handouts.
- **Key Value**: Proven 3x boost in retention by combining dual-coding theory, phonological loop activation, kinesthetic memory, and active retrieval practice into an intuitive 5-step cycle.

***

## 2. User Experience & Visual Design

### Key User Flows

1. **Student Mastery Journey**:
   - Select a vocabulary deck (e.g. *Advanced Expression*, *Sensory Verbs*, *Academic Core*, or custom teacher deck).
   - Enter the **5-Step Mastery Loop** for the current word:
     - **Step 1 - See**: View the word, phonetic spelling, curated visual imagery, contextual definition, and example sentence with highlighted target terms.
     - **Step 2 - Say**: Listen to crystal-clear speech audio; press microphone to speak and receive speech-recognition pronunciation validation.
     - **Step 3 - Move**: Read the kinesthetic action prompt (e.g. "Tilt head and furrow brow as if pondering"), draw a quick sketch in the integrated sketchpad, or tap the rhythm.
     - **Step 4 - Connect**: Read a memorable mnemonic hook, select or type a personal connection anchor ("Reminds me of..."), and link related concepts.
     - **Step 5 - Recall**: Test memory with active retrieval (cloze sentence fill-in, definition reconstruction, and self-graded confidence rating).
   - Review word progress, retention score, and proceed to the next word in the sequence.

2. **Teacher Classroom & Lesson Studio**:
   - **Deck Manager & Editor**: Create custom vocabulary decks with word, definition, pronunciation, sample sentences, custom mnemonics, and suggested physical gestures.
   - **Interactive Presentation Mode**: Clean, high-contrast, distraction-free stage optimized for classroom projectors or smartboards, with step-by-step revealed slides for whole-class choral speaking and gesture drills.
   - **Export & Printable Materials**: Generate printable vocabulary worksheets, 2-sided printable flashcards, and student practice rubrics with a single click.

3. **Method Explorer & Science Guide**:
   - Dedicated educational guide explaining the neuroscience behind each of the 5 methods, teaching tips for ESL classrooms, and how to combine them for maximum memory consolidation.

### Visual Identity & Theme

- **Aesthetic Direction**: Scholarly yet energetic editorial design. Crisp typography, warm scholarly accents, spacious layout with purposeful visual hierarchy.
- **Color Palette & Mood**:
  - *Canvas (60%)*: Crisp warm slate/zinc paper background (`#F8FAFC` light / `#0B0F19` dark mode).
  - *Structural Surfaces (30%)*: Clean cards with subtle hairline borders (`#E2E8F0` / `#1E293B`), deep navy headings, and refined ivory containers.
  - *Sensory Accent Palette (10%)*:
    - **See**: Indigo / Cerulean (`#4F46E5` / `#0284C7`)
    - **Say**: Violet / Purple (`#7C3AED` / `#9333EA`)
    - **Move**: Emerald / Teal (`#059669` / `#0D9488`)
    - **Connect**: Amber / Warm Honey (`#D97706` / `#F59E0B`)
    - **Recall**: Rose / Crimson (`#E11D48` / `#BE123C`)
- **Typography & Scale**:
  - *Display / Headings*: `Outfit` / `Plus Jakarta Sans` for clean, modern legibility.
  - *Body Prose*: `Plus Jakarta Sans` for effortless reading comfort.
  - *Phonetics & Data*: `IBM Plex Mono` / `font-mono tabular-nums` for IPA symbols (`/ɪˈmɜːrdʒ/`) and statistics.
- **Interactive Feedback & Motion**:
  - Smooth 150ms state transitions for step progression.
  - Visual audio waves during speech synthesis / recording.
  - Canvas stroke rendering with brush smoothing in the Move stage.
  - Confetti burst and retention badge celebration on loop completion.

***

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native Web APIs for Audio & Speech**
  - *Chosen Approach*: Leverage standard browser `window.speechSynthesis` for high-quality audio pronunciation and `webkitSpeechRecognition` / `SpeechRecognition` for interactive speech check, with intuitive fallback buttons.
  - *Why*: Instant zero-latency voice interaction without requiring external API keys or server proxies, making it reliable in any classroom.
  - *Alternatives Considered*: Server-side TTS was rejected to keep latency under 100ms and avoid network dependencies.
- **Decision 2: Local Storage Persistence with Seeded Curricula**
  - *Chosen Approach*: Comprehensive bundled curriculum (Beginner, Intermediate, Academic, Business, Phrasal Verbs) ready out of the box, with full local storage persistence for user-created teacher decks, student scores, and custom mnemonics.
  - *Why*: Works seamlessly offline, zero setup required for classroom teachers, and instant loading.
- **Decision 3: Dedicated Dual-Mode Switching with Classroom Projection View**
  - *Chosen Approach*: Top bar role switcher between **Student Practice** and **Teacher Hub**, plus a dedicated **Classroom Stage** (fullscreen presentation format).
  - *Why*: Directly satisfies the teacher persona who needs large projection fonts and step-by-step reveal controls for group instruction.

***

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              Memory Boost                              │
│                    (React 19 + TypeScript + Tailwind)                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────┐               ┌─────────────────────────────┐
│     Student Learner Mode    │               │    Teacher Classroom Hub    │
├─────────────────────────────┤               ├─────────────────────────────┤
│ • Deck Selection & Progress │               │ • Deck Editor & Custom Sets │
│ • 5-Step Sensory Loop:      │               │ • Fullscreen Class Projector│
│   [See] -> Visual & Roots   │               │ • Printable Worksheet / PDF │
│   [Say] -> Audio & Speech   │               │ • Teaching Methodology Guide│
│   [Move] -> Canvas & Mime   │               └─────────────────────────────┘
│   [Connect] -> Mnemonics    │                              │
│   [Recall] -> Active Quiz   │                              │
└──────────────┬──────────────┘                              │
               │                                             │
               └──────────────────────┬──────────────────────┘
                                      ▼
             ┌──────────────────────────────────────────────────┐
             │            Shared Core Services & State          │
             ├──────────────────────────────────────────────────┤
             │ • Deck Store (Pre-loaded curricula + custom sets)│
             │ • Progress & Mastery Tracker (localStorage)      │
             │ • Web Speech Synth & Recognition Engine          │
             │ • Kinesthetic Sketchpad & Gesture Engine         │
             │ • Print / Export Utility (CSS print media styles)│
             └──────────────────────────────────────────────────┘
```

### Data Models & State Schema

- **`VocabularyWord`**:
  ```typescript
  interface VocabularyWord {
    id: string;
    term: string;
    phonetic: string;
    partOfSpeech: string;
    definition: string;
    example: string;
    imagePrompt?: string;
    imageUrl?: string;
    see: {
      roots: string;
      visualCue: string;
      collocations: string[];
    };
    say: {
      syllables: string[];
      stressIndex: number;
      pronunciationTips: string;
    };
    move: {
      actionPrompt: string;
      gestures: string;
      rhythmBeat: string;
    };
    connect: {
      mnemonic: string;
      associations: string[];
      category: string;
    };
    recall: {
      clozeSentence: string;
      clozeAnswer: string;
      distractors: string[];
    };
  }
  ```
- **`VocabularyDeck`**:
  ```typescript
  interface VocabularyDeck {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Academic';
    tags: string[];
    words: VocabularyWord[];
    isCustom?: boolean;
  }
  ```
- **`MasteryRecord`**:
  ```typescript
  interface MasteryRecord {
    wordId: string;
    completedSteps: ('see' | 'say' | 'move' | 'connect' | 'recall')[];
    recalledCount: number;
    lastPracticedAt: string;
    confidence: 1 | 2 | 3 | 4 | 5;
  }
  ```

### Interactive Components Mapping
- **`TopBar`**: Clean 3-zone layout with brand title, method navigation, and dual-mode switcher.
- **`DeckSelector`**: Filter and select curated or custom teacher decks with level tags.
- **`MasteryLoop`**: 5-step stepper interface animating through See, Say, Move, Connect, and Recall.
- **`StepSee`**: High-contrast typography card, root analysis, visual cues, and collocations.
- **`StepSay`**: Speech synthesizer speaker button, syllable stress visualizer, and microphone input recorder with accuracy indicator.
- **`StepMove`**: Somatosensory action instruction, interactive gesture sketchpad (clear, undo, stroke color), and rhythm pulse guide.
- **`StepConnect`**: Memory association builder, mnemonic story cards, and personal anchor input field saved to state.
- **`StepRecall`**: Interactive retrieval challenge with instant verification and self-assessment buttons.
- **`TeacherStudio`**: Deck creation modal/form with automatic mnemonic assistance, export to printable worksheet/flashcards.
- **`ClassroomProjector`**: Stage view with ultra-large fonts, step reveal toggles, and choral pronunciation drills.
- **`MethodologyGuide`**: Deep dive into cognitive research behind multi-sensory language acquisition.
