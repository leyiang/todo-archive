import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from "unocss/vite";
import {presetAttributify, presetUno} from "unocss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetAttributify(),
        presetUno(),
      ],
      shortcuts: {
        "btn-reset": "bg-transparent border-none p-0 cursor-pointer text-1rem",
        "btn-primary": "bg-green-500 hover:bg-green-600 text-white",
        "btn-action": "py-10px px-1rem rounded bg-gray-200 text-gray-700 hover:bg-gray-300",
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
