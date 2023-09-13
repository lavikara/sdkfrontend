<template>
  <transition name="modal">
    <div
      class="modal tw-flex tw-items-baseline tw-justify-center"
      v-if="show"
      @click.self="$emit('close-modal')"
    >
      <div
        class="modal-content__div tw-relative tw-px-6 tw-py-6 tw-pb-12 tw-bg-white"
      >
        <span
          class="modal-content__button tw-ml-auto tw-block tw-w-5 tw-h-5 tw-cursor-pointer"
          @click="$emit('close-modal')"
        >
          <img src="@/assets/img/close-dark.svg" alt="close icon" class="" />
        </span>

        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Modal",
    emits: ["close-modal"],
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    width: 100vw;
    min-width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(26, 33, 57, 0.7);
    transition: all 0.3s ease;
    /* overflow-y: scroll; */
    &-content {
      &__div {
        box-shadow: 0px 2px 4px rgba(44, 73, 137, 0.06);
        border-radius: 8px;
        margin-top: 120px;
      }
      &__button {
        /* position: absolute;
        right: 24px;
        top: 24px; */
      }
    }
  }

  .overview__modal {
    .modal-content__div {
      width: calc(100% - 30px);
      max-width: 474px;
      height: calc(100vh - 50px);
      max-height: 710px;
      overflow-y: scroll;
      margin-top: 50px;
    }
  }

  .refund__modal {
    @media (min-width: 768px) {
      justify-content: flex-end;
    }
    .modal-content {
      &__div {
        width: calc(100% - 30px);
        max-width: 474px;
        padding: 0;
        padding-bottom: 30px;
        @media (min-width: 768px) {
          height: 100vh;
          border-radius: 0;
          margin-top: 0;
        }
      }
      &__button {
        position: absolute;
        top: -50px;
        right: 0;
        background: #f0f4fd;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (min-width: 768px) {
          left: -40px;
          top: 20px;
          margin-left: 0;
        }
      }
    }
  }

  .acknowledge__modal {
    .modal-content__div {
      width: calc(100% - 30px);
      max-width: 474px;
      height: calc(100vh - 50px);
      max-height: 710px;
      overflow-y: scroll;
      margin-top: 30px;
    }
  }

  .confirmation__modal {
    .modal-content {
      &__div {
        width: calc(100% - 30px);
        margin-top: 30px;
        max-width: 390px;
        @media (min-width: 768px) {
          margin-top: 50px;
        }
      }
      &__button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #f0f4fd;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (min-width: 768px) {
          right: -40px;
          top: 0;
          margin-left: 0;
        }
      }
    }
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal,
  .modal-leave-active .modal {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
