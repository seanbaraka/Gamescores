// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@sidebase/nuxt-auth', 'dayjs-nuxt', '@nuxthq/ui'],
    colorMode: {
        preference: 'light'
    },
    css: ["~/assets/css/main.css" ],
    router:{
        extendRoutes(routes, resolve) {
            routes.push(
                {
                  name: 'index',
                  path: '/',
                  component: resolve(__dirname, 'pages/index.vue'),
                },
              {
                name: 'members',
                path: '/members',
                component: resolve(__dirname, 'pages/members.vue'),
              },
              {
                  name: '404',
                path: '/:catchAll(.*)',
                component: resolve(__dirname,'pages/404.vue'),
              },
            );
        }
    },
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
        },
        redis: {
            port: process.env.REDISPORT,
            host: process.env.REDISHOST,
            username: 'default',
            password: process.env.REDISPASSWORD,
        }
    }
})
