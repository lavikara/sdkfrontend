<template>
  <div id="sidebar" class="xl:tw-inline-block tw-border-r tw-pr-4 tw-z-10">
    <div
      class="sidebar-container tw- tw-h-full tw-overflow-y-scroll tw-bg-white"
    >
      <nav>
        <p>Pay With</p>
        <div>
          <SidebarMenu title="Card" />
        </div>
        <div>
          <SidebarMenu title="Bank" />
        </div>
        <div>
          <SidebarMenu title="Transfer" />
        </div>
        <div>
          <SidebarMenu title="USSD" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/navigation/SidebarMenu.vue";

export default {
  name: "Sidebar",

  components: { SidebarMenu },

  data() {
    return {};
  },

  created() {},

  computed: {},

  methods: {},
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
