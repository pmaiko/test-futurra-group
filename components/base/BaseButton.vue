<template>
  <component
    v-bind="$attrs"
    :is="tag"
    :url="url"
    :target="target"
    :class="classes"
    type="button"
  >
    <span
      v-if="icon"
      :class="iconClass"
      class="base-button__icon flex items-center justify-center overflow-hidden"
    ><BaseSvg :name="icon" /></span>

    <span class="base-button__text"><slot /></span>

    <span
      v-if="loading"
      class="base-button__loading"
    >Loading...</span>
  </component>
</template>
<script setup lang="ts">
  const BaseLink = resolveComponent('BaseLink')

  const props = defineProps({
    url: {},
    disabled: Boolean,
    target: String,
    icon: String,
    iconClass: String,
    size: String,
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'neutral', 'light', 'transparent'].includes(value as string)
    },
    loading: Boolean
  })

  const slots = useSlots()
  const hasText = computed(() => {
    return !!(slots.default && slots.default()?.[0]?.children)
  })

  const classes = computed(() => [
    'base-button',
    { [`base-button_${props.size}`]: props.size },
    { 'base-button_has-icon': !!props.icon && hasText.value },
    { 'base-button_has-icon-not-text': !!props.icon && !hasText.value },
    { [`base-button_${props.icon}`]: props.icon },
    { [`base-button_color-${props.color}`]: props.color },
    { 'base-button_loading': props.loading },
    { 'base-button_disabled': props.disabled }
  ])

  const tag = computed(() => {
    if (props.url) {
      return BaseLink
    } else {
      return 'button'
    }
  })
</script>
<style lang="scss" scoped>
  .base-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    padding: 18px 24px;
    text-align: center;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: $border-radius;

    $root: &;

    &_color {
      &-primary {
        color: $c-button-primary-text;
        background-color: $c-button-primary;
        transition: $base-transition;

        @include hover {
          color: $c-button-primary-hover-text;
          background-color: $c-button-primary-hover;
        }
      }

      &-secondary {
        color: $c-button-secondary-text;
        background-color: $c-button-secondary;
        transition: $base-transition;

        @include hover {
          background-color: $c-button-secondary-hover;
        }
      }

      &-neutral {
        color: $c-button-neutral-text;
        background-color: $c-button-neutral;
        border-color: $c-button-light-border;
        transition: $base-transition;

        @include hover {
          color: $c-button-neutral-hover-text;
          background-color: $c-button-neutral-hover;
          border-color: $c-button-neutral-hover-border;
        }
      }

      &-light {
        color: $c-button-light-text;
        background-color: $c-button-light;
        border-color: $c-button-light-border;
      }
    }

    &_disabled {
      pointer-events: none;

      &#{$root} {
        &_color {
          &-primary {
            color: $c-button-primary-disabled-text;
            background-color: $c-button-primary-disabled-background;
          }
        }
      }
    }
  }
</style>
