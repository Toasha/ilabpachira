import { defineConfig } from 'vite';

// 相対パスベース (GitHub Pages / どこにデプロイしても絶対パス崩れしない設定)
export default defineConfig({
  base: './',
});
