import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Mudança para domínio personalizado
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Copiar 404.html para o build
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          router: ['react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});