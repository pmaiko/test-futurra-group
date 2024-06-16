import { useModal } from 'vue-final-modal'

export const injectModal = ({ modalName, props, slots }: { modalName: string, props?: Record<any, any>, slots?: any }) => {
  const modal = useModal({
    component: defineAsyncComponent(async () => {
      return await import(`~/components/modals/${modalName}.vue`)
    }),
    attrs: {
      ...props,
      onClose () {
        modal.close()
      }
    },
    slots
  })

  return modal
}
