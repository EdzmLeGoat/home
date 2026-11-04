import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: "/home/",
  plugins: [
    react(),
    {
      name: "github-pages-spa-fallback",
      closeBundle() {
        copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"))
      },
    },
  ],
})
