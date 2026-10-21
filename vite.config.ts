import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/sowji-aot/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
});
