import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Permite servir os arquivos também no subcaminho do repositório no Pages.
  base: './',
  plugins: [react(), tailwindcss()],
})
