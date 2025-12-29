import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,    
    port: 9005,     

    proxy: {
      '/api': {
        target: 'http://30.30.30.222:65532',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  preview: {
    host: true,      
    port: 9005
  }
})
