<template>
  <div
    id="loader"
    class="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-screen tw-z-50"
  >
    <div
      class="loader-container tw-flex tw-justify-center tw-rounded-lg tw-bg-white"
    >
      <div class="tw-py-14">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
#loader {
  background-color: $modal-bg;
  max-width: 100%;

  .loader-container {
    max-width: 12rem;
    transform: translate(0%, 100%);
    margin-left: auto;
    margin-right: auto;

    @media screen and (min-width: 1280px) {
      transform: translate(0%, 200%);
    }

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
    }
  }
}
</style>
