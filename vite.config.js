import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'firebase'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})