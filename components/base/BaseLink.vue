<template>
  <NuxtLink
    :to="localizePath(url)"
    :external="external || localExternal"
    :target="target"
    noPrefetch
  >
    <slot />
  </NuxtLink>
</template>
<script setup>
  const props = defineProps({
    url: String,
    target: String,
    external: Boolean
  })

  const localExternal = computed(() => {
    return !!(/(http|https)|(tel:)|(mailto:)/.test(props.url) || props.target === '_blank')
  })
</script>
