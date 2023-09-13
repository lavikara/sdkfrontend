<template>
  <div
    class="toggle"
    :class="{ 'toggle--active': toggled }"
    @click.self="switchToggle"
  >
    <button
      type="button"
      class="toggle__button"
      :class="{ 'toggle__button--active': toggled }"
      @click="switchToggle"
    ></button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ToggleButton",
  props: {
    activeStatus: { type: Boolean },
    disabled: { type: Boolean, default: () => false },
  },
  data() {
    return {
      toggled: false,
    };
  },
  computed: {
    ...mapState({
      investorDetails: (state) => state.investorModule.investorDetails,
    }),
  },
  emits: ["value-selected"],
  mounted() {
    if (this.activeStatus) {
      this.toggled = this.investorDetails?.two_factor_enabled;
    }
  },
  methods: {
    switchToggle() {
      if (this.disabled) return;
      this.toggled = !this.toggled;
    },
  },
  watch: {
    toggled(val) {
      this.$emit("value-selected", val);
    },
    activeStatus(val) {
      this.toggled = this.investorDetails?.two_factor_enabled;
    },
  },
};
</script>
<style lang="scss" scoped>
.toggle {
  width: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  height: 25px;
  background: #716e89;
  padding-left: 2px;
  padding-right: 2px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &--active {
    background: #4d84ff;
  }
  &__button {
    border-radius: 50%;
    border: 0;
    width: 20px;
    height: 20px;
    background: #fff;
    padding: 0;
    margin-bottom: 1px;
    transform: translateY(0.5px);
    transition: transform 300ms ease-in-out;
    &--active {
      transform: translateX(15px);
    }
  }
}
</style>
