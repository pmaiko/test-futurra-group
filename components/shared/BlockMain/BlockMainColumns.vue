<template>
  <div class="block-main-columns">
    <div class="block-main-columns__row flex flex-wrap -mx-3 -mb-6">
      <div class="block-main-columns__col block-main-columns__col_left w-full px-3 lg:w-6/12 mb-6">
        <slot name="left" />
      </div>
      <div class="block-main-columns__col block-main-columns__col_right px-3 w-full lg:w-6/12 mb-6">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
