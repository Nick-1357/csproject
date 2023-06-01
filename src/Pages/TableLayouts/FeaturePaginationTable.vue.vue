<template>
  <div>
    <b-modal id="modal-assign-client" ref="modal-assign-client" centered hide-footer hide-header>
      <assign-client :reassign_id="reassign_id" />
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-3 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.id && MainTool.title == 'AI Content Generation'">
          <button @click="backContent()" class="material-icons-outlined btn-back">arrow_back</button>

          <router-link to="/dashboard" class="route__link">Dashboard</router-link>&nbsp;/
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.id },
            }"
            class="route__link"
            >Project</router-link
          >
          / {{ MainTool.title }}
        </p>
        <p class="text-muted fw-normal" v-else-if="$route.params.id">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>

          <router-link to="/dashboard" class="route__link">Dashboard</router-link>&nbsp;/
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.id },
            }"
            class="route__link"
            >Project</router-link
          >
          / {{ MainTool.title }}
        </p>

        <p class="text-muted fw-normal" v-else-if="MainTool.title == 'AI Content Generation'">
          <button @click="backContent()" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="/content_image/add_content" class="route__link">{{ MainTool.title }}</router-link>
          / View All
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / {{ MainTool.title }}
        </p>
      </div>

      <div class="nexcard">
        <!--Search and Add Keyword button -->
        <div class="d-flex mb-1">
          <div class="search input-group me-3 w-30" style="width: 500px">
            <span class="input-group-prepend">
              <div class="input-group-text bg-transparent">
                <span class="material-icons-outlined">search</span>
              </div>
            </span>
            <input
              type="search"
              id="form1"
              class="form-control border-left-0"
              placeholder="Search Keyword"
              autocorrect="off"
              autocomplete="off"
              @input="searchKeyword"
              v-model="search_keyword"
            />
          </div>

          <div class="me-3 w-20">
            <select
              v-if="this.$route.params.id == null"
              id="inputGroupSelect05"
              aria-label="Example select with button addon"
              v-model="chosenClient"
              @change="selectClient(lan)"
              class="form-select rounded w-100"
            >
              <option value="" disabled selected hidden>Project Filter</option>
              <option value="clear_filter">All Projects</option>
              <option :value="lan.id" :key="index" v-for="(lan, index) in submitClients">
                {{ lan.name }}
              </option>
            </select>
          </div>

          <div class="ms-auto me-3" v-if="MainTool.title == 'Image Generator'">
            <router-link
              :to="{
                name: MainTool.title + `_Add Keyword`,
                params: { step: 'topic_details' },
              }"
              class="route__link"
            >
              <button class="btn btn-primary">Add {{ MainTool.add }}</button>
            </router-link>
          </div>

          <div class="ms-auto" v-else-if="MainTool.title == 'AI SEO Automation'">
            <router-link
              v-if="$route.params.id"
              :to="{
                name: MainTool.title + `_Add Keyword`,
                params: { step: 'topic_details', project: $route.params.id },
              }"
              class="route__link"
            >
              <button class="btn btn-primary">Add {{ MainTool.add }}</button>
            </router-link>

            <router-link
              v-else
              :to="{
                name: MainTool.title + `_Add Keyword`,
                params: { step: 'topic_details' },
              }"
              class="route__link"
            >
              <button class="btn btn-primary">Add {{ MainTool.add }}</button>
            </router-link>
          </div>

          <div class="ms-auto" v-else-if="MainTool.title != 'AI SEO Automation' && MainTool.title != 'AI Content Generation'">
            <router-link
              v-if="$route.params.id"
              :to="{
                name: MainTool.title + `_Add Keyword`,
                params: { project: $route.params.id },
              }"
              class="route__link"
            >
              <button class="btn btn-primary">Add {{ MainTool.add }}</button>
            </router-link>
            <router-link
              v-else
              :to="{
                name: MainTool.title + `_Add Keyword`,
              }"
              class="route__link"
            >
              <button class="btn btn-primary">Add {{ MainTool.add }}</button>
            </router-link>
          </div>
        </div>
        <div class="nextable">
          <div class="nextable__head">
            <div class="row g-0">
              <div class="col" :class="title" v-for="(title, index) in MainTool.table_title" :key="'title' + index">
                <p>{{ title }}</p>
              </div>
            </div>
          </div>

          <div class="nextable__body" v-infinite-scroll="addData" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
            <div class="row nextable__row g-0" v-for="(item, index) in campaigns" :key="'item' + index">
              <!-- <div class="col profile">
                <img
                  :src="
                    require(`@/assets/icons/icon-blogwriting-blue.svg`)
                  "
                  alt=""
                  class="profile__icon"
                />
              </div> -->
              <!-- <div class="col campaign">
                <p>Demo Campaign</p>
                <div class="status">
                  <img
                    :src="require(`@/assets/icons/icon-status-pending.svg`)"
                    alt=""
                    class="status__icon"
                  />
                  <p class="status__text">pending</p>
                </div>
              </div> -->
              <!-- <div class="col"><p>Demo Project</p></div>
              <div class="col"><p>Demo</p></div>
              <div class="col"><p>Name</p></div>
              <div class="col fw-normal"><p>6 Apr 2023</p></div> -->

              <!-- ============================================================================= -->
              <!-- title with status -->
              <!-- ============================================================================= -->

              <div
                class="col campaign"
                v-if="
                  MainTool.title == 'Image Generator' ||
                  MainTool.title == 'Keyword Analyzer' ||
                  MainTool.title == 'Page Speed Insight' ||
                  MainTool.title == 'Enterprise SEO' ||
                  MainTool.title == 'Keyword Discovery' ||
                  MainTool.title == 'Content Optimizer'
                "
              >
                <!-- ============================================================================= -->
                <!--title-->
                <!-- ============================================================================= -->
                <p>
                  {{ item.title | capitalize }}
                </p>

                <!-- ============================================================================= -->
                <!-- Status acc to different feature-->
                <!-- ============================================================================= -->

                <div
                  class="status"
                  v-if="MainTool.title == 'Image Generator' || MainTool.title == 'Keyword Analyzer' || MainTool.title == 'Page Speed Insight' || MainTool.title == 'Enterprise SEO'"
                >
                  <div class="row" v-if="item.complete_percentage < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else>
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>

                <div class="status" v-if="MainTool.title == 'Outline Writer'">
                  <div class="row" v-if="item.completed < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else>
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ============================================================================= -->
              <!-- Keyword -->
              <!-- ============================================================================= -->
              <div
                class="col campaign"
                v-if="
                  MainTool.title == 'Content Generator' ||
                  MainTool.title == 'AI Content Generation' ||
                  MainTool.title == 'AI SEO Automation' ||
                  MainTool.title == 'Outline Writer' ||
                  MainTool.title == 'Image Generator' ||
                  MainTool.title == 'Keyword Analyzer' ||
                  MainTool.title == 'Keyword Discovery' ||
                  MainTool.title == 'Content Optimizer'
                "
              >
                <p>
                  {{ item.keyword | capitalize }}
                </p>

                <!-- ============================================================================= -->
                <!-- Status acc to different feature-->
                <!-- ============================================================================= -->

                <div class="status" v-if="MainTool.title == 'AI SEO Automation'">
                  <div class="row" v-if="item.complete_percentage < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else>
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>

                <div class="status" v-if="MainTool.title == 'AI Content Generation'">
                  <div class="row" v-if="item.count == 66 && item.completePercentage < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="item.count == 66 && item.completePercentage >= 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="item.generation_depth == 'new' && item.campaign_type != 'blog_writer' && item.completePercentage > 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="item.generation_depth == 'new' && item.campaign_type != 'blog_writer'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="item.status == 'Pending step 2' || item.status == 'Collecting Data'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="item.status == 'Done step 1' && item.completed >= 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="item.status == 'Complete the second step' && item.completed >= 100 && item.last_step == 'finish content generating'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="item.status == 'Complete the second step' && item.last_step == 'finishing to generate subtopics'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="item.status == 'Done step 1' && item.completed < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="item.status == 'Complete the second step' && item.completed < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="item.status == 'Done'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>

                <div class="status" v-if="MainTool.title == 'Content Generator'">
                  <div class="row" v-if="item.status == 'Pending step 2' || item.status == 'Collecting Data'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-if="item.status == 'Done step 1' && item.completed >= 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-if="item.status == 'Complete the second step' && item.completed >= 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <div class="row" v-if="item.status == 'Done step 1' && item.completed < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-if="item.status == 'Complete the second step' && item.completed < 100">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-if="item.status == 'Done'">
                    <div class="col no-bb">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ============================================================================= -->
              <!--Project name-->
              <!-- ============================================================================= -->
              <div class="col fw-normal" v-if="MainTool.title != 'AI SEO Automation'">
                <p>
                  {{ item.client_id | project_name }}
                </p>
              </div>

              <div class="col fw-normal" v-else>
                <p>
                  {{ item.client.name }}
                </p>
              </div>

              <!-- ============================================================================= -->
              <!--URL AI SEO AUTOMATION-->
              <!-- ============================================================================= -->
              <div class="col campaign" v-if="MainTool.title == 'AI SEO Automation'">
                <p v-if="item.type == 'general'">
                  {{ item.type | capitalize }}
                </p>
                <p v-else>Content Planner</p>

                <div class="status" v-if="item.url.length != 0">
                  <div class="row" v-b-tooltip.hover.top="{ variant: 'primary' }" :title="item.url">
                    <div class="col fw-normal">
                      <p class="text-muted">{{ item.url.slice(0, 35) }}...</p>
                    </div>
                  </div>
                </div>

                <div class="status" v-else>
                  <div class="row">
                    <div class="col fw-normal">
                      <p class="text-muted">No URL</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ============================================================================= -->
              <!--URL Others-->
              <!-- ============================================================================= -->
              <div class="col fw-normal" v-if="MainTool.title == 'Page Speed Insight' || MainTool.title == 'Enterprise SEO' || MainTool.title == 'Content Optimizer'">
                <p v-b-tooltip.hover.top="{ variant: 'primary' }" :title="item.url" class="text-muted">{{ item.url.slice(0, 35) }}...</p>
              </div>

              <!-- ============================================================================= -->
              <!--cOMPANY URL-->
              <!-- ============================================================================= -->
              <!-- <div class="col" v-if="MainTool.title == 'Content Generator'">
                <p>
                  {{ item.company_url }}
                </p>
              </div> -->

              <!-- ============================================================================= -->
              <!--image option-->
              <!-- ============================================================================= -->
              <div class="col fw-normal" v-if="MainTool.title == 'Image Generator'">
                <div>
                  <p>{{ item.style.value }}</p>
                </div>
              </div>

              <!-- ============================================================================= -->
              <!--AI CONTENT GENERATOR CASE-->
              <!-- ============================================================================= -->

              <!-- <div class="col" v-if="MainTool.title == 'AI Content Generation'">
                <p v-if="item.campaign_type == 'free_style'">Freestyle</p>
                <p v-else>Blog Writing</p>
              </div> -->

              <!-- ============================================================================= -->
              <!--AI CONTENT GENERATOR CATEGORY-->
              <!-- ============================================================================= -->

              <div class="col fw-normal" v-if="MainTool.title == 'AI Content Generation'">
                <p v-if="item.campaign_type == 'free_style'">
                  {{ item.subtopic_case | capitalize }}
                </p>
                <p v-else>Blog Writing</p>
              </div>

              <!-- ============================================================================= -->
              <!--LOCATION-->
              <!-- ============================================================================= -->

              <!-- <div class="col" v-if="MainTool.title == 'AI SEO Automation'">
                <p>{{ item.location.name }}</p>
              </div> -->

              <!-- ============================================================================= -->
              <!--CREATED DATE-->
              <!-- ============================================================================= -->
              <div
                class="col fw-normal col-thin"
                v-if="
                  MainTool.title == 'Content Generator' ||
                  MainTool.title == 'AI Content Generation' ||
                  MainTool.title == 'AI SEO Automation' ||
                  MainTool.title == 'Outline Writer' ||
                  MainTool.title == 'Image Generator' ||
                  MainTool.title == 'Keyword Analyzer' ||
                  MainTool.title == 'Page Speed Insight' ||
                  MainTool.title == 'Enterprise SEO' ||
                  MainTool.title == 'Keyword Discovery' ||
                  MainTool.title == 'Content Optimizer'
                "
              >
                <p>{{ item.created_at | formatDate }}</p>
              </div>

              <!-- ============================================================================= -->
              <!--LOCATION-->
              <!-- ============================================================================= -->

              <div class="col fw-normal col-thin" v-if="MainTool.title == 'Keyword Analyzer' || MainTool.title == 'Keyword Discovery' || MainTool.title == 'Content Optimizer'">
                <p v-for="(loc, index) in item.locations" :key="index">
                  {{ loc.name | loc }}
                </p>
              </div>

              <!-- ============================================================================= -->
              <!--CREATED BY-->
              <!-- ============================================================================= -->
              <div class="col fw-normal col-thin" v-if="MainTool.title == 'Content Generator' || MainTool.title == 'AI Content Generation' || MainTool.title == 'Outline Writer'">
                <p>{{ item.creator }}</p>
              </div>

              <!-- ============================================================================= -->
              <!--CREATED BY-->
              <!-- ============================================================================= -->
              <div
                class="col fw-normal col-thin"
                v-if="
                  MainTool.title == 'AI SEO Automation' ||
                  MainTool.title == 'Image Generator' ||
                  MainTool.title == 'Keyword Analyzer' ||
                  MainTool.title == 'Page Speed Insight' ||
                  MainTool.title == 'Enterprise SEO' ||
                  MainTool.title == 'Keyword Discovery' ||
                  MainTool.title == 'Content Optimizer'
                "
              >
                <p>{{ item.creator.name }}</p>
              </div>

              <!-- ============================================================================= -->
              <!--ACTION-->
              <!-- ============================================================================= -->

              <div class="col action">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
                    <span @click="select(item)" class="open"><span class="material-icons-outlined">file_open</span>Open</span>
                    <!-- <span class="star"
                      ><span class="material-icons-outlined">star_border</span
                      >Star</span
                    > -->
                    <span @click="share(item.id)" class="move"><span class="material-icons-outlined">forward</span>Move</span>
                    <span v-if="MainTool.title != 'AI SEO Automation'" @click="openFolder(item.client_id)" class="folder"
                      ><span class="material-icons-outlined">folder_open</span>Project</span
                    >
                    <span v-else @click="openFolder(item.client.id)" class="folder"><span class="material-icons-outlined">folder_open</span>Project</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="loading" class="d-flex justify-content-center mt-5 mb-3">
              <b-spinner variant="primary" label="Large Spinner"></b-spinner>
            </div>
          </div>
        </div>
      </div>
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
import KeywordDiscovery from "@/store/KeywordDiscovery.js";
import Enterprise from "@/store/Enterprise.js";
import ImageGenerator from "@/store/ImageGenerator.js";
import Auth from "@/store/Auth.js";
import assignClient from "@/Pages/Projects/ReassignProject.vue";
export default {
  name: "content_image_view_all",
  components: { assignClient },

  data() {
    return {
      MainTool: [],
      page: 0,
      campaigns: [],
      reassign_id: "",
      keywordTimeout: null,
      search_keyword: "",
      loading: true,
      submitClients: [],
      chosenClient: "",
    };
  },
  watch: {
    // $route() {
    //   this.assignTable();
    //   this.campaigns = [];
    //   this.page = 0;
    //   this.MainTool = [];
    //   this.addData();
    //   this.search_keyword = "";
    // },
  },
  methods: {
    backContent() {
      if (this.$route.params.id) {
        this.$router.push({
          name: "projects",
          params: {
            id: this.$route.params.id,
          },
        });
      } else {
        this.$router.push({
          name: "content_image_add",
        });
      }
    },
    openFolder(data) {
      this.$router.push({
        name: "projects",
        params: {
          id: data,
        },
      });
    },
    share(id) {
      this.reassign_id = id;
      this.$bvModal.show("modal-assign-client");
    },
    addKeyword(data) {
      if (data == "AI SEO Automation") {
      }
    },
    select(data) {
      if (this.$route.fullPath.includes("keyword_discovery")) {
        // this.$router.push({
        //   name: "keyword_discovery",
        // });
        data.locations.forEach((element) => {
          this.locationId = element.id;
        });

        if (this.$route.params.id) {
          this.$router.push({
            name: "keyword_discovery",
            params: {
              id: data.id,
              location: this.locationId,
              project: this.$route.params.id,
            },
          });
        } else {
          this.$router.push({
            name: "keyword_discovery",
            params: {
              id: data.id,
              location: this.locationId,
            },
          });
        }
      } else if (this.$route.fullPath.includes("keyword_analyzer")) {
        if (this.$route.params.client_id == "fromDefault") {
          if (data.complete_percentage >= 100) {
            data.locations.forEach((element) => {
              this.locationId = element.id;
            });

            this.$router.push({
              name: "Seo Analyzer Campaign",
              params: {
                id: data.id,
                locationID: this.locationId,
                client_id: data.client_id,
                fromDefault: "fromDefault",
              },
            });
            this.open = true;
          } else {
            data.locations.forEach((element) => {
              this.locationId = element.id;
            });

            this.$router.push({
              name: "ProgressPage",
              params: {
                id: data.id,
                locationID: this.locationId,
                client_id: data.client_id,
                fromDefault: "fromDefault",
              },
            });
          }
        } else {
          if (data.complete_percentage >= 100) {
            data.locations.forEach((element) => {
              this.locationId = element.id;
            });

            this.$router.push({
              name: "Seo Analyzer Campaign",
              params: {
                id: data.id,
                locationID: this.locationId,
                client_id: data.client_id,
              },
            });
            this.open = true;
          } else {
            data.locations.forEach((element) => {
              this.locationId = element.id;
            });

            this.$router.push({
              name: "ProgressPage",
              params: {
                id: data.id,
                locationID: this.locationId,
                client_id: data.client_id,
              },
            });
          }
        }
      } else if (this.$route.fullPath.includes("page_speed_insight")) {
        if (data.status == "ready") {
          if (this.$route.params.client_id == "fromDefault") {
            this.$router.push({
              name: "PageSpeedCampaign",
              params: {
                id: data.id,
                client_id: data.client_id,
                fromDefault: "fromDefault",
              },
            });
          } else {
            this.$router.push({
              name: "PageSpeedCampaign",
              params: {
                id: data.id,
                client_id: data.client_id,
              },
            });
          }
        }
      } else if (this.$route.fullPath.includes("content_optimizer")) {
        data.locations.forEach((element) => {
          this.locationId = element.id;
        });

        if (this.$route.params.client_id == "fromDefault") {
          this.$router.push({
            name: "WebsiteCampaign",
            params: {
              id: data.id,
              locationID: this.locationId,
              client_id: data.client_id,
              fromDefault: "fromDefault",
            },
          });
        } else {
          this.$router.push({
            name: "WebsiteCampaign",
            params: {
              id: data.id,
              locationID: this.locationId,
              client_id: data.client_id,
            },
          });
        }
      } else if (this.$route.fullPath.includes("enterprise_seo") || this.$route.fullPath.includes("Addition")) {
        if (this.$route.params.id) {
          this.$router.push({
            name: "enterprise_seo",
            params: {
              id: data.id,
              project: this.$route.params.id,
            },
          });
        } else {
          this.$router.push({
            name: "enterprise_seo",
            params: {
              id: data.id,
            },
          });
        }
      } else if (this.$route.fullPath.includes("image_generator")) {
        this.$router.push({
          name: "Image Generator_Add Keyword",
          params: {
            step: "result",
            id: data.id,
          },
        });
      } else if (this.$route.fullPath.includes("content_generator")) {
        if (data.completed >= 100 && data.status == "Done step 1") {
          this.$router.push({
            name: "OrganicSeoGeneratedContent",
            params: {
              id: data.id,
              complete: data.completed,
              client_id: data.client_id,
            },
          });
        } else if (data.completed >= 100 && data.status == "Complete the second step") {
          this.$router.push({
            name: "OrganicSeoGeneratedContentLastStep",
            params: {
              id: data.id,
              complete: data.completed,
              client_id: data.client_id,
            },
          });
        } else if (data.status == "Done") {
          this.$router.push({
            name: "OrganicSeoGeneratedContentLastStep",
            params: {
              id: data.id,
              complete: data.completed,
              client_id: data.client_id,
            },
          });
        } else if (data.status == "Pending step 2" || data.status == "Collecting Data") {
          this.$toast.info("The campaign is still processing");

          // this.$bvToast.toast("The campaign is still processing", {
          //   title: "Info",
          //   variant: "info",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
        }
      } else if (this.$route.fullPath.includes("content_image")) {
        if (data.campaign_type == "blog_writer") {
          if (this.$route.params.id) {
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
                category: "blog writing",
              },
            });
          }
        } else {
          if (this.$route.params.id) {
            this.$router.push({
              name: "content_image_add_fields",
              params: {
                step: "content",
                id: data.id,
                category: data.subtopic_case,
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
              },
            });
          }
        }
      } else if (this.$route.fullPath.includes("ai_seo_automation")) {
        if (data.type == "general") {
          if (this.$route.params.id) {
            this.$router.push({
              name: "ai_seo_automation_campaign",
              params: {
                id: data.id,
                location: data.location.id,
                project: this.$route.params.id,
              },
            });
          } else {
            this.$router.push({
              name: "ai_seo_automation_campaign",
              params: {
                id: data.id,
                location: data.location.id,
              },
            });
          }
        } else {
          console.log("data.step.current_step", data.step.current_step);
          if (data.step.current_step == 1) {
            if (this.$route.params.id) {
              this.$router.push({
                name: "ai_seo_automation_campaign_recommended",
                params: {
                  id: data.id,
                  location: data.location.id,
                  project: this.$route.params.id,
                },
              });
            } else {
              this.$router.push({
                name: "ai_seo_automation_campaign_recommended",
                params: {
                  id: data.id,
                  location: data.location.id,
                },
              });
            }
          } else {
            if (this.$route.params.id) {
              this.$router.push({
                name: "ai_seo_automation_campaign_planner",
                params: {
                  id: data.id,
                  location: data.location.id,
                  project: this.$route.params.id,
                },
              });
            } else {
              this.$router.push({
                name: "ai_seo_automation_campaign_planner",
                params: {
                  id: data.id,
                  location: data.location.id,
                },
              });
            }
          }
        }
      } else if (this.$route.fullPath.includes("outline")) {
        if (this.$route.params.client_id == "fromDefault") {
          if (data.completed >= 100) {
            this.$router.push({
              name: "OutlineGeneratedContent",
              params: {
                id: data.id,
                client_id: data.client_id,
                fromDefault: "fromDefault",
              },
            });
          }
        } else {
          if (data.completed >= 100) {
            this.$router.push({
              name: "OutlineGeneratedContent",
              params: { id: data.id, client_id: data.client_id },
            });
          }
        }
      }
    },

    searchKeyword() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities();
      }, 500);
    },
    searchCampaign(obj) {
      if (this.$route.fullPath.includes("keyword_discovery")) {
        KeywordDiscovery.fetchQueriesParam(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("keyword_analyzer")) {
        KeywordAnalyzer.searchClientCampaigns(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("page_speed_insight")) {
        PageSpeed.fetchPagesParam(obj)
          .then((response) => {
            // //

            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_optimizer")) {
        ContentOptimizer.fetchWebsitesParam(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("enterprise_seo") || this.$route.fullPath.includes("Addition")) {
        Enterprise.searchClientCampaigns(obj)
          .then((response) => {
            // //

            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("image_generator")) {
        ImageGenerator.searchArtCampaigns(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_generator")) {
        ContentGenerator.fetchContentCampaigns(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_image")) {
        AiContentGenerator.fetchContentCampaigns(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("ai_seo_automation")) {
        Automation.fetchSeoAutomationParams(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("outline")) {
        Outline.fetchContentCampaigns(obj)
          .then((response) => {
            this.campaigns = response.data.data.data;
          })

          .catch((error) => {
            console.log(error);
          });
      }
    },
    fetchCampaign(obj) {
      if (this.$route.fullPath.includes("keyword_discovery")) {
        KeywordDiscovery.fetchQueriesParam(obj)
          .then((response) => {
            // //
            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });

            this.loading = false;

            // //
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("keyword_analyzer")) {
        KeywordAnalyzer.fetchClientCampaignsPage(obj)
          .then((response) => {
            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("page_speed_insight")) {
        PageSpeed.fetchPagesParam(obj)
          .then((response) => {
            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });

            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_optimizer")) {
        ContentOptimizer.fetchWebsitesParam(obj)
          .then((response) => {
            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });

            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("enterprise_seo")) {
        Enterprise.fetchDatasParam(obj)
          .then((response) => {
            response.data.data.data.forEach((element) => {
              this.campaigns.push(element);
            });

            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("image_generator")) {
        ImageGenerator.fetchArtCampaigns(obj)
          .then((response) => {
            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });

            this.loading = false;

            // //
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_generator")) {
        ContentGenerator.fetchContentCampaigns(obj)
          .then((response) => {
            // //

            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });
            this.loading = false;

            // //
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("content_image")) {
        AiContentGenerator.fetchContentCampaigns(obj)
          .then((response) => {
            // //

            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });
            this.loading = false;
            // //
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("ai_seo_automation")) {
        Automation.fetchSeoAutomationParams(obj)
          .then((response) => {
            // //

            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });
            this.loading = false;
            // //
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.$route.fullPath.includes("outline")) {
        Outline.fetchContentCampaigns(obj)
          .then((response) => {
            response.data.data.data.forEach((element) => {
              // //
              this.campaigns.push(element);
            });

            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            loader.hide();
          });
      }
    },
    addData() {
      this.loading = true;
      this.page = this.page + 1;
      var obj = {};

      if (this.search_keyword == null || this.search_keyword == "") {
        if (this.$route.params.id != null) {
          obj = `?&client_id=${this.$route.params.id}&page=${this.page}`;
        } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
          obj = `?&client_id=${this.chosenClient}&page=${this.page}`;
        } else {
          //

          obj = `?&page=${this.page}`;
        }
      } else {
        if (this.$route.params.id != null) {
          obj = `?keyword=${this.search_keyword}&client_id=${this.$route.params.id}&page=${this.page}`;
        } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
          obj = `?keyword=${this.search_keyword}&client_id=${this.chosenClient}&page=${this.page}`;
        } else {
          //

          obj = `?keyword=${this.search_keyword}&page=${this.page}`;
        }
      }

      this.fetchCampaign(obj);
    },

    getActivities() {
      this.loading = false;
      var obj = {};

      this.page = 1;
      if (this.search_keyword == null || this.search_keyword == "") {
        if (this.$route.params.id != null) {
          obj = `?&client_id=${this.$route.params.id}&page=${this.page}`;
        } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
          obj = `?&client_id=${this.chosenClient}&page=${this.page}`;
        } else {
          //

          obj = `?&page=${this.page}`;
        }
      } else {
        if (this.$route.params.id != null) {
          obj = `?keyword=${this.search_keyword}&client_id=${this.$route.params.id}&page=${this.page}`;
        } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
          obj = `?keyword=${this.search_keyword}&client_id=${this.chosenClient}&page=${this.page}`;
        } else {
          //

          obj = `?keyword=${this.search_keyword}&page=${this.page}`;
        }
      }

      this.searchCampaign(obj);
    },

    selectClient() {
      console.log(this.chosenClient);
      this.loading = true;
      var obj = {};

      this.page = 1;
      this.search_keyword = "";
      if (this.chosenClient == "") {
        console.log(this.chosenClient);
      } else if (this.chosenClient == "clear_filter") {
        obj = `?page=${this.page}`;
        this.campaigns = [];

        this.fetchCampaign(obj);
      } else {
        obj = `?&client_id=${this.chosenClient}&page=${this.page}`;
        this.campaigns = [];

        this.fetchCampaign(obj);
      }
    },

    chooseAdd() {
      if (this.$route.fullPath.includes("enterprise_seo")) {
        this.$bvModal.show("modal-center-crawl");
      } else if (this.$route.fullPath.includes("image_generator")) {
        this.$router.push({
          name: "NexArtGenerate",
          params: {
            client_id: "fromDefault",
          },
        });
      } else if (this.$route.fullPath.includes("content_image")) {
        this.$router.push({ name: "choose_nexwriter_case" });
      } else {
        this.$bvModal.show("modal-center");
      }
    },

    assignTable() {
      if (this.$route.fullPath.includes("keyword_discovery")) {
        this.MainTool = {
          title: "Keyword Discovery",
          add: "Keyword",
          table_title: ["Title", "Keyword", "Project", "Created Date", "Target Location", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("keyword_analyzer")) {
        this.MainTool = {
          title: "Keyword Analyzer",
          add: "Keyword",
          table_title: ["Title", "Keyword", "Project", "Target Location", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("page_speed_insight")) {
        this.MainTool = {
          title: "Page Speed Insight",
          add: "Page",
          table_title: ["Title", "Project", "URL", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("content_optimizer")) {
        this.MainTool = {
          title: "Content Optimizer",
          add: "Content",
          table_title: ["Title", "Keyword", "Project", "URL", "Target Location", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("enterprise_seo") || this.$route.fullPath.includes("Addition")) {
        this.MainTool = {
          title: "Enterprise SEO",
          add: "Page",
          table_title: ["Title", "Project", "URL", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("image_generator")) {
        this.MainTool = {
          title: "Image Generator",
          add: "Campaign",
          table_title: ["Title", "Keyword", "Project", "Style", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("content_generator")) {
        this.MainTool = {
          title: "Content Generator",
          add: "Content",
          table_title: ["Keyword", "Project", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("content_image")) {
        this.MainTool = {
          title: "AI Content Generation",
          add: "Content",
          table_title: ["Keyword", "Project", "Generation Type", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("ai_seo_automation")) {
        this.MainTool = {
          title: "AI SEO Automation",
          add: "Keyword",
          table_title: ["Keyword", "Project", "Generation Type", "Created Date", "Created By", "Action"],
        };
      } else if (this.$route.fullPath.includes("outline")) {
        this.MainTool = {
          title: "Outline Writer",
          add: "Content",
          table_title: ["Keyword", "Project", "Created Date", "Created By", "Action"],
        };
      }
    },

    afterCreated() {
      this.page = 1;
      this.search_keyword = "";
      this.$bvModal.hide("modal-success-seo");
      var obj = "";

      if (
        this.$route.fullPath.includes("page_speed_insight") ||
        this.$route.fullPath.includes("enterprise_seo") ||
        this.$route.fullPath.includes("content_generator") ||
        this.$route.fullPath.includes("ai_seo_automation") ||
        this.$route.fullPath.includes("outline")
      ) {
        obj = `?&page=1`;
        this.campaigns = [];
        this.fetchCampaign(obj);
      }
    },
  },
  created() {
    this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) => a.name.localeCompare(b.name));

    this.assignTable();
  },
  destroyed() {
    clearInterval(this.timer);
    localStorage.removeItem("project_for_seo_automation");
    localStorage.removeItem("seo_automation_data_create");
    localStorage.removeItem("content_planner_h1");
    localStorage.removeItem("content_planner_planners");
    localStorage.removeItem("content_planner_description");
    localStorage.removeItem("content_planner_title");
    localStorage.removeItem("content_planner_faq");
    localStorage.removeItem("content_planner_subtopic");
    localStorage.removeItem("content_planner_final_content");
    localStorage.removeItem("ai_seo_content");
  },

  // destroyed() {
  //   localStorage.removeItem("project_for_seo_automation");
  //   localStorage.removeItem("seo_automation_data_create");
  // },
  mounted() {
    if (this.$route.fullPath.includes("content_image")) {
      this.timer = setInterval(() => {
        var filtered = [];
        var obj = "";
        //console.log("page",this.page)

        for (var i = 1; i <= this.page; i++) {
          //console.log("val", i)

          if (this.search_keyword == null || this.search_keyword == "") {
            if (this.$route.params.id != null) {
              obj = `?&client_id=${this.$route.params.id}&page=${i}`;
            } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
              obj = `?client_id=${this.chosenClient}&page=${i}`;
            } else {
              //

              obj = `?&page=${i}`;
            }
          } else {
            if (this.$route.params.id != null) {
              obj = `?keyword=${this.search_keyword}&client_id=${this.$route.params.id}&page=${i}`;
            } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
              obj = `?keyword=${this.search_keyword}&client_id=${this.chosenClient}&page=${i}`;
            } else {
              //

              obj = `?keyword=${this.search_keyword}&page=${i}`;
            }
          }

          AiContentGenerator.fetchContentCampaigns(obj)
            .then((response) => {
              response.data.data.data.forEach((element) => {
                this.campaigns.forEach((element2) => {
                  if (element.id == element2.id) {
                    element2.completePercentage = element.completePercentage;
                    element2.count = element.count;
                    element2.status = element.status;
                    element2.last_step = element.last_step;
                  }
                });
              });
            })

            .catch((error) => {
              console.log(error);
            });
        }
      }, 10000);
    } else if (this.$route.fullPath.includes("ai_seo_automation")) {
      this.timer = setInterval(() => {
        var filtered = [];
        var obj = "";
        //console.log("page",this.page)

        for (var i = 1; i <= this.page; i++) {
          if (this.search_keyword == null || this.search_keyword == "") {
            if (this.$route.params.id != null) {
              obj = `?&client_id=${this.$route.params.id}&page=${i}`;
            } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
              obj = `?client_id=${this.chosenClient}&page=${i}`;
            } else {
              //

              obj = `?&page=${i}`;
            }
          } else {
            if (this.$route.params.id != null) {
              obj = `?keyword=${this.search_keyword}&client_id=${this.$route.params.id}&page=${i}`;
            } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
              obj = `?keyword=${this.search_keyword}&client_id=${this.chosenClient}&page=${i}`;
            } else {
              //

              obj = `?keyword=${this.search_keyword}&page=${i}`;
            }
          }

          Automation.fetchSeoAutomationParams(obj)
            .then((response) => {
              response.data.data.data.forEach((element) => {
                this.campaigns.forEach((element2) => {
                  if (element.id == element2.id) {
                    element2.complete_percentage = element.complete_percentage;
                  }
                });
              });
            })

            .catch((error) => {
              console.log(error);
            });
        }
      }, 10000);
    } else if (this.$route.fullPath.includes("enterprise_seo")) {
      this.timer = setInterval(() => {
        var filtered = [];
        var obj = "";
        //console.log("page",this.page)

        for (var i = 1; i <= this.page; i++) {
          if (this.search_keyword == null || this.search_keyword == "") {
            if (this.$route.params.id != null) {
              obj = `?&client_id=${this.$route.params.id}&page=${i}`;
            } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
              obj = `?client_id=${this.chosenClient}&page=${i}`;
            } else {
              //

              obj = `?&page=${i}`;
            }
          } else {
            if (this.$route.params.id != null) {
              obj = `?keyword=${this.search_keyword}&client_id=${this.$route.params.id}&page=${i}`;
            } else if (this.chosenClient != "clear_filter" && this.chosenClient != "") {
              obj = `?keyword=${this.search_keyword}&client_id=${this.chosenClient}&page=${i}`;
            } else {
              //

              obj = `?keyword=${this.search_keyword}&page=${i}`;
            }
          }

          Enterprise.fetchDatasParam(obj)
            .then((response) => {
              response.data.data.data.forEach((element) => {
                this.campaigns.forEach((element2) => {
                  if (element.id == element2.id) {
                    element2.complete_percentage = element.complete_percentage;
                  }
                });
              });
            })

            .catch((error) => {
              console.log(error);
            });
        }
      }, 10000);
    }
  },
};
</script>

<style lang="css" scoped>
.view-all-table-wrapper {
  position: relative;
  max-width: calc(1600px + 3rem);
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.nextable {
  flex-direction: column;
}

.nextable .nextable__head {
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body {
  overflow-y: scroll;
  position: relative;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body {
    height: 55vh;
  }
}
.nextable .nextable__head {
  margin-right: 8px;
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
  background-color: #fff;
  white-space: nowrap;
}
.nextable .nextable__head .col.profile {
  text-align: end;
  max-width: 100px;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__row {
  border-bottom: 1px solid #e6e6e6;
  transition: 0.4s ease-out;
}
.nextable .nextable__row:hover {
  background-color: #f5f5f7;
  cursor: pointer;
  transition: 0.4s ease-out;
}
.nextable .nextable__row .col {
  padding: 1rem;
  align-items: start;
  display: flex;
}
.nextable .nextable__row .col.no-bb {
  border-bottom: none;
}
.nextable .nextable__row .col.profile {
  text-align: end;
  max-width: 100px;
  justify-content: end;
}
.nextable .nextable__row .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
/* .nextable .nextable__row .col:last-child {
  text-align: center;
  max-width: 100px;
} */
p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.col.campaign {
  display: flex;
  flex-direction: column;
  align-items: start !important;
}
.profile img {
  max-height: 35px;
  margin-top: 5px;
}
.fw-normal p {
  font-weight: normal;
}

.btn-action {
  color: #707070;
  margin: 0 auto;
  border-radius: 50%;
  padding: 2px;
}
.btn-action:hover {
  background-color: var(--color-primary-light);
  border-radius: 50%;
  transition: all 0.3s ease-out;
}
.status {
  display: flex;
}

.status .col {
  padding: 0.2rem 0.9rem !important;
}
.status__icon {
  max-height: 18px;
  margin-top: 2px;
  margin-left: 0px;
}
.status__text {
  font-weight: normal;
  color: #707070;
  margin-left: 0.4rem;
  text-transform: capitalize;
}
.profile__icon {
  margin-left: auto;
}

/* action menu css */
.action-menu-dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  text-align: left;
  transform: translate(-80px, -10px);
  width: 120px;
  color: #272727;
}
.action-menu:hover .action-menu-dropdown {
  display: flex;
}
.action-menu-dropdown span {
  cursor: pointer;
  user-select: none;
  padding: 0.1rem 0.5rem 0.1rem 0.2rem;
  margin: 0.1rem 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #707070;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
  color: #707070;
}

.input-group-text .material-icons-outlined {
  color: #707070;
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;
  color: grey;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;
}
.action-menu-dropdown span:hover.edit,
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;
}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;
}
.action-menu-dropdown span:hover.folder {
  transition: all 0.2s ease-out;
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

.col-thin,
.Created,
.Target {
  max-width: 150px;
  overflow: hidden;
}
</style>
