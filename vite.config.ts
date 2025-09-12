import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
=======
  resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,avif}'],
<<<<<<< HEAD
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB limit for large images
=======
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
<<<<<<< HEAD
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Tucan Bit Casino',
        short_name: 'Tucan Bit',
        description: 'Premium online casino with crypto gaming',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
=======
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
<<<<<<< HEAD
          const info = assetInfo.name?.split('.') || [];
=======
          const info = assetInfo.name.split('.');
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
<<<<<<< HEAD
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
=======
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
      },
    },
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.avif'],
<<<<<<< HEAD
});
=======
});
>>>>>>> 85f70d7afd0f3aef29eea3e0162201894209f029
