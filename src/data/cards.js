// =============================================================
//  Diez escenas — una pequeña galería nocturna.
//  Paleta inspirada en La noche estrellada de Van Gogh.
//  GIFs reutilizados del proyecto hermano:
//  https://github.com/Wil-1302/flores-amarillas
// =============================================================

const G = {
  hug:    'https://media.tenor.com/vzkveVGDzmAAAAAi/dudu-hug-bubu-dudu-kiss.gif',
  seeyou: 'https://media.tenor.com/r0VCmLiA3mEAAAAi/sseeyall-bubu-dudu.gif',
  chill:  'https://media.tenor.com/PXKZhCEfEfsAAAAi/bubu-bubu-dudu.gif',
  soft:   'https://media.tenor.com/aMOxt0o16TQAAAAi/bubu-bubu-dudu.gif',
  kiss:   'https://media.tenor.com/wIx44jsp4DMAAAAi/kiss.gif',
  play:   'https://media.tenor.com/qQmsOJoeMoMAAAAi/dudu-bubu.gif'
};

export const CARDS = [
  {
    scene:  'Escena uno',
    tone:   'Impulso',
    verse:  'A veces me apuro como si el cariño tuviera tren.',
    humor:  'Y termino llegando antes de tiempo, sin invitación.',
    closer: '— hoy estoy aprendiendo a esperar el andén.',
    gif:    G.seeyou,
    emoji:  '🚆'
  },
  {
    scene:  'Escena dos',
    tone:   'Noche',
    verse:  'Hay noches que se ven más bonitas cuando uno baja el volumen.',
    humor:  'Ayer todavía no había leído esa instrucción.',
    closer: '— hoy ya la tengo subrayada en azul.',
    gif:    G.chill,
    emoji:  '🌙'
  },
  {
    scene:  'Escena tres',
    tone:   'Mirada',
    verse:  'Te miré como quien encuentra una estrella escondida en pleno día.',
    humor:  'Después se me cayó el café, también, todo conectado.',
    closer: '— culpo a la estrella, no a mí.',
    gif:    G.soft,
    emoji:  '✨'
  },
  {
    scene:  'Escena cuatro',
    tone:   'Calma',
    verse:  'Mi calma estaba en otra habitación cuando hablé.',
    humor:  'Volvió tarde, con la chaqueta puesta y mucha vergüenza.',
    closer: '— ya tuvimos una charla seria los dos.',
    gif:    G.play,
    emoji:  '🪞'
  },
  {
    scene:  'Escena cinco',
    tone:   'Nervios',
    verse:  'Los nervios bonitos también pueden tropezarse.',
    humor:  'Yo tropecé con cierta elegancia, eso sí.',
    closer: '— y aprendí a mirar mejor por dónde piso.',
    gif:    G.seeyou,
    emoji:  '🍂'
  },
  {
    scene:  'Escena seis',
    tone:   'Detalle',
    verse:  'Hay momentos pequeños que valen toda la noche entera.',
    humor:  'Anoche tenía uno entre las manos y lo apreté demasiado.',
    closer: '— hoy aprendo a sostener sin doblar.',
    gif:    G.hug,
    emoji:  '🤍'
  },
  {
    scene:  'Escena siete',
    tone:   'Voz baja',
    verse:  'Cuando el cariño quiere hablar, a veces le falta voz baja.',
    humor:  'Y a mí, anoche, me sobró un poco de eco.',
    closer: '— prometo bajarle al volumen, despacio.',
    gif:    G.chill,
    emoji:  '🕯️'
  },
  {
    scene:  'Escena ocho',
    tone:   'Aprendizaje',
    verse:  'Hay días en los que uno aprende a ser dos pasos atrás de sí mismo.',
    humor:  'Hoy es uno de esos, y la verdad no está mal.',
    closer: '— los pasos atrás también son avance.',
    gif:    G.soft,
    emoji:  '🌿'
  },
  {
    scene:  'Escena nueve',
    tone:   'Luz',
    verse:  'Algunas luces no necesitan ruido para iluminar todo.',
    humor:  'Tú eres una de esas; yo, todavía aprendiendo el truco.',
    closer: '— por eso quería hacerlo bonito.',
    gif:    G.kiss,
    emoji:  '🌟'
  },
  {
    scene:  'Escena diez',
    tone:   'Dedicatoria',
    verse:  'Si la noche tuviera dedicatoria, esta página sería tuya.',
    humor:  'Sin presión, sin pedirte que la leas dos veces.',
    closer: '— solo quería dejarla aquí, con calma.',
    gif:    G.hug,
    emoji:  '🌌'
  }
];

export const COPY = {
  // Bienvenida
  welcomeKicker: 'una pequeña galería nocturna',
  welcomeTitle:  'Te dejo\nesto aquí.',
  startButton:   'Entrar a la noche',
  startHint:     'avanza con el botón, las flechas ← →, o arrastrando.',

  // Navegación
  prevButton:    'Atrás',
  nextButton:    'Siguiente',
  lastButton:    'Cerrar la noche',

  // Progreso
  levelLabel:    'Escena',
  ofLabel:       'de',

  // Pregunta final
  questionKicker: 'última escena',
  questionTitle:  '¿Me disculpas?',
  questionHint:   'una de las dos respuestas se mueve sola.',
  questionYes:    'Sí',
  questionNo:     'No',
  // Mensajes que rotan junto al botón "No" cuando huye
  noEscapeMessages: [
    'mejor di sí',
    'atrápame si puedes',
    '¿segura?',
    'casi…',
    'no me agarras',
    'sigue intentando',
    'una pista: sí',
    'el otro botón es más bonito',
    'noo, por favor',
    'ese botón se mueve solo'
  ],

  // Gratitud (después del Sí)
  gratitudeKicker: 'gracias',
  gratitudeTitle:  'Gracias.\nSabía que lo harías.',
  gratitudeText:   'Me hiciste sonreír otra vez. Que el resto de tu noche siga igual de bonita.',
  gratitudeButton: 'Cerrar',

  restartButton:   'Volver al inicio',

  // Despedida final
  byeText:         'Buenas noches.'
};
