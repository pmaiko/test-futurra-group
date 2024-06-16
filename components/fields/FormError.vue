<template>
  <transition name="fade-down">
    <div
      v-if="error"
      class="form-error"
    >
      {{ error }}
    </div>
  </transition>
</template>
<script setup lang="ts">
  defineProps<{
    error?: string
  }>()
</script>
<style lang="scss">
  .form-error {
    margin-top: 4px;
    margin-left: 16px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    color: $c-error;

    &-svg {
      flex-shrink: 0;
      width: 12px;
      height: 13px;
      margin-right: 8px;
    }
  }
</style>
