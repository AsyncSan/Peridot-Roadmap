import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Prevents "process is not defined" crash and injects API Key
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Polyfill process.env to an empty object to prevent crashes in libs accessing it
      'process.env': JSON.stringify({})
    },
    build: {
      // Output to 'dist' to match vercel.json
      outDir: 'dist'
    }
  };
});