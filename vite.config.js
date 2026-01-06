import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow ngrok and other external hosts
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok.io',
      'localhost'
    ]
  },
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate GSAP into its own chunk
          'gsap': ['gsap'],
          // Vendor chunk for React
          'vendor': ['react', 'react-dom']
        }
      }
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})
