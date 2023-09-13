<template>
  <transition name="show" mode="out-in">
    <div
      class="notification tw-fixed tw-border-l-4 tw-top-4 tw-right-2 tw-shadow-lg tw-pr-2 tw-z-50"
      :class="{
        'tw-border-success': alert == 'success',
        'tw-border-error': alert == 'error',
        'tw-border-info': alert == 'info',
      }"
      v-if="display"
    >
      <div
        class="tw-flex tw-flex-col tw-justify-start tw-items-start tw-bg-white tw-rounded tw-shadow-sm tw-text-black-light tw-px-4 tw-py-2"
      >
        <div class="tw-flex tw-items-center tw-w-full">
          <img
            v-show="alert == 'success'"
            src="@/assets/img/noti-success.svg"
            alt="success icon"
          />
          <img
            v-show="alert == 'error'"
            src="@/assets/img/noti-error.svg"
            alt="error icon"
          />
          <img
            v-show="alert == 'info'"
            src="@/assets/img/noti-info.svg"
            alt="info icon"
          />
          <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
            <h3 class="tw-text-xl tw-text-black tw-ml-3">
              {{ capitalize(alert) }}
            </h3>
            <img
              class="tw-cursor-pointer"
              src="@/assets/img/noti-cancel.svg"
              alt="cancel"
            />
          </div>
        </div>
        <div class="tw-w-full">
          <p class="tw-text-base tw-text-black-light tw-ml-7">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { capitalize } from "@/utils/helpers.js";

  export default {
    name: "Toast",

    computed: {
      ...mapState({
        alert: (state) => state.toast.type,
        description: (state) => state.toast.description,
        display: (state) => state.toast.display,
      }),
    },

    methods: {
      ...mapActions(["showToast"]),

      capitalize,
    },

    watch: {
      display(val) {
        deep: true;
        immediate: true;
        if (val === true) {
          setTimeout(() => {
            this.showToast({
              description: "",
              display: false,
              type: "",
            });
          }, 4000);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .notification {
    max-width: 90%;
    min-width: 60%;
    z-index: 100000;

    @media screen and (min-width: 640px) {
      max-width: 30rem;
      min-width: 20rem;
    }
  }
  .show-enter-active,
  .show-leave-active {
    transition: all 1s cubic-bezier(0.45, 0.25, 0.6, 0.95);
  }

  .show-enter-to,
  .show-leave-from {
    right: 1rem;
  }

  .show-enter-from,
  .show-leave-to {
    right: -20rem;
    transform: translate(530%, 20px);
  }
</style>
