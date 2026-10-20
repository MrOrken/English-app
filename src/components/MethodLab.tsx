import React, { useState } from 'react';
import { SENSORY_METHODS } from '../data/methodsData';
import { SensoryMethod } from '../types';
import { Eye, Volume2, Activity, Link2, HelpCircle, BookOpen, Lightbulb, GraduationCap, CheckCircle } from 'lucide-react';
import { speakWord } from '../utils/speech';

export const MethodLab: React.FC = () => {
  const [activeMethodId, setActiveMethodId] = useState<SensoryMethod>('see');
  const [sandboxWord, setSandboxWord] = useState('Resilient');
  const [sandboxMnemonic, setSandboxMnemonic] = useState('Silicon rubber bounces back from hardship');
  const [tryTapCount, setTryTapCount] = useState(0);

  const activeMethod = SENSORY_METHODS.find((m) => m.id === activeMethodId) || SENSORY_METHODS[0];

  const handleTestSpeech = () => {
    speakWord(sandboxWord, 0.9);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cognitive Neuroscience of Vocabulary Acquisition</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          The 5 Memorization Methods
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Why rote flashcards fail: the brain requires multi-sensory encoding to move short-term working memory into long-term hippocampal storage. Explore each method's cognitive mechanism below.
        </p>
      </div>

      {/* Method Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        {SENSORY_METHODS.map((m) => {
          const isActive = activeMethodId === m.id;
          const icons = {
            see: Eye,
            say: Volume2,
            move: Activity,
            connect: Link2,
            recall: HelpCircle,
          };
          const Icon = icons[m.id];

          return (
            <button
              key={m.id}
              onClick={() => setActiveMethodId(m.id)}
              className={`p-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Exploration Spotlight */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Core Methodology Intro */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeMethod.colorScheme.badge}`}>
              Method: {activeMethod.name}
            </span>
            <span className="text-xs font-mono text-slate-500">
              {activeMethod.cognitiveSystem}
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {activeMethod.tagline}
          </h2>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Scientific Foundation & Neural Evidence</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {activeMethod.scientificBasis}
            </p>
          </div>
        </div>

        {/* Dual Pillar: Classroom Strategy for Teachers vs Student Self-Study Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-950 dark:text-indigo-200 mb-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Teacher Classroom Strategy</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {activeMethod.classroomStrategy}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-950 dark:text-emerald-200 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Student Self-Study Technique</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {activeMethod.studentTip}
            </p>
          </div>
        </div>

        {/* Interactive Method Mini-Sandbox */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Interactive Mini-Sandbox: Try the "{activeMethod.name}" Technique
          </h3>

          {activeMethodId === 'see' && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-400">Sample Orthographic Root Breakdown:</span>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-wider">
                  re · <span className="underline decoration-wavy decoration-indigo-400">sil</span> · i · ent
                </div>
                <p className="text-xs text-slate-500">
                  prefix "re-" (back) + root "salire" (leap) = Bounces back!
                </p>
              </div>
              <div className="text-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Visual Movie:</span>
                <span className="text-xs text-slate-500 italic block">"A green bamboo stalk bending in a storm, then springing straight upright."</span>
              </div>
            </div>
          )}

          {activeMethodId === 'say' && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-400">Phonological Loop Vocalizer:</span>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  /rɪˈzɪl.i.ənt/
                </div>
                <p className="text-xs text-slate-500">
                  Hear the stressed second syllable buzz like a spring!
                </p>
              </div>
              <button
                onClick={handleTestSpeech}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Vocal Demonstration</span>
              </button>
            </div>
          )}

          {activeMethodId === 'move' && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-400">Total Physical Response (TPR) Motor Drill:</span>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  Push palms down $\to$ Spring arms high!
                </div>
                <p className="text-xs text-slate-500">
                  Physical enactment activates the premotor cortex and doubles recall speed.
                </p>
              </div>
              <button
                onClick={() => setTryTapCount(tryTapCount + 1)}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                <span>Perform Gesture ({tryTapCount} times)</span>
              </button>
            </div>
          )}

          {activeMethodId === 'connect' && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs text-slate-400">Semantic Bridge & Mnemonic Hook Builder:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sandboxMnemonic}
                  onChange={(e) => setSandboxMnemonic(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="Enter a funny or personal memory hook..."
                />
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 block">
                💡 The funnier or more exaggerated the story, the deeper the neural groove in your memory.
              </span>
            </div>
          )}

          {activeMethodId === 'recall' && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3 text-center sm:text-left">
              <span className="text-xs text-slate-400">Retrieval Practice Effect:</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                "The ________ community rebuilt their town within months after the flood."
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['resilient', 'monotonous', 'fragile', 'ambiguous'].map((choice, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      choice === 'resilient'
                        ? 'bg-rose-50 border-rose-400 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600'
                    }`}
                  >
                    {choice}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
