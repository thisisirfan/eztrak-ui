import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Optional: Set up alias for easier imports
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'], // Keep React as external
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
