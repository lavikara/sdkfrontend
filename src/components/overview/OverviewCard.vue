<template>
  <div
    id="overview-card"
    class="tw-bg-white tw-rounded-lg tw-px-4 lg:tw-px-12 tw-py-6"
  >
    <div id="" v-if="header === 'Trading Wallet'" class="tw-relative">
      <div
        class="lg:tw-grid lg:tw-grid-cols-2 lg:tw-gap-x-2 lg:tw-items-center"
      >
        <div class="tw-mb-8 lg:tw-mb-0">
          <h3 class="tw-text-black-light tw-mb-4">Trading Wallet</h3>
          <p class="tw-text-2xl">
            {{ formatAmountToDollar(walletBalance, 2, "USD") }}
          </p>
        </div>
        <div class="tw-justify-self-end">
          <Btn
            title="Fund your Wallet"
            :plus="true"
            @click="$emit('btnClicked')"
          />
        </div>
      </div>
    </div>
    <div id="" v-if="header === 'token'" class="tw-relative">
      <ul
        v-if="tokens?.length === 0"
        class="lg:tw-grid lg:tw-grid-cols-3 tw-items-center tw-gap-x-2"
      >
        <li class="tw-col-start-1 tw-col-end-3">
          <h3 class="tw-text-black-light tw-mb-4 lg:tw-mb-1">Your portfolio</h3>
          <span class="tw-text-xl"> You have no shares — yet!.</span>
        </li>
        <Btn
          v-if="tokens?.length === 0"
          class="tw-mt-6 lg:tw-mt-0 tw-col-start-3 tw-col-end-4"
          title="Buy Shares"
          :plus="true"
          @click="
            $router.push({ name: 'Trade', params: { option: 'Now Raising' } })
          "
        />
      </ul>
      <h3 v-if="tokens?.length !== 0" class="tw-text-black-light tw-mb-2">
        Your portfolio
      </h3>
      <ul
        v-if="tokens?.length !== 0"
        class="tw-grid tw-grid-cols-4 tw-items-center tw-gap-x-2"
      >
        <li class="tw-grid tw-grid-cols-4 tw-col-start-1 tw-col-end-5">
          <span v-for="(token, index) in tokens?.slice(0, 4)" :key="index">
            <img
              class="tw-h-10 tw-w-10 tw-rounded"
              :src="token?.image"
              :alt="token?.name"
            />
          </span>
        </li>
        <li class="tw-col-start-5 tw-col-end-6">
          <router-link
            v-if="tokens?.length !== 0"
            class="tw-flex tw-text-primary tw-whitespace-nowrap"
            :to="{ name: 'Wallet' }"
          >
            See all <img src="@/assets/img/caret-right.svg" alt="caret" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Btn from "@/components/general/BtnComponent.vue";
  import { formatAmountToDollar } from "@/utils/helpers.js";

  export default {
    name: "OverviewCard",

    emits: ["btnClicked"],

    props: {
      header: { type: String, default: () => "", required: true },
      walletBalance: { type: Number, default: () => 0 },
      tokens: { type: Array, default: () => [] },
    },

    components: {
      Btn,
    },

    methods: {
      formatAmountToDollar,
    },
  };
</script>

<style lang="scss" scoped></style>
