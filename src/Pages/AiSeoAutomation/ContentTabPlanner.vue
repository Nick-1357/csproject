<template>
  <div>

    
    <!-- Contents Tab - Contents -->
    <div id="bodyfix__content__content" class="bodyfix__content__content">
      <!-- planner -->
      <div
        class="content__dropdown__group"
        v-for="(item, index) in content_article"
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
              v-if="item.value == ''"
              @click="removeData(index)"
              class="btn btn-outline-danger d-flex align-items-center me-2"
            >
              <span class="material-icons-outlined me-2">delete</span>Remove
            </button>

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
          <div class="content__dropdown__content pt-4">
            <!-- Original Content Section -->

            <div class="row align-items-center mb-2">
              <div class="col">
                <h5 class="mb-3 user-select-none">Original Content</h5>
              </div>

              <div class="col-2 d-flex">
                <div
                  :class="[
                    UserStatistics[1] <= 50
                      ? 'pill-badge red text-center ms-auto'
                      : UserStatistics[1] >= 75
                      ? 'pill-badge green text-center  ms-auto'
                      : 'pill-badge yellow text-center ms-auto',
                  ]"
                  v-b-tooltip.hover.top="{ variant: 'primary' }"
                  :title="[
                    UserStatistics[1] <= 50
                      ? 'Needs Improvement'
                      : UserStatistics[1] >= 75
                      ? 'Good'
                      : 'Average',
                  ]"
                >
                  {{ UserStatistics[1] }} %
                </div>
              </div>
            </div>

            <div class="content__dropdown__title__left mb-2">
              <!-- <span class="score score-low">0.00 (Low Score)</span> -->
              <div class="form-check suggestion">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'aisuggestion_suggestions' + index"
                  :id="item.original"
                  :value="item.original"
                  v-model="item.value"
                  @change="calcScore"
                />
                <label class="form-check-label" :for="item.original">
                  <span class="description wrap">{{ item.original }}</span>
                </label>
              </div>
            </div>

            <!-- AI Suggestions Section - Tabs-->

            <div class="d-flex align-items-center">
              <h5 class="mb-3 user-select-none">AI Suggestions</h5>
            </div>

            <div class="grey__card-outlined">
              <div class="aisuggestion__tabs">
                <button
                  class="aisuggestion__tab"
                  :class="tab.class"
                  v-for="(tab, index_tab) in item.Tabs_AiSuggestions"
                  :key="'tab' + index_tab"
                  @click="changeTab_AiSuggestions(tab.name, index, index_tab)"
                >
                  <span class="aisuggestion__tab__title">{{ tab.name }}</span>
                </button>
              </div>

              <!-- Suggestions Tab -->

              <!--for p elements-->

              <div
                id="content__aisuggestions__suggestions"
                class="p-3"
                v-if="
                  item.chosenTab_AiSuggestions == 'Suggestions' &&
                  item.key == 'p'
                "
              >
                <h6 class="mb-3 user-select-none">Options</h6>

                <div
                  class="form-check suggestion"
                  v-for="(normal, index_normal) in item.suggestions"
                  :key="'suggestions' + index_normal"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="'aisuggestion_suggestions' + index"
                    :id="normal.paragraph"
                    :value="normal.paragraph"
                    v-model="item.value"
                    @change="calcScore"
                  />
                  <label class="form-check-label" :for="normal.paragraph">
                    <div class="d-flex align-items-center">
                      <!-- <span class="tag__score">{{
                        item.suggestions_score[index_normal]
                      }}</span
                      > -->
                      <span class="desc">{{ normal.paragraph }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <!--for other elements-->

              <div
                id="content__aisuggestions__suggestions"
                class="p-3"
                v-if="
                  item.chosenTab_AiSuggestions == 'Suggestions' &&
                  item.key != 'p'
                "
              >
                <h6 class="mb-3 user-select-none">Options</h6>

                <div
                  class="form-check suggestion"
                  v-for="(normal, index_normal) in item.suggestions"
                  :key="'suggestions' + index_normal"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="'aisuggestion_suggestions' + index"
                    :id="normal"
                    :value="normal"
                    v-model="item.value"
                    @change="calcScore"
                  />
                  <label class="form-check-label" :for="normal">
                    <div class="d-flex align-items-center">
                      <!-- <span class="tag__score">{{
                        item.suggestions_score[index_normal]
                      }}</span
                      > -->
                      <span class="desc">{{ normal }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Advanced Suggestions -->
              <div
                id="content__aisuggestions__advanced"
                class="p-3"
                v-if="item.chosenTab_AiSuggestions == 'Advanced'"
              >
                <div v-if="total_genetic_quota <= 0">
                  <div class="d-flex mt-4">
                    <button class="btn btn-info w-40 p-2 text-white" disabled>
                      Contact Us to Subscribe to Advance Feature
                    </button>
                  </div>
                </div>

                <div v-else>
                  <div v-if="item.advanced_suggestions_percentage">
                    <div v-if="item.advanced_suggestions_percentage >= 100">
                      <h6 class="my-3 user-select-none">Options</h6>
                      <div
                        class="form-check suggestion"
                        v-for="(
                          advance, index_advance
                        ) in item.advanced_suggestions"
                        :key="'suggestions' + index_advance"
                      >
                        <input
                          class="form-check-input"
                          type="radio"
                          :name="'aisuggestion_suggestions' + index"
                          :id="advance.generated_text"
                          :value="advance.generated_text"
                          v-model="item.value"
                          @change="calcScore"
                        />
                        <label
                          class="form-check-label"
                          :for="advance.generated_text"
                        >
                          <div class="d-flex align-items-center">
                            <!-- <span class="tag__score">+ 2.71</span
                      > -->
                            <span class="desc">{{
                              advance.generated_text
                            }}</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div v-else>
                      <div class="d-flex my-4 justify-content-center">
                        <b>
                          {{ item.advanced_suggestions_percentage.toFixed(2) }}
                          %
                        </b>
                      </div>
                      <k-progress
                        class="justify-content-center"
                        :showText="false"
                        activeColor="#AA22E9"
                        :border="true"
                        :lineHeight="20"
                        :cutWidth="100"
                        color="rgb(33, 186, 233)"
                        bgColor="#ddd"
                        type="line"
                        active
                        :percent="
                          Math.round(item.advanced_suggestions_percentage)
                        "
                      >
                      </k-progress>

                      <div class="d-flex mt-2 justify-content-center">
                        <p>Kindly wait, your Result is being generated...</p>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div class="d-flex mt-2">
                      <b>Content: </b>
                    </div>
                    <div class="d-flex mt-2">
                      <span class="desc user-select-none">{{
                        item.value
                      }}</span>
                    </div>

                    <div class="d-flex mt-4">
                      <button
                        :id="'optimizeButton' + index"
                        @click="optimizeContent(index)"
                        class="btn-primary w-25 p-2"
                      >
                        Optimize
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Custom Suggestions -->
              <div
                id="content__aisuggestions__custom"
                class="p-3"
                v-if="item.chosenTab_AiSuggestions == 'Custom'"
              >
                <!-- <h6 class="mb-3 user-select-none">Content</h6> -->
                <div class="d-flex align-items-center mt-3">
                  <div class="form-check suggestion">
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="'aisuggestion_suggestions' + index"
                      :id="item.customized"
                      :value="item.customized"
                      v-model="item.value"
                      @change="calcScore"
                    />
                    <label class="form-check-label" :for="item.customized">
                      <!-- <span class="tag__score">7.61</span
                      > -->
                      Custom Content
                    </label>
                  </div>
                </div>

                <form action="validateCustom">
                  <textarea
                    v-model="item.customized"
                    class="form-control w-100"
                    id="ValidateTextArea"
                    rows="5"
                    placeholder="Type in your custom content here"
                    style="border-color: #888; width: 100%"
                  ></textarea>

                  <!-- <button type="submit" class="btn btn-primary mt-3">
                    Calculate Score
                  </button> -->
                </form>
                <!-- <div
                  class="d-flex align-items-center mt-3 text-primary user-select-none"
                >
                  <span class="material-icons-outlined me-2">recommend</span>
                  <h6 class="desc mt-1 text-primary">
                    Congratulations! Highest Score Recorded
                  </h6>
                </div> -->
              </div>
            </div>

            <!-- <button class="btn btn-primary mt-3">Update</button> -->
          </div>
        </b-collapse>
      </div>

      <div class="d-flex">
        <h5 class="d-flex align-items-center ms-1 fw-600 text-darkgreen">
          Add Element :
        </h5>
        <button
          @click="addElement('h1')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H1 Element
        </button>

        <button
          @click="addElement('h2')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H2 Element
        </button>

        <button
          @click="addElement('h3')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H3 Element
        </button>

        <button
          @click="addElement('p')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          P Element
        </button>
        <!-- 
        <button
          @click="downloadText"
          class="btn btn-outline-secondary d-flex justify-content-end align-items-center my-2 ms-auto"
        >
          Export HTML
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Automation from "@/store/Automation.js";

export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    content_type: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      showUpdateWebsite: false,
      content_article: [],
      values: [],
      user_seo_checklist: [],
      user_data_optimized_p: [],
      content_to_calc_score: [],
      UserStatistics: [],
      data_for_calculation: [],
      step_1_content: [],
      geneticAlgo: [],
      index_still_in_process: [],
      timer: null,
      total_genetic_quota:
        JSON.parse(localStorage.userInfo).used_genetic_algo_quota +
        JSON.parse(localStorage.userInfo).free_genetic_algo_quota,
      FAQ: [],
      keyword_cluster: [],
      h2_sug: [],
    };
  },
  methods: {
    addElement(data) {
      if (data == "h1") {
        const h1 = this.values.find((element) => element.slug === "h1");

        this.content_article.push({
          key: data,
          customized: "",
          value: "",
          original: "",

          suggestions: JSON.parse(h1.data),
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      } else if (data == "h2") {
       

        this.content_article.push({
          key: data,
          customized: "",
          value: "",
          original: "",

          suggestions:  this.h2_sug ,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      } else if (data == "h3") {
        var suggestions = [];
        this.FAQ.generated_question_list.forEach((element) => {
          suggestions.push(element);
        });

        this.FAQ.google_question_list.forEach((element) => {
          suggestions.push(element);
        });

        this.content_article.push({
          key: data,
          customized: "",
          value: "",
          original: "",

          suggestions: suggestions,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      } else if (data == "p") {
        const foundp = this.values.find(
          (element) => element.slug === "paragraphs"
        );

        this.initialSuggestion = JSON.parse(foundp.data);

        this.content_article.push({
          key: data,
          customized: "",
          value: "",
          original: "",

          suggestions: this.initialSuggestion,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      }

      console.log(this.content_article);
    },
    changeTab_AiSuggestions(name, item_index, tab_index) {
      //   console.log(name, item_index, tab_index);
      //   console.log(this.content_article[item_index]);
      this.content_article[item_index].chosenTab_AiSuggestions = name;
      // console.log(this.content_article[item_index].Tabs_AiSuggestions);
      this.content_article[item_index].Tabs_AiSuggestions.forEach(
        (element, index) => {
          if (index == tab_index) {
            element.class = "aisuggestion__tab active";
          } else {
            element.class = "aisuggestion__tab";
          }
        }
      );
    },
    removeData(index) {
      this.content_article.splice(index, 1);
      this.calcScore();
    },
    assignSuggestion(content) {
      content.forEach((para, index) => {
        if (para.key == "title") {
          // var original = this.content_article[index].value

          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );
          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];
          para.suggestions_score = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metatitle);
          });

          para.suggestions = sugTitle;
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
          para.suggestions_score = [];
          const h1 = this.values.find((element) => element.slug === "h1");

          para.suggestions = JSON.parse(h1.data);
        } else if (para.key == "h2") {
          para.suggestions = [];

          this.keyword_cluster.forEach((element_subtopic) => {
            element_subtopic.subtopics.forEach((subtopic) => {
              if (subtopic == para.value) {
                this.h2_sug = element_subtopic.subtopics;
              }
            });
          });
            para.suggestions =this.h2_sug
        } else if (para.key == "h3") {
          para.suggestions = [];
          this.FAQ.generated_question_list.forEach((element) => {
            para.suggestions.push(element);
          });

          this.FAQ.google_question_list.forEach((element) => {
            para.suggestions.push(element);
          });
        } else if (para.key == "p") {
          const foundp = this.values.find(
            (element) => element.slug === "paragraphs"
          );

          console.log(foundp);

          this.initialSuggestion = JSON.parse(foundp.data);

          para.suggestions = this.initialSuggestion;
        }

        //  this.content_to_calc_score[index].value=original
        //    this.content_article[index].value=original
      });

      return content;
    },
    organiseData(data) {
      this.data_for_calculation = [];
      // //

      data.forEach((element, index) => {
        if (element.key == "li") {
          element.value.forEach((li) => {
            var arr = {};
            arr[element.key] = li;

            this.data_for_calculation.push(arr);
          });
        } else {
          var arr = {};
          arr[element.key] = element.value;

          this.data_for_calculation.push(arr);
        }
      });

      var change_to_string = {
        user_data: JSON.stringify(this.data_for_calculation),
      };

      var Local = [
        {
          title: [],
          description: [],
          content: [],
        },
      ];

      data.forEach((element) => {
        if (element.key == "title") {
          Local[0].title = element.value;
        } else if (element.key == "description") {
          Local[0].description = element.value;
        } else {
          Local[0].content.push({ key: element.key, value: element.value });
        }
      });
      localStorage.setItem("ai_seo_content", JSON.stringify(Local[0]));

      // //

      return change_to_string;
    },
    calcScore() {
      var final_string = {};

      final_string = this.organiseData(this.content_article);

      ////

      Automation.updateUserData(final_string, this.$route.params.id)
        .then((response_update) => {
          Automation.fetchSeoAutomation({
            id: this.$route.params.id,
          }).then((response) => {
            const userStatistics = response.data.data.steps_data.step_1.find(
              (element) => element.slug === "user_statistics"
            );

            this.UserStatistics = JSON.parse(userStatistics.data);

            // localStorage.setItem(
            //   "ai_seo_automation_content_Score",
            //   JSON.stringify(this.UserStatistics)
            // );
          });
          this.$toast.info("The AI SEO Automation Content Score is updated");
          // this.$bvToast.toast(
          //   "The AI SEO Automation Content Score is updated",
          //   {
          //     title: "Success",
          //     variant: "success",
          //     toaster: "b-toaster-bottom-left",
          //     solid: true,
          //     autoHideDelay: 10000,
          //   }
          // );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    assignAdvancedSuggestion(data) {
      data.forEach((element_data, index) => {
        this.geneticAlgo.forEach((element) => {
          if (
            element.img_option.value == index &&
            element.complete_percentage >= 100
          ) {
            element_data.advanced_suggestions = JSON.parse(
              JSON.parse(element.values[0].data)
            );
            element_data.advanced_suggestions_plot = JSON.parse(
              element.values[1].data
            );
            element_data.advanced_suggestions_percentage =
              element.complete_percentage;
          } else if (
            element.img_option.value == index &&
            element.complete_percentage < 100
          ) {
            element_data.advanced_suggestions_percentage =
              element.complete_percentage;
          }
        });
      });

      console.log(data);

      return data;
    },

    optimizeContent(content_index) {
      var arr = this.content_article[content_index];

      arr.advanced_suggestions_percentage = 10;

      this.content_article.splice(content_index, 1, arr);

      var obj = {
        user_text: this.content_article[content_index].value,
        element_id: content_index,
        express_mode: true,
      };

      Automation.addGeneticAlgo(obj, this.$route.params.id)
        .then((response_2) => {
          console.log(response_2);

          this.setTimerGenetic();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setTimerGenetic() {
      Automation.fetchSeoAutomation({
        id: this.$route.params.id,
      })
        .then((response_initial) => {
          this.geneticAlgo = response_initial.data.data.geneticAlgo;

          const genetic_processing = this.geneticAlgo.find(
            (element) => element.complete_percentage < 100
          );

          this.content_article = this.assignAdvancedSuggestion(
            this.content_article
          );

          var me = this;

          // if one of the genetic campaign is processing

          console.log("genetic_processing!=undefined", genetic_processing);

          if (genetic_processing != undefined) {
            this.timer = setInterval(() => {
              Automation.fetchSeoAutomation({
                id: me.$route.params.id,
              })
                .then((response_timer) => {
                  const genetic_timer =
                    response_timer.data.data.geneticAlgo.find(
                      (element) => element.complete_percentage < 100
                    );

                  console.log(
                    "genetic_timer!=undefined)",
                    genetic_timer != undefined
                  );
                  // if one of the genetic campaign is processing
                  if (genetic_timer != undefined) {
                    console.log("timer content_article", this.content_article);
                    me.content_article.forEach((element_data, index) => {
                      response_timer.data.data.geneticAlgo.forEach(
                        (element) => {
                          if (
                            element.img_option.value == index &&
                            element.complete_percentage < 100 &&
                            element_data.advanced_suggestions == undefined
                          ) {
                            var arr = element_data;

                            console.log("timer element_data", element_data);
                            arr.advanced_suggestions_percentage =
                              element.complete_percentage;

                            this.content_article.splice(index, 1, arr);
                            console.log(
                              "timer after splice",
                              this.content_article
                            );
                          } else if (
                            element.img_option.value == index &&
                            element.complete_percentage >= 100 &&
                            element_data.advanced_suggestions == undefined
                          ) {
                            var arr = element_data;

                            arr.advanced_suggestions = JSON.parse(
                              JSON.parse(element.values[0].data)
                            );
                            arr.advanced_suggestions_plot = JSON.parse(
                              element.values[1].data
                            );
                            arr.advanced_suggestions_percentage =
                              element.complete_percentage;

                            this.content_article.splice(index, 1, arr);
                          }
                        }
                      );
                    });
                  }
                  // if all 100% done
                  else {
                    clearInterval(this.timer);
                    console.log("result content_article", this.content_article);
                    me.geneticAlgo = response_timer.data.data.geneticAlgo;
                    //update those dont have value yet
                    me.content_article.forEach((element_data, index) => {
                      me.geneticAlgo.forEach((element) => {
                        if (
                          element.img_option.value == index &&
                          element_data.advanced_suggestions == undefined
                        ) {
                          var arr = element_data;

                          console.log("result element_data", element_data);
                          arr.advanced_suggestions = JSON.parse(
                            JSON.parse(element.values[0].data)
                          );
                          arr.advanced_suggestions_plot = JSON.parse(
                            element.values[1].data
                          );
                          arr.advanced_suggestions_percentage =
                            element.complete_percentage;

                          console.log(
                            "result after splice",
                            this.content_article
                          );
                          this.content_article.splice(index, 1, arr);
                        }
                      });
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    
    this.values = this.content.steps_data.step_1;

    const question_list_data = this.values.find(
      (element) => element.slug === "question_list"
    );
    var question_list = JSON.parse(question_list_data.data);

    this.FAQ = question_list;

    const keyword_cluster_data = this.values.find(
      (element) => element.slug === "keyword_cluster"
    );
    var keyword_cluster = JSON.parse(keyword_cluster_data.data);

    this.keyword_cluster = keyword_cluster;

    const userStatistics = this.content.steps_data.step_1.find(
      (element) => element.slug === "user_statistics"
    );

    this.UserStatistics = JSON.parse(userStatistics.data);

    JSON.parse(this.content.steps_data.step_2[0].data).forEach((element) => {
      for (const [key, value] of Object.entries(element)) {

        if(key=='p'){
            this.content_article.push({
          key: key,
          customized: value,
          value: value,
          original: value,

          Tabs_AiSuggestions: [
            // { name: "Suggestions", class: "aisuggestion__tab active" },
            // { name: "Advanced", class: "aisuggestion__tab" },
            { name: "Custom", class: "aisuggestion__tab active" },
          ],
          chosenTab_AiSuggestions: "Custom",
          original_suggestion: "original",
        });

        }else{
  this.content_article.push({
          key: key,
          customized: value,
          value: value,
          original: value,

          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            // { name: "Advanced", class: "aisuggestion__tab" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
          original_suggestion: "original",
        });
        }
      
      }
    });

    this.content_article = this.assignSuggestion(this.content_article);

    var store = this.organiseData(this.content_article);
    console.log(store);

    console.log(this.content_article);
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
  padding:0.3rem 1.5rem
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

.pill-badge:first-letter {
  text-transform: uppercase;
}
.btn-arrow-icon {
  border-radius: 50% !important;
}
</style>
