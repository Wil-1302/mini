import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor personalizado: un pequeño punto dorado + halo difuso
 * que sigue al mouse con un leve retraso (resorte suave).
 * Se oculta en dispositivos táctiles.
 */
export default function Spotlight() {
  const [hasMouse, setHasMouse] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 200, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 28, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasMouse(mq.matches);
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    if (mq.matches) {
      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    }
  }, [x, y]);

  if (!hasMouse) return null;

  return (
    <>
      {/* Halo grande y difuso */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[60] rounded-full mix-blend-screen"
        style={{
          left: sx, top: sy,
          width: 380, height: 380,
          x: -190, y: -190,
          background:
            'radial-gradient(circle, rgba(255,215,0,0.10) 0%, rgba(212,176,106,0.04) 35%, transparent 70%)',
          filter: 'blur(8px)'
        }}
      />
      {/* Punto central */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[61] rounded-full"
        style={{
          left: x, top: y,
          width: 8, height: 8,
          x: -4, y: -4,
          background: '#fff8dc',
          boxShadow: '0 0 12px rgba(255,215,0,0.85), 0 0 24px rgba(212,176,106,0.45)'
        }}
      />
    </>
  );
}
