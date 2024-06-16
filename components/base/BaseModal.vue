<template>
  <VueFinalModal
    ref="modal"
    :lockScroll="lockScroll"
    :reserveScrollBarGap="false"
    contentClass="m-auto w-[400px] max-w-full pt-6 px-4 pb-4 bg-c-modal-background overflow-y-auto rounded-xl"
    contentTransition="vfm-slide-down"
    class="base-modal flex flex-col p-3"
  >
    <template #default="{ close }: any">
      <div class="base-modal__inner">
        <slot :close="close" />
      </div>
    </template>
  </VueFinalModal>
</template>
<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import type { ModalData } from '~/types/modal'

  defineProps<ModalData>()
</script>
<style lang="scss">
  .base-modal {
    &-scroller {
      max-height: 100%;
      padding-right: 8px;
      padding-bottom: 4px;
      overflow: hidden auto;

      @include custom-scroll;
    }
  }
</style>
