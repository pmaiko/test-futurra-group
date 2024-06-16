import type { Locale } from '~/types'
import type { PaymentForm } from '~/types/form'

export const useIndexStore = defineStore('index', {
  state: () => ({
    globalData: null as Record<any, any> | null,
    translations: null as Record<any, any> | null,
    preloader: false
  }),

  getters: {
    header: state => _get(state, 'globalData.header', '') || null,
    footer: state => _get(state, 'globalData.footer', '') || null,
    forms: (state): { payment: PaymentForm } | null => _get(state, 'globalData.forms', '') || null,

    locales: (state): Locale[] | null  => _get(state, 'globalData.locales', '') || null,
    currentLocale: (state): Locale | null => _get(state, 'globalData.locales', []).find((locale: Locale) => locale?.current) || null,
    defaultLocale: (state): Locale | null => _get(state, 'globalData.locales', []).find((locale: Locale) => locale?.default) || null
  },

  actions: {
    setPreloader (payload: boolean) {
      this.preloader = payload
    },

    async fetchGlobalData () {
      try {
        this.globalData = await useNuxtApp().$api.fetchGlobalData() || null
      } catch (event) {
        throw new Error('Error -> fetchGlobalData')
      }
    },

    async fetchTranslations () {
      try {
        this.translations = await useNuxtApp().$api.fetchTranslations() || null
      } catch (event) {
        throw new Error('Error -> fetchTranslations')
      }
    }
  }
})
