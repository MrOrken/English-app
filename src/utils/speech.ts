/**
 * Web Speech API utilities for native speech synthesis and speech recognition
 */

export function speakWord(text: string, rate: number = 0.9, pitch: number = 1.0): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en-') && !v.name.includes('Google') === false) ||
      voices.find((v) => v.lang.startsWith('en-'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export interface RecognitionResult {
  transcript: string;
  confidence: number;
  isMatch: boolean;
  score: number; // 0 to 100
}

export function startSpeechCheck(
  targetWord: string,
  onResult: (result: RecognitionResult) => void,
  onError: (err: string) => void
): { stop: () => void } {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. You can still practice speaking aloud!');
    return { stop: () => {} };
  }

  const win = window as unknown as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition?: any;
  };

  const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionClass();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    if (!event.results || event.results.length === 0) {
      onError('No speech detected. Please try again.');
      return;
    }

    const transcript: string = event.results[0][0].transcript.trim().toLowerCase();
    const confidence: number = event.results[0][0].confidence || 0.8;

    const cleanTarget = targetWord.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const cleanSpoken = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    // Check exact or partial inclusion
    const isExact = cleanSpoken === cleanTarget;
    const isContained = cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken);

    let score = 0;
    if (isExact) score = 100;
    else if (isContained) score = 85;
    else {
      // Levenshtein similarity approximation
      const similarity = calculateSimilarity(cleanTarget, cleanSpoken);
      score = Math.round(similarity * 100);
    }

    onResult({
      transcript,
      confidence,
      isMatch: score >= 70,
      score,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    if (event.error === 'not-allowed') {
      onError('Microphone access was denied. Please check your browser permissions.');
    } else if (event.error === 'no-speech') {
      onError('No voice was heard. Click to try again.');
    } else {
      onError(`Speech recognition error: ${event.error || 'unknown'}`);
    }
  };

  try {
    recognition.start();
  } catch (err) {
    onError('Could not start microphone listener: ' + String(err));
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    },
  };
}

function calculateSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;

  let editDistance = 0;
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  editDistance = costs[s2.length];
  return (longerLength - editDistance) / longerLength;
}
