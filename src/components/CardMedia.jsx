import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Marco para el GIF con fallback elegante.
 * Si el GIF no carga, mostramos el emoji con fondo dorado oscuro y un pulso.
 */
export default function CardMedia({ gif, emoji, alt }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Halo dorado + azul (noche estrellada) detrás */}
      <div
        className="absolute -inset-3 rounded-[28px] opacity-70 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(245,215,110,0.28), transparent 55%),' +
            'radial-gradient(circle at 50% 80%, rgba(30,58,138,0.30), transparent 60%)'
        }}
      />
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative overflow-hidden rounded-[24px]"
        style={{
          width: 'min(100%, 280px)',
          aspectRatio: '1 / 1',
          background:
            'linear-gradient(135deg, rgba(245,215,110,0.10), rgba(30,58,138,0.20))',
          border: '1px solid rgba(245,215,110,0.22)',
          boxShadow:
            '0 20px 60px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >
        {!failed && (
          <img
            src={gif}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
            draggable={false}
          />
        )}

        {(failed || !loaded) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[100px] leading-none drop-shadow-[0_8px_20px_rgba(212,176,106,0.35)]"
              aria-hidden="true"
            >
              {emoji}
            </motion.span>
          </div>
        )}

        {/* Marco interior dorado fino */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(212,176,106,0.18)' }}
        />
      </motion.div>
    </div>
  );
}
