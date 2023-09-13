import axios from "axios";
import { getItem } from "@/utils/storage.js";

const endpoints = {
  getHeader: () => {
    let headers = {
      Authorization: "Bearer " + getItem("org_token"),
    };
    return headers;
  },

  /**
   * Fetch nordigen institutions
   * @param {string} countryISO2
   */
  async fetchInstitutions(countryISO2) {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_UTILITY_API}/nordigen/banks?country=${countryISO2}`,
        {
          headers: this.getHeader(),
        }
      );
      return response;
    } catch (e) {
      return e;
    }
  },

  /*
   * Send bank connection response to the server
   */
  async finalizeBankConnection(type, data = {}) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_UTILITY_API}/bank/connect/${type}`,
        data,
        {
          headers: this.getHeader(),
        }
      );
      return response;
    } catch (e) {
      return e;
    }
  },

  /*
   * Send bank connection initiation to the server
   */
  async initiateBankConnection(type, data = {}) {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_UTILITY_API}/bank/initiate/${type}`,
        data,
        {
          headers: this.getHeader(),
        }
      );
      return response;
    } catch (e) {
      return e;
    }
  },

  /**
   * Send bank disconnection response to the server
   * @param {string} bankId
   */
  async diconnectBank(bankId) {
    try {
      const response = await axios.delete(`/bank/${bankId}`);
      return response;
    } catch (e) {
      return e;
    }
  },
};
export default endpoints;
