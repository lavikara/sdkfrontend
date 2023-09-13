<template>
  <div id="select-input" class="tw-relative">
    <label :for="label" class="tw-text-sm tw-text-black-light">
      {{ showLabel ? label : "" }}
    </label>
    <select
      class="tw-w-full tw-text-sm tw-rounded tw-p-4 tw-cursor-pointer focus:tw-border-primary"
      :class="{
        'tw-cursor-not-allowed': disabled,
        'tw-py-2 tw-px-0 tw-mt-2': $route.name === 'PersonalInfo',
      }"
      :name="name"
      :id="id"
      v-model="optionData"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
    >
      <option value="" disabled selected>
        {{ defaltOption }}
      </option>
      <option v-for="(item, index) in list" :value="item" :key="index">
        <p>
          {{ item }}
        </p>
      </option>
    </select>
    <svg
      class="tw-absolute tw-right-2 tw-bottom-6 tw-z-10"
      :class="{
        'tw-right-2 tw-top-10': $route.name === 'PersonalInfo',
      }"
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
export default {
  name: "SelectInput",

  emits: ["set"],

  props: {
    label: { type: String, default: () => "", required: true },
    showLabel: { type: Boolean, default: () => false },
    required: { type: Boolean, default: () => true },
    readonly: { type: Boolean, default: () => false },
    disabled: { type: Boolean, default: () => false },
    option: { type: String, default: () => "" },
    name: { type: String, default: () => "" },
    id: { type: String, default: () => "" },
    defaltOption: { type: String, default: () => "", required: true },
    list: { type: Array, default: () => [], required: true },
  },

  data() {
    return {
      optionData: "",
    };
  },

  mounted() {
    this.optionData = this.option;
    this.emitOption(this.optionData);
  },

  methods: {
    emitOption(option) {
      this.$emit("set", option);
    },
  },

  watch: {
    optionData(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.optionData = newValue;
        this.emitOption(newValue);
      }
    },
    option(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.optionData = newValue;
        this.emitOption(newValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
