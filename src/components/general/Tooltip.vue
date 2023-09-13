<template>
  <section
    class="tw-relative"
    @mouseover="currentVisible = text"
    @mouseleave="currentVisible = ''"
  >
    <div v-if="showLabel === false">
      <img
        v-if="showIcon"
        src="@/assets/img/info-gray.svg"
        alt="info"
        class="tw-ml-1 tw-w-3 tw-h-3 tw-cursor-pointer"
        @click="setCurrentVisible"
      />
    </div>
    <div
      v-if="showLabel === true"
      class="tw-flex tw-items-center tw-bg-error tw-text-white tw-text-xs tw-rounded tw-cursor-pointer tw-px-2 tw-py-2"
    >
      <img
        src="@/assets/img/white-alert.svg"
        alt="info"
        class="tw-mr-2"
        @click="setCurrentVisible"
      />
      <label>{{ label }}</label>
    </div>
    <div
      class="tooltip__wrapper tw-absolute tw-top-12 tw-p-4 tw-rounded"
      :class="[
        position ? `tw-${position}-0` : '',
        showLabel ? 'tw-bg-white' : 'tw-bg-secondary tw-text-white',
      ]"
      v-if="currentVisible === text || showTip"
    >
      <h3 v-if="showHeader" class="tw-font-bold tw-text-lg tw-mb-2">
        {{ header }}
      </h3>
      <p class="tw-text-sm" v-html="text"></p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    text: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: () => "",
    },
    header: {
      type: String,
      default: () => "",
    },
    showIcon: {
      type: Boolean,
      default: () => true,
    },
    showTip: {
      type: Boolean,
      default: () => false,
    },
    showLabel: {
      type: Boolean,
      default: () => false,
    },
    showHeader: {
      type: Boolean,
      default: () => false,
    },
    position: {
      type: String,
      default: () => "right",
    },
  },
  data() {
    return {
      showTooltip: false,
      currentVisible: "",
    };
  },

  methods: {
    setCurrentVisible() {
      this.currentVisible = this.text;
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  &__wrapper {
    min-width: 300px;
    max-width: 300px;
    z-index: 10;
  }
}
</style>
