<!-- eslint-disable vue/html-indent -->
<template>
  <div id="kyc-dropdown">
    <div
      class="tw-w-full tw-border tw-border-gray-bg6 tw-bg-gray-bg5 tw-rounded tw-cursor-pointer tw-px-4 md:tw-px-8 tw-py-4 tw-mb-6"
    >
      <!-- <div
              class="tw-relative tw-flex tw-items-center"
              @click="
                edit === '' || edit === 'Rejected'
                  ? (openDropdown = !openDropdown)
                  : null
              "
            > -->
      <div class="tw-relative tw-flex tw-items-center" @click="showDropdown">
        <div class="tw-flex tw-items-center">
          <img
            v-if="title === 'Overview'"
            src="@/assets/img/overview-icon.svg"
            alt="show password icon"
          />
          <img
            v-if="title === 'Problem'"
            src="@/assets/img/search-icon.svg"
            alt="show password icon"
          />
          <img
            v-if="title === 'Solution'"
            src="@/assets/img/bulls-eye.svg"
            alt="show password icon"
          />
          <img
            v-if="title === 'Market Opportunity'"
            src="@/assets/img/dollar-icon.svg"
            alt="show password icon"
          />
          <img
            v-if="title === 'Traction'"
            src="@/assets/img/traction.svg"
            alt="show password icon"
          />
          <img
            v-if="title === 'Team'"
            src="@/assets/img/team.svg"
            alt="show password icon"
          />
          <div class="">
            <h3 class="tw-text-secondary tw-font-semibold tw-ml-3 md:tw-ml-5">
              {{ title }}
            </h3>
            <p
              v-if="subTitle"
              class="tw-text-gray tw-text-sm tw-ml-3 md:tw-ml-10 tw-mt-2"
            >
              {{ subTitle }}
            </p>
          </div>
        </div>
        <!-- <div class="tw-absolute tw-top-0 tw--right-1 tw-p-4 tw-cursor-pointer">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.99992 2.82901L7.82792 1.33514e-05L9.24292 1.41401L4.99992 5.65701L0.75692 1.41401L2.17192 1.33514e-05L4.99992 2.82901Z"
              fill="#4F5877"
            />
          </svg>
        </div> -->
      </div>
      <transition
        name="dropdown"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
      >
        <div v-show="openDropdown" class="">
          <slot name="content"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { abbreviate } from "@/utils/helpers.js";
export default {
  name: "DropDown",
  props: {
    title: { type: String, default: () => "", required: true },
    subTitle: { type: String, default: () => "" },
    status: { type: Boolean, default: () => false },
    // edit: { type: String, default: () => "", required: true },
  },
  data() {
    return {
      openDropdown: false,
      statusElement: [],
    };
  },
  computed: {
    ...mapState({
      //   orgDetails: (state) => state.organisationModule.organisationDetails,
      // orgDetails: (state) => state.companyModule.orgDetails,
      // bankAccount: (state) => state.accountsModule.bankAccount,
    }),
    // editStatus() {
    //   return this.edit === "" || this.edit === "Rejected";
    // },
  },
  //   inject: ["activeDropdown"],
  methods: {
    abbreviate,
    showDropdown() {
      //   if (this.editStatus) {
      this.openDropdown = !this.openDropdown;
      //     if (this.openDropdown) this.$emit("activeDropdown", this.title);
      //   }
    },
    enter(element) {
      element.style.height = "auto";
      let height = getComputedStyle(element).height;
      element.style.height = 0;
      getComputedStyle(element);
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
    leave(element) {
      element.style.height = getComputedStyle(element).height;
      getComputedStyle(element);
      setTimeout(() => {
        element.style.height = 0;
      });
    },
  },
  watch: {
    // orgDetails(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     setTimeout(() => {}, 500);
    //     // this.openDropdown = false;
    //   }
    // },
    activeDropdown(val) {
      if (this.title === val) {
        this.openDropdown = true;
      } else {
        this.openDropdown = false;
      }
    },
    // bankAccount(newValue, oldValue) {
    //   deep: true;
    //   immediate: true;
    //   if (newValue !== oldValue) {
    //     setTimeout(() => {}, 500);
    //     this.openDropdown = false;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
#kyc-dropdown {
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: height 0.3s ease-in-out;
    overflow: hidden;
  }
}
</style>
