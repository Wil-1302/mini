import { motion } from 'framer-motion';

/**
 * Barra dorada delgada con etiqueta "Escena 03 de 10".
 */
export default function ProgressBar({ current, total, levelLabel = 'Escena', ofLabel = 'de' }) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex items-baseline gap-2 text-[11px] tracking-[0.22em] text-paper-mute">
        <span className="font-script text-[14px] tracking-normal text-gold/85">{levelLabel}</span>
        <span className="font-display text-base text-gold-warm tabular-nums">
          {String(current).padStart(2, '0')}
        </span>
        <span className="opacity-50">{ofLabel}</span>
        <span className="tabular-nums opacity-70">{String(total).padStart(2, '0')}</span>
      </div>

      <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(245,215,110,0.0) 0%, rgba(245,215,110,0.85) 30%, rgba(255,248,220,1) 100%)',
            boxShadow: '0 0 10px rgba(245,215,110,0.55)'
          }}
          initial={false}
          animate={{ width: pct + '%' }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>

      {/* Puntitos como pequeñas estrellas — 10 marcadores */}
      <div className="hidden gap-1 sm:flex">
        {Array.from({ length: total }).map((_, i) => {
          const reached = i < current;
          return (
            <span
              key={i}
              className="block h-1 w-1 rounded-full transition-all duration-500"
              style={{
                background: reached ? '#f5d76e' : 'rgba(255,255,255,0.14)',
                boxShadow: reached ? '0 0 6px rgba(245,215,110,0.7)' : 'none'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
