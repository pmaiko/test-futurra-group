import type { ErrorObject, ValidationArgs } from '@vuelidate/core'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { BaseForm } from '~/types/form'

export const useForm = (props: BaseForm) => {
  const formData = reactive({} as { [key: string]: string })
  const errors = ref({} as { [key: string]: string })
  const rules = props.fields.reduce((acc, field) => {
    if (field.required) {
      acc[field.name] = { required }
    }
    return acc
  }, {} as { [ket: string]: ValidationArgs })
  const mergedRules = _merge({}, rules, props.rules)

  const validator = props.rules ? useVuelidate(mergedRules, formData) : null

  const disabled = computed(() => {
    return validator?.value.$invalid
  })

  const componentsByType = {
    text: defineAsyncComponent(() => import('~/components/fields/FormTextField.vue')),
    password: defineAsyncComponent(() => import('~/components/fields/FormTextField.vue')),
    textarea: defineAsyncComponent(() => import('~/components/fields/FormTextField.vue')),
    select: defineAsyncComponent(() => import('~/components/fields/FormSelect.vue'))
  }

  const getComponentsByType = (type: string) => {
    return componentsByType[type as keyof typeof componentsByType] || 'div'
  }

  const getAdditionalOptionsByName = (name: string) => {
    const options = {
      card: {
        icon: 'mastercard-icon',
        iconClass: 'w-[32px] h-[22px]'
      }
    }
    return options[name as keyof typeof options] || {}
  }

  const getError = (name: string) => {
    if (errors.value[name]) {
      return errors.value[name]
    }
    const validateErrors = validator?.value?.[name]?.$errors || []
    const result = validateErrors.reduce((acc: string[], error: ErrorObject) => {
      acc.push(t(`validations.${error.$validator}`) || String(error.$message))
      return acc
    }, [])
    return result.join(', ')
  }

  const onBlur = _debounce((name: string | string[]) => {
    if (name instanceof Array) {
      name.forEach((i) => {
        validator?.value[i]?.$touch()
      })
    } else {
      validator?.value[name]?.$touch()
    }
  }, 300)

  return {
    getComponentsByType,
    getAdditionalOptionsByName,
    onBlur,
    getError,
    formData,
    disabled
  }
}
