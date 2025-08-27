import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [
    react(),
   
  ],
  base: process.env.VITE_BASE_PATH ||  './',
  build: {
     // Output directory
    outDir: 'dist',
    // Generate sourcemaps for debugging (optional)
    sourcemap: true,
    // Reduce chunk sizes
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create vendor chunks based on package names
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('antd')) {
              return 'antd-vendor';
            }
            if (id.includes('lodash') || id.includes('axios')) {
              return 'utils-vendor';
            }
            // Group other node_modules into a vendor chunk
            return 'vendor';
          }},
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust warning limit if needed
    
  },
  define: {
    'process.env': process.env
  }
})
