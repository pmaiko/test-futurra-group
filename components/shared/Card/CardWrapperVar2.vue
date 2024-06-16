<template>
  <template v-if="unwrap">
    <slot />
  </template>
  <div
    v-else
    v-animate="{ name: 'fade', duration: 0.3 }"
    class="card-wrapper relative z-[1] py-4 px-4 sm:px-6 sm:pt-9 sm:pb-6"
  >
    <div class="absolute inset-0 -z-[1] border-c-border sm:border-4 border-solid rounded-3xl overflow-hidden sm:backdrop-blur-sm">
      <div class="absolute inset-0 bg-c-text-secondary opacity-40" />
    </div>
    <slot />

    <div class="card-wrapper__image card-wrapper__image_rocket hidden sm:block">
      <BaseImage
        image="/rocket.png"
      />
    </div>

    <CircleImage class="card-wrapper__image card-wrapper__image_circle hidden sm:block" />
  </div>
</template>
<script setup lang="ts">
  import CircleImage from '~/assets/images/circle.svg'

  defineProps<{
    unwrap?: boolean
  }>()
</script>
<style lang="scss" scoped>
  .card-wrapper {
    &__image {
      &_rocket {
        @include aspect-ratio(calc(1 / 1));

        position: absolute;
        top: 50%;
        right: -10px;
        width: 247px;
        height: 247px;
        transform: translateX(50%) translateY(-50%);
      }

      &_circle {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -9;
        width: 86px;
        height: 86px;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
</style>
