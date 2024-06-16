import type { Tokens } from '~/types/auth'
import type { $Fetch } from 'ofetch'

export class ApiAuth {
  $fetch: $Fetch

  constructor ($fetch: $Fetch) {
    this.$fetch = $fetch
  }

  login = async ({ email, password }: { email: string, password: string }) => {
    return this.$fetch('/auth/login', {
      method: 'POST',
      body: {
        email,
        password
      }
    })
  }

  registration = async ({
    name,
    surname,
    middleName,
    email,
    phone,
    password
  }: { name: string, surname: string, middleName: string, email: string, phone: string, password: string }) => {
    return this.$fetch<any>('/auth/registration', {
      method: 'POST',
      body: {
        name,
        surname,
        middleName,
        email,
        phone,
        password
      }
    })
  }

  refresh = async ({ refreshToken }: { refreshToken: string }) => {
    return this.$fetch<Tokens>('/auth/refresh', {
      method: 'POST',
      body: {
        refreshToken
      }
    })
  }

  fetchUser = () => {
    return this.$fetch<any>('/protected/user', {
      method: 'GET'
    })
  }
}
