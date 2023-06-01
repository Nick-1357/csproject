<template>
  <div
    class="header-wrapper"
    v-if="this.$route.fullPath.includes('content_editor')"
  >
    <b-modal id="modal-word-press" centered hide-footer hide-header>
      <deploy v-bind:type="modelFor"></deploy>
    </b-modal>

    <div class="sidebar-logo">
      <img src="../assets/nexmind/nexmind-logo.png" alt="Nexmind" />
    </div>
    <div class="route__linkpath mt-3 ms-4 fw-normal">
      <p class="text-muted fw-normal">
        <button
          @click="$router.go(-1)"
          class="material-icons-outlined btn-back"
        >
          arrow_back
        </button>
        <router-link to="/dashboard" class="route__link">Dashboard</router-link>
        /
        <router-link to="/content_image/add_content" class="route__link"
          >AI Content Generation</router-link
        >
        /
        <router-link
          :to="{
            name: 'feature_pagination_table',
            params: { feature: 'content_image' },
          }"
          class="route__link"
          >View All
        </router-link>
        / Content Editor
      </p>
    </div>
    <div class="ms-auto d-flex me-2">
      <button
        @click="downloadText('pdf')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Export to PDF file"
        class="btn btn-primary-outlined d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">picture_as_pdf</span
        ><span>PDF</span>
      </button>
      <button
        @click="downloadText('words')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Export to document file"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
      >
        <span class="material-icons-outlined me-2">description</span
        ><span>DOC</span>
      </button>
      <button
        @click="downloadText('html')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Export to HTML file"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
      >
        <span class="material-icons-outlined me-2">code</span><span>HTML</span>
      </button>
      <button
        v-if="
          this.$route.params.category == 'blog writing' &&
          has_wordpress_integration &&
          deployed_pages.length == 0
        "
        @click="chooseModelType('publish')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Publish Blog to Wordpress"
        class="btn btn-primary ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-1">file_upload</span>
        Publish
      </button>
      <button
        v-if="
          this.$route.params.category == 'blog writing' &&
          has_wordpress_integration &&
          deployed_pages.length != 0
        "
        @click="openWordpress()"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="View Wordpress Page"
        class="btn btn-primary ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">visibility</span>
        View
      </button>
      <button
        v-if="
          this.$route.params.category == 'blog writing' &&
          has_wordpress_integration &&
          deployed_pages.length != 0
        "
        @click="chooseModelType('remove')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Remove Blog from Wordpress"
        class="btn btn-primary ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">delete</span>
        Remove
      </button>
      <button
        v-if="
          this.$route.params.category == 'blog writing' &&
          has_wordpress_integration &&
          deployed_pages.length != 0
        "
        @click="chooseModelType('update')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Update Blog in Wordpress"
        class="btn btn-primary ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">update</span>
        Update
      </button>
      <button
        v-if="
          this.$route.params.category == 'blog writing' &&
          has_wordpress_integration
        "
        @click="chooseModelType('info')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Credentials"
        class="btn ms-1 text-primary d-flex align-items-center"
      >
        <span class="material-icons-outlined info-tooltip">help_outline</span>
      </button>
    </div>
  </div>

  <div
    class="header-wrapper"
    v-else-if="this.$route.fullPath.includes('live_editor')"
  >
    <b-modal id="modal-meta-script" centered hide-footer hide-header>
      <div>
        <div class="d-flex">
          <h5 class="text-darkgreen fw-bold">Meta-CMS Script</h5>
        </div>
        <div class="d-flex">
          <p class="text-secondary">
            Please copy the script and paste at the header of your website.
          </p>
        </div>
        <div class="d-flex py-2">
          <div class="card p-2">
            <span class="text-muted">
              {{ user.nexrank_script }}
            </span>
          </div>
        </div>

        <div class="d-flex flex-row-reverse py-2">
          <copy-to-clipboard :text="user.nexrank_script" @copy="handleCopy">
            <button class="btn btn-primary-outlined text-center">
              <span>Copy Script</span>
            </button>
          </copy-to-clipboard>
        </div>
      </div>
    </b-modal>

    <!-- <b-modal id="modal-confirm-live-editor" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Confirmation</strong>

        <div class="card-text mt-3">
          <span>Kindly, make sure you have chosen all the contents.</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button @click="$bvModal.hide('modal-confirm-content-planner')" class="btn btn-primary-outlined ms-auto">Cancel</button>
          <button @click="nextStep()" class="btn btn-primary ms-2 text-white">Confirm</button>
        </div>
      </div>
    </b-modal> -->

    <div class="sidebar-logo">
      <img src="../assets/nexmind/nexmind-logo.png" alt="Nexmind" />
    </div>
    <div class="route__linkpath mt-3 ms-4 fw-normal">
      <p class="text-muted fw-normal">
        <button
          @click="$router.go(-1)"
          class="material-icons-outlined btn-back"
        >
          arrow_back
        </button>
        <router-link to="/dashboard" class="route__link">Dashboard</router-link>
        /
      </p>
    </div>
    <div class="ms-auto d-flex me-2">
      <button
        v-if="this.is_expand"
        @click="closeEditor"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
      >
        Close Editor
      </button>
      <button
        v-else
        @click="closeEditor"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
      >
        Show Editor
      </button>
      <b-button-group
        class="d-flex b-button-group__custom ms-2"
        v-if="$route.params.variant == 'split'"
      >
        <b-button
          v-for="(btn, idx) in buttons"
          :key="idx"
          :pressed.sync="btn.state"
          @click="changeView(idx)"
          variant="outline-primary"
        >
          {{ btn.caption }}
        </b-button>
      </b-button-group>

      <button
        @click="fetchTitle"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Fetch meta title"
      >
        Title
      </button>
      <button
        @click="fetchDesc"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Fetch meta description"
      >
        Description
      </button>
      <button
        @click="saveChangesLive"
        class="btn btn-primary d-flex align-items-center ms-2"
      >
        Save changes
      </button>

      <button
        @click="chooseMetaType('script')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Meta-CMS Script"
        class="btn ms-1 text-primary d-flex align-items-center"
      >
        <span class="material-icons-outlined info-tooltip">help_outline</span>
      </button>
    </div>
  </div>

  <div
    class="header-wrapper"
    v-else-if="this.$route.fullPath.includes('ai_seo_automation/campaign')"
  >
    <b-modal id="modal-meta-script" centered hide-footer hide-header>
      <div>
        <div class="d-flex">
          <h5 class="text-darkgreen fw-bold">Meta-CMS Script</h5>
        </div>
        <div class="d-flex">
          <p class="text-secondary">
            Please copy the script and paste at the header of your website.
          </p>
        </div>
        <div class="d-flex py-2">
          <div class="card p-2">
            <span class="text-muted">
              {{ user.nexrank_script }}
            </span>
          </div>
        </div>

        <div class="d-flex flex-row-reverse py-2">
          <copy-to-clipboard :text="user.nexrank_script" @copy="handleCopy">
            <button class="btn btn-primary-outlined text-center">
              <span>Copy Script</span>
            </button>
          </copy-to-clipboard>
        </div>
      </div>
    </b-modal>

    <div class="route__linkpath mt-3 ms-4 fw-normal">
      <p class="text-muted fw-normal" v-if="$route.params.project">
        <button
          @click="$router.go(-1)"
          class="material-icons-outlined btn-back"
        >
          arrow_back
        </button>
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
        / AI SEO Automation
      </p>

      <p class="text-muted fw-normal" v-else>
        <button
          @click="$router.go(-1)"
          class="material-icons-outlined btn-back"
        >
          arrow_back
        </button>
        <router-link to="/dashboard" class="route__link">Dashboard</router-link
        >/

        <router-link
          v-if="$route.fullPath.includes('enterprise_seo')"
          :to="{
            name: 'enterprise_seo_allTasks',
            params: { id: $route.params.automation_id },
          }"
          class="route__link"
        >
          Enterprise SEO</router-link
        >

        <router-link
          v-else
          :to="{
            name: 'feature_pagination_table',
            params: { feature: 'ai_seo_automation' },
          }"
          class="route__link"
        >
          View All</router-link
        >
        <router-link
          v-if="seo_campaign.type == 'general'"
          :to="{
            name: 'ai_seo_automation_campaign',
          }"
          class="route__link"
          >/ AI SEO Automation</router-link
        >
        <router-link
          v-if="seo_campaign.type == 'content-planner'"
          :to="{
            name: 'ai_seo_automation_campaign',
          }"
          class="route__link"
          >/ Content planner</router-link
        >
      </p>
    </div>
    <div class="ms-auto d-flex me-2">
      <button
        v-if="showHTML"
        @click="downloadSEO('pdf')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Export to PDF file"
        class="btn btn-primary-outlined d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">picture_as_pdf</span
        ><span>PDF</span>
      </button>
      <button
        v-if="showHTML"
        @click="downloadSEO('words')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Export to document file"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
      >
        <span class="material-icons-outlined me-2">description</span
        ><span>DOC</span>
      </button>

      <button
        v-if="showHTML"
        @click="downloadSEO('html')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Export to HTML file"
        class="btn btn-primary-outlined d-flex align-items-center ms-2"
      >
        <span class="material-icons-outlined me-2">code</span><span>HTML</span>
      </button>

      <button
        v-if="!showHTML"
        @click="updateWebsite()"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Click to do live editing on your webpage"
        class="btn btn-primary-outlined ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-1">file_upload</span>
        Update Website
      </button>

      <button
        v-if="showRemove"
        @click="openMetaWebsite()"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="View webpage"
        class="btn btn-primary-outlined ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">visibility</span>
        View
      </button>
      <button
        v-if="showRemove"
        @click="deleteValue()"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Remove edited content from webpage"
        class="btn btn-primary-outlined ms-2 d-flex align-items-center"
      >
        <span class="material-icons-outlined me-2">delete</span>
        Remove
      </button>

      <button
        v-if="!showHTML"
        @click="chooseMetaType('script')"
        v-b-tooltip.hover.bottom="{ variant: 'primary' }"
        title="Meta-CMS Script"
        class="btn ms-1 text-primary d-flex align-items-center"
      >
        <span class="material-icons-outlined info-tooltip">help_outline</span>
      </button>
    </div>
  </div>
  <div class="header-wrapper" v-else>
    <b-modal id="modal-center-renew" centered hide-footer hide-header>
      <div class="card-body">
        <renew></renew>
      </div>
    </b-modal>

    <b-modal id="modal-center-renew-custom" centered hide-footer hide-header>
      <div class="card-body">
        <renewcustom></renewcustom>
      </div>
    </b-modal>

    <div class="mr-auto p-2">
      <!-- Search Bar -->
      <div class="search input-group us-0" style="">
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
      <!--  -->
    </div>

    <div class="d-flex align-items-center py-1">
      <span class="upgrade-dropdown">
        <span class="btn btn-primary-outlined d-flex align-items-center">
          <span class="material-icons-outlined"> arrow_circle_up</span>
          <span class="ps-2 text">Upgrade Plan</span>
        </span>
        <div class="upgrade-dropdown-wrapper">
          <div class="upgrade-dropdown-content">
            <div class="row" v-if="myPlan == undefined || myPlan.length == 0">
              <div class="col">
                <div class="plan-col d-flex flex-column text-center">
                  <p>Your Plan</p>
                  <p>Valid Until: {{ company.expiry_date | formatDate }}</p>
                  <h5>Customized Plan</h5>
                  <button
                    v-b-modal.modal-center-renew-custom
                    class="btn btn-primary-outlined"
                    v-if="company.renewable == 1"
                  >
                    Renew Plan
                  </button>
                </div>
              </div>
              <div>
                <router-link to="/pricing">
                  <button class="btn-view-other">View Other Plans</button>
                </router-link>
              </div>
            </div>
            <div
              class="row"
              v-else-if="current_plan.length != 0 && current_plan.id == 15"
            >
              <div class="col">
                <div class="plan-col d-flex flex-column text-center">
                  <p>Your Plan</p>
                  <h5>Life Time Deal</h5>
                </div>
              </div>
              <div>
                <router-link to="/pricing">
                  <button class="btn-view-other">View Other Plans</button>
                </router-link>
              </div>
            </div>

            <div
              class="row"
              v-else-if="current_plan.length != 0 && current_plan.id != 15"
            >
              <div class="col">
                <div class="plan-col d-flex flex-column text-center">
                  <p>Your Plan</p>
                  <h5 class="text-primary">
                    $ {{ myPlan.price }}/ {{ myPlan.period_type }}
                  </h5>
                  <p>
                    Valid until:
                    {{ company.expiry_date | formatDate }}
                  </p>
                  <div class="plan-details">
                    <div class="d-flex flex-column mb-2">
                      <div
                        class="d-flex text-start align-items-start mb-2"
                        v-for="(spec, index) in myPlan.desc"
                        :key="index"
                      >
                        <img
                          src="../assets/icons/icon-check-green.svg"
                          alt="Pros"
                          class="mt-1"
                        />
                        <span class="ms-2"> {{ spec }}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    class="btn btn-primary-outlined"
                    v-b-modal.modal-center-renew
                    v-if="
                      company.current_plan[0].name != 'nexwriter_fremium' &&
                      company.renewable == 1
                    "
                  >
                    Renew Plan
                  </button>
                </div>
              </div>
              <div>
                <router-link to="/pricing">
                  <button class="btn-view-other">View Other Plans</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </span>

      <span class="dropdown p-2 header-avatar d-flex align-items-center us-0">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
        <button class="dropbtn material-icons-outlined">expand_more</button>
        <div class="dropdown-wrapper">
          <div class="dropdown-content">
            <!-- <span class="mb-1">Hi {{ company.name }}</span> -->
            <span class="text-muted mb-2" style="overflow: hidden">{{
              company.email
            }}</span>
            <div class="role me-auto">
              <span>{{ company.company_name }}</span>
            </div>
            <hr />
            <button @click="profile" class="d-flex align-items-center">
              <span class="material-icons-outlined">person</span>
              <span class="ms-2">Profile</span>
            </button>
            <button @click="settings" class="d-flex align-items-center">
              <span class="material-icons-outlined">settings</span>
              <span class="ms-2">Admin</span>
            </button>
            <button @click="logout" class="d-flex align-items-center">
              <span class="material-icons-outlined">logout</span>
              <span class="ms-2">Logout</span>
            </button>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import Automation from "@/store/Automation.js";
import renew from "@/Pages/Plans/Renew";
import renewcustom from "@/Pages/Plans/RenewCustom.vue";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import deploy from "@/Pages/Content_Image/deployWordpress.vue";
import meta_cms from "@/store/meta-cms.js";
import CopyToClipboard from "vue-copy-to-clipboard";
export default {
  components: { renew, renewcustom, deploy, CopyToClipboard },
  data() {
    return {
      company: [],
      seo_website_url: "",
      seo_website_page: [],
      seo_client_id: "",
      myPlan: [],
      current_plan: [],
      search_keyword: "",
      keywordTimeout: null,
      modelFor: "publish",
      metaModal: "script",
      deployed_pages: [],
      has_wordpress_integration: JSON.parse(localStorage.userInfo)
        .has_wordpress_integration,
      user: JSON.parse(localStorage.getItem("userInfo")),
      showHTML: false,
      showRemove: false,
      seo_campaign: [],
      counter: 0,
      buttons: [
        { caption: "A", state: true },
        { caption: "B", state: false },
      ],
      chosenView: "A",
      is_expand: true,
    };
  },
  methods: {
    changeView(data) {
      if (data == 0) {
        this.buttons[1].state = false;
        this.chosenView = this.buttons[0].caption;
      } else {
        this.buttons[0].state = false;
        this.chosenView = this.buttons[1].caption;
      }
      localStorage.setItem("nexmind_live_editor_variant", this.chosenView);
    },
    closeEditor() {
      this.is_expand = !this.is_expand;
      localStorage.setItem("nexmind_live_editor_editor", this.is_expand);
    },
    fetchTitle() {
      localStorage.setItem("nexmind_live_editor_title", "clicked");
      // this.change_title = true;
      // this.change_desc = false;
    },
    fetchDesc() {
      localStorage.setItem("nexmind_live_editor_description", "clicked");
      // this.change_desc = true;
      // this.change_title = false;
    },
    saveChangesLive() {
      localStorage.setItem("nexmind_live_editor_save_changes", [
        "clicked",
        this.counter,
      ]);
    },
    updateWebsite() {
      console.log(this.seo_website_page);
      if (this.seo_website_page == null || this.seo_website_page.length == 0) {
        var env = "";

        if (location.href.includes("www.platform.nexmind.ai")) {
          env = "prod";
        } else {
          env = "uat";
        }

        console.log(
          this.seo_website_url,
          localStorage.accessToken,
          this.seo_client_id,
          this.$route.params.id
        );

        window.open(
          this.seo_website_url +
            `?nexmind_token=` +
            localStorage.accessToken +
            `&nexmind_editor_campaign_type=single` +
            `&client_id=` +
            this.seo_client_id +
            `&show_editor=true` +
            `&seo_automation=` +
            this.$route.params.id +
            `&en=` +
            env,
          "_blank"
        );
      } else {
        var env = "";

        if (location.href.includes("www.platform.nexmind.ai")) {
          env = "prod";
        } else {
          env = "uat";
        }

        window.open(
          this.seo_website_url +
            `?nexmind_token=` +
            localStorage.accessToken +
            `&nexmind_editor_campaign_type=single` +
            `&client_id=` +
            this.seo_client_id +
            `&optimize_id=` +
            this.seo_website_page.id +
            `&show_editor=true` +
            `&seo_automation=` +
            this.$route.params.id +
            `&en=` +
            env,
          "_blank"
        );
      }

      this.$bvModal.hide("modal-save-content");
      // location.reload();
    },

    deleteValue() {
      const obj = {
        client_id: this.seo_client_id,
        id: this.seo_website_page.id,
      };

      meta_cms
        .removeClientRecommendation(obj)
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.seo_website_page = [];
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    openMetaWebsite() {
      window.open(this.seo_website_url, "_blank");
    },
    chooseMetaType(data) {
      this.metaModal = data;
      this.$bvModal.show("modal-meta-script");
    },
    openWordpress() {
      window.open(this.deployed_pages.url, "_blank");
    },
    chooseModelType(data) {
      this.modelFor = data;
      this.$bvModal.show("modal-word-press");
    },
    searchKeyword() {
      clearTimeout(this.keywordTimeout);
      //console.log("search keyword", this.search_keyword);
      // this.search_keyword=this.search_keyword.toLowerCase()
      this.keywordTimeout = setTimeout(() => {
        if (this.search_keyword == "") {
          // this.$router.push({ name: "Dashboard" });
          this.$router.go(-1);
        } else {
          this.$router.push({
            name: "search_table",
            params: { keyword: this.search_keyword },
          });
        }
      }, 500);
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("me");
      this.$router.push("/login");
    },
    settings() {
      this.$router.push({
        name: "settings",
        params: { feature: "employees" },
      });
    },
    profile() {
      this.$router.push({
        name: "settings",
        params: { feature: "profile" },
      });
    },
    handleCopy() {
      this.$toast.success("Copied");
      this.$bvModal.hide("modal-meta-script");
      // this.$bvToast.toast("Copied", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    },
    downloadSEO(element) {
      if (JSON.parse(localStorage.getItem("ai_seo_content")) == undefined) {
        this.$toast.warning("Content is empty");

        // this.$bvToast.toast("Content is empty", {
        //   title: "Alert",
        //   variant: "warning",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
      } else {
        var header =
          "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
          "xmlns:w='urn:schemas-microsoft-com:office:word' " +
          "xmlns='http://www.w3.org/TR/REC-html40'>" +
          `<head><meta charset='utf-8'><title>${
            JSON.parse(localStorage.getItem("ai_seo_content")).title
          }</title></head><meta name="description" content="${
            JSON.parse(localStorage.getItem("ai_seo_content")).title
          }"><body>`;
        var footer = "</body></html>";

        var content = "";
        JSON.parse(localStorage.getItem("ai_seo_content")).content.forEach(
          (element) => {
            content =
              content + `<${element.key}>${element.value}</${element.key}>`;
          }
        );

        var sourceHTML = header + content + footer;

        if (element == "words") {
          var source =
            "data:application/vnd.ms-word;charset=utf-8," +
            encodeURIComponent(sourceHTML);
          var fileDownload = document.createElement("a");
          document.body.appendChild(fileDownload);
          fileDownload.href = source;
          fileDownload.download = "document.doc";
          fileDownload.click();
          document.body.removeChild(fileDownload);
        }
        if (element == "pdf") {
          var html = htmlToPdfmake(sourceHTML);

          const documentDefinition = { content: html };
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(documentDefinition).open();
        }
        if (element == "html") {
          var blob = new Blob([sourceHTML], {
            type: "text/html",
          });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "Text.html";
          link.click();
        }
      }
    },

    downloadText(element) {
      // console.log(JSON.parse(localStorage.getItem("export_content")));
      if (
        JSON.parse(localStorage.getItem("export_content")).content == undefined
      ) {
        this.$toast.warning("Content is empty");
        // this.$bvToast.toast("Content is empty", {
        //   title: "Alert",
        //   variant: "warning",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
      } else {
        if (element == "pdf") {
          var html = htmlToPdfmake(
            JSON.parse(localStorage.getItem("export_content")).content
          );

          const documentDefinition = { content: html };
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          pdfMake.createPdf(documentDefinition).open();
        }
        if (element == "words") {
          var header =
            "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
          var footer = "</body></html>";
          var sourceHTML =
            header +
            JSON.parse(localStorage.getItem("export_content")).content +
            footer;

          console.log(sourceHTML);

          var source =
            "data:application/vnd.ms-word;charset=utf-8," +
            encodeURIComponent(sourceHTML);
          var fileDownload = document.createElement("a");
          document.body.appendChild(fileDownload);
          fileDownload.href = source;
          fileDownload.download = "document.doc";
          fileDownload.click();
          document.body.removeChild(fileDownload);
        }
        if (element == "html") {
          var blob = new Blob(
            [JSON.parse(localStorage.getItem("export_content")).content],
            {
              type: "text/html",
            }
          );
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "Text.html";
          link.click();
        }
      }
    },
  },
  created() {
    if (this.$route.fullPath.includes("search")) {
      this.search_keyword = this.$route.params.ke;
    }

    if (this.$route.fullPath.includes("ai_seo_automation/campaign")) {
      Automation.fetchSeoAutomation({
        id: this.$route.params.id,
      }).then((response) => {
        this.seo_campaign = response.data.data;
        this.seo_website_url = this.seo_campaign.url;
        this.seo_website_page = this.seo_campaign.website_page;
        this.seo_client_id = response.data.data.client.id;
        console.log(response.data.data.url.length);
        if (response.data.data.url.length == 0) {
          this.showHTML = true;
        }
        console.log(this.seo_website_page);
        if (this.seo_website_page != null) {
          this.showRemove = true;
        }

        console.log(this.seo_website_page);
        console.log(this.seo_website_page.length);
      });
    }

    this.company = JSON.parse(localStorage.userInfo);

    if (this.company.current_plan_price != undefined) {
      this.myPlan = this.company.current_plan_price;

      if (this.myPlan != null) {
        this.myPlan.desc = eval(this.myPlan.description);
      }
    }

    if (this.company.current_plan != undefined) {
      if (this.company.current_plan.length != 0) {
        this.current_plan = this.company.current_plan[0];
      }
    }

    if (
      localStorage.deployed_content != "undefined" &&
      localStorage.deployed_content != undefined
    ) {
      this.deployed_pages = JSON.parse(localStorage.deployed_content);
    }
  },
};
</script>

<style lang="css">
.btn-primary {
  background-color: #2c8ee1 !important;
  color: #ffffff !important;
  border-radius: 6px !important;
  text-align: center !important;
}
/* .btn-primary:hover {
  background-color: #0379e0 !important;
  color: #ffffff;
  border-radius: 6px;
} */
/* .btn-free {
  background-color: #ffffff !important;
  color: #4caf50;
  border-color: #4caf50;
  border-radius: 6px !important;
  text-align: center !important;

}
.btn-free:hover {
  background-color: #4caf50 !important;
  color:white !important;
} */

/* ------------------ */
.sidebar-logo {
  margin-left: 1.5rem;
  user-select: none;
}
.sidebar-logo img {
  width: 2rem;
  object-fit: contain;
}

.header-wrapper {
  position: sticky;
  z-index: 50 !important;
  top: 0;
  border-bottom: rgb(207, 207, 207) 1px solid;
  background-color: #ffffff;
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 4px;
}

.header-avatar img {
  vertical-align: middle;
  width: 38px;
  height: 38px;
  border-radius: 5px;
}
.btn-primary-outlined {
  border: 1px solid #2c8ee1;
  border-radius: 5px;
  color: #2c8ee1;
}

.btn-primary-outlined .text {
  overflow: hidden;
  white-space: nowrap;
}

.btn-primary-outlined:hover {
  background-color: #2c8ee1;
  color: white;
  transition: 0.2s ease-out;
}
.btn-view-other {
  background-color: #fff;
  color: #4caf50;
  border: 1px solid #4caf50;
  border-radius: 6px;
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: center;
  font-weight: 500;
}
.btn-view-other:hover {
  background-color: #4caf50;
  color: #ffffff;
  transition: 0.4s ease-out;
}

/* renew modal css */
.type__label {
  white-space: nowrap;
  margin-right: 1rem;
}
.type__select {
  height: 30px;
  border-radius: 6px;
  border-color: #ced4da;
  width: 100%;
  padding: 0rem 0.2rem;
}
.period__label {
  white-space: nowrap;
  margin-right: 1rem;
}
.period__spinbutton {
  height: 30px;
}
.cardno__label {
  white-space: nowrap;
  margin: auto 1rem auto auto;
}
.cardno__input {
  border: 1px solid #ced4da;
  border-radius: 6px;
  width: 100%;
  padding: 0.4em 0.2rem;
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
/* ----upgrade-dropdown------ */
.upgrade-dropdown {
  user-select: none;
}
.upgrade-dropdown:hover .upgrade-dropdown-wrapper {
  display: block;
  transform: translate(-97px, -3px);
  transition: all 0.4s ease-out;
  visibility: visible;
  opacity: 1;
}
.upgrade-dropdown-wrapper {
  /* display: none; */
  background-color: transparent;
  padding-top: 1rem;
  position: absolute;
  width: 250px;
  z-index: 9000;
  transform: translate(-97px, -8px);
  border-radius: 10px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.1s ease-out;
}
.upgrade-dropdown-content {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.plan-col h5 {
  font-weight: bold;
  margin-bottom: 0rem 0 0.5rem 0rem;
}
.plan-col p {
  font-size: 16px;
  margin: 0rem 0 0.5rem 0;
}
/* ------ account-dropdown------ */
.dropdown {
  width: 90px;
}
.dropdown:hover .dropdown-wrapper {
  display: block;
  transform: translate(-161px, 143px);
  transition: all 0.4s ease-out;
  visibility: visible;
  opacity: 1;
}

.dropdown-wrapper {
  visibility: hidden;
  opacity: 0;
  background-color: transparent;
  padding-top: 1rem;
  /* display: none; */
  position: absolute;
  width: 230px;
  z-index: 1;
  transform: translate(-161px, 133px);
  border-radius: 10px;
  transition: all 0.1s ease-out;
}

.dropdown-content {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem 0.8rem;
  display: flex;
  flex-direction: column;
  user-select: none;
}
.dropdown-content span {
  display: inline-block;
}
.dropdown-content .role {
  display: inline-block;
  padding: 0rem 0.5rem;
  border: 1px solid #4caf50;
  border-radius: 5px;
  /* width: 95px; */
}
.dropdown-content .role span {
  font-size: 14px;
  color: #4caf50;
}
.dropdown-content hr {
  margin: 1rem 0 0.3rem;
  width: 100%;
}
.dropdown-content button {
  color: rgb(78, 78, 78);
  padding: 0.5rem;
  text-decoration: none;
  display: block;
  text-align: left;
  margin-top: 2px;
  border-radius: 8px;
  background-color: #fff;
  transition: 0.2s ease-out;
}

.dropdown-content button:hover {
  border-radius: 8px;
  background-color: #dce8f6;
  transition: 0.4s ease-out;
}

.input-group-text .material-icons-outlined {
  color: #707070;
}

/* upgrade modal css  */
.text-upgrade {
  color: #4caf50;
}

.text-primary {
  color: var(--color-primary) !important;
}
/* .info-tooltip{
  top: 20px !important;
} */
</style>
