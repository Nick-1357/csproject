<template>
  <div>
    <div class="campaign__wrapper">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
        <!-- <p class="text-muted fw-normal" v-if="$route.params.project">
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
          /
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.project },
            }"
            class="route__link"
            >Project</router-link
          >
          / AI SEO Automation
        </p> -->

        <p
          class="text-muted fw-normal"
          v-if="$route.fullPath.includes('enterprise_seo')"
        >
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >/

          <router-link
            v-if="$route.fullPath.includes('enterprise_seo')"
            :to="{
              name: 'enterprise_seo_allTasks',
              params: { id: $route.params.automation_id },
            }"
            class="route__link"
            >Enterprise SEO</router-link
          >
          / AI SEO Automation
        </p>
      </div>
      <!-- <h3 class="text-darkgreen mb-3 user-select-none">Project Details</h3> -->
      <!-- Project 3 Cards Row when campaign got url -->
      <div v-if="with_url" class="row">
        <!-- AI Content Score Card - 1st -->
        <!-- <div class="col-12 col-lg-3 mb-4" v-if="!processing">
          <div class="nexcard h-100 d-flex flex-column">
            <h5>AI Content Score</h5>
            <div class="radial-progress-bar__wrapper">
              <radial-progress-bar
                animateSpeed="400"
                timingFunc="linear"
                :diameter="200"
                :completed-steps="UserStatistics[1]"
                :strokeWidth="20"
                :innerStrokeWidth="20"
                :total-steps="100"
                inner-stroke-color="#efefef"
                :start-color="[
                  UserStatistics[1] <= 50
                    ? '#e11300'
                    : UserStatistics[1] >= 75
                    ? '#5FB355'
                    : '#EDB95E',
                ]"
                :stop-color="[
                  UserStatistics[1] <= 50
                    ? '#e11300'
                    : UserStatistics[1] >= 75
                    ? '#5FB355'
                    : '#EDB95E',
                ]"
              >
                <div
                  :id="[
                    UserStatistics[1] <= 50
                      ? 'number-red'
                      : UserStatistics[1] >= 75
                      ? 'number-green'
                      : 'number-yellow',
                  ]"
                >
                  {{ UserStatistics[1] }}%
                </div>
                <div class="">
                  <div
                    style="font-size: 12px"
                    :class="[
                      UserStatistics[1] <= 50
                        ? 'pill-badge red text-center'
                        : UserStatistics[1] >= 75
                        ? 'pill-badge green text-center'
                        : 'pill-badge yellow text-center',
                    ]"
                    v-b-tooltip.hover.top="{ variant: 'primary' }"
                    v-if="UserStatistics[1] <= 50"
                  >
                    Needs <br />
                    Improvement
                  </div>
                  <div
                    :class="[
                      UserStatistics[1] <= 50
                        ? 'pill-badge red text-center'
                        : UserStatistics[1] >= 75
                        ? 'pill-badge green text-center'
                        : 'pill-badge yellow text-center',
                    ]"
                    v-b-tooltip.hover.top="{ variant: 'primary' }"
                    v-else-if="UserStatistics[1] >= 75"
                  >
                    Good
                  </div>
                  <div
                    :class="[
                      UserStatistics[1] <= 50
                        ? 'pill-badge red text-center'
                        : UserStatistics[1] >= 75
                        ? 'pill-badge green text-center'
                        : 'pill-badge yellow text-center',
                    ]"
                    v-b-tooltip.hover.top="{ variant: 'primary' }"
                    v-else
                  >
                    Average
                  </div>
                </div>
              </radial-progress-bar>
            </div>

          </div>
        </div> -->

        <!-- Page Info Card - 2nd -->
        <div class="col-12 col-lg-5 mb-5" v-if="!processing">
          <div class="nexcard">
            <h5>Page Info</h5>
            <!-- <div class="pageinfo__group row">
              <span class="pageinfo__title col-7">Word Count</span>
              <span class="pageinfo__desc col-5">{{ UserStatistics[2] }}</span>
            </div> -->

            <div class="row">
              <div class="col-8">
                <div class="pageinfo__group row">
                  <span class="pageinfo__title col-7">Exact Rank</span>

                  <span
                    v-if="user_ranking.exact.length == 0"
                    class="pageinfo__desc col-5 d-flex align-items-center text-danger"
                    >>100
                    <span
                      v-b-tooltip.hover.right="{ variant: 'danger' }"
                      title="Not Found in the Top 100 Search Rankings"
                      class="material-icons-outlined h6 mb-0 ms-2 cursor-default"
                    >
                      help_outline
                    </span>
                  </span>

                  <span
                    v-else
                    class="pageinfo__desc col-5 d-flex align-items-center"
                  >
                    {{ user_ranking.exact[0].Rank }}
                    <span
                      style="cursor: pointer"
                      v-b-toggle="'exact_match'"
                      class="material-icons-outlined h6 mb-0 ms-2 us-0 popup-arrow-icon"
                    >
                      expand_more
                    </span>
                  </span>

                  <b-collapse :id="'exact_match'" class="pageInfo_popup">
                    <div class="pt-2">
                      <div
                        class="sub_pageinfo nexcard-popup"
                        v-if="user_ranking.exact.length != 0"
                      >
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">URL</span>
                          <span
                            class="pageinfo__desc col-9"
                            style="word-break: break-all"
                            >{{ user_ranking.exact[0].URL }}</span
                          >
                        </div>
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">Keyword</span>
                          <span class="pageinfo__desc col-9">{{
                            user_ranking.exact[0].Keyword
                          }}</span>
                        </div>
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">Title</span>
                          <span class="pageinfo__desc col-9">{{
                            user_ranking.exact[0].Title
                          }}</span>
                        </div>
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">Description</span>
                          <span class="pageinfo__desc col-9">{{
                            user_ranking.exact[0].Description
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </b-collapse>
                </div>

                <div class="pageinfo__group row">
                  <span class="pageinfo__title col-7"
                    >Domain Related URL Rank</span
                  >

                  <span
                    v-if="user_ranking.partial.length == 0"
                    class="pageinfo__desc col-5 d-flex align-items-center text-danger"
                    >>100
                    <span
                      v-b-tooltip.hover.right="{ variant: 'danger' }"
                      title="Not Found in the Top 100 Search Rankings"
                      class="material-icons-outlined h6 mb-0 ms-2 cursor-default"
                    >
                      help_outline
                    </span>
                  </span>

                  <span
                    v-else
                    class="pageinfo__desc col-5 d-flex align-items-center"
                  >
                    {{ user_ranking.partial[0].Rank }}
                    <span
                      style="cursor: pointer"
                      v-b-toggle="'partial_match'"
                      class="material-icons-outlined h6 mb-0 ms-2 us-0 popup-arrow-icon"
                    >
                      expand_more
                    </span>
                  </span>

                  <b-collapse :id="'partial_match'" class="pageInfo_popup">
                    <div class="pt-2">
                      <div
                        class="sub_pageinfo nexcard-popup"
                        v-if="user_ranking.partial.length != 0"
                      >
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">URL</span>
                          <span
                            class="pageinfo__desc col-9"
                            style="word-break: break-all"
                            >{{ user_ranking.partial[0].URL }}</span
                          >
                        </div>
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">Keyword</span>
                          <span class="pageinfo__desc col-9">{{
                            user_ranking.partial[0].Keyword
                          }}</span>
                        </div>
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">Title</span>
                          <span class="pageinfo__desc col-9">{{
                            user_ranking.partial[0].Title
                          }}</span>
                        </div>
                        <div class="pageinfo__group row">
                          <span class="pageinfo__title col-3">Description</span>
                          <span class="pageinfo__desc col-9">{{
                            user_ranking.partial[0].Description
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </div>
              <div class="col-4">
                <div class="pageinfo__group row">
                  <span class="pageinfo__title">Locations</span>
                  <span class="pageinfo__desc">{{
                    content.location.name | loc
                  }}</span>
                </div>
                <div class="pageinfo__group row">
                  <span class="pageinfo__title">Language</span>
                  <span class="pageinfo__desc">{{
                    content.language | lan
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Info Card - 3rd -->
        <div class="col-12 col-lg-7 mb-7">
          <div class="nexcard">
            <h5>Project Info</h5>
            <div class="row">
              <div class="col-4">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Title</span>
                  <span class="projectgroup__desc">{{
                    content.title | capitalize
                  }}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Keyword</span>
                  <span class="projectgroup__desc pe-3">
                    {{ content.keyword | capitalize }}</span
                  >
                </div>
              </div>
              <div class="col-4">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Project Name</span>
                  <span class="projectgroup__desc">
                    {{ content.client.name }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Created By</span>
                  <span class="projectgroup__desc">{{
                    content.creator.name
                  }}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Created at</span>
                  <span class="projectgroup__desc">{{
                    content.created_at | formatDate
                  }}</span>
                </div>
              </div>
              <div class="col-4">
                <div
                  class="projectinfo__group"
                  v-b-tooltip.hover.bottom="{ variant: 'primary' }"
                  :title="content.url"
                >
                  <span class="projectgroup__title">URL</span>
                  <span class="projectgroup__desc" style="word-break: break-all"
                    ><a
                      :href="content.url"
                      target="__blank"
                      class="projectgroup__url"
                    >
                      {{ content.url.slice(0, 25) }}...</a
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project 1 Card Row when campaign got no url -->
      <div v-if="!with_url">
        <div class="nexcard h-100 pe-1">
          <h5>Project Info</h5>
          <div class="row">
            <!-- <div class="col-4 projectinfo__img">
                <img
                  src="https://www.nexmind.ai/wp-content/uploads/2022/06/Nexmind-logo.webp"
                  alt="Nexmind"
                  style="width: 100%; object-fit: contain"
                />
              </div> -->
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Company</span>
                <span class="projectgroup__desc">{{
                  content.title | capitalize
                }}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Keyword</span>
                <span class="projectgroup__desc pe-3">
                  {{ content.keyword | capitalize }}</span
                >
              </div>
            </div>
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Locations</span>
                <span class="projectgroup__desc">{{
                  content.location.name | loc
                }}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Project Name</span>
                <span class="projectgroup__desc">
                  {{ content.client.name }}</span
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Language</span>
                <span class="projectgroup__desc">{{
                  content.language | lan
                }}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Created By</span>
                <span class="projectgroup__desc">{{
                  content.creator.name
                }}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Created at</span>
                <span class="projectgroup__desc">{{
                  content.created_at | formatDate
                }}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="projectinfo__group">
                <span class="projectgroup__title">Project Status</span>
                <span class="projectgroup__desc" v-if="processing"
                  >Processing</span
                >
                <span class="projectgroup__desc" v-else>Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- campaign still processing -->
      <div class="nexcard mt-5 mb-3" v-if="processing">
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
              :percent="Math.round(duration)"
              style="padding-right: 0 !important"
            >
            </k-progress>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col text-center">
            <p>Kindly wait, your Result is being generated...</p>
          </div>
        </div>
      </div>

      <div v-if="!processing && type == 'content-planner'">
        <content-planner :campaign_data="campaign_data" />
      </div>

      <!-- campaign after completed -->
      <!-- BodyFix Section -->
      <h3
        class="text-darkgreen mb-3 user-select-none"
        v-if="!processing && type == 'general'"
      >
        Body Fix
      </h3>
      <div class="nexcard" v-if="!processing && type == 'general'">
        <!-- BodyFix Section - Tabs -->
        <div class="bodyfix__tabs">
          <button
            class="bodyfix__tab"
            :class="tab.class"
            v-for="(tab, index) in Tabs_Bodyfix"
            :key="'tab' + index"
            @click="changeTab_Bodyfix(index)"
          >
            <span class="bodyfix__tab__title">{{ tab.name }}</span>
          </button>
        </div>

        <!-- BodyFix Section - Contents-->

        <div class="bodyfix__content">
          <!-- Contents Tab - Contents -->
          <content-url
            :content="content"
            v-if="chosenTab_Bodyfix == 'Content' && with_url"
          />
          <content-no-url
            :content="content"
            v-if="chosenTab_Bodyfix == 'Content' && !with_url"
          />

          <!-- Competitor Analysis Tab - Contents -->
          <missing-element
            :content="content"
            v-if="chosenTab_Bodyfix == 'Missing Elements' && with_url"
          />
          <!-- Competitor Analysis Tab - Contents -->
          <competitor-analysis
            :content="content"
            v-if="chosenTab_Bodyfix == 'Competitor Analysis'"
          />
          <!-- Recommended Words Tab - Contents -->
          <recommended-words
            :content="content"
            v-if="chosenTab_Bodyfix == 'Recommended Words' && with_url"
          />

          <recommended-words-no-url
            :content="content"
            v-if="chosenTab_Bodyfix == 'Recommended Words' && !with_url"
          />
          <!-- SEO Checklist Tab - Contents -->
          <seo-checklist
            :content="content"
            v-if="chosenTab_Bodyfix == 'SEO Checklist' && with_url"
          />

          <seo-checklist-no-url
            :content="content"
            v-if="chosenTab_Bodyfix == 'SEO Checklist' && !with_url"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import contentUrl from "./ContentTab.vue";
import contentUrl from "./ContentTabRestructured.vue";
// import contentNoUrl from "./ContentTabNoUrl.vue";

import contentNoUrl from "./ContentTabNoUrlRestructured.vue";
import competitorAnalysis from "./CompetitorAnalysisTab.vue";
import recommendedWords from "./RecommendedWordsTab.vue";
import RecommendedWordsNoUrl from "./RecommendedWordsNoUrl.vue";
import seoChecklist from "./SeoChecklistTab.vue";
import seoChecklistNoUrl from "./SeoChecklistNoUrl.vue";
import Automation from "@/store/Automation.js";
import RadialProgressBar from "vue-radial-progress";
import ContentPlanner from "./ContentPlanner.vue";
import missingElement from "./MissingElement.vue";
export default {
  name: "Campaign",
  components: {
    contentUrl,
    competitorAnalysis,
    recommendedWords,
    seoChecklist,
    contentNoUrl,
    RecommendedWordsNoUrl,
    seoChecklistNoUrl,
    RadialProgressBar,
    ContentPlanner,
    missingElement,
  },
  data() {
    return {
      n: 1,
      campaign_data: [],
      Tabs_Bodyfix: [
        { name: "Content", class: "bodyfix__tab active" },
        { name: "Missing Elements", class: "bodyfix__tab" },
        { name: "Competitor Analysis", class: "bodyfix__tab" },
        { name: "Recommended Words", class: "bodyfix__tab" },
        { name: "SEO Checklist", class: "bodyfix__tab" },
      ],
      chosenTab_Bodyfix: "Content",
      with_url: true,
      content: [],
      duration: 0,
      interval: null,
      processing: true,
      UserStatistics: [],
      user_ranking: [],
      offSetValue: 0,
      type: "",
    };
  },
  destroyed() {
    clearInterval(this.interval);
    localStorage.removeItem("ai_seo_automation_content_Score");
    localStorage.removeItem("ai_seo_content");
  },
  methods: {
    changeTab_Bodyfix(data) {
      this.chosenTab_Bodyfix = this.Tabs_Bodyfix[data].name;
      this.Tabs_Bodyfix.forEach((element, index) => {
        if (index == data) {
          element.class = "bodyfix__tab active";
        } else {
          element.class = "bodyfix__tab";
        }
      });
    },
    displayResult() {
      const userStatistics = this.content.steps_data.step_1.find(
        (element) => element.slug === "user_statistics"
      );

      this.UserStatistics = JSON.parse(userStatistics.data);

      // localStorage.setItem(
      //   "ai_seo_automation_content_Score",
      //   JSON.stringify(this.UserStatistics)
      // );

      const user_ranking_result = this.content.steps_data.step_1.find(
        (element) => element.slug === "user_ranking"
      );
      if (user_ranking_result != undefined) {
        this.user_ranking = JSON.parse(user_ranking_result.data);
      }
    },

    // localStoreHandler(e) {
    //   //  console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
    //   if (e.key == "ai_seo_automation_content_Score") {
    //     // console.log(JSON.parse(e.value));
    //     this.UserStatistics = JSON.parse(e.value);
    //   }
    // },
  },

  created() {
    localStorage.removeItem("nexmind_live_editor_to_get");
    localStorage.removeItem("nexmind_live_editor_title");
    localStorage.removeItem("nexmind_live_editor_description");
    localStorage.removeItem("nexmind_live_editor_save_changes");
    localStorage.removeItem("nexmind_live_editor_variant");
    localStorage.removeItem("nexmind_live_editor_editor");
    localStorage.removeItem("nexmind_live_editor_to_pass");
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);

    Automation.fetchSeoAutomation({
      id: this.$route.params.id,
    })
      .then((response) => {
        loader.hide();
        this.content = response.data.data;

        this.campaign_data = response.data.data;

        this.type = response.data.data.type;

        console.log(this.campaign_data);

        if (response.data.data.url.length == 0) {
          this.with_url = false;
          this.Tabs_Bodyfix = [
            { name: "Content", class: "bodyfix__tab active" },

            { name: "Competitor Analysis", class: "bodyfix__tab" },
            { name: "Recommended Words", class: "bodyfix__tab" },
            { name: "SEO Checklist", class: "bodyfix__tab" },
          ];
        }

        if (this.content.complete_percentage < 100) {
          this.duration = this.content.complete_percentage;
          this.processing = true;

          this.interval = setInterval(() => {
            Automation.fetchSeoAutomation({
              id: this.$route.params.id,
            }).then((response) => {
              if (response.data.data.complete_percentage >= 100) {
                clearInterval(this.interval);
                location.reload();
                this.processing = false;
                this.displayResult();
              } else {
                this.duration = response.data.data.complete_percentage;
                this.processing = true;
              }
            });
          }, 10000);
        } else {
          this.duration = 100;
          this.processing = false;
          this.displayResult();
        }
      })
      .catch((error) => {
        // console.log(error);
        loader.hide();
      });
  },
  // radial js
  mounted() {
    // let number = document.getElementById("number");
    // // let circle = document.getElementById("circle");
    // let counter = 0;
    // let percentage = this.UserStatistics[1];
    // let offsetCounter = 100;
    // if (percentage == 100) {
    //   offsetCounter = 0;
    // } else {
    //   offsetCounter = 472 - 472 * (percentage / 112);
    // }
    // // console.log("Percentage : " + percentage);
    // // console.log("OffsetCounter : " + offsetCounter);
    // let interval = setInterval(() => {
    //   counter += 1;
    //   if (counter === percentage) {
    //     clearInterval(interval);
    //   }
    //   // number.innerHTML = counter + "%";
    //   // circle.style.strokeDashoffset = offsetCounter;
    //   this.offSetValue = offsetCounter;
    //   // console.log(this.offSetValue);
    // }, 20);
  },
};
</script>
<style lang="css" scoped>
.campaign__wrapper {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 0rem 3rem 3rem;
}
.text-darkgreen {
  color: #183b1c;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
}
.pageInfo_popup {
  position: absolute;
  width: 510px;
  translate: -24px 20px;
}
.nexcard-popup {
  border: 1px solid #9a9a9a;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
}
.pageinfo__group {
  display: flex;
  padding: 0.4rem 0;
}
.pageinfo__title {
  color: black;
  font-weight: 600;
}
.pageinfo__desc {
  color: #656565;
}
.projectinfo__group {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0rem;
}
.projectgroup__title {
  color: black;
  font-weight: 600;
}
.projectgroup__desc {
  color: #656565;
}
.projectgroup__url {
  color: #656565;
}
.projectinfo__img {
  display: flex;
  align-items: center;
  padding-right: 1rem;
}

/* radial progress bar */
/* .radial-progress-container {
  height: 85%;
  display: grid;
  place-items: center;
  color: #2c8de0;
}
.radial-progress-container .percentBox {
  width: 160px;
  height: 160px;
  position: relative;
}
.radial-progress-container .OuterCircle {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  padding: 20px;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(225, 225, 225, 0.7);
  background-color: #fff;
}
.radial-progress-container .InnerCircle {
  background-color: #fff;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(225, 225, 225, 0.7), -0.5px -0.5px 0px rgba(225, 225, 225, 1), 0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
    0px 12px 10px -10px rgba(0, 0, 0, 0.05);
}

.radial-progress-container circle {
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 20px;
  stroke-dasharray: 472;
  stroke-dashoffset: 472;
  animation: anima 2s linear forwards;
}
.radial-progress-container svg {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
} */
/* @keyframes anima {
  100% {

    stroke-dashoffset: var(--offset);
  }
} */

.radial-progress-container {
  font-weight: 600;
  font-size: 1.5rem;
}
.radial-progress-container #number-green {
  color: #5fb355 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.radial-progress-container #number-red {
  color: #e11300 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.radial-progress-container #number-yellow {
  color: #edb95e !important;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* Bodyfix section - Tabs */
.bodyfix__tab {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  /* border-bottom: 2px solid transparent; */
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  transition: 0.2s ease-out;
  /* border-top-right-radius: 10px;
  border-top-left-radius: 10px; */
  border-radius: 20px;
  border: 1px solid #2c8de0;
  background-color: #f4faff;
}
.bodyfix__tab:hover {
  background-color: #dcefff;
  /* border-bottom: 2px solid #4e4e4e; */
  transition: 0.4s ease-out;
}
.bodyfix__tab.active {
  /* border-bottom: 2px solid #1464c0;
  background-color: #ececec;*/
  background-color: #2c8de0;
  transition: all 0.4s ease-out;
}
.bodyfix__tab.active .bodyfix__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
.bodyfix__tab .bodyfix__tab__title {
  padding: 1.5rem 1rem;
  color: #2c8de0;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.4s ease-out;
  user-select: none;
}
.popup-arrow-icon {
  background-color: #2c8de0;
  display: flex;
  /* place-items: center; */
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 15px;
  line-height: 5px;
  user-select: 0;
  cursor: pointer;
  color: #fff;
}
.popup-arrow-icon.collapsed {
  rotate: 0deg;
  transition: 0.3s ease-out;
}
.popup-arrow-icon.not-collapsed {
  rotate: 180deg;
  transition: 0.3s ease-out;
}
.cursor-default {
  cursor: default;
}

.pill-badge {
  border-radius: 20px;
  border: none;
  background-color: #e8e8e8;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.2rem 1rem;
  margin-top: 0.2rem;
}
.pill-badge.red {
  background-color: #fce1de;
  color: #f54337;
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
}
.pill-badge.green {
  background-color: #e2f2e3;
  color: #4dae50;
}
.radial-progress-bar__wrapper {
  margin: 0.5rem auto 0rem;
}
</style>
