import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@config": "/src/config",
        "@features": "/src/features",
        "@hooks": "/src/hooks",
        "@layouts": "/src/layouts",
        "@pages": "/src/pages",
        "@services": "/src/services",
        "@store": "/src/store",
      },
    },
  };
});
