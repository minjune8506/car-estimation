import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ["console", "debugger"],
  },
  resolve: {
    alias: {
      src: "/src",
      common: "/src/common",
      components: "/src/components",
      hooks: "/src/hooks",
      pages: "/src/pages",
      states: "/src/states",
      types: "/src/types",
    },
  },
});
