// https://nuxt.com/docs/api/configuration/nuxt-config
import preact from "@preact/preset-vite";
export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 3456,
    },
    // vite: {
        // optimizeDeps: {
        //     exclude: ["preact"],
        //     force: true,
        // },
    // },
});
