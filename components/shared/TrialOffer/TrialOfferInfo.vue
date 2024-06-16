<template>
  <div class="trial-offer-info">
    <div
      :class="[
        'flex',
        {'justify-between': isTimerVisible},
        {'justify-center sm:justify-start text-center sm:text-left': !isTimerVisible}
      ]"
    >
      <div
        :class="[
          'trial-offer-info__content',
          {'mr-3 sm:mr-7': isTimerVisible}
        ]"
      >
        <BaseTitle
          v-animate
          class="trial-offer-info__title font-extrabold"
          level="4"
        >
          <span
            class="v-html-styles-light"
            v-html="title"
          />
        </BaseTitle>
        <p
          v-animate
          class="trial-offer-info__subtitle sm:text-fs-p1 text-fs-p2 mt-2"
        >
          {{ isTimerVisible ? subtitle : promoEndText }}
        </p>

        <div
          v-if="isTimerVisible"
          v-animate
        >
          <p
            v-if="hint"
            class="trial-offer-info__hint sm:text-fs-p2 text-fs-p3 line-through opacity-50"
          >
            {{ hint }}
          </p>
        </div>
      </div>

      <div
        v-if="isTimerVisible"
        v-animate
      >
        <CountdownTimer
          :startTime="startTime"
          :promoTotalTime="promoTotalTime"
          :promoEndTime="promoEndTimeWithElapsed"
          :elapsedTime="elapsedTime"
          @promoEnded="onPromoEnded"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import CountdownTimer from '~/components/shared/CountdownTimer.vue'

  const props = defineProps<{
    title: string,
    subtitle: string,
    hint: string,
    promoTotalTime: number,
    promoEndTime: number,
    promoEndText: string
  }>()

  const startTime = useState(() => {
    return Date.now()
  })

  const elapsedTime = useState('elapsedTime', () => {
    return parseInt(useCookie('elapsedTime').value || '0')
  })

  const promoEnded = ref(false)

  const promoEndTimeWithElapsed = computed(() => {
    return props.promoEndTime - elapsedTime.value
  })

  const isTimerVisible = computed(() => {
    return !promoEnded.value && startTime.value < promoEndTimeWithElapsed.value
  })

  const onPromoEnded = () => {
    promoEnded.value = true
  }
</script>
<style lang="scss">
  //
</style>
