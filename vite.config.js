import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 你的仓库是 kaijiHou/kaijihou.github.io（用户主页站点），base 用 '/'
  base: '/',
})