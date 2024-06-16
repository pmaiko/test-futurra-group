export default defineNuxtPlugin((nuxtApp) => {
  const modules: Record<string, any> = import.meta.glob('~/directives/*.ts', { eager: true })

  for (const filePath in modules) {
    const fileName = filePath.match(/\/([^/]+)\.\w+$/)?.[1]

    if (fileName) {
      nuxtApp.vueApp.directive(fileName, modules[filePath].default)
    }
  }
})
