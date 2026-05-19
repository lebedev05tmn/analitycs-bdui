import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default ({ mode }) =>{
    const { FE_PROXY_HOST } = loadEnv(mode, process.cwd(), '');

  return defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
        proxy: {
        '/api': {
          target: FE_PROXY_HOST?.replace(/\/$|$/, '/'),
          headers: {
            Connection: 'keep-alive',
          },
          secure: false,
          changeOrigin: true,
        }
      },

  }
  
})
}
