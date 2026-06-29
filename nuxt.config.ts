import { DEFAULT_API_BASE_URL, DEFAULT_PAGE_SIZE } from "./src/core/constants";

export default defineNuxtConfig({
  srcDir: "src/",
  compatibilityDate: "2026-06-29",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/payda.css", "~/assets/css/tailwind.css"],
  routeRules: {
    "/dashboard": { redirect: "/dashboard/tickets" },
  },
  imports: {
    dirs: ["modules/**/composables"],
  },
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/modules/tickets/components", pathPrefix: false },
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || DEFAULT_API_BASE_URL,
      defaultPageSize: Number(
        process.env.NUXT_PUBLIC_DEFAULT_PAGE_SIZE || DEFAULT_PAGE_SIZE,
      ),
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
