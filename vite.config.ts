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
      port: 3000,
      open: false
    }
  };
});
