<template>
  <div id="overview">
    <Teleport to="#teleport-modal">
      <SmallModal v-if="showEmailPopup" @close="removeIframe">
        <template v-slot:content>
          <form @submit.prevent="updateEmail">
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
                @click="updateEmail"
              />
            </div>
          </form>
        </template>
      </SmallModal>
    </Teleport>
    <Teleport to="#teleport-modal">
      <MediumModal class="" v-if="showPaymentDetails" @close="reload">
        <template v-slot:content>
          <form @submit.prevent="">
            <div class="tw-flex">
              <Sidebar />
              <div class="tw-pl-4">
                <div
                  class="tw-flex tw-justify-between tw-items-center tw-mb-12"
                >
                  <img
                    class="tw-w-10"
                    src="@/assets/img/woodcore.png"
                    alt="info"
                  />
                  <div>
                    <p>{{ paymentDetails.email }}</p>
                    <p class="tw-text-blue">
                      Pay {{ formatCurrency(paymentDetails.amount, 2, "NGN") }}
                    </p>
                  </div>
                </div>
                <h3 class="tw-text-center tw-text-xl tw-mb-4">
                  Enter your card details
                </h3>
                <NumberInput
                  placeHolder="0000 0000 0000 0000"
                  label="card number"
                  type="number"
                  fieldType="tokenAmount"
                  :showLabel="true"
                  name="card number"
                  id="cardNumber"
                  @set="setCardNumber"
                />
                <div
                  class="tw-w-full tw-flex tw-justify-between tw-items-center tw-gap-4 tw-mt-4"
                >
                  <NumberInput
                    placeHolder="MM/YY"
                    label="card expiry"
                    type="number"
                    fieldType="cardExpiry"
                    :showLabel="true"
                    name="card expiry"
                    id="cardExpiry"
                    @set="setCardExpiryNumber"
                  />
                  <NumberInput
                    placeHolder="123"
                    label="cvv"
                    type="number"
                    fieldType="cvv"
                    :showLabel="true"
                    name="cvv"
                    id="cvv"
                    @set="setCvvNumber"
                  />
                </div>
                <div class="tw-flex tw-gap-8 tw-mt-12">
                  <Btn
                    title="Pay"
                    :amount="paymentDetails.amount"
                    @click="pay"
                  />
                </div>
              </div>
            </div>
          </form>
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
import Sidebar from "@/layout/navigation/Sidebar.vue";
import { formatCurrency } from "@/utils/helpers.js";

export default {
  name: "OverviewDetails",

  components: {
    EmailInput,
    SmallModal,
    MediumModal,
    NumberInput,
    Sidebar,
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
    formatCurrency,

    pay() {},

    setCardNumber() {},

    setCvvNumber() {},

    setCardExpiryNumber() {},

    removeIframe() {
      let elem = document.querySelector("#woodcore--frame-id");
      elem.parentNode.removeChild(elem);
    },

    reload() {
      location.reload();
    },

    updateEmail() {},

    setEmail(email) {
      this.payload.email = email;
    },

    validateMethod(field) {
      switch (field) {
        case "Enter email address":
          this.v$.$reset();
          this.v$.payload.email.$touch();
          if (this.v$.$errors.length === 0) {
            this.emailError = {};
            this.showPaymentDetails = !this.showPaymentDetails;
            return;
          }
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
