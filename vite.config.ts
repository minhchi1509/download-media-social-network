import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), checker({ typescript: true }), tsconfigPaths()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'build'
  }
});
