<template>
  <InputFieldLabel
    :label="label"
    :inputActive="inputActive"
    @label-click="focusInput"
  >
    <input
      :type="name === 'email' ? 'email' : type ? type : 'text'"
      :name="label"
      :ref="name"
      id="label"
      class="tw-w-full tw-rounded custom-form__input tw-pl-6 tw-text-secondary"
      :class="[height, v$.value.$error ? 'custom-form__input--error' : null]"
      v-model="value"
      @focus="inputActive = true"
      @input="$emit('input')"
      @keypress="validateAsNumber ? isNumber($event) : null"
      @blur="!value || value.length === 0 ? (inputActive = false) : null"
    />
    <p class="tw-text-red-error" v-if="v$.value.$error">
      {{ v$.$errors[0].$message }}
    </p>
  </InputFieldLabel>
</template>

<script>
  import InputFieldLabel from "./InputFieldLabel";
  import { required, helpers } from "@vuelidate/validators";
  import useValidate from "@vuelidate/core";
  import { isNumber } from "@/utils/helpers.js";
  export default {
    name: "AssetInputField",
    data() {
      return {
        inputActive: false,
        value: null,
        v$: useValidate(),
        isValid: true,
      };
    },
    components: {
      InputFieldLabel,
    },
    validations() {
      return {
        value: {
          required,
          numericIfNumber: helpers.withMessage(
            "This field only accepts numbers",
            this.numericIfNumber
          ),
          validateEmail: helpers.withMessage(
            "This field only accepts valid email",
            this.validateEmail
          ),
        },
      };
    },
    props: {
      label: {
        type: String,
        required: true,
        default: () => "",
      },
      validate: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: false,
      },
      //'type' can be text but still only accept numbers(one reason is because in order to format input, you need to make the text a string otherwise the input field would flag "," in "7,000,000"), hence this prop;
      validateAsNumber: {
        type: Boolean,
        required: false,
        default: () => false,
      },
      name: {
        type: String,
        required: true,
        default: () => "",
      },
      currentValue: {
        required: false,
        default: () => "",
      },
      height: {
        type: String,
        required: false,
        default: () => "tw-h-12",
      },
    },
    emits: ["input-changed", "input", "is-valid"],
    watch: {
      value(val) {
        if ((val && val.length > 0) || (val && val > 0)) {
          this.inputActive = true;
          this.isValid = true;
        }
        if (!val || val.length === 0) {
          this.isValid = false;
        }
        this.$emit("input-changed", { name: this.name, value: val });
      },
      currentValue(val) {
        if (val !== this.value) {
          this.value = val;
        }
      },
      validate(val) {
        if (val) {
          this.validateInput();
        }
      },
    },
    methods: {
      isNumber,
      focusInput() {
        this.$refs[this.name].focus();
      },
      validateInput() {
        this.v$.value.$touch();
        this.isValid = !this.v$.value.$error ? true : false;
        this.$emit("is-valid", this.isValid);
      },
      numericIfNumber(value) {
        if (this.type === "number") {
          return !isNaN(value);
        } else if (this.validateAsNumber) {
          //first remove commas from number
          const number = value.split(",").join("");
          return !isNaN(Number(number));
        }
        return true;
      },
      validateEmail(email) {
        if (this.type === "email") {
          return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
        }
        return true;
      },
    },
    mounted() {
      this.isValid = this.value ? true : false;
      this.value = this.currentValue;
    },
  };
</script>

<style lang="scss" scoped>
  .custom-form {
    &__input {
      border: 1px solid #dde1e9;
      transition: all 500ms ease-in-out;
      padding-left: 28px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      &[type="number"] {
        -moz-appearance: textfield;
      }
      &--error {
        border: 1px solid #db4343;
      }
    }
  }
</style>
