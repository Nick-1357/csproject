<template>
  <div class="py-3 py-md-4 px-3 px-md-4 px-lg-5">
    <!-- Route Pathway Links -->
    <div class="route__linkpath mb-4 fw-normal">
      <p class="text-muted fw-normal" v-if="$route.params.project">
        <button
          @click="$router.go(-1)"
          class="material-icons-outlined btn-back"
        >
          arrow_back
        </button>
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
            name: 'feature_pagination_table',
            params: { feature: 'ai_seo_automation' },
          }"
          class="route__link"
          >View All</router-link
        >
        <router-link
          :to="{
            name: 'ai_seo_automation_campaign_recommended',
          }"
          class="route__link"
          >/ Content Planner</router-link
        >
        / Edit
      </p>

      <p class="text-muted fw-normal" v-else>
        <button
          @click="$router.go(-1)"
          class="material-icons-outlined btn-back"
        >
          arrow_back
        </button>
        <router-link to="/dashboard" class="route__link">Dashboard</router-link>
        /
        <router-link
          :to="{
            name: 'feature_pagination_table',
            params: { feature: 'ai_seo_automation' },
          }"
          class="route__link"
          >View All</router-link
        >
        <router-link
          :to="{
            name: 'ai_seo_automation_campaign_recommended',
          }"
          class="route__link"
          >/ Content Planner</router-link
        >
        / Edit
      </p>
    </div>
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <b>{{ keyword.cluster | capitalize }}</b>
        </div>

        <div class="d-flex">
          <b class="text-primary">Total Search Volume: {{ keyword.volume }}</b>
        </div>
      </div>

      <div class="col-2">
        <div class="d-flex">
          <button @click="updateValue" class="btn btn-primary">
            AI SEO Automation
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-4 border-right">
        <div class="nexcard">
          <div class="mb-4">
            <div class="d-flex">
              <b>Meta Title</b>
              <span
                v-b-toggle="'title_content_planner'"
                class="material-icons-outlined ms-auto p-0 arrow-icon"
                >expand_more</span
              >
            </div>
            <b-collapse :id="'title_content_planner'">
              <div class="d-flex m-2">
                <b-list-group>
                  <b-list-group-item
                    style="cursor: pointer"
                    @click="chooseSubtopic(sub, 'title')"
                    v-for="(sub, index_sub) in title"
                    :key="'subtopics' + index_sub"
                  >
                    <div class="row">
                      <div class="col align-self-center">
                        {{ sub }}
                      </div>
                      <div class="col-2 align-self-center">
                        <plus-icon
                          style="float: right; color: grey; cursor: pointer"
                          size="1.5x"
                          class="custom-class"
                        ></plus-icon>
                      </div>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-collapse>
          </div>
          <div class="my-4">
            <div class="d-flex">
              <b>Meta Description</b>
              <span
                v-b-toggle="'desc_content_planner'"
                class="material-icons-outlined ms-auto p-0 arrow-icon"
                >expand_more</span
              >
            </div>
            <b-collapse :id="'desc_content_planner'">
              <div class="d-flex m-2">
                <b-list-group>
                  <b-list-group-item
                    style="cursor: pointer"
                    @click="chooseSubtopic(sub, 'description')"
                    v-for="(sub, index_sub) in description"
                    :key="'subtopics' + index_sub"
                  >
                    <div class="row">
                      <div class="col align-self-center">
                        {{ sub }}
                      </div>
                      <div class="col-2 align-self-center">
                        <plus-icon
                          style="float: right; color: grey; cursor: pointer"
                          size="1.5x"
                          class="custom-class"
                        ></plus-icon>
                      </div>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-collapse>
          </div>
          <div class="my-4">
            <div class="d-flex">
              <b>Header 1</b>
              <span
                v-b-toggle="'h1_content_planner'"
                class="material-icons-outlined ms-auto p-0 arrow-icon"
                >expand_more</span
              >
            </div>
            <b-collapse :id="'h1_content_planner'">
              <div class="d-flex m-2">
                <b-list-group>
                  <b-list-group-item
                    style="cursor: pointer"
                    @click="chooseSubtopic(sub, 'h1')"
                    v-for="(sub, index_sub) in h1"
                    :key="'subtopics' + index_sub"
                  >
                    <div class="row">
                      <div class="col align-self-center">
                        {{ sub }}
                      </div>
                      <div class="col-2 align-self-center">
                        <plus-icon
                          style="float: right; color: grey; cursor: pointer"
                          size="1.5x"
                          class="custom-class"
                        ></plus-icon>
                      </div>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-collapse>
          </div>
          <div class="my-4">
            <div class="d-flex">
              <b>Subtopics</b>
              <span
                v-b-toggle="'subtopics_content_planner'"
                class="material-icons-outlined ms-auto p-0 arrow-icon"
                >expand_more</span
              >
            </div>
            <b-collapse visible :id="'subtopics_content_planner'">
              <div class="d-flex m-2">
                <b-list-group>
                  <b-list-group-item
                    style="cursor: pointer"
                    @click="chooseSubtopic(sub, 'h2')"
                    v-for="(sub, index_sub) in keyword.subtopics"
                    :key="'subtopics' + index_sub"
                  >
                    <div class="row">
                      <div class="col align-self-center">
                        {{ sub }}
                      </div>
                      <div class="col-2 align-self-center">
                        <plus-icon
                          style="float: right; color: grey; cursor: pointer"
                          size="1.5x"
                          class="custom-class"
                        ></plus-icon>
                      </div>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-collapse>
          </div>
          <div class="mt-4">
            <div class="d-flex">
              <b>Questions List</b>
              <span
                v-b-toggle="'question_content_planner'"
                class="material-icons-outlined ms-auto p-0 arrow-icon"
                >expand_more</span
              >
            </div>
            <b-collapse :id="'question_content_planner'">
              <div class="d-flex m-2">
                <b-list-group>
                  <b-list-group-item
                    style="cursor: pointer"
                    @click="chooseSubtopic(sub, 'h3')"
                    v-for="(sub, index_sub) in FAQ.generated_question_list"
                    :key="'generated_question_list' + index_sub"
                  >
                    <div class="row">
                      <div class="col align-self-center">
                        {{ sub }}
                      </div>
                      <div class="col-2 align-self-center">
                        <plus-icon
                          style="float: right; color: grey; cursor: pointer"
                          size="1.5x"
                          class="custom-class"
                        ></plus-icon>
                      </div>
                    </div>
                  </b-list-group-item>

                  <b-list-group-item
                    style="cursor: pointer"
                    @click="chooseSubtopic(sub, 'h3')"
                    v-for="(sub, index_sub) in FAQ.google_question_list"
                    :key="'google_question_list' + index_sub"
                  >
                    <div class="row">
                      <div class="col align-self-center">
                        {{ sub }}
                      </div>
                      <div class="col-2 align-self-center">
                        <plus-icon
                          style="float: right; color: grey; cursor: pointer"
                          size="1.5x"
                          class="custom-class"
                        ></plus-icon>
                      </div>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>

      <div class="col-8">
        <!-- <draggable
        :list="chosen_content"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
         style="cursor:all-scroll" -->

        <div
          class="card p-2 list-group-item"
          v-for="(sub, index) in chosen_content"
          :key="index"
        >
          <div class="nexcard p-3">
            <div class="row">
              <div class="col align-self-center">
                <b>{{ sub.type | capitalize }} : {{ sub.title }}</b>
              </div>

              <div
                v-if="sub.regenerate == false"
                class="col-1 align-self-center"
              >
                <trash-2-icon
                  size="1x"
                  class="custom-class"
                  style="cursor: pointer; color: grey"
                  @click="removeData(index)"
                ></trash-2-icon>
              </div>
            </div>

            <div class="d-flex mt-2">
              <!-- v-if="sub.loading" -->
              <div v-if="sub.loading" class="d-flex justify-content-center">
                <b-spinner variant="primary" label="Large Spinner"></b-spinner>
              </div>
              <!-- <p>{{ sub.content }}</p> -->

              <vue-typed-js
                v-if="sub.content.length != 0 && sub.new"
                :typeSpeed="10"
                :strings="[sub.content]"
              >
                <span class="typing"></span>
              </vue-typed-js>

              <p v-else-if="sub.content.length != 0 && !sub.new">
                {{ sub.content }}
              </p>
            </div>

            <div v-if="sub.type != 'title' && sub.type != 'description'">
              <div class="d-flex" v-if="sub.regenerate == false">
                <button
                  @click="generateContent(sub, index)"
                  class="btn btn-primary py-1 px-4"
                >
                  Generate
                </button>
              </div>

              <div class="card-text d-flex mt-1" v-if="sub.content.length != 0">
                <div class="ms-auto"></div>
                <button
                  @click="RegenerateContent(sub, index)"
                  class="btn btn-primary-outlined ms-2"
                >
                  Re-generate
                </button>
                <!-- <button class="btn btn-primary-outlined ms-2">Edit</button> -->
              </div>
            </div>
          </div>
        </div>
        <!-- </draggable> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import draggable from "vuedraggable";
import Automation from "@/store/Automation.js";
import { PlusIcon } from "vue-feather-icons";
import { Trash2Icon } from "vue-feather-icons";
export default {
  components: {
    draggable,
    PlusIcon,
    Trash2Icon,
  },
  data() {
    return {
      keyword: [],
      values: [],
      campaign: [],
      Header: [
        " How Search Engine Optimization Can Boost Your Business",
        "Unlocking the Benefits of Search Engine Optimization for Your Business",
        "Harness the Power of Search Engine Optimization to Boost Your Business",
      ],
      FAQ: [
        // " How Search Engine Optimization Can Boost Your Business",
        // "Unlocking the Benefits of Search Engine Optimization for Your Business",
        // "Harness the Power of Search Engine Optimization to Boost Your Business",
      ],
      keyword_cluster: [],
      chosen_content: [],
      result_content: "",
      planners: [],
      current_step: null,
      title: [],
      description: [],
      h1: [],
    };
  },

  methods: {
    organiseData() {
      console.log(this.chosen_content);
      //  this.chosen_content.forEach(element=>{

      //  })

    
        var content_to_send = [];

        this.chosen_content.forEach((element, index) => {
          if (element.type == "title") {
            var arr = {};
            arr[element.type] = element.title;
            content_to_send.push(arr);
          }
        });

        this.chosen_content.forEach((element, index) => {
          if (element.type == "description") {
            var arr = {};

            arr[element.type] = element.title;
            content_to_send.push(arr);
          }
        });

        

        this.chosen_content.forEach((element, index) => {
          if (element.type != "title" && element.type != "description") {
            var arr = {};
            var arrContent = {};
            arr[element.type] = element.title;
            content_to_send.push(arr);
            arrContent["p"] = element.content;
            content_to_send.push(arrContent);
          }
        });

        console.log(content_to_send);

        var changed = { user_data: JSON.stringify(content_to_send) };

           return changed;
 

      // //
   
    },

    updateValue() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });


         if(this.chosen_content.length==0){
               loader.hide();
     this.$toast.warning("Generate Content first");
      }

      else if (
        this.chosen_content.find((element) => element.type === "title") ==
          undefined ||
        this.chosen_content.find((element) => element.type === "title") ==
          undefined ||
        this.chosen_content.find((element) => element.type === "h1") ==
          undefined
      ) {
             loader.hide();
        this.$toast.warning("Title, Description and H1 is required");
      } else {
       var changed = {};

      changed = this.organiseData();

      Automation.updateUserData(changed, this.$route.params.id)
        .then((response) => {
          this.$toast.success(response.data.message);

          var me =this

          setTimeout(() => {
                loader.hide();

            me.$router.push({
              name: "ai_seo_automation_campaign_planner",
            });
          }, 5000);

        })
        .catch((err) => {
          console.log(err);
        });
      }

  
    },
    removeData(index) {
      this.chosen_content.splice(index, 1);
    },

    chooseSubtopic(sub, type) {
      var exists = false;

      this.chosen_content.forEach((element) => {
        if (element.title == sub) {
          exists = true;
        }
      });

      this.chosen_content.forEach((element) => {
        if (element.type == "title" && type == "title") {
          element.title = sub;
          exists = true;
        }
      });

      this.chosen_content.forEach((element) => {
        if (element.type == "description" && type == "description") {
          element.title = sub;
          exists = true;
        }
      });

      if (!exists) {
        this.chosen_content.push({
          title: sub,
          content: "",
          regenerate: false,
          loading: false,
          new: false,
          type: type,
        });
      }
    },
    RegenerateContent(sub, index) {
      this.chosen_content[index].content = "";
      this.chosen_content[index].regenerate = true;
      this.chosen_content[index].loading = true;
      this.chosen_content[index].new = true;

      var obj = {
        subtopic: sub.title,
      };

      Automation.contentPlanner(this.$route.params.id, obj)
        .then((response) => {
          this.$toast.success(res.data.message + " Kindly, wait!");

          this.chosen_content[index].content =
            response.data.data.generated_text;

          this.chosen_content[index].loading = false;
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    },
    generateContent(sub, index) {
      this.chosen_content[index].loading = true;
      this.chosen_content[index].regenerate = true;

      var obj = {
        subtopic: sub.title,
      };

      console.log(this.$route.params.id);

      Automation.contentPlanner(this.$route.params.id, obj)
        .then((response) => {
          console.log(response.data.data.generated_text);

          this.chosen_content[index].content =
            response.data.data.generated_text;

          this.chosen_content[index].loading = false;
          this.chosen_content[index].new = true;
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    },
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    Automation.fetchSeoAutomation({
      id: this.$route.params.id,
    })
      .then((response) => {
        // //
        this.campaign = response.data.data;
        this.current_step = response.data.data.step.current_step;
        this.values = response.data.data.steps_data.step_1;

        this.planners = response.data.data.planners;

        const keyword_cluster_data = this.values.find(
          (element) => element.slug === "keyword_cluster"
        );
        var keyword_cluster = JSON.parse(keyword_cluster_data.data);
        console.log("keyword_cluster", keyword_cluster);

        this.keyword_cluster = keyword_cluster;

        console.log(this.$route.params.cluster);

        this.keyword_cluster.forEach((element, index) => {
          if (index == this.$route.params.cluster) {
            console.log(this.$route.params.cluster, element.cluster);
            this.keyword = element;
          }
        });

        console.log(this.keyword);

        if (this.planners.length != 0) {
          this.planners.forEach((element) => {
            this.keyword.subtopics.forEach((element_subtopic) => {
              if (element_subtopic == element.subtopic) {
                this.chosen_content.push({
                  title: element.subtopic,
                  content: element.paragraphs[0].paragraph,
                  regenerate: true,
                  loading: false,
                  new: false,
                  type: "h2",
                });
              }
            });
          });
        }

        const question_list_data = this.values.find(
          (element) => element.slug === "question_list"
        );
        var question_list = JSON.parse(question_list_data.data);
        console.log("question_list", question_list);

        this.FAQ = question_list;

        if (this.planners.length != 0) {
          this.planners.forEach((element) => {
            this.FAQ.google_question_list.forEach((element_subtopic) => {
              if (element_subtopic == element.subtopic) {
                this.chosen_content.push({
                  title: element.subtopic,
                  content: element.paragraphs[0].paragraph,
                  regenerate: true,
                  loading: false,
                  new: false,
                  type: "h3",
                });
              }
            });
          });
        }

        if (this.planners.length != 0) {
          this.planners.forEach((element) => {
            this.FAQ.generated_question_list.forEach((element_subtopic) => {
              if (element_subtopic == element.subtopic) {
                this.chosen_content.push({
                  title: element.subtopic,
                  content: element.paragraphs[0].paragraph,
                  regenerate: true,
                  loading: false,
                  new: false,
                  type: "h3",
                });
              }
            });
          });
        }

        const metaTag = this.values.find(
          (element) => element.slug === "meta_tags_result"
        );

        JSON.parse(metaTag.data).forEach((element) => {
          this.title.push(element.metatitle);
          this.description.push(element.metadescription);
        });

        var h1_data = this.values.find((element) => element.slug === "h1");

        this.h1 = JSON.parse(h1_data.data);

        if (this.planners.length != 0) {
          this.planners.forEach((element) => {
            this.h1.forEach((element_subtopic) => {
              if (element_subtopic == element.subtopic) {
                this.chosen_content.push({
                  title: element.subtopic,
                  content: element.paragraphs[0].paragraph,
                  regenerate: true,
                  loading: false,
                  new: false,
                  type: "h1",
                });
              }
            });
          });
        }

        loader.hide();
      })
      .catch((error) => {
        console.log(error);
        loader.hide();
      });
  },
};
</script>

<style lang='css' scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.typed {
  content: "|";
  display: inline;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
.list-group {
  width: 100%;
}

.list-group-item {
  width: 100%;
}
</style>
