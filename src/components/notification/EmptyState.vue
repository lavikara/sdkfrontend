<template>
  <div id="empty-state">
    <div class="tw-flex tw-flex-col tw-items-center">
      <img
        class=""
        src="https://res.cloudinary.com/djalafcj9/image/upload/v1634648059/getequityV2/empty-state_g5ktb2.png"
        alt="empty file"
        loading="lazy"
      />
      <slot name="message">Nothing to show</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EmptyState",
  }
</script>

<style lang="scss" scoped></style>
