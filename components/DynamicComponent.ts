export default defineComponent({
  props: {
    id: String,
    attributes: Object
  },
  async setup (props) {
    const { isMobile } = useHelpersStore()
    const loadComponent = async () => {
      try {
        if (isMobile) {
          return await import(`../components/blocks/${props.id}.mobile.vue`)
        } else {
          return await import(`../components/blocks/${props.id}.vue`)
        }
      } catch (error) {
        try {
          if (!isMobile) {
            return await import(`../components/blocks/${props.id}.mobile.vue`)
          } else {
            return await import(`../components/blocks/${props.id}.vue`)
          }
        } catch (error) {
          return () => h(
            'div', { style: 'color: red; margin: 24px; text-align: left' },
            `Component (${props.id}) that you are trying to load does not exist.`
          )
        }
      }
    }

    const component = await loadComponent()
    return {
      component: component?.default || component
    }
  },

  render () {
    return h(this.component, {
      id: this.id,
      ...this.attributes
    })
  }
})
