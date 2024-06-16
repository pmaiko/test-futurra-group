<template>
  <section class="block-main-wrapper flex flex-col flex-1 overflow-hidden">
    <div class="container">
      <div class="block-main-wrapper__head">
        <div class="block-main-wrapper__logo">
          <BaseImage
            :image="logo"
            :lazy="true"
            objectFit="cover"
          />
        </div>
      </div>
    </div>

    <div class="container container_less flex flex-col flex-1 justify-center mt-6 mb-12">
      <slot name="default">
        <BlockMainColumns>
          <template #left>
            <slot name="left" />
          </template>
          <template #right>
            <slot name="right" />
          </template>
        </BlockMainColumns>
      </slot>
    </div>

    <div class="block-main-wrapper__image">
      <BaseImage
        :image="image"
        :lazy="true"
        objectFit="cover"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
  // https://vuejs.org/guide/components/v-model.html
  // const model = defineModel()
  import BlockMainColumns from '~/components/shared/BlockMain/BlockMainColumns.vue'

  defineProps<{
    logo: string | any
    image: string | any
  }>()
</script>
<style lang="scss" scoped>
  .block-main-wrapper {
    position: relative;

    //&::after {
    //  position: absolute;
    //  bottom: 140px;
    //  width: 100%;
    //  height: 1px;
    //  content: '';
    //  background-color: red;
    //}

    &__head {
      padding: 8px 0;
    }

    &__logo {
      position: relative;
      width: 179px;
      height: 40px;
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
    }
  }
</style>
