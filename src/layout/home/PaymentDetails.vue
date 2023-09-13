<template>
  <div id="overview">
    <Teleport to="#teleport-modal">
      <SmallModal
        v-if="showEmailPopup"
        @close="showEmailPopup = !showEmailPopup"
      >
        <template v-slot:content>
          <img
            class="tw-w-44 tw-mx-auto"
            src="@/assets/img/woodcore.png"
            alt="info"
          />
          <h3 class="tw-text-center tw-text-2xl tw-font-semibold tw-mb-14">
            Woodcore checkout
          </h3>
          <EmailInput
            placeHolder="Enter email address"
            label="Enter email to get your receipt"
            :email="payload.email"
            :error="emailError || {}"
            @set="setEmail"
            @validate="validateMethod"
          />
          <div class="tw-flex tw-gap-8 tw-mt-12">
            <Btn
              title="Pay"
              :amount="paymentDetails.amount"
              @click="showPaymentDetails = !showPaymentDetails"
            />
          </div>
        </template>
      </SmallModal>
    </Teleport>
    <Teleport to="#teleport-modal">
      <MediumModal
        v-if="showPaymentDetails"
        @close="showPaymentDetails = !showPaymentDetails"
      >
        <template v-slot:content>
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-12">
            <img class="tw-w-10" src="@/assets/img/woodcore.png" alt="info" />
            <div>
              <p>{{ paymentDetails.email }}</p>
            </div>
          </div>
          <h3 class="tw-text-center tw-text-xl tw-mb-8">
            Enter your card details
          </h3>
          <NumberInput
            placeHolder="Card Number"
            label="card number"
            type="text"
            fieldType="tokenAmount"
            name="card number"
            id="cardNumber"
            @set="setCardNumber"
          />
          <div
            class="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-4 tw-mt-4"
          >
            <NumberInput
              placeHolder="Card Expiry"
              label="card expiry"
              type="text"
              fieldType="cardExpiry"
              name="card expiry"
              id="cardExpiry"
              @set="setCardExpiryNumber"
            />
            <NumberInput
              placeHolder="CVV"
              label="cvv"
              type="text"
              fieldType="cvv"
              name="cvv"
              id="cvv"
              @set="setCvvNumber"
            />
          </div>
          <div class="tw-flex tw-gap-8 tw-mt-12">
            <Btn title="Pay" :amount="paymentDetails.amount" @click="pay" />
          </div>
        </template>
      </MediumModal>
    </Teleport>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import EmailInput from "@/components/general/EmailInput.vue";
import NumberInput from "@/components/general/NumberInput.vue";
import Btn from "@/components/general/BtnComponent.vue";
import SmallModal from "@/components/general/SmallModal.vue";
import MediumModal from "@/components/general/MediumModal.vue";

export default {
  name: "OverviewDetails",

  components: {
    EmailInput,
    SmallModal,
    MediumModal,
    NumberInput,
    Btn,
  },

  data() {
    return {
      v$: useValidate(),
      payload: { email: "" },
      emailError: {},
      showPaymentDetails: false,
      showEmailPopup: true,
    };
  },

  validations() {
    return {
      payload: {
        email: { required, email },
      },
    };
  },

  computed: {
    ...mapState({
      paymentDetails: (state) => state.paymentDetails,
    }),
  },

  mounted() {
    this.getPaymentDetails(this.$route.params.id);
  },

  methods: {
    ...mapActions(["getPaymentDetails"]),

    pay() {},

    setCardNumber() {},

    setCvvNumber() {},

    setCardExpiryNumber() {},

    setEmail(email) {
      this.payload.email = email;
    },

    validateMethod(field) {
      switch (field) {
        case "Enter email address":
          this.v$.$reset();
          this.v$.payload.email.$touch();
          if (this.v$.$errors.length === 0) return (this.emailError = {});
          this.emailError = this.v$.$errors[0];
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss"></style>
