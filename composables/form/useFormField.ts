import type { FormField, FormFieldEmit } from '~/types/form-field'

export const useFormField = (className: string | string[], props: FormField, emit: FormFieldEmit, data?: any) => {
  const classes = computed(() => {
    const arrayClassName = typeof className === 'string' ? [className] : className
    return arrayClassName.map((name) => {
      return [
        { [`${name}_active`]: data?.active || !!props.modelValue },
        { [`${name}_focus`]: state.isFocus },
        { [`${name}_error`]: !!props.error },
        { [`${name}_has-icon`]: !!props.icon }
      ]
    })
  })

  const state = reactive({
    isFocus: false,
    val: ''
  })

  const onInput = (event: any) => {
    const value = event?.target?.value || ''
    emit('update:modelValue', value)
  }

  const onFocus = () => {
    state.isFocus = true
    emit('focus')
  }

  const onBlur = () => {
    state.isFocus = false
    emit('blur')
  }

  return {
    classes,
    state,
    onInput,
    onFocus,
    onBlur
  }
}
