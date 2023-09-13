<template>
  <div ref="tourTip" class="wrapper tw-z-20">
    <div ref="spotlight" class="overlay tw-z-50"></div>
    <div
      v-if="position === 'up'"
      class="tooltip up tw-text-white tw-bg-secondary tw-rounded tw-px-3 tw-py-4 xxxl:tw-mx-0 tw-z-40"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <h3 class="tw-text-lg tw-font-bold">{{ header }}</h3>
        <div class="tw-cursor-pointer" @click="endTour">
          <span class="tw-text-gray tw-text-xs tw-mr-1">Skip</span>
          <img
            class="tw-inline-block tw-w-2"
            src="@/assets/img/skip-btn.svg"
            alt="close"
          />
        </div>
      </div>
      <p class="tw-text-xs tw-leading-5">{{ text }}</p>
      <div class="tw-flex tw-justify-between tw-items-center tw-mt-6">
        <h1 class="tw-text-sm tw-font-bold">
          Step <span>{{ step }} of {{ totalStep }}</span>
        </h1>
        <div class="tw-flex">
          <img
            v-if="step !== 1"
            class="tw-mr-4 tw-cursor-pointer"
            src="@/assets/img/left-tour-white-btn.svg"
            alt="previous button"
            @click="continueTour('prev')"
          />
          <img
            class="tw-cursor-pointer"
            src="@/assets/img/right-tour-white-btn.svg"
            alt="next button"
            @click="continueTour('next')"
          />
        </div>
      </div>
    </div>
    <div
      v-if="position === 'right'"
      class="tooltip right tw-text-white tw-bg-secondary tw-rounded tw-px-3 tw-py-4 tw-z-40"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <h3 class="tw-text-lg tw-font-bold">{{ header }}</h3>
        <div class="tw-cursor-pointer" @click="endTour">
          <span class="tw-text-gray tw-text-xs tw-mr-1">Skip</span>
          <img
            class="tw-inline-block tw-w-2"
            src="@/assets/img/skip-btn.svg"
            alt="close"
          />
        </div>
      </div>
      <p class="tw-text-xs tw-leading-5">{{ text }}</p>
      <div class="tw-flex tw-justify-between tw-items-center tw-mt-6">
        <h1 class="tw-text-xs tw-font-bold">
          Step <span>{{ step }} of {{ totalStep }}</span>
        </h1>
        <div class="tw-flex">
          <img
            v-if="step !== 1"
            class="tw-mr-4 tw-cursor-pointer"
            src="@/assets/img/left-tour-white-btn.svg"
            alt="previous button"
            @click="continueTour('prev')"
          />
          <img
            class="tw-cursor-pointer"
            src="@/assets/img/right-tour-white-btn.svg"
            alt="next button"
            @click="continueTour('next')"
          />
        </div>
      </div>
    </div>
    <div
      v-if="position === 'down'"
      class="tooltip down tw-text-white tw-bg-secondary tw-rounded tw-px-3 tw-py-4 tw-z-40"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <h3 class="tw-text-lg tw-font-bold">{{ header }}</h3>
        <div class="tw-cursor-pointer" @click="endTour">
          <span class="tw-text-gray tw-text-xs tw-mr-1">Skip</span>
          <img
            class="tw-inline-block tw-w-2"
            src="@/assets/img/skip-btn.svg"
            alt="close"
          />
        </div>
      </div>
      <p class="tw-text-xs tw-leading-5">{{ text }}</p>
      <div class="tw-flex tw-justify-between tw-items-center tw-mt-6">
        <h1 class="tw-text-xs">
          Step <span>{{ step }} of {{ totalStep }}</span>
        </h1>
        <div class="tw-flex">
          <img
            v-if="step !== 1"
            class="tw-mr-4 tw-cursor-pointer"
            src="@/assets/img/left-tour-white-btn.svg"
            alt="previous button"
            @click="continueTour('prev')"
          />
          <img
            class="tw-cursor-pointer"
            src="@/assets/img/right-tour-white-btn.svg"
            alt="next button"
            @click="continueTour('next')"
          />
        </div>
      </div>
    </div>
    <div
      v-if="position === 'left'"
      class="tooltip left tw-text-white tw-bg-secondary tw-rounded tw-px-3 tw-py-4 tw-z-40"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <h3 class="tw-text-lg tw-font-bold">{{ header }}</h3>
        <div class="tw-cursor-pointer" @click="endTour">
          <span class="tw-text-gray tw-text-xs tw-mr-1">Skip</span>
          <img
            class="tw-inline-block tw-w-2"
            src="@/assets/img/skip-btn.svg"
            alt="close"
          />
        </div>
      </div>
      <p class="tw-text-xs tw-leading-5">{{ text }}</p>
      <div class="tw-flex tw-justify-between tw-items-center tw-mt-6">
        <h1 class="tw-text-xs">
          Step <span>{{ step }} of {{ totalStep }}</span>
        </h1>
        <div class="tw-flex">
          <img
            v-if="step !== 1"
            class="tw-mr-4 tw-cursor-pointer"
            src="@/assets/img/left-tour-white-btn.svg"
            alt="previous button"
            @click="continueTour('prev')"
          />
          <img
            class="tw-cursor-pointer"
            src="@/assets/img/right-tour-white-btn.svg"
            alt="next button"
            @click="continueTour('next')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Btn from "@/components/general/BtnComponent.vue";

  export default {
    name: "TourTips",

    emits: ["update-step"],

    props: {
      header: { type: String },
      text: { type: String, required: true },
      // steps: { type: Number },
      position: { type: String, required: true },
    },

    data() {
      return {
        currentStep: 0,
        scrollPosition: null,
      };
    },

    components: {
      Btn,
    },

    computed: {
      ...mapState({
        tokens: (state) => state.tokenModule.userTokens,
        totalStep: (state) => state.totalStep,
        step: (state) => state.step,
      }),
    },

    mounted() {
      window.addEventListener("scroll", this.getTourtipPosition, true);
      this.getTourtipPosition();
    },

    beforeUnmount() {
      window.removeEventListener("scroll", this.getTourtipPosition, true);
    },

    methods: {
      ...mapActions(["updateStep", "updateTour"]),

      continueTour(direction) {
        const spotlight = this.$refs.spotlight;
        spotlight.classList.add("inactive-spotlight");
        let currentStep = 0;
        const id = "step" + this.step;
        const element = document.getElementById(id);
        if (element) {
          element.style.padding = "0px";
        }
        switch (direction) {
          case "prev":
            currentStep = this.step - 1;
            this.$emit("update-step", currentStep);
            break;
          case "next":
            currentStep = this.step + 1;
            this.$emit("update-step", currentStep);
            break;

          default:
            break;
        }
      },

      getTourtipPosition() {
        const id = "step" + this.step;
        const element = document.getElementById(id);
        const spotlight = this.$refs.spotlight;
        const timer = this.currentStep !== this.step ? 500 : 0;
        setTimeout(() => {
          if (this.currentStep !== this.step) {
            spotlight.classList.add("inactive-spotlight");
          }
        }, 0);
        setTimeout(() => {
          if (!element || !spotlight) return;
          const position = element.getBoundingClientRect();
          spotlight.style.marginTop = position.top + "px";
          spotlight.style.marginLeft = position.left + "px";
          spotlight.style.height = position.height + 10 + "px";
          spotlight.style.width = position.width + "px";
          element.style.paddingLeft = "10px";
          element.style.paddingTop = "10px";
          element.style.paddingRight = "10px";
          spotlight.classList.remove("inactive-spotlight");
          this.currentStep = this.step;
        }, timer);
      },

      endTour() {
        let payload;
        this.step >= 6
          ? (payload = {
              tour: "introduction_tour",
            })
          : (payload = {
              tour: "wallet_tour",
            });
        this.updateTour(payload);
        this.updateStep(0);
      },
    },

    watch: {
      step(oldValue, newValue) {
        if (oldValue !== newValue) this.getTourtipPosition();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    //   width: 17rem;
    max-width: 17rem;
    display: inline-flex;
    @include fadeIn;

    .overlay {
      @include fadeIn;
      position: fixed;
      border-width: 100vh 100vw;
      border-style: solid;
      border-color: rgba(31, 32, 35, 0.7);
      top: -100vh;
      left: -100vw;
      box-sizing: content-box;
      background: radial-gradient(
          ellipse at start,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) 50%,
          rgba(31, 32, 35, 0.7) 60%,
          rgba(31, 32, 35, 0.7) 100%
        )
        no-repeat;
      z-index: 40;
    }
  }

  .inactive-spotlight {
    background: radial-gradient(
        ellipse at center,
        rgba(31, 32, 35, 0.7) 0%,
        rgba(31, 32, 35, 0.7) 50%,
        rgba(31, 32, 35, 0.7) 60%,
        rgba(31, 32, 35, 0.7) 100%
      )
      no-repeat;
  }

  .wrapper .up::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background-color: #001140;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .right::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background-color: #001140;
    left: -0px;
    top: 23%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .left::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background-color: #001140;
    right: -8px;
    top: 23%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .down::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background-color: #001140;
    top: -3px;
    left: 20%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
</style>
