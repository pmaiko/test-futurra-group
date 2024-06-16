import type { Field } from '~/types/form'

export interface FormField extends Field {
  modelValue: any
  error?: string,
  icon?: string,
  iconClass?: string,
}

export type FormFieldEmit = {
  (e: 'update:modelValue', value: FormField['modelValue']): void
  (e: 'blur'): void
  (e: 'focus'): void
}
