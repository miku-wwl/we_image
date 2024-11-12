// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 3456,
    },
    // vite: {
    //     optimizeDeps: {
    //         exclude: ["@image-sass/api"],
    //         force: true,
    //     },
    // },
});
