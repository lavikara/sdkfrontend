<template>
  <div id="textarea-input" class="tw-relative">
    <div
      class="tw-flex"
      :class="[showLabel ? 'tw-justify-between' : 'tw-justify-end']"
    >
      <label v-if="showLabel" :for="label" class="tw-text-sm">
        {{ label }}
      </label>
      <span class="tw-text-sm tw-text-black-light tw-text-end">{{
        textData.length + "/" + maxlength
      }}</span>
    </div>
    <textarea
      class="tw-w-full tw-rounded focus:tw-border-primary tw-p-4"
      :class="{
        'tw-border-error': showError,
      }"
      :placeholder="placeHolder"
      :name="name"
      :id="id"
      :maxlength="maxlength"
      :rows="rows"
      v-model="textData"
      @input="setInput"
      @blur="validateInput"
      required
    ></textarea>
    <p
      class="tw-absolute tw-left-0 tw-top-0 tw-right-px tw-text-error tw-text-xs"
    >
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "TextAreaInput",

  emits: ["set", "valid"],

  props: {
    placeHolder: { type: String, default: () => "", required: true },
    label: { type: String, default: () => "", required: true },
    name: { type: String, default: () => "", required: true },
    id: { type: String, default: () => "", required: true },
    text: { type: String, default: () => "", required: true },
    disabled: { type: Boolean, default: () => false },
    showLabel: { type: Boolean, default: () => false },
    maxlength: { type: Number, default: () => 100000000 },
    rows: { type: Number, default: () => 0 },
  },

  data() {
    return {
      v$: useValidate(),
      textData: "",
      errorMsg: "",
      showError: false,
    };
  },

  validations() {
    return {
      text: { required },
    };
  },

  mounted() {
    this.textData = this.text;
    this.textData === "" ? "" : this.validateInput();
  },

  methods: {
    setInput() {
      this.showError = false;
      this.errorMsg = "";
      this.$emit("set", this.textData);
    },

    validateInput() {
      this.v$.$reset();
      this.v$.text.$touch();
      if (this.v$.$errors.length === 0) {
        this.$emit("valid", true);
        return (this.showError = false), (this.errorMsg = "");
      }
      this.$emit("valid", false);
      this.errorMsg = this.v$.$errors[0].$message;
      this.showError = true;
    },
  },

  watch: {
    text(newValue, oldValue) {
      deep: true;
      immediate: true;
      if (newValue !== oldValue) {
        this.textData = newValue;
        this.validateInput();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
