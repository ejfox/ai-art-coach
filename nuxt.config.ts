// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  typescript: {
    strict: true,
    typeCheck: false, // Enable if you want type checking on build
  },

  app: {
    head: {
      title: 'AI Art Coach',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Your personal AI coach for artistic growth and creative goals' },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
});
