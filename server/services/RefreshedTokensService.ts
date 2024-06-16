interface Storage {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>,
  getItems: () => Promise<{ [key: string]: string | null }[]>
}

class RefreshedTokensService {
  static instance: RefreshedTokensService | null = null
  private key: string = 'refreshed_token_'
  private expired: number = 10 // seconds
  private storage!: Storage

  constructor (storage: Storage) {
    if (RefreshedTokensService.instance) {
      return RefreshedTokensService.instance
    }
    if (!storage) {
      throw new Error('storage not transferred')
    }
    if (typeof storage !== 'object') {
      throw new Error('storage not correct')
    }
    if (!('getItem' in storage)) {
      throw new Error('storage getItem not implemented')
    }
    if (!('setItem' in storage)) {
      throw new Error('storage setItem not implemented')
    }
    if (!('removeItem' in storage)) {
      throw new Error('storage removeItem not implemented')
    }
    this.storage = storage
    RefreshedTokensService.instance = this
    return this
  }

  async checkIncludesToken (token: string) {
    await this.removeExpiredRefreshedTokens()

    const refreshedTokens = await this.getRefreshedTokens()
    return refreshedTokens.includes(token)
  }

  async setRefreshedToken (token: string, expired = this.getExpired()) {
    await this.storage.setItem(this.getKeyToken(token), expired)
  }

  private getKeyToken (token: string) {
    return this.key + token
  }

  private getExpired () {
    return String(new Date(new Date().getTime() + this.expired * 1000))
  }

  private getRefreshedTokenValue (token: string) {
    return this.storage.getItem(this.getKeyToken(token))
  }

  private async getRefreshedTokens () {
    const items = await this.storage.getItems()
    return items
      .map((item) => {
        const [keyToken] = Object.keys(item)
        return keyToken
      })
      .filter(keyToken => keyToken.startsWith(this.key))
      .map((keyToken) => {
        return keyToken.replace(this.key, '')
      })
  }

  private async removeRefreshedTokens () {
    const refreshedTokens = await this.getRefreshedTokens()
    await Promise.all(refreshedTokens.map((token) => {
      return this.removeRefreshedToken(token)
    }))
  }

  private async removeRefreshedToken (token: string) {
    await this.storage.removeItem(this.getKeyToken(token))
  }

  private async removeExpiredRefreshedTokens () {
    const refreshedTokens = await this.getRefreshedTokens()
    await Promise.all(refreshedTokens.map((token) => {
      return this.removeExpiredRefreshedToken(token)
    }))
  }

  private async removeExpiredRefreshedToken (token: string) {
    const refreshedTokenValue = await this.getRefreshedTokenValue(token)
    const expired = new Date(refreshedTokenValue as unknown as Date)
    const now = new Date(new Date().getTime())

    if (expired < now || !refreshedTokenValue) {
      await this.removeRefreshedToken(token)
    }
  }
}

export const storage: Storage = {
  getItem: async (key) => {
    return String((await useStorage('assets:server').getItem(`.data:${key}`))) || null
  },
  setItem: async (key: string, value: string)=> {
    await useStorage('assets:server').setItem(`.data:${key}`, value)
  },
  removeItem: async (key: string) => {
    await useStorage('assets:server').removeItem(`.data:${key}`)
  },
  getItems: async () => {
    const keys = await useStorage('assets:server').getKeys('.data')
    return await Promise.all(
      keys.map(async (fullPatch) => {
        const [, key] = fullPatch.split(':')
        const value = String((await useStorage('assets:server').getItem(fullPatch))) || null
        return {
          [key]: value
        }
      })
    )
  }
}

export const refreshedTokensService = new RefreshedTokensService(storage)
