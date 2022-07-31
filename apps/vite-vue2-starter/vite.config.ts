import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
})
