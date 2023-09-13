<template>
  <div id="sidebar" class="xl:tw-inline-block tw-border-r tw-pr-4 tw-z-10">
    <div
      class="sidebar-container tw- tw-h-full tw-overflow-y-scroll tw-bg-white"
    >
      <nav>
        <p>Pay With</p>
        <div>
          <SidebarMenu
            title="Card"
            href="/dashboard/overview"
            :focus="
              overviewFocus || $route.path.includes('/dashboard/overview')
            "
          />
        </div>
        <div>
          <SidebarMenu
            title="Bank"
            href="/dashboard/trade/Now Raising"
            :focus="
              tradeFocus ||
              $route.path.includes('/dashboard/trade') ||
              $route.path.includes('investor-report')
            "
          />
        </div>
        <div>
          <SidebarMenu
            title="Transfer"
            href="/dashboard/employee-stocks"
            :focus="
              stockFocus || $route.path.includes('/dashboard/employee-stocks')
            "
          />
        </div>
        <div>
          <SidebarMenu
            title="USSD"
            href="/dashboard/gift-equity"
            :focus="
              giftEquityFocus || $route.path.includes('/dashboard/gift-equity')
            "
          />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/navigation/SidebarMenu.vue";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "Sidebar",

  components: { SidebarMenu },

  data() {
    return {
      overviewFocus: false,
      giftEquityFocus: false,
      transactionsFocus: false,
      walletFocus: false,
      tradeFocus: false,
      dealRoomFocus: false,
      accountFocus: false,
      stockFocus: false,
    };
  },

  created() {
    this.setFocus(this.$route.name);
    if (
      this.$route.name === "OverviewDetails" ||
      this.$route.name === "EsopOverview"
    ) {
      return;
    }
    this.getUserEsop();
  },

  computed: {
    ...mapGetters("esopModule", ["esops"]),
  },

  methods: {
    ...mapActions(["updateWelcomeModal"]),
    ...mapActions("esopModule", ["getUserEsop"]),

    setFocus(route) {
      this.overviewFocus = false;
      this.giftEquityFocus = false;
      this.transactionsFocus = false;
      this.walletFocus = false;
      this.tradeFocus = false;
      this.dealRoomFocus = false;
      this.accountFocus = false;
      this.stockFocus = false;
      switch (route) {
        case "OverviewDetails":
          this.overviewFocus = true;
          break;
        case "GiftEquity":
          this.giftEquityFocus = true;
          break;
        case route.includes("Trade"):
          this.tradeFocus = true;
          break;
        case route.includes("employee-stocks"):
          this.stockFocus = true;
          break;
        case "dealRoom":
          this.dealRoomFocus = true;
          break;
        case "Transactions":
          this.transactionsFocus = true;
          break;
        case "Wallet":
          this.walletFocus = true;
          break;
        case route.includes("Account"):
          this.accountFocus = true;
          break;
      }
    },

    startTour() {
      this.$router.push({ name: "OverviewDetails" });
      setTimeout(() => {
        this.updateWelcomeModal(true);
      }, 500);
    },
  },

  watch: {
    $route(to, from) {
      deep: true;
      immediate: true;
      if (to !== from) {
        this.setFocus(this.$route.name);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#sidebar {
  //   width: $side-bar-width;

  .sidebar-container {
    // width: $side-bar-width;
  }
}
</style>
