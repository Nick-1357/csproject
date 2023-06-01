<template>
  <div style="postion: reltive" ref="ActivityContainer">
    <!-- <loading
      v-model="isLoading"
      :can-cancel="false"
      :is-full-page="false"
    /> -->
    <div class="menu-heading">
      <h5>Activity Log</h5>
      <!-- <button class="btn-close"></button> -->
    </div>

    <div v-if="loading" class="d-flex justify-content-center mt-4 mb-3">
      <b-spinner variant="primary" label="Large Spinner"></b-spinner>
    </div>

    <div class="menu-body">
      <!-- Infinity scroll to show result in batch of 10 -->
      <div class="menu-activity-collection pt-1" v-infinite-scroll="addData" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
        <div class="menu-activity py-1 d-flex" v-for="(item, index) in all_activity_log_after_filtered" :key="index" @click="select(item, JSON.parse(item.meta_data).id)">
          <div
            class="me-auto"
            v-show="
              JSON.parse(item.meta_data).name == 'Nexwriter-Campaigns' ||
              JSON.parse(item.meta_data).name == 'indexability' ||
              JSON.parse(item.meta_data).name == 'Seo-Automation' ||
              JSON.parse(item.meta_data).name == 'keywords-query'
            "
          >
            <h6 class="fw-bold text-darkgrey" v-if="JSON.parse(item.meta_data).title">
              {{ JSON.parse(item.meta_data).title | capitalize }}
            </h6>
            <b class="text-muted fs-small">
              {{ JSON.parse(item.meta_data).name | cross_name }}
            </b>
            <p class="text-muted fs-small">{{ item.title }} | {{ item.created_at | formatDate }}</p>
            <hr />
          </div>
          <!-- <button class="pe-0">
            <span class="material-icons-outlined">more_vert</span>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Auth from "@/store/Auth.js";
import KeywordAnalyzer from "@/store/KeywordAnalyzer.js";
import ContentGenerator from "@/store/ContentGenerator.js";
import AiContentGenerator from "@/store/AiContentGenerator.js";
import Automation from "@/store/Automation.js";
import PageSpeed from "@/store/PageSpeedAnalysis.js";
import ContentOptimizer from "@/store/ContentOptimizer.js";
import Query from "@/store/KeywordDiscovery.js";
import Enterprise from "@/store/Enterprise.js";
export default {
  name: "Activity",
  components: {
    Loading,
  },
  data() {
    return {
      all_activity_log_after_filtered: [],
      all_activity_log_result: [],
      page_num: 0,
      isLoading: false,
      loading: true,
    };
  },
  methods: {
    select(data, id) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      if (JSON.parse(data.meta_data).name == "PageSpeedCheck") {
        loader.hide();
        // PageSpeed.fetchPage(id)
        //   .then((response) => {
        //     //need client id
        //     loader.hide();
        //     if (response.data.data.complete_percentage < 100) {
        //        this.$bvToast.toast("The campaign is still processing", {
        //       title: "Info",
        //       variant: "info",
        //       toaster: "b-toaster-bottom-left",
        //       solid: true,
        //     });
        //     } else {
        //       this.$router.push({
        //         name: "PageSpeedCampaign",
        //         params: {
        //           id: response.data.data.id,
        //           client_id: JSON.parse(data.meta_data).locations[0].id,
        //         },
        //       });
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      } else if (JSON.parse(data.meta_data).name == "websiteScanner") {
        loader.hide();
        //  ContentOptimizer.fetchWebsite({id:id,LocationID:JSON.parse(data.meta_data).locations[0].id})
        // .then((response) => {
        // if (response.data.data.complete_percentage < 100) {
        //    this.$bvToast.toast("The campaign is still processing", {
        //   title: "Info",
        //   variant: "info",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
        //     } else {
        //       this.$router.push({
        //         name: "WebsiteCampaign",
        //         params: {
        //           id: response.data.data.id,
        //           client_id: JSON.parse(data.meta_data).client_id,
        //           locationID: JSON.parse(data.meta_data).locations[0].id,
        //         },
        //       });
        //     }
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
      } else if (JSON.parse(data.meta_data).name == "clientsCampaigns") {
        loader.hide();
        //  KeywordAnalyzer.fetchClientCampaign({id:id,LocationID:JSON.parse(data.meta_data).locations[0].id})
        // .then((response) => {
        //     if (response.data.data.complete_percentage < 100) {
        //    this.$bvToast.toast("The campaign is still processing", {
        //   title: "Info",
        //   variant: "info",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
        //     } else {
        //       this.$router.push({
        //         name: "Seo Analyzer Campaign",
        //         params: {
        //           id: response.data.data.id,
        //           client_id: JSON.parse(data.meta_data).client_id,
        //           locationID: JSON.parse(data.meta_data).locations[0].id,
        //         },
        //       });
        //     }
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
      } else if (JSON.parse(data.meta_data).name == "Nexwriter-Campaigns") {
        AiContentGenerator.fetchContentCampaign({ id: id }).then((response) => {
          loader.hide();
          if (response.data.data.campaign_type == "blog_writer") {
            this.$router.push({
              name: "content_image_add_fields",
              params: {
                step: "content",
                id: response.data.data.id,
                category: "blog writing",
              },
            });
          } else {
            this.$router.push({
              name: "content_image_add_fields",
              params: {
                step: "content",
                id: response.data.data.id,
                category: response.data.data.subtopic_case,
              },
            });
          }
        });
      } else if (JSON.parse(data.meta_data).name == "indexability") {
        Enterprise.fetchData(id, 1)
          .then((response) => {
            loader.hide();
            this.$router.push({
              name: "enterprise_seo",
              params: {
                id: id,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (JSON.parse(data.meta_data).name == "Seo-Automation") {
        Automation.fetchSeoAutomation({ id: id })
          .then((response) => {
            loader.hide();
            this.$router.push({
              name: "ai_seo_automation_campaign",
              params: {
                id: response.data.data.id,
                location: response.data.data.location.id,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (JSON.parse(data.meta_data).name == "keywords-query") {
        loader.hide();
        this.$router.push({
          name: "keyword_discovery",
          params: {
            id: id,
            location: JSON.parse(data.meta_data).locations[0].id,
          },
        });
      } else if (JSON.parse(data.meta_data).name == "New-Content-Generation-Campaigns") {
        loader.hide();
        // no issue
        // ContentGenerator.fetchContentCamp()
        //   .then((response) => {
        //     loader.hide();
        //     response.data.data.forEach((element) => {
        //       if (element.id == id) {
        //         if (
        //           element.completed >= 100 &&
        //           element.status == "Done step 1"
        //         ) {
        //           this.$router.push({
        //             name: "OrganicSeoGeneratedContent",
        //             params: {
        //               id: element.id,
        //               complete: element.completed,
        //               client_id: element.client_id,
        //             },
        //           });
        //           localStorage.contentGeneratorComplete = element.completed;
        //           localStorage.contentGeneratorCampaign = element.id;
        //           localStorage.created_at = element.created_at;
        //         } else if (
        //           element.completed >= 100 &&
        //           element.status == "Complete the second step"
        //         ) {
        //           this.$router.push({
        //             name: "OrganicSeoGeneratedContentLastStep",
        //             params: {
        //               id: element.id,
        //               complete: element.completed,
        //               client_id: element.client_id,
        //             },
        //           });
        //           localStorage.contentGeneratorComplete = element.completed;
        //           localStorage.contentGeneratorCampaign = element.id;
        //           localStorage.created_at = element.created_at;
        //         } else if (element.status == "Done") {
        //           this.$router.push({
        //             name: "OrganicSeoGeneratedContentLastStep",
        //             params: {
        //               id: element.id,
        //               complete: element.completed,
        //               client_id: element.client_id,
        //             },
        //           });
        //           localStorage.contentGeneratorComplete = element.completed;
        //           localStorage.contentGeneratorCampaign = element.id;
        //           localStorage.created_at = element.created_at;
        //         } else if (
        //           element.status == "Pending step 2" ||
        //           element.status == "Collecting Data"
        //         ) {
        //           this.$bvToast.toast("The campaign is still processing", {
        //             title: "Info",
        //             variant: "info",
        //             toaster: "b-toaster-bottom-left",
        //             solid: true,
        //           });
        //         }
        //       }
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
    },

    addData() {
      //show result in batch of 10
      Auth.getMe().then((response) => {
        this.loading = false;
        this.all_activity_log_result = response.data.data.activity_logs;

        this.page_num = this.page_num + 1;

        let currentList = this.all_activity_log_result.slice((this.page_num - 1) * 20, (this.page_num - 1) * 20 + 20);

        currentList.forEach((element) => {
          this.all_activity_log_after_filtered.push(element);
        });

        //console.log(this.all_activity_log_after_filtered);
      });
    },
  },
  created() {
    // let loader = this.$loading.show({
    //   // Optional parameters
    //   container: this.$refs.ActivityContainer,
    //   canCancel: true,
    //   onCancel: this.onCancel,
    //   isFullPage:false
    // });

    // this.isLoading = true;

    Auth.getMe().then(() => {
      // loader.hide();
      // this.isLoading = false;
    });
  },
};
</script>
<style lang="css" scoped>
.menu-activity {
  cursor: pointer;
}
.menu-activity-collection {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0rem 1rem 0rem 0rem;
}
</style>
