<template>
  <div>
    <form @submit.prevent="confirmPin" class="tw-w-full tw-mt-8">
      <h3
        v-if="showHeader"
        class="tw-text-lg tw-text-center tw-font-bold tw-mb-6 tw-text-secondary"
      >
        Enter your PIN to confirm
      </h3>
      <div ref="codeInput" class="tw-flex tw-justify-center tw-items-center">
        <OnboardingCodeInput
          label="Verification code"
          type="password"
          :digit="digit.firstDigit"
          :error="errorOne || {}"
          :position="1"
          @input="setDigit"
        />
        <div class="tw-mb-6">&nbsp;&#8212;&nbsp;</div>
        <OnboardingCodeInput
          label="Verification code"
          type="password"
          :digit="digit.secondDigit"
          :error="errorTwo || {}"
          :position="2"
          @input="setDigit"
        />
        <div class="tw-mb-6">&nbsp;&#8212;&nbsp;</div>
        <OnboardingCodeInput
          label="Verification code"
          type="password"
          :digit="digit.thirdDigit"
          :error="errorThree || {}"
          :position="3"
          @input="setDigit"
        />
        <div class="tw-mb-6">&nbsp;&#8212;&nbsp;</div>
        <OnboardingCodeInput
          label="Verification code"
          type="password"
          :digit="digit.forthDigit"
          :error="errorFour || {}"
          :position="4"
          @input="setDigit"
        />
      </div>
      <OnboardingBtn :loading="loading" :title="btnTitle" />
    </form>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import useValidate from "@vuelidate/core";
  import { required, maxLength } from "@vuelidate/validators";
  import OnboardingCodeInput from "@/components/onboarding/OnboardingCodeInput.vue";
  import OnboardingBtn from "@/components/general/BtnComponent.vue";

  export default {
    name: "PinConfirmation",

    emits: ["confirmed"],

    components: {
      OnboardingCodeInput,
      OnboardingBtn,
    },

    props: {
      btnTitle: { type: String, default: () => "", required: true },
      showHeader: { type: Boolean, default: () => true },
    },

    data() {
      return {
        v$: useValidate(),
        fields: [],
        fieldNum: 0,
        payload: { pin: "" },
        digit: {
          firstDigit: "",
          secondDigit: "",
          thirdDigit: "",
          forthDigit: "",
        },
        errorOne: {},
        errorTwo: {},
        errorThree: {},
        errorFour: {},
        loading: false,
      };
    },

    validations() {
      return {
        digit: {
          firstDigit: { required, maxLength: maxLength(1) },
          secondDigit: { required, maxLength: maxLength(1) },
          thirdDigit: { required, maxLength: maxLength(1) },
          forthDigit: { required, maxLength: maxLength(1) },
        },
      };
    },

    mounted() {
      this.fields = this.$refs.codeInput.querySelectorAll("input");
      this.fieldNum = this.fields.length;
    },

    methods: {
      ...mapActions("investorModule", ["verifyPin"]),

      async confirmPin() {
        this.loading = true;
        const response = await this.verifyPin(this.payload);
        if (response) {
          this.$emit("confirmed");
        }
        this.loading = false;
      },

      setDigit(payload) {
        const keyCode = payload.$event ? payload.$event.inputType : null;
        switch (payload.position) {
          case 1:
            this.digit.firstDigit = payload.digit;
            this.v$.digit.firstDigit.$touch();
            this.errorOne = this.v$.$errors[0];
            this.concatDigits();
            if (keyCode === "deleteContentBackward") {
              return;
            } else {
              this.fields[payload.position].focus();
            }
            break;
          case 2:
            this.digit.secondDigit = payload.digit;
            this.v$.digit.secondDigit.$touch();
            this.errorTwo = this.v$.$errors[0];
            this.concatDigits();
            if (keyCode === "deleteContentBackward") {
              this.fields[payload.position - 2].focus();
              this.fields[payload.position - 2].select();
            } else {
              this.fields[payload.position].focus();
            }
            break;
          case 3:
            this.digit.thirdDigit = payload.digit;
            this.v$.digit.thirdDigit.$touch();
            this.errorThree = this.v$.$errors[0];
            this.concatDigits();
            if (keyCode === "deleteContentBackward") {
              this.fields[payload.position - 2].focus();
              this.fields[payload.position - 2].select();
            } else {
              this.fields[payload.position].focus();
            }
            break;
          case 4:
            this.digit.forthDigit = payload.digit;
            this.v$.digit.forthDigit.$touch();
            this.errorFour = this.v$.$errors[0];
            this.concatDigits();
            if (keyCode === "deleteContentBackward") {
              this.fields[payload.position - 2].focus();
              this.fields[payload.position - 2].select();
            }
            break;

          default:
            break;
        }
      },

      concatDigits() {
        this.payload.pin = this.digit.firstDigit
          .concat(this.digit.secondDigit)
          .concat(this.digit.thirdDigit)
          .concat(this.digit.forthDigit);
      },
    },
  };
</script>

<style lang="scss" scoped></style>
