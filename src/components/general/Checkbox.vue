<template>
  <div
    class="tw-mt-8 tw-flex tw-items-center tw-justify-between tw-cursor-pointer tw-h-10"
    :class="{
      'tw-border-primary': selected === true,
    }"
    @click="toggleCheckbox"
  >
    <div class="tw-w-10/12 tw-flex tw-items-center tw-justify-start">
      <div class="tw-w-8 tw-h-8 tw-rounded-full tw-border" :class="value"></div>
      <h3 class="tw-text-sm tw-text-black-dark tw-ml-4">{{ title }}</h3>
    </div>
    <input
      ref="checkbox"
      class="tw-mr-5 tw-cursor-pointer tw-w-5 tw-h-5"
      type="checkbox"
      :value="value"
      id="toggle"
      :checked="selected"
    />
  </div>
</template>

<script>
  export default {
    name: "Checkbox",

    emits: ["checked"],

    props: {
      title: { type: String, default: () => "", required: true },
      label: { type: String, default: () => "", required: true },
      value: { type: String, default: () => "", required: true },
      checked: { type: Boolean, default: () => "", required: true },
    },
    data() {
      return {
        selected: false,
      }
    },
    watch: {
      checked(val) {
        this.selected = val
      },
    },
    mounted() {
      this.selected = this.checked
    },

    methods: {
      toggleCheckbox() {
        this.selected = !this.selected
        this.$emit("checked", {
          status: this.selected,
          value: this.value,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .Successful,
  .Completed {
    background: rgba(39, 174, 96, 0.1);
  }

  .Pending {
    background: rgba(243, 139, 0, 0.1);
  }

  .Failed {
    background: rgba(219, 67, 67, 0.1);
  }
</style>
