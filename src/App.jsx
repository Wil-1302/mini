import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundFx from './components/BackgroundFx.jsx';
import Spotlight from './components/Spotlight.jsx';
import AmbientAudio from './components/AmbientAudio.jsx';
import Welcome from './components/Welcome.jsx';
import CardView from './components/CardView.jsx';
import Question from './components/Question.jsx';
import Gratitude from './components/Gratitude.jsx';
import { CARDS, COPY } from './data/cards.js';

const SCREEN = {
  WELCOME:   'welcome',
  CARDS:     'cards',
  QUESTION:  'question',
  GRATITUDE: 'gratitude',
  BYE:       'bye'
};

export default function App() {
  const [screen, setScreen]       = useState(SCREEN.WELCOME);
  const [index, setIndex]         = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex(prev => {
      if (prev >= CARDS.length - 1) {
        setScreen(SCREEN.QUESTION);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex(p => Math.max(0, p - 1));
  }, []);

  const start = useCallback(() => {
    setIndex(0);
    setDirection(1);
    setScreen(SCREEN.CARDS);
  }, []);

  const restart = useCallback(() => {
    setIndex(0);
    setDirection(1);
    setScreen(SCREEN.WELCOME);
  }, []);

  const yes   = useCallback(() => setScreen(SCREEN.GRATITUDE), []);
  const close = useCallback(() => setScreen(SCREEN.BYE), []);

  // Teclado solo durante CARDS
  useEffect(() => {
    if (screen !== SCREEN.CARDS) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, next, prev]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <BackgroundFx />
      <Spotlight />
      <AmbientAudio />

      <AnimatePresence mode="wait">
        {screen === SCREEN.WELCOME && (
          <Welcome key="w" onStart={start} />
        )}
        {screen === SCREEN.CARDS && (
          <CardView
            key="c"
            index={index}
            direction={direction}
            onPrev={prev}
            onNext={next}
          />
        )}
        {screen === SCREEN.QUESTION && (
          <Question key="q" onYes={yes} />
        )}
        {screen === SCREEN.GRATITUDE && (
          <Gratitude key="g" onClose={close} onRestart={restart} />
        )}
        {screen === SCREEN.BYE && (
          <motion.div
            key="bye"
            initial={{ opacity: 0, filter: 'blur(14px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative z-10 flex h-full w-full items-center justify-center px-6"
          >
            <p className="font-display text-center text-3xl text-paper-soft sm:text-4xl">
              {COPY.byeText.split(' ').map((w, i, arr) =>
                i === arr.length - 1
                  ? <em key={i} className="italic text-gold-warm">{w}</em>
                  : <span key={i}>{w} </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
