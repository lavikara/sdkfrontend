<template>
  <div v-if="deals?.length !== 0" id="deal-card">
    <h3 class="tw-font-bold tw-mb-3 tw-text-xl tw-text-gray-bg2">
      Private rooms you belong to
    </h3>
    <div class="tw-bg-white tw-rounded-lg tw-px-4 lg:tw-px-12 tw-py-6">
      <div class="container tw-overflow-auto tw-py-4">
        <div class="tw-grid tw-gap-8" :style="gridStyling">
          <DealCard v-for="deal in deals" :key="deal._id" :deal="deal" />
        </div>
      </div>
      <router-link
        class="tw-text-primary tw-flex tw-text-right tw-justify-end tw-mt-8 tw-items-center"
        :to="{ name: 'dealRoom' }"
        >Go to Private rooms<img
          class="tw-h-4 tw-w-4"
          src="@/assets/img/caret-right.svg"
          alt="caret"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import DealCard from "./DealCard";
  export default {
    name: "Dealroom",
    components: {
      DealCard,
    },

    computed: {
      ...mapState({
        deals: (state) => state.tokenModule.userDealRooms,
        gridStyling() {
          return {
            "grid-template-columns": `repeat(${
              this.deals.length
            }, ${300}px) ${20}px`,
          };
        },
      }),
    },

    created() {
      this.getUserDealRooms();
    },

    methods: {
      ...mapActions("tokenModule", ["getUserDealRooms"]),
    },
  };
</script>

<style lang="scss" scoped>
  #deal-card {
    .container::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .container {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
</style>
