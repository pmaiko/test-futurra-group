<template>
  <div class="trial-offer-features">
    <ul class="trial-offer-features___list">
      <li
        v-for="(item, index) in list"
        :key="index"
        v-animate="{ delay: index * 0.1 }"
        class="trial-offer-features___item flex items-center"
      >
        <div class="trial-offer-features__icon mr-2.5">
          <BaseSvg
            name="star-icon"
            size="24"
          />
        </div>
        <div
          class="trial-offer-features__text text-fs-p2 font-normal v-html-styles-light v-html-styles-light_uniq"
          v-html="item"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    list: string[]
  }>()
</script>
<style lang="scss" scoped>
  .trial-offer-features {
    &__icon {
      color: $c-primary-light;
    }
  }
</style>
