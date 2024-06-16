export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    const indexStore = useIndexStore()

    await Promise.all([
      indexStore.fetchGlobalData(),
      indexStore.fetchTranslations()
    ])

    const ramMb = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
    console.log(`Node RAM usage: ${ramMb}mb`)
  }
})
