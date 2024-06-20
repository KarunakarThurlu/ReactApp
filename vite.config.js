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
        remoteApp: 'https://remoteapp-0dx9.onrender.com/assets/remoteEntry.js',
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
  server:{
    proxy: {
      '/assets/remoteEntry.js': {
        target: 'https://remoteapp-0dx9.onrender.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'https://reactapp-m3tu.onrender.com');
          });
        },
      },
  }
}
})
