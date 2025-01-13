// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      title: 'PaySplit',
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
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true, // Enables service worker in dev mode for testing
    },
    manifest: {
      name: 'Payment Splitter',
      short_name: 'PaySplit',
      description: 'A simple app to split payments',
      lang: 'en',
      start_url: '/',
      display: 'standalone',
      background_color: '#f3f4f6',
      theme_color: '#f3f4f6',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /\/_nuxt\/.*\.js$/, // Cache JS files
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'nuxt-js-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 86400, // Cache for 1 day
            },
          },
        },
        {
          urlPattern: /\/_nuxt\/.*\.css$/, // Cache CSS files
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'nuxt-css-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 86400, // Cache for 1 day
            },
          },
        },
        {
          urlPattern: /\/$/, // Cache the HTML (root route) page
          handler: 'CacheFirst',
          options: {
            cacheName: 'html-cache',
            expiration: {
              maxEntries: 10, // Only keep 1 HTML page in the cache
              maxAgeSeconds: 86400, // Cache for 1 day
            },
          },
        },
      ],
    },
  },
})
