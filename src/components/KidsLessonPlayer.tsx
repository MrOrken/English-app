import React, { useState, useRef, useEffect } from 'react';
import { VocabularyDeck, VocabularyWord, SensoryMethod } from '../types';
import { X, Volume2, Mic, Activity, Heart, Star, Sparkles, Check, ArrowRight, RotateCcw, PenTool, Lightbulb, Trophy } from 'lucide-react';
import { speakWord, startSpeechCheck, isSpeechRecognitionSupported } from '../utils/speech';
import { updateWordStep, getWordProgress } from '../utils/storage';
import confetti from 'canvas-confetti';

interface KidsLessonPlayerProps {
  deck: VocabularyDeck;
  wordIndex: number;
  onClose: () => void;
  onFinishWord: () => void;
}

const STEPS: SensoryMethod[] = ['see', 'say', 'move', 'connect', 'recall'];

export const KidsLessonPlayer: React.FC<KidsLessonPlayerProps> = ({
  deck,
  wordIndex,
  onClose,
  onFinishWord,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = STEPS[stepIndex];
  const word: VocabularyWord = deck.words[wordIndex] || deck.words[0];

  // Speech state
  const [isListening, setIsListening] = useState(false);
  const [speechSuccess, setSpeechSuccess] = useState<boolean | null>(null);
  const [spokenTranscript, setSpokenTranscript] = useState('');

  // Move canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Connect personal anchor
  const [personalAnchor, setPersonalAnchor] = useState('');

  // Recall quiz state
  const [selectedRecallOption, setSelectedRecallOption] = useState<string | null>(null);
  const [isRecallChecked, setIsRecallChecked] = useState(false);
  const [isRecallCorrect, setIsRecallCorrect] = useState(false);

  // Load existing personal anchor
  useEffect(() => {
    const p = getWordProgress(word.id);
    if (p?.personalAnchor) setPersonalAnchor(p.personalAnchor);
    // Play word audio once when step 1 opens
    if (stepIndex === 0) {
      speakWord(word.term, 0.95);
    }
  }, [word.id, stepIndex]);

  // Setup canvas when on "move" step
  useEffect(() => {
    if (currentStep === 'move' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = canvas.parentElement?.clientWidth || 360;
        canvas.height = 180;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 4;
      }
    }
  }, [currentStep]);

  const handleSpeakWord = (rate: number = 0.95) => {
    speakWord(word.term, rate);
  };

  const handleStartMic = () => {
    setIsListening(true);
    setSpeechSuccess(null);
    setSpokenTranscript('');

    startSpeechCheck(
      word.term,
      (res) => {
        setIsListening(false);
        setSpokenTranscript(res.transcript);
        setSpeechSuccess(res.isMatch);
        if (res.isMatch) {
          updateWordStep(word.id, 'say');
          try {
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
          } catch {
            // ignore
          }
        }
      },
      () => {
        setIsListening(false);
        setSpeechSuccess(false);
      }
    );
  };

  // Canvas drawing handlers
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(cx - rect.left, cy - rect.top);
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(cx - rect.left, cy - rect.top);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Handle Recall Quiz Selection
  const handleSelectRecall = (opt: string) => {
    if (isRecallChecked) return;
    setSelectedRecallOption(opt);
    const correct = opt.toLowerCase() === word.recall.clozeAnswer.toLowerCase();
    setIsRecallCorrect(correct);
    setIsRecallChecked(true);

    if (correct) {
      updateWordStep(word.id, 'recall');
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  // Advance to next step or complete word
  const handleContinue = () => {
    // Record current step in storage
    updateWordStep(word.id, currentStep, currentStep === 'connect' ? personalAnchor : undefined);

    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
      // Reset quiz for next time
      setIsRecallChecked(false);
      setSelectedRecallOption(null);
    } else {
      // Completed all 5 steps!
      onFinishWord();
    }
  };

  const progressPercent = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col justify-between">
      {/* Top Header with Progress Bar (Duolingo Style) */}
      <div className="max-w-2xl w-full mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Animated Green Progress Bar */}
          <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_2px_0_#047857]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1 text-amber-500 font-black text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>+20 XP</span>
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {STEPS.map((s, idx) => (
            <span
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                idx === stepIndex
                  ? 'w-8 bg-emerald-500'
                  : idx < stepIndex
                  ? 'w-4 bg-emerald-400 opacity-60'
                  : 'w-4 bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center overflow-y-auto">
        {/* STEP 1: SEE */}
        {currentStep === 'see' && (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
              <span>👁️ STEP 1 · SEE & PICTURE</span>
            </div>

            {/* Giant Word Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm relative">
              <span className="text-6xl block mb-2">{word.emoji || '✨'}</span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {word.term}
              </h1>
              <p className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                {word.phonetic}
              </p>

              <button
                onClick={() => handleSpeakWord(0.95)}
                className="mt-4 p-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_4px_0_#4338ca] active:translate-y-1 active:shadow-none inline-flex items-center gap-2 font-bold text-xs cursor-pointer transition-all"
              >
                <Volume2 className="w-5 h-5" />
                <span>Listen to Pronunciation</span>
              </button>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-left">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Meaning:
                </span>
                <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {word.definition}
                </p>
                <p className="text-xs text-slate-500 italic mt-2">
                  "{word.example}"
                </p>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-500">
              💡 Close your eyes and picture "{word.term}" in your mind for 3 seconds!
            </p>
          </div>
        )}

        {/* STEP 2: SAY */}
        {currentStep === 'say' && (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-extrabold text-xs">
              <span>🗣️ STEP 2 · SAY OUT LOUD</span>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                Syllable Claps:
              </span>

              {/* Syllable Blocks */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {word.say.syllables.map((syl, i) => (
                  <button
                    key={i}
                    onClick={() => speakWord(syl, 0.85)}
                    className={`px-5 py-3 rounded-2xl text-xl font-black transition-transform hover:scale-105 active:scale-95 ${
                      i === word.say.stressIndex
                        ? 'bg-purple-600 text-white shadow-[0_4px_0_#6b21a8]'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {syl}
                    {i === word.say.stressIndex && (
                      <span className="block text-[10px] font-normal opacity-80 uppercase">
                        STRESS ★
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Mic Speech Check */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={handleStartMic}
                  disabled={isListening}
                  className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 animate-pulse shadow-[0_4px_0_#be123c]'
                      : 'bg-purple-500 hover:bg-purple-600 shadow-[0_4px_0_#7e22ce] active:translate-y-1 active:shadow-none'
                  }`}
                >
                  <Mic className="w-7 h-7" />
                </button>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {isListening ? 'Listening... Speak now!' : 'Tap mic and speak the word!'}
                </span>

                {speechSuccess !== null && (
                  <div className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                    speechSuccess
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    {speechSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Awesome pronunciation! Heard: "{spokenTranscript}"</span>
                      </>
                    ) : (
                      <>
                        <span>Good try! Say it once more with a clear, happy voice!</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: MOVE */}
        {currentStep === 'move' && (
          <div className="text-center space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
              <span>🏃 STEP 3 · MOVE & DOODLE</span>
            </div>

            {/* Movement Action Card */}
            <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 text-left">
              <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 block mb-1">
                Physical Action (Do It Now!):
              </span>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                "{word.move.actionPrompt}"
              </p>
            </div>

            {/* Mini Doodle Canvas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span>Draw a quick doodle:</span>
                <button
                  onClick={clearCanvas}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Clear sketchpad"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-3xl bg-white dark:bg-slate-900 h-44 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDraw}
                  onMouseMove={drawMove}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onTouchStart={startDraw}
                  onTouchMove={drawMove}
                  onTouchEnd={stopDraw}
                  className="w-full h-full cursor-crosshair touch-none"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-xs font-bold text-emerald-400/80">
                    ✍️ Doodle your symbol here with your finger!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONNECT */}
        {currentStep === 'connect' && (
          <div className="text-center space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-extrabold text-xs">
              <span>💡 STEP 4 · CONNECT & RHYME</span>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 text-left space-y-3">
              <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-300 block">
                Silly Memory Hook:
              </span>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {word.connect.mnemonic}
              </p>
              {word.connect.rhymeHook && (
                <p className="text-sm font-black text-amber-600 dark:text-amber-400 italic">
                  "{word.connect.rhymeHook}"
                </p>
              )}
            </div>

            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-left space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                What does this word remind you of?
              </span>
              <input
                type="text"
                value={personalAnchor}
                onChange={(e) => setPersonalAnchor(e.target.value)}
                placeholder="e.g. My puppy at home or my favorite movie!"
                className="w-full p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {/* STEP 5: RECALL */}
        {currentStep === 'recall' && (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-extrabold text-xs">
              <span>🎯 STEP 5 · RECALL CHALLENGE</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-center space-y-4">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                Fill in the blank:
              </span>
              <p className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {word.recall.clozeSentence}
              </p>
            </div>

            {/* Multiple Choice Option Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {word.recall.options.map((opt, i) => {
                const isSelected = selectedRecallOption === opt;
                const isTarget = opt.toLowerCase() === word.recall.clozeAnswer.toLowerCase();

                let btnStyle = 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-[0_4px_0_#cbd5e1]';

                if (isRecallChecked) {
                  if (isTarget) {
                    btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-[0_4px_0_#047857]';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-2 border-rose-600 shadow-[0_4px_0_#be123c]';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectRecall(opt)}
                    disabled={isRecallChecked}
                    className={`p-4 rounded-2xl font-black text-sm capitalize transition-all cursor-pointer active:translate-y-1 active:shadow-none ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar (Duolingo Style: Big 3D CONTINUE Button) */}
      <div className="border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs font-bold text-slate-500">
            Step {stepIndex + 1} of 5
          </div>

          <button
            onClick={handleContinue}
            className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base shadow-[0_4px_0_#047857] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{stepIndex === STEPS.length - 1 ? 'COMPLETE WORD!' : 'CONTINUE'}</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
