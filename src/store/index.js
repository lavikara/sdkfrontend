import Vuex from "vuex";
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import investorModule from "./investorModule/index";
import tokenModule from "./tokenModule/index";
import loadingModule from "./loadingModule/index";
import fileUploadsModule from "./fileUploadsModule/index";
import giftEquityModule from "./giftEquityModule/index";
import esopModule from "./esopModule/index";
import uqudoModule from "./uqudoModule/index";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    investorModule,
    loadingModule,
    tokenModule,
    fileUploadsModule,
    giftEquityModule,
    esopModule,
    uqudoModule,
  },
});
