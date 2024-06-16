import type { UseFetchOptions } from 'nuxt/app'
import type { $Fetch } from 'nitropack'

export function useFetchPage<T> (
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$makeRequest as $Fetch
  })
}
