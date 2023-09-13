<template>
  <div
    id="withdraw-header"
    class="tw-text-center tw-text-lg tw-font-semibold tw-px-8"
    :class="{
      'tw-mt-0': $route.name === 'TokenOverview',
      'tw-mt-0': $route.name === 'EsopOverview',
      'tw-mt-0': $route.name === 'TokenOverview',
    }"
  >
    <h3 class="tw-max-w-sm tw-text-secondary tw-mx-auto" v-html="title"></h3>
  </div>
</template>

<script>
export default {
  name: "WithdrawSubHeading",

  props: {
    title: { type: String, default: () => "", required: true },
  },
};
</script>

<style lang="scss" scoped></style>
