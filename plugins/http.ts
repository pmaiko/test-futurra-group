import { type $Fetch, FetchError } from 'ofetch'
import { HTTP_STATUS_UNAUTHORIZED } from '~/utils/config'
import type { HTTPMethod } from 'h3'
import { ApiService } from '~/services/api/ApiService'

export default defineNuxtPlugin( () => {
  const route = useRoute()
  const lang = (_get(route, 'params.lang', '') || useRuntimeConfig().public.LOCALE_DEFAULT) as string
  const baseURL = useRuntimeConfig().public.NODE_JS_API_URL
  const authHeader = 'authorization'
  const languageHeader = 'accept-language'
  const IGNORE_REFRESH_ROUTES = [`${baseURL}/auth/refresh`]

  const $makeRequest = $fetch.create({
    baseURL,
    retry: false,

    async onRequest ({ options }) {
      options.headers = options.headers || {}
      const headers = options.headers as Record<string, string>
      headers[languageHeader] = lang
      headers[authHeader] = getTokenEntry(authStore.tokens?.accessToken as string)

      await authStore.syncTokens()
    },

    async onResponse (context) {
      if (context.response?.status === HTTP_STATUS_UNAUTHORIZED && !IGNORE_REFRESH_ROUTES.includes(context.request as string)) {
        try {
          await authStore.refreshTokens()
          await $makeRequest(context.request, {
            ...context.options,
            method: context.options.method as HTTPMethod,
            onResponse (ctx) {
              Object.assign(context, ctx)
            }
          })
        } catch (event) {
          if (
            event instanceof Error && event.message === 'USER_HAS_NOT_LOGGED_IN' ||
            event instanceof FetchError && event.response?.status === HTTP_STATUS_UNAUTHORIZED
          ) {
            await authStore.logout()
            navigateTo('/login')
          }
        }
      }
    }
  })

  const authStore = useAuthStore()

  return {
    provide: {
      makeRequest: $makeRequest,
      api: new ApiService($makeRequest as $Fetch).getApis()
    }
  }
})

const getTokenEntry = (token: string) => {
  return `Bearer ${token}`
}

