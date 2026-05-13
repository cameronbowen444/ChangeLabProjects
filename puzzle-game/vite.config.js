import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Pieces of Japan",
        short_name: "Japan Puzzle",
        description: "A Japanese-themed puzzle game.",
        theme_color: "#217389",
        background_color: "#acb6e5",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/puzzle1.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
});
