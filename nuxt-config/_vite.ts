// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import viteEslintPlugin from 'vite-plugin-eslint'
import type { PluginOption } from 'vite'
import vitePluginStylelint from 'vite-plugin-stylelint'
import viteCompression from 'vite-plugin-compression'

import variables from '../assets/variables'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  vite: {
    build: {},
    server: {},
    plugins: [
      isDev
        ? viteEslintPlugin({
          cache: false,
          include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue', '**/*.svelte']
        })
        : {} as PluginOption,
      isDev
        ? vitePluginStylelint({
          cache: false,
          include: ['**/*.{css,scss,sass,less,styl,vue,svelte}']

        })
        : {} as PluginOption,

      viteCompression()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            Object.entries(variables)
              .map(([key, value]) => {
                if (typeof value === 'object') {
                  return `$${key}: (${Object.entries(value)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ')});`
                }
                return `$${key}: ${value};`
              })
              .join('\n') +
            `
            @import "~/assets/styles/utils/index.scss";
          `
        }
      }
    }
  }
})
