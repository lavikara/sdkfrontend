import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("@/views/HomeView.vue");

const routes = [
  {
    path: "",
    name: "HomeView",
    component: HomeView,
    children: [
      {
        path: "",
        name: "DefaultPaymentDetails",
        redirect: { name: "PaymentDetails" },
      },
      {
        path: "paymentdetails/:id",
        name: "PaymentDetails",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "@/layout/home/PaymentDetails.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ el: "#app", top: -10 });
      }, 500);
    });
  },
});

export default router;
