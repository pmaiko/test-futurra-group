<template>
  <div
    ref="root"
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
      <div
        class="form-field__field"
      >
        <button
          ref="button"
          type="button"
          :name="name"
          class="form-field__input"
          @focus="onFocus"
          @blur="onBlur"
          @click="onFocus"
        >
          <span class="form-field__placeholder">{{ selected || placeholder || '-' }}</span>

          <span
            v-if="icon"
            :class="iconClass"
            class="form-field__icon"
          ><BaseSvg :name="icon" /></span>
          <span
            v-else
            class="form-field__icon form-field__icon_rotate"
          ><BaseSvg name="arrow-down-icon" /></span>
        </button>
      </div>
      <div class="form-field__outline" />

      <transition name="fade-down">
        <div
          v-show="_get(items, 'length', '') && state.isFocus"
          class="form-field__dropdown"
        >
          <ul class="form-field__dropdown-list">
            <li
              v-for="(item, index) in items"
              :key="index"
              :class="{'form-field__dropdown-list-item_active': item.value === modelValue}"
              class="form-field__dropdown-list-item"
              @click="onInput(item.value)"
            >
              {{ item.label }}

              <BaseSvg
                v-if="item.value === modelValue"
                name="check-icon"
                size="18"
                class="form-field__dropdown-list-item-icon"
              />
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <FormError :error="error" />
  </div>
</template>
<script setup lang="ts">
  import type { SelectItem } from '~/types/form'
  import type { FormField, FormFieldEmit } from '~/types/form-field'
  import { onClickOutside } from '@vueuse/core'
  import FormError from '~/components/fields/FormError.vue'

  const props = withDefaults(defineProps<FormField>(), {})
  const emit = defineEmits<FormFieldEmit>()

  const button = ref<HTMLElement | null>(null)

  const selected = computed(() => {
    return props.items?.find(item => item.value === props.modelValue)?.label || null
  })

  const {
    classes,
    state,
    onFocus,
    onBlur
  } = useFormField(['form-select', 'form-field'], props, emit, {
    active: !!props.modelValue || selected || props.placeholder
  })

  const onInput = (value: SelectItem['value']) => {
    emit('update:modelValue', value !== props.modelValue ? value : null)
    onBlur()
  }

  const root = ref(null)
  onClickOutside(root, (event: Event) => {
    if (event.target instanceof Element) {
      if (!event.target?.closest('.form-select') && state.isFocus) {
        onBlur()
      }
    }
  })
</script>
<style lang="scss" scoped>
  .form-field {
    &__icon {
      &_rotate {
        width: 18px;
        height: 18px;
        transition: transform $base-transition;
        transform-origin: center center;
      }
    }

    &__input,
    &__input::placeholder,
    &__dropdown-list-item {
      font-weight: 400;
    }

    &__input {
      padding-right: 24px;
    }

    &__field,
    &__outline {
      transition: $base-transition;
    }

    &_focus {
      .form-field {
        &__icon {
          &_rotate {
            transform: translateY(-50%) rotate(180deg);
          }
        }

        &__field,
        &__outline {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
</style>
