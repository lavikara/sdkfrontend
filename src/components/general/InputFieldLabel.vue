<template>
  <div class="tw-relative custom-form" :class="{ 'tw-h-12': isDropdown }">
    <label
      @click="$emit('label-click')"
      :for="label"
      class="tw-text-black-light tw-ml-5 custom-form__label tw-font-medium"
      :class="[
        inputActive ? 'custom-form__label--active' : null,
        isDropdown ? 'custom-form__label--z-index' : null,
      ]"
      >{{ label }}</label
    >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "AssetFieldLabel",
    data() {
      return {};
    },
    emits: ["label-click"],
    props: {
      label: {
        type: String,
      },
      inputActive: {
        type: Boolean,
        required: true,
        default: () => false,
      },
      isDropdown: {
        type: Boolean,
        required: false,
        default: () => false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-form {
    &__label {
      position: absolute;
      transition: all 500ms ease-in-out;
      top: 9px;
      color: #a3a8b3;
      padding: 2px 10px;
      &--z-index {
        z-index: 1;
      }
      &--active {
        font-size: 12px;
        top: -9px;
        z-index: 2;
        display: inline;
        background: #fff;
        color: #4f5877;
      }
    }
  }
</style>
