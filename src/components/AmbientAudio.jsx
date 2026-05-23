import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Reproductor de música ambiental.
 * Usa únicamente el archivo local /aea.mp3 (en public/).
 *
 * - Persiste entre pantallas (se monta en App.jsx, fuera del AnimatePresence).
 * - Default OFF (los navegadores bloquean autoplay sin gesto del usuario).
 * - Volumen suave por defecto (0.32).
 * - Botón principal: play / pause. Botón secundario: mute / unmute.
 * - Se pausa al ocultar la pestaña y reanuda al volver, si estaba sonando.
 */
export default function AmbientAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(false);

  const togglePlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        /* el navegador bloqueó la reproducción — silenciar fallo */
      }
    }
  }, [playing]);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  // Volumen + visibility
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.32;
    a.loop = true;

    const onVis = () => {
      if (!playing) return;
      if (document.hidden) a.pause();
      else a.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [playing]);

  return (
    <>
      <audio ref={audioRef} src="/aea.mp3" preload="auto" />

      <div
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-gold/15 px-2 py-1.5 backdrop-blur-md sm:bottom-6 sm:right-6"
        style={{
          background:
            'linear-gradient(135deg, rgba(11,18,48,0.55) 0%, rgba(30,58,138,0.30) 100%)',
          boxShadow:
            '0 14px 40px -14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,215,110,0.10)'
        }}
        role="group"
        aria-label="Reproductor de música ambiental"
      >
        {/* Play / pause */}
        <button
          onClick={togglePlay}
          aria-pressed={playing}
          aria-label={playing ? 'Pausar música' : 'Reproducir música'}
          className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-all"
          style={{
            background: playing
              ? 'linear-gradient(135deg, #fff8dc 0%, #f5d76e 50%, #d4b06a 100%)'
              : 'rgba(255,255,255,0.05)',
            color: playing ? '#0b1230' : '#f3ead7',
            boxShadow: playing ? '0 0 14px rgba(245,215,110,0.5)' : 'none'
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Etiqueta + equalizer */}
        <div className="flex min-w-[44px] items-center gap-1.5 px-1.5">
          <span className="font-script text-[13px] tracking-wide text-gold-warm/90">
            aea
          </span>
          <Equalizer active={playing && !muted} />
        </div>

        {/* Mute */}
        <button
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? 'Quitar silencio' : 'Silenciar'}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-paper-soft/80 transition-all hover:text-paper"
          style={{
            background: muted ? 'rgba(255,255,255,0.03)' : 'transparent',
            opacity: muted ? 0.6 : 1
          }}
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </button>
      </div>
    </>
  );
}

/* ---------- Iconos minimalistas ---------- */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M8 5.2v13.6c0 .8.9 1.3 1.5.8l10.4-6.8c.6-.4.6-1.3 0-1.6L9.5 4.4C8.9 4 8 4.4 8 5.2z"/>
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14"  y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
      <path d="M16.5 9c1 1 1 5 0 6" />
      <path d="M19.5 6.5c2.2 2 2.2 9 0 11" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
      <path d="M16 9.5l5 5" />
      <path d="M21 9.5l-5 5" />
    </svg>
  );
}

/* ---------- Mini equalizer animado ---------- */
function Equalizer({ active }) {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-gold-warm/85"
          style={{
            height: active ? '100%' : '20%',
            animation: active ? `eq 0.9s ease-in-out ${i * 0.18}s infinite` : 'none',
            transition: 'height 0.4s ease',
            transformOrigin: 'bottom'
          }}
        />
      ))}
    </span>
  );
}
