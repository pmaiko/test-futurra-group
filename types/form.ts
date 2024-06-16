import type { UILink } from '~/types/ui'
import type { ValidationArgs } from '@vuelidate/core'

export interface SelectItem {
  label: string,
  value: string | number | null
}

export interface Field {
  name: string
  type: string
  label?: string | null,
  placeholder?: string | null
  required?: boolean
  mask?: string,
  items?: SelectItem[]
}

interface Form {
  fields: Field[]
  submit: UILink
}

export interface BaseForm extends Form {
  rules?: ValidationArgs
}

export interface PaymentForm extends Form {
  title: string,
  PayPal: UILink,
  GooglePay: UILink
  close: UILink
}
