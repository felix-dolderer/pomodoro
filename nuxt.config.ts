// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/hanko", "@nuxt/ui"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
  devtools: { enabled: true },
  ui: { safelistColors: ["yellow"] },
  nitro: { esbuild: { options: { target: "esnext" } } },
  compatibilityDate: "2024-11-08",
})
