import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  root: './',
  base: '/', 
  plugins: [react(), envCompatible()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  build: {
    outDir: 'dist', 
  },
  server: {
    host: true,
    port: 3000,
    open: true, 
  },
  optimizeDeps: {
    include: ['axios'], 
  },
});
