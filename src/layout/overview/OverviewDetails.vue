<template>
  <div id="overview">
    <Teleport to="#teleport-modal">
      <SmallModal>
        <template v-slot:content>
          <img
            class="tw-mx-auto"
            src="@/assets/img/orange-info.svg"
            alt="info"
          />
          <h3 class="tw-text-center tw-text-lg tw-font-bold tw-my-4">
            Welcome to GetEquity!
          </h3>
          <p class="tw-text-center">
            Let’s walk you through the app so you can start investing in no
            time. Click the button below to get started
          </p>
          <Btn class="tw-mt-12" title="Get Started" />
        </template>
      </SmallModal>
    </Teleport>
  </div>
</template>

<script>
import Btn from "@/components/general/BtnComponent.vue";
import SmallModal from "@/components/general/SmallModal.vue";

export default {
  name: "OverviewDetails",

  components: {
    SmallModal,
    Btn,
  },

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>

<style lang="scss"></style>
