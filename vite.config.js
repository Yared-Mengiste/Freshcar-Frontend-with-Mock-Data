import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Explicitly enable source maps
  },
  // base: process.env.VITE_BASE_PATH || "/Freshcar-Frontend-with-Mock-Data",
});
