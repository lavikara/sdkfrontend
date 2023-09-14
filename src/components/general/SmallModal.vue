<template>
  <div
    id="small-modal"
    class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-h-screen tw-right-0 tw-z-50"
  >
    <div class="container tw-m-4">
      <div class="card tw-bg-white tw-rounded-lg tw-py-8 tw-px-6" @click.stop>
        <div class="tw-relative">
          <img
            class="close-btn tw-absolute tw-w-6 tw-bg-gray-light tw-rounded-full tw-cursor-pointer tw-p-1"
            src="https://res.cloudinary.com/djalafcj9/image/upload/v1635485821/getequityV2/close_muxdyb.webp"
            alt="close icon"
            @click="$emit('close')"
          />
        </div>
        <div>
          <slot name="content">content</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmallModal",

  emits: ["close"],
};
</script>

<style lang="scss" scoped>
#small-modal {
  @include fadeIn;
  background-color: $modal-bg;
  overflow: scroll;

  .container {
    .card {
      max-width: 400px;
      margin: 4rem auto 0 auto;
    }

    .close-btn {
      top: -1rem;
      right: -0.8rem;

      @media screen and (min-width: 768px) {
        top: -1.8rem;
        right: -3.4rem;
      }
    }
  }
}
</style>
