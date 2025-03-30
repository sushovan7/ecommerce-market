import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["dotenv", "crypto"],
  },
  resolve: {
    alias: {},
  },
  build: {
    rollupOptions: {
      external: ["lucide-react", "stripe", "mongoose"],
    },
  },
});
