import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://server-lovat.vercel.app/', // Your backend URL
        changeOrigin: true,
        secure: true
      }
    },
    historyApiFallback: true
  },
})
