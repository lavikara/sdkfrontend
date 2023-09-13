<template>
  <div
    id="withdraw-header"
    class="tw-text-center tw-text-xl tw-py-3.5"
    :class="[
      bgChange == true ? 'tw-bg-secondary tw-text-white' : 'tw-bg-blue-bg200',
    ]"
  >
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: "WithdrawHeader",
  props: {
    title: { type: String, default: () => "", required: true },
    bgChange: { type: Boolean, default: () => false },
  },
};
</script>

<style lang="scss" scoped></style>
