import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
const { public: { clientId, clientSecret, AUTH_SECRET }} = useRuntimeConfig()
export default NuxtAuthHandler({
    secret: AUTH_SECRET,
    providers: [
        // @ts-expect-error
        GoogleProvider.default({
            clientId,
            clientSecret,
        })
    ]
})