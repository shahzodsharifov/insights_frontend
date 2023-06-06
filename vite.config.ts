import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import svgr from "vite-plugin-svgr-component"
export default defineConfig({
  plugins: [
    require('tailwind-scrollbar'),
    solidPlugin(),
    svgr(),
   ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
