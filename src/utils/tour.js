import store from "../store/index";

export default {
  nextStep(step, id) {
    const nextStep = document.getElementById(id);
    store.dispatch("updateStep", step, { root: true });
    if (step === 0) return;
    if (step === 11) return;
    if (!id) return;
    return nextStep.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  },
};
