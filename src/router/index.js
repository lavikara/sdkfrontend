import { createRouter, createWebHistory } from "vue-router";
const DashboardView = () => import("@/views/DashboardView.vue");

const routes = [
  {
    path: "",
    name: "DashboardView",
    component: DashboardView,
    children: [
      {
        path: "",
        name: "DefaultOverview",
        redirect: { name: "OverviewDetails" },
      },
      {
        path: "paymentdetails",
        name: "OverviewDetails",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "@/layout/overview/OverviewDetails.vue"
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
