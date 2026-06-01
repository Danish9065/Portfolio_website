import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          vendor: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"]
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
});
