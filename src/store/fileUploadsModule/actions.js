import api from "@/utils/api.js";

export const setStatus = ({ commit }, value) => {
  commit("SET_STATUS", value);
};

export const setLoading = ({ commit }, value) => {
  commit("SET_LOADING", value);
};

export const uploadSelfie = ({ commit, state }, selfie) => {
  commit("SET_STATUS", true);
  commit("SET_LOADING", true);
  return new Promise((resolve, reject) => {
    api
      .uploadSelfie(selfie)
      .then((response) => {
        // eslint-disable-next-line dot-notation
        axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
        commit("SET_STATUS", false);
        commit("SET_LOADING", false);
        resolve(response);
      })
      .catch((err) => {
        commit("SET_STATUS", false);
        commit("SET_LOADING", false);
        reject(err);
      });
  });
};

// export const submitKyc = ({ commit, rootState }, data) => {
//     commit("SET_STATUS", true)
//     return new Promise((resolve, reject) => {
//         api
//             .submitKyc(data)
//             .then((response) => {
//                 // eslint-disable-next-line dot-notation
//                 axios.defaults.headers.common.Authorization = `Bearer ${rootState.Investor.token}`
//                 commit("SET_STATUS", false)
//                 commit("SET_LOADING", false)
//                 resolve(response)
//             })
//             .catch((err) => {
//                 commit("SET_STATUS", false)
//                 commit("SET_LOADING", false)
//                 reject(err)
//             })
//     })
// }
