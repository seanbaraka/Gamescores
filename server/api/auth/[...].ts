import { NuxtAuthHandler } from "#auth"
import GoogleProvider from "next-auth/providers/google"
const { public: { clientId, clientSecret }} = useRuntimeConfig()
export default NuxtAuthHandler({
    secret: process.env.NUXT_SECRET,
    providers: [
        // @ts-expect-error
        GoogleProvider.default({
            clientId,
            clientSecret,
        })
    ]
})