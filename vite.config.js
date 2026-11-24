import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://zineb06.github.io/My-portfolio/ on GitHub Pages
  base: '/My-portfolio/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})
