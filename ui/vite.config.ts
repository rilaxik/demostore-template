import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#api': resolve('src/api'),
      '#assets': resolve('src/assets'),
      '#components': resolve('src/components'),
      '#consts': resolve('src/consts'),
      '#functions': resolve('src/functions')
    }
  }
});
