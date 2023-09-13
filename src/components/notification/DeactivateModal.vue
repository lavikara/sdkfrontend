<template>
  <div id="deactivate-modal" v-if="displayModal === true">
    <SmallModal class="tw-z-50" @close="closeModal">
      <template v-slot:content>
        <form @submit.prevent="reactivate">
          <div class="tw-flex tw-justify-center">
            <img src="@/assets/img/orange-info.svg" alt="info" />
          </div>
          <div class="tw-my-8">
            <h3 class="tw-text-2xl tw-font-semibold tw-text-center tw-mb-8">
              Your account is currently deactivated
            </h3>
            <p v-if="details.fname" class="tw-text-center">
              You need to reactivate your account to gain access again. Would
              you like to reactivate your account?
            </p>
            <p v-if="!details.fname" class="tw-text-center">
              You need to reactivate your account to gain access again. Please
              contact support to reactivate your account.
            </p>
          </div>
          <BtnComponent
            v-if="details.fname"
            title="Reactivate my account"
            :loading="loading"
          />
          <p
            class="cancel-btn tw-text-gray tw-font-semibold tw-text-center tw-cursor-pointer tw-mt-4"
            @click="closeModal"
          >
            {{ details.fname ? "Cancel" : "Close" }}
          </p>
        </form>
      </template>
    </SmallModal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SmallModal from "@/components/general/SmallModal.vue";
import BtnComponent from "@/components/general/BtnComponent.vue";

export default {
  name: "DeactivateModal",

  components: {
    SmallModal,
    BtnComponent,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      displayModal: (state) => state.deactivateModal,
      details: (state) => state.investorModule.investorDetails,
    }),
  },

  methods: {
    ...mapActions("investorModule", ["reactivateAccount"]),
    ...mapActions(["logout", "showDeactivateModal"]),

    async reactivate() {
      this.loading = !this.loading;
      const payload = { token: this.details.token };
      await this.reactivateAccount(payload);
      this.loading = !this.loading;
    },

    closeModal() {
      this.logout();
      this.showDeactivateModal(false);
    },
  },
};
</script>

<style lang="scss" scoped>
#deactivate-modal {
  @include fadeIn;

  .cancel-btn {
    width: 4rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
