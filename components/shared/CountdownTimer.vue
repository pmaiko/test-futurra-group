<template>
  <div
    :class="{'count-down-timer_low': isLow}"
    class="count-down-timer text-fs-h4"
  >
    <div class="count-down-timer__time">
      {{ timeData?.minutes }}:{{ timeData?.seconds }}
    </div>
    <div
      class="count-down-timer__progress"
      :style="{width: progressWidth}"
    />
  </div>
</template>
<script setup lang="ts">
  import CountdownTimerService, { type TimeData } from '~/services/CountdownTimerService'

  const props = defineProps<{
    startTime: number,
    promoTotalTime: number,
    promoEndTime: number,
    elapsedTime: number
  }>()
  const emit = defineEmits<{
    (e: 'promoEnded'): void
  }>()

  const timeData = ref<TimeData | null>(null)
  const progress = ref<number | null>(null)

  const progressWidth = computed(() => {
    return `${((progress.value || 0) - 100) * -1}%`
  })

  const isLow = computed(() => {
    return (progress.value || 0) > 90
  })

  const countdownTimerService = new CountdownTimerService(
    props.startTime,
    props.promoTotalTime,
    props.promoEndTime,
    () => {
      emit('promoEnded')
    },
    (data) => {
      timeData.value = data.timeData
      progress.value = data.progress

      if (import.meta.client) {
        useCookie('elapsedTime').value = String(props.elapsedTime + data.elapsedTime)
      }
    }
  )

  onMounted(() => {
    countdownTimerService.start()
  })

  onBeforeUnmount(() => {
    countdownTimerService.destroy()
  })
</script>
<style lang="scss">
  .count-down-timer {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 60px;
    overflow: hidden;
    color: $c-timer-text;
    text-align: center;
    background-color: $c-timer-background;
    transition: $base-transition;

    @include respDown(xs) {
      width: 110px;
      height: 47px;
    }

    &_low {
      box-shadow: 0 0 0 2px $c-timer-low;
    }

    &,
    &__progress {
      border-radius: $border-radius;
    }

    &__progress {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 100%;
      background-color: $c-timer-progress;
      transition: $base-transition;
    }
  }
</style>
