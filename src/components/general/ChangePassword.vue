<template>
  <div>
    <h1>Hello from change password</h1>
  </div>
</template>

<script>
import { getItem, clearStorage } from "@/utils/storage";

export default {
  name: "ChangePassword",

  beforeRouteEnter(to, from, next) {
    const loggedIn = getItem("org_details");
    const { token } = to.query;
    if (!token) {
      clearStorage();
      return next({ name: "SignIn" });
    }
    if (loggedIn === null) {
      return next({ name: "ResetPassword", query: { token } });
    } else {
      return next({ name: "PasswordReset", query: { token } });
    }
  },
};
</script>

<style lang="scss" scoped></style>
