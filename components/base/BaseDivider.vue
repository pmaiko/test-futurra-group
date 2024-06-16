<template>
  <div class="base-divide relative w-full mt-6 mb-8">
    <div class="base-divide__line w-full h-0.5 bg-c-text opacity-10" />
    <div class="base-divider__text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase px-2 bg-c-modal-background">
      <span class="text-fs-p4 opacity-40 text-c-text">{{ text || t('or') }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    text?: string
  }>()
</script>
