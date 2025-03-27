import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const fullApiUrl = env.VITE_API_BASE_URL; // e.g., http://localhost:3000/api
  const apiTarget = fullApiUrl.replace(/\/api\/?$/, ''); // Remove /api for proxy

  return {
    plugins: [vue(), svgLoader()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
