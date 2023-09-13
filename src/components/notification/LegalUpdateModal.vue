<template>
  <div id="legal-update-modal" v-if="displayModal === true">
    <SmallModal class="tw-z-50" @close="closeModal">
      <template v-slot:content>
        <form @submit.prevent="viewUpdates">
          <div class="tw-my-8">
            <h3 class="tw-text-2xl tw-font-semibold tw-text-center tw-mb-8">
              Hey there, investor 👋
            </h3>
            <p class="tw-text-center">
              We've updated our terms of service and privacy policy to help you
              understand how we collect, use and share your information. This
              change will go into effect from today. Happy investing! 🤝
            </p>
          </div>
          <BtnComponent title="View Updates" :loading="loading" />
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
  name: "LegalUpdateModal",

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
      displayModal: (state) => state.legalUpdateModal,
      details: (state) => state.investorModule.investorDetails,
    }),
  },

  methods: {
    ...mapActions(["logout", "showLegalUpdateModal"]),

    async viewUpdates() {
      this.$router.push({ name: "LegalTerms" });
      this.showLegalUpdateModal(false);
    },

    closeModal() {
      this.logout();
      this.showLegalUpdateModal(false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
