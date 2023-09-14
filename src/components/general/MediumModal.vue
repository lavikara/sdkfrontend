<template>
  <div
    id="medium-modal"
    class="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-w-full tw-h-screen tw-right-0 tw-z-50"
  >
    <div class="container tw-m-4">
      <div class="card tw-relative tw-bg-white tw-rounded-lg" @click.stop>
        <img
          class="close-btn tw-absolute tw-w-6 tw-bg-gray-light tw-rounded-full tw-cursor-pointer tw-p-1"
          src="https://res.cloudinary.com/djalafcj9/image/upload/v1635485821/getequityV2/close_muxdyb.webp"
          alt="close icon"
          @click="$emit('close')"
        />
        <div class="slot tw-p-4">
          <slot name="content">content</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediumModal",

  emits: ["close"],

  methods: {},
};
</script>

<style lang="scss" scoped>
#medium-modal {
  @include fadeIn;
  background-color: $modal-bg;
  overflow: scroll;

  .container {
    .card {
      max-width: 530px;
      margin: 7rem auto 0 auto;

      .close-btn {
        top: -2rem;
        right: 0rem;

        @media screen and (min-width: 768px) {
          top: 0rem;
          right: -2rem;
        }
      }
    }
  }
}
</style>
