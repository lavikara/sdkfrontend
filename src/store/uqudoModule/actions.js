import responseHandler from "@/utils/responseHandler.js";
import api from "@/utils/api.js";

export const setLoading = ({ commit }, value) => {
    commit("SET_LOADING", value);
};

export const getToken = async({ dispatch, commit }) => {
    dispatch("setLoading", true);
    try {
        const response = await api.getUqudoToken();
        const { data } = response.data;
        commit("SET_UQUDO_INFO", data);
        dispatch("setLoading", false);
        return response;
    } catch (error) {
        responseHandler.handleError(error);
        dispatch("setLoading", false);
        return error;
    }
};

export const scan = async({ dispatch, commit }, formData) => {
    dispatch("setLoading", true);
    try {
        const response = await api.scan(formData);
        const data = response.data.data.data;
        commit("SET_UQUDO_SESSION", data.sessionId);
        dispatch("setLoading", false);
        return response;
    } catch (error) {
        responseHandler.handleError(error);
        dispatch("setLoading", false);
        return error;
    }
};

export const updateKyc = async({ dispatch }, payload) => {
    dispatch("setLoading", true, { root: true });
    try {
        const response = await api.updateKyc(payload);
        const { message } = response.data;
        dispatch(
            "showToast", { description: message, display: true, type: "success" }, { root: true }
        );
        return response;
    } catch (error) {
        responseHandler.handleError(error);
        dispatch("setLoading", false, { root: true });
        return error;
    }
};