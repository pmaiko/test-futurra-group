export default defineNuxtRouteMiddleware((to) => {
  const path = normalizePath(to.fullPath)
  if (path) {
    return navigateTo(path, { redirectCode: 301 })
  }

  if (localizePath(to.fullPath, useRuntimeConfig().public.LOCALE_DEFAULT) === '/') {
    return navigateTo(localizePath('/?abtest=var1'), { redirectCode: 302 })
  }
})
