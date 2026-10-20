import React, { useState } from 'react';
import { VocabularyWord } from '../../types';
import { Mic, Volume2, Volume1, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { speakWord, startSpeechCheck, RecognitionResult, isSpeechRecognitionSupported } from '../../utils/speech';

interface StepSayProps {
  word: VocabularyWord;
  isCompleted: boolean;
  onComplete: () => void;
  onNextStep: () => void;
}

export const StepSay: React.FC<StepSayProps> = ({
  word,
  isCompleted,
  onComplete,
  onNextStep,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [activeSpeechStopper, setActiveSpeechStopper] = useState<{ stop: () => void } | null>(null);

  const handlePlayAudio = async (rate: number = 0.95) => {
    setIsPlaying(true);
    await speakWord(word.term, rate);
    setIsPlaying(false);
  };

  const handlePlaySyllable = (syl: string) => {
    speakWord(syl, 0.85);
  };

  const handleStartMic = () => {
    setSpeechError(null);
    setRecognitionResult(null);
    setIsListening(true);

    const stopper = startSpeechCheck(
      word.term,
      (res) => {
        setIsListening(false);
        setRecognitionResult(res);
        if (res.isMatch) {
          onComplete();
        }
      },
      (err) => {
        setIsListening(false);
        setSpeechError(err);
      }
    );

    setActiveSpeechStopper(stopper);
  };

  const handleStopMic = () => {
    if (activeSpeechStopper) {
      activeSpeechStopper.stop();
      setIsListening(false);
    }
  };

  const handleFinish = () => {
    onComplete();
    onNextStep();
  };

  const hasRecognition = isSpeechRecognitionSupported();

  return (
    <div className="space-y-6">
      {/* Method Header Banner */}
      <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Method 2 of 5
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Phonological Loop & Vocal Muscle Encoding
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Activate your auditory cortex and speech motor pathways by vocalizing each syllable.
            </p>
          </div>
        </div>
      </div>

      {/* Main Pronunciation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        {/* Syllables and Stress Visualizer */}
        <div className="text-center pb-8 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-3">
            Syllable Breakdown (Stressed Syllable in Purple)
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {word.say.syllables.map((syl, idx) => {
              const isStressed = idx === word.say.stressIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handlePlaySyllable(syl)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-lg sm:text-2xl transition-transform hover:scale-105 active:scale-95 ${
                    isStressed
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 ring-2 ring-purple-400/50'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={`Click to listen to syllable: ${syl}`}
                >
                  {syl}
                  {isStressed && (
                    <span className="block text-[10px] font-normal tracking-wide opacity-80 uppercase">
                      Primary Stress
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => handlePlayAudio(1.0)}
              disabled={isPlaying}
              className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 font-semibold text-sm transition-colors flex items-center gap-2 border border-purple-200 dark:border-purple-800"
            >
              <Volume2 className="w-4 h-4" />
              <span>Normal Speed (1.0x)</span>
            </button>
            <button
              onClick={() => handlePlayAudio(0.65)}
              disabled={isPlaying}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Volume1 className="w-4 h-4" />
              <span>Slow Audio (0.65x)</span>
            </button>
          </div>
        </div>

        {/* Mouth Shape & Phonetic Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Mouth & Tongue Positioning
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {word.say.mouthShape}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Phonetic Rule & Teacher Tip
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {word.say.pronunciationTip}
            </p>
          </div>
        </div>

        {/* Interactive Speech Recognition Test */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-50/70 to-slate-50 dark:from-purple-950/20 dark:to-slate-900 border border-purple-200/60 dark:border-purple-900/40 text-center">
          <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Interactive Speech Check
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-5">
            Click the microphone and say <strong className="text-purple-600 dark:text-purple-400">"{word.term}"</strong> clearly into your microphone.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            {!isListening ? (
              <button
                onClick={handleStartMic}
                className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition-all cursor-pointer group"
                title="Start recording"
              >
                <Mic className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleStopMic}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 animate-pulse transition-all cursor-pointer"
                title="Stop recording"
              >
                <Mic className="w-7 h-7" />
              </button>
            )}

            <span className="text-xs font-medium text-slate-500">
              {isListening ? 'Listening... Speak now!' : 'Click to Speak'}
            </span>

            {/* Recognition Feedback */}
            {recognitionResult && (
              <div
                className={`mt-3 p-4 rounded-xl border max-w-md w-full transition-all ${
                  recognitionResult.isMatch
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>Heard: "{recognitionResult.transcript}"</span>
                  <span className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 text-xs font-mono">
                    {recognitionResult.score}% Accuracy
                  </span>
                </div>
                <p className="text-xs mt-1">
                  {recognitionResult.isMatch
                    ? 'Awesome pronunciation! Your auditory and speech motor pathways are locked in.'
                    : 'Good try! Listen to the audio once more and emphasize the stressed syllable.'}
                </p>
                {!recognitionResult.isMatch && (
                  <button
                    onClick={handleStartMic}
                    className="mt-2 text-xs font-medium text-purple-700 dark:text-purple-300 hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Try again
                  </button>
                )}
              </div>
            )}

            {speechError && (
              <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-2 max-w-md">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{speechError}</span>
              </div>
            )}

            {!hasRecognition && (
              <p className="text-xs text-slate-400 mt-2">
                (Speech recognition not supported in this browser, but saying it aloud activates your memory just as effectively!)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Completion CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {isCompleted && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Spoken Aloud
            </span>
          )}
        </div>
        <button
          onClick={handleFinish}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-purple-500/20 flex items-center gap-2"
        >
          <span>I've Spoken It Aloud</span>
          <span className="text-xs bg-purple-500/80 px-2 py-0.5 rounded">Next: Move →</span>
        </button>
      </div>
    </div>
  );
};
