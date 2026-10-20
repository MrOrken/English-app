import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share, PlusSquare, Sparkles } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and running standalone, do not show
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop prompt
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-[0_3px_0_#047857] active:translate-y-1 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
        title="Орнату / Install to Home Screen"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Орнату / Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-[0_3px_0_#047857] active:translate-y-1 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
          title="Install on iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>iOS-ке орнату</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-slate-200 dark:border-slate-800 relative space-y-4">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-base">
                <Sparkles className="w-5 h-5" />
                <span>iPhone / iPad-ке орнату</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Memory Boost қолданбасын телефоныңыздың басты экранына қосу үшін мына қарапайым 2 қадамды орындаңыз:
              </p>

              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <strong>1-қадам:</strong> Safari браузерінің төменгі жағындағы <strong>«Бөлісу» (Share)</strong> батырмасын басыңыз.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong>2-қадам:</strong> Төмен қарай сырғытып, <strong>«Экранға қосу» (Add to Home Screen)</strong> батырмасын таңдаңыз.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs"
              >
                Түсінікті / Жабу
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop / standard button so user can trigger or see instructions anytime
  return (
    <button
      onClick={() => setShowIOSGuide(true)}
      className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-extrabold text-xs hover:bg-emerald-100 transition-colors cursor-pointer"
      title="Қолданбаны құрылғыға орнату нұсқаулығы"
    >
      <Download className="w-3.5 h-3.5" />
      <span>Орнату / PWA</span>
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-slate-200 dark:border-slate-800 relative space-y-4 text-left">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowIOSGuide(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Қолданбаны телефонға орнату</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Бұл сілтемені смартфоныңыздағы Chrome немесе Safari браузерімен ашып, <strong>«Орнату»</strong> немесе <strong>«Экранға қосу»</strong> батырмасын басыңыз. Қолданба App Store немесе Play Market-тен жүктелгендей жеке қолданба ретінде ашылады!
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowIOSGuide(false);
              }}
              className="w-full py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs"
            >
              Жабу
            </button>
          </div>
        </div>
      )}
    </button>
  );
};
