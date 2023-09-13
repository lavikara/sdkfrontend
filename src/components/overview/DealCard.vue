<template>
  <router-link
    :to="{ name: 'DealRoomInfo', params: { id: deal._id } }"
    class="deal__div tw-rounded tw-cursor-pointer tw-px-4 tw-py-6"
  >
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
      <p class="tw-text-lg tw-text-black-light tw-font-bold">
        {{ truncate(deal.name, 20) }}
      </p>
      <img
        :src="
          deal.image ||
          'https://res.cloudinary.com/djalafcj9/image/upload/v1634012152/getequityV2/header-profile-img_kjtkcq.png'
        "
        :alt="deal.name"
        class="tw-h-12 tw-w-12"
      />
    </div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <h3 class="tw-text-xl">
        {{ formatAmountToDollar(deal.total_tokens_value, 2, "USD") }}
      </h3>
      <div class="tw-flex tw-text-sm tw-text-secondary tw-items-center">
        <img class="tw-mr-2" src="@/assets/img/token-icon.svg" alt="token" />
        <p class="tw-text-xl">
          {{ dealroomTokenCount }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
  import { truncate, formatAmountToDollar } from "@/utils/helpers.js";

  export default {
    name: "DealCard",

    props: {
      deal: {
        type: Object,
        required: true,
      },
    },
    computed: {
      dealroomTokenCount() {
        const tokenCount = this.deal.tokens.filter(
          (token) => token.type === "Private" && !token.entity
        );
        return tokenCount.length;
      },
      dealroomPortfolioIncreasePercentage() {
        const tokens = this.deal.tokens;
        let percentage = 0;
        if (tokens && tokens.length > 0) {
          for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            if (token.prev_price.exchange === 0) {
              return percentage;
            } else {
              percentage += Number(
                (
                  ((token.price.exchange - token.prev_price.exchange) /
                    token.prev_price.exchange) *
                  100
                ).toFixed(2)
              );
              return percentage;
            }
          }

          // const findTokenPercentage = (token) => ({
          //   ...token,
          //   ...(token.prev_price.exchange === 0
          //     ? 0
          //     : Number(
          //         (
          //           (Number(token.price.exchange - token.prev_price.exchange) /
          //             token.prev_price.exchange) *
          //           100
          //         ).toFixed(2)
          //       )),
          // });
        }
        return percentage;
      },
    },

    methods: {
      truncate,
      formatAmountToDollar,
    },
  };
</script>

<style lang="scss" scoped>
  .deal {
    &__div {
      border: 1px solid #f0f4fd;
      box-shadow: 0px 4px 19px rgba(77, 132, 255, 0.07);
      border-radius: 4px;
    }
  }
</style>
