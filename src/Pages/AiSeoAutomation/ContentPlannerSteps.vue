<template>
  <div>
    <div class="content-image">
      <!-- Route Pathway Links http://localhost:8080/ai_seo_automation/planner/steps/6/chooseSubtopics/609/3-->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button @click="stepBack()" class="material-icons-outlined btn-back">arrow_back</button>

          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.project },
            }"
            class="route__link"
            >Project</router-link
          >
          <router-link
            :to="{
              name: 'ai_seo_automation_campaign_planner',
            }"
            class="route__link"
            >/ Content planner
          </router-link>

          / Generate Content
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="stepBack()" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'ai_seo_automation' },
            }"
            class="route__link"
          >
            View All
          </router-link>
          <router-link
            :to="{
              name: 'ai_seo_automation_campaign_recommended',
            }"
            class="route__link"
            >/ Content planner
          </router-link>

          / Generate Content
        </p>
      </div>

      <div class="nexcard">
        <h3 class="modal-card__title text-center mb-5 pt-3">{{ keyword.cluster }}</h3>

        <div class="step__row">
          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'chooseTitle'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Title & Description</span>
          </div>
          <hr />

          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step2-inactive.svg" v-if="this.$route.params.step == 'chooseTitle'" />
            <img src="@/assets/input-step-icons/icon-step2-active.svg" v-else-if="this.$route.params.step == 'chooseH1'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Header 1</span>
          </div>

          <hr />

          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step3-inactive.svg" v-if="this.$route.params.step == 'chooseTitle' || this.$route.params.step == 'chooseH1'" />
            <img src="@/assets/input-step-icons/icon-step3-active.svg" v-else-if="this.$route.params.step == 'chooseSubtopics'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Subtopics</span>
          </div>

          <hr />

          <div class="step__col">
            <img
              src="@/assets/input-step-icons/icon-step4-inactive.svg"
              v-if="this.$route.params.step == 'chooseTitle' || this.$route.params.step == 'chooseSubtopics' || this.$route.params.step == 'chooseH1'"
            />
            <img src="@/assets/input-step-icons/icon-step4-active.svg" v-else-if="this.$route.params.step == 'chooseFaq'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Question list</span>
          </div>

          <hr />

          <div class="step__col">
            <img
              src="@/assets/input-step-icons/icon-step5-inactive.svg"
              v-if="
                this.$route.params.step == 'chooseTitle' ||
                this.$route.params.step == 'chooseFaq' ||
                this.$route.params.step == 'chooseH1' ||
                this.$route.params.step == 'chooseSubtopics'
              "
            />
            <img src="@/assets/input-step-icons/icon-step5-active.svg" v-else-if="this.$route.params.step == 'finalContent'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Review</span>
          </div>
        </div>

        <div v-if="this.$route.params.step == 'chooseTitle'">
          <div v-if="loading" class="d-flex justify-content-center mt-4">
            <b-spinner variant="primary" label="Large Spinner"></b-spinner>
          </div>

          <div v-if="!loading" class="selectcontent">
            <!-- AI Suggestions Section - Tabs-->

            <div class="row">
              <div class="col">
                <div class="d-flex align-items-center">
                  <span class="fw-600 mb-1">Choose your Meta Title</span>
                </div>

                <!-- Suggestions Tab -->

                <div class="selectcontent__content">
                  <div class="selectcontent__checkbox" v-for="(normal, index_normal) in title.suggestions_edit" :key="'topic' + index_normal">
                    <input type="radio" :id="normal.title" :value="normal.title" v-model="title.value" />
                    <label v-if="normal.editor == false" :for="normal.title">{{ normal.title }}</label>

                    <b-form-textarea class="form-control" v-else type="text" id="content" v-model="normal.title" rows="2" max-rows="6"></b-form-textarea>
                    <button class="material-icons-outlined btn-edit" @click="changetoEditorTitle(index_normal)">edit</button>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="d-flex align-items-center">
                  <span class="fw-600 mb-1">Choose your Meta Description</span>
                </div>

                <!-- Suggestions Tab -->

                <div class="selectcontent__content">
                  <div class="selectcontent__checkbox" v-for="(normal, index_normal) in description.suggestions_edit" :key="'description' + index_normal">
                    <input type="radio" :id="normal.description" :value="normal.description" v-model="description.value" />
                    <label v-if="normal.editor == false" :for="normal.description">{{ normal.description }}</label>

                    <b-form-textarea class="form-control" v-else type="text" id="content" v-model="normal.description" rows="2" max-rows="6"></b-form-textarea>
                    <button class="material-icons-outlined btn-edit" @click="changetoEditorDescription(index_normal)">edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!loading" class="d-flex mt-4 mb-0">
            <div class="ms-auto"></div>
            <button class="btn btn-primary-outlined ms-auto" @click="back()">Back</button>
            <button class="btn btn-primary ms-2" @click="nextStep()">Next</button>
          </div>
        </div>

        <faq v-if="this.$route.params.step == 'chooseFaq'" />
        <head1 v-if="this.$route.params.step == 'chooseH1'" />
        <sub-faq v-if="this.$route.params.step == 'chooseSubtopics'" />
        <final v-if="this.$route.params.step == 'finalContent'" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Automation from "@/store/Automation.js";
import Faq from "./chooseFaq.vue";
import head1 from "./chooseH1.vue";
import subFaq from "./chooseSubtopics.vue";
import final from "./FinalOutput.vue";
export default {
  name: "BlogWriting",
  components: {
    Faq,
    subFaq,
    final,
    head1,
  },
  data() {
    return {
      keyword_value: ["Keyword_1", "Keyword_2"],
      values: [],
      keyword: [],
      keyword_cluster: [],
      FAQ: [],
      title: [],
      description: [],
      h1: [],
      meta_data: [],
      planners: [],
      all_faq: [],
      title: [],
      description: [],
      title_sug: [],
      description_sug: [],
      loading: true,
    };
  },
  computed: {},
  methods: {
    stepBack() {
      if (this.$route.params.step == "chooseTitle") {
        this.$router.push({
          name: "ai_seo_automation_campaign_recommended",
        });
      } else if (this.$route.params.step == "chooseH1") {
        this.$router.push({
          name: "ai_seo_automation_campaign_planner_steps",
          params: {
            step: "chooseTitle",
          },
        });
      } else if (this.$route.params.step == "chooseSubtopics") {
        this.$router.push({
          name: "ai_seo_automation_campaign_planner_steps",
          params: {
            step: "chooseH1",
          },
        });
      } else if (this.$route.params.step == "chooseFaq") {
        this.$router.push({
          name: "ai_seo_automation_campaign_planner_steps",
          params: {
            step: "chooseSubtopics",
          },
        });
      } else if (this.$route.params.step == "finalContent") {
        this.$router.push({
          name: "ai_seo_automation_campaign_planner_steps",
          params: {
            step: "chooseFaq",
          },
        });
      }
    },
    changetoEditorTitle(index) {
      var arr = this.title.suggestions_edit[index];

      if (arr.editor == false) {
        arr.editor = true;
      } else {
        arr.editor = false;
      }

      this.title.suggestions_edit[index].splice(index, 1, arr);

      //
    },
    changetoEditorDescription(index) {
      var arr = this.description.suggestions_edit[index];

      if (arr.editor == false) {
        arr.editor = true;
      } else {
        arr.editor = false;
      }

      this.description.suggestions_edit[index].splice(index, 1, arr);

      //
    },

    back() {
      this.$router.push({
        name: "ai_seo_automation_campaign_recommended",
      });
    },
    nextStep() {
      // console.log(this.title.value);
      // console.log(this.description.value);

      if (localStorage.content_planner_final_content == undefined || localStorage.content_planner_final_content == "undefined") {
        var obj = {
          title: this.title.value,
          description: this.description.value,
          header1: [],
          subtopics: [],
          question_list: [],
        };

        localStorage.setItem("content_planner_final_content", JSON.stringify(obj));
      } else {
        var arr = JSON.parse(localStorage.content_planner_final_content);

        (arr.title = this.title.value), (arr.description = this.description.value), localStorage.setItem("content_planner_final_content", JSON.stringify(arr));
      }

      this.$router.push({
        name: "ai_seo_automation_campaign_planner_steps",
        params: { step: "chooseH1" },
      });
    },
  },
  destroyed() {
    // localStorage.removeItem("content_gen_value");
  },
  created() {
    Automation.fetchSeoAutomation({
      id: this.$route.params.id,
    })
      .then((response) => {
        this.values = response.data.data.steps_data.step_1;
        this.planners = response.data.data.planners;
        localStorage.setItem("content_planner_planners", JSON.stringify(this.planners));

        const keyword_cluster_data = this.values.find((element) => element.slug === "keyword_cluster");
        var keyword_cluster = JSON.parse(keyword_cluster_data.data);
        //console.log("keyword_cluster", keyword_cluster);

        this.keyword_cluster = keyword_cluster;

        this.keyword_cluster.forEach((element, index) => {
          if (index == this.$route.params.cluster) {
            //console.log(this.$route.params.cluster, element.cluster);
            this.keyword = element;
          }
        });

        localStorage.setItem("content_planner_subtopic", JSON.stringify(this.keyword.subtopics));

        // if (this.planners.length != 0) {
        //   this.planners.forEach((element) => {
        //     this.keyword.subtopics.forEach((element_subtopic) => {
        //       if (element_subtopic == element.subtopic) {
        //         this.chosen_content.push({
        //           title: element.subtopic,
        //           content: element.paragraphs[0].paragraph,
        //           regenerate: true,
        //           loading: false,
        //           new: false,
        //           type: "h2",
        //         });
        //       }
        //     });
        //   });
        // }

        const question_list_data = this.values.find((element) => element.slug === "question_list");
        var question_list = JSON.parse(question_list_data.data);
        //console.log("question_list", question_list);

        this.FAQ = question_list;

        this.FAQ.generated_question_list.forEach((element) => {
          this.all_faq.push(element);
        });

        this.FAQ.google_question_list.forEach((element) => {
          this.all_faq.push(element);
        });

        localStorage.setItem("content_planner_faq", JSON.stringify(this.all_faq));

        // if (this.planners.length != 0) {
        //   this.planners.forEach((element) => {
        //     this.FAQ.google_question_list.forEach((element_subtopic) => {
        //       if (element_subtopic == element.subtopic) {
        //         this.chosen_content.push({
        //           title: element.subtopic,
        //           content: element.paragraphs[0].paragraph,
        //           regenerate: true,
        //           loading: false,
        //           new: false,
        //           type: "h3",
        //         });
        //       }
        //     });
        //   });
        // }

        // if (this.planners.length != 0) {
        //   this.planners.forEach((element) => {
        //     this.FAQ.generated_question_list.forEach((element_subtopic) => {
        //       if (element_subtopic == element.subtopic) {
        //         this.chosen_content.push({
        //           title: element.subtopic,
        //           content: element.paragraphs[0].paragraph,
        //           regenerate: true,
        //           loading: false,
        //           new: false,
        //           type: "h3",
        //         });
        //       }
        //     });
        //   });
        // }

        const metaTag = this.values.find((element) => element.slug === "meta_tags_result");

        this.meta_data = JSON.parse(metaTag.data);

        JSON.parse(metaTag.data).forEach((element) => {
          this.title_sug.push(element.metatitle);
          this.description_sug.push(element.metadescription);
        });

        this.title = {
          value: this.title_sug[0],
          suggestions_edit: [],
          suggestions: this.title_sug,
        };

        this.title.suggestions.forEach((element, index) => {
          this.title.suggestions_edit.push({
            title: element,
            editor: false,
          });
        });

        this.description = {
          value: this.description_sug[0],
          suggestions_edit: [],
          suggestions: this.description_sug,
        };

        this.description.suggestions.forEach((element, index) => {
          this.description.suggestions_edit.push({
            description: element,
            editor: false,
          });
        });

        if (localStorage.content_planner_final_content != undefined && localStorage.content_planner_final_content != "undefined") {
          this.title.value = JSON.parse(localStorage.content_planner_final_content).title;
          this.description.value = JSON.parse(localStorage.content_planner_final_content).description;

          if (!this.title.suggestions.find((element) => element === JSON.parse(localStorage.content_planner_final_content).title)) {
            this.title.suggestions_edit.push({
              title: JSON.parse(localStorage.content_planner_final_content).title,
              editor: false,
            });
          }

          if (!this.description.suggestions.find((element) => element === JSON.parse(localStorage.content_planner_final_content).description)) {
            this.description.suggestions_edit.push({
              description: JSON.parse(localStorage.content_planner_final_content).description,
              editor: false,
            });
          }
        }

        localStorage.setItem("content_planner_title", JSON.stringify(this.title));
        localStorage.setItem("content_planner_description", JSON.stringify(this.description));

        var h1_data = this.values.find((element) => element.slug === "h1");

        this.h1 = JSON.parse(h1_data.data);
        localStorage.setItem("content_planner_h1", JSON.stringify(this.h1));

        // if (this.planners.length != 0) {
        //   this.planners.forEach((element) => {
        //     this.h1.forEach((element_subtopic) => {
        //       if (element_subtopic == element.subtopic) {
        //         this.chosen_content.push({
        //           title: element.subtopic,
        //           content: element.paragraphs[0].paragraph,
        //           regenerate: true,
        //           loading: false,
        //           new: false,
        //           type: "h1",
        //         });
        //       }
        //     });
        //   });
        // }

        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
};
</script>
<style lang="css" scoped>
.content-image {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 4rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  padding: 2rem;
}

hr {
  width: 40px;
  margin: 1rem 0.5rem 1rem 0.5rem;
}
.step__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}
.step__col {
  min-width: 20px;
  text-align: center;
  user-select: none;
}

.step__name {
  white-space: pre;
  margin-left: 0.5rem;
}

.btn-cancel {
  width: 80px;
}
.btn-next {
  width: 80px;
  margin-left: 1rem;
}
.route__link {
  text-decoration: none;
  color: #6c757d;
}
.route__link:hover {
  text-decoration: none;
  color: #4f555b;
  text-decoration: underline;
  transition: all 0.5s ease-out;
}

/* selectcontent__checkbox css */
.selectcontent__checkbox {
  background-color: #ffffff;
  display: block;
  margin: 10px 0;
  position: relative;
  border-radius: 8px;
}
.selectcontent__checkbox label {
  padding: 15px 50px;
  width: 100%;
  display: block;
  text-align: left;
  color: #3c454c;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 200ms ease-in;
  overflow: hidden;
  border: 2px solid #bcbdbc;
  border-radius: 8px;
  user-select: none;
}
.selectcontent__checkbox label:hover {
  background-color: #ededed;
  border: 2px solid #2c8de0;
  transition: all 300ms ease-out;
}
.selectcontent__checkbox label:before {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  content: "";
  background-color: #f5f5f7;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale3d(1, 1, 1);
  opacity: 0;
  z-index: -1;
}
.selectcontent__checkbox {
  display: flex;
}
.selectcontent__checkbox .btn-edit {
  z-index: 2;
  position: absolute;
  right: 10px;
  top: 15px;
  margin-left: 4rem;
}

.selectcontent__checkbox label:after {
  width: 25px;
  height: 25px;
  content: "";
  border: 1px solid transparent;
  background-color: #afafaf;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
  background-repeat: no-repeat;
  background-position: 0px 1px;
  border-radius: 50%;
  z-index: 2;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 300ms ease-out;
}

input:checked ~ label {
  color: #2c8de0;
  border-color: #2c8de0;
  transition: all 300ms ease-out;
}

input:checked ~ label:before {
  transform: translate(-50%, -50%) scale3d(56, 56, 1);
  opacity: 1;
}

input:checked ~ label:after {
  background-color: #2c8de0;
  border-color: #2c8de0;
}

input {
  width: 32px;
  height: 32px;
  order: 1;
  z-index: 2;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  visibility: hidden;
}

.form-control {
  padding-right: 1.5rem;
}

/* ------------------------------------------------------- */
.selectcontent {
  margin: 0 auto;
  padding: 3rem 0rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}
.selectcontent__title {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.selectcontent__title .material-icons-outlined {
  color: black;
  font-size: 15px;
  cursor: default;
  margin-left: 0.5rem;
}

.selectcontent__content {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
}
.selectcontent__selectable {
  display: flex;
  align-items: center;
  border: 2px solid #bcbdbc;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  padding: 1rem 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable .check {
  color: #bcbdbc;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable.active {
  border: 2px solid #2c8de0;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable.active .check {
  color: #2c8de0;
  transition: all 0.3s ease-out;
}

.selectcontent__selectable:hover {
  border: 2px solid #757575;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable:hover .check {
  color: #757575;
  transition: all 0.3s ease-out;
}

.selectcontent__contentpoint {
  margin-left: 1rem;
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
.btn-edit {
  color: #757575;
  margin-left: auto;
}
.btn-edit:hover {
  color: #2c8de0;
  transition: all 0.3s ease-out;
}
</style>
