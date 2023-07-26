// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/hanko", "@nuxthq/ui"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
  devtools: { enabled: true },
  hanko: { apiURL: "" },
  ui: { icons: ["simple-icons"] },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});
