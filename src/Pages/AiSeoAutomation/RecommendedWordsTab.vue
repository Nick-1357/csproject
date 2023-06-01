<template>
  <div>
    <b-modal id="modal-center-view-competitors" size="lg" centered hide-footer hide-header>
      <h5>All Competitors</h5>
      <h6 class="mt-4 mb-0">Your Score</h6>
      <div class="yourscore__table">
        <div class="row yourscore__thead g-0">
          <div class="col-6">
            <span>Website</span>
            <button class="material-icons-outlined btn-orderby">arrow_upward</button>
          </div>
          <div class="col-6">
            <span>Score</span>
            <button class="material-icons-outlined btn-orderby">arrow_upward</button>
          </div>
        </div>

        <div class="row yourscore__tbody g-0">
          <div class="col-6">
            <span class="mb-0">Your Website Count</span>
          </div>
          <div class="col-6 pt-1">
            <div class="d-flex align-items-center">
              <div class="seochecklist_healthbar progress w-100">
                <!--if word count is same as suggested avg-->
                <div
                  v-if="chosen_modal.count == chosen_modal.avg"
                  class="progress-bar bg-sucess"
                  role="progressbar"
                  :style="{
                    width: +((chosen_modal.count / chosen_modal.highest) * 100) + '%',
                  }"
                  aria-valuenow="10"
                  aria-valuemin=""
                  aria-valuemax="100"
                ></div>

                <!--else-->
                <div
                  v-else
                  class="progress-bar bg-danger"
                  role="progressbar"
                  :style="{
                    width: +((chosen_modal.count / chosen_modal.highest) * 100) + '%',
                  }"
                  aria-valuenow="10"
                  aria-valuemin=""
                  aria-valuemax="100"
                ></div>
              </div>
              <span class="ps-3 pe-2" style="min-width: 50px">{{ chosen_modal.count }}</span>
            </div>
          </div>
        </div>
        <div class="row yourscore__tbody g-0">
          <div class="col">
            <span class="mb-0">Average Count</span>
          </div>
          <div class="col-6 pt-1">
            <div class="d-flex align-items-center">
              <div class="seochecklist_healthbar progress w-100">
                <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  :style="{
                    width: +((chosen_modal.avg / chosen_modal.highest) * 100) + '%',
                  }"
                  aria-valuenow="40"
                  aria-valuemin=""
                  aria-valuemax="100"
                ></div>
              </div>
              <span class="ps-3 pe-2" style="min-width: 50px">{{ chosen_modal.avg }}</span>
            </div>
          </div>
        </div>
      </div>

      <h6 class="mt-4 mb-0">Top 10 Competitors</h6>
      <div class="yourscore__table">
        <div class="row yourscore__thead g-0">
          <div class="col-1">
            <span>Rank</span>
            <button class="material-icons-outlined btn-orderby">arrow_upward</button>
          </div>
          <div class="col-5">
            <span class="ps-3">Website</span>
            <button class="material-icons-outlined btn-orderby">arrow_upward</button>
          </div>
          <div class="col-6">
            <span>Score</span>
            <button class="material-icons-outlined btn-orderby">arrow_upward</button>
          </div>
        </div>

        <div class="row yourscore__tbody g-0" v-for="(website, index) in chosen_modal.websites" :key="'chosen_modal' + index">
          <div class="col-1 ps-2">
            <span class="mb-0">{{ index + 1 }}</span>
          </div>
          <div class="col-5 ps-3">
            <span class="mb-0">{{ website.key }}</span>
          </div>
          <div class="col-6 pt-1">
            <div class="d-flex align-items-center">
              <div class="progress w-100">
                <div
                  class="progress-bar bg-primary"
                  role="progressbar"
                  :style="{
                    width: +((website.value / chosen_modal.highest) * 100) + '%',
                  }"
                  aria-valuenow="50"
                  aria-valuemin=""
                  aria-valuemax="100"
                ></div>
              </div>
              <span class="ps-3 pe-2" style="min-width: 50px">{{ website.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <div id="bodyfix__content__recommendedwords" class="bodyfix__content__recommendedwords">
      <div class="recommendedwords__table">
        <div class="row recommendedwords__thead g-0">
          <div class="col-3">
            <span>Words</span>
            <button class="material-icons-outlined btn-orderby">arrow_upward</button>
          </div>
          <div class="col-1"></div>
          <div class="col"></div>
          <div class="col-2"></div>
        </div>

        <div class="row recommendedwords__tbody g-0" v-for="(word, index) in words" :key="'words' + index">
          <div class="col-3 d-flex align-items-center">
            <span class="ms-2 recommendedwords__words">{{ word.words }}</span>
          </div>
          <div class="col-1 d-flex justify-content-center">
            <button
              @click.once="addKeywordPool(word.words)"
              v-b-tooltip.hover.top="{ variant: 'primary' }"
              title="Add to Keyword Pool"
              class="btn btn-primary-outlined m-auto d-flex align-items-center"
              style="height: 38px"
            >
              <span class="material-icons-outlined my-2"> add </span>
            </button>
          </div>
          <div class="col d-flex align-items-center">
            <!-- Pin Bar Graph -->
            <div class="pin__bar__graph">
              <!-- calc({{max}}/{{min}}*100 - 7px) -->

              <!--if word count is same as suggested avg-->
              <div
                class="pin blue"
                v-if="word.count == word.avg"
                :style="{
                  left: 'calc(' + (word.count / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <div class="pin__head" v-b-tooltip.hover.top.v-primary="{ variant: 'info' }" :title="'Your Count:' + word.count"></div>
                <div class="pin__tail"></div>
              </div>

              <!--else-->

              <div
                class="pin red"
                v-else
                :style="{
                  left: 'calc(' + (word.count / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <div class="pin__head" v-b-tooltip.hover.top.v-danger="{ variant: 'danger' }" :title="'Your Count:' + word.count"></div>
                <div class="pin__tail"></div>
              </div>

              <div
                class="pin yellow"
                :style="{
                  left: 'calc(' + (word.avg / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <div class="pin__head" v-b-tooltip.hover.top.v-warning="{ variant: 'warning' }" :title="'Market Average:' + word.avg"></div>
                <div class="pin__tail"></div>
              </div>

              <div
                class="pin grey"
                :style="{
                  left: 'calc(' + (word.websites[0].value / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <div class="pin__head" v-b-tooltip.hover.top="{ variant: 'dark' }" :title="'Competitor :' + word.websites[0].key + ': ' + word.websites[0].value"></div>
                <div class="pin__tail"></div>
              </div>

              <div
                class="pin grey"
                :style="{
                  left: 'calc(' + (word.websites[1].value / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <div class="pin__head" v-b-tooltip.hover.top="{ variant: 'dark' }" :title="'Competitor :' + word.websites[1].key + ': ' + word.websites[1].value"></div>
                <div class="pin__tail"></div>
              </div>

              <div
                class="pin grey"
                :style="{
                  left: 'calc(' + (word.websites[2].value / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <div class="pin__head" v-b-tooltip.hover.top="{ variant: 'dark' }" :title="'Competitor :' + word.websites[2].key + ': ' + word.websites[2].value"></div>
                <div class="pin__tail"></div>
              </div>

              <div class="progress">
                <!--if word count is same as suggested avg-->

                <div
                  v-if="word.count == word.avg"
                  div
                  class="progress-bar bg-sucess"
                  role="progressbar"
                  :style="{ width: +((word.count / word.highest) * 100) + '%' }"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>

                <!--else-->

                <div
                  v-else
                  div
                  class="progress-bar bg-danger"
                  role="progressbar"
                  :style="{ width: +((word.count / word.highest) * 100) + '%' }"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div class="value min">
                <span></span>
              </div>

              <div
                class="value blue"
                :style="{
                  left: 'calc(' + (word.count / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <span>{{ word.count }}</span>
              </div>

              <div
                class="value red"
                :style="{
                  left: 'calc(' + (word.avg / word.highest) * 100 + '% - 7px) !important',
                }"
              >
                <span>{{ word.avg }}</span>
              </div>

              <div class="value max">
                <span></span>
              </div>
            </div>
          </div>

          <div class="col-2 d-flex justify-content-end align-items-center">
            <button class="btn btn-primary-outlined ms-2" style="height: 38px; overflow: hidden" @click="viewCompetitors(index)" v-b-modal.modal-center-view-competitors>View all Competitors</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
export default {
  name: "Recommended_words_tab",
  props: {
    content: {
      type: Object,
      required: true,
    },
       content_type: {
      type: String,
    },
  },
  data() {
    return {
      words: [],
      recommend: [],
      chosen_modal: "",
    };
  },
  methods: {
    viewCompetitors(data) {
      this.chosen_modal = this.words[data];
      this.$bvModal.show("modal-center-view-competitors");
    },
    addKeywordPool(data) {
      Auth.addKeywordsPool(data)
        .then((res) => {
          this.$toast.success(res.data.message);

          // this.$bvToast.toast(res.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          var list_keyword = [];

          // for (var count = 1; count < 5; count++) {
          //   Auth.keywordsPool(count)
          //     .then((response) => {
          //       response.data.data.data.forEach((element) => {
          //         list_keyword.push(element);
          //       });
          //       localStorage.setItem("keyword_pool", JSON.stringify(list_keyword));
          //     })
          //     .catch((error) => {});
          // }
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },
  },
  created() {
    this.values = this.content.steps_data.step_1;

    const foundHigh = this.values.find((element) => element.slug === "words_data");

    this.words = JSON.parse(foundHigh.data);

    const foundRecommend = this.values.find((element) => element.slug === "words_recommend");

    this.recommend = JSON.parse(foundRecommend.data);

    this.words.forEach((element, index) => {
      this.recommend.forEach((recommend, index_recommend) => {
        if (element.words == recommend.words) {
          element.avg = recommend.avg;
          element.websites = [];
          for (const [key, value] of Object.entries(recommend)) {
            if (key != "avg" && key != "words") {
              element.websites.push({ key: key, value: value });
            }
          }
        }
      });
    });

    this.words.forEach((element, index) => {
      var max = Math.max.apply(
        Math,
        element.websites.map(function (o) {
          return JSON.parse(o.value);
        })
      );

      if (element.count > max) {
        max = element.count;
      }

      element.highest = max;
    });

    console.log(this.words);
     console.log(this.recommend);
  },
};
</script>
<style scoped>
/* ----- 3. recommended words css - start */
.modal-dialog-centered {
  width: 700px !important;
}
.yourscore__thead {
  font-weight: bold;
  padding-bottom: 0.5rem;
  color: #404040;
  padding: 0.5rem;
}
.yourscore__thead .material-icons-outlined {
  color: #2c8de0;
  margin-left: 0.1rem;
  padding: 0;
}
.yourscore__thead .col-1,
.yourscore__thead .col-5,
.yourscore__thead .col-6 {
  display: flex;
  align-items: center;
}
.yourscore__thead {
  border-bottom: 2px solid #2c8de0;
}
.yourscore__tbody {
  border-left: 1px solid rgb(187, 187, 187);
  border-right: 1px solid rgb(187, 187, 187);
  border-bottom: 1px solid rgb(187, 187, 187);
  padding: 0.5rem;
  /* padding-bottom: 0.2rem; */
}

/*  */
.recommendedwords__table {
  margin-top: 1.5rem;
}
.recommendedwords__thead {
  font-weight: bold;
  padding-bottom: 0.8rem;
  color: #404040;
}
.recommendedwords__thead .col,
.recommendedwords__thead .col-2,
.recommendedwords__thead .col-3 {
  display: flex;
  align-items: center;
}
.recommendedwords__thead {
  border-bottom: 2px solid #2c8de0;
  margin-bottom: 0.5rem;
}
.recommendedwords__tbody {
  border-bottom: 1px solid rgb(187, 187, 187);
  padding: 0.8rem 0rem;
}
.recommendedwords__thead .material-icons-outlined {
  color: #2c8de0;
  margin-left: 0.2rem;
}
.recommendedwords__words {
  font-size: 20px;
  font-weight: 500;
  color: #183b1c;
}
.bg-success {
  background-color: #5fb355 !important;
}

.bg-primary {
  background-color: #2c8de0 !important;
}
/* pin graph */
.pin__bar__graph {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  position: relative;
  width: 100%;
}
.pin {
  display: grid;
  place-items: center;
  position: absolute;
  top: 0px;
}

.pin__head {
  width: 13px;
  height: 13px;
  border-radius: 50%;
}
.pin__tail {
  background-color: #727273;
  width: 1px;
  height: 28px;
  border-radius: 50%;
  z-index: 0;
}
.pin.grey {
  top: 20px;
}
.pin.grey .pin__tail {
  height: 8px;
}
.pin.yellow {
  top: 10px;
}
.pin.yellow .pin__tail {
  height: 13px;
}
.pin.grey .pin__head {
  background-color: #6f6f6f;
}
.pin.blue .pin__head {
  background-color: #5fb355;
}
.pin.yellow .pin__head {
  background-color: #f0ad4e;
}

.pin.red .pin__head {
  background-color: #f44336;
}

.pin__bar__graph .progress {
  width: 100%;
  height: 10px;
  position: absolute;
  z-index: 1;
  outline: 1px solid #979797;
}
.pin__bar__graph .value {
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 5px;
}
.pin__bar__graph .value.min {
  left: 0% !important;
}
.pin__bar__graph .value.max {
  right: 0% !important;
}
/* ----- recommended words css - end */
</style>
