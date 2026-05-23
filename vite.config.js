import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel sirve la app en la raíz del dominio: base "/" (default).
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true }
});
