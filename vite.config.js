import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Vercel/Netlify serve the site at the domain root. The GitHub Pages
  // workflow sets GITHUB_ACTIONS, where the site lives under /My-portfolio/.
  base: process.env.GITHUB_ACTIONS ? '/My-portfolio/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Vercel sandbox/preview URLs (e.g. sb-xxxx.vercel.run) run the dev server
    allowedHosts: ['.vercel.run', '.vercel.app']
  },
  preview: {
    allowedHosts: ['.vercel.run', '.vercel.app']
  }
})
