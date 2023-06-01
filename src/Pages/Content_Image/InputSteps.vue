<template>
  <div>
    <div class="content-image">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button @click="Back()" class="material-icons-outlined btn-back">arrow_back</button>

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
          /
          <router-link
            :to="{
              name: 'content_image_add',
              params: { project: $route.params.project },
            }"
            class="route__link"
            >AI Content Generation</router-link
          >
          / Add Content
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="Back()" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="/content_image/add_content" class="route__link">AI Content Generation</router-link>
          /
          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'content_image' },
            }"
            class="route__link"
            >View All
          </router-link>
          / Add Content
        </p>
      </div>

      <div class="nexcard">
        <h3 class="modal-card__title text-center mb-4">Create {{ this.$route.params.category | capitalize }}</h3>

        <!-- 4 steps of blog writing-->
        <div class="step__row" v-if="this.$route.params.category == 'blog writing'">
          <!-- <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'project_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Project Details</span>
          </div>
          <hr /> -->

          <div class="step__col">
            <!-- <img src="@/assets/input-step-icons/icon-step2-inactive.svg" v-if="this.$route.params.step == 'project_details'" /> -->
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Topic Details</span>
          </div>

          <hr />

          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step2-inactive.svg" v-if="this.$route.params.step == 'project_details' || this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step2-active.svg" v-else-if="this.$route.params.step == 'add_image_input'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Image Details</span>
          </div>

          <hr />

          <div class="step__col">
            <img
              src="@/assets/input-step-icons/icon-step3-inactive.svg"
              v-if="this.$route.params.step == 'project_details' || this.$route.params.step == 'topic_details' || this.$route.params.step == 'add_image_input'"
            />
            <img src="@/assets/input-step-icons/icon-step3-active.svg" v-else-if="this.$route.params.step == 'select_content' || this.$route.params.step == 'content'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Select Content</span>
          </div>

          <hr />

          <div class="step__col">
            <img
              src="@/assets/input-step-icons/icon-step4-inactive.svg"
              v-if="
                this.$route.params.step == 'project_details' ||
                this.$route.params.step == 'topic_details' ||
                this.$route.params.step == 'add_image_input' ||
                this.$route.params.step == 'select_content' ||
                this.$route.params.step == 'content'
              "
            />
            <img src="@/assets/input-step-icons/icon-step4-active.svg" v-else-if="this.$route.params.step == 'review_create'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Review & Create</span>
          </div>
        </div>

        <!-- 3 steps of others-->
        <div class="step__row" v-else style="max-width: 530px">
          <!-- <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'project_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Project Details</span>
          </div>
          <hr /> -->

          <div class="step__col">
            <!-- <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'project_details'" /> -->
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Topic Details</span>
          </div>

          <hr />

          <div class="col step__col">
            <img src="@/assets/input-step-icons/icon-step2-active.svg" v-if="this.$route.params.step == 'project_details'" />
            <img src="@/assets/input-step-icons/icon-step2-inactive.svg" v-else-if="this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step2-active.svg" v-else-if="this.$route.params.step == 'review_create'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Review & Create</span>
          </div>
        </div>

        <project v-if="this.$route.params.step == 'project_details'" />
        <basic v-if="this.$route.params.step == 'topic_details'" />
        <create v-if="this.$route.params.step == 'review_create'" />
        <select-content v-if="this.$route.params.step == 'select_content'" />
        <image-detail v-if="this.$route.params.step == 'add_image_input'" />
        <progress-bar v-if="this.$route.params.step == 'content'" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import project from "./ProjectDetails.vue";
import basic from "./BasicInput.vue";
import create from "./Review_content.vue";
import selectContent from "./Select_contents.vue";
import imageDetail from "./Image_details.vue";
import progressBar from "./ProgressBar.vue";
export default {
  name: "BlogWriting",
  components: {
    basic,
    create,
    selectContent,
    imageDetail,
    progressBar,
    project,
  },
  data() {
    return {
      keyword_value: ["Keyword_1", "Keyword_2"],
    };
  },
  methods: {
    Back() {
      if (this.$route.params.step == "project_details") {
        this.$router.go(-1);
      } else if (this.$route.params.step == "topic_details") {
        this.$router.go(-1);
      } else if (this.$route.params.step == "review_create") {
        if (this.$route.params.project) {
          this.$router.push({
            name: "feature_pagination_table",
            params: {
              feature: "content_image",
              id: this.$route.params.project,
            },
          });
        } else {
          this.$router.push({
            name: "feature_pagination_table",
            params: { feature: "content_image" },
          });
        }
      } else if (this.$route.params.step == "select_content") {
        if (this.$route.params.project) {
          this.$router.push({
            name: "feature_pagination_table",
            params: {
              feature: "content_image",
              id: this.$route.params.project,
            },
          });
        } else {
          this.$router.push({
            name: "feature_pagination_table",
            params: { feature: "content_image" },
          });
        }
      } else if (this.$route.params.step == "add_image_input") {
        this.$router.push({
          name: "content_image_add_fields",
          params: { step: "topic_details" },
        });
      } else if (this.$route.params.step == "content") {
        if (this.$route.params.project) {
          this.$router.push({
            name: "feature_pagination_table",
            params: {
              feature: "content_image",
              id: this.$route.params.project,
            },
          });
        } else {
          this.$router.push({
            name: "feature_pagination_table",
            params: { feature: "content_image" },
          });
        }
      }
    },
    // mouseEnter(evt) {
    //   if (localStorage.draggedElement.length != 0) {
    //     console.log(localStorage.draggedElement)
    //     this.keyword_value = localStorage.draggedElement;
    //     localStorage.setItem('draggedElement',"")
    //   }
    // },
  },
  destroyed() {
    // localStorage.removeItem("content_gen_value");
  },
};
</script>
<style lang="css">
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
</style>
