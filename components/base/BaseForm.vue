<template>
  <form
    novalidate
    class="base-form"
    @submit.prevent
  >
    <slot name="head" />

    <slot name="default">
      <div class="base-form__fields">
        <div
          v-for="(field, index) in fields"
          :key="index"
          class="base-form__field"
        >
          <component
            :is="getComponentsByType(field.type)"
            v-model="formData[field.name]"
            v-bind="{
              ...field,
              ...getAdditionalOptionsByName(field.name)
            }"
            :error="getError(field.name)"
            @blur="onBlur(field.name)"
          />
        </div>
      </div>
    </slot>

    <slot name="submit">
      <BaseButton
        :url="submit.url"
        :disabled="disabled"
        target="_blank"
        type="submit"
        class="base-form__submit mt-10"
      >
        <span class="text-fs-p2 font-bold">{{ submit.label }}</span>
      </BaseButton>
    </slot>

    <slot name="foot" />
  </form>
</template>
<script setup lang="ts">
  import type { BaseForm } from '~/types/form'

  const props = defineProps<BaseForm>()

  const {
    formData,
    disabled,
    getComponentsByType,
    getAdditionalOptionsByName,
    getError,
    onBlur
  } = useForm(props)
</script>
<style lang="scss">
  .base-form {
    &__fields {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px -36px;
    }

    &__field {
      width: 100%;
      padding: 0 5px;
      margin-bottom: 36px;

      // need add to PaymentForm
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        width: 33.333%;
      }
    }
  }
</style>
