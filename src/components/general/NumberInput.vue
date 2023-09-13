<template>
  <div id="number-input">
    <label :for="label" class="tw-text-sm">
      {{ showLabel ? label : "" }}
    </label>
    <input
      :type="type"
      ref="numberInput"
      class="tw-w-full tw-rounded tw-border tw-py-2 tw-px-5 focus:tw-border-primary"
      :class="{
        'tw-text-black-light tw-cursor-not-allowed': disabled,
        'tw-border': $route.name !== 'PersonalInfo',
      }"
      v-model="value"
      @input="setInput"
      @keypress="isNumber($event)"
      :placeholder="placeHolder"
      :id="id"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </div>
</template>

<script>
import { isNumber, convertToLocale } from "@/utils/helpers.js";

export default {
  name: "NumberInput",
  data() {
    return {
      value: null,
    };
  },

  emits: ["set"],

  props: {
    placeHolder: { type: String, default: () => "", required: true },
    number: { type: String, default: () => "" },
    label: { type: String, default: () => "", required: true },
    id: { type: String, default: () => "" },
    name: { type: String, default: () => "" },
    type: { type: String, default: () => "" },
    required: { type: Boolean, default: () => true },
    readonly: { type: Boolean, default: () => false },
    disabled: { type: Boolean, default: () => false },
    showLabel: { type: Boolean, default: () => false },
  },

  methods: {
    isNumber,

    setInput() {
      this.$emit("set", this.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
