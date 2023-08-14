import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
    const storage = useStorage()

    // Dynamically pass in credentials from runtime configuration, or other sources
    const driver = redisDriver({
        base: 'redis',
        host: useRuntimeConfig().redis.host,
        port: parseInt(useRuntimeConfig().redis.port),
        username: useRuntimeConfig().redis.username,
        password: useRuntimeConfig().redis.password,
    })

    storage.mount('redis', driver)
})