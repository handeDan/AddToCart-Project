import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Üretim çıktısının yolu
    rollupOptions: {
      output: {
        // Vercel üzerinde çalışacak şekilde yapılandırmalar yapılabilir
      },
    },
  },
});
