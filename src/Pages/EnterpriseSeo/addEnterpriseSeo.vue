<template>
  <div>
    <div class="page-wrapper-lg us-0">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>

          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'enterprise_seo', id: $route.params.project },
            }"
            class="route__link"
            >Enterprise SEO</router-link
          >
          / Add Enterprise SEO
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="/enterprise_seo/table/view_all" class="route__link">Enterprise SEO</router-link>
          / Add Enterprise SEO
        </p>
      </div>
      <div class="nexcard">
        <div class="mw-900px">
          <h3 class="modal-card__title text-center mb-4 mt-3">Add Page</h3>
          <div class="row my-3">
            <div class="col-6">
              <div class="card-text">
                <span for="fname">Title</span>
              </div>

              <div class="card-text">
                <b-form-input autocorrect="off" autocomplete="off" v-model="title" v-validate="'required'" type="text" id="title" name="title" />
                <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first("title") }}</span>
              </div>
            </div>

            <div class="col-6">
              <div class="card-text">
                <span for="fname">Company Name</span>
              </div>

              <div class="card-text">
                <b-form-input autocorrect="off" autocomplete="off" v-model="company_name" type="text" id="company_name" name="company_name" v-validate="'required'" />
                <span class="text-danger text-sm" v-show="errors.has('company_name')">{{ errors.first("company_name") }}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="card-text">
                <span for="fname">URL</span>
              </div>

              <div class="card-text">
                <b-form-input
                  autocorrect="off"
                  autocomplete="off"
                  v-model="url"
                  v-validate="{
                    required: true,
                    url: { require_protocol: true },
                  }"
                  type="text"
                  id="url"
                  name="url"
                />
                <span class="text-danger text-sm" v-show="errors.has('url')">{{ errors.first("url") }}</span>
              </div>
            </div>

            <div class="col-6" v-if="!$route.params.project">
              <div class="card-text">
                <span for="fname">Project</span>
              </div>

              <div class="card-text">
                <select class="form-select rounded w-100" aria-label="Project name" v-model="chosenClient" name="Project" v-validate="'required'">
                  <option :value="lan" :key="index" v-for="(lan, index) in submitClients">
                    {{ lan.name }}
                  </option>
                </select>

                <span class="text-danger text-sm" v-show="errors.has('Project')">{{ errors.first("Project") }}</span>
              </div>
            </div>
          </div>

          <div class="btn-dropdown d-inline-flex align-items-center mt-3" v-b-toggle.dropdown-advsettings>
            <h6 class="text-darkgreen mt-3">Advanced Details</h6>
            <span class="material-icons-outlined arrow-icon text-darkgreen ms-2 mt-2">expand_more</span>
          </div>
          <b-collapse id="dropdown-advsettings">
            <div class="row mb-4">
              <div class="col-6">
                <div class="card-text">
                  <span for="fname">Max URL</span>
                </div>

                <div class="card-text">
                  <b-form-input type="number" id="max_url" name="max_url" placeholder="" v-model="max_url" @keydown="nameKeydown($event)"></b-form-input>
                </div>
              </div>

              <div class="col-6">
                <div class="card-text">
                  <span for="fname">Max Depth</span>
                </div>

                <div class="card-text">
                  <b-form-input
                    autocorrect="off"
                    autocomplete="off"
                    type="number"
                    id="depth_limit"
                    name="depth_limit"
                    min="1"
                    @keydown="nameKeydownDepth($event)"
                    placeholder=""
                    v-model="depth_limit"
                  ></b-form-input>

                  <span class="text-danger text-sm" v-show="DepthRange">Min Depth is 1 </span>
                </div>
              </div>

              <!-- <div class="col-4">
                <div class="card-text">
                  <span for="fname">Crawling Speed</span>
                </div>

                <div class="card-text">
                  <b-form-input
                    autocorrect="off"
                    autocomplete="off"
                    type="number"
                    id="max_speed"
                    name="max_speed"
                    min="1"
                    max="2"
                    @keydown="nameKeydownCrawl($event)"
                    placeholder=""
                    v-model="max_speed"
                  ></b-form-input>

                  <span class="text-danger text-sm" v-show="crawlRange">Crawling Speed Range is 1 to 2</span>
                </div>
              </div> -->
            </div>
            <div class="row">
              <div class="col">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-4">
                      <div class="row d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox v-model="follow_links" name="check-button" switch>
                            <!-- <label>{{ follow_links }} </label> -->
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname">Follow links</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="row d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox v-model="follow_http_redirect" name="check-button" switch>
                            <!-- <label>{{ follow_http_redirect }} </label> -->
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname">Follow HTTP redirects (3xx)</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <!-- <div class="row mt-3 d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox
                            v-model="follow_alternates"
                            name="check-button"
                            switch
                          >
                         
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname">Follow alternates</label>
                        </div>
                      </div> -->

                      <div class="row d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox v-model="follow_canonicals" name="check-button" switch>
                            <!-- <label>{{ follow_canonicals }} </label> -->
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname">Follow canonicals</label>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="col-6">
                      <div class="row mt-2 d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox
                            v-model="allow_nofollow"
                            name="check-button"
                            switch
                          >
                     
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname">Allow nofollow</label>
                        </div>
                      </div>

                      <div class="row mt-3 d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox
                            v-model="allow_noindex"
                            name="check-button"
                            switch
                          >
                       
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname">Allow noindex</label>
                        </div>
                      </div>

                      <div class="row mt-3 d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox
                            v-model="allow_4xx_5xx_links"
                            name="check-button"
                            switch
                          >
                          
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label for="fname"
                            >Allow links from 4xx and 5xx pages</label
                          >
                        </div>
                      </div>

                      <div class="row mt-3 d-flex align-items-center">
                        <div class="col-auto">
                          <b-form-checkbox
                            v-model="whitelist_ip_adresses"
                            name="check-button"
                            disabled
                          >
                          </b-form-checkbox>
                        </div>
                        <div class="col-auto">
                          <label>Whitelist IP addresses</label>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </b-collapse>
          <div class="card-text d-flex mt-4">
            <button class="btn btn-primary-outlined ms-auto" @click="backButton">Cancel</button>
            <button class="btn btn-primary ms-2" @click="addCampaign()">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Enterprise from "@/store/Enterprise.js";
export default {
  data() {
    return {
      permissions: [],
      company_name: "",
      showModal: false,
      warningMessage: "",
      subMessage: "",
      used_company_campaigns: null,
      company_campaigns: null,
      keywordTimeout: null,
      campaigns: [],
      search_keyword: "",
      crawlRange: false,
      DepthRange: false,
      clientField: false,
      invalidChars: ["*", ".", "e"],
      url: "",
      max_url: 50,
      depth_limit: 3,
      max_speed: 2,
      user_agent_other: "",
      user_agent: "default",
      sitemaps_urls: "",
      showOthers: false,
      follow_links: true,
      follow_http_redirect: true,
      follow_alternates: true,
      follow_canonicals: true,
      allow_nofollow: true,
      allow_noindex: true,
      allow_4xx_5xx_links: true,
      whitelist_ip_adresses: true,
      allowed_domains: "",

      title: "",
      user_agents: [
        "default",
        "Applebot",
        "baiduspider",
        "Bingbot",
        "Discordbot",
        "facebookexternalhit",
        "Googlebot",
        "Googlebot-Image",
        "ia_archiver",
        "LinkedInBot",
        "msnbot",
        "Naverbot",
        "Pinterestbot",
        "Screaming Frog SEO Spider",
        "seznambot",
        "Slurp",
        "teoma",
        "TelegramBot",
        "Twitterbot",
        "Yandex",
        "Yeti",
        "Others",
      ],

      chosenClient: "",
      clients: [
        {
          name: "Default",
          id: null,
          active: 1,
          base_url: "default",
          creator: "default",
        },
      ],
      client: {
        name: "Default",
        id: null,

        active: 1,
        base_url: "default",
        creator: "default",
      },
      submitClients: [],

      page: 0,
    };
  },

  watch: {
    depth_limit() {
      //
      if (this.depth_limit < 1) {
        this.DepthRange = true;
        // e.preventDefault();
      } else {
        this.DepthRange = false;
      }
    },
    chosenClient(val) {
      //

      if (val != 0 || val != null) {
        this.clientField = false;
      }
    },
  },
  methods: {
    backButton() {
      this.$router.go(-1)
    },
    choseClient(data) {
      var dup = false;

      if (this.showClients.length != 0) {
        this.showClients.forEach((element) => {
          if (element.id == data.id) {
            dup = true;
          }
        });

        if (dup == false) {
          this.showClients.push(data);
        }
      } else {
        this.showClients.push(data);
      }

      //
    },
    choose_others() {
      if (this.user_agent == "Others") {
        this.showOthers = true;
      } else {
        this.showOthers = false;
      }
    },
    nameKeydown(e) {
      //
      if (e.key == "e" || e.key == "." || e.key == "+" || e.key == "-") {
        e.preventDefault();
      }
      // if (/^\E$/.test(e.key)) {
      //   e.preventDefault();
      // }
    },
    nameKeydownCrawl(e) {
      //
      if (e.key == "e" || e.key == "." || e.key == "+" || e.key == "-") {
        e.preventDefault();
      }

      if (e.key < 1 || e.key > 2) {
        this.crawlRange = true;
        // e.preventDefault();
      } else {
        this.crawlRange = false;
      }

      // if (/^\E$/.test(e.key)) {
      //   e.preventDefault();
      // }
    },
    nameKeydownDepth(e) {
      //
      if (e.key == "e" || e.key == "." || e.key == "+" || e.key == "-") {
        e.preventDefault();
      }

      if (this.depth_limit < 1) {
        this.DepthRange = true;
        // e.preventDefault();
      } else {
        this.DepthRange = false;
      }
    },

    addCampaign() {
      if (this.$route.params.project) {
        this.chosenClient = this.$route.params.project;
      }

      var obj = {};
      if (this.$route.params.project) {
        obj = {
          title: this.title,
          company_name: this.company_name,
          client_id: this.chosenClient,
          url: this.url,
          max_url: this.max_url,
          depth_limit: this.depth_limit,
          max_speed: this.max_speed,
          user_agent: this.user_agent,
          follow_links: this.follow_links,
          follow_http_redirect: this.follow_http_redirect,
          follow_alternates: this.follow_alternates,
          follow_canonicals: this.follow_canonicals,
          allow_nofollow: this.allow_nofollow,
          allow_noindex: this.allow_noindex,
          allow_4xx_5xx_links: this.allow_4xx_5xx_links,
          // sitemaps_urls:this.sitemaps_urls,
          robotstxt_obey: false,
        };
      } else {
        obj = {
          title: this.title,
          company_name: this.company_name,
          client_id: this.chosenClient.id,
          url: this.url,
          max_url: this.max_url,
          depth_limit: this.depth_limit,
          max_speed: this.max_speed,
          user_agent: this.user_agent,
          follow_links: this.follow_links,
          follow_http_redirect: this.follow_http_redirect,
          follow_alternates: this.follow_alternates,
          follow_canonicals: this.follow_canonicals,
          allow_nofollow: this.allow_nofollow,
          allow_noindex: this.allow_noindex,
          allow_4xx_5xx_links: this.allow_4xx_5xx_links,
          // sitemaps_urls:this.sitemaps_urls,
          robotstxt_obey: false,
        };
      }

      //   const obj={
      //   "max_url": 50,
      //   "depth_limit": 3,
      //   "max_speed": 1,
      //   "user_agent": "Googlebot",
      //   "follow_links": true,
      //   "robotstxt_obey": false,
      //   "follow_http_redirect": true,
      //   "client_id": 11,
      //   "title": "Testing",
      //   "url": "https://www.nexodn.com/"
      // }

      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          //
          if (this.max_speed == "") {
            //

            this.crawlRange = true;
          }
          if (this.depth_limit == "") {
            //
            this.DepthRange = true;
          } else if (this.DepthRange == false && this.crawlRange == false && this.chosenClient.length != 0) {
            Enterprise.addData(obj)
              .then((response) => {
                this.$toast.success(response.data.message);
                this.response = response.data.data;
                // this.responseId = response.data.data.id;
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
                      id: response.data.data.id,
                    },
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                // this.$vs.notify({
                //   color: "danger",
                //   title: "Campaign Error",
                //   text: err.response.data.message,
                // })
              });
          }
        }
      });
    },
  },
  created() {
    this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) => a.name.localeCompare(b.name));

    if (localStorage.project_for_seo_automation) {
      JSON.parse(localStorage.nexrank_client).forEach((element) => {
        if (element.id == localStorage.project_for_seo_automation) {
          this.chosenClient = element;
        }
      });
    }
  },
};
</script>

<style lang="css" scoped>
.page-wrapper-lg {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 4rem;
}

.mw-900px {
  max-width: 900px !important;
  margin: 0 auto;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 2rem;
  position: relative;
}
.card-text {
  margin-top: 0.5rem;
}
.btn-dropdown[aria-expanded="false"] .arrow-icon {
  transition: 0.3s ease-out;
  rotate: 0deg;
}
.btn-dropdown[aria-expanded="true"] .arrow-icon {
  transition: 0.3s ease-out;
  rotate: 180deg;
}
.custom-control {
  display: flex;
  align-items: center;
}
.custom-control .custom-control-input {
  width: 16px;
  height: 16px;
}
/* .custom-control .custom-control-label {
  font-size: 16px;
  margin-left: 0.5rem;
  text-transform: capitalize;
  user-select: none;
  color: var(--color-primary);
  font-weight: bold;
} */
</style>
