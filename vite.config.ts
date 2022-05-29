import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // alias: {
  //   "/@asseets/":path.join(__dirname, "src/assets"),
  // },
  // assetsInclude: ['**/*.JPEG', '**/*.png']
  resolve: {
    // ↓ 追記
    alias: {
      "/@asseets/": `${__dirname}/src/assets/`, // path.join(__dirname, "src/") でも可
    },
  }
  // assetsInclude: ['**/*.JPEG', '**/*.png']
})
