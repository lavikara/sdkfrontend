<template>
  <div id="filter-component">
    <div class="container tw-bg-white tw-rounded tw-p-4">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-8">
        <h3 class="tw-text-lg">{{ title }}</h3>
        <img
          class="tw-h-4 tw-w- tw-cursor-pointer"
          src="https://res.cloudinary.com/djalafcj9/image/upload/v1635485821/getequityV2/close_muxdyb.png"
          alt="close icon"
          @click="$emit('close')"
        />
      </div>
      <ul>
        <li v-for="(option, index) in options" :key="index">
          <label
            class="plan basic-plan tw-flex tw-justify-between tw-items-center tw-cursor-pointer tw-mb-8"
            for="basic"
            @click="setFilterOption(option)"
          >
            <div class="tw-flex tw-items-center">
              <div
                class="tw-w-8 tw-h-8 tw-rounded-full tw-border tw-mr-4"
                :class="option"
              ></div>
              <div class="tw-text-black-light tw-text-lg">{{ option }}</div>
            </div>
            <input
              :ref="option"
              type="checkbox"
              :name="option"
              :id="option"
              :value="option"
            />
          </label>
        </li>
      </ul>
      <Btn title="Filter" @click="filterOrder" />
    </div>
  </div>
</template>

<script>
import Btn from "@/components/general/BtnComponent.vue";

export default {
  name: "FilterComponent",

  components: { Btn },

  props: {
    options: { type: Array, default: () => [], required: true },
    title: { type: String, default: () => "", required: true },
  },

  data() {
    return {
      selected: "",
    };
  },

  methods: {
    filterOrder() {
      this.$emit("filter", this.selected);
      this.$emit("close");
    },

    setFilterOption(option) {
      switch (option) {
        case "Completed":
          this.selected = "Fulfilled";
          break;
        case "Pending":
          this.selected = "Active";
          break;
        case "Failed":
          this.selected = "Terminated";
          break;

        default:
          break;
      }
      document.getElementById("Completed").checked = false;
      document.getElementById("Pending").checked = false;
      document.getElementById("Failed").checked = false;
      if (option === "Completed") {
        document.getElementById("Completed").checked = true;
      }
      if (option === "Pending") {
        document.getElementById("Pending").checked = true;
      }
      if (option === "Failed") {
        document.getElementById("Failed").checked = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#filter-component {
  .container {
    width: 254px;
    box-shadow: 0px 2px 4px rgba(44, 73, 137, 0.3);
  }

  .Successful,
  .Completed {
    background: rgba(39, 174, 96, 0.1);
  }

  .Pending {
    background: rgba(243, 139, 0, 0.1);
  }

  .Failed {
    background: rgba(219, 67, 67, 0.1);
  }
}
</style>
