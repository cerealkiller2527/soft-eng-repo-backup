import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import tailwindcss from '@tailwindcss/vite';
import * as process from 'process';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        preserveSymlinks: true,
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: 'localhost',
        port: parseInt(process.env.FRONTEND_PORT),
        proxy: {
            '/api': process.env.BACKEND_URL,
            // Remove the specific Google Places proxy rule - not needed because we're using hardcoded data
            /*
            '/api/google-places': {
                target: 'https://maps.googleapis.com/maps/api/place',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/google-places/, ''), // Remove base path
                secure: false, // Consider setting to true if target is HTTPS and valid cert
            },
            */
        },
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: 'build',
    },
    cacheDir: '.vite',
    plugins: [
        tailwindcss(),
        react(),
        eslint({
            exclude: ['**/node_modules/**', '**/.*/**', '**/.vite/**'],
            failOnWarning: false,
            failOnError: false,
        }),
    ],
});
