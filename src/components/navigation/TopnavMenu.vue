<template>
  <router-link
    :to="href"
    id="topnav-menu"
    class="tw-flex tw-items-center tw-cursor-pointer tw-text-black-light tw-text-sm"
    :class="{
      'tw-text-primary': focus === true,
    }"
  >
    <p class="tw-pr-1.5">{{ title }}</p>
    <!-- <svg
      v-if="
        title === 'For Companies' ||
          title === 'For Syndicates' ||
          title === 'Create an SPV'
      "
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.00011 2.58602L6.47512 0.111023L7.18212 0.818023L4.00011 4.00002L0.818115 0.818023L1.52512 0.111023L4.00011 2.58602Z"
        fill="#8791A7"
      />
    </svg> -->
  </router-link>
</template>

<script>
export default {
  name: "TopnavMenu",

  props: {
    title: { type: String, default: () => "", required: true },
    href: { type: String, default: () => "", required: true },
    focus: { type: Boolean, default: () => false },
  },
};
</script>

<style lang="scss" scoped></style>
