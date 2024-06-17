<template>
  <main class="page-content">
    <TheBreadcrumbs v-if="false" />

    <DynamicComponent
      v-for="(block, index) in data?.blocks"
      :key="index"
      v-bind="block"
      :class="[
        'page-block',
        {'page-block_first': index === 0}
      ]"
    />
  </main>
</template>
<script setup lang="ts">
  import type { Page } from '~/types/page'
  import { useSeo } from '~/composables/useSeo'

  import TheBreadcrumbs from '~/components/layout/TheBreadcrumbs.vue'
  import DynamicComponent from '~/components/DynamicComponent'

  definePageMeta({
    validate: () => {
      return true
    }
  })

  const route = useRoute()
  const path = localizePath(route.path, useRuntimeConfig().public.LOCALE_DEFAULT)
  const apiUrl = path !== '/' ? path : '/home'

  const params = { ...route.query }
  const randomVariant = useCookie(randomVariantKey)
  if (params[abTestKey] === 'test') {
    let variant
    if (randomVariant.value) {
      variant = randomVariant.value
    } else {
      variant = getRandomBoolean() ? Variants.var1 : Variants.var2
      randomVariant.value = variant
    }
    params[abTestKey] = variant
  }

  const { data, error } = await useFetchPage<Page>('/pages' + apiUrl, {
    params,
    lazy: false
  })

  const STATUS_CODES_ERROR = [404, 500]
  if (STATUS_CODES_ERROR.includes(Number(_get(error, 'value.statusCode')))) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }

  useSeo(data.value?.meta || null)
</script>
