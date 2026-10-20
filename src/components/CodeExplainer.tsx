import React, { useState } from 'react';
import { Code, Terminal, Copy, Check, FileCode, Layers, Cpu, Globe } from 'lucide-react';

export const CodeExplainer: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'java' | 'html' | 'css' | 'typescript'>('java');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const JAVA_MODEL_CODE = `// VocabularyWord.java - Java Spring Boot Domain Entity
package com.memoryboost.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "vocabulary_words")
public class VocabularyWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String term;

    private String phonetic;
    private String partOfSpeech;

    @Column(length = 1000)
    private String definition;

    @Column(length = 1000)
    private String exampleSentence;

    // 1. SEE: Visual & Morphological Roots
    private String rootEtymology;
    private String visualCue;

    // 2. SAY: Phonological & Syllable Stress
    @ElementCollection
    private List<String> syllables;
    private int primaryStressIndex;
    private String pronunciationTip;

    // 3. MOVE: Embodied Cognition Gesture (TPR)
    private String physicalActionPrompt;
    private String rhythmPattern;

    // 4. CONNECT: Semantic Memory Hook
    private String mnemonicHook;
    private String conceptCategory;

    // 5. RECALL: Retrieval Practice Cloze
    private String clozeSentence;
    private String clozeAnswer;

    // Constructors, Getters & Setters
    public VocabularyWord() {}

    public VocabularyWord(String term, String phonetic, String definition) {
        this.term = term;
        this.phonetic = phonetic;
        this.definition = definition;
    }

    // Business Logic: Evaluates user retrieval match
    public boolean verifyRecall(String attempt) {
        if (attempt == null) return false;
        return this.clozeAnswer.trim().equalsIgnoreCase(attempt.trim());
    }
}`;

  const JAVA_CONTROLLER_CODE = `// VocabularyController.java - Spring Boot REST API
package com.memoryboost.controller;

import com.memoryboost.model.VocabularyWord;
import com.memoryboost.repository.VocabularyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocabulary")
@CrossOrigin(origins = "*")
public class VocabularyController {

    @Autowired
    private VocabularyRepository repository;

    // GET /api/vocabulary - Retrieve all curated words
    @GetMapping
    public List<VocabularyWord> getAllWords() {
        return repository.findAll();
    }

    // GET /api/vocabulary/search?query=resilient
    @GetMapping("/search")
    public List<VocabularyWord> searchWords(@RequestParam String query) {
        return repository.findByTermContainingIgnoreCase(query);
    }

    // POST /api/vocabulary - Teachers create new custom vocabulary entries
    @PostMapping
    public ResponseEntity<VocabularyWord> createWord(@RequestBody VocabularyWord word) {
        VocabularyWord saved = repository.save(word);
        return ResponseEntity.ok(saved);
    }
}`;

  const HTML_SNIPPET = `<!-- index.html - Semantic DOM Structure for Multi-Sensory Stage -->
<main class="max-w-7xl mx-auto px-4 py-8">
  <!-- 5-Step Stepper Navigation -->
  <nav aria-label="Vocabulary sensory steps" class="stepper-grid">
    <button class="step-tab active" data-step="see">1. See</button>
    <button class="step-tab" data-step="say">2. Say</button>
    <button class="step-tab" data-step="move">3. Move</button>
    <button class="step-tab" data-step="connect">4. Connect</button>
    <button class="step-tab" data-step="recall">5. Recall</button>
  </nav>

  <!-- Interactive Kinesthetic Sketchpad Canvas -->
  <section class="move-stage">
    <h3>Kinesthetic Gesture & Doodle</h3>
    <canvas id="gestureCanvas" width="800" height="400" aria-label="Interactive drawing canvas"></canvas>
    <div class="canvas-controls">
      <button id="clearBtn">Clear Doodle</button>
    </div>
  </section>
</main>`;

  const CSS_SNIPPET = `/* index.css - Modern Tailwind & Print Media Stylesheet */
@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    color: #0f172a;
    background-color: #f8fafc;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
  }
}

/* Print Media Stylesheet for Double-Sided Flashcards & Worksheets */
@media print {
  .no-print {
    display: none !important;
  }
  .print-break-inside-avoid {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  body {
    background: white !important;
    color: black !important;
  }
}`;

  const TS_SPEECH_SNIPPET = `// Web Speech API Integration in TypeScript
export function speakWord(text: string, rate: number = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) return resolve();
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // 1.0x normal, 0.65x slow
    utterance.lang = 'en-US';
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-500" />
          <span>Full-Stack Architecture & Code Guide</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          How Memory Boost is Engineered
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Explore the clean code structure behind Memory Boost: from modern semantic HTML & CSS to TypeScript Web APIs and complete Java Spring Boot backend models.
        </p>
      </div>

      {/* Language Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveLang('java')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeLang === 'java'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-amber-500" />
          <span>Java (Spring Boot Models & API)</span>
        </button>

        <button
          onClick={() => setActiveLang('html')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeLang === 'html'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-orange-500" />
          <span>HTML5 (Semantic Stage & DOM)</span>
        </button>

        <button
          onClick={() => setActiveLang('css')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeLang === 'css'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span>CSS & Tailwind (Tokens & Print)</span>
        </button>

        <button
          onClick={() => setActiveLang('typescript')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeLang === 'typescript'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-indigo-500" />
          <span>TypeScript (Web Speech & Canvas APIs)</span>
        </button>
      </div>

      {/* Code Viewer Stage */}
      <div className="bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl font-mono text-xs">
        {activeLang === 'java' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-amber-400 font-bold text-sm block">
                  VocabularyWord.java · Spring Boot JPA Entity
                </span>
                <span className="text-slate-400 text-[11px] font-sans">
                  Represents the 5 cognitive attributes (See, Say, Move, Connect, Recall) mapped to a relational database.
                </span>
              </div>
              <button
                onClick={() => handleCopy(JAVA_MODEL_CODE, 'java-model')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'java-model' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'java-model' ? 'Copied' : 'Copy Java'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 leading-relaxed max-h-96">
              <code>{JAVA_MODEL_CODE}</code>
            </pre>

            <div className="flex items-center justify-between pt-6 pb-4 border-t border-b border-slate-800">
              <div>
                <span className="text-amber-400 font-bold text-sm block">
                  VocabularyController.java · REST Endpoints
                </span>
                <span className="text-slate-400 text-[11px] font-sans">
                  Provides JSON endpoints for fetching curated decks and accepting custom teacher submissions.
                </span>
              </div>
              <button
                onClick={() => handleCopy(JAVA_CONTROLLER_CODE, 'java-ctrl')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'java-ctrl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'java-ctrl' ? 'Copied' : 'Copy Controller'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 leading-relaxed max-h-80">
              <code>{JAVA_CONTROLLER_CODE}</code>
            </pre>
          </div>
        )}

        {activeLang === 'html' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-orange-400 font-bold text-sm block">
                  index.html · Semantic Structure
                </span>
                <span className="text-slate-400 text-[11px] font-sans">
                  Accessible landmark tags, ARIA attributes, and canvas embedding.
                </span>
              </div>
              <button
                onClick={() => handleCopy(HTML_SNIPPET, 'html')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'html' ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 leading-relaxed">
              <code>{HTML_SNIPPET}</code>
            </pre>
          </div>
        )}

        {activeLang === 'css' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-blue-400 font-bold text-sm block">
                  index.css · Design Tokens & Print Rules
                </span>
                <span className="text-slate-400 text-[11px] font-sans">
                  Tailwind v4 integration with print media styling for physical classroom flashcards.
                </span>
              </div>
              <button
                onClick={() => handleCopy(CSS_SNIPPET, 'css')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 leading-relaxed">
              <code>{CSS_SNIPPET}</code>
            </pre>
          </div>
        )}

        {activeLang === 'typescript' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-indigo-400 font-bold text-sm block">
                  speech.ts · Native Web Speech API
                </span>
                <span className="text-slate-400 text-[11px] font-sans">
                  Zero-latency native browser speech synthesis with adjustable rate and pitch.
                </span>
              </div>
              <button
                onClick={() => handleCopy(TS_SPEECH_SNIPPET, 'ts')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'ts' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'ts' ? 'Copied' : 'Copy TS'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-slate-300 leading-relaxed">
              <code>{TS_SPEECH_SNIPPET}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Explanatory notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
            1. Zero External API Keys
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            By utilizing native browser <code className="text-indigo-600 font-mono">window.speechSynthesis</code> and HTML5 Canvas, the application runs instantaneously in any modern browser without network lag or paid API billing.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            2. Offline Persistence
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Teacher-created custom word decks, student completion checkmarks, and personal connection memory anchors are persisted immediately to <code className="text-emerald-600 font-mono">localStorage</code>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
            3. Classroom Print-Ready
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The print layout leverages <code className="text-amber-600 font-mono">@media print</code> and page break constraints so teachers can generate clean paper tests and double-sided flashcards with standard printer settings.
          </p>
        </div>
      </div>
    </div>
  );
};
