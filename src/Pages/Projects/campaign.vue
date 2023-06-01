<template>
  <div>
    <div class="page-wrapper-xl">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard </router-link>/
          <router-link
            :to="{
              name: 'project_pagination_table',
              params: { feature: 'projects' },
            }"
            class="route__link"
            >Projects </router-link
          >/ {{ client.name }}
        </p>
      </div>

      <div class="nexcard h-100 px-4 py-3 mt-3 mb-4">
        <div class="row">
          <div class="col-4">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Name</span>
              <span class="projectgroup__desc">{{ client.name }}</span>
            </div>
          </div>
          <div class="col-4">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Base URL</span>
              <span class="projectgroup__desc">{{ client.base_url }}</span>
            </div>
          </div>
          <div class="col-4">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Created By</span>
              <span class="projectgroup__desc">{{ client.creator }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- <div class="col-6">
          <div class="d-flex mt-2">
            <h5>AI SEO</h5>
          </div>

          <div class="nexcard p-3 mt-2 mb-2">
            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined"
                  >screen_search_desktop</span
                >
              </div>

              <div class="col-4 align-self-center">
                <p>Keyword Discovery</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('keyword_discovery')"
              >
                <p>{{ Keyword_Discovery_count }} campaigns</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">query_stats</span>
              </div>

              <div class="col-4 align-self-center">
                <p>Keyword Tracker</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('keyword_tracker')"
              >
                <p>{{ keyword_tracker_count }} keywords</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">psychology</span>
              </div>

              <div class="col-4 align-self-center">
                <p>AI SEO Automation</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('ai_seo_automation')"
              >
                <p>{{ ai_Automation_count }} campaigns</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">terminal</span>
              </div>

              <div class="col-4 align-self-center">
                <p>CMS Editor</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('meta_cms')"
              >
                <p>{{ cms_count }} campaigns</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">display_settings</span>
              </div>

              <div class="col-4 align-self-center">
                <p>Enterprise SEO</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('enterprise_seo')"
              >
                <p>{{ Enterprise_count }} campaigns</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>
          </div>
        </div> -->

        <div class="col-6 my-3" v-if="permissions.includes('keyword_query.index') && discovery_quota > 0">
          <!-- <div class="d-flex mt-4">
            <h5>AI SEO</h5>
          </div> -->

          <div class="nexcard p-3 h-100">
            <div class="row nextable__head g-0">
              <div class="col-1 profile">
                <span class="material-icons-outlined">screen_search_desktop</span>
              </div>
              <div class="col-8">
                <h6 class="text-darkgreen">Keyword Discovery ({{ Keyword_Discovery_count }} campaigns)</h6>
              </div>
              <!-- <div class="col-2" @click="showAllCampaigns('keyword_discovery')">
              </div> -->

              <div class="col-3 d-flex">
                <div class="ms-auto"></div>
                <button
                  v-if="Keyword_Discovery_count == 0 || Keyword_Discovery_count == null"
                  @click="createKeywordDiscovery"
                  class="btn btn-outline-success ms-auto w-106px"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="Create New Campaign"
                >
                  Start
                </button>

                <button
                  v-if="Keyword_Discovery_count > 4"
                  @click="showAllCampaigns('keyword_discovery')"
                  class="btn btn-primary ms-2"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="View All Campaigns"
                >
                  <span class="material-icons-outlined"> view_list </span>
                </button>

                <button v-if="Keyword_Discovery_count > 0" @click="createKeywordDiscovery" class="btn btn-primary ms-2" v-b-tooltip.hover.topright="{ variant: 'primary' }" title="Create New Campaign">
                  <span class="material-icons"> add </span>
                </button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3 d-flex align-items-center" v-for="(content, index) in Keyword_Discovery.slice(0, 4)" :key="'Keyword_Discovery' + index">
              <div class="col-1 profile">
                <span class="material-icons-outlined">screen_search_desktop</span>
              </div>
              <div class="col-8">
                <p>{{ content.title }}</p>
                <p class="text-muted">{{ content.keyword }}</p>
              </div>
              <div class="col-3 d-flex">
                <button @click="openCampaign('keyword_discovery', content)" class="btn btn-outline-success ms-auto w-106px">Open</button>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="col-6">
          <div class="d-flex mt-2">
            <h5>AI SEO</h5>
          </div>

          <div class="nexcard p-3 mt-2 mb-2">
           
v
            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">query_stats</span>
              </div>

              <div class="col-4 align-self-center">
                <p>Keyword Tracker</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('keyword_tracker')"
              >
                <p>{{ keyword_tracker_count }} keywords</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>


              <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">query_stats</span>
              </div>

              <div class="col-4 align-self-center">
                <p>Keyword Tracker</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('keyword_tracker')"
              >
                <p>{{ keyword_tracker_count }} keywords</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>


       
          </div>
        </div> -->

        <div class="col-6 my-3" v-if="permissions.includes('Seo-Automation.index') && seo_quota > 0">
          <!-- <div class="d-flex mt-4">
            <h5>AI SEO</h5>
          </div> -->

          <div class="nexcard p-3 h-100">
            <div class="row nextable__head g-0">
              <div class="col-1 profile">
                <span class="material-icons-outlined">psychology</span>
              </div>
              <div class="col-8">
                <h6>AI SEO Automation ({{ ai_Automation_count }} campaigns)</h6>
              </div>
              <div class="col-3 d-flex">
                <div class="ms-auto"></div>
                <button
                  v-if="ai_Automation_count == 0 || ai_Automation_count == null"
                  @click="createKeywordDiscovery"
                  class="btn btn-outline-success ms-auto w-106px"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="Create New Campaign"
                >
                  Start
                </button>

                <button
                  v-if="ai_Automation_count > 4"
                  @click="showAllCampaigns('ai_seo_automation')"
                  class="btn btn-primary ms-2"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="View All Campaigns"
                >
                  <span class="material-icons-outlined"> view_list </span>
                </button>

                <button v-if="ai_Automation_count > 0" @click="createAiSeo" class="btn btn-primary ms-2" v-b-tooltip.hover.topright="{ variant: 'primary' }" title="Create New Campaign">
                  <span class="material-icons"> add </span>
                </button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3" v-for="(content, index) in ai_Automation.slice(0, 4)" :key="'ai_Automation' + index">
              <div class="col-1 profile">
                <span class="material-icons-outlined">psychology</span>
              </div>
              <div class="col-8">
                <p>{{ content.title }}</p>
                <p class="text-muted">
                  {{ content.keyword }}
                </p>
              </div>
              <div class="col-3 d-flex">
                <button @click="openCampaign('ai_seo_automation', content)" class="btn btn-outline-success ms-auto w-106px">Open</button>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="col-6">
          <div class="d-flex mt-2">
            <h5>AI SEO</h5>
          </div>

          <div class="nexcard p-3 mt-2 mb-2">
        

            <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">terminal</span>
              </div>

              <div class="col-4 align-self-center">
                <p>CMS Editor</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('meta_cms')"
              >
                <p>{{ cms_count }} campaigns</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>


              <div class="row nextable__body g-0 mt-3">
              <div class="col-1 profile align-self-center">
                <span class="material-icons-outlined">terminal</span>
              </div>

              <div class="col-4 align-self-center">
                <p>CMS Editor</p>
              </div>

              <div
                v-b-tooltip.hover.top="{ variant: 'primary' }"
                title="View All Campaigns"
                class="col-4 count align-self-center"
                @click="showAllCampaigns('meta_cms')"
              >
                <p>{{ cms_count }} campaigns</p>
              </div>
              <div class="col-3 align-self-center">
                <button class="btn btn-primary-outlined">Create New</button>
              </div>
            </div>

         
          </div>
        </div> -->

        <div class="col-6 my-3" v-if="permissions.includes('indexability.index') && enterprise_quota > 0">
          <!-- <div class="d-flex mt-4">
            <h5>AI SEO</h5>
          </div> -->

          <div class="nexcard p-3 h-100">
            <div class="row nextable__head g-0">
              <div class="col-1 profile">
                <span class="material-icons-outlined">display_settings</span>
              </div>
              <div class="col-8">
                <h6>Enterprise SEO ({{ Enterprise_count }} campaigns)</h6>
              </div>
              <div class="col-3 d-flex">
                <div class="ms-auto"></div>
                <button
                  v-if="Enterprise_count == 0 || Enterprise_count == null"
                  @click="createKeywordDiscovery"
                  class="btn btn-outline-success ms-auto w-106px"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="Create New Campaign"
                >
                  Start
                </button>
                <button
                  v-if="Enterprise_count > 4"
                  @click="showAllCampaigns('enterprise_seo')"
                  class="btn btn-primary ms-2"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="View All Campaigns"
                >
                  <span class="material-icons-outlined"> view_list </span>
                </button>

                <button v-if="Enterprise_count > 0" @click="createEnterpriseSeo" class="btn btn-primary ms-2" v-b-tooltip.hover.topright="{ variant: 'primary' }" title="Create New Campaign">
                  <span class="material-icons"> add </span>
                </button>
              </div>
            </div>

            <div class="row nextable__body g-0 mt-3" v-for="(content, index) in Enterprise_camp.slice(0, 4)" :key="'Enterprise_camp' + index">
              <div class="col-1 profile">
                <span class="material-icons-outlined">display_settings</span>
              </div>
              <div class="col-8">
                <p>{{ content.title }}</p>
              </div>
              <div class="col-3 d-flex">
                <button @click="openCampaign('enterprise_seo', content)" class="btn btn-outline-success ms-auto w-106px">Open</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 my-3" v-if="permissions.includes('Nexwriter.index') && content_quota > 0">
          <!-- <div class="d-flex mt-4">
            <h5>AI Content Generator</h5>
          </div> -->
          <div class="nexcard p-3 h-100">
            <div class="row nextable__head g-0">
              <div class="col-1 profile">
                <span class="material-icons-outlined">article</span>
              </div>

              <div class="col-8">
                <h6>AI Content Generation ({{ Ai_ContentGenerator_count }} contents)</h6>
              </div>
              <!-- <div class="col-2 d-flex">
                <button @click="showAllCampaigns('content_image')" class="btn btn-primary">View All</button>
              </div>
              <div class="col-2 d-flex">
                <button @click="createContentImage" class="btn btn-primary-outlined ms-auto">Create New</button>
              </div> -->

              <div class="col-3 d-flex">
                <div class="ms-auto"></div>
                <button
                  v-if="Ai_ContentGenerator_count == 0 || Ai_ContentGenerator_count == null"
                  @click="createKeywordDiscovery"
                  class="btn btn-outline-success ms-auto w-106px"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="Create New Campaign"
                >
                  Start
                </button>
                <button
                  v-if="Ai_ContentGenerator_count > 4"
                  @click="showAllCampaigns('content_image')"
                  class="btn btn-primary ms-2"
                  v-b-tooltip.hover.topright="{ variant: 'primary' }"
                  title="View All Campaigns"
                >
                  <span class="material-icons-outlined"> view_list </span>
                </button>

                <button v-if="Ai_ContentGenerator_count > 0" @click="createContentImage" class="btn btn-primary ms-2" v-b-tooltip.hover.topright="{ variant: 'primary' }" title="Create New Content">
                  <span class="material-icons"> add </span>
                </button>
              </div>

              <!-- <div class="col-2 action ">
              <div class="action-menu">
                <button class="text-center">
                  <span class="btn-action material-icons-outlined"
                    >more_horiz</span
                  >
                </button>
                <div class="action-menu-dropdown">
              
                  <span class="edit"
                    ><span class="material-icons-outlined">edit</span>Create New</span
                  >
                  <span class="move"
                    ><span class="material-icons-outlined">unfold_more</span
                    >Move</span
                  >
            
                </div>
              </div>
            </div> -->
            </div>

            <div class="row nextable__body g-0 mt-3" v-for="(content, index) in Ai_ContentGenerator.slice(0, 4)" :key="'Ai_ContentGenerator' + index">
              <div class="col-1 profile">
                <span class="material-icons-outlined">article</span>
              </div>

              <div class="col-8">
                <p>{{ content.keyword }}</p>
                <p class="text-muted" v-if="content.campaign_type == 'free_style'">
                  {{ content.subtopic_case }}
                </p>
                <p class="text-muted" v-else>Blog Writing</p>
              </div>

              <div class="col-3 d-flex">
                <button @click="openCampaign('content_image', content)" class="btn btn-outline-success ms-auto w-106px">Open</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import KeywordTracker from "@/store/KeywordTracker.js";
import KeywordAnalyzer from "@/store/KeywordAnalyzer.js";
import ContentGenerator from "@/store/ContentGenerator.js";
import AiContentGenerator from "@/store/AiContentGenerator.js";
import Automation from "@/store/Automation.js";
import Outline from "@/store/Outline.js";
import PageSpeed from "@/store/PageSpeedAnalysis.js";
import ContentOptimizer from "@/store/ContentOptimizer.js";
import KeywordDiscovery from "@/store/KeywordDiscovery.js";
import Enterprise from "@/store/Enterprise.js";
import ImageGenerator from "@/store/ImageGenerator.js";
import meta_cms from "@/store/meta-cms.js";
export default {
  data() {
    return {
      permissions: localStorage.permissions,
      client: [],
      Keyword_Discovery: [],
      Keyword_Discovery_count: null,
      Enterprise_camp: [],
      Enterprise_count: null,
      Ai_ContentGenerator: [],
      Ai_ContentGenerator_count: null,
      ai_Automation: [],
      ai_Automation_count: null,
      cms_count: null,
      keyword_tracker_count: null,
      seo_quota: JSON.parse(localStorage.userInfo).free_nex_automate_quota + JSON.parse(localStorage.userInfo).used_nex_automate_quota,
      content_quota: JSON.parse(localStorage.userInfo).nexwriter_quota,
      discovery_quota: JSON.parse(localStorage.userInfo).free_keyword_query_quota + JSON.parse(localStorage.userInfo).used_keyword_query_quota,
      enterprise_quota: JSON.parse(localStorage.userInfo).free_indexability_quota + JSON.parse(localStorage.userInfo).used_indexability_quota,
    };
  },

  methods: {
    showAllCampaigns(feature) {
      if (feature == "meta_cms") {
        this.$router.push({
          name: "meta_cms",
          params: {
            id: this.$route.params.id,
            project: "project",
          },
        });
      } else if (feature == "keyword_tracker") {
        this.$router.push({
          name: "keyword_tracker",
          params: {
            id: this.$route.params.id,
            project: "project",
          },
        });
      } else {
        this.$router.push({
          name: "feature_pagination_table",
          params: {
            id: this.$route.params.id,
            feature: feature,
          },
        });
      }
    },
    openCampaign(feature, data) {
      if (feature == "keyword_discovery") {
        data.locations.forEach((element) => {
          this.locationId = element.id;
        });

        this.$router.push({
          name: "keyword_discovery",
          params: {
            id: data.id,
            location: this.locationId,
            project: this.$route.params.id,
          },
        });
      } else if (feature == "enterprise_seo") {
        this.$router.push({
          name: "enterprise_seo",
          params: {
            id: data.id,
            project: this.$route.params.id,
          },
        });
      } else if (feature == "content_image") {
        if (data.campaign_type == "blog_writer") {
          this.$router.push({
            name: "content_image_add_fields",
            params: {
              step: "content",
              id: data.id,
              category: "blog writing",
              project: this.$route.params.id,
            },
          });
        } else {
          this.$router.push({
            name: "content_image_add_fields",
            params: {
              step: "content",
              id: data.id,
              category: data.subtopic_case,
              project: this.$route.params.id,
            },
          });
        }
      } else if (feature == "ai_seo_automation") {
        this.$router.push({
          name: "ai_seo_automation_campaign",
          params: {
            id: data.id,
            location: data.location.id,
            project: this.$route.params.id,
          },
        });
      }
    },
    fetchCampaign() {
      KeywordDiscovery.fetchQueriesParam(`?&client_id=${this.$route.params.id}&page=1`)
        .then((response) => {
          this.Keyword_Discovery_count = response.data.data.total;

          response.data.data.data.forEach((element) => {
            // //
            this.Keyword_Discovery.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      Enterprise.fetchDatasParam(`?&client_id=${this.$route.params.id}&page=1`)
        .then((response) => {
          this.Enterprise_count = response.data.data.total;
          response.data.data.data.forEach((element) => {
            this.Enterprise_camp.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      AiContentGenerator.fetchContentCampaigns(`?&client_id=${this.$route.params.id}&page=1`)
        .then((response) => {
          this.Ai_ContentGenerator_count = response.data.data.total;
          response.data.data.data.forEach((element) => {
            // //
            this.Ai_ContentGenerator.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      Automation.fetchSeoAutomationParams(`?&client_id=${this.$route.params.id}&page=1`)
        .then((response) => {
          this.ai_Automation_count = response.data.data.total;
          response.data.data.data.forEach((element) => {
            // //
            this.ai_Automation.push(element);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      meta_cms
        .fetchRecommendations(this.$route.params.id)
        .then((response) => {
          this.cms_count = response.data.data.length;

          KeywordTracker.fetchRecommendations(this.$route.params.id)
            .then((response_tracker) => {
              this.cms_count = this.cms_count + response_tracker.data.data.length;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      KeywordTracker.fetchClientKeywords(this.$route.params.id)
        .then((response) => {
          this.keyword_tracker_count = response.data.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createContentImage() {
      this.$router.push({
        name: "content_image_add",
        params: {
          project: this.$route.params.id,
        },
      });
    },

    createKeywordDiscovery() {
      this.$router.push({
        name: "Keyword Discovery_Add Keyword",
        params: {
          project: this.$route.params.id,
        },
      });
    },

    createAiSeo() {
      this.$router.push({
        name: "AI SEO Automation_Add Keyword",
        params: {
          step: "topic_details",
          project: this.$route.params.id,
        },
      });
    },

    createEnterpriseSeo() {
      this.$router.push({
        name: "Enterprise SEO_Add Keyword",
        params: {
          project: this.$route.params.id,
        },
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

    KeywordTracker.fetchClient(this.$route.params.id)
      .then((response) => {
        this.client = response.data.data;
        loader.hide();
      })

      .catch((error) => {
        loader.hide();
        console.log(error);
      });

    this.fetchCampaign();
  },
};
</script>

<style lang="css" scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
  /* padding: 1.5rem; */
}

/* Project Card */
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
.projectinfo__img {
  display: flex;
  align-items: center;
  padding-right: 1rem;
}

p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.profile__icon {
  margin-left: auto;
}

.profile .material-icons-outlined {
  color: #1565c0 !important;
  font-size: 2.3rem;
  margin-left: 0.1rem;
  margin-top: 0.5rem;
}
.btn {
  height: 38px;
  white-space: nowrap;
  overflow: hidden;
}
.w-106px {
  width: 106px !important;
}
.nextable__head {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 0.5rem;
}
.nextable__head h6 {
  font-size: 18px;
  margin-top: 0.5rem;
}
</style>
