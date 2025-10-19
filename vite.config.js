import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Important fix for GitHub Pages
export default defineConfig({
  base: '/e-plantShopping/', 
  plugins: [react()],
})
