<template>
  <router-link
    :to="{
      name: esop.status === 'Pending' ? 'PendingEsop' : 'EsopOverview',
      params: {
        id: esop.status === 'Pending' ? esop.invitation?._id : esop?._id,
      },
      query: {
        token: esop.invite_token,
      },
    }"
    class="stock-options__link tw-px-4 tw-py-4"
  >
    <div
      class="tw-flex tw-gap-x-2 tw-gap-y-2 tw-items-start tw-mb-2 tw-flex-wrap"
    >
      <img
        :src="
          esop.token?.image ||
          'https://res.cloudinary.com/djalafcj9/image/upload/v1634012152/getequityV2/header-profile-img_kjtkcq.png'
        "
        :alt="esop.organisation.name"
        class="tw-h-10 tw-w-10 tw-rounded"
      />
      <div class="stock-options-info__div">
        <p class="tw-text-lg tw-text-secondary tw-font-bold tw-mb-2">
          {{ truncate(esop.organisation.name, 20) }}
        </p>
        <div
          v-if="esop.employee_type === 'RSU_EMPLOYEE'"
          class="tw-bg-lemon tw-rounded tw-py-1 tw-px-2 tw-w-max"
        >
          <p class="tw-text-xs tw-text-green">RSU</p>
        </div>
        <div
          v-if="esop.employee_type === 'ESOP_EMPLOYEE'"
          class="tw-bg-blue-pastel3 tw-rounded tw-py-1 tw-px-2 tw-w-max"
        >
          <p class="tw-text-xs tw-text-blue-ultramarine">ESO</p>
        </div>
        <div
          v-if="esop.status === 'Pending'"
          class="tw-mt-2 tw-w-max tw-bg-orange-lightest tw-rounded tw-py-1 tw-px-2"
        >
          <p class="tw-text-xs tw-text-orange">Pending</p>
        </div>
        <div
          v-else
          class="tw-mt-2 tw-w-max tw-bg-gray-light tw-py-1 tw-px-4 tw-rounded-[50px] tw-h-8 tw-flex tw-items-center"
        >
          <p
            class="tw-text-xs tw-text-primary tw-font-CircularStd-medium tw-font-medium"
          >
            {{ vestedShares }}% vested
          </p>
        </div>
      </div>
      <div class="stock-options-price__div md:tw-ml-auto md:tw-text-right">
        <p
          v-if="esop.employee_type === 'ESOP_EMPLOYEE'"
          class="tw-text-sm tw-font-light tw-text-black-light tw-w-full"
        >
          Market price:
          <span
            class="tw-text-secondary tw-font-CircularStd-medium tw-font-medium"
            >{{ formatAmountToDollar(esop.strike_price, 2, "USD") }}</span
          >
        </p>
        <p class="tw-text-sm tw-font-light tw-text-black-light tw-w-full">
          Allocated:
          <span
            class="tw-text-secondary tw-font-CircularStd-medium tw-font-medium"
            >{{ convertToLocale(esop.allocated_shares) }}</span
          >
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
  import {
    truncate,
    convertToLocale,
    formatAmountToDollar,
  } from "@/utils/helpers.js";

  export default {
    name: "StockOptionCard",
    props: {
      esop: {
        type: Object,
        required: true,
      },
    },
    computed: {
      vestedShares() {
        const vestedShares =
          this.esop.vested_shares / this.esop.allocated_shares;
        const vestedSharesPercentage = (vestedShares * 100).toFixed(2);
        return vestedSharesPercentage;
      },
    },

    methods: {
      truncate,
      convertToLocale,
      formatAmountToDollar,
    },
  };
</script>

<style lang="scss" scoped>
  .stock-options {
    &__link {
      background-color: #fff;
      border: 1px solid #f0f4fd;
      border-radius: 4px;
      box-shadow: 0px 4px 19px rgba(77, 132, 255, 0.07);
    }
    &-info__div {
      @media (min-width: 425px) {
        flex-basis: 38%;
      }
      @media (min-width: 768px) {
        flex-basis: 30%;
        flex-grow: 2;
      }
    }
    &-price__div {
      @media (min-width: 425px) {
        margin-left: auto;
        text-align: right;
        flex-basis: 42%;
      }
    }
  }
</style>
