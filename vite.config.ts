/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_URL || '/'

  return defineConfig({
    base,
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory (use process.cwd to be ESM-safe)
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    build: {
      sourcemap: false,
      target: 'es2022',
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  })
}
