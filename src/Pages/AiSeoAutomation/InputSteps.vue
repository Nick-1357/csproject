<template>
  <div>
    <div class="keywordpage__wrapper">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>/
          <router-link
            v-if="!$route.params.project"
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'ai_seo_automation' },
            }"
            class="route__link"
            >View All
          </router-link>
          <router-link
            v-else
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'ai_seo_automation', id: $route.params.project },
            }"
            class="route__link"
            >View All </router-link
          >/ Add Keyword
        </p>
      </div>

      <div class="nexcard">
        <h3 class="modal-card__title text-center mb-4">AI SEO Automation</h3>

        <div class="step__row" style="max-width: 530px">
          <!-- <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'project_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Project Details</span>
          </div> 

          <hr />-->

          <div class="step__col">
           
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Topic Details</span>
          </div>

          <hr />

          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step2-inactive.svg" v-if="this.$route.params.step == 'project_details' || this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step2-active.svg" v-else />
            <span class="step__name">Website URL</span>
          </div>
        </div>

        <topic v-if="this.$route.params.step == 'topic_details'" />
        <project v-else-if="this.$route.params.step == 'project_details'" />
        <website v-else-if="this.$route.params.step == 'website_url'" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import draggable from "vuedraggable";
import topic from "./AddKeyword.vue";
import project from "./ProjectDetails.vue";
import website from "./WebsiteUrl.vue";
export default {
  name: "inputSteps",
  components: { topic, project, website },
  data() {
    return {
      keyword_value: ["Keyword_1", "Keyword_2"],
      limit: 5,
    };
  },
  created() {},
};
</script>
<style lang="css">
hr {
  width: 80px;
  margin: 1rem 0.5rem 1rem 1rem;
}
.keywordpage__wrapper {
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
</style>
