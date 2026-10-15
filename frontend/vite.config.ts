import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// DEVSLAYER: React + TS + Tailwind v4. The three.js scene is code-split via
// React.lazy so the initial bundle stays lean; see src/scene/WorldCanvas.tsx.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test-setup.ts'],
  },
})
