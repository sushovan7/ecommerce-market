import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["dotenv", "crypto"], // Exclude these packages from being bundled
  },
  resolve: {
    alias: {
      // Optionally, you can also alias 'crypto' to 'crypto-browserify' if needed for the browser.
      // 'crypto': require.resolve('crypto-browserify'),
    },
  },
});
