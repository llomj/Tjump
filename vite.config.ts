import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use base path for GitHub Pages production build, but '/' for local development
  const repo = process.env.VITE_BASE_REPO || 'python-exercisesV1';
  const base = mode === 'production' ? `/${repo}/` : '/';
  
  return {
    plugins: [react()],
    base,
    server: {
      // Use 5174 so dev is never served by the old SW cache on :3000 — you always see the latest app
      port: 5174,
      open: false,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    }
  };
});
