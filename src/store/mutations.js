export const SHOW_TOAST = (state, payload) => {
  state.toast = payload;
};

export const SHOW_DEACTIVATE_MODAL = (state, payload) => {
  state.deactivateModal = payload;
};

export const SHOW_LEGAL_UPDATE_MODAL = (state, payload) => {
  state.legalUpdateModal = payload;
};

export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};

export const SET_SMALL_LOADING = (state, payload) => {
  state.smallLoading = payload;
};

export const UPDATE_WELCOME_MODAL = (state, payload) => {
  state.welcomeModal = payload;
};

export const UPDATE_END_TOUR_MODAL = (state, payload) => {
  state.showTourEndModal = payload;
};

export const UPDATE_STEP = (state, payload) => {
  state.step = payload;
};

export const UPDATE_SCREEN_WIDTH = (state, payload) => {
  state.screenWidth = payload;
};

export const SET_CAROUSEL = (state, payload) => {
  state.carousel = payload;
};
