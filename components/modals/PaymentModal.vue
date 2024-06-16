<template>
  <BaseModal
    :lockScroll="true"
    class="payment-modal"
  >
    <template #default="{ close }">
      <template v-if="forms?.payment">
        <PaymentForm
          v-bind="forms?.payment"
        />
        <BaseButton
          :url="_get(forms, 'payment.close.url', '')"
          target="_blank"
          type="submit"
          color="transparent"
          class="base-form__submit mt-3 w-full opacity-40"
          @click.prevent="() => close()"
        >
          <span class="text-fs-p2 font-semibold">{{ _get(forms, 'payment.close.label', '') }}</span>
        </BaseButton>
      </template>
      <div v-else>
        Oops...
      </div>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
  import type { ModalData } from '~/types/modal'
  import PaymentForm from '~/components/forms/PaymentForm.vue'

  defineProps<ModalData>()

  const { forms } = useIndexStore()
</script>
