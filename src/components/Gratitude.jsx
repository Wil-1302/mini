import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../data/cards.js';

const GIF_HUG  = 'https://media.tenor.com/vzkveVGDzmAAAAAi/dudu-hug-bubu-dudu-kiss.gif';
const GIF_KISS = 'https://media.tenor.com/wIx44jsp4DMAAAAi/kiss.gif';

/**
 * Escena de gratitud — se muestra al presionar "Sí".
 * Halo dorado expandido, partículas extra estallan desde el centro,
 * mensaje cálido y un GIF tierno arriba del texto.
 */
export default function Gratitude({ onClose, onRestart }) {
  const burst = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const dist  = 220 + Math.random() * 180;
      return {
        id: i,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        delay: Math.random() * 0.3
      };
    });
  }, []);

  const titleLines = COPY.gratitudeTitle.split('\n');

  return (
    <motion.div
      key="gratitude"
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(14px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative z-10 flex h-full w-full items-center justify-center px-6"
    >
      {/* Ráfaga de partículas doradas desde el centro */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0">
        {burst.map(p => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            animate={{ x: p.dx, y: p.dy, opacity: [0, 1, 0], scale: [0.5, 1.2, 0.6] }}
            transition={{ duration: 2.6, delay: p.delay, ease: 'easeOut' }}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              background: 'radial-gradient(circle, #fff8dc 0%, rgba(245,215,110,0.4) 70%, transparent 100%)',
              boxShadow: '0 0 12px rgba(245,215,110,0.85)'
            }}
          />
        ))}
      </div>

      {/* Halo dorado expansivo */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(245,215,110,0.25), transparent 65%)',
          filter: 'blur(40px)'
        }}
      />

      <div className="glass relative z-10 w-full max-w-2xl rounded-3xl p-9 sm:p-12 text-center">
        <span className="font-script text-[16px] text-gold-warm/90">
          {COPY.gratitudeKicker}
        </span>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 1.1 }}
          className="mx-auto mt-5 h-px w-24"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,215,110,0.9), transparent)' }}
        />

        {/* GIF tierno arriba */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative mx-auto mt-7 h-32 w-32 overflow-hidden rounded-2xl sm:h-36 sm:w-36"
          style={{
            border: '1px solid rgba(245,215,110,0.3)',
            boxShadow: '0 14px 40px -12px rgba(245,215,110,0.45)',
            background: 'linear-gradient(135deg, rgba(245,215,110,0.12), rgba(30,58,138,0.2))'
          }}
        >
          <img
            src={GIF_HUG}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => { e.currentTarget.src = GIF_KISS; }}
            draggable={false}
          />
        </motion.div>

        {/* Título: "Gracias. / Sabía que lo harías." */}
        <h2 className="font-display mt-7 text-4xl text-paper sm:text-5xl">
          {titleLines.map((line, li) => {
            const words = line.split(' ');
            const isLast = li === titleLines.length - 1;
            return (
              <span key={li} className="block">
                {words.map((w, wi) => {
                  const accent = isLast && wi >= words.length - 2;
                  const delay = 0.8 + (li * 3 + wi) * 0.09;
                  return (
                    <span
                      key={wi}
                      className={'reveal-word mr-2 ' + (accent ? 'italic text-gold-warm' : '')}
                      style={{ '--d': delay + 's' }}
                    >
                      {w}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h2>

        <p
          className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-paper-soft/90 soft-in"
          style={{ '--d': '2s' }}
        >
          {COPY.gratitudeText}
        </p>

        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3 soft-in"
          style={{ '--d': '2.4s' }}
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-[12px] tracking-[0.18em] text-paper-soft/80 transition-all hover:border-gold/40 hover:text-paper"
          >
            {COPY.restartButton}
          </button>
          <button
            onClick={onClose}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[12px] tracking-[0.18em] text-night-ink"
            style={{
              background: 'linear-gradient(135deg, #fff8dc 0%, #f5d76e 45%, #d4b06a 100%)',
              boxShadow: '0 14px 40px -10px rgba(245,215,110,0.55), inset 0 1px 0 rgba(255,255,255,0.4)'
            }}
          >
            <span className="relative z-10 font-medium uppercase">{COPY.gratitudeButton}</span>
            <span className="btn-shimmer pointer-events-none absolute inset-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
