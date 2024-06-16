export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', () => {
    // html.head.push('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">')
  })
})
