<template>
  <Modal @close-modal="$emit('close')" :show="show" class="confirmation__modal">
    <div class="">
      <img
        src="https://res.cloudinary.com/djalafcj9/image/upload/v1643117619/getequityV2/investor/Group_35_itbbw1.svg"
        alt="success icon"
        class="tw-h-24 tw-w-24 tw-mx-auto"
      />
      <h1
        class="tw-text-2xl tw-text-secondary tw-mt-5 tw-font-bold tw-text-center"
      >
        {{ title }}
      </h1>
      <p
        class="tw-text-normal tw-text-purple-light tw-mt-2 tw-text-center md:tw-w-72 tw-mx-auto"
      >
        {{ body }}
      </p>
      <button
        class="tw-text-white tw-rounded tw-bg-primary tw-w-full tw-h-12 tw-mt-12"
        @click="$emit('close')"
      >
        Done
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from "../general/Modal";
export default {
  name: "SuccessModal",
  components: {
    Modal,
  },
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: () => {
        return "";
      },
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped></style>
