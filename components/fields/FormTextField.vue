<template>
  <div
    :class="classes"
    class="form-field"
  >
    <div class="form-field__control">
      <div
        v-if="label"
        class="form-field__label"
      >
        {{ label }}
      </div>
      <div class="form-field__field">
        <input
          v-maska="mask"
          :name="name"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder || ''"
          :required="required"
          class="form-field__input"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        >
      </div>

      <div class="form-field__outline" />

      <span
        v-if="icon"
        :class="iconClass"
        class="form-field__icon"
      ><BaseSvg :name="icon" /></span>
    </div>

    <FormError :error="error" />
  </div>
</template>
<script setup lang="ts">
  import { vMaska } from 'maska/vue'
  import FormError from '~/components/fields/FormError.vue'
  import type { FormField, FormFieldEmit } from '~/types/form-field'

  const props = withDefaults(defineProps<FormField>(), {})
  const emit = defineEmits<FormFieldEmit>()

  const {
    classes,
    onInput,
    onFocus,
    onBlur
  } = useFormField(['f-text-field', 'form-field'], props, emit)
</script>
