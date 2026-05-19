import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Url-shortner/",
  plugins: [react()],
  server: {
    proxy: {
      '/shortUrls': 'http://localhost:5000'
    }
  }
})
