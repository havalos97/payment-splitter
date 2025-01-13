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
    manifest: {
      name: 'Payment Splitter',
      short_name: 'PaySplit',
      description: 'An app to split payments',
      lang: 'en',
      scope: '/',
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
      globPatterns: [
        '**/*.{js,css,html,png,svg,ico,woff,woff2,ttf,eot}',
        'manifest.webmanifest'
      ],
      globIgnores: ['_nuxt/_redirect*'],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^\/$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'start-url',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            }
          }
        },
        {
          urlPattern: /\.(?:js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
          }
        },
        {
          urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
            }
          }
        },
        {
          urlPattern: /^.*$/,  // Catch-all for HTML routes
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 24 * 60 * 60 // 24 hours
            },
            networkTimeoutSeconds: 3
          }
        }
      ],
    },
    strategies: 'injectManifest',  // Changed from 'generateSW'
    srcDir: 'service-worker',
    filename: 'sw.js',
    injectManifest: {
      injectionPoint: undefined
    }
  },
})
