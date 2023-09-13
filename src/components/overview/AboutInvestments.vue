<template>
  <Modal v-if="show" @close="$emit('close-modal')">
    <template v-slot:content>
      <div class="overview-modal tw-pb-16">
        <h1 class="tw-font-bold tw-text-xl tw-mb-8 tw-text-center">
          Invest Together. Grow Together
        </h1>
        <p class="tw-text-secondary tw-font-normal tw-mb-16">
          Syndicate leads are experienced angel investors with a track record of
          successful technology investments. Like general partners at a VC fund,
          leads source investments, conduct due diligence, and secure
          allocations.
        </p>
        <div class="tw-flex tw-gap-4 md:tw-gap-8 tw-mb-8">
          <div class="tw-w-16 tw-h-16">
            <img
              src="https://res.cloudinary.com/djalafcj9/image/upload/v1642590226/getequityV2/investor/Layer_30_wqx6kr.svg"
              alt=""
              class="tw-w-16 tw-h-16"
            />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-font-semibold tw-mb-2">
              Verified Private Group
            </h2>
            <p class="tw-text-black-dark">
              A pool of investors/equity owners who are just as zealous as you
              are.
            </p>
          </div>
        </div>
        <div class="tw-flex tw-gap-4 md:tw-gap-8 tw-mb-8">
          <div class="tw-w-16 tw-h-16">
            <img
              src="https://res.cloudinary.com/djalafcj9/image/upload/v1642590224/getequityV2/investor/Layer_34_ijcztc.svg"
              alt=""
            />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-mb-2 tw-font-semibold">
              Shares Management
            </h2>
            <p class="tw-text-black-dark">
              Buy, manage, and monitor shares like you would normally do
            </p>
          </div>
        </div>
        <div class="tw-flex tw-gap-4 md:tw-gap-8 tw-mb-8">
          <div class="tw-w-16 tw-h-16">
            <img
              src="https://res.cloudinary.com/djalafcj9/image/upload/v1642590220/getequityV2/investor/Layer_32_xocbnc.svg"
              alt=""
            />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-mb-2 tw-font-semibold">
              Grow Investment Portfolio
            </h2>
            <p class="tw-text-black-dark">
              A chance to grow your assets from high-functioning companies
            </p>
          </div>
        </div>
        <div class="tw-flex tw-gap-4 md:tw-gap-8">
          <div class="tw-w-16 tw-h-16">
            <img
              src="https://res.cloudinary.com/djalafcj9/image/upload/v1642590222/getequityV2/investor/Layer_10_eq0huk.svg"
              alt=""
            />
          </div>
          <div>
            <h2 class="tw-text-secondary tw-mb-2 tw-font-semibold">
              Trade Your Investment
            </h2>
            <p class="tw-text-black-dark">
              Put your investments up for sale at any time you wish to
            </p>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
  import Modal from "@/components/general/MediumModal.vue";
  import Button from "@/components/general/Button";

  export default {
    name: "AboutWallets",
    components: {
      Button,
      Modal,
    },
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped></style>
