import type { Locale } from '~/types'
import type { $Fetch } from 'ofetch'

export class ApiGlobal {
  $fetch: $Fetch

  constructor ($fetch: $Fetch) {
    this.$fetch = $fetch
  }


  fetchGlobalData = () => {
    return this.$fetch<{
      locales: Locale[],
    }>('/global-data', {
      method: 'GET'
    })
  }

  fetchTranslations = () => {
    return this.$fetch('/translations', {
      method: 'GET'
    })
  }
}
