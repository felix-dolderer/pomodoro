// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/hanko", "@nuxt/ui"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
  devtools: { enabled: true },
  ui: { icons: ["simple-icons"], safelistColors: ["yellow"] },
  nitro: { esbuild: { options: { target: "esnext" } } },
});
