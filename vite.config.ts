import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({ exportAsDefault: true }),
    react(),
    checker({ typescript: true }),
    tsconfigPaths()
  ],
  server: {
    port: 3000
  }
});
