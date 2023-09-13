import responseHandler from "@/utils/responseHandler.js";
import api from "@/utils/api.js";
import { resetPin } from "../investorModule/actions";

export const getUserTokens = async ({ commit, dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getInvestorTokens(payload);
    const { tokens, page, pages } = response.data.data;
    commit("SET_INVESTOR_TOKENS", tokens);
    commit("SET_INVESTOR_TOKEN_PAGE", page);
    commit("SET_INVESTOR_TOKEN_PAGES", pages);
    dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const getUnlimitedUserTokens = async ({ commit }, payload) => {
  try {
    const response = await api.getInvestorTokens(payload);
    const { tokens } = response.data.data;
    commit("SET_UNLIMITED_INVESTOR_TOKENS", tokens);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getUserDealRooms = async ({ commit, dispatch }) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.fetchUserDealRooms();
    const { data } = response.data;
    commit("SET_USER_DEAL_ROOM", data);
    dispatch("setLoading", false, { root: true });
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};
export const getUserPrivateTokens = async ({ commit }) => {
  try {
    const response = await api.getUserPrivateTokens();
    const { data } = response.data;
    commit("SET_USER_PRIVATE_TOKENS", data);
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const getCompaniesRaising = async ({ commit, dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getCompaniesRaising(payload);
    const { tokens, page, pages } = response.data.data;
    commit("SET_RAISING_TOKENS", tokens);
    commit("SET_RAISING_PAGES", pages);
    commit("SET_RAISING_PAGE", page);
    dispatch("setLoading", false, { root: true });
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getCompaniesRaised = async ({ commit, dispatch }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getCompaniesRaised(payload);
    const { tokens, page, pages } = response.data.data;
    commit("SET_RAISED_TOKENS", tokens);
    commit("SET_RAISED_PAGES", pages);
    commit("SET_RAISED_PAGE", page);
    dispatch("setLoading", false, { root: true });
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getOrderBooks = async ({ commit, dispatch }, query) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getOrderBooks(query);
    const { orders, page, pages } = response.data.data;
    commit("SET_ORDER_BOOK", orders);
    commit("SET_ORDER_PAGE", page);
    commit("SET_ORDER_PAGES", pages);
    dispatch("setLoading", false, { root: true });
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getPublicTokens = async ({ commit, dispatch }) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getPublicTokens();
    const { data } = response.data;
    commit("SET_PUBLIC_TOKENS", data);
    // dispatch("setLoading", false, { root: true });
  } catch (error) {
    responseHandler.handleError(error);
    // dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getToken = async ({ commit, dispatch }, tokenId) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getToken(tokenId);
    const { data } = response.data;
    commit("SET_TOKEN_INFO", data);
    // dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    // dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return error;
  }
};

export const getAssetInfo = async ({ commit, dispatch }, assetId) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getAssetInfo(assetId);
    const { data } = response.data;
    commit("SET_ASSET_INFO", data);
    // dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    // dispatch("setLoading", false, { root: true });
    return false;
  }
};

export const getTokenBalance = async ({ commit, dispatch }, symbol) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getTokenBalance(symbol);
    const { balance } = response.data.data;
    commit("SET_TOKEN_BALANCE", balance);
    // dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    // dispatch("setLoading", false, { root: true });
    return false;
  }
};

export const getTokenOrders = async ({ commit, dispatch }, payload) => {
  dispatch("setSmallLoading", true, { root: true });
  try {
    const response = await api.getTokenOrders(payload);
    const { orders } = response.data.data;
    if (payload.data.type === "Buy") commit("SET_BUY_ORDER_BOOK", orders);
    if (payload.data.type === "Sell") commit("SET_SELL_ORDER_BOOK", orders);
    dispatch("setSmallLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setSmallLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const tradeToken = async ({}, payload) => {
  try {
    await api.tradeToken(payload);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getDealRoomInfo = ({ commit, dispatch }, id) => {
  dispatch("setLoading", true, { root: true });
  return new Promise((resolve, reject) => {
    api
      .getDealRoomInfo(id)
      .then((response) => {
        const { data } = response.data;
        commit("SET_DEAL_ROOM_INFO", data);
        resolve(response);
        // dispatch("setLoading", false, { root: true });
      })
      .catch((error) => {
        // dispatch("setLoading", false, { root: true });
        responseHandler.handleError(error);
        reject(error);
      });
  });
};

export const getCompanyUpdate = async ({ commit, dispatch }, payload) => {
  try {
    const response = await api.getCompanyUpdate(payload);
    const { tokenUpdates, updates, page, pages } = response.data.data;
    const flatTokenUpdate = tokenUpdates.flat();
    const totalUpdates = updates.concat(flatTokenUpdate.reverse());
    commit("SET_TOKEN_UPDATE", totalUpdates);
    // commit("SET_TOKEN_UPDATE_PAGE", page);
    // commit("SET_TOKEN_UPDATE_PAGES", pages);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const getDealRoomSubscriptionStatus = async (
  { commit, dispatch },
  id
) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getDealRoomSubscriptionStatus(id);
    const { data } = response.data;
    commit("SET_DEAL_SUBSCRIPTION_STATUS", data);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    // dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getSubscriptionPlans = async ({ commit, dispatch }, id) => {
  // dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getSubscriptionPlans(id);
    const { data } = response.data;
    commit("SET_SUBSCRIPTION_PLANS", data);
    dispatch("setLoading", false, { root: true });
    return data;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    // dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const cancelOrder = async ({ dispatch }, payload) => {
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

export const getOrganizationDetails = ({ dispatch, commit }, id) => {
  return new Promise((resolve, reject) => {
    api
      .getOrganizationDetails(id)
      .then((response) => {
        const { data } = response.data;
        dispatch("setLoading", false, { root: true });
        commit("SET_DEAL_ROOM_INFO", data);
        resolve(response);
      })
      .catch((error) => {
        dispatch("setLoading", false, { root: true });
        responseHandler.handleError(error);
        reject(error);
      });
  });
};

export const searchToken = ({ dispatch, commit }, params) => {
  return new Promise((resolve, reject) => {
    api
      .getTokenByName(params)
      .then((response) => {
        const { tokens, page, pages } = response.data.data;
        if (params.completed_raise) {
          commit("SET_RAISED_TOKENS", tokens);
          commit("SET_RAISED_PAGES", pages);
          commit("SET_RAISED_PAGE", page);
        } else {
          commit("SET_RAISING_TOKENS", tokens);
          commit("SET_RAISING_PAGES", pages);
          commit("SET_RAISING_PAGE", page);
        }
        resolve(response);
      })
      .catch((error) => {
        dispatch("setLoading", false, { root: true });
        responseHandler.handleError(error);
        reject(error);
      });
  });
};

export const getWhyWeListed = ({ dispatch, commit }, tokenId) => {
  return new Promise((resolve, reject) => {
    api
      .getWhyWeListed(tokenId)
      .then((response) => {
        const { data } = response.data;
        commit("SET_WHY_WE_LISTED", data[0]);
        resolve(response);
      })
      .catch((error) => {
        responseHandler.handleError(error);
        reject(error);
      });
  });
};
