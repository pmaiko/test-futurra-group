<template>
  <div class="layout">
    <slot />

    <ModalsContainer />

    <!--SVG sprite-->
    <Icons class="svg-defs" />
  </div>
</template>
<script setup lang="ts">
  import { ModalsContainer } from 'vue-final-modal'
  import Icons from '~/assets/sprite/gen/icons.svg'
</script>
<style scoped>
  .svg-defs {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }
</style>
