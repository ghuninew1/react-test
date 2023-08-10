import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    strictPort: true,
    open: true,
    host: true,
    headers: {
      origin: 'http://localhost:5173'
    }
  },
})
