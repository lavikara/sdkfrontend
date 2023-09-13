<template>
  <ul id="sidebar-menu">
    <li>
      <router-link
        :to="href"
        class="tw-flex tw-py-5 tw-cursor-pointer hover:tw-text-primary"
      >
        <span class="tw-pl-5">
          {{ title }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SidebarMenu",

  props: {
    title: { type: String, default: () => "", required: true },
    href: { type: String, default: () => "" },
    focus: { type: Boolean, default: () => false },
  },
};
</script>

<style lang="scss" scoped></style>
