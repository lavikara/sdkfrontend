<template>
  <div
    class="tw-flex tw-justify-between tw-bg-gray-lightest tw-border-l-4 tw-border-l-error tw-px-8 tw-py-4"
  >
    <div class="md:tw-flex md:tw-items-center">
      <div class="tw-flex tw-mb-4 md:tw-mb-0">
        <img src="@/assets/img/red-info.svg" alt="caret" />
        <p class="tw-font-bold tw-whitespace-nowrap tw-ml-6 tw-mr-12">
          Payment Reminder
        </p>
      </div>
      <p class="tw-text-gray tw-mr-6">
        Your memebership is due for renewal, to avoid disconnection
        <span
          class="tw-text-black tw-underline tw-cursor-pointer"
          @click="$emit('renew')"
        >
          renew your membership
        </span>
      </p>
    </div>
    <img
      class="tw-cursor-pointer"
      src="@/assets/img/close-dark.svg"
      alt="caret"
    />
  </div>
</template>

<script>
export default {
  name: "PaymentRenewal",
};
</script>

<script setup></script>

<style lang="scss" scoped></style>
