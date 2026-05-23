import { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Cielo nocturno tipo "La noche estrellada":
 * - Azules cobalto profundos como base.
 * - Halos dorados que remolinan en cámara lenta (conic-gradient).
 * - 90 estrellas titilantes (3 tamaños).
 * - Luna creciente arriba a la derecha.
 * - 28 motas de luz subiendo.
 * - Pincelada SVG con turbulencia y grano.
 * - Vignette para profundidad cinematográfica.
 */
export default function BackgroundFx() {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      top:   Math.random() * 100,
      left:  Math.random() * 100,
      size:  1 + Math.random() * 2.2,
      glow:  4 + Math.random() * 8,
      dur:   2.5 + Math.random() * 5,
      delay: -Math.random() * 6,
      min:   0.1 + Math.random() * 0.25,
      max:   0.7 + Math.random() * 0.3,
      big:   Math.random() > 0.92
    }));
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left:    Math.random() * 100,
      size:    1 + Math.random() * 2.4,
      dur:     18 + Math.random() * 18,
      delay:  -Math.random() * 22,
      drift:  (Math.random() - 0.5) * 80,
      opacity: 0.25 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className="vignette pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Cielo base — azul profundo con tintes cobalto y violeta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(30,58,138,0.55), transparent 55%),' +
            'radial-gradient(ellipse at 85% 25%, rgba(67,56,167,0.40), transparent 60%),' +
            'radial-gradient(ellipse at 50% 90%, rgba(58,76,184,0.35), transparent 60%),' +
            'radial-gradient(ellipse at 50% 50%, rgba(245,215,110,0.08), transparent 70%),' +
            'linear-gradient(180deg, #0b1230 0%, #050a1f 60%, #02050d 100%)'
        }}
      />

      {/* Remolino Van Gogh #1 — gigante, dorado/azul, gira muy lento */}
      <div
        className="spin-slow absolute -top-1/3 -left-1/4 h-[140vmax] w-[140vmax] opacity-50"
        style={{
          '--swirl-dur': '180s',
          background:
            'conic-gradient(from 0deg, transparent 0%, rgba(245,215,110,0.06) 12%, transparent 24%, rgba(30,58,138,0.18) 38%, transparent 52%, rgba(245,215,110,0.05) 66%, transparent 80%, rgba(67,56,167,0.15) 92%, transparent 100%)',
          filter: 'blur(70px)'
        }}
      />
      {/* Remolino #2 — invertido, más pequeño, contra-rotación */}
      <div
        className="spin-slow absolute -bottom-1/3 -right-1/4 h-[110vmax] w-[110vmax] opacity-60"
        style={{
          '--swirl-dur': '220s',
          animationDirection: 'reverse',
          background:
            'conic-gradient(from 180deg, transparent 0%, rgba(67,56,167,0.18) 18%, transparent 32%, rgba(245,215,110,0.08) 50%, transparent 66%, rgba(30,58,138,0.16) 82%, transparent 100%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Orbe dorado central tipo halo de luna */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[340px] w-[340px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,215,110,0.16), transparent 70%)',
          filter: 'blur(56px)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Luna creciente, arriba a la derecha */}
      <Moon />

      {/* Estrellas titilantes */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className={'star ' + (s.big ? 'big' : '')}
            style={{
              '--s-top':   s.top + '%',
              '--s-left':  s.left + '%',
              '--s-size':  (s.big ? s.size * 2.5 : s.size) + 'px',
              '--s-glow':  s.glow + 'px',
              '--s-dur':   s.dur + 's',
              '--s-delay': s.delay + 's',
              '--s-min':   s.min,
              '--s-max':   s.max
            }}
          />
        ))}
      </div>

      {/* Motas de luz subiendo */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              '--p-left':    p.left + '%',
              '--p-size':    p.size + 'px',
              '--p-dur':     p.dur + 's',
              '--p-delay':   p.delay + 's',
              '--p-x':       p.drift + 'px',
              '--p-opacity': p.opacity
            }}
          />
        ))}
      </div>

      {/* Hairlines dorados arriba y abajo */}
      <div className="absolute top-0 left-0 h-px w-full"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(245,215,110,0.32), transparent)' }} />
      <div className="absolute bottom-0 left-0 h-px w-full"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(245,215,110,0.22), transparent)' }} />

      {/* Pincelada y grano */}
      <div className="brushstroke" />
      <div className="grain" />
    </div>
  );
}

function Moon() {
  return (
    <div className="absolute top-10 right-12 hidden h-20 w-20 sm:block">
      <svg viewBox="0 0 80 80" className="moon-glow h-full w-full">
        <defs>
          <radialGradient id="moonG" cx="35%" cy="35%" r="65%">
            <stop offset="0%"  stopColor="#fff8dc" />
            <stop offset="60%" stopColor="#f5d76e" />
            <stop offset="100%" stopColor="#d4b06a" />
          </radialGradient>
          <mask id="crescentMask">
            <rect width="80" height="80" fill="white" />
            <circle cx="48" cy="34" r="28" fill="black" />
          </mask>
        </defs>
        <circle cx="40" cy="40" r="26" fill="url(#moonG)" mask="url(#crescentMask)" opacity="0.95" />
      </svg>
    </div>
  );
}
