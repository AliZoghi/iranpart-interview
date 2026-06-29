export default defineNuxtConfig({
  srcDir: 'src/',
  compatibilityDate: '2026-06-29',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  imports: {
    dirs: ['modules/**/composables']
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://api.fixent.ir/api'
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
