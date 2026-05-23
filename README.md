# Te dejo esto aquí · una pequeña galería nocturna

Diez escenas pequeñas, pensadas como una mini obra interactiva.
Estética inspirada en *La noche estrellada* de Van Gogh: azules cobalto profundos, dorados cálidos, estrellas titilantes y remolinos lentos.
Música ambiental opcional generada en vivo (sin archivos externos). GIFs del mismo universo visual que el proyecto hermano **[flores-amarillas](https://github.com/Wil-1302/flores-amarillas)**.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4** (tema vía `@theme` en CSS, sin `tailwind.config.js`)
- **Framer Motion 11** (transiciones cinemáticas, drag, spotlight)
- **Web Audio API** (pad ambiental generado en vivo — sin assets de audio)
- Tipografía: **Playfair Display** + **Dancing Script** + **Inter**

## Ejecutar

```bash
cd ~/proyectos/mini-disculpas
npm install
npm run dev
```

Abre **http://localhost:5173**.

Build de producción:

```bash
npm run build
npm run preview
```

## Estructura

```
mini-disculpas/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                  # navegación, teclado, AnimatePresence
    ├── index.css                # paleta nocturna · estrellas · pinceladas
    ├── data/
    │   └── cards.js             # ★ 10 escenas + COPY (todo editable aquí)
    └── components/
        ├── BackgroundFx.jsx     # cielo nocturno · remolinos · estrellas · luna
        ├── Spotlight.jsx        # cursor dorado con halo (sólo desktop)
        ├── AmbientAudio.jsx     # piano ambiental Coldplay-vibe (Web Audio · toggle)
        ├── ProgressBar.jsx      # barra dorada + 10 marcadores tipo estrellitas
        ├── Welcome.jsx          # "Te dejo esto aquí" con reveal palabra a palabra
        ├── CardView.jsx         # escena con verso · humor · remate · drag
        ├── CardMedia.jsx        # GIF Bubu Dudu con halo dorado/azul + fallback emoji
        ├── Question.jsx         # "¿Me disculpas?" — botones Sí / No (ambos funcionan)
        ├── Gratitude.jsx        # escena cálida al decir "Sí", con ráfaga dorada
        └── Respect.jsx          # escena tranquila y respetuosa al decir "No"
```

```
mini-disculpas/public/
└── aea.mp3                       # ★ pista de música ambiental (reemplazable)
```

## Flujo de la experiencia

```
                             ┌─ Sí → Gracias  → Cerrar
  Welcome → 10 escenas → ¿Me disculpas? ─┤
                             └─ No → Está bien → Cerrar
```

Ambos caminos llegan a un cierre tranquilo y respetuoso. Nada de manipulación: el botón "No" funciona normalmente y lleva a una escena calmada y madura.

## Detalles que dan profundidad cinematográfica

- **90 estrellas titilantes** generadas aleatoriamente (3 tamaños, glow dorado).
- **2 remolinos conic-gradient** rotando muy lento (180 s y 220 s, contra-rotación) — el "swirl" de Van Gogh.
- **Luna creciente SVG** con respiración de glow en la esquina superior derecha.
- **28 motas de luz** subiendo en cámara lenta.
- **Cursor con halo** dorado difuso que sigue al mouse con resorte (solo desktop).
- **Pincelada turbulenta** + **grano** sutiles para textura artística.
- **Vignette radial** para profundidad.
- **Cristales translúcidos** con triple gradiente (crema → cobalto → crema).
- **Reveal palabra por palabra** en cada verso al entrar la escena (blur + fade-up).
- **Botón Siguiente** se "desbloquea" con un ring de pulso dorado tras 600 ms.

## Música ambiental

Reproductor minimalista en la esquina inferior derecha. Usa **únicamente** el archivo local **`public/aea.mp3`** servido por Vite en `/aea.mp3`.

- **Default OFF** — los navegadores no permiten autoplay sin gesto del usuario.
- **Volumen suave** por defecto (0.32).
- **Loop** infinito.
- **Persiste entre pantallas** (el `<audio>` se monta una sola vez en `App.jsx`).
- **Se pausa** automáticamente al ocultar la pestaña y reanuda al volver.

### Controles del reproductor

| Botón | Acción |
|---|---|
| ▶ / ⏸ (izquierda) | Reproducir / pausar |
| ♪ aea + barras    | Etiqueta + mini-equalizer animado cuando suena |
| 🔊 / 🔇 (derecha) | Silenciar / quitar silencio |

El botón principal se ilumina en dorado cuando está reproduciendo. Las barras del equalizer rebotan al ritmo (animación CSS).

### Cambiar la pista

Reemplaza el archivo `public/aea.mp3` por otro MP3 con el mismo nombre. Cero código que tocar.

## Interacciones

| Acción         | Cómo                                              |
| -------------- | ------------------------------------------------- |
| Avanzar        | Botón **Siguiente** · `→` · `Enter` · `Espacio`   |
| Atrás          | Botón **Atrás** · `←`                              |
| Drag           | Arrastra la escena `→` o `←` (umbral 80 px)        |
| Móvil          | Swipe                                              |
| Audio          | Botón abajo a la derecha                           |

## Editar contenido

Todo está en **`src/data/cards.js`**:

- **`G`** — diccionario con las 6 URLs de GIFs Bubu Dudu (reusados de *flores-amarillas*).
- **`CARDS[]`** — las 10 escenas. Cada una:
  - `scene` — nombre de la escena ("Escena uno")
  - `tone` — etiqueta superior derecha (ej. *Impulso*, *Noche*, *Mirada*…)
  - `verse` — el mini verso poético
  - `humor` — frase tierna o pequeña sonrisa
  - `closer` — remate dorado en cursiva (firma)
  - `gif` — usa `G.hug`, `G.kiss`, `G.soft`…
  - `emoji` — respaldo elegante si el GIF no carga
- **`COPY`** — todos los textos de UI.

## Personalización rápida

- **Paleta:** edita las variables `@theme` al principio de `src/index.css` (`--color-night`, `--color-cobalt`, `--color-gold-warm`…).
- **Título:** `COPY.welcomeTitle` admite `\n` para múltiples líneas; la última palabra de la última línea sale dorada en cursiva.
- **Más escenas:** simplemente agrega más objetos a `CARDS`. La barra y los marcadores se ajustan solos.
- **Volumen / velocidad del pad:** edita `master.gain.value` (0.18 actual) y los rangos de tiempo en `schedule` en `AmbientAudio.jsx`.

## Accesibilidad

- Foco visible dorado.
- Soporta teclado completo (←, →, Enter, Espacio).
- Cursor personalizado sólo en `(hover: hover) and (pointer: fine)` — táctil queda intacto.
- `aria-pressed` en el toggle de audio.
- `aria-hidden` en decoraciones, estrellas y partículas.
- Contraste alto: crema sobre azul profundo.
