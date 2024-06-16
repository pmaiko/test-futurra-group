<template>
  <BaseForm
    :fields="fields"
    :submit="submit"
    :rules="rules"
  >
    <template #head>
      <BaseTitle
        :disabled="true"
        level="5"
        class="font-extrabold text-center"
      >
        {{ title }}
      </BaseTitle>

      <BaseButton
        :url="PayPal.url"
        target="_blank"
        icon="pay-pal-icon"
        color="secondary"
        class="mt-6"
        iconClass="w-[50px] h-[32px] mr-2.5"
      >
        <span class="font-bold uppercase">{{ PayPal.label }}</span>
      </BaseButton>

      <BaseButton
        :url="GooglePay.url"
        target="_blank"
        icon="google-pay-icon"
        color="neutral"
        class="mt-4"
        iconClass="w-6 h-6 mr-1.5"
      >
        <span class="font-bold uppercase">{{ GooglePay.label }}</span>
      </BaseButton>

      <BaseDivider />
    </template>
  </BaseForm>
</template>
<script setup lang="ts">
  import type { PaymentForm } from '~/types/form'
  import { minLength } from '@vuelidate/validators'

  const rules = {
    card: { minLength: minLength(19) },
    cvc: { minLength: minLength(3) }
  }

  defineProps<PaymentForm>()
</script>
