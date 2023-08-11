// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth', 'dayjs-nuxt'],
    css: ["~/assets/css/main.css" ],
    runtimeConfig: {
        public: {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            AUTH_ORIGIN: process.env.AUTH_ORIGIN,
            AUTH_SECRET: process.env.AUTH_SECRET,
        },
        auth: {
            computed: {
                origin: process.env.AUTH_ORIGIN
            }
        }
        
    }
})
