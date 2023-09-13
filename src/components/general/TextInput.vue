<template>
  <div :id="id" class="tw-relative">
    <label :for="label" class="tw-text-sm tw-text-black-light">
      {{ showLabel ? label : "" }}
    </label>
    <input
      class="tw-w-full tw-bg-white tw-rounded tw-py-2"
      :class="{
        'tw-text-black-light tw-cursor-not-allowed': disabled,
        'tw-border tw-px-4 tw-py-4': $route.name !== 'PersonalInfo',
        'tw-border-0': $route.name === 'PersonalInfo',
        'tw-border-error': showError === true,
      }"
      :type="type"
      :placeholder="placeHolder"
      @input="setInput"
      @keyup.enter="validate"
      @blur="validate"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      :name="name"
      :id="id"
      v-model="textData"
    />
    <p
      class="tw-absolute tw-right-px tw-text-error tw-text-xs"
      :class="[
        $route.name === 'LegalTerms' || $route.name === 'EmployeeStocks'
          ? 'tw--top-4'
          : '',
      ]"
    >
      <!-- <p
      class="tw-absolute tw-right-px tw-text-error tw-text-xs"
      :class="{
        'tw-top-2': $route.name !== 'LegalTerms',
        'tw-top-2': $route.name !== 'EmployeeStocks',
      }"
    > -->
      {{ errorMsg }}
    </p>
  </div>
</template>

<script>
  import useValidate from "@vuelidate/core";
  import { required, email, url, helpers } from "@vuelidate/validators";

  export default {
    name: "TextInput",

    emits: ["set", "valid"],

    props: {
      placeHolder: { type: String, default: () => "", required: true },
      text: { type: String, default: () => "" },
      sameAs: { type: String, default: () => "" },
      email: { type: String, default: () => "" },
      url: { type: String, default: () => "" },
      type: { type: String, default: () => "text", required: true },
      name: { type: String, default: () => "", required: true },
      id: { type: String, default: () => "", required: true },
      label: { type: String, default: () => "" },
      showLabel: { type: Boolean, default: () => false },
      required: { type: Boolean, default: () => true },
      readonly: { type: Boolean, default: () => false },
      disabled: { type: Boolean, default: () => false },
    },

    data() {
      return {
        v$: useValidate(),
        textData: "",
        showError: false,
        errorMsg: "",
      };
    },

    validations() {
      return {
        text: {
          required,
          validateSameAs: helpers.withMessage(
            `This value must match ${this.sameAs}`,
            this.validateSameAs
          ),
        },
        email: { required, email },
        url: { required, url },
      };
    },

    mounted() {
      switch (this.type) {
        case "text":
          this.textData = this.text;
          break;
        case "email":
          this.textData = this.email;
          break;
        case "url":
          this.textData = this.url;
          break;

        default:
          break;
      }
      this.textData === "" ? "" : this.validate();
    },

    methods: {
      setInput() {
        this.showError = false;
        this.errorMsg = "";
        this.$emit("set", this.textData);
      },

      validateSameAs(val) {
        if (this.sameAs) {
          if (val.trim().toLowerCase() === this.sameAs.toLowerCase()) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },

      validate() {
        this.v$.$reset();
        switch (this.type) {
          case "text":
            this.v$.text.$touch();
            break;
          case "email":
            this.v$.email.$touch();
            break;
          case "url":
            this.v$.url.$touch();
            break;

          default:
            break;
        }
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
        if (newValue !== oldValue) {
          this.textData = newValue;
          // this.validate();
        }
      },

      email(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.textData = newValue;
          // this.validate();
        }
      },

      url(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.textData = newValue;
          // this.validate();
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
