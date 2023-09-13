<template>
  <div class="tw-w-full">
    <button
      type="submit"
      class="tw-w-full tw-flex tw-justify-center tw-bg-primary tw-rounded tw-font-semibold tw-text-white tw-p-4"
      :class="{
        'tw-bg-error-light tw-text-error hover:tw-text-white hover:tw-bg-error':
          title == 'Decline' ||
          title == 'Yes, Decline' ||
          title == 'Yes, Deactivate' ||
          title == 'Yes, Delete' ||
          title == 'Deactivate My Account' ||
          title == 'Permanently Delete My Account' ||
          title == 'Delete My Account',
        'tw-bg-[#E5EDFF] tw-text-secondary-light hover:tw-text-white hover:tw-bg-primary':
          title == 'QR Code' || title == 'Setup Key',
        'tw-bg-[#001140] hover:tw-text-white': title == 'Withdraw Cash',
      }"
      :disabled="loading || disabled"
    >
      <img
        v-if="title === 'Fund Wallet'"
        class="tw-hidden sm:tw-block tw-mr-2"
        src="@/assets/img/plus-icon.svg"
        alt="plus"
      />
      <span v-show="!loading">{{ title }}</span>
      <img
        v-show="loading"
        class="tw-m-auto"
        src="@/assets/img/spinner.svg"
        alt="animated spinner"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: "OnboardingBtn",

  emits: ["btnClicked"],

  props: {
    title: { type: String, default: () => "", required: true },
    loading: { type: Boolean, default: () => false },
    disabled: { type: Boolean, default: () => false },
    bgColour: { type: String, default: () => "" },
  },
};
</script>

<style lang="scss" scoped></style>
