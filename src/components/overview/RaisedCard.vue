<template>
  <div id="raised-card">
    <div class="tw-bg-white tw-rounded-lg tw-py-8 tw-px-4">
      <SmallLoader v-if="loading" />
      <template v-else>
        <div
          v-if="companiesRaised.length > 0"
          class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-2 tw-gap-y-16 md:tw-px-4"
        >
          <router-link
            v-for="(token, index) in companiesRaised"
            :key="index"
            :to="{
              name: 'TokenOverview',
              params: { symbol: token.symbol, id: token._id },
            }"
            class="tw-grid tw-grid-cols-4 tw-gap-x-2 tw-content-center tw-items-center tw-cursor-pointer"
            :id="token.symbol"
          >
            <div
              class="tw-w-full tw-flex tw-justify-center tw-bg-gray-light tw-rounded-lg tw-p-4"
            >
              <img :src="token.image" :alt="token.name" />
            </div>
            <div class="tw-col-start-2 tw-col-end-5">
              <h3 class="tw-text-lg tw-font-bold tw-mb-2">{{ token.name }}</h3>
              <p class="tw-flex tw-justify-between sm:tw-justify-start">
                <span>
                  {{ formatAmountToDollar(token.price.exchange, 2, "USD") }}
                </span>
                <span
                  class="tw-bg-success-lightest tw-text-success tw-text-sm tw-rounded-2xl tw-py-1 tw-px-4 tw-ml-4"
                >
                  +{{ token.percentage }}%
                  <span class="tw-text-black-light tw-ml-1">24h</span>
                </span>
              </p>
            </div>
          </router-link>
        </div>
        <div class="tw-flex tw-items-center tw-justify-center tw-w-full" v-else>
          <EmptyState>
            <template v-slot:message>
              <p
                class="message tw-text-center tw-text-gray tw-my-3"
                v-if="hasSearchQuery"
              >
                No company with that name exist, please try a different name or
                symbol
              </p>
              <p class="message tw-text-center tw-text-gray tw-my-3" v-else>
                There are currently no companies in the GetEquity Exchange,
                please try again later
              </p>
            </template>
          </EmptyState>
        </div>
      </template>
      <div
        v-if="$route.name !== 'OverviewDetails' && pages > 0"
        class="tw-flex tw-justify-end tw-mr-2 tw-my-8"
      >
        <Pagination
          :totalPage="pages"
          :currentPage="page"
          :maxVisible="5"
          @pageChange="gotoPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { formatAmountToDollar } from "@/utils/helpers.js";
  import Pagination from "@/components/navigation/Pagination";
  import EmptyState from "@/components/notification/EmptyState";

  export default {
    name: "RaisedCard",

    components: { Pagination, EmptyState },
    data() {
      return {
        loading: false,
      };
    },

    computed: {
      ...mapState({
        companiesRaised: (state) => state.tokenModule.raisedTokens,
        page: (state) => state.tokenModule.raisedPage,
        pages: (state) => state.tokenModule.raisedPages,
      }),
    },
    props: {
      hasSearchQuery: {
        type: Boolean,
        required: false,
        default: () => {
          return false;
        },
      },
    },

    mounted() {
      if (!this.hasSearchQuery) {
        this.getDetails();
      }
    },

    methods: {
      ...mapActions("tokenModule", ["getCompaniesRaised"]),

      formatAmountToDollar,

      async getDetails() {
        this.loading = true;
        let limit = 6;
        if (this.$route.name !== "OverviewDetails") limit = 12;
        const payload = { page: 1, limit: limit };
        await this.getCompaniesRaised(payload);
        this.loading = false;
      },

      async gotoPage(page) {
        this.loading = true;
        let limit;
        if (this.$route.name !== "OverviewDetails") limit = 12;
        const payload = {
          page: page,
          limit: limit,
        };
        await this.getCompaniesRaised(payload);
        this.loading = false;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
