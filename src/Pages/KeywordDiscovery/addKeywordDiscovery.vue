<template>
  <div>
    <div class="page-wrapper-lg us-0">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
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
            v-if="!$route.params.project"
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'keyword_discovery' },
            }"
            class="route__link"
            >View All
          </router-link>

          <router-link
            v-else
            :to="{
              name: 'feature_pagination_table',
              params: {
                feature: 'keyword_discovery',
                id: $route.params.project,
              },
            }"
            class="route__link"
            >View All
          </router-link>
          / Add Keyword Discovery
        </p>
      </div>
      <div class="nexcard">
        <h4 class="text-darkgreen text-center modal-card__title mt-5">
          Add Keyword
        </h4>
        <form class="card__inputbody pt-3">
          <!-- Project name-->
          <div class="card_inputgroup" v-if="!$route.params.project">
            <span class="card_inputgroup__title">
              Project name
              <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span> -->
            </span>
            <div class="w-100">
              <select
                class="form-select rounded w-100"
                aria-label="Project name"
                v-model="chosenClient"
                name="Project"
                v-validate="'required'"
              >
                <option
                  :value="lan"
                  :key="index"
                  v-for="(lan, index) in submitClients"
                >
                  {{ lan.name }}
                </option>
              </select>

              <span
                class="text-danger text-sm"
                v-show="errors.has('Project')"
                >{{ errors.first("Project") }}</span
              >
            </div>
          </div>

          <!-- Company Name -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Campaign name
              <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Company name"
            class="material-icons-outlined"
            >help_outline</span
          > -->
            </span>
            <div class="w-100 d-flex flex-column">
              <input
                autocorrect="off"
                autocomplete="off"
                type="text"
                class="form-control rounded w-100"
                aria-label="Name"
                aria-describedby="Name"
                v-model="name"
                name="Name"
                v-validate="'required'"
              />
              <span class="text-danger text-sm" v-show="errors.has('Name')">{{
                errors.first("Name")
              }}</span>
            </div>
          </div>

          <!-- Keyword -->
          <draggable>
            <div class="card_inputgroup">
              <span class="card_inputgroup__title">
                Keyword
                <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Keyword"
            class="material-icons-outlined"
            >help_outline</span
          > -->
              </span>
              <!-- <b-form-tags
          input-id="tags-basic"
          v-model="keyword_value"
          placeholder="Enter a new keyword and press enter"
          :limit="limit"
          limitTagsText="Keyword limit reached"
        >
        </b-form-tags> -->
              <div class="w-100 d-flex flex-column">
                <input
                  @mouseenter="mouseEnter"
                  autocorrect="off"
                  autocomplete="off"
                  type="text"
                  class="form-control rounded w-100"
                  aria-label="keyword"
                  aria-describedby="keyword"
                  v-model="keyword"
                  name="keyword"
                  v-validate="'required'"
                />

                <span
                  class="text-danger text-sm"
                  v-show="errors.has('keyword')"
                  >{{ errors.first("keyword") }}</span
                >
              </div>
              <!-- Documentation: https://bootstrap-vue.org/docs/components/form-tags -->
            </div>
          </draggable>

          <!-- Target SEO Location -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Target SEO Location<span
                v-b-tooltip.hover.right="{ variant: 'dark' }"
                title="Tone of Voice"
                class="material-icons-outlined"
              ></span>
            </span>
            <div class="card_inputgroup__input input-group">
              <select
                class="form-select rounded"
                aria-label="location"
                v-model="location"
                name="location"
                v-validate="'required'"
              >
                <option
                  :value="loc.id"
                  :key="index"
                  v-for="(loc, index) in locations"
                >
                  {{ loc.name | loc }}
                </option>
              </select>
              <span
                class="text-danger text-sm"
                v-show="errors.has('location')"
                >{{ errors.first("location") }}</span
              >
            </div>

            <!-- <span class="card_inputgroup__title mt-3">
              Target SEO Location
               <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target SEO Location"
            class="material-icons-outlined"
            >help_outline</span
          > 
            </span>
            <div class="w-100 d-flex flex-column">
              <div class="card_inputgroup__radio input-group">
                <div class="form-check d-flex flex-column" :key="index" v-for="(loc, index) in locations">
                  <input v-model="location" class="form-check-input w-100" type="radio" name="location" :id="loc.id" :value="loc.id" v-validate="'required'" />
                  <label class="form-check-label" :for="loc.id">{{ loc.name | loc }}</label>
                </div>
              </div>
            </div> -->
          </div>
          <div class="d-flex">
            <span class="card_inputgroup__title"> </span>

            <span
              class="text-danger text-sm w-100 d-flex flex-columna"
              v-show="errors.has('location')"
              >{{ errors.first("location") }}</span
            >
          </div>
        </form>
        <div class="card-text d-flex mt-3">
          <button @click="previous" class="btn btn-primary-outlined ms-auto">
            Back
          </button>

          <button @click="addCampaign" class="btn btn-primary ms-2 text-white">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import draggable from "vuedraggable";
import KeywordDiscovery from "@/store/KeywordDiscovery.js";
export default {
  components: {
    draggable,
  },

  data() {
    return {
      permissions: [],
      name: "",
      keyword: "",
      location: "",
      locations: JSON.parse(localStorage.locations),
      language: "",
      search_keyword: "",
      response: [],
      chosenClient: "",
      submitClients: [],
    };
  },

  methods: {
    previous() {
      if (this.$route.params.project) {
        this.$router.push({
          name: "projects",
          params: {
            id: this.$route.params.project,
          },
        });
      } else {
        this.$router.push({
          name: "feature_pagination_table",
          params: { feature: "keyword_discovery" },
        });
      }
    },
    mouseEnter(evt) {
      if (localStorage.draggedElement.length != 0) {
        this.keyword = localStorage.draggedElement;
        localStorage.setItem("draggedElement", "");
      }
    },
    addCampaign() {
      if (this.$route.params.project) {
        this.chosenClient = this.$route.params.project;
      }
      var obj = {};

      if (this.$route.params.project) {
        obj = {
          title: this.name,
          keyword: this.keyword,
          locations: [this.location],
          url: this.url,
          client_id: this.chosenClient,
        };
      } else {
        obj = {
          title: this.name,
          keyword: this.keyword,
          locations: [this.location],
          url: this.url,
          client_id: this.chosenClient.id,
        };
      }

      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          KeywordDiscovery.addQuery(obj)
            .then((response) => {
              this.$router.push({
                name: "keyword_discovery",
                params: {
                  id: response.data.data.id,
                  location: this.location,
                },
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  created() {
    this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

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
  max-width: 1200px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
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
.custom-control .custom-control-input {
  width: 16px;
  height: 16px;
}
.custom-control .custom-control-label {
  font-size: 16px;
  margin-left: 0.5rem;
  user-select: none;
}
</style>
