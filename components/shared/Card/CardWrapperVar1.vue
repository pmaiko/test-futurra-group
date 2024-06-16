<template>
  <template v-if="unwrap">
    <slot />
  </template>
  <div
    v-else
    v-animate="{ name: 'fade', duration: 0.3 }"
    class="card-wrapper relative z-[1] py-3 px-4 sm:px-6 sm:pt-9 sm:pb-6"
  >
    <div class="absolute inset-0 -z-[1] bg-c-text-secondary border-c-border border-[1px] border-solid rounded-xl sm:rounded-3xl" />
    <slot />

    <AsteroidImage class="card-wrapper__image hidden sm:block" />
  </div>
</template>
<script setup lang="ts">
  import AsteroidImage from '~/assets/images/asteroid.svg'

  defineProps<{
    unwrap?: boolean
  }>()
</script>
<style lang="scss" scoped>
  .card-wrapper {
    box-shadow: 0 4px 4px 0 #0000000F;

    &__image {
      position: absolute;
      top: -55px;
      right: 20px;
      width: 200px;
      height: 80px;
    }
  }
</style>
