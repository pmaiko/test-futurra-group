export const usePaymentModal = () => {
  const modal = injectModal({
    modalName: 'PaymentModal',
    props: {
      lockScroll: true
    }
  })

  const openModal = () => {
    modal.open()
  }

  return {
    openModal
  }
}
