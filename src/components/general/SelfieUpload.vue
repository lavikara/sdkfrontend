<template>
  <form
    id="onboarding-selfie-upload"
    class="tw-w-full tw-p-8"
    @submit.prevent=""
  >
    <div class="tw-pt-4">
      <canvas ref="canvas" class="tw-hidden"></canvas>
    </div>
    <img :src="selfiePicture" v-if="selfiePicture" class="tw-pt-4" />
    <video
      autoplay
      ref="video"
      playsinline
      class="tw-mt-4"
      :class="[selfiePicture ? 'tw-hidden' : '']"
    ></video>
    <p class="tw-text-sm tw-text-gray tw-text-center tw-mt-2">
      Please ensure that you're in a well lit room.
    </p>
    <div class="tw-mt-6 justify-between">
      <OnboardingBtn
        v-if="!selfiePicture"
        title="Take picture"
        @click="takePicture"
      />
      <OnboardingBtn
        v-if="selfiePicture"
        :loading="loading"
        title="Upload Selfie"
        @click="uploadSelfie"
      />
      <p
        v-if="selfiePicture"
        class="retake-btn tw-text-gray tw-text-center tw-font-semibold tw-cursor-pointer tw-mt-8"
        @click="retakeSelfie"
      >
        Re-take selfie
      </p>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import OnboardingBtn from "@/components/general/BtnComponent.vue";
import responseHandler from "@/utils/responseHandler.js";
import api from "@/utils/api.js";

export default {
  name: "OnboardingSelfiepload",

  emits: ["fileUpload", "uploadFail"],

  components: { OnboardingBtn },

  data() {
    return {
      selfiePicture: null,
      selfie: {
        url: null,
        isPicture: false,
        fileName: "",
      },
      //   fileMessage: null,
      streamStarted: false,
      constraints: {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
        },
      },
    };
  },
  mounted() {
    this.lunchCamera();
  },

  beforeUnmount() {
    this.stopCamera();
  },

  computed: {
    ...mapState({
      loading: (state) => state.loadingModule.selfieLoading,
    }),
  },

  methods: {
    ...mapActions("loadingModule", ["selfieLoading"]),
    ...mapActions(["showToast"]),

    async uploadSelfie() {
      this.selfieLoading(true);
      const cloudName = process.env.VUE_APP_CLOUDINARY_NAME;
      const CLOUDINARY_URL = `https://api.Cloudinary.com/v1_1/${cloudName}/image/upload`;
      const PRESET = process.env.VUE_APP_CLOUDINARY_UPLOAD_SECOND_PRESET;
      const formData = new FormData();
      formData.append("file", this.selfiePicture);
      formData.append("upload_preset", PRESET);
      try {
        const instance = axios.create();
        const upload = await instance.post(`${CLOUDINARY_URL}`, formData);
        const { data } = upload;
        const selfieUrl = {
          url: data.secure_url,
        };
        const response = await api.updateSelfie(selfieUrl);
        const message = response.data.message;
        this.showToast({
          description: message,
          display: true,
          type: "success",
        });
        this.$emit("fileUpload");
        this.selfieLoading(false);
      } catch (error) {
        this.$emit("uploadFail");
        responseHandler.handleError(error);
        this.selfieLoading(false);
      }
    },

    retakeSelfie() {
      this.selfiePicture = null;
      this.lunchCamera();
    },

    takePicture() {
      const { canvas, video } = this.$refs;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      this.selfiePicture = canvas.toDataURL("image/webp");
      this.stopCamera();
    },

    async startStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          this.constraints
        );
        this.handleStream(stream);
      } catch (error) {
        alert(error);
      }
    },

    handleStream(stream) {
      const video = this.$refs.video;
      video.srcObject = stream;
    },

    lunchCamera() {
      this.selfiePicture = null;
      if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        this.startStream();
        this.streamStarted = true;
      }
    },

    stopCamera() {
      const video = this.$refs.video;
      const mediaStream = video?.srcObject;
      if (video && mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#onboarding-selfie-upload {
  .retake-btn {
    max-width: 7rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
