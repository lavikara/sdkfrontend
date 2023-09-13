<template>
  <div
    class="md:tw-flex md:tw-justify-start tw-flex-wrap tw-w-full md:tw-items-center tw-mb-10"
    :class="{ 'image-wrapper--active': dropActive }"
    @drop.prevent="saveFile('drop', $event)"
    @dragenter="dropActive = true"
    @dragleave="dropActive = false"
    @dragover.prevent
  >
    <div
      class="tw-w-full tw-px-4 tw-py-8 image-wrapper tw-mx-auto tw-flex tw-justify-center tw-flex-wrap tw-items-center tw-mx-auto md:tw-mx-0"
    >
      <label
        v-if="
          (image && isPicture) ||
          (currentValue && !currentValue.includes('pdf'))
        "
        for="image"
      >
        <img
          v-if="image || (currentValue && !currentValue.includes('pdf'))"
          :src="image || currentValue"
          class="picture tw-h-20"
        />
      </label>
      <label v-else-if="currentValue && currentValue.includes('pdf')" for="pdf">
        <a :href="currentValue" class="tw-h-20 tw-underline" target="_blank"
          >Preview File</a
        >
      </label>
      <p class="tw-text-xs" v-else-if="image && pdfName">{{ pdfName }}</p>
      <slot> </slot>
      <p
        class="tw-text-center tw-font-semibold tw-text-sm tw-text-primary tw-w-full"
        v-if="image.length === 0"
      >
        OR
      </p>
      <div class="tw-w-full tw-mt-2">
        <label
          class="tw-text-sm tw-font-semibold tw-text-primary tw-cursor-pointer buttonn tw-flex tw-justify-center tw-text-center tw-mx-auto tw-block"
        >
          <img
            class="tw-mr-1"
            src="https://res.cloudinary.com/djalafcj9/image/upload/v1650367504/getequityV2/investor/upload_qhhnly.svg"
            alt="upload icon"
          />{{ image.length === 0 ? "Click to upload" : "Click to Change" }}
          <input
            type="file"
            name=""
            class="tw-hidden tw-text-tertiary tw-w-20"
            title="upload"
            id="file"
            ref="tokenImage"
            :accept="accept"
            @change="previewImage"
          />
        </label>
      </div>
      <p class="tw-text-black-light tw-text-xs tw-mt-2">Maximum size: 5MB</p>
    </div>
    <p class="tw-text-red tw-text-center tw-w-full tw-mt-3" v-if="fileMessage">
      {{ fileMessage }}
    </p>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapActions } from "vuex";
  import responseHandler from "@/utils/responseHandler.js";

  export default {
    name: "DragNDrop",
    data() {
      return {
        isPicture: false,
        pdfName: "",
        fileMessage: "",
        dropActive: false,
        image: "",
      };
    },
    emits: ["file-added", "upload-complete", "reupload", "uploadError"],
    props: {
      name: {
        type: String,
        default: "",
      },
      accept: {
        type: String,
        required: true,
      },
      startUpload: {
        type: Boolean,
        required: true,
      },
      currentValue: {
        type: String,
        required: false,
      },
    },
    watch: {
      image: function (val) {
        if (this.name.length > 0) {
          return this.$emit("file-added", { file: val, name: this.name });
        }

        this.$emit("file-added", val);
      },
      currentValue(val) {
        if (val !== this.image) {
          this.image = val;
        }
      },
      startUpload: "uploadImage",
    },
    methods: {
      ...mapActions("fileUploadsModule", ["setStatus", "setLoading"]),
      saveFile(type, e) {
        let file = null;
        if (type === "drop") {
          this.dropActive = false;
          this.error = false;
          file = e.dataTransfer.files;
          if (file && this.accept.includes(file[0].type)) {
            this.previewImage(file, "dragNdrop");
            return (this.file = file);
          }
          return (this.error = true);
        } else {
          file = e.target.files;
          this.file = file;
          this.$emit("file-added", file);
        }
      },
      previewImage: function (event, type) {
        // Reference to the DOM input element
        const input = event.target || event;
        const check = type === "dragNdrop" ? event : input.files;
        if (check.length > 0) {
          const size = check[0].size;
          const file = Math.round(size / 1024);
          const fileType = check[0].type;

          if (fileType.includes("image")) {
            this.isPicture = true;
          } else {
            this.pdfName = check[0].name;
            this.isPicture = false;
          }
          // Ensure that you have a file before attempting to read it
          if (check && check[0]) {
            if (file > 5120) {
              this.fileMessage =
                "File size too large, Please select another file.";
              this.image = "";
            } else {
              this.fileMessage = "";
              var fileReader = new FileReader();
              fileReader.onload = (e) => {
                this.image = e.target.result;
              };
              fileReader.readAsDataURL(check[0]);
            }
          }
        }
      },
      uploadImage: function (val) {
        if (val) {
          if (this.image.includes("cloudinary")) {
            this.$emit("upload-complete", this.image);
          } else {
            this.setStatus(true);
            const cloudName = process.env.VUE_APP_CLOUDINARY_NAME;
            const CLOUDINARY_URL = `https://api.Cloudinary.com/v1_1/${cloudName}/image/upload`;
            const PRESET = process.env.VUE_APP_CLOUDINARY_UPLOAD_SECOND_PRESET;
            const formData = new FormData();
            formData.append("file", this.image);
            formData.append("upload_preset", PRESET);
            this.setLoading(true);
            var instance = axios.create();
            // eslint-disable-next-line dot-notation
            delete instance.defaults.headers.common["Authorization"];
            instance
              .post(`${CLOUDINARY_URL}`, formData)
              .then((response) => {
                this.setStatus(false);
                this.image = response.data.secure_url;
                this.$emit("upload-complete", response.data.secure_url);
                this.$emit("reupload", true);
              })
              .catch((err) => {
                this.setStatus(false);
                this.$emit("reupload", true);
                this.$emit("uploadError");
                responseHandler.handleError(err);
              });
          }
        } else if (!this.image.includes("cloudinary")) {
          this.isPicture = false;
          this.pdfName = "";
          this.fileMessage = "";
          this.image = "";
          this.$emit("reupload", true);
        }
      },
      openFilePicker() {
        const tokenImagePicker = this.$refs.tokenImage;
        tokenImagePicker.click();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .picture {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
  }

  @keyframes vibrate {
    from {
      transform: translateX(-5px);
    }
    to {
      transform: translateX(5px);
    }
  }

  .image-wrapper {
    border: 2px solid #dde1e9;
    box-sizing: border-box;
    border-radius: 4px;
    max-width: 640px;
    width: 100%;
    background: #fff;
    &--active {
      background-color: rgba(150, 150, 150, 0.1);
      animation: vibrate 100ms ease-in-out -1s infinite alternate-reverse none;
    }
  }

  .text {
    &--grey {
      color: #a3a8b3;
    }
  }

  .button {
    color: #4d84ff;
    box-shadow: 0px 10px 15px rgba(30, 38, 109, 0.1);
    border-radius: 4px;
    width: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
  }

  .label-light {
    color: #707070;
  }
  .label-dark {
    color: #f1f2f8;
  }

  .upload-spv__dragdrop .image-wrapper {
    max-width: 100%;
  }
</style>
