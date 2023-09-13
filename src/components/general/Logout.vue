<template>
  <div>
    <h1>logout</h1>
  </div>
</template>

<script>
import { clearStorage } from "@/utils/storage.js";

export default {
  name: "Logout",

  beforeRouteEnter(to, from, next) {
    clearStorage();
    return next({ name: "SignIn" });
  },
};
</script>

<style lang="scss" scoped></style>
