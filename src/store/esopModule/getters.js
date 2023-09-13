export const esops = (state) =>
  state.esops?.sort(function (a, b) {
    var c = new Date(a.createdAt);
    var d = new Date(b.createdAt);
    return d - c;
  });
export const pages = (state) => state.pageInfo.pages;
export const page = (state) => state.pageInfo.page;
export const total = (state) => state.pageInfo.total;
export const esopOrder = (state) => state.esopOrder;
export const inviteInfo = (state) => state.inviteInfo;
export const esopToken = (state) => state.esopToken;
