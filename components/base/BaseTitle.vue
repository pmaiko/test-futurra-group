<template>
  <component
    :is="`h${level}`"
    v-animate="{ disabled }"
    :class="classes"
  >
    <slot />
  </component>
</template>
<script setup>
  const props = defineProps({
    level: {
      type: String,
      default: '2',
      validator: value => ['1', '2', '3', '4', '5', '6'].includes(value)
    },
    disabled: Boolean
  })

  const textClasses = {
    1: 'sm:text-fs-h1 text-fs-h3',
    2: 'sm:text-fs-h2 text-fs-h3',
    3: 'text-fs-h3',
    4: 'sm:text-fs-h4 text-fs-h6',
    5: 'text-fs-h5',
    6: 'text-fs-h6'
  }
  const classes = computed(() => {
    return [
      'base-title',
      textClasses[props.level]
    ]
  })
</script>
