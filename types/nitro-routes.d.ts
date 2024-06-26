// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/node/**:error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/[...error]').default>>>>
    }
    '/node/api/auth/login': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/api/auth/login.post').default>>>>
    }
    '/node/api/auth/refresh': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/api/auth/refresh.post').default>>>>
    }
    '/node/api/global-data': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/api/global-data').default>>>>
    }
    '/node/api/pages/:page': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/api/pages/[page]').default>>>>
    }
    '/node/api/protected/user': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/api/protected/user').default>>>>
    }
    '/node/api/translations': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../server/routes/node/api/translations').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/svg-sprite/generate': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../node_modules/@nuxtjs/svg-sprite/dist/runtime/server/generate').default>>>>
    }
  }
}
export {}