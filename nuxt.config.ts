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
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '/',
      icons: [
        {
          src: '/public/android-chrome-192x192.png',
          sizes: '192x192',
        },
        {
          src: '/public/android-chrome-512x512.png',
          sizes: '512x512',
        },
        {
          src: '/public/apple-touch-icon.png',
          sizes: '512x512',
        },
      ],
    },
  },
})
