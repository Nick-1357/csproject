<template>
  <div>
    <div class="campaign__wrapper">
      <!-- Route Pathway Links -->
      <!-- <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>
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
          / Content Planner
        </p>

        <p class="text-muted fw-normal" v-else>
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
          /
          <router-link
            :to="{
              name: 'ai_seo_automation_campaign',
            }"
            class="route__link"
            >View All</router-link
          >
          / Content Planner
        </p>
      </div> -->
      <div class="row mb-4">
        <!-- AI Content Score Card - 1st -->
      
        <div class="col-12">
          <div class="nexcard h-100 pe-1 mb-4">
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
                    campaign_data.title | capitalize
                  }}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Keyword</span>
                  <span class="projectgroup__desc pe-3">
                    {{ campaign_data.keyword | capitalize }}</span
                  >
                </div>
              </div>
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Locations</span>
                  <span class="projectgroup__desc">{{
                    campaign_data.location.name | loc
                  }}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Project Name</span>
                  <span class="projectgroup__desc">
                    {{ campaign_data.client.name }}</span
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Language</span>
                  <span class="projectgroup__desc">{{
                    campaign_data.language | lan
                  }}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Created By</span>
                  <span class="projectgroup__desc">{{
                    campaign_data.creator.name
                  }}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Created at</span>
                  <span class="projectgroup__desc">{{
                    campaign_data.created_at | formatDate
                  }}</span>
                </div>
              </div>
              <div class="col-3">
                <div class="projectinfo__group">
                  <span class="projectgroup__title">Project Status</span>
           
                  <span class="projectgroup__desc" >Completed</span>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-9"></div>
              <div class="col-3">
                      <button
                @click="back"
                class="btn btn-primary"
                style="float: left"
              >
                Re-Construct
              </button>
              </div>


            </div>
          </div>
        </div>
      </div>
      <!-- Route -->
      <!-- <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link> / <router-link to="" class="route__link">AI SEO Automation</router-link> /
          <router-link to="" class="route__link">{Campaign Name}</router-link> / Content Planner
        </p>
      </div> -->
      <!-- <div class="button-tabs-wrapper">
        <div class="button__tabs">
          <button class="button__tab" :class="tab.class" v-for="(tab, index) in tab__options" :key="'tab' + index" @click="selectTab(tab)">
            <span class="button__tab__title">{{ tab.name }}</span>
          </button>
        </div>
      </div> -->

      <div>
        <div class="nexcard">

         
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

            <content-no-url
              :content_type="content_type"
              :content="campaign_data"
              v-if="chosenTab_Bodyfix == 'Content'"
            />
            <!-- Competitor Analysis Tab - Contents -->
            <competitor-analysis
              :content_type="content_type"
              :content="campaign_data"
              v-if="chosenTab_Bodyfix == 'Competitor Analysis'"
            />
            <!-- Recommended Words Tab - Contents -->

            <recommended-words-no-url
              :content_type="content_type"
              :content="campaign_data"
              v-if="chosenTab_Bodyfix == 'Recommended Words'"
            />
            <!-- SEO Checklist Tab - Contents -->

            <seo-checklist-no-url
              :content_type="content_type"
              :content="campaign_data"
              v-if="chosenTab_Bodyfix == 'SEO Checklist'"
            />
            <!-- Keyword cluster Tab - Contents -->
            <generated-content
              :content="campaign_data"
              v-if="chosenTab_Bodyfix == 'Keyword Cluster'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- url of this page: /ai_seo_automation/campaign/content_planner -->

<!-- for recommended topics tab import the RecommendedTopics.vue file-->
<!-- for generated content import the GeneratedContent.vue file-->
<!-- for seo automation import the campaign.vue file-->

<!-- for continue editing button direct to ContentGeneration.vue file (/ai_seo_automation/campaign/content_planner/generating_content)-->

<script>
/* eslint-disable */
import recommendedTopics from "./RecommendedTopics.vue";
// import contentNoUrl from "./ContentTabPlanner.vue";
import contentNoUrl from "./ContentTabPlannerRestructured.vue";
import competitorAnalysis from "./CompetitorAnalysisTab.vue";
import RecommendedWordsNoUrl from "./RecommendedWordsNoUrl.vue";
import seoChecklistNoUrl from "./SeoChecklistNoUrl.vue";
import generatedContent from "./GeneratedContent.vue";
import Automation from "@/store/Automation.js";
import RadialProgressBar from "vue-radial-progress";
export default {
  components: {
    recommendedTopics,
    contentNoUrl,
    RecommendedWordsNoUrl,
    seoChecklistNoUrl,
    competitorAnalysis,
    generatedContent,
    RadialProgressBar,
  },
  data() {
    return {
      n: 1,
      tab__active: "Recommended Topics",
      tab__options: [
        { name: "Recommended Topics", class: "button__tab active" },
        // { name: "Generated Content", class: "button__tab " },
        { name: "SEO Automation", class: "button__tab " },
      ],
      Tabs_Bodyfix: [
        { name: "Content", class: "bodyfix__tab active" },
        { name: "Competitor Analysis", class: "bodyfix__tab" },
        { name: "Recommended Words", class: "bodyfix__tab" },
        { name: "SEO Checklist", class: "bodyfix__tab" },
        { name: "Keyword Cluster", class: "bodyfix__tab" },
      ],
      chosenTab_Bodyfix: "Content",
      content_type: "planner",
      campaign_data: [],
      UserStatistics: [],
    };
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
    selectTab(data) {
      this.tab__options.forEach((element) => {
        if (element.name === data.name) {
          element.class = "button__tab active";
        } else {
          element.class = "button__tab";
        }
      });
      this.tab__active = data.name;
    },
    back() {
      if (this.$route.params.id) {
        this.$router.push({
          name: "ai_seo_automation_campaign_recommended",
          params: {
            id: this.$route.params.id,
            location: this.$route.params.location,
            project: this.$route.params.project,
          },
        });
      } else {
        this.$router.push({
          name: "ai_seo_automation_campaign_recommended",
          params: {
            id: this.$route.params.id,
            location: this.$route.params.location,
          },
        });
      }

      // this.$router.push({
      //   name: "ai_seo_automation_campaign",
      //   params: {
      //     step: 0,
      //   },
      // });
    },
    localStoreHandler(e) {
      //  console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "ai_seo_automation_content_Score") {
        // console.log(JSON.parse(e.value));
        this.UserStatistics = JSON.parse(e.value);
      }
    },
  },
  created() {
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
        this.campaign_data = response.data.data;

        const userStatistics = this.campaign_data.steps_data.step_1.find(
          (element) => element.slug === "user_statistics"
        );

        this.UserStatistics = JSON.parse(userStatistics.data);

        localStorage.setItem(
          "ai_seo_automation_content_Score",
          JSON.stringify(this.UserStatistics)
        );
      })
      .catch((error) => {
        console.log(error);
        loader.hide();
      });
  },
};
</script>

<style scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
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
.campaign__wrapper {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
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
/* tab buttons */
.button-tabs-wrapper {
  margin-top: 0rem;
  border-bottom: 3px solid #cdcdcd;
  position: relative;
  height: 40px;
}
.button__tabs {
  z-index: 20;
  position: absolute;
}
.button__tab__title {
  padding: 1rem 1rem;
  font-weight: 500;
  font-size: 20px;
  transition: all 0.4s ease-out;
}
.button__tab {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  margin-right: 1.5rem;
  transition: 0.2s ease-out;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #f4faff;
  border-bottom: 3px solid #cdcdcd;
  color: #1e8ef0;
  box-shadow: inset 0 -5px 8px #cdcdcd;
}
.button__tab:hover {
  background-color: #dcefff;
  transition: 0.4s ease-out;
  box-shadow: inset 0 -5px 8px #cdcdcd;
  color: #2c8de0;
}
.button__tab.active {
  background-color: #2c8de0;
  box-shadow: none;
  color: #2c8de0;
  border-bottom: 3px solid #184d7b;
  transition: all 0.4s ease-out;
  /* TODO: add blue box shadow below */
  box-shadow: rgba(0, 109, 192, 0.3) 0px 30px 60px -30px;
}
.button__tab.active .button__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}


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
