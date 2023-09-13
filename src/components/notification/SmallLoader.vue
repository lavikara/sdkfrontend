<template>
  <div id="small-loader" class="tw-py-24">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "SmallLoader",
};
</script>

<style lang="scss" scoped>
#small-loader {
  .loader {
    width: 60px;
    height: 60px;
    border: 5px solid $brand-primary;
    border-radius: 50%;
    border-left-color: #ddd;
    border-right-color: #ddd;
    border-bottom-color: #ddd;
    animation-name: spin;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
