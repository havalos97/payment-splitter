// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      title: 'Repartir gastos',
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  typescript: {
    typeCheck: true
  },
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    vue: {
      template: {},
    },
  },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'Repartir gastos',
      short_name: 'Repartir gastos',
      description: 'PWA que facilita el repartir gastos entre amigos',
      lang: 'es',
      display: 'fullscreen',
      background_color: '#ffffff',
      theme_color: '#bda8ff',
      start_url: '/',
    },
  },
})
