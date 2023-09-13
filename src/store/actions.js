import api from "@/utils/api";

export const getPaymentDetails = async ({ commit }, payload) => {
  const response = await api.getTransactions(payload);
  const { data } = response.data;
  commit("SET_PAYMENT_DETAILS", data);
};
