<template>
  <article class="trial-offer-card">
    <div class="trial-offer-card__head">
      <slot name="head" />
    </div>

    <div class="trial-offer-card__body">
      <slot name="body" />
    </div>

    <div class="trial-offer-card__foot mt-6">
      <slot name="foot" />
    </div>
  </article>
</template>
<script setup lang="ts">
</script>
