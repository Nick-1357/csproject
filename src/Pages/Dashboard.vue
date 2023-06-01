<template>
  <div>
    <b-modal id="modal-center-add-domain" centered hide-footer hide-header>
      <create-project />
    </b-modal>

    <div class="dashboard us-0">
      <div class="d-flex align-items-center mb-4">
        <h2 class="fw-600 text-darkgreen">Welcome {{ name }}</h2>
        <div class="ms-auto" v-if="ai_Automation_count != 0 || Ai_ContentGenerator_count != 0">
          <!-- <button v-if="permissions.includes('nexrank-client.store')" class="btn btn-primary d-flex align-items-center" v-b-modal.modal-center-add-domain>
            <span class="material-icons-outlined"> add </span>
            <span class="ms-2 fw-600" style="padding-bottom: 2px">Create Project</span>
          </button> -->
        </div>
      </div>
      <!-- v-if="ai_Automation_count == 0 || ai_Automation_count == null || Ai_ContentGenerator_count == 0 || Ai_ContentGenerator_count == null" -->
      <div class="nexcard">
        <div class="nexcard-heading d-flex">
          <h4 class="text-muted">Explore with Nexmind</h4>
          <!-- <button type="button" class="btn btn-tooltip" data-toggle="tooltip" data-placement="bottom" title="Tooltip on right">
            <span class="material-icons-outlined">help_outline</span>
          </button> -->
        </div>
        <div class="nexcard-body pt-4 pb-2 container">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column justify-content-center" style="width: 200px">
              <div class="d-flex align-items-center">
                <span class="material-icons-outlined">play_circle_outline</span>
                <span class="row-text ms-2">Complete Tutorial</span>
              </div>
              <button @click="watchTutorial()" class="btn btn-primary mt-3" style="width: 150px; margin: 1rem auto 0">Watch</button>
            </div>

             <div class="pe-3">
              <hr />
            </div>

            <div class="d-flex flex-column justify-content-center" style="width: 200px">
              <div class="d-flex align-items-center">
                <span class="material-icons-outlined">create_new_folder</span>
                <span class="row-text ms-2">Create your First Project</span>
              </div>

               <!-- v-if="project_count.length == 0 || project_count.length == null" -->
              <router-link
                v-if="project_count.length == 0 || project_count.length == null"
                class="router__link_dashboard btn btn-primary mt-3"
                style="width: 150px; margin: 1rem auto 0"
                :to="{
                  name: 'create_project',
               
                }"
              >
                Start
              </router-link>

              <!--tick # green color--->
              <div class="d-flex align-items-center mt-3" v-else>
                <span class="material-icons-outlined text-green m-auto"> task_alt </span>
              </div>
            </div>


            <div v-if="permissions.includes('Seo-Automation.index') && seo_quota > 0" class="pe-3">
              <hr />
            </div>

            <div v-if="permissions.includes('Seo-Automation.index') && seo_quota > 0" class="d-flex flex-column justify-content-center" style="width: 200px">
              <div class="d-flex align-items-center">
                <span class="material-icons-outlined">psychology</span>
                <span class="row-text ms-2">Start Your First Automation</span>
              </div>
              <router-link
                v-if="ai_Automation_count == 0 || ai_Automation_count == null"
                class="router__link_dashboard btn btn-primary mt-3"
                style="width: 150px; margin: 1rem auto 0"
                :to="{
                  name: 'AI SEO Automation_Add Keyword',
                  params: { step: 'topic_details' },
                }"
              >
                Start
              </router-link>

              <!--tick # green color--->
              <div class="d-flex align-items-center mt-3" v-else>
                <span class="material-icons-outlined text-green m-auto"> task_alt </span>
              </div>
            </div>

            <div v-if="permissions.includes('Nexwriter.index') && content_quota > 0" class="px-3">
              <hr />
            </div>

            <div v-if="permissions.includes('Nexwriter.index') && content_quota > 0" class="d-flex flex-column justify-content-center ps-1" style="width: 200px">
              <div class="d-flex align-items-center">
                <span class="material-icons-outlined">drive_file_rename_outline</span>

                <span class="row-text ms-2">Create Your First Content</span>
              </div>
              <router-link
                v-if="Ai_ContentGenerator_count == 0 || Ai_ContentGenerator_count == null"
                class="router__link_dashboard btn btn-primary mt-3"
                style="width: 150px; margin: 1rem auto 0"
                :to="{
                  name: 'content_image_add_fields',
                  params: {
                    category: 'blog writing',
                    step: 'topic_details',
                  },
                }"
              >
                Start
              </router-link>

              <div class="d-flex align-items-center mt-3" v-else>
                <span class="material-icons-outlined text-green m-auto"> task_alt </span>
              </div>
            </div>
          </div>
          <!-- <div class="col-2">
              <div
                class="d-flex flex-column"
                style="
                  place-items: center;
                  border-radius: 50%;
                  padding: 0rem 0rem 1rem 0rem;
                  margin-top: -1rem;
                "
              >
                <span class="material-icons-outlined mt-3">thumb_up</span>
                <h5 class="mt-3">Well Done</h5>
              </div>
            </div> -->
        </div>
      </div>

      <div class="nexcard my-5 us-0">
        <div class="nexcard-heading d-flex align-items-center">
          <h4 class="text-muted">What would you like to do today?</h4>
          <!-- <button type="button" class="btn btn-tooltip" data-toggle="tooltip" data-placement="bottom" title="Tooltip on right">
            <span class="material-icons-outlined">help_outline</span>
          </button> -->
          <!-- REENA -->

          <div class="ms-auto">
            <!-- <button @click="toggleMenu('widgets')">
            
              <span
                id="hoverBtnDashboard1"
                class="material-icons-outlined btn-editDashboard"
                >widgets</span
              >
              <b-popover
                :target="'hoverBtnDashboard1'"
                triggers="hover"
                placement="left"
                custom-class="popover"
                ><template>Edit Dashboard Widgets</template></b-popover
              >
            </button> -->
          </div>
        </div>
        <div class="nexcard-body">
          <!-- AI SEO -->
          <div class="mt-4" v-if="show_seo_categories.length != 0">
            <h6 class="fw-bold text-darkgrey" v-if="showAiSeo > 0">AI SEO (1 credit per Campaign)</h6>
            <div class="container dashboard__apps">
              <div class="row py-2">
                <div v-show="permissions.includes(n.permission) && n.quota > 0" class="col-size" v-for="(n, index) in show_seo_categories" :key="'seo_caegories' + index">
                  <div @click="OpenPage(n.title)" class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined">screen_search_desktop</span> -->
                    <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
                    <span class="text">{{ n.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Blog Writing -->
          <div v-if="permissions.includes('Nexwriter.index') && content_quota > 0" class="content_image d-flex align-items-center mt-1">
            <h6 class="fw-bold text-darkgrey">AI Content Generation</h6>

            <div class="ms-1 mb-1">
              <button @click="showAllCampaigns()">
                <span id="hoverBtnDashboard_view" class="material-icons-outlined btn-viewlist me-2">arrow_forward</span>
                <b-popover :target="'hoverBtnDashboard_view'" triggers="hover" placement="right" custom-class="custom__popover"><template>View All Campaigns</template></b-popover>
              </button>
            </div>
          </div>

          <div v-show="permissions.includes('Nexwriter.index') && content_quota > 0" class="mt-4" v-if="show_Cases_blogwriting.length != 0">
            <h6 class="text-darkgrey">Blog Writing (4 credits)</h6>
            <div class="container dashboard__apps">
              <div class="row py-2">
                <div class="col-size" v-for="(n, index) in show_Cases_blogwriting" :key="'Cases_blogwriting' + index">
                  <div @click="addContent(n.title)" class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined">description</span> -->
                    <img src="@/assets/icons/icon-blog-writing.svg" alt="" />
                    <span class="text">{{ n.title | capitalize }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="permissions.includes('Nexwriter.index') && content_quota > 0" class="mt-4" v-if="show_Cases_long.length != 0">
            <h6 class="text-darkgrey">Freestyle (4 credits)</h6>
            <div class="container dashboard__apps">
              <div class="row py-2">
                <div class="col-size" v-for="(n, index) in show_Cases_long" :key="'Cases_long' + index">
                  <div @click="addContent(n.title)" class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined">description</span> -->
                    <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
                    <span class="text">{{ n.title | capitalize }}</span>
                  </div>
                </div>

                <div class="col-size" v-if="show_Cases_long.length < 5" @click="choose_category('Freestyle')">
                  <div class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined grey">east</span> -->
                    <img src="@/assets/icons/icon-view-list.svg" alt="" />
                    <span class="text">View Others</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="permissions.includes('Nexwriter.index') && content_quota > 0" class="mt-4" v-if="show_Cases_short_Adv.length != 0">
            <h6 class="text-darkgrey">Advertisement (1 credit)</h6>
            <div class="container dashboard__apps">
              <div class="row py-2">
                <div class="col-size" v-for="(n, index) in show_Cases_short_Adv" :key="'Cases_short_Adv' + index">
                  <div @click="addContent(n.title)" class="dashboard__app d-flex flex-column justify-content-center">
                    <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
                    <span class="text">{{ n.title | capitalize }}</span>
                  </div>
                </div>

                <div class="col-size" v-if="show_Cases_short_Adv.length < 5" @click="choose_category('Advertisement')">
                  <div class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined grey">east</span> -->
                    <img src="@/assets/icons/icon-view-list.svg" alt="" />
                    <span class="text">View Others</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="permissions.includes('Nexwriter.index') && content_quota > 0" class="mt-4" v-if="show_Cases_short_Post.length != 0">
            <h6 class="text-darkgrey">Post and captions idea (1 credit)</h6>
            <div class="container dashboard__apps">
              <div class="row py-2">
                <div class="col-size" v-for="(n, index) in show_Cases_short_Post" :key="'Cases_short_Post' + index">
                  <div @click="addContent(n.title)" class="dashboard__app d-flex flex-column justify-content-center">
                    <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
                    <span class="text">{{ n.title | capitalize }}</span>
                  </div>
                </div>

                <div class="col-size">
                  <div v-if="show_Cases_short_Post.length < 5" @click="choose_category('Post and Captions Idea')" class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined grey">east</span> -->
                    <img src="@/assets/icons/icon-view-list.svg" alt="" />
                    <span class="text">View Others</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="permissions.includes('Nexwriter.index') && content_quota > 0" class="mt-4" v-if="show_Cases_short_Prod.length != 0">
            <h6 class="text-darkgrey">E-commerce (1 credit)</h6>
            <div class="container dashboard__apps">
              <div class="row py-2">
                <div class="col-size" v-for="(n, index) in show_Cases_short_Prod" :key="'Cases_short_Prod' + index">
                  <div @click="addContent(n.title)" class="dashboard__app d-flex flex-column justify-content-center">
                    <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
                    <span class="text">{{ n.title | capitalize }}</span>
                  </div>
                </div>

                <div class="col-size">
                  <div v-if="show_Cases_short_Prod.length < 3" @click="choose_category('E-commerce')" class="dashboard__app d-flex flex-column justify-content-center">
                    <!-- <span class="material-icons-outlined grey">east</span> -->
                    <img src="@/assets/icons/icon-view-list.svg" alt="" />
                    <span class="text">View Others</span>
                  </div>
                </div>
                <div class="col-size"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard blue-bg mb-5 d-flex">
        <div class="me-auto d-flex flex-column">
          <h3 class="text-white fw-bold">Go Super Mind!</h3>
          <p class="text-white">Get full access to the full mode and other features</p>
          <router-link to="/pricing" class="mt-auto">
            <button class="btn btn-white">Upgrade Now</button>
          </router-link>
        </div>
        <div>
          <img src="../assets/dashboard/dashboard-upgrade.png" alt="upgrade" style="height: 150px" />
        </div>
      </div>

      <div class="nexcard grey-bg d-flex">
        <div class="me-auto d-flex flex-column">
          <h3 class="text-primary fw-bold">Join Our Community</h3>
          <p class="text-muted">Join with us in social media, Get all latest updates</p>
          <div class="d-flex mt-auto socials">
            <a href="https://my.linkedin.com/company/nexmind-ai" target="_blank" class="me-5">
              <img src="../assets/icons/icon-linkedin-blue.svg" alt="linkedin" style="height: 40px" />
            </a>
            <a href="https://www.quora.com/profile/NexMind-AI" target="_blank" class="me-5">
              <img src="../assets/icons/icon-quora-blue.svg" alt="quora" style="height: 40px" />
            </a>
            <a href="https://www.reddit.com/user/Nexmind/" target="_blank" class="me-5">
              <img src="../assets/icons/icon-reddit-blue.svg" alt="reddit" style="height: 40px" />
            </a>
          </div>
        </div>
        <div>
          <img src="../assets/dashboard/dashboard-community.png" alt="upgrade" style="height: 150px" />
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path"> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import AiContentGenerator from "@/store/AiContentGenerator.js";
import Automation from "@/store/Automation.js";
import createProject from "@/Pages/Projects/createProject.vue";
export default {
  name: "Dashboard",
  components: { createProject },
  data() {
    return {
      n: 1,
      permissions: localStorage.permissions,
      name: JSON.parse(localStorage.userInfo).name,
      seo_quota: JSON.parse(localStorage.userInfo).free_nex_automate_quota + JSON.parse(localStorage.userInfo).used_nex_automate_quota,
      content_quota: JSON.parse(localStorage.userInfo).nexwriter_quota,
      Ai_ContentGenerator_count: 0,
      ai_Automation_count: 0,
      project_count:JSON.parse(localStorage.nexrank_client),
      showAiSeo:
        JSON.parse(localStorage.userInfo).free_keyword_query_quota +
        JSON.parse(localStorage.userInfo).used_keyword_query_quota +
        JSON.parse(localStorage.userInfo).keywords_qouta +
        JSON.parse(localStorage.userInfo).free_nex_automate_quota +
        JSON.parse(localStorage.userInfo).used_nex_automate_quota +
        JSON.parse(localStorage.userInfo).used_indexability_quota +
        JSON.parse(localStorage.userInfo).free_indexability_quota,
      seo_caegories: [
        {
          title: "Keyword Discovery",
          icon: "icon-keyword-discovery",
          permission: "keyword_query.index",
          quota: JSON.parse(localStorage.userInfo).free_keyword_query_quota + JSON.parse(localStorage.userInfo).used_keyword_query_quota,
        },
        {
          title: "Keyword Tracker",
          icon: "icon-keyword-tracker",
          permission: "nexrank-clients.keywords.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
        {
          title: "AI SEO Automation",
          icon: "icon-ai-seo-automation",
          permission: "Seo-Automation.index",
          quota: JSON.parse(localStorage.userInfo).free_nex_automate_quota + JSON.parse(localStorage.userInfo).used_nex_automate_quota,
        },
        {
          title: "CMS Editor",
          icon: "icon-cms-editor",
          permission: "nexrank-client.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
        {
          title: "Enterprise SEO",
          icon: "icon-seo-split-testing",
          permission: "indexability.index",
          quota: JSON.parse(localStorage.userInfo).used_indexability_quota + JSON.parse(localStorage.userInfo).free_indexability_quota,
        },
      ],
      show_seo_categories: [],

      Cases_blogwriting: [
        {
          title: "blog writing",
          desc: "Generate unique, SEO-optimized, long-form (up to 1,000 words) blog articles in just a few simple steps.",
          icon: "icon-blogwriting-blue",
        },
      ],
      show_Cases_blogwriting: [],
      Cases_long: [
        {
          title: "blog idea and outline",
          desc: "Well-structured blog ideas and outlines for you to write a clear and cohesive blog post. ",
          icon: "icon-idea",
        },
        {
          title: "blog section writing",
          desc: "Make it easier for you to create section writing to improve the readability, clarity, and SEO of your content. ",
          icon: "icon-writing",
        },
        {
          title: "business idea pitching",
          desc: "Create a successful pitch to secure funding, build partnerships and momentum for your business. ",
          icon: "icon-business-idea-pitching",
        },
        {
          title: "selling copywriting",
          desc: "The best-performing copywriting that converts visitors into customers. ",
          icon: "icon-copywriting",
        },
      ],
      show_Cases_long: [],

      Cases_short_Adv: [
        {
          title: "facebook ads",
          desc: "Make your Facebook ads stand out with compelling ad copy.  ",
          icon: "icon-facebook-outline",
        },
        {
          title: "linkedIn ads",
          desc: "Eye-catching LinkedIn ads that help you engage and persuade your readers to take action. ",
          icon: "icon-linkedin-outline",
        },
        {
          title: "google ad title",
          desc: "Create a strong ad title and entice potential customers to click on the ad. ",
          icon: "icon-google-outline",
        },
        {
          title: "google ad descriptions",
          desc: "An attractive and effective description that helps your ad stand out.",
          icon: "icon-google-outline",
        },
        {
          title: "google search ads",
          desc: "Maximize your ad's visibility and drive more targeted traffic to your website. ",
          icon: "icon-google-outline",
        },
      ],
      show_Cases_short_Adv: [],

      Cases_short_Post: [
        {
          title: "facebook captions",
          desc: "Make your Facebook posts stand out and draw in more engagement. ",
          icon: "icon-facebook-outline",
        },
        {
          title: "linkedIn posts",
          desc: "Create a LinkedIn post that inspires and informs, and watch as your trust and authority within your industry grows. ",
          icon: "icon-linkedin-outline",
        },
        {
          title: "youtube intros",
          desc: "Catchy intros that will grab the viewer's attention and establish your brand. ",
          icon: "icon-youtube-outline",
        },
        {
          title: "youtube descriptions",
          desc: "Rank your videos higher with influential descriptions.  ",
          icon: "icon-youtube-outline",
        },
        // {
        //   title: "instagram captions",
        //   desc: "Create captivating Instagram captions that stop the scroll.  ",
        //   icon: "icon-instagram-outline",
        // },
        // {
        //   title: "tiktok captions",
        //   desc: "Create engaging and high-quality hook on your TikTok.  ",
        //   icon: "icon-tiktok-outline",
        // },
        // {
        //   title: "twitter posts",
        //   desc: "Use AI to produce current and pertinent tweets.  ",
        //   icon: "icon-twitter-outline",
        // },
      ],
      show_Cases_short_Post: [],

      Cases_short_Prod: [
        {
          title: "product descriptions",
          desc: "Compelling product descriptions that will inform, persuade, and differentiate.  ",
          icon: "icon-features-blue",
        },
        {
          title: "video description",
          desc: "Compelling product descriptions that will inform, persuade, and differentiate.  ",
          icon: "icon-description-blue",
        },
        {
          title: "video idea",
          desc: "Compelling product descriptions that will inform, persuade, and differentiate.  ",
          icon: "icon-idea",
        },
      ],
      show_Cases_short_Prod: [],
      widget: [
        "Keyword Discovery",
        "Keyword Tracker",
        "AI SEO Automation",
        "CMS Editor",
        "Enterprise SEO",
        "blog writing",
        "blog idea and outline",
        "blog section writing",
        "business idea pitching",
        "selling copywriting",
        "facebook ads",
        "linkedIn ads",
        "google ad title",
        "google ad descriptions",
        "google search ads",
        "facebook captions",
        "linkedIn posts",
        "youtube intros",
        "youtube descriptions",
        "product descriptions",
        "video description",
        "video idea",
      ],
      selected_categories: [],
    };
  },

  methods: {
    showAllCampaigns() {
      this.$router.push({
        name: "feature_pagination_table",
        params: {
          id: this.$route.params.id,
          feature: "content_image",
        },
      });
    },
    watchTutorial() {
      this.$router.push({
        name: "tutorials",
      });
    },
    OpenPage(title) {
      console.log(title);

      if (title == "Keyword Discovery") {
        this.$router.push({
          name: "feature_pagination_table",
          params: {
            feature: "keyword_discovery",
          },
        });
      } else if (title == "Keyword Tracker") {
        this.$router.push({
          name: "project_pagination_table",
          params: {
            feature: "keyword_tracker",
            params: {
              feature: "meta_cms",
            },
          },
        });
      } else if (title == "AI SEO Automation") {
        this.$router.push({
          name: "feature_pagination_table",
          params: {
            feature: "ai_seo_automation",
          },
        });
      } else if (title == "CMS Editor") {
        this.$router.push({
          name: "project_pagination_table",
          params: {
            feature: "meta_cms",
          },
        });
      } else if (title == "Enterprise SEO") {
        this.$router.push({
          name: "feature_pagination_table",
          params: {
            feature: "enterprise_seo",
          },
        });
      }
    },
    addContent(title) {
      this.$router.push({
        name: "content_image_add_fields",
        params: { category: title, step: "topic_details" },
      });
    },
    choose_category(category) {
      this.$router.push({
        name: "content_image_add",
        params: {
          category: category,
        },
      });
    },

    localStoreHandler(e) {
      //console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "dashboardWidgets") {
        this.selected_categories = JSON.parse(e.value);
      }
    },

    rearrangeCateegories() {
      this.show_seo_categories = [];
      this.selected_categories.forEach((element_widget) => {
        this.seo_caegories.forEach((element) => {
          if (element_widget == element.title) {
            this.show_seo_categories.push(element);
          }
        });
      });

      this.show_Cases_blogwriting = [];
      this.selected_categories.forEach((element_widget) => {
        this.Cases_blogwriting.forEach((element) => {
          if (element_widget == element.title) {
            this.show_Cases_blogwriting.push(element);
          }
        });
      });

      this.show_Cases_long = [];
      this.selected_categories.forEach((element_widget) => {
        this.Cases_long.forEach((element) => {
          if (element_widget == element.title) {
            this.show_Cases_long.push(element);
          }
        });
      });

      this.show_Cases_short_Adv = [];
      this.selected_categories.forEach((element_widget) => {
        this.Cases_short_Adv.forEach((element) => {
          if (element_widget == element.title) {
            this.show_Cases_short_Adv.push(element);
          }
        });
      });

      this.show_Cases_short_Post = [];
      this.selected_categories.forEach((element_widget) => {
        this.Cases_short_Post.forEach((element) => {
          if (element_widget == element.title) {
            this.show_Cases_short_Post.push(element);
          }
        });
      });

      this.show_Cases_short_Prod = [];
      this.selected_categories.forEach((element_widget) => {
        this.Cases_short_Prod.forEach((element) => {
          if (element_widget == element.title) {
            this.show_Cases_short_Prod.push(element);
          }
        });
      });
    },

    // $('#example').tooltip(options)
  },
  watch: {
    selected_categories() {
      // console.log("watch", this.selected_categories);
      this.rearrangeCateegories();
    },
  },
  mounted() {
    // let callback = (val, oldVal, uri) => {
    //   console.log("localStorage change", val);
    //   console.log(ls.get("foo"));
    // };
    // ls.set("foo", "boo");
    // ls.on("foo", callback); //watch change foo key and triggered callback

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);

    if (localStorage.dashboardWidgets == undefined) {
      localStorage.setItem("dashboardWidgets", JSON.stringify(this.widget));
      this.show_seo_categories = this.seo_caegories;
    } else {
      this.selected_categories = JSON.parse(localStorage.dashboardWidgets);
      this.rearrangeCateegories();
    }
  },
  created() {
    AiContentGenerator.fetchContentCampaigns(`?page=1`)
      .then((response) => {
        this.Ai_ContentGenerator_count = response.data.data.total;
      })
      .catch((error) => {
        console.log(error);
      });

    Automation.fetchSeoAutomationParams(`?page=1`)
      .then((response) => {
        this.ai_Automation_count = response.data.data.total;
      })
      .catch((error) => {
        console.log(error);
      });

   
      
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  position: relative;
  max-width: 1000px;
  margin: 4rem auto;
  /* padding: 2rem 0rem 4rem; */
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px; */
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 2rem;
}
.blue-bg {
  background-image: linear-gradient(to right, #1565c0, #1565c0);
}
.grey-bg {
  background-color: #eeeeee;
}
.btn-white {
  border-color: #ffffff;
  background-color: #ffffff;
  color: #1465c1;
  font-weight: bold;
}
.btn-white:hover,
.btn-white:active {
  border-color: #e9e9e9;
  background-color: #e9e9e9;
}

.nexcard-body .material-icons-outlined {
  color: #2c8ee1;
  font-size: 2.5rem;
}
.text-green {
  color: #4dae50 !important;
}
.row-text {
  font-size: 16px;
  font-weight: 600;
  padding-left: 0.5rem;
  color: #474747;
}
hr {
  color: #000 !important;
  border: 1px solid #000000;
  min-width: 90px !important;
  margin: 1.8rem 0 0;
}
.btn-tooltip .material-icons-outlined {
  margin-top: -1rem;
  font-size: 1.2rem;
  color: #7f7f7f !important;
}
.text-darkgrey {
  color: #474747;
  margin-left: 0.8rem;
}

.dashboard__apps {
  padding: 0;
}

.dashboard__apps .row .col-size .dashboard__app {
  aspect-ratio: 1.1/1;
  padding: 0.8rem;
  text-align: center;
  min-height: 120px;
  width: 140px;
  margin: 1rem auto;
  border-radius: 10px;
  background-color: #fff;
  transition: 0.2s ease-out;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
}
.dashboard__apps .row .col-size .dashboard__app:hover {
  /* border: 1px solid red; */
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  transition: 0.5 ease-in;
  cursor: pointer;
  user-select: none;
  background-color: #f5f5f7;
  transition: 0.2s ease-out;
}
.dashboard__apps .row .col-size .dashboard__app:hover img {
  scale: 1.05;
  transition: all 0.2s ease-in-out;
}
.dashboard__apps .row .col-size .dashboard__app:active {
  /* border: 1px solid red; */
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */
}
.dashboard__apps .row .col-size span {
  margin: auto;
}
.dashboard__apps .row .col-size .dashboard__app img {
  width: 50px;
  aspect-ratio: 1/1;
  object-fit: contain;
  margin: auto;
  padding-top: 0.2rem;
}
.dashboard__apps .row .col-size .text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
}
.col-size {
  min-height: 1px;
  padding-right: 5px;
  padding-left: 5px;
  width: 20% !important;
  float: left;
}
.socials img {
  filter: brightness(100%);
  transition: 0.3s ease-out;
}
.socials img:hover {
  filter: brightness(85%);
  transition: 0.3s ease-out;
}
.btn-editDashboard {
  color: #2c8ee1 !important;
  font-size: 30px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 6px;
  padding: 0.2rem;
}

.btn-viewlist {
  color: #474747 !important;
  font-size: 25px !important;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  border-radius: 6px;
  padding: 0.2rem;
}

.content_image .material-icons-outlined {
  color: #2c8ee1;
  font-size: 2rem;
}
.fw-600 {
  font-weight: 600;
}
</style>
