import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { vitePluginMars3d } from 'vite-plugin-mars3d';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginMars3d()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
