<template>
  <div id="content-loader">
    <slot name="content">Nothing to show</slot>
  </div>
</template>

<script>
export default {
  name: "ContentLoader",
};
</script>

<style lang="scss" scoped>
#content-loader {
  position: relative;
  top: -5rem;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
