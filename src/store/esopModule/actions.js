import responseHandler from "@/utils/responseHandler.js";
import api from "@/utils/api.js";

export const getUserEsop = async ({ commit, dispatch }) => {
  dispatch("setLoading", true, { root: true });
  try {
    const payload = {
      status: "pending",
    };
    const esops = api.getUserEsop();
    const pendingEsops = api.getEmployeeInvites(payload);
    const response = await Promise.all([esops, pendingEsops]);
    const { data } = response[0].data;
    const pendingEsopData = response[1].data.data;
    const allEsop = data.esops.concat(pendingEsopData.invites);
    const total = data.total + pendingEsopData.total;
    commit("SET_USER_ESOPS", allEsop);
    const { pages, page } = data;
    commit("SET_ESOP_PAGE_INFO", { pages, page, total });
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const exerciseVestedShares = async (
  { dispatch },
  { id, amount, symbol }
) => {
  try {
    const response = await api.exerciseVestedShares({ id, amount });
    dispatch("getUserEsop");
    dispatch("tokenModule/getTokenBalance", symbol, { root: true });
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    return error;
  }
};

export const getEsopInviteInfo = async ({ dispatch, commit }, token) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getEsopInviteInfo(token);
    const { data } = response.data;
    commit("SET_ESOP_INVITE_INFO", data);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const acceptInvite = async ({ dispatch, commit }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.acceptInvite(payload);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getEsopOrder = async ({ commit }, id) => {
  try {
    const response = await api.getEsopOrder(id);
    const { orders } = response.data.data;
    commit("SET_ESOP_ORDER", orders);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const setCurrentEsop = async ({ commit }, payload) => {
  try {
    commit("SET_ESOP_TOKEN", payload);
    return true;
  } catch (error) {
    responseHandler.handleError(error);
    return false;
  }
};

export const buyEsop = async ({ state, dispatch }, payload) => {
  let symbol = state.esopToken.token.symbol;
  let id = state.esopToken.token._id;
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.buyEsop(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    dispatch("tokenModule/getTokenBalance", symbol, { root: true });
    dispatch("getEsopOrder", id);
    dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const sellEsop = async ({ state, dispatch }, payload) => {
  let symbol = state.esopToken.token.symbol;
  let id = state.esopToken.token._id;
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.sellEsop(payload);
    const { message } = response.data;
    dispatch(
      "showToast",
      { description: message, display: true, type: "success" },
      { root: true }
    );
    dispatch("tokenModule/getTokenBalance", symbol, { root: true });
    dispatch("getEsopOrder", id);
    dispatch("setLoading", false, { root: true });
    return true;
  } catch (error) {
    dispatch("setLoading", false, { root: true });
    responseHandler.handleError(error);
    return false;
  }
};

export const declineInvite = async ({ dispatch, commit }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.declineInvite(payload);
    dispatch("setLoading", false, { root: true });
    return response;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};

export const getEsopById = async ({ dispatch, commit }, payload) => {
  dispatch("setLoading", true, { root: true });
  try {
    const response = await api.getEmployeeInvitesById(payload);
    const { data } = response.data;
    dispatch("setLoading", false, { root: true });
    return data;
  } catch (error) {
    responseHandler.handleError(error);
    dispatch("setLoading", false, { root: true });
    return error;
  }
};
