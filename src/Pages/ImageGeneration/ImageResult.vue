<template>
  <div>
    <!-- Image Generator -->

    <div class="nexcard details__card row m-5 p-3">
      <div class="col-3">
        <h6 class="details__title">Keyword</h6>
        <span>{{ content.keyword | capitalize }}</span>
      </div>
      <div class="col-3">
        <h6 class="details__title">Topic</h6>
        <span>{{ content.title | capitalize }}</span>
      </div>

      <div class="col-3">
        <h6 class="details__title">Size</h6>
        <span>
          {{ content.img_option.value }}
        </span>
      </div>
      <div class="col-3">
        <h6 class="details__title">style</h6>
        <span>{{ content.style.value }}</span>
      </div>
    </div>

    <div class="row" v-if="duration < 100">
      <!--#attention if image is already generated but loading-->

      <div class="row">
        <div class="col text-center">
          <h4>{{ duration }}</h4>
        </div>
      </div>

      <div class="col">
        <k-progress :showText="false" activeColor="#AA22E9" :border="true" :lineHeight="20" :cutWidth="100" color="rgb(33, 186, 233)" bgColor="#ddd" type="line" active :percent="duration">
        </k-progress>

        <div class="row mt-3">
          <div class="col text-center">
            <p>Kindly wait, your Result is being generated...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row m-5" v-else>
      <!--#attention if image is already generated after loading-->
      <div class="col-6 d-flex flex-column" v-for="(img, index) in initialImg" :key="'initialImg' + index">
        <div class="card">
          <img class="card-img-top" :src="`data:image/png;base64,${img.data}`" alt="" />
        </div>

        <button @click="downloadImg(img.data, content.keyword)" class="btn btn-primary mx-auto my-4 d-flex align-items-center">
          <span class="material-icons-outlined me-1"> file_download </span>Download Image
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import ImageGenerator from "@/store/ImageGenerator.js";
export default {
  components: {},
  data() {
    return {
      content: [],
      initialImg: [],
      keywordTimeout: null,

      animateSpeed: 1000,
      diameter: 300,
      strokeWidth: 10,
      innerStrokeWidth: 10,
      strokeLinecap: "round",
      startColor: "#2d8fe2",
      stopColor: "#0863c4",
      innerStrokeColor: "#c5e6f0",
      timingFunc: "linear",
      isClockwise: true,
      duration: 0,
      completeDuration: 100,
      interval: null,
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    downloadImg(data, name) {
      var a = document.createElement("a"); //Create <a>
      a.href = "data:image/png;base64," + data; //Image Base64
      a.download = name; //File name Here
      a.click(); //Downloaded file
    },
    loadResult() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      ImageGenerator.fetchArtCampaign({
        id: this.$route.params.id,
      }).then((response) => {
        this.content = response.data.data;
        loader.hide();

        this.initialImg = response.data.data.values;
      });
    },
  },

  created() {
    ImageGenerator.fetchArtCampaign({
      id: this.$route.params.id,
    }).then((response) => {
      this.content = response.data.data;

      if (response.data.data.complete_percentage < 100) {
        this.duration = response.data.data.complete_percentage;

        this.interval = setInterval(() => {
          ImageGenerator.fetchArtCampaign({
            id: this.$route.params.id,
          }).then((response) => {
            if (response.data.data.complete_percentage >= 100) {
              this.duration = response.data.data.complete_percentage;
              clearInterval(this.interval);
              this.loadResult();
            } else {
              this.duration = response.data.data.complete_percentage;
            }
          });
        }, 10000);
      } else {
        this.duration = 100;
        this.loadResult();
      }
    });
  },
};
</script>

<style scoped></style>
