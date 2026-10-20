import React, { useRef, useState, useEffect } from 'react';
import { VocabularyWord } from '../../types';
import { Activity, PenTool, RotateCcw, CheckCircle2, Music2, Sparkles, Hand } from 'lucide-react';

interface StepMoveProps {
  word: VocabularyWord;
  isCompleted: boolean;
  onComplete: () => void;
  onNextStep: () => void;
}

export const StepMove: React.FC<StepMoveProps> = ({
  word,
  isCompleted,
  onComplete,
  onNextStep,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#059669'); // emerald
  const [lineWidth, setLineWidth] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);
  const [tapFeedback, setTapFeedback] = useState<string>('Tap the rhythm of the syllables!');

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleRhythmTap = () => {
    const now = Date.now();
    const newCount = tapCount + 1;
    setTapCount(newCount);
    setLastTapTime(now);

    const numSyllables = word.say.syllables.length;
    const currentSylIndex = (newCount - 1) % numSyllables;
    const currentSyl = word.say.syllables[currentSylIndex];
    const isStressed = currentSylIndex === word.say.stressIndex;

    setTapFeedback(
      `Tapped: ${currentSyl} ${isStressed ? '★ (ACCENT!)' : ''}`
    );
  };

  const handleFinish = () => {
    onComplete();
    onNextStep();
  };

  return (
    <div className="space-y-6">
      {/* Method Header Banner */}
      <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Method 3 of 5
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Kinesthetic Movement & Motor Cortex Encoding
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Anchor the meaning in your body through physical gestures, rhythm tapping, or quick sketchpad tracing.
            </p>
          </div>
        </div>
      </div>

      {/* Main Kinesthetic Practice Stage */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Physical Movement Command Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 dark:from-emerald-950/20 dark:to-teal-950/10 border border-emerald-200/80 dark:border-emerald-900/40">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-base mb-2">
            <Hand className="w-5 h-5 text-emerald-600" />
            <span>The Kinesthetic Action (Do This Right Now!)</span>
          </div>
          <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
            "{word.move.actionPrompt}"
          </p>

          <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <strong className="text-emerald-700 dark:text-emerald-300">Gesture type:</strong> {word.move.physicalGesture}
            </div>
            <div className="italic text-emerald-800 dark:text-emerald-400">
              Repeat the physical movement 3 times while saying "{word.term}"!
            </div>
          </div>
        </div>

        {/* Syllable Rhythm Tap Pad */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 font-semibold text-sm text-slate-900 dark:text-white mb-1">
              <Music2 className="w-4 h-4 text-emerald-600" />
              <span>Rhythm & Beat Cadence:</span>
              <span className="font-mono text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                {word.move.rhythmPattern}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {tapFeedback}
            </p>
          </div>

          <button
            onClick={handleRhythmTap}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span>Tap Beat ({tapCount})</span>
          </button>
        </div>

        {/* Quick Sketchpad Doodle Canvas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <PenTool className="w-4 h-4 text-emerald-600" />
              <span>Interactive Sketchpad</span>
              <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                · {word.move.sketchPrompt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Color options */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {['#059669', '#4f46e5', '#e11d48', '#0f172a'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setStrokeColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      strokeColor === color ? 'scale-125 ring-2 ring-white ring-offset-1' : 'opacity-70 hover:opacity-100'
                    }`}
                    title="Change pen color"
                  />
                ))}
              </div>

              <button
                onClick={clearCanvas}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Clear sketchpad"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 h-52 sm:h-64">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair touch-none"
            />
            {!hasDrawn && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs text-center p-4">
                <Sparkles className="w-5 h-5 mb-1 opacity-60 text-emerald-500" />
                <span>Draw a quick doodle or symbol for "{word.term}" here</span>
                <span className="text-[11px] opacity-75 mt-0.5">Motor drawing connects right & left brain hemispheres</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Movement Anchored
            </span>
          )}
        </div>
        <button
          onClick={handleFinish}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-emerald-500/20 flex items-center gap-2"
        >
          <span>I've Moved & Sketched It</span>
          <span className="text-xs bg-emerald-500/80 px-2 py-0.5 rounded">Next: Connect →</span>
        </button>
      </div>
    </div>
  );
};
