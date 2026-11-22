import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Necesario para que el hot reload funcione en Docker sobre Windows/macOS
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
