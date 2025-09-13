import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Clean-Master-Privacy/',   // GitHub Pages repo adı
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined   // tek bundle (küçük projeler için)
      }
    }
  }
});
