<template>
  <div id="back-btn">
    <button
      @click="$router.go(-1)"
      class="tw-w-9 tw-h-9 tw-rounded-full tw-flex tw-items-center"
    >
      <img src="@/assets/img/arrow-back.svg" alt="arrow" />
    </button>
  </div>
</template>

<script>
export default {
  name: "BackBtn",
};
</script>

<style lang="scss" scoped></style>
