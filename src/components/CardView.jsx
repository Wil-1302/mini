import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CARDS, COPY } from '../data/cards.js';
import ProgressBar from './ProgressBar.jsx';
import CardMedia from './CardMedia.jsx';

const SWIPE_THRESHOLD = 80;

export default function CardView({ index, direction, onPrev, onNext }) {
  const card = CARDS[index];
  const isLast = index === CARDS.length - 1;

  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    setUnlocked(false);
    const t = setTimeout(() => setUnlocked(true), 600);
    return () => clearTimeout(t);
  }, [index]);

  const slide = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.97,
      filter: 'blur(14px)'
    }),
    center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.97,
      filter: 'blur(14px)'
    })
  };

  return (
    <motion.div
      key="cardview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex h-full w-full flex-col px-5 py-6 sm:px-10 sm:py-10"
    >
      {/* Header con progreso */}
      <header className="mx-auto w-full max-w-5xl">
        <ProgressBar
          current={index + 1}
          total={CARDS.length}
          levelLabel={COPY.levelLabel}
          ofLabel={COPY.ofLabel}
        />
      </header>

      {/* Escena */}
      <div className="flex flex-1 items-center justify-center py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) onNext();
              else if (info.offset.x > SWIPE_THRESHOLD && index > 0) onPrev();
            }}
            className="glass cursor-grab relative w-full max-w-3xl rounded-[28px] p-7 sm:p-12"
          >
            {/* Encabezado de escena */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold/60" />
                <span className="font-script text-[16px] text-gold-warm/95">
                  {card.scene}
                </span>
              </div>
              <span className="text-[10.5px] tracking-[0.28em] text-paper-mute/80 uppercase">
                {card.tone}
              </span>
            </div>

            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
              <CardMedia gif={card.gif} emoji={card.emoji} alt={card.verse} />

              <div className="flex-1 text-center sm:text-left">
                {/* Verso revelado palabra por palabra */}
                <p className="font-display text-[24px] leading-snug text-paper sm:text-[30px]">
                  <Verse key={'v' + index} text={card.verse} />
                </p>

                <p
                  key={'h' + index}
                  className="soft-in mt-5 max-w-md text-[14.5px] italic leading-relaxed text-paper-soft/85 sm:text-[15px]"
                  style={{ '--d': (0.4 + card.verse.split(' ').length * 0.05) + 's' }}
                >
                  {card.humor}
                </p>

                <p
                  key={'c' + index}
                  className="soft-in mt-4 max-w-md text-[12.5px] tracking-wide text-gold-warm/85"
                  style={{ '--d': (0.7 + card.verse.split(' ').length * 0.05) + 's' }}
                >
                  {card.closer}
                </p>
              </div>
            </div>

            {/* Hint sutil de drag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.32, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 4 }}
              className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.22em] text-paper-mute"
            >
              ← arrastra →
            </motion.div>

            {/* Esquinas doradas */}
            <Corner className="left-3 top-3" rotate={0} />
            <Corner className="right-3 top-3" rotate={90} />
            <Corner className="left-3 bottom-3" rotate={-90} />
            <Corner className="right-3 bottom-3" rotate={180} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[12px] tracking-[0.18em] text-paper-soft/80 transition-all hover:border-gold/40 hover:text-paper disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          {COPY.prevButton}
        </button>

        <NextButton
          unlocked={unlocked}
          onClick={onNext}
          label={isLast ? COPY.lastButton : COPY.nextButton}
        />
      </footer>
    </motion.div>
  );
}

function Verse({ text }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="reveal-word mr-[0.28em]"
          style={{ '--d': (i * 0.07) + 's' }}
        >
          {w}
        </span>
      ))}
    </>
  );
}

function NextButton({ unlocked, onClick, label }) {
  return (
    <div className="relative">
      {unlocked && (
        <span
          className="pulse-ring pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: '0 0 0 1px rgba(245,215,110,0.6)' }}
        />
      )}
      <button
        onClick={onClick}
        disabled={!unlocked}
        className={
          'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[12px] tracking-[0.18em] text-night-ink transition-all ' +
          (unlocked ? 'opacity-100' : 'opacity-60')
        }
        style={{
          background: 'linear-gradient(135deg, #fff8dc 0%, #f5d76e 45%, #d4b06a 100%)',
          boxShadow:
            '0 14px 40px -10px rgba(245,215,110,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
        }}
      >
        <span className="relative z-10 font-medium uppercase">{label}</span>
        <svg viewBox="0 0 24 24" width="14" height="14"
          className="relative z-10 transition-transform group-hover:translate-x-1">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        {unlocked && (
          <span className="btn-shimmer pointer-events-none absolute inset-0" />
        )}
      </button>
    </div>
  );
}

function Corner({ className = '', rotate = 0 }) {
  return (
    <span
      className={`pointer-events-none absolute h-4 w-4 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        borderTop: '1px solid rgba(245,215,110,0.45)',
        borderLeft: '1px solid rgba(245,215,110,0.45)'
      }}
    />
  );
}
