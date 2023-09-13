import store from "../store/index";
let message = null;
export default {
  handleError(error) {
    if (error && error.response && error.response.status === 500) {
      return store.dispatch(
        "showToast",
        {
          description: "An error occurred, please contact support",
          display: true,
          type: "error",
        },
        { root: true }
      );
    }
    if (error.message === "Network Error") {
      message = "Connection not established, please";
    } else if (
      error.message === "Ensure to select documents for all!" ||
      error.external
    ) {
      message = error.message;
    } else if (error.message === "Request failed with status code 401") {
      store.dispatch("logout");
      message = error.response.data && error.response.data.message;
    } else if (error.message === "timeout of 0ms exceeded") {
      message = error.message;
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
    ) {
      message = error.response.data.error.message;
    } else {
      if (error.code === "UNAUTHORIZED") {
        message = "Please Sign in to continue";
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message ===
          "Your account is inactive, contact support."
      ) {
        store.dispatch("logout");
      } else if (error.response.data && error.response.data.message) {
        message = error.response.data && error.response.data.message;
      }
    }
    store.dispatch(
      "showToast",
      {
        description: message,
        display: true,
        type: "error",
      },
      { root: true }
    );
  },
};
