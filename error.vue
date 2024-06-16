<template>
  <div class="error">
    <div class="container">
      <div class="error__inner">
        <div class="error__status-code">
          {{ error?.statusCode }}
        </div>

        <template v-if="error?.statusCode === 404">
          <div class="error__message sm:text-fs-p1 text-fs-p2">
            {{ t('pageNotFound') }}
          </div>
          <BaseButton
            :external="true"
            aria-label="Go back home"
            url="/"
            class="error__button"
          >
            {{ t('goBackHome') }}
          </BaseButton>
        </template>

        <template v-if="error?.statusCode === 500">
          <div class="error__message sm:text-fs-p1 text-fs-p2">
            {{ 'SERVER ERROR' }}
          </div>
          <div class="error__status-message">
            {{ error?.statusMessage }}
          </div>
        </template>

        <div
          v-if="error?.stack && error?.message"
          class="error__message sm:text-fs-p1 text-fs-p2"
        >
          {{ error?.message }}
        </div>

        <div
          v-if="error?.stack"
          class="error__stack"
          v-html="error?.stack"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { NuxtError } from '#app'

  defineProps({
    error: Object as () => NuxtError
  })

  // const handleError = () => clearError({ redirect: '/' })

  useSeo({
    seo: {
      title: 'Error',
      description: 'Error',
      og: {
        title: 'Error',
        description: 'Error',
        image: 'Error'
      }
    }
  })
</script>
<style lang="scss" scoped>
  .error {
    height: 100%;
    color: $c-text;

    &,
    .container {
      display: flex;
      flex-direction: column;
    }

    .container {
      flex: 1;
    }

    &__inner {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 0;
      text-align: center;
    }

    &__status-code {
      font-size: 98px;
    }

    &__status-message,
    &__message {
      margin-top: 16px;
    }

    &__button {
      margin-top: 48px;
    }

    &__stack {
      width: 100%;
      padding: 16px;
      margin-top: 32px;
      text-align: left;
      border-radius: $border-radius;
    }
  }
</style>
