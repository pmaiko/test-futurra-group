<template>
  <div class="language-select">
    <ul class="language-select__list">
      <li
        v-for="(locale, index) in locales"
        :key="index"
        class="language-select__list-item"
      >
        <NuxtLink
          :to="getLink(locale)"
          :external="true"
          :class="[
            'language-select__list-item-link',
            {'language-select__list-item-link_current': _get(currentLocale, 'code', '') === _get(locale, 'code', '')}
          ]"
        >
          {{ _get(locale, 'name', '') }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
  const { locales, currentLocale } = useIndexStore()

  const getLink = (locale) => {
    if (!_get(locale, 'default', '')) {
      return '/' + _get(locale, 'code', '')
    }
    return '/'
  }
</script>
