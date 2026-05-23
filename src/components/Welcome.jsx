import { motion } from 'framer-motion';
import { COPY } from '../data/cards.js';

export default function Welcome({ onStart }) {
  const lines = COPY.welcomeTitle.split('\n');

  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative z-10 flex h-full w-full items-center justify-center px-6"
    >
      <div className="glass relative w-full max-w-2xl rounded-3xl p-10 sm:p-14 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-script block text-[15px] tracking-wide text-gold/85"
        >
          {COPY.welcomeKicker}
        </motion.span>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto mt-5 h-px w-24 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,176,106,0.9), transparent)' }}
        />

        <h1 className="font-display mt-8 text-4xl leading-[1.1] text-paper sm:text-6xl">
          {lines.map((line, li) => {
            const words = line.split(' ');
            const isLastLine = li === lines.length - 1;
            return (
              <span key={li} className="block">
                {words.map((w, wi) => {
                  const accent = isLastLine && wi === words.length - 1;
                  const delay = 0.7 + (li * words.length + wi) * 0.07;
                  return (
                    <span
                      key={wi}
                      className={'reveal-word mr-2 ' + (accent ? 'italic text-gold' : '')}
                      style={{ '--d': delay + 's' }}
                    >
                      {w}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-9 py-4 text-sm font-medium text-night-ink"
            style={{
              background: 'linear-gradient(135deg, #fff8dc 0%, #f5d76e 45%, #d4b06a 100%)',
              boxShadow:
                '0 14px 50px -10px rgba(245,215,110,0.45), 0 0 0 1px rgba(212,176,106,0.45) inset'
            }}
          >
            <span className="relative z-10 tracking-[0.18em] uppercase text-[12px]">
              {COPY.startButton}
            </span>
            <svg viewBox="0 0 24 24" width="14" height="14" className="relative z-10 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                fill="none" />
            </svg>
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(120deg, transparent 30%, rgba(255,248,220,0.45) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s ease-out infinite'
              }}
            />
          </button>

          <span className="text-[11px] tracking-[0.18em] text-paper-mute/70">
            {COPY.startHint}
          </span>
        </motion.div>

        {/* Esquinas doradas */}
        <Corner className="left-4 top-4" rotate={0} />
        <Corner className="right-4 top-4" rotate={90} />
        <Corner className="left-4 bottom-4" rotate={-90} />
        <Corner className="right-4 bottom-4" rotate={180} />
      </div>
    </motion.div>
  );
}

function Corner({ className = '', rotate = 0 }) {
  return (
    <span
      className={`pointer-events-none absolute h-5 w-5 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        borderTop: '1px solid rgba(212,176,106,0.55)',
        borderLeft: '1px solid rgba(212,176,106,0.55)'
      }}
    />
  );
}
