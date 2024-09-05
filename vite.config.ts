import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), sentryVitePlugin({
    org: "joseph-park",
    project: "javascript-react"
  })],

  css: { postcss: { plugins: [tailwindcss()] } },

  build: {
    sourcemap: true
  }
});