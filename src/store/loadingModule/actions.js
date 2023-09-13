export const signinLoading = ({ commit }, payload) => {
  commit("SET_SIGNIN_LOADING", payload);
};

export const signinSuccess = ({ commit }, payload) => {
  commit("SET_SIGNIN_SUCCESS", payload);
};

export const createLoading = ({ commit }, payload) => {
  commit("SET_CREATE_LOADING", payload);
};

export const createSuccess = ({ commit }, payload) => {
  commit("SET_CREATE_SUCCESS", payload);
};

export const verifyLoading = ({ commit }, payload) => {
  commit("SET_VERIFY_LOADING", payload);
};

export const verifySuccess = ({ commit }, payload) => {
  commit("SET_VERIFY_SUCCESS", payload);
};

export const selfieLoading = ({ commit }, payload) => {
  commit("SET_SELFIE_LOADING", payload);
};

export const selfieSuccess = ({ commit }, payload) => {
  commit("SET_SELFIE_SUCCESS", payload);
};

export const createPinLoading = ({ commit }, payload) => {
  commit("SET_CREATE_PIN_LOADING", payload);
};

export const createPinSuccess = ({ commit }, payload) => {
  commit("SET_CREATE_PIN_SUCCESS", payload);
};

export const verifyPinLoading = ({ commit }, payload) => {
  commit("SET_VERIFY_PIN_LOADING", payload);
};

export const verifyPinSuccess = ({ commit }, payload) => {
  commit("SET_VERIFY_PIN_SUCCESS", payload);
};

export const requestLinkLoading = ({ commit }, payload) => {
  commit("SET_LINK_LOADING", payload);
};

export const requestLinkSuccess = ({ commit }, payload) => {
  commit("SET_LINK_SUCCESS", payload);
};

export const resetPasswordLoading = ({ commit }, payload) => {
  commit("SET_PASSWORD_LOADING", payload);
};

export const resetPasswordSuccess = ({ commit }, payload) => {
  commit("SET_PASSWORD_SUCCESS", payload);
};
