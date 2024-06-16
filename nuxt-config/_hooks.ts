const langRegExp = '([a-z]{2})'
// import { findStaticImports } from 'mlly'
// import MagicString from 'magic-string'

export default defineNuxtConfig({
  hooks: {
    'pages:extend' (routes) {
      routes.push({
        path: '/cabinet/:chapters*',
        file: '~/pages/[...chapters].vue',
        meta: {
          auth: true
        }
      })

      for (const route of routes) {
        route.path = `/:lang${langRegExp}?` + route.path
      }
    }

    // 'build:manifest': (manifest) => {
    //   // find the app entry, css list
    //   const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
    //   if (css) {
    //     // start from the end of the array and go to the beginning
    //     for (let i = css.length - 1; i >= 0; i--) {
    //       // if it starts with 'entry', remove it from the list
    //       if (css[i].startsWith('entry')) {css.splice(i, 1)}
    //     }
    //   }
    // }

    //     'vite:extendConfig' (config, { isServer }) {
    //       if (!isServer) {
    //         return
    //       }
    //       config.plugins?.push({
    //         name: 'ssr-styles',
    //         transform (code, id, options) {
    //           if (!id.endsWith('.vue')) {
    //             return
    //           }
    //           const styleImports = findStaticImports(code)
    //           if (!styleImports.length) {
    //             return
    //           }
    //           let styleCtr = 0
    //           const stylesIds = []
    //           const s = new MagicString(code)
    //           for (const i of styleImports) {
    //             if (!i.specifier.endsWith('.css')) {
    //               continue
    //             }
    //             const styleId = 'style_' + styleCtr++
    //             stylesIds.push(styleId)
    //             s.remove(i.start, i.end - 1)
    //             s.appendLeft(
    //               i.start,
    //               `import ${styleId} from ${JSON.stringify(i.specifier)}`
    //             )
    //           }
    //           s.append(`
    // const styles = [${stylesIds.join(
    //     ', '
    //   )}].map(s => '<style>' + s + '</style>').join('')
    // const _sfc_setup2 = _sfc_main.setup
    // _sfc_main.setup = (props, ctx) => {
    //   const ssrContext = __vite_useSSRContext()
    //   ssrContext.styles = ssrContext.styles || ''
    //   ssrContext.styles += styles
    //   return _sfc_setup2 ? _sfc_setup2(props, ctx) : undefined
    // }
    //             `)
    //           return { code: s.toString(), map: s.generateMap() }
    //         }
    //       })
    //     }
  }
})
