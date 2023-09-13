<template>
  <div>
    <div
      id="side-modal"
      class="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-screen tw-z-30"
      @click="$emit('close', title)"
    >
      <div class="container">
        <div
          class="card tw-fixed tw-h-screen tw-overflow-y-scroll tw-top-0 tw-right-0 tw-bg-white tw-pb-4"
          @click.stop
        >
          <div
            v-if="
              subTitle !== 'Withdraw cash to' &&
              subTitle !== 'Where would you like to gift from?' &&
              subTitle !== 'Enter your account password' &&
              subTitle !== 'Enter your PIN to continue' &&
              subTitle !== 'Confirm Deactivation' &&
              subTitle !== 'What this means' &&
              title !== 'Confirmation' &&
              !title.includes('Invest in') &&
              !title.includes('Add Bank') &&
              !title.includes('Employee Invitation') &&
              !title.includes('Company Update') &&
              !title.includes('Notifications') &&
              !title.includes('ESOP') &&
              !title.includes('Subscription') &&
              backBtn
            "
            class="tw-relative"
          >
            <img
              class="back-btn tw-absolute tw-rounded-full tw-cursor-pointer tw-p-1"
              src="@/assets/img/back-icon.svg"
              alt="back"
              @click="$emit('goBack', form)"
            />
          </div>
          <div class="tw-relative">
            <img
              class="mobile-close-btn tw-absolute tw-rounded-full tw-cursor-pointer tw-p-1"
              src="@/assets/img/close-icon.svg"
              alt="close"
              @click="$emit('close', title)"
            />
          </div>
          <div>
            <Header class="" :title="title" :bgChange="bgChange" />
            <SubHeading
              v-if="subTitle !== ''"
              class="tw-pt-4"
              :title="subTitle"
            />
            <slot name="content">content</slot>
          </div>
        </div>
      </div>
    </div>
    <img
      class="close-btn tw-hidden tw-fixed tw-rounded-full tw-cursor-pointer tw-p-1 tw-z-40"
      src="@/assets/img/close-icon.svg"
      alt="close"
      @click="$emit('close', title)"
    />
  </div>
</template>

<script>
  import Header from "@/components/general/sidemodal/SideModalHeader.vue";
  import SubHeading from "@/components/general/sidemodal/SideModalSubHeading.vue";

  export default {
    name: "SideModal",

    emits: ["close", "mounted", "goBack"],

    components: {
      Header,
      SubHeading,
    },

    props: {
      title: { type: String, default: () => "", required: true },
      subTitle: { type: String, default: () => "" },
      form: { type: String, default: () => "" },
      bgChange: { type: Boolean, default: () => false },
      backBtn: { type: Boolean, default: () => true },
    },

    mounted() {
      this.$emit("mounted", this.title);
    },
  };
</script>

<style lang="scss" scoped>
  #side-modal {
    @include fadeIn;
    background-color: $modal-bg;
    overflow: scroll;

    .container {
      .card {
        min-width: 100%;
        max-width: 100%;
        // margin: 0rem auto 0 auto;

        @media screen and (min-width: 480px) {
          min-width: 381px;
          max-width: 381px;
        }
      }
      .card::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      .card {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
      .mobile-close-btn {
        top: 0.4rem;
        right: 1rem;

        @media screen and (min-width: 640px) {
          display: none;
        }
      }
      .back-btn {
        top: 0.4rem;
        left: 1rem;
      }
    }
  }
  .close-btn {
    @media screen and (min-width: 640px) {
      display: block;
      top: 0.4rem;
      right: 30rem;
    }
  }
</style>
