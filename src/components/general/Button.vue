<template>
  <button
    class="tw-bg-primary general__button tw-w-full tw-text-white tw-py-3 tw-px-4 tw-text-sm tw-box-border tw-rounded tw-font-medium"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: { type: String, required: true, default: () => "" },
  },
};
</script>
<style lang="scss" scoped>
.general__button {
  cursor: pointer;
  transition: all 300ms ease-in-out;
  &:disabled {
    cursor: not-allowed;
    background-color: rgba(77, 132, 255, 0.5);
  }
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      #4d84ff;
  }
}
</style>
