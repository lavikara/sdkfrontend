<template>
  <div class="tw-relative tw-flex tw-flex-col">
    <label :for="label">{{ label }}</label>
    <input
      type="email"
      class="tw-text- tw-rounded tw-p-4 focus:tw-border-primary"
      :class="{
        'tw-border-error': showError === true,
      }"
      v-model="value"
      @input="$emit('set', value)"
      @blur="$emit('validate', placeHolder)"
      :placeholder="placeHolder"
      :disabled="disabled"
      required
    />
    <p class="tw-absolute tw--bottom-4 tw-right-0 tw-text-error tw-text-xs">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
export default {
  name: "OnboardingEmailInput",

  emits: ["set", "validate"],

  props: {
    placeHolder: { type: String, default: () => "", required: true },
    label: { type: String, default: () => "", required: true },
    email: { type: String, default: () => "", required: true },
    error: { type: Object, default: () => {}, required: true },
    disabled: { type: Boolean, default: () => false },
  },

  data() {
    return {
      showError: false,
      errorMsg: "",
      value: "",
    };
  },

  methods: {
    checkError() {
      if (Object.keys(this.error).length === 0) {
        this.showError = false;
        this.errorMsg = "";
        return;
      }
      if (this.error.$property === "email") {
        this.showError = true;
        this.errorMsg = this.error.$message;
      }
    },
  },

  watch: {
    error(newValue, oldValue) {
      deep: true;
      immediate: true;
      if (newValue !== oldValue) {
        this.checkError();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
