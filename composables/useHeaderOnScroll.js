export const useHeaderOnScroll = () => {
  const MIN_SCROLL_TO_HIDE = 15

  const { bus } = useBus()
  const classes = ref({
    'header_on-top': false,
    'header_on-bottom': false,
    'header_hidden': false
  })

  const prevScrollPosition = ref(0)

  const onScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

    if (scrollTop < 0) {
      scrollTop = 0
    } else if (scrollTop > maxScroll) {
      scrollTop = maxScroll
    }

    const isOnTop = scrollTop <= 0
    const isOnBottom = scrollTop >= maxScroll - MIN_SCROLL_TO_HIDE

    if (isOnTop) {
      setTimeout(() => {
        classes.value['header_on-top'] = true
      }, 0)
    } else {
      classes.value['header_on-top'] = false
    }

    classes.value['header_on-bottom'] = isOnBottom

    const isScrollingDown = prevScrollPosition.value < scrollTop
    const isHidden = isScrollingDown && (scrollTop > MIN_SCROLL_TO_HIDE)

    classes.value['header_hidden'] = isHidden && !isOnBottom

    prevScrollPosition.value = scrollTop
  }

  onMounted(() => {
    bus.on('scroll', onScroll)
    onScroll()
  })

  onBeforeUnmount(() => {
    bus.off('scroll', onScroll)
  })

  return {
    classes
  }
}
