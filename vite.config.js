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
        port: 3100,
        open: false,
        cors: true,
        proxy:
        {
            "/api":
            {
                target: "http://localhost:9527",
                // target: "http://localhost:8756",
                changeOrigin: true,
                rewrite: (path) => path
            }
        }
    }
})
