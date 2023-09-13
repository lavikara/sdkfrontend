import { clearStorage, setItem, getItem } from "@/utils/storage";
import router from "@/router";
import api from "@/utils/api";
import responseHandler from "@/utils/responseHandler.js";

export const updateWelcomeModal = ({ commit }, payload) => {
  commit("UPDATE_WELCOME_MODAL", payload);
};

export const updateEndTourModal = ({ commit }, payload) => {
  commit("UPDATE_END_TOUR_MODAL", payload);
};

export const updateStep = ({ commit }, payload) => {
  commit("UPDATE_STEP", payload);
};

export const getScreenWidth = ({ commit }) => {
  const screenWidth = window.innerWidth;
  commit("UPDATE_SCREEN_WIDTH", screenWidth);
};

export const showToast = ({ commit }, payload) => {
  commit("SHOW_TOAST", payload);
};

export const showDeactivateModal = ({ commit }, payload) => {
  commit("SHOW_DEACTIVATE_MODAL", payload);
};

export const showLegalUpdateModal = ({ commit }, payload) => {
  commit("SHOW_LEGAL_UPDATE_MODAL", payload);
};

export const setLoading = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};

export const setSmallLoading = ({ commit }, payload) => {
  commit("SET_SMALL_LOADING", payload);
};

export const updateTour = async ({ state, dispatch }, payload) => {
  const introTour = state.investorModule.investorDetails.tour.introduction_tour;
  const walletTour = state.investorModule.investorDetails.tour.wallet_tour;
  const secondaryTour =
    state.investorModule.investorDetails.tour.secondary_tour;
  if (introTour && walletTour && secondaryTour) return;
  const id = getItem("org_details")._id;
  await api.updateTour(payload);
  dispatch("investorModule/getInvestorProfile", id, { root: true });
};

export const logout = () => {
  clearStorage();
  router.push({ name: "SignIn" });
};

export const verifyPin = async ({}, pin) => {
  try {
    const response = await api.verifyPin(pin);
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const logEvent = async ({ state }, payload) => {
  const id = state.investorModule.investorDetails.email;
  payload.property.app = "Investor App";
  amplitude.getInstance().setUserId(id);
  amplitude.getInstance().logEvent(payload.event, payload.property);
};

export const getCarousel = async ({ commit }) => {
  const response = await api.getCarousel();
  const { data } = response.data;
  commit("SET_CAROUSEL", data);
};
