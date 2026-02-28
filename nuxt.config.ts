// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
  devtools: { enabled: true },
  nitro: { esbuild: { options: { target: "esnext" } } },
  compatibilityDate: "2024-11-08",
})
