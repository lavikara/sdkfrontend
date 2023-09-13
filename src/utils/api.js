import axios from "axios";
import { getItem } from "@/utils/storage.js";

const baseUrl = `${process.env.VUE_APP_BASE_URL}`;
const userUrl = `${baseUrl}/user`;
const tokenUrl = `${baseUrl}/token`;
const transactionUrl = `${baseUrl}/transaction`;
const organisationUrl = `${baseUrl}/organisation`;

export default {
  getHeader: () => {
    let headers = {
      Authorization: "Bearer " + getItem("org_token"),
    };
    return headers;
  },

  loginUser(data) {
    return axios.post(`${userUrl}/login`, data);
  },

  userNameLookup(username) {
    return axios.get(`${baseUrl}/username-lookup?`, {
      params: {
        username: username,
      },
    });
  },

  withdrawFees() {
    return axios.get(`${baseUrl}/withdrawal-requests/fees`, {
      headers: this.getHeader(),
    });
  },

  createUser(data) {
    return axios.post(`${userUrl}`, data);
  },

  updateSelfie(data) {
    return axios.post(`${baseUrl}/kyc/selfie`, data, {
      headers: this.getHeader(),
    });
  },

  submitDocument(data) {
    const type = data.documents[0].type;
    return axios.post(`${baseUrl}/kyc/documents/${type}`, data, {
      headers: this.getHeader(),
    });
  },

  getTransactions(query) {
    return axios.get(`${transactionUrl}/user?`, {
      params: {
        type: query.type,
        page: query.page,
        limit: query.limit,
        status: query.status,
        tokenId: query.tokenId,
      },
      headers: this.getHeader(),
    });
  },
  getUserTokens() {
    return axios.get(`${userUrl}/tokens`, {
      headers: this.getHeader(),
    });
  },
  fetchUserDealRooms() {
    return axios.get(`${baseUrl}/user/organisations`, {
      headers: this.getHeader(),
    });
  },
  getUserPrivateTokens() {
    return axios.get(`${baseUrl}/user/private-tokens`, {
      headers: this.getHeader(),
    });
  },

  getOrderBooks(query) {
    return axios.get(`${baseUrl}/order/user`, {
      params: {
        type: query.type,
        page: query.page,
        limit: query.limit,
        status: query.status,
        tokenId: query.tokenId,
      },
      headers: this.getHeader(),
    });
  },

  getTokenOrders(query) {
    return axios.get(`${baseUrl}/orders/token/${query.id}`, {
      params: {
        type: query.data && query.data.type,
        page: query.data && query.data.page,
        limit: query.data && query.data.limit,
        status: query.data && query.data.status,
      },
      headers: this.getHeader(),
    });
  },

  requestRefund(data) {
    return axios.post(`${baseUrl}/payments/refund`, data, {
      headers: this.getHeader(),
    });
  },

  verifyUser(data) {
    return axios.patch(`${userUrl}/verify`, data, {
      headers: this.getHeader(),
    });
  },

  createPin(data) {
    return axios.post(`${userUrl}/create-pin`, data, {
      headers: this.getHeader(),
    });
  },

  verifyPin(data) {
    return axios.post(`${userUrl}/verify-pin`, data, {
      headers: this.getHeader(),
    });
  },

  getUser() {
    return axios.get(`${userUrl}/me`, {
      headers: this.getHeader(),
    });
  },

  getWalletBalance() {
    return axios.get(`${baseUrl}/token/GUSD/balance`, {
      headers: this.getHeader(),
    });
  },
  getEquitySalesBalance() {
    return axios.get(`${baseUrl}/token/GUSD/sales-balance`, {
      headers: this.getHeader(),
    });
  },

  getInvestorTokens(query) {
    return axios.get(`${userUrl}/tokens-paginated`, {
      params: {
        page: query.page,
        limit: query.limit,
      },
      headers: this.getHeader(),
    });
  },

  getBankDetails() {
    return axios.get(`${baseUrl}/bank`, {
      headers: this.getHeader(),
    });
  },

  addBankManually(data) {
    return axios.post(`${baseUrl}/bank`, data, {
      headers: this.getHeader(),
    });
  },

  getExchangeRate(query) {
    return axios.get(`${baseUrl}/payments/fx-rate`, {
      params: {
        from: query.from,
        to: query.to,
      },
      headers: this.getHeader(),
    });
  },

  getWalletTransaction(query) {
    return axios.get(`${transactionUrl}/wallet`, {
      params: {
        page: query.page,
        type: query.type,
        limit: query.limit,
      },
      headers: this.getHeader(),
    });
  },

  createWithdrawalRequest(data) {
    return axios.post(`${baseUrl}/withdrawal-requests`, data, {
      headers: this.getHeader(),
    });
  },

  withdrawToTradeWallet(data) {
    return axios.post(`${baseUrl}/wallet/convert-cash`, data, {
      headers: this.getHeader(),
    });
  },

  // getTokensByProgress(progress, query) {
  //   // let url = null;
  //   // if (query) {
  //   const url = `${baseUrl}/tokens/${progress}?page=${query.page}&limit=${query.limit}`;
  //   // } else {
  //   // url = `${baseUrl}/tokens/${progress}`;
  //   // }
  //   return axios.get(url, {
  //     headers: this.getHeader(),
  //   });
  // },

  getCompaniesRaising(query) {
    return axios.get(`${baseUrl}/tokens/raising`, {
      params: {
        page: query.page,
        limit: query.limit,
      },
      headers: this.getHeader(),
    });
  },

  getCompaniesRaised(query) {
    return axios.get(`${baseUrl}/tokens/raised`, {
      params: {
        page: query.page,
        limit: query.limit,
      },
      headers: this.getHeader(),
    });
  },

  getPublicTokens() {
    return axios.get(`${baseUrl}/token/public`, {
      headers: this.getHeader(),
    });
  },
  getToken(id) {
    return axios.get(`${baseUrl}/token/${id}`, {
      headers: this.getHeader(),
    });
  },
  getTokenBalance(symbol) {
    return axios.get(`${baseUrl}/token/${symbol}/balance`, {
      headers: this.getHeader(),
    });
  },
  getAssetInfo(id) {
    return axios.get(`${baseUrl}/asset/${id}`, {
      headers: this.getHeader(),
    });
  },
  validatePin(data) {
    return axios.post(`${baseUrl}/user/login/pin`, data, {
      headers: this.getHeader(),
    });
  },
  tradeToken({ id, amount, type, price }) {
    return axios.post(
      `${baseUrl}/token/${id}/${type}`,
      {
        amount,
        price,
      },
      {
        headers: this.getHeader(),
      }
    );
  },
  fundWithProvider(data) {
    return axios.post(`${baseUrl}/payments/fund/${data.type}`, data.data, {
      headers: this.getHeader(),
    });
  },

  getGiftTokens(query) {
    return axios.get(`${baseUrl}/token-gifts`, {
      params: {
        type: query.type,
        status: query.status,
        page: query.page,
        limit: query.limit,
      },
      headers: this.getHeader(),
    });
  },

  sendGiftTokens(data) {
    return axios.post(`${tokenUrl}/${data.id}/gift`, data.data, {
      headers: this.getHeader(),
    });
  },

  updateUserInfo(user) {
    return axios.patch(`${userUrl}`, user, {
      headers: this.getHeader(),
    });
  },

  giftTokenAction(data) {
    return axios.post(
      `${baseUrl}/token-gift/${data.id}/${data.action}`,
      {},
      {
        headers: this.getHeader(),
      }
    );
  },

  sendToken(data) {
    return axios.patch(`${userUrl}/send-token`, data, {
      headers: this.getHeader(),
    });
  },
  searchUser(query) {
    return axios.get(`${userUrl}/search`, {
      params: {
        email: query.email,
        firstname: query.firstname,
        lastname: query.lastname,
        username: query.username,
      },
      headers: this.getHeader(),
    });
  },

  getDealRoomInfo(id) {
    return axios.get(`${organisationUrl}/auth/${id}`, {
      headers: this.getHeader(),
    });
  },

  getUserSubscription(id) {
    return axios.get(`${userUrl}/organisation/${id}/subscription`, {
      headers: this.getHeader(),
    });
  },

  sendPasswordLink(data) {
    return axios.post(`${userUrl}/initiate-password-reset`, data, {
      headers: this.getHeader(),
    });
  },

  resetPassword(data) {
    return axios.patch(`${baseUrl}/user/reset-pass`, data, {
      headers: this.getHeader(),
    });
  },

  removeBank(id) {
    return axios.delete(`${baseUrl}/bank/${id}`, {
      headers: this.getHeader(),
    });
  },

  resetPin(data) {
    return axios.post(`${userUrl}/reset-pin`, data, {
      headers: this.getHeader(),
    });
  },

  getCompanyUpdate(query) {
    return axios.get(`${baseUrl}/organisation-update/${query.id}`, {
      // params: {
      //   page: query.page,
      //   limit: query.limit,
      // },
      headers: this.getHeader(),
    });
  },

  getMinimumWithdrawal() {
    return axios.get(`${baseUrl}/payments/minimum-withdrawal`, {
      headers: this.getHeader(),
    });
  },

  getDealRoomSubscriptionStatus(id) {
    return axios.get(`${organisationUrl}/${id}/subscription-fee-status`, {
      headers: this.getHeader(),
    });
  },

  getSubscriptionPlans(id) {
    return axios.get(`${organisationUrl}/${id}/subscription-fees`, {
      headers: this.getHeader(),
    });
  },

  paySubscription({ duration, id }) {
    return axios.post(
      `${organisationUrl}/${id}/subscribe`,
      { duration },
      {
        headers: this.getHeader(),
      }
    );
  },

  renewSubscription({ duration, id }) {
    return axios.post(
      `${organisationUrl}/${id}/renew-subscription`,
      { duration },
      {
        headers: this.getHeader(),
      }
    );
  },

  acceptInvite(token) {
    return axios.post(`${organisationUrl}/auth/accept-invite`, token, {
      headers: this.getHeader(),
    });
  },

  acceptInviteWithLink(token) {
    return axios.post(`${baseUrl}/invite-link/use`, token, {
      headers: this.getHeader(),
    });
  },

  getUserEsop() {
    return axios.get(`${baseUrl}/employee-options`, {
      headers: this.getHeader(),
    });
  },

  getUserEsoRsu(query) {
    return axios.get(`${baseUrl}/employee-options`, {
      params: {
        employee_type: query,
      },
      headers: this.getHeader(),
    });
  },

  exerciseVestedShares({ id, amount }) {
    return axios.post(
      `${baseUrl}/employee/${id}/exercise`,
      { amount },
      {
        headers: this.getHeader(),
      }
    );
  },

  getEsopInviteInfo(token) {
    return axios.post(
      `${baseUrl}/employee-invitation`,
      { token },
      {
        headers: this.getHeader(),
      }
    );
  },
  acceptInvite(payload) {
    return axios.post(`${organisationUrl}/employee-invite/accept`, payload, {
      headers: this.getHeader(),
    });
  },

  generateVirtualAccount(payload) {
    return axios.post(`${baseUrl}/virtual-bank-accounts`, payload, {
      headers: this.getHeader(),
    });
  },

  getEntityCard() {
    return axios.get(`${baseUrl}/cards`, {
      headers: this.getHeader(),
    });
  },

  deleteCard(id) {
    return axios.delete(`${baseUrl}/cards/${id}`, {
      headers: this.getHeader(),
    });
  },

  getVirtualAccount(payload) {
    return axios.get(`${baseUrl}/virtual-bank-accounts`, {
      params: {
        currency: payload,
      },
      headers: this.getHeader(),
    });
  },

  getVirtualAccountFee() {
    return axios.get(`${baseUrl}/virtual-accounts/fee`, {
      headers: this.getHeader(),
    });
  },

  cancelOrder(id) {
    return axios.post(
      `${baseUrl}/order/cancel/${id}`,
      {},
      {
        headers: this.getHeader(),
      }
    );
  },

  getNotifications(query) {
    return axios.get(`${baseUrl}/notifications`, {
      params: {
        page: query.page,
        limit: query.limit,
      },
      headers: this.getHeader(),
    });
  },

  getUqudoToken() {
    return axios.get(`${baseUrl}/uqudo-verification-token`);
  },

  scan(payload) {
    return axios.post(`${baseUrl}/scan-document`, payload);
  },

  updateKyc(payload) {
    return axios.post(`${baseUrl}/kyc/uqudo-verify-kyc`, payload, {
      headers: this.getHeader(),
    });
  },

  deactivateAccount(id) {
    return axios.patch(
      `${userUrl}/${id}/deactivate`,
      {},
      { headers: this.getHeader() }
    );
  },

  reactivateAccount(payload) {
    return axios.post(`${userUrl}/reactivate`, payload, {
      headers: this.getHeader(),
    });
  },

  deleteAccount(payload) {
    return axios.post(`${baseUrl}/users`, payload, {
      headers: this.getHeader(),
    });
  },

  updateTerms(payload) {
    return axios.patch(`${userUrl}/terms`, payload, {
      headers: this.getHeader(),
    });
  },

  getEsopOrder(id) {
    return axios.get(
      `${baseUrl}/orders/token/${id}?esop=${true}&status=Active`,
      {
        headers: this.getHeader(),
      }
    );
  },

  buyEsop(data) {
    return axios.post(
      `${baseUrl}/token/${data.id}/buy`,
      { amount: data.amount, price: data.price },
      {
        headers: this.getHeader(),
      }
    );
  },

  sellEsop(data) {
    return axios.post(
      `${baseUrl}/token/${data.id}/sell`,
      { amount: data.amount, price: data.price },
      {
        headers: this.getHeader(),
      }
    );
  },
  getOrganizationDetails(id) {
    return axios.get(`${organisationUrl}/${id}`, {
      headers: this.getHeader(),
    });
  },
  getTotalUnreadNotifications() {
    return axios.get(`${baseUrl}/notifications/total-unread`, {
      headers: this.getHeader(),
    });
  },
  generateQrCode(type) {
    return axios.get(`${baseUrl}/2fa/generate-qr-code`, {
      params: { type },
      headers: this.getHeader(),
    });
  },
  upadteTwoFa(payload) {
    return axios.post(
      `${baseUrl}/2fa/${payload.type}`,
      { token: payload.token },
      {
        headers: this.getHeader(),
      }
    );
  },
  updateTour(payload) {
    return axios.post(`${userUrl}/skip-tour`, payload, {
      headers: this.getHeader(),
    });
  },
  getCarousel() {
    return axios.get(`${baseUrl}/carousels`, { headers: this.getHeader() });
  },
  getEmployeeInvites(query) {
    return axios.get(`${baseUrl}/employee-invites`, {
      params: {
        status: query.status,
      },
      headers: this.getHeader(),
    });
  },
  declineInvite(payload) {
    return axios.post(
      `${organisationUrl}/employee-invite/decline/${payload.id}`,
      payload.decline_reason,
      {
        headers: this.getHeader(),
      }
    );
  },
  getEmployeeInvitesById(token) {
    return axios.post(`${baseUrl}/employee-invitation`, token, {
      headers: this.getHeader(),
    });
  },
  getTokenByName(params) {
    return axios({
      url: `${tokenUrl}/search`,
      headers: this.getHeader(),
      params,
    });
  },
  getInvestorReport() {
    return axios.get(`${baseUrl}/user-report`, {
      headers: this.getHeader(),
    });
  },
  getWhyWeListed(tokenId) {
    return axios.get(`${baseUrl}/token/listing-reason/${tokenId}`, {
      headers: this.getHeader(),
    });
  },
  getThePeerWallets() {
    return axios({
      url: `${baseUrl}/wallet/thepeer/wallets`,
      headers: this.getHeader(),
      method: "GET",
    });
  },
};
