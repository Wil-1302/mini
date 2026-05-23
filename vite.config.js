import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En producción el sitio vive en https://wil-1302.github.io/mini/
// así que necesitamos base "/mini/". En dev local seguimos en raíz.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/mini/' : '/',
  plugins: [react()],
  server: { port: 5173, host: true }
}));
