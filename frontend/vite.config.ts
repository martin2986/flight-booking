import path from 'path';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const url = env.VITE_BACKEND_SERVER || 'http://localhost:8888/';

  const config = {
    plugins: [react(), eslint()],
    define: {
      'process.env': env,
    },
    resolve: {
      base: '/',
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: url,
          changeOrigin: true,
        },
      },
    },
  };
  return defineConfig(config);
};
