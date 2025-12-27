import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                sidepanel: resolve(__dirname, 'sidepanel.html'),
                background: resolve(__dirname, 'src/background/index.ts'),
                content: resolve(__dirname, 'src/content/index.ts'),
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    // Keep background and content as root-level js files
                    if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
                        return '[name].js';
                    }
                    return 'assets/[name]-[hash].js';
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]'
            }
        },
        outDir: 'dist',
        emptyOutDir: true,
        // Ensure source maps for debugging
        sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})
