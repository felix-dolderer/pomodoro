// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/hanko"],
  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
  devtools: { enabled: true },
  hanko: {
    apiURL: "",
  },
});
