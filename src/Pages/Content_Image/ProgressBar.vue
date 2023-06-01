<template>
  <div>
    <div class="card__inputbody" v-if="showProgress">
      <div class="row">
        <div class="col text-center">
          <h4>{{ duration.toFixed(2) }}</h4>
        </div>
      </div>
      <!-- :percent="duration.toFixed(2)" -->
      <div class="row mt-3 d-flex justify-content-center">
        <div class="col text-center">
          <k-progress
            :showText="false"
            activeColor="#AA22E9"
            :border="true"
            :lineHeight="20"
            :cutWidth="100"
            color="rgb(33, 186, 233)"
            bgColor="#ddd"
            type="line"
            active
            :percent="duration.toFixed(2)"
            style="padding-right: 0 !important"
          >
          </k-progress>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col text-center">
          <p>Kindly wait, your Content is being generated...</p>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- <blog-first v-if="first_step"> </blog-first>
        <blog-last v-else> </blog-last> -->

      <select-content v-if="first_step" />
      <create v-else />
    </div>
  </div>
</template>



<script>
/* eslint-disable */
import create from "./Review_content.vue";
import selectContent from "./Select_contents.vue";
import AiContentGenerator from "@/store/AiContentGenerator.js";
export default {
  components: {
    create,
    selectContent,
  },
  data() {
    return {
      content: [],
      case_keyword: this.$route.params.case,
      first_step: true,
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
      showProgress: true,
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    blog_interval() {
      this.interval = setInterval(() => {
        AiContentGenerator.fetchContentCampaign({
          id: this.$route.params.id,
        }).then((response) => {
          if (
            response.data.data.status == "Pending step 2" ||
            response.data.data.status == "Collecting Data"
          ) {
            this.duration = response.data.data.completePercentage;
          } else if (
            response.data.data.status == "Complete the second step" &&
            response.data.data.last_step == "finishing to generate subtopics"
          ) {
            this.duration = response.data.data.completePercentage;
          } else if (
            response.data.data.status == "Complete the second step" &&
            response.data.data.last_step == "finish content generating"
          ) {
            this.duration = 100;
            this.showProgress = false;
            clearInterval(this.interval);
            this.first_step = false;
            if (this.$route.params.project) {
              this.$router.push({
                name: "content_image_add_fields",
                params: {
                  step: "review_create",
                  id: this.$route.params.id,
                  project: this.$route.params.project,
                },
              });
            } else {
              this.$router.push({
                name: "content_image_add_fields",
                params: { step: "review_create", id: this.$route.params.id },
              });
            }
          } else if (
            response.data.data.status == "Done step 1" &&
            response.data.data.completePercentage >= 20
          ) {
            this.duration = 100;
            this.showProgress = false;
            clearInterval(this.interval);
            this.first_step = true;

            if (this.$route.params.project) {
              this.$router.push({
                name: "content_image_add_fields",
                params: {
                  step: "select_content",
                  id: this.$route.params.id,
                  project: this.$route.params.project,
                },
              });
            } else {
              this.$router.push({
                name: "content_image_add_fields",
                params: { step: "select_content", id: this.$route.params.id },
              });
            }
          } else if (
            response.data.data.status == "Done step 1" &&
            response.data.data.completePercentage < 20
          ) {
            this.duration = response.data.data.completePercentage;
          } else if (
            response.data.data.status == "Complete the second step" &&
            response.data.data.completePercentage < 100
          ) {
            this.duration = response.data.data.completePercentage;
          }
        });
      }, 10000);
    },
    blog_interval_express() {
      this.interval = setInterval(() => {
        AiContentGenerator.fetchContentCampaign({
          id: this.$route.params.id,
        }).then((response) => {
          if (
            response.data.data.status == "Pending step 2" ||
            response.data.data.status == "Collecting Data"
          ) {
            this.duration = response.data.data.completePercentage;
          } else if (
            response.data.data.status == "Complete the second step" &&
            response.data.data.last_step == "finishing to generate subtopics"
          ) {
            this.duration = response.data.data.completePercentage;
          } else if (
            response.data.data.status == "Complete the second step" &&
            response.data.data.last_step == "finish content generating"
          ) {
            this.duration = 100;
            this.showProgress = false;
            clearInterval(this.interval);
            this.first_step = false;
            if (this.$route.params.project) {
              this.$router.push({
                name: "content_image_add_fields",
                params: {
                  step: "review_create",
                  id: this.$route.params.id,
                  project: this.$route.params.project,
                },
              });
            } else {
              this.$router.push({
                name: "content_image_add_fields",
                params: { step: "review_create", id: this.$route.params.id },
              });
            }

            location.reload();
          } else if (response.data.data.status == "Done step 1") {
            this.duration = response.data.data.completePercentage;
          } else if (
            response.data.data.status == "Complete the second step" &&
            response.data.data.completePercentage < 100
          ) {
            this.duration = response.data.data.completePercentage;
          }
        });
      }, 10000);
    },
    blog_interval_new() {
      this.interval = setInterval(() => {
        AiContentGenerator.fetchContentCampaign({
          id: this.$route.params.id,
        }).then((response) => {
          if (response.data.data.completePercentage < 100) {
            this.duration = response.data.data.completePercentage;
          } else {
            if (response.data.data.status == "Done step 1") {
              this.duration = 100;
              this.showProgress = false;
              this.first_step = true;
              clearInterval(this.interval);
              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "select_content",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "select_content", id: this.$route.params.id },
                });
              }
            } else {
              this.duration = 100;
              this.first_step = false;
              this.showProgress = false;
              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "review_create",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "review_create", id: this.$route.params.id },
                });
              }

              clearInterval(this.interval);
              location.reload();
            }
          }
        });
      }, 10000);
    },
  },

  created() {
    AiContentGenerator.fetchContentCampaign({
      id: this.$route.params.id,
    }).then((response) => {
      this.content = response.data.data;

      if (this.content.campaign_type != "blog_writer") {
        if (
          response.data.data.completePercentage < 100 ||
          response.data.data.texts.length == 0
        ) {
          if (response.data.data.completePercentage >= 100) {
            this.duration = 90;
          } else {
            this.duration = response.data.data.completePercentage;
          }

          this.interval = setInterval(() => {
            AiContentGenerator.fetchContentCampaign({
              id: this.$route.params.id,
            }).then((response) => {
              if (
                response.data.data.completePercentage >= 100 &&
                response.data.data.texts.length != 0
              ) {
                this.duration = 100;
                clearInterval(this.interval);
                this.showProgress = false;
                this.first_step = false;

                if (this.$route.params.project) {
                  this.$router.push({
                    name: "content_image_add_fields",
                    params: {
                      step: "review_create",
                      id: this.$route.params.id,
                      project: this.$route.params.project,
                    },
                  });
                } else {
                  this.$router.push({
                    name: "content_image_add_fields",
                    params: {
                      step: "review_create",
                      id: this.$route.params.id,
                    },
                  });
                }

                location.reload();
              } else {
                if (response.data.data.completePercentage >= 100) {
                  this.duration = 90;
                } else {
                  this.duration = response.data.data.completePercentage;
                }
              }
            });
          }, 10000);
        } else {
          clearInterval(this.interval);
          this.duration = 100;
          this.first_step = false;
          this.showProgress = false;
          if (this.$route.params.project) {
            this.$router.push({
              name: "content_image_add_fields",
              params: {
                step: "review_create",
                id: this.$route.params.id,
                project: this.$route.params.project,
              },
            });
          } else {
            this.$router.push({
              name: "content_image_add_fields",
              params: { step: "review_create", id: this.$route.params.id },
            });
          }
        }
      } else {
        if (response.data.data.count == 66) {
          if (response.data.data.completePercentage < 100) {
            this.duration = response.data.data.completePercentage;
            this.blog_interval_new();
          } else {
            if (response.data.data.status == "Done step 1") {
              clearInterval(this.interval);
              this.showProgress = false;
              this.duration = 100;
              this.first_step = true;
              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "select_content",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "select_content", id: this.$route.params.id },
                });
              }
            } else {
              clearInterval(this.interval);
              this.duration = 100;
              this.first_step = false;
              this.showProgress = false;
              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "review_create",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "review_create", id: this.$route.params.id },
                });
              }
            }
          }
        } else {
          if (response.data.data.product_type == "express") {
            if (
              response.data.data.status == "Pending step 2" ||
              response.data.data.status == "Collecting Data"
            ) {
              this.duration = response.data.data.completePercentage;
              this.blog_interval_express();
            } else if (
              response.data.data.status == "Complete the second step" &&
              response.data.data.last_step == "finishing to generate subtopics"
            ) {
              this.duration = response.data.data.completePercentage;
              this.blog_interval_express();
            } else if (
              response.data.data.status == "Complete the second step" &&
              response.data.data.last_step == "finish content generating"
            ) {
              clearInterval(this.interval);
              this.duration = 100;
            this.showProgress=false
              this.first_step = false;

              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "review_create",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "review_create", id: this.$route.params.id },
                });
              }
            } else if (response.data.data.status == "Done step 1") {
              this.duration = response.data.data.completePercentage;
              this.blog_interval_express();
            } else if (
              response.data.data.status == "Complete the second step" &&
              response.data.data.completePercentage < 100
            ) {
              this.duration = response.data.data.completePercentage;
              blog_interval_express();
            }
          } else {
            if (
              response.data.data.status == "Pending step 2" ||
              response.data.data.status == "Collecting Data"
            ) {
              this.duration = response.data.data.completePercentage;
              this.blog_interval();
            } else if (
              response.data.data.status == "Complete the second step" &&
              response.data.data.last_step == "finishing to generate subtopics"
            ) {
              this.duration = response.data.data.completePercentage;
              this.blog_interval();
            } else if (
              response.data.data.status == "Complete the second step" &&
              response.data.data.last_step == "finish content generating"
            ) {
              clearInterval(this.interval);
              this.duration = 100;
              this.showProgress = false;
              this.first_step = false;
              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "review_create",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "review_create", id: this.$route.params.id },
                });
              }
            } else if (
              response.data.data.status == "Done step 1" &&
              response.data.data.completePercentage >= 20
            ) {
              this.duration = 100;
              clearInterval(this.interval);
              this.first_step = true;
              this.showProgress = false;
              if (this.$route.params.project) {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "select_content",
                    id: this.$route.params.id,
                    project: this.$route.params.project,
                  },
                });
              } else {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: { step: "select_content", id: this.$route.params.id },
                });
              }
            } else if (
              response.data.data.status == "Done step 1" &&
              response.data.data.completePercentage < 20
            ) {
              this.duration = response.data.data.completePercentage;
              this.blog_interval();
            } else if (
              response.data.data.status == "Complete the second step" &&
              response.data.data.completePercentage < 100
            ) {
              this.duration = response.data.data.completePercentage;
              this.blog_interval();
            }
          }
        }
      }
    });
  },
  mounted() {},
};
</script>

<style >
.card__inputbody {
  margin: 0 auto;
  padding: 3rem 0rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
}
.k-progress-outer {
  padding-right: 0 !important;
}
</style>
