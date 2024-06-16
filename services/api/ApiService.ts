import type { $Fetch } from 'ofetch'
import { ApiAuth } from '~/services/api/ApiAuth'
import { ApiGlobal } from '~/services/api/ApiGlobal'

export class ApiService {
  $fetch: $Fetch
  apiAuth: ApiAuth
  apiGlobal: ApiGlobal

  constructor ($fetch: $Fetch) {
    this.$fetch = $fetch

    this.apiAuth = new ApiAuth(this.$fetch)
    this.apiGlobal = new ApiGlobal(this.$fetch)
  }

  getApis () {
    return {
      ...this.apiAuth,
      ...this.apiGlobal
    }
  }
}
