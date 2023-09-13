<template>
  <div>
    <h3 class="tw-font-bold tw-text-lg">Welcome, {{ details?.fname }}</h3>
  </div>
</template>

<script>
  import { getItem } from "@/utils/storage.js";

  export default {
    name: "WelcomeText",

    data() {
      return {
        details: {},
      };
    },

    mounted() {
      this.details = getItem("org_details");
    },
  };
</script>

<style lang="scss" scoped></style>
