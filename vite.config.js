import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        remoteApp: 'http://localhost:4173/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom','highcharts-react-official'],
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  build:{
    target:'esnext'
  },
})
