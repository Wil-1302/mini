import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COPY } from '../data/cards.js';

const BTN_W = 110;
const BTN_H = 52;
const PADDING = 80;

/**
 * Escena final con "¿Me disculpas?".
 * - Botón "Sí" — quieto y dorado.
 * - Botón "No" — en cuanto el cursor lo roza o lo intentas tocar,
 *   salta a una posición aleatoria del viewport. Nunca se deja apretar.
 *   Cada salto rota un mensaje juguetón ("mejor di sí", "casi…", …).
 */
export default function Question({ onYes }) {
  const [escaped, setEscaped] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [taps, setTaps] = useState(0);

  const escape = useCallback((e) => {
    e?.preventDefault?.();
    const maxX = Math.max(PADDING, window.innerWidth - BTN_W - PADDING);
    const maxY = Math.max(PADDING, window.innerHeight - BTN_H - PADDING);
    let nx, ny, tries = 0;
    do {
      nx = PADDING + Math.random() * (maxX - PADDING);
      ny = PADDING + Math.random() * (maxY - PADDING);
      tries++;
    } while (
      tries < 8 &&
      Math.abs(nx - pos.x) < 220 &&
      Math.abs(ny - pos.y) < 140
    );
    setPos({ x: nx, y: ny });
    setEscaped(true);
    setTaps(t => t + 1);
  }, [pos]);

  // Reajustar si cambia tamaño de ventana
  useEffect(() => {
    if (!escaped) return;
    const onResize = () => {
      setPos(p => ({
        x: Math.min(p.x, window.innerWidth - BTN_W - PADDING),
        y: Math.min(p.y, window.innerHeight - BTN_H - PADDING)
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [escaped]);

  const message = COPY.noEscapeMessages[taps % COPY.noEscapeMessages.length];

  return (
    <motion.div
      key="question"
      initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative z-10 flex h-full w-full items-center justify-center px-6"
    >
      <div className="glass relative w-full max-w-2xl rounded-3xl p-10 sm:p-14 text-center">
        <span className="font-script text-[16px] text-gold-warm/90">
          {COPY.questionKicker}
        </span>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25, duration: 1 }}
          className="mx-auto mt-5 h-px w-24"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,215,110,0.9), transparent)' }}
        />

        <h2 className="font-display mt-8 text-5xl text-paper sm:text-6xl">
          {'¿Me '}
          <em className="italic text-gold-warm">disculpas</em>
          {'?'}
        </h2>

        <p
          className="mx-auto mt-6 max-w-md text-[14px] italic text-paper-mute/85 soft-in"
          style={{ '--d': '0.6s' }}
        >
          {COPY.questionHint}
        </p>

        <div
          className="relative mt-10 flex items-center justify-center gap-5 soft-in"
          style={{ '--d': '1s' }}
        >
          {/* Botón Sí — dorado, quieto */}
          <button
            onClick={onYes}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 text-[13px] tracking-[0.22em] text-night-ink"
            style={{
              background: 'linear-gradient(135deg, #fff8dc 0%, #f5d76e 45%, #d4b06a 100%)',
              boxShadow:
                '0 14px 40px -10px rgba(245,215,110,0.55), inset 0 1px 0 rgba(255,255,255,0.4)'
            }}
          >
            <span className="relative z-10 font-medium uppercase">{COPY.questionYes}</span>
            <span className="btn-shimmer pointer-events-none absolute inset-0" />
          </button>

          {/* Botón No — placeholder en flujo hasta que se escapa */}
          {!escaped && (
            <button
              onMouseEnter={escape}
              onTouchStart={escape}
              onClick={escape}
              className="rounded-full border border-white/15 px-10 py-4 text-[13px] tracking-[0.22em] text-paper-soft/85 transition-all hover:border-white/40"
            >
              <span className="uppercase font-medium">{COPY.questionNo}</span>
            </button>
          )}
        </div>
      </div>

      {/* Botón No fugitivo + mensajito que rota */}
      <AnimatePresence>
        {escaped && (
          <>
            <motion.button
              key="no-fugitive"
              onMouseEnter={escape}
              onTouchStart={escape}
              onClick={escape}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
              transition={{
                opacity: { duration: 0.3 },
                scale:   { duration: 0.3 },
                x: { type: 'spring', stiffness: 240, damping: 22 },
                y: { type: 'spring', stiffness: 240, damping: 22 }
              }}
              style={{
                position: 'fixed',
                left: 0, top: 0,
                width: BTN_W, height: BTN_H,
                zIndex: 55
              }}
              className="rounded-full border border-white/15 bg-black/30 text-[13px] tracking-[0.22em] text-paper-soft/85 backdrop-blur-md transition-colors hover:border-white/40"
            >
              <span className="uppercase font-medium">{COPY.questionNo}</span>
            </motion.button>

            <motion.span
              key={'msg-' + taps}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none fixed z-[54] font-script text-[15px] text-gold-warm/95"
              style={{
                left: pos.x + BTN_W / 2,
                top:  pos.y + BTN_H + 14,
                transform: 'translateX(-50%)',
                textShadow: '0 2px 8px rgba(0,0,0,0.55)'
              }}
            >
              {message}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
