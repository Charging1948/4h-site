/** @type {import('vite').UserConfig} */
export default {
    root: './src',
    server: {
        port: 4000,
        open: true,
        watch: true,
        hmr: true,
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    preview: {
        port: 4000,
        open: true,
        watch: true,
        hmr: true,
    },
}