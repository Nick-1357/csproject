<template>
  <div>
    <!-- Contents Tab - Contents -->
    <div id="bodyfix__content__content" class="bodyfix__content__content">
      <h5 v-if="missingElements.length == 0">No missing element</h5>
      <div
        v-else
        class="content__dropdown__group"
        v-for="(item, index) in missingElements"
        :key="'content_article' + index"
      >
        <div
          class="content__dropdown__title"
          type="button"
          v-b-toggle="'seo_content' + item.key + 'index' + index"
        >
          <div class="content__dropdown__title__left">
            <span class="title"> {{ item.key | nexrank }}</span>
            <!-- <span class="score score-low">0.00 (Low Score)</span> -->
            <span class="description word-wrap">{{ item.value }}</span>
          </div>
          <div class="content__dropdown__title__right">
            <!-- <span class="date">Date 2023</span> -->
            <button
              class="btn-primary ms-2 btn-arrow-icon"
              v-b-toggle="'seo_checklist_' + index"
            >
              <span class="arrow-icon material-icons-outlined text-white">
                expand_more
              </span>
            </button>

            <!-- <span class="arrow-icon material-icons-outlined ms-3 p-0">expand_more</span> -->
          </div>
        </div>

        <b-collapse :id="'seo_content' + item.key + 'index' + index">
          <div class="content__dropdown__content">
            <!--for p elements-->

            <div
              id="content__aisuggestions__suggestions"
              v-if="item.key == 'p'"
            >
              <div
                v-for="(normal, index_normal) in item.suggestions"
                :key="'suggestions' + index_normal"
              >
                <div class="d-flex align-items-center m-2">
                  <copy-to-clipboard :text="normal.paragraph " @copy="handleCopy">
                    <button class="material-icons-outlined">copy</button>
                    <span class="desc"
                      >{{ normal.paragraph }}
                      <span
                        v-if="index_normal == 0"
                        v-b-tooltip.hover.top="{ variant: 'primary' }"
                        title="The AI ranked these options according to what it considers to be the best choice"
                        class="pill-badge blue text-center mx-2"
                        >Best Choice</span
                      ></span
                    >
                  </copy-to-clipboard>
                </div>
              </div>
            </div>

            <!--for other elements-->

            <div
              id="content__aisuggestions__suggestions"
              v-if="item.key != 'p'"
            >
              <div
                v-for="(normal, index_normal) in item.suggestions"
                :key="'suggestions' + index_normal"
              >
                <div class="d-flex align-items-center mx-2 my-3">
                  <copy-to-clipboard :text="normal" @copy="handleCopy">
                    <button class="material-icons-outlined">copy</button>
                    <span class="desc"
                      >{{ normal
                      }}<span
                        v-if="index_normal == 0"
                        v-b-tooltip.hover.top="{ variant: 'primary' }"
                        title="The AI ranked these options according to what it considers to be the best choice"
                        class="pill-badge blue text-center mx-2"
                        >Best Choice</span
                      ></span
                    >
                  </copy-to-clipboard>
                </div>
              </div>
            </div>

            <!-- <button class="btn btn-primary mt-3">Update</button> -->
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import CopyToClipboard from "vue-copy-to-clipboard";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-vue/v3";
export default {
  name: "ContentTab",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  components: {
    GrammarlyEditorPlugin,
    Grammarly,
    CopyToClipboard
  },
  data() {
    return {
      content_article: [],
      missingElements: [],
      user_seo_checklist: [],
      step_1_content: [],
    };
  },
  methods: {
    assignSuggestion(content) {
      content.forEach((para, index) => {
        if (para.key == "title") {
          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );
          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metatitle);
          });

          para.suggestions = sugTitle;
          //  para.suggestions_score= sugScore
          // console.log("sugScore title", para);
        } else if (para.key == "description") {
          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );
          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metadescription);
          });

          para.suggestions = sugTitle;
        } else if (para.key == "h1") {
          const h1 = this.values.find((element) => element.slug === "h1");

          para.suggestions = JSON.parse(h1.data);
        } else if (para.key == "h2") {
          const h2 = this.values.find((element) => element.slug === "h2");

          para.suggestions = JSON.parse(h2.data);
        } else if (para.key == "h3") {
          const h3 = this.values.find((element) => element.slug === "h3");

          para.suggestions = JSON.parse(h3.data);
        } else if (para.key == "p") {
          const foundp = this.values.find(
            (element) => element.slug === "paragraphs"
          );

          this.initialSuggestion = JSON.parse(foundp.data);

          para.suggestions = this.initialSuggestion;

          //   this.user_data_optimized_p.forEach((element, ele_index) => {
          //     if (ele_index == index) {
          //       para.customized_suggestion = element.p;
          //     }
          //   });
        }

        //  this.content_to_calc_score[index].value=original
        //    this.content_article[index].value=original
      });

      return content;
    },
    handleCopy() {
      this.$toast.success("Copied");
      // this.$bvToast.toast("Copied", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    },

    addMissingElement(datas) {
      ////
      var findTitle = false;
      var findDesc = false;
      var findh1 = false;
      var findh2 = false;
      var findh3 = false;
      var findparagraph = false;

      datas.forEach((data) => {
        if (data.key == "title") {
          findTitle = true;
        } else if (data.key == "description") {
          findDesc = true;
        } else if (data.key == "h1") {
          findh1 = true;
        } else if (data.key == "h2") {
          findh2 = true;
        } else if (data.key == "h3") {
          findh3 = true;
        } else if (data.key == "p") {
          findparagraph = true;
        }
      });

      if (findTitle == false) {
        this.missingElements.push({ key: "title", value2: "" });
      }
      if (findDesc == false) {
        this.missingElements.push({ key: "description", value2: "" });
      }
      if (findh1 == false) {
        this.missingElements.push({ key: "h1", value2: "" });
      }
      if (findh2 == false) {
        this.missingElements.push({ key: "h2", value2: "" });
      }
      if (findh3 == false) {
        this.missingElements.push({ key: "h3", value2: "" });
      }
      if (findparagraph == false) {
        this.missingElements.push({ key: "p", value2: "" });
      }

      console.log(this.missingElements);

      this.missingElements = this.assignSuggestion(this.missingElements);
    },
  },
  created() {
    this.values = this.content.steps_data.step_1;

    const user_seo_checklist_result = this.values.find(
      (element) => element.slug === "user_seo_checklist"
    );

    if (user_seo_checklist_result != undefined) {
      this.user_seo_checklist = JSON.parse(user_seo_checklist_result.data);

      for (const [key, value] of Object.entries(this.user_seo_checklist)) {
        if (key == "user_data_optimized_p") {
          this.user_data_optimized_p = value;
        }
      }
    }

    const foundContent = this.values.find(
      (element) => element.slug === "content_data"
    );

    var contentVal = JSON.parse(foundContent.data);

    for (const [key, value] of Object.entries(contentVal.article)) {
      for (const [key2, value2] of Object.entries(value).reverse()) {
        if (key2 == "p") {
          this.step_1_content.push({
            key: key2,

            value: value2,
          });
        } else {
          this.step_1_content.push({
            key: key2,

            value: value2,
          });
        }
      }
    }

    if (this.content.step.current_step == 1) {
      this.content_article = this.step_1_content;
    } else {
      var liList = [];
      JSON.parse(this.content.steps_data.step_2[0].data).forEach((element) => {
        for (const [key, value] of Object.entries(element)) {
          if (key != "li") {
            if (liList.length != 0) {
              this.content_article.push({ key: "li", value: liList });
            }
            liList = [];

            if (key == "p") {
              this.content_article.push({
                key: key,

                value: value,
              });
            } else {
              this.content_article.push({
                key: key,

                value: value,
              });
            }
          } else {
            liList.push(value);
          }
        }
      });
      if (liList.length != 0) {
        this.content_article.push({ key: "li", value: liList });
      }
    }

    console.log(this.content_article);

    this.addMissingElement(this.content_article);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* Bodyfix section - Contents */
.bodyfix__content {
  margin-top: 1rem;
}

/* ----- 1.content dropdown css - start */
.bodyfix__content__content .content__dropdown__group {
  border: 1px solid #2c8de0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}
.bodyfix__content__content .content__dropdown__group:last-child {
  margin-bottom: 0rem;
}
.content__dropdown__title {
  display: flex;
  padding: 1.5rem 1.5rem;
  transition: all 0.4s ease-out;
  user-select: none;
  border-radius: 10px;
}
.content__dropdown__group .content__dropdown__title.collapsed:hover,
.content__dropdown__group .content__dropdown__title.not-collapsed:hover {
  background-color: #f5f5f7;
}
.content__dropdown__title__left {
  display: flex;
  align-items: center;
  margin-right: auto;
}
.content__dropdown__title__left .title {
  margin-right: 1rem;
  color: #183b1c;
  font-size: 20px;
  min-width: 220px;
  font-weight: 600;
  user-select: none;
}
.content__dropdown__title__left .score {
  margin-right: 2rem;
  border: 1px solid black;
  padding: 0.1rem 0.5rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}
.content__dropdown__title__left .score.score-low {
  border-color: #e23c39;
  color: #e23c39;
}
.content__dropdown__title__left .score.score-avg {
  border-color: #5791d0;
  color: #5791d0;
}
.content__dropdown__title__left .score.score-high {
  border-color: #4dae50;
  color: #4dae50;
}
.content__dropdown__title__left .description {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.content__dropdown__title__right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.content__dropdown__title__right .date {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.content__dropdown__title[aria-expanded="false"]
  .content__dropdown__title__right
  .arrow-icon {
  transform: rotate(0deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.content__dropdown__title[aria-expanded="true"]
  .content__dropdown__title__right
  .arrow-icon {
  transform: rotate(180deg);
  transition: 0.3s ease-out;
  color: #2c8de0;
}
.content__dropdown__content {
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #2c8de0;
}
.grey__card-outlined {
  border: 1px solid #8b8b8b;
  padding: 1rem 1rem;
  border-radius: 10px;
  color: black;
}

/* ai suggestion tabs */
.aisuggestion__tab__title {
  padding: 0.5rem;
  color: #2c8de0;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.4s ease-out;
}
.aisuggestion__tab {
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  transition: 0.2s ease-out;
  border-radius: 20px;
  border: 1px solid #2c8de0;
  background-color: #f4faff;
}
.aisuggestion__tab:hover {
  background-color: #dcefff;
  transition: 0.4s ease-out;
}
.aisuggestion__tab.active {
  background-color: #2c8de0;
  transition: all 0.4s ease-out;
}
.aisuggestion__tab.active .aisuggestion__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
.suggestion {
  margin-bottom: 1.2rem;
  display: flex;
  align-items: start;
}
.suggestion .form-check-input {
  position: absolute;
  margin-right: 0.5rem;
  margin-top: 0.3rem;
}
.tag__score {
  background-color: #4dae50;
  border-radius: 6px;
  padding: 0.1rem 0.8rem 0.1rem 0.5rem;
  color: white;
  font-weight: 500;
  margin-bottom: -0.2rem;
  margin-right: 1rem;
  margin-left: 0.2rem;
  white-space: nowrap;
  user-select: none;
}
.desc {
  font-size: 16px;
  color: #555555;
  font-weight: 500;
}
.word-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2rem;
  max-width: 800px;
}
@media screen and (max-width: 1600px) {
  .word-wrap {
    max-width: 600px;
  }
}
@media screen and (max-width: 1382px) {
  .word-wrap {
    max-width: 400px;
  }
}
.user-select-none {
  user-select: none;
}
label {
  cursor: pointer !important;
}
/* ----- 1. content dropdown css - end */

.pill-badge {
  border-radius: 20px;
  border: none;
  background-color: #e8e8e8;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
}
.pill-badge.red {
  background-color: #fce1de;
  color: #f54337;
  text-transform: lowercase;
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
  text-transform: lowercase;
}
.pill-badge.green {
  text-transform: lowercase;
  background-color: #e2f2e3;
  color: #4dae50;
}

.pill-badge.blue {
  text-transform: lowercase;
  background-color: #d1e2f1;
  color: #2c8de0;
}

.pill-badge:first-letter {
  text-transform: uppercase;
}
.btn-arrow-icon {
  border-radius: 50% !important;
}
.material-icons-outlined {
  color: #8b8b8b;
}
</style>
