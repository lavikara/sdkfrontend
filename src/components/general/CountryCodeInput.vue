<template>
  <div class="tw-relative tw-w-24 xs:tw-w-28 xs:tw-mb-0">
    <label :for="label"></label>
    <select
      class="tw-w-20 xs:tw-w-28 tw-rounded tw-px-1 xs:tw-rounded-br-none xs:tw-border-r-0 xs:tw-rounded-tr-none tw-cursor-pointer focus:tw-border-primary"
      name="country code"
      id="country-code"
      v-model="code"
    >
      <option
        class="tw-flex tw-items-center"
        v-for="(country, index) in countryCode.countries"
        :value="country.dial_code"
        :key="index"
      >
        <div>
          {{ country.flag }} {{ country.dial_code }}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{ country.name }}
        </div>
      </option>
    </select>
    <svg
      class="tw-absolute tw-right-2 tw-bottom-2 tw-z-10"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.99992 2.82901L7.82792 1.33514e-05L9.24292 1.41401L4.99992 5.65701L0.75692 1.41401L2.17192 1.33514e-05L4.99992 2.82901Z"
        fill="#4F5877"
      />
    </svg>
  </div>
</template>

<script>
import countryCode from "@/utils/json/countryCode.json";

export default {
  name: "OnboardingCountryCodeInput",

  emits: ["set"],

  props: {
    label: { type: String, default: () => "", required: true },
    defaltOption: { type: String, default: () => "", required: true },
  },

  data() {
    return {
      countryCode,
      code: "",
    };
  },

  mounted() {
    this.setCountryCode();
  },

  methods: {
    emitCode(code) {
      this.$emit("set", code);
    },

    setCountryCode() {
      setTimeout(() => {
        if (this.defaltOption.length !== 0) {
          this.code = this.defaltOption;
          this.emitCode(this.defaltOption);
        } else {
          this.code = "+234";
          this.emitCode(this.code);
        }
      }, 500);
    },
  },

  watch: {
    code(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.emitCode(newValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
