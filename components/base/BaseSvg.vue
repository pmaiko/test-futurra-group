<template>
  <SvgIcon
    :name="`/${name}`"
    :class="[$style['base-svg'], $style[`base-svg_size-${size}`]]"
  />
</template>
<script setup>
  defineProps({
    name: String,
    size: {
      type: String,
      validator: value => ['32', '24', '16', '18', '12', '8'].includes(value)
    }
  })
</script>
<style lang="scss" module>
  .base-svg {
    &_size {
      &-32 {
        width: 32px;
        height: 32px;
      }

      &-24 {
        width: 24px;
        height: 32px;
      }

      &-18 {
        width: 18px;
        height: 18px;
      }

      &-16 {
        width: 16px;
        height: 16px;
      }

      &-12 {
        width: 12px;
        height: 12px;
      }

      &-8 {
        width: 8px;
        height: 8px;
      }
    }
  }
</style>
