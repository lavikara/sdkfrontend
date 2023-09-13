<template>
  <div
    id="header-profile"
    class="tw-retlative tw-flex tw-items-center"
    v-if="investorDetails"
  >
    <p @click="showInvestorReport = true">
      <router-link
        class="tw-hidden lg:tw-block tw-text-primary tw-font-bold tw-cursor-pointer tw-mr-8"
        :to="{ name: 'InvestorReport' }"
      >
        GetEquity Investor Report
      </router-link>
    </p>
    <div class="tw-relative tw-flex">
      <router-link
        class="lg:tw-hidden tw-text-primary tw-font-bold tw-cursor-pointer tw-mr-8"
        :to="{ name: 'InvestorReport' }"
      >
        <img
          src="@/assets/img/investor-report.svg"
          class="tw-w-5 tw-h-5 tw-cursor-pointer"
          alt="investor report"
        />
      </router-link>
      <img
        src="@/assets/img/notification-bell.svg"
        class="tw-w-5 tw-h-5 tw-mr-10 tw-cursor-pointer"
        alt="notification"
        @click="openNotification"
      />
      <div
        class="notification-container tw-absolute tw--top-3 tw-left-2.5 tw-w-5 tw-h-5 tw-bg-error tw-text-white tw-cursor-pointer"
        @click="openNotification"
        v-if="notificationCount"
      >
        <span class="notification-count tw-absolute tw-text-sm">
          {{
            notificationCount
              ? notificationCount <= 20
                ? notificationCount
                : "20+"
              : 0
          }}
        </span>
      </div>
    </div>
    <NotificationModal
      v-if="showNotification"
      title="Notifications"
      :bgChange="true"
      @close="showNotification = !showNotification"
    >
      <template v-slot:content>
        <div v-if="showNotification" ref="notification">
          <div
            v-if="!loading"
            class="scrollbar tw-h-screen tw-overflow-y-scroll tw-pb-10 tw-px-8"
          >
            <div
              v-for="(group, index) in notifications"
              :key="'notification' + index"
            >
              <p class="tw-text-black-light tw-text-sm tw-mt-8 tw-mb-1">
                {{ formatToStringDate(group[0].createdAt) }}
              </p>
              <div
                class="tw-border tw-rounded tw-shadow tw-px-8 tw-py-4 tw-mb-4"
                :class="[
                  notification.type === 'Esop Invitation' ||
                  notification.type === 'Gift'
                    ? ' tw-cursor-pointer'
                    : '',
                ]"
                v-for="(notification, index) in group"
                :key="'notification' + index"
                @click="showInvitiation(notification)"
              >
                <div class="tw-w-full">
                  <div>
                    <div class="tw-flex tw-justify-between tw-items-center">
                      <h3 class="tw-text-sm tw-font-bold tw-mb-2">
                        {{ notification.type }}
                      </h3>
                      <div
                        v-if="
                          notification.raw?.owner_image ||
                          notification.raw?.token_image
                        "
                      >
                        <img
                          :src="
                            notification.raw?.owner_image
                              ? notification.raw?.owner_image
                              : notification.raw?.token_image
                          "
                          class="tw-w-10"
                          alt="notification icon"
                        />
                      </div>
                    </div>
                    <span
                      v-if="notification.read === false"
                      class="new-tag tw-rounded-xl tw-px-2 tw-py-1 tw-mr-2"
                      >New</span
                    ><span
                      class="tw-text-black-light tw-leading-6 tw-text-black tw-text-sm"
                    >
                      {{ notification.message }}
                    </span>
                  </div>
                </div>
                <div class="tw-text-sm tw-mt-2">
                  <div
                    v-if="
                      notification.type === 'Sell' ||
                      notification.type === 'Buy'
                    "
                    class="tw-flex tw-justify-between tw-items-center"
                  >
                    <div>
                      <img
                        src="@/assets/img/token-icon.svg"
                        class="tw-inline-block"
                        alt="show password icon"
                      />
                      <span class="tw-text-black-light tw-mx-1">
                        {{ notification.raw.amount.toLocaleString() }}
                      </span>
                      &#8226;
                      <span class="tw-text-black-light tw-ml-1">
                        {{
                          formatAmountToDollar(
                            notification.raw.price,
                            0,
                            "USD"
                          )
                        }}/{{ notification.raw.token_symbol }}
                      </span>
                    </div>
                    <div>
                      {{
                        formatAmountToDollar(
                          notification.raw.price * notification.raw.amount,
                          0,
                          "USD"
                        )
                      }}
                    </div>
                  </div>
                  <p
                    v-if="
                      notification.type === 'Esop Invitation' ||
                      notification.type === 'Invitation'
                    "
                  >
                    <span
                      v-if="notification.raw.status == 'Pending'"
                      class="tw-text-primary tw-underline tw-cursor-pointer"
                      >Review</span
                    >
                    <span
                      v-if="notification.raw.status === 'Accepted'"
                      class="tw-text-success"
                      >Accepted</span
                    >
                    <span
                      v-if="notification.raw.status === 'Terminated'"
                      class="tw-text-error"
                      >Terminated</span
                    >
                    <span
                      v-if="notification.raw.status === 'Rejected'"
                      class="tw-text-error"
                      >Rejected</span
                    >
                  </p>
                  <p class="tw-text-black-light tw-text-sm tw-mt-6">
                    {{ formatISOTime(notification.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
            <div ref="notificationBottom">
              <div v-if="loadingMore" class="tw-relative tw-h-20">
                <SmallLoader />
              </div>
            </div>
            <div
              v-if="!loadingMore && notifications.length !== 0"
              class="tw-text-lg tw-text-center tw-mt-8"
            >
              <p>End of notification</p>
            </div>
            <div
              v-if="notifications.length === 0"
              class="tw-text-center tw-mt-8"
            >
              <EmptyState>
                <template v-slot:message>
                  <p class="message tw-text-center tw-text-gray tw-my-3">
                    You have zero notifications.
                  </p>
                </template>
              </EmptyState>
            </div>
          </div>
          <div v-if="loading" class="tw-relative tw-h-80">
            <SmallLoader />
          </div>
        </div>
      </template>
    </NotificationModal>
    <div
      class="dropdown tw-relative tw-flex tw-flex-col tw-items-center tw-bg-gray-lightest tw-px-4 tw-py-2 tw-rounded tw-cursor-pointer"
    >
      <div class="tw-flex tw-items-center">
        <img
          v-if="investorDetails?.image"
          class="tw-h-8 tw-mr-2"
          :src="investorDetails?.image"
          alt="profile"
          loading="lazy"
        />
        <img
          v-if="!investorDetails.image"
          class="tw-h-8 tw-mr-2"
          src="https://res.cloudinary.com/djalafcj9/image/upload/v1634012152/getequityV2/header-profile-img_kjtkcq.webp"
          alt="profile"
          loading="lazy"
        />
        <div class="syndicate-name tw-mr-4">
          <h3 class="tw-text-sm tw-hidden md:tw-inline-block">
            {{ truncate(investorDetails?.fname, 12) }}
            {{ truncate(investorDetails?.lname, 12) }}
          </h3>
          <h3 class="tw-text-sm md:tw-hidden">
            {{ abbreviate(investorDetails?.fname) }}
            {{ abbreviate(investorDetails?.lname) }}
          </h3>
          <p class="tw-text-xs tw-text-gray-bg1">User</p>
        </div>
        <svg
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.00011 2.58602L6.47512 0.111023L7.18212 0.818023L4.00011 4.00002L0.818115 0.818023L1.52512 0.111023L4.00011 2.58602Z"
            fill="#8791A7"
          />
        </svg>
      </div>
      <div
        class="menu tw-absolute tw-hidden tw-rounded tw-top-12 tw-bg-gray-lightest tw-w-full tw-py-4"
      >
        <ul class="tw-px-4">
          <li
            class="list tw-cursor-pointer tw-rounded tw-px-4 tw-py-1"
            @click="logout"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  capitalizeEachWord,
  formatAmountToDollar,
  truncate,
  abbreviate,
  formatISOTime,
  formatToStringDate,
} from "@/utils/helpers.js";
import NotificationModal from "@/components/general/sidemodal/SideModal.vue";
import EmptyState from "@/components/notification/EmptyState.vue";
import { getItem } from "@/utils/storage";
export default {
  name: "HeaderProfile",

  components: { NotificationModal, EmptyState },

  data() {
    return {
      loading: false,
      loadingMore: false,
      reload: false,
      limit: 10,
      notifications: {},
      page: 1,
      pages: 0,
      syndicateName: "",
      showNotification: false,
    };
  },

  computed: {
    ...mapState({
      investorDetails: (state) => state.investorModule.investorDetails,
      notificationCount: (state) => state.investorModule.notificationCount,
    }),
  },

  created() {
    this.setDetails();
  },

  methods: {
    ...mapActions("investorModule", [
      "setInvestorProfile",
      "getNotifications",
      "getTotalUnreadNotifications",
    ]),
    ...mapActions(["logout", "showToast"]),

    capitalizeEachWord,
    formatAmountToDollar,
    truncate,
    abbreviate,
    formatToStringDate,
    formatISOTime,

    async setDetails() {
      const details = getItem("org_details");
      this.setInvestorProfile(details);
      this.getTotalUnreadNotifications();
    },

    showInvitiation(notification) {
      if (
        notification.raw?.status !== "Pending" &&
        notification?.type === "Esop Invitation"
      ) {
        return this.showToast({
          description: `This ESOP has been ${notification.raw.status}`,
          display: true,
          type: "info",
        });
      }
      if (notification.type === "Esop Invitation") {
        this.showNotification = false;
        this.reload = !this.reload;
        this.$router.push({
          name: "PendingEsop",
          params: { id: notification.raw?._id },
          query: {
            token: notification.raw?.token,
          },
        });
      }
      if (notification.type === "Gift") {
        this.showNotification = false;
        this.$router.push({ name: "GiftEquity" });
      }
    },

    openNotification() {
      this.page = 1;
      this.notifications = {};
      this.showNotification = true;
      this.loading = true;
      this.fetchNotifications();
    },

    async fetchNotifications() {
      const response = await this.getNotifications({
        page: this.page,
        limit: this.limit,
      });
      if (response) {
        let group = {};
        const { page, pages, notifications } = response.data.data;
        notifications.map((notification, index) => {
          let date = notification.createdAt.split("T")[0];
          let groupArray = notifications.filter(
            (noti) => date === noti.createdAt.split("T")[0]
          );
          group[date] = groupArray;
        });
        this.notifications = { ...this.notifications, ...group };
        this.page = page;
        this.pages = pages;
        setTimeout(() => {
          this.setObserver();
        }, 100);
      }
      if (this.loading) this.loading = false;
      if (this.loadingMore) this.loadingMore = false;
    },

    setObserver() {
      const options = {
        root: this.$refs.notification,
        rootMargin: "0px",
        threshold: 0.5,
      };
      const notificationBottom = this.$refs.notificationBottom;
      const observer = new IntersectionObserver(this.callback, options);
      observer.observe(notificationBottom);
    },

    callback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0 && this.page < this.pages) {
          this.loadingMore = true;
          this.page += 1;
          this.fetchNotifications();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#header-profile {
  .notification-container {
    border-radius: 50%;

    .notification-count {
      left: 50%;
      transform: translate(-50%, -0%);
    }
  }

  .scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .dropdown {
    .syndicate-name {
      @media screen and (min-width: 768px) {
        // min-width: 5rem;
      }
    }

    .menu {
      .list {
        transition: 0.3s ease all;

        &:hover {
          background-color: #375cb1;
          color: #ffffff;
        }
      }
    }

    &:hover .menu {
      display: block;
    }
  }
}
</style>
