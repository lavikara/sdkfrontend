<template>
  <section class="stock-options__section" v-if="esops && esops.length !== 0">
    <div v-if="$route.name === 'OverviewDetails'">
      <h3 class="tw-font-bold tw-mb-1 tw-text-lg tw-text-gray-bg2">
        Stock Options
      </h3>
      <p class="tw-text-purple-light">
        Shares you currently own as an employee.
      </p>
    </div>
    <div class="tw-mt-5 stock-options-cards__div">
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <StockOptionCard
          v-for="esop in esopList"
          :key="esop._id"
          :esop="esop"
        />
      </div>
      <div class="tw-ml-auto tw-mt-5" v-if="esops.length - esopList.length > 0">
        <router-link
          class="tw-text-primary tw-flex tw-text-right tw-justify-end"
          :to="{ name: 'EmployeeStocks' }"
          >See {{ esops.length - esopList.length }} more
          <img src="@/assets/img/caret-right.svg" alt="caret" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import StockOptionCard from "./StockOptionCard";
  export default {
    name: "StockOptions",
    components: {
      StockOptionCard,
    },

    computed: {
      ...mapGetters("esopModule", ["esops"]),
      esopList() {
        return this.esops?.slice(0, 2);
      },
    },

    created() {
      this.getUserEsop();
    },

    methods: {
      ...mapActions("esopModule", ["getUserEsop"]),
    },
  };
</script>

<style lang="scss" scoped>
  .stock-options {
    &-cards__div {
      background-color: #ffffff;
      border: 1px solid rgba(241, 243, 246, 0.6);
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12);
      border-radius: 6px;
      padding: 30px;
    }
  }
</style>
