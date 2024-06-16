<template>
  <span
    ref="refRoot"
    class="animate-number"
  >{{ current }}</span>
</template>
<script setup>
  import { addSpaceThousands } from '~/utils/add-space-thousands'

  const props = defineProps({
    number: [String, Number],
    startValue: [String, Number],
    endValue: [String, Number],
    spaceThousands: Boolean
  })
  const gsap = useGsap()
  const refRoot = ref(null)
  const current = ref(0)

  const animate = (newValue, oldValue) => {
    current.value = oldValue || 0

    gsap.to(current, {
      duration: 1,
      value: newValue,
      onUpdate: function () {
        if (props.spaceThousands) {
          current.value = addSpaceThousands(parseInt(String(current.value).replace(/,/g, '')))
        } else {
          current.value = parseInt(String(current.value).replace(/,/g, ''))
        }
      }
    })
  }

  watch(() => props.number, animate)

  onMounted(() => {
    // onInView
    animate(props.number)
  })
</script>

