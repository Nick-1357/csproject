<template>
  <div>
    <div class="campaign__wrapper">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
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
              name: 'feature_pagination_table',
              params: { feature: 'ai_seo_automation' },
            }"
            class="route__link"
            >View All</router-link
          >
          / Content Planner
        </p>
      </div>
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
              <span class="projectgroup__desc" v-if="processing"
                >Processing</span
              >
              <span class="projectgroup__desc" v-else>Completed</span>
            </div>
          </div>
        </div>
      </div>

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

      <!-- <div class="card__row">
        <h4 class="mb-3">Continue Editing</h4>
        <div class="row">
          <div class="col-3 mb-4" v-for="n in 2" :key="n">
            <div
              class="nexcard h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <h4>SEO Global</h4>
                <small>140 search volume</small>
                <ul class="nexcard__list">
                  <li>Types of SEO Services Offered by SEO Company</li>
                  <li>Techniques for Evaluating the performance</li>
                  <li>Tips for choosing the right SEO Company</li>
                  <li>Impact of SEO Strategies on Website Traffic</li>
                  <li>Types of SEO Services Offered by SEO Company</li>
                </ul>
              </div>
              <div class="d-flex mt-4">
                <button class="btn btn-primary-outlined m-auto">
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div v-if="!processing" class="card__row mt-4">
        <div class="row">
          <div class="col">
            <h4 class="mb-3">Keyword Cluster</h4>
          </div>

          <div v-if="campaign_data.step.current_step == 2" class="col-2">
            <button
              @click="seoautomation"
              class="btn btn-primary"
              style="float: right"
            >
              Automation
            </button>
          </div>
        </div>

        <div class="row">
          <div
            class="col-3 mb-4"
            v-for="(keyword, index) in keyword_cluster"
            :key="index"
          >
            <div
              class="nexcard h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <h4>{{ keyword.cluster | capitalize }}</h4>
                <small>{{ keyword.volume }} search volume</small>

                <div class="d-flex">
                  <small>{{ keyword.count }} content generated</small>
                </div>
                <ul class="nexcard__list">
                  <li
                    v-for="(sub, index_sub) in keyword.subtopics"
                    :key="index_sub"
                  >
                    {{ sub }}
                  </li>
                </ul>
              </div>
              <div class="d-flex mt-4">
                <button
                  @click="chooseCluster(index)"
                  class="btn btn-primary m-auto"
                >
                  Generate Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Automation from "@/store/Automation.js";
export default {
  name: "recommended_topics",
  data() {
    return {
      n: 1,
      values: [],
      keyword_cluster: [],
      planners: [],
      campaign_data: [],
      processing: true,
      duration: 0,
    };
  },
  methods: {
    chooseCluster(index) {
      this.$router.push({
        name: "ai_seo_automation_campaign_planner_steps",
        params: {
          cluster: index,
          step: "chooseTitle",
        },
      });
    },

    displayResult() {
      this.values = this.campaign_data.steps_data.step_1;
      this.planners = this.campaign_data.planners;

      const keyword_cluster_data = this.values.find(
        (element) => element.slug === "keyword_cluster"
      );
      var keyword_cluster = JSON.parse(keyword_cluster_data.data);
      console.log("keyword_cluster", keyword_cluster);

      this.keyword_cluster = keyword_cluster;

      const question_list_data = this.values.find(
        (element) => element.slug === "question_list"
      );
      var question_list = JSON.parse(question_list_data.data);
      console.log("question_list", question_list);

      if (this.planners.length != 0) {
        this.keyword_cluster.forEach((element_keyword, index) => {
          var count = 0;
          element_keyword.subtopics.forEach((element_subtopic) => {
            this.planners.forEach((element) => {
              if (element_subtopic == element.subtopic) {
                count = count + 1;
              }
            });
            this.keyword_cluster[index].count = count;
          });
        });
      }

      console.log(this.keyword_cluster);
    },

    seoautomation() {
      this.$router.push({
        name: "ai_seo_automation_campaign_planner",
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

    localStorage.removeItem("content_planner_h1");
    localStorage.removeItem("content_planner_planners");
    localStorage.removeItem("content_planner_description");
    localStorage.removeItem("content_planner_title");
    localStorage.removeItem("content_planner_faq");
    localStorage.removeItem("content_planner_subtopic");
    localStorage.removeItem("content_planner_final_content");
    localStorage.removeItem("ai_seo_content");
    Automation.fetchSeoAutomation({
      id: this.$route.params.id,
    })
      .then((response) => {
        loader.hide();
        this.campaign_data = response.data.data;

        if (this.campaign_data.complete_percentage < 100) {
          this.duration = this.campaign_data.complete_percentage;
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
        console.log(error);
        loader.hide();
      });
  },
};
</script>
<style lang="css" scoped>
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
.page-wrapper-inner {
  padding: 0rem 0rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
}
.nexcard h4 {
  color: var(--color-darkgreen);
}
.nexcard small {
  color: #868686;
}
.nexcard__list {
  margin-top: 1rem;
  padding-left: 1rem;
  list-style-type: "- ";
}
.nexcard__list li {
  font-size: 14px;
  color: var(--color-darkgreen);
}
</style>
