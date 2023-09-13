import { setItem, clearStorage } from "@/utils/storage.js";
import responseHandler from "@/utils/responseHandler.js";
import api from "@/utils/api.js";
import router from "@/router";

export const setInvestorProfile = ({ commit }, payload) => {
  commit("SET_INVESTOR_PROFILE", payload);
};

export const setPin = ({ commit }, payload) => {
  commit("SET_PIN", payload);
};

export const storePassword = ({ commit }, payload) => {
  commit("STORE_PASSWORD", payload);
};

export const setCurrency = ({ commit }, payload) => {
  commit("SET_CURRENCY", payload);
};

export const setFundMethod = ({ commit }, payload) => {
  commit("SET_FUND_METHOD", payload);
};

export const setCardDetails = ({ commit }, payload) => {
  commit("SET_CARD_DETAILS", payload);
};

export const setWithdrawMethod = ({ commit }, payload) => {
  commit("SET_WITHDRAW_METHOD", payload);
};

export const verifyPin = async ({ commit }, payload) => {
  try {
    await api.verifyPin(payload);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getOrderBook = async ({ commit, dispatch }, payload) => {
  dispatch("setSmallLoading", true, { root: true });
  try {
    const response = await api.getOrderBooks(payload);
    const { orders, total, page, pages } = response.data.data;
    commit("SET_ORDER_BOOK", orders);
    commit("SET_TOTAL_ORDERS", total);
    commit("SET_ORDER_PAGE", page);
    commit("SET_ORDER_PAGES", pages);
    dispatch("setSmallLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setSmallLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const cancelOrder = async ({ commit, dispatch }, payload) => {
  dispatch("setSmallLoading", true, { root: true });
  try {
    await api.cancelOrder(payload);
    dispatch("setSmallLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setSmallLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const resetPasswordLink = async ({ dispatch }, payload) => {
  try {
    const response = await api.sendPasswordLink(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const resetPassword = async ({}, payload) => {
  try {
    const response = await api.resetPassword(payload);
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const resetPin = async ({ dispatch }, payload) => {
  try {
    const response = await api.resetPin(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getInvestorProfile = async ({ dispatch }) => {
  try {
    const response = await api.getUser();
    const { data } = response.data;
    setItem("org_details", data);
    dispatch("setInvestorProfile", data);
    if (!data.kyc.terms) {
      dispatch("showLegalUpdateModal", true, { root: true });
      router.push({ name: "LegalTerms" });
    }
    return data;
  } catch (error) {
    responseHandler.handleError(error);
    clearStorage();
    router.push({ name: "SignIn" });
    return false;
  }
};

export const setWithdrawPayload = ({ commit }, payload) => {
  if (payload.dollarAmount) {
    const formatPayload = {
      dollarAmount: payload.dollarAmount.replace(/\,/g, ""),
      nairaAmount: payload.nairaAmount.replace(/\,/g, ""),
    };
    commit("SET_WITHDRAW_PAYLOAD", formatPayload);
  } else {
    commit("SET_WITHDRAW_PAYLOAD", payload);
  }
};

export const submitKycDocument = async ({ dispatch }, payload) => {
  try {
    const response = await api.submitDocument(payload);
    const { data } = response.data;
    await dispatch("getInvestorProfile");
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const infinitScrollToken = async ({ commit }, payload) => {
  try {
    const response = await api.getInvestorTokens(payload);
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const pendingInvite = async ({ dispatch }, payload) => {
  try {
    const response = await api.pendingInvite(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const resetPage = ({ commit }) => {
  commit("SET_PAGE", 0);
  commit("SET_PAGES", 0);
};

export const getRefund = async ({}, object) => {
  try {
    const response = await api.requestRefund(object);
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const getBankDetails = async ({ state, commit, dispatch }) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getBankDetails();
    dispatch("setLoading", false, { root: true });
    if (!state.investorDetails.kyc.bank) dispatch("getInvestorProfile");
    const { data } = response.data;
    commit("SET_BANK_DETAILS", data);
    return response;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const validatePin = async ({}, payload) => {
  try {
    const response = await api.validatePin(payload);
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const updateUserInfo = async ({ commit, dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  return new Promise((resolve, reject) => {
    api
      .updateUserInfo(payload)
      .then((response) => {
        const { data } = response.data;
        commit("SET_INVESTOR_PROFILE", data);
        dispatch("setLoading", false, { root: true });
        resolve(response);
      })
      .catch((error) => {
        dispatch("setLoading", false, { root: true });
        responseHandler.handleError(error);
        reject(error);
      });
  });
};

export const userNameLookup = async ({ dispatch }, payload) => {
  try {
    const response = await api.userNameLookup(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const getUserSubscription = async ({ commit, dispatch }, id) => {
  //   dispatch("setLoading", true, { root: true });
  try {
    // dispatch("setLoading", false, { root: true });
    const response = await api.getUserSubscription(id);
    const { data } = response.data;
    commit("SET_MEMBERSHIP_STATUS", data);
    // dispatch("setLoading", false, { root: true });
    return data;
  } catch (error) {
    // dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const resetSubScription = ({ commit }) => {
  commit("SET_MEMBERSHIP_STATUS", null);
};

export const searchForUser = async ({ commit }, payload) => {
  try {
    const response = await api.searchUser(payload);
    const { data } = response.data;
    commit("SET_SEARCH_RESULT", data);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const getTransactions = async ({ commit, dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getTransactions(payload);
    const { transactions, total, page, pages } = response.data.data;
    commit("SET_INVESTOR_TRANSACTIONS", transactions);
    commit("SET_TOTAL_TRANSACTION", total);
    commit("SET_PAGE", page);
    commit("SET_PAGES", pages);
    dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return false;
  }
};

export const getWalletTransaction = async ({ commit, dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getWalletTransaction(payload);
    const { transactions, page, pages } = response.data.data;
    commit("SET_WALLET_TRANSACTION", transactions);
    commit("SET_WALLET_TRANSACTION_PAGE", page);
    commit("SET_WALLET_TRANSACTION_PAGES", pages);
    dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return false;
  }
};

export const getWalletBalance = async ({ commit, dispatch }) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const walletResponse = await api.getWalletBalance();
    const { usd_value, cash_usd_value } = walletResponse.data.data;
    const availableBalance = cash_usd_value + usd_value;
    commit("SET_TRADING_WALLET", usd_value);
    commit("SET_CASH_WALLET", cash_usd_value);
    commit("SET_AVAILABLE_BALANCE", availableBalance);
    // dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    // dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getExchangeRate = async ({ commit, dispatch }, payload) => {
  dispatch("setSmallLoading", true, { root: true });
  try {
    const response = await api.getExchangeRate(payload);
    const { rate } = response.data.data;
    commit("SET_EXCHANGE_RATE", rate);
    dispatch("setSmallLoading", false, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setSmallLoading", false, { root: true });
    return false;
  }
};

export const removeBank = async ({ dispatch }, id) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.removeBank(id);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const paySubscription = async ({ dispatch }, object) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.paySubscription(object);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const renewSubscription = async ({ dispatch }, duration) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.renewSubscription(duration);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const getMinimumWithdrawal = async ({ commit }) => {
  try {
    const response = await api.getMinimumWithdrawal();
    const { data } = response.data;
    commit("SET_MINIMUM_WITHDRAWAL", Number(data));
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const acceptInvite = async ({ dispatch }, token) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.acceptInvite(token);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const acceptInviteWithLink = async ({ dispatch }, token) => {
  dispatch("setLoading", true, { root: true });
  return new Promise((resolve, reject) => {
    api
      .acceptInviteWithLink(token)
      .then((response) => {
        dispatch("setLoading", false, { root: true });
        resolve(response);
      })
      .catch((error) => {
        dispatch("setLoading", false, { root: true });
        responseHandler.handleError(error);
        reject(error);
      });
  });
};

export const generateVirtualAccount = async ({ dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.generateVirtualAccount(payload);
    const { currency } = response.data.data;
    dispatch("getVirtualAccount", currency);
    dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const getVirtualAccount = async ({ dispatch, commit }, payload) => {
  dispatch("setSmallLoading", true, { root: true });
  try {
    const response = await api.getVirtualAccount(payload);
    const { data } = response.data;
    commit("SET_VIRTUAL_ACCOUNT", data[0]);
    dispatch("setSmallLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setSmallLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const getVirtualAccountFee = async ({}) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getVirtualAccountFee();
    // dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    // dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const getEntityCard = async ({ commit }) => {
  try {
    const response = await api.getEntityCard();
    const { data } = response.data;
    commit("SET_ENTITY_CARD", data);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const deleteCard = async ({ dispatch }, payload) => {
  // dispatch("setSmallLoading", true, { root: true });
  try {
    const response = await api.deleteCard(payload);
    const { message } = response.data;
    dispatch("getEntityCard");
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    // dispatch("setSmallLoading", false, { root: true });
    return true;
  } catch (error) {
    // dispatch("setSmallLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const getNotifications = async ({ dispatch }, payload) => {
  try {
    const response = await api.getNotifications(payload);
    dispatch("getTotalUnreadNotifications");
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const deleteAccount = async ({ dispatch }, payload) => {
  try {
    const response = await api.deleteAccount(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    dispatch("logout", {}, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const deactivateAccount = async ({ dispatch }, payload) => {
  try {
    const response = await api.deactivateAccount(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    dispatch("logout", {}, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const reactivateAccount = async ({ dispatch }, payload) => {
  try {
    const response = await api.reactivateAccount(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    dispatch("showDeactivateModal", false, { root: true });
    dispatch("logout", {}, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const addBankManually = async ({ dispatch, commit }, payload) => {
  try {
    const added = await api.addBankManually(payload);
    const { message } = added.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    const response = await api.getBankDetails();
    const { data } = response.data;
    commit("SET_BANK_DETAILS", data);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const updateTerms = async ({ dispatch, commit }, payload) => {
  try {
    const response = await api.updateTerms(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    await dispatch("getInvestorProfile");
    router.push({ name: "OverviewDetails" });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getTotalUnreadNotifications = async ({ commit }) => {
  try {
    const response = await api.getTotalUnreadNotifications();
    const { data } = response.data;
    commit("SET_NOTIFICATION_COUNT", data);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const generateQrCode = async ({ commit }, payload) => {
  try {
    const response = await api.generateQrCode(payload);
    const { data } = response.data;
    commit("SET_CODE", data);
    commit("SET_CODE_TYPE", payload);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getInvestorReport = async ({ commit, dispatch }) => {
  // dispatch("setLoading", true, { root: true });
  try {
    // dispatch("setLoading", false, { root: true });
    const response = await api.getInvestorReport();
    const { data } = response.data;
    commit("SET_INVESTOR_REPORT", data);
    // dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    // dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const getThePeerWallets = ({ commit, dispatch }) => {
  dispatch("setLoading", true, { root: true });
  return new Promise((resolve, reject) => {
    api
      .getThePeerWallets()
      .then((response) => {
        const { data } = response.data;
        commit("SET_THEPEER_WALLETS", data);
        dispatch("setLoading", false, { root: true });
        resolve(response);
      })
      .catch((error) => {
        dispatch("setLoading", false, { root: true });
        reject(error);
      });
  });
};
