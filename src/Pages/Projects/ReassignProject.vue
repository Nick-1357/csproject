<template>
  <div class="card-body">
    <strong class="card-title">Assign to a different Project</strong>

    <div class="card-text mt-3">
      <label>Choose your Project </label>
    </div>

    <div class="card-text">
      <div class="input-group">
        <b-form-select
          v-model="chosenClient"
          :options="submitClients"
          value-field="id"
          text-field="name"
          class="rounded w-100 p-1 mt-2 input-border"
        ></b-form-select>
      </div>

      <span class="text-danger text-sm" v-show="errors.has('Project')">{{
        errors.first("Project")
      }}</span>
    </div>

    <div class="card-text d-flex mt-3">
      <button
        @click="$bvModal.hide('modal-assign-client')"
        class="btn btn-primary-outlined ms-auto"
      >
        Cancel
      </button>
      <button @click.once="AssignClient" class="btn btn-primary ms-2">
        Add
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import KeywordAnalyzer from "@/store/KeywordAnalyzer.js";
import ContentGenerator from "@/store/ContentGenerator.js";
import AiContentGenerator from "@/store/AiContentGenerator.js";
import Automation from "@/store/Automation.js";
import Outline from "@/store/Outline.js";
import PageSpeed from "@/store/PageSpeedAnalysis.js";
import ContentOptimizer from "@/store/ContentOptimizer.js";
import KeywordTracker from "@/store/KeywordTracker.js";
import KeywordDiscovery from "@/store/KeywordDiscovery.js";
import Enterprise from "@/store/Enterprise.js";
import ImageGenerator from "@/store/ImageGenerator.js";
export default {
  props: {
    reassign_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      submitClients: [],
      chosenClient: [],
    };
  },

  methods: {
    AssignClient() {
      var client_id = { client_id: this.chosenClient };

      if (this.$route.fullPath.includes("keyword_discovery")) {
        KeywordDiscovery.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("keyword_analyzer")) {
        KeywordAnalyzer.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("page_speed_insight")) {
        PageSpeed.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            // //

            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_optimizer")) {
        ContentOptimizer.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (
        this.$route.fullPath.includes("enterprise_seo") ||
        this.$route.fullPath.includes("Addition")
      ) {
        Enterprise.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            // //

            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("image_generator")) {
        ImageGenerator.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_generator")) {
        ContentGenerator.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_image")) {
        AiContentGenerator.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("ai_seo_automation")) {
        Automation.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("Outline")) {
        Outline.reasignProject(this.reassign_id, client_id)
          .then((response) => {
            this.campaigns = response.data.data.data;
            this.$bvModal.hide("modal-assign-client");
            location.reload();
          })

          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  created() {
   
        this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

  },
};
</script>