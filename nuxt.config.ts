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
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/nuxt-payment-splitter\.vercel\.app\/.*/, // Adjust this to match your API
          handler: 'NetworkFirst',
          options: {
            cacheName: 'app-cache',
            cacheableResponse: {
              statuses: [0, 200]
            },
            networkTimeoutSeconds: 10
          }
        },
        {
          urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            }
          }
        },
        {
          urlPattern: /\.(js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            }
          }
        }
      ]
    },
  },
})
