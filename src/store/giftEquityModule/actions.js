import responseHandler from "@/utils/responseHandler.js";
import api from "@/utils/api.js";

export const getGiftTokens = async ({ dispatch, commit }, payload) => {
  try {
    const response = await api.getGiftTokens(payload);
    const { page, pages, total, gifts } = response.data.data;
    commit("SET_GIFT_TOKENS", gifts);
    commit("SET_PAGE", page);
    commit("SET_PAGES", pages);
    commit("SET_TOTAL_GIFT_TOKENS", total);
    return true;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const sendGiftTokens = async ({ dispatch }, payload) => {
  try {
    const response = await api.sendGiftTokens(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    const query = { type: "sent", page: 1, limit: 10 };
    dispatch("getGiftTokens", query);
    return true;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const giftTokenAction = async ({ dispatch, commit }, payload) => {
  let type;
  payload.action === "reverse" ? (type = "sent") : (type = "received");
  try {
    const response = await api.giftTokenAction(payload);
    const query = { type: type, page: 1, limit: 10 };
    dispatch("getGiftTokens", query);
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};
