import axios from "axios";

const baseUrl = `https://52fa0596-5e91-4e7c-b2a8-bb3d4b8b66c7.mock.pstmn.io`;
const paymentUrl = `${baseUrl}//woodcore/payment`;

export default {
  getHeader: () => {
    let headers = {
      Authorization: "Bearer " + getItem("org_token"),
    };
    return headers;
  },

  getTransactions(id) {
    return axios.get(`${paymentUrl}/${id}`, {
      headers: this.getHeader(),
    });
  },
};
