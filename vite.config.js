import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    React(),
    VitePWA({
      registerType: "autoUpdate"
    })
  ]
});
