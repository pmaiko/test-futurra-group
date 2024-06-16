import type { Tokens } from '~/types/auth'
import { FetchError } from 'ofetch'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    tokens: null as Tokens | null,
    user: null as any,
    refreshPromise: null as Promise<Tokens> | null
  }),

  getters: {
    isLoggedIn: state => !!state.tokens
  },

  actions: {
    setTokens (tokens: Tokens | null) {
      useCookie('tokens').value = JSON.stringify(tokens)
      this.tokens = tokens
    },

    async syncTokens () {
      const tokens = useCookie<Tokens>('tokens')
      this.tokens = tokens.value || null
    },

    async refreshTokens () {
      const refreshToken = this.tokens?.refreshToken

      if (!refreshToken) {
        throw new Error('USER_HAS_NOT_LOGGED_IN')
      }

      this.refreshPromise = this.refreshPromise || useNuxtApp().$api.refresh({ refreshToken })
      try {
        const data = await this.refreshPromise
        this.setTokens(data)
      } catch (event) {
        if (event instanceof FetchError) {
          if (event.status === 477) {
            console.warn(event.data)
            throw event
          }
        }
      }
      finally {
        this.refreshPromise = null
      }
    },

    async logout () {
      useCookie('tokens').value = null
      this.tokens = null
    },

    async fetchUser () {
      try {
        this.user = await useNuxtApp().$api.fetchUser()
      } catch (event) {
        console.error('Error fetchUser!')
      }
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
// }
