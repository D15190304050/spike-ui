import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const viteEnv = import.meta.env;

// https://vitejs.dev/config/
export default ({mode}) => defineConfig({
    plugins: [react()],
    envDir: "./env",
    server:
    {
        host: '127.0.0.1',
        port: 3000,
        open: false,
        proxy:
        {
            "/api":
            {
                target: loadEnv(mode, "./env", ["VITE"]).VITE_API_URL,
                // target: "http://localhost:8756",
                changeOrigin: true,
            }
        }
    }
})
