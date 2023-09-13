<template>
  <div class="progress">
    <div
      class="progress__bar"
      :style="{
        flexBasis: ((currentNumber / totalValue) * 100).toFixed(2) + '%',
      }"
    ></div>
  </div>
</template>

<script>
  export default {
    name: "ProgressBar",
    props: {
      currentNumber: {
        type: Number,
        required: true,
        default: () => {
          return 0
        },
      },
      totalValue: {
        type: Number,
        required: true,
        default: () => {
          return 0
        },
      },
    },
  }
</script>

<style lang="scss" scoped>
  .progress {
    width: 139px;
    height: 6px;
    display: flex;
    border-radius: 45px;
    background: #f0f4fd;
    &__bar {
      border-radius: 5px;
      transition: all 600ms ease-out;
      background: #6fcf97;
    }
  }
</style>
