<template>
  <BlockMain
    :id="id"
    :logo="logo"
    :image="backgroundImage"
  >
    <template #left>
      <CardWrapperVar1
        v-if="isMobile"
        class="mb-6"
      >
        <TrialOfferInfo
          :title="card.title"
          :subtitle="card.subtitle"
          :hint="card.hint"
          :promoTotalTime="card.promoTotalTime"
          :promoEndTime="card.promoEndTime"
          :promoEndText="card.promoEndText"
        />
      </CardWrapperVar1>
      <div class="lg:mt-4" />
      <BaseTitle
        level="1"
        class="font-extrabold"
      >
        <span
          class="v-html-styles"
          v-html="title"
        />
      </BaseTitle>
      <BaseTitle
        class="font-semibold mt-4"
        level="4"
      >
        <span
          class="v-html-styles"
          v-html="subtitle"
        />
      </BaseTitle>
      <div v-animate>
        <BaseButton
          :url="button.url"
          target="_blank"
          class="sm:w-72 mt-8"
          @click.prevent="openModal"
        >
          <span class="font-bold">{{ button.label }}</span>
        </BaseButton>
      </div>
    </template>

    <template #right>
      <CardWrapperVar1 :unwrap="isMobile">
        <TrialOfferCard>
          <template
            v-if="!isMobile"
            #head
          >
            <TrialOfferInfo
              :title="card.title"
              :subtitle="card.subtitle"
              :hint="card.hint"
              :promoTotalTime="card.promoTotalTime"
              :promoEndTime="card.promoEndTime"
              :promoEndText="card.promoEndText"
              class="mb-8 sm:mb-9"
            />
          </template>

          <template #body>
            <TrialOfferFeatures
              :list="card.list"
            />
          </template>

          <template #foot>
            <div v-animate>
              <BaseButton
                :url="card.paymentButton.url"
                target="_blank"
                icon="lock-icon"
                iconClass="w-6 h-6 mr-2"
                color="light"
              >
                <span class="font-semibold">{{ card.paymentButton.label }}</span>
              </BaseButton>
            </div>
            <div v-animate>
              <p class="text-fs-p4 mt-6 text-center opacity-50">
                {{ card.text }}
              </p>
            </div>
          </template>
        </TrialOfferCard>
      </CardWrapperVar1>
    </template>
  </BlockMain>
</template>
<script setup lang="ts">
  import type { BlockMainData } from '~/types/block'

  import BlockMain from '~/components/shared/BlockMain/BlockMainWrapper.vue'

  import CardWrapperVar1 from '~/components/shared/Card/CardWrapperVar1.vue'
  import TrialOfferCard from '~/components/shared/TrialOffer/TrialOfferCard.vue'
  import TrialOfferInfo from '~/components/shared/TrialOffer/TrialOfferInfo.vue'
  import TrialOfferFeatures from '~/components/shared/TrialOffer/TrialOfferFeatures.vue'

  defineProps<BlockMainData>()

  const { isMobile } = useHelpersStore()

  const { openModal } = usePaymentModal()
</script>
<style lang="scss" scoped>
  //
</style>
