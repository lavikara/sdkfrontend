export const SET_INVESTOR_PROFILE = (state, payload) => {
    state.investorDetails = payload;
};

export const SET_PIN = (state, payload) => {
    state.pin = payload;
};

export const STORE_PASSWORD = (state, payload) => {
    state.password = payload;
};

export const SET_CURRENCY = (state, payload) => {
    state.currency = payload;
};

export const SET_FUND_METHOD = (state, payload) => {
    state.fundMethod = payload;
};

export const SET_WITHDRAW_METHOD = (state, payload) => {
    state.withdrawMethod = payload;
};

export const SET_VIRTUAL_ACCOUNT = (state, payload) => {
    state.virtualAccount = payload;
};

export const SET_INVESTOR_TRANSACTIONS = (state, payload) => {
    state.transactions = payload;
};

export const SET_PAGE = (state, payload) => {
    state.transactionPage = payload;
};

export const SET_PAGES = (state, payload) => {
    state.transactionPages = payload;
};

export const SET_TOTAL_TRANSACTION = (state, payload) => {
    state.totalTransactions = payload;
};

export const SET_TOTAL_TOKENS = (state, payload) => {
    state.totalTokens = payload;
};

export const SET_EXCHANGE_RATE = (state, payload) => {
    state.exchangeRate = payload;
};

export const SET_BANK_DETAILS = (state, payload) => {
    state.bankDetails = payload;
};

export const SET_TRADING_WALLET = (state, payload) => {
    state.tradingWalletBalance = payload;
};

export const SET_WALLET_TRANSACTION = (state, payload) => {
    state.walletTransactions = payload;
};

export const SET_WALLET_TRANSACTION_PAGE = (state, payload) => {
    state.walletTransactionPage = payload;
};

export const SET_WALLET_TRANSACTION_PAGES = (state, payload) => {
    state.walletTransactionPages = payload;
};

export const SET_CASH_WALLET = (state, payload) => {
    state.cashWalletBalance = payload;
};

export const SET_AVAILABLE_BALANCE = (state, payload) => {
    state.availableBalance = payload;
};

export const SET_NOTIFICATION_COUNT = (state, payload) => {
    state.notificationCount = payload;
};

export const SET_SEARCH_RESULT = (state, payload) => {
    state.searchResult = payload;
};

export const SET_MEMBERSHIP_STATUS = (state, payload) => {
    state.membershipStatus = payload;
};

export const SET_MINIMUM_WITHDRAWAL = (state, payload) => {
    state.minimumWithdrawal = payload;
};

export const SET_ORDER_BOOK = (state, payload) => {
    state.orderBook = payload;
};

export const SET_TOTAL_ORDERS = (state, payload) => {
    state.totalOrder = payload;
};

export const SET_ORDER_PAGE = (state, payload) => {
    state.orderPage = payload;
};

export const SET_ORDER_PAGES = (state, payload) => {
    state.orderPages = payload;
};

export const SET_ENTITY_CARD = (state, payload) => {
    state.entityCard = payload;
};

export const SET_CARD_DETAILS = (state, payload) => {
    state.cardDetails = payload;
};

export const SET_CODE = (state, payload) => {
    state.code = payload;
};

export const SET_CODE_TYPE = (state, payload) => {
    state.codeType = payload;
};

export const SET_INVESTOR_REPORT = (state, payload) => {
    state.investorReport = payload;
};
export const SET_THEPEER_WALLETS = (state, wallets) => {
    state.thePeerWallets = wallets;
};