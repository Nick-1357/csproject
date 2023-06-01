<template>
  <div>
    <form class="card__inputbody">
      <!-- Project name-->

      <div class="card_inputgroup">
        <span class="card_inputgroup__title"> Type </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check">
            <input
              v-model="type_of_gen"
              class="form-check-input"
              type="radio"
              name="general"
              id="general"
              value="general"
            />
            <label class="form-check-label" for="general"> Content Optimizer </label>
          </div>
          <div class="form-check">
            <input
              v-model="type_of_gen"
              class="form-check-input"
              type="radio"
              name="content-planner"
              id="content-planner"
              value="content-planner"
            />
            <label class="form-check-label" for="content-planner">
              Content Planner
            </label>
          </div>
        </div>
      </div>

      <div class="card_inputgroup" v-if="!$route.params.project">
        <span class="card_inputgroup__title">
          Project name
          <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span> -->
        </span>
        <div class="card_inputgroup__input input-group">
          <select class="form-select rounded w-100" aria-label="Project name" v-model="chosenClient" name="Project" v-validate="'required'">
            <option :value="lan" :key="index" v-for="(lan, index) in submitClients">
              {{ lan.name }}
            </option>
          </select>

          <span class="text-danger text-sm" v-show="errors.has('Project')">{{ errors.first("Project") }}</span>
        </div>
      </div>

      <!-- Keyword -->
      <draggable>
        <div class="card_inputgroup">
          <span class="card_inputgroup__title">
            Keyword
            <span
            v-b-tooltip.hover.right="{ variant: 'primary' }"
            title="Insert one Target Keyword to rank in Google"
            class="material-icons-outlined"
            >help_outline</span
          >
          </span>
          <!-- <b-form-tags
          input-id="tags-basic"
          v-model="keyword_value"
          placeholder="Enter a new keyword and press enter"
          :limit="limit"
          limitTagsText="Keyword limit reached"
        >
        </b-form-tags> -->
          <div class="card_inputgroup__input input-group">
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

            <span class="text-danger text-sm" v-show="errors.has('keyword')">{{ errors.first("keyword") }}</span>
          </div>

          <!-- Documentation: https://bootstrap-vue.org/docs/components/form-tags -->
        </div>
      </draggable>
      <!-- Company Name -->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Company name
          <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Company name"
            class="material-icons-outlined"
            >help_outline</span
          > -->
        </span>
        <div class="card_inputgroup__input input-group">
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
          <span class="text-danger text-sm" v-show="errors.has('Name')">{{ errors.first("Name") }}</span>
        </div>
      </div>

      <!-- Target URL -->
      <!-- <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Target URL (opt)
          <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target URL"
            class="material-icons-outlined"
            >help_outline</span
          >
        </span>
        <div class="card_inputgroup__input input-group">
          <input
            type="text"
            class="form-control rounded"
            aria-label="Topic Name"
            aria-describedby="Topic Name"
            v-model="keyword"
            name="Topic"
          />
          <span class="text-danger text-sm" v-show="errors.has('Topic')">{{
            errors.first("Topic")
          }}</span>
        </div>
      </div> -->

      <!-- Language -->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Language

          <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Language"
            class="material-icons-outlined"
            >help_outline</span
          > -->
        </span>
        <div class="card_inputgroup__input input-group">
          <select class="form-select rounded w-100" aria-label="Language" v-model="language" name="language" v-validate="'required'">
            <optgroup :key="index" v-for="(item, index) in languages" :label="item.label">
              <option :value="lan.value" :key="index_lan" v-for="(lan, index_lan) in item.languageOption">
                {{ lan.name }}
              </option>
            </optgroup>
          </select>

          <span class="text-danger text-sm" v-show="errors.has('language')">{{ errors.first("language") }}</span>
        </div>
      </div>

      <!-- Target SEO Location -->
      <div class="card_inputgroup">
        <!-- <span class="card_inputgroup__title">
          Target SEO Location
        <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target SEO Location"
            class="material-icons-outlined"
            >help_outline</span
          > 
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check" :key="index" v-for="(loc, index) in locations">
            <input v-model="location" class="form-check-input" type="radio" name="location" :id="loc.id" :value="loc.id" v-validate="'required'" />
            <label class="form-check-label" :for="loc.id">{{ loc.name | loc }}</label>
          </div>
        </div> -->

        
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
          >
            <option
              :value="loc.id"
              :key="index"
              v-for="(loc, index) in locations"
            >
              {{ loc.name | loc }}
            </option>
          </select>
          <!-- <span class="text-danger text-sm" v-show="errors.has('tone')">{{
            errors.first("tone")
          }}</span> -->
        </div>
      </div>

      <div class="d-flex">
        <span class="card_inputgroup__title"> </span>

        <span class="text-danger text-sm w-100 d-flex flex-columna" v-show="errors.has('location')">{{ errors.first("location") }}</span>
      </div>

      <div class="card_inputgroup" v-if="type_of_gen == 'general'">
        <span class="card_inputgroup__title">
          Target URL
          <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Express Mode"
            class="material-icons-outlined"
          ></span> -->
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check">
            <input v-model="add_url" class="form-check-input" type="radio" name="url" id="url" value="url" />
            <label class="form-check-label" for="url"> Yes </label>
          </div>
          <div class="form-check">
            <input v-model="add_url" class="form-check-input" type="radio" name="url" id="no_url" vlue="no_url" />
            <label class="form-check-label" for="no_url"> No </label>
          </div>
        </div>
      </div>
    </form>
    <div class="d-flex">
      <div class="ms-auto"></div>
      <!-- <button class="btn btn-primary-outlined ms-2 d-flex align-items-center" v-if="!$route.params.project" @click="previous()">
        <span class="material-icons-outlined me-2"> keyboard_backspace </span> New Project
      </button> -->
      <button class="btn btn-primary ms-2 text-white" @click="nextStep()">Next</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import draggable from "vuedraggable";
import Automation from "@/store/Automation.js";

export default {
  name: "AddKeyword",
  components: { draggable },
  data() {
    return {
      keyword_value: ["Keyword_1", "Keyword_2"],
      limit: 5,
      add_url: "url",
      languages: [
        {
          label: "General",
          languageOption: [{ name: "English", value: "en" }],
        },
        {
          label: "Southeast Asia",
          languageOption: [
            { name: "Bahasa Malaysia", value: "ms" },
            { name: "Filipino", value: "tl" },
            { name: "Vietnamese", value: "vi" },
            { name: "Indonesian", value: "id" },
            { name: "Thailand", value: "th" },
          ],
        },
        {
          label: "East Asia",
          languageOption: [
            { name: "Chinese (Simplified)", value: "zh-CN" },
            { name: "Chinese (Traditional)", value: "zh-TW" },
            { name: "Japanese", value: "ja" },
          ],
        },
        {
          label: "West Asia",
          languageOption: [{ name: "العربية", value: "ar" }],
        },
        {
          label: "Europe",
          languageOption: [
            { name: "Italian", value: "it" },
            { name: "French", value: "fr" },
            { name: "German", value: "de" },
            { name: "Portuguese ", value: "pt" },
            { name: "Spanish", value: "es" },
          ],
        },

        // { name: "Chinese", value: "zh-CN" },
        // { name: "Japanese", value: "ja" },
        // { name: "Indonesian", value: "id" },
        // { name: "Italian", value: "it" },
        // { name: "German", value: "de" },
        // { name: "French", value: "fr" },
        // { name: "Spanish", value: "es" },
      ],
      locations: JSON.parse(localStorage.locations),
      location: "",
      submitClients: [],
      chosenClient: "",
      keyword: "",
      name: "",
      language: "",
      loccation: "",
      type_of_gen: "general",
    };
  },
  methods: {
    valChange() {
      console.log("valChange", this.keyword);
    },
    mouseEnter(evt) {
      if (localStorage.draggedElement.length != 0) {
        console.log(localStorage.draggedElement);
        this.keyword = localStorage.draggedElement;
        console.log(this.keyword);
        localStorage.setItem("draggedElement", "");
      }
    },
    nextStep() {
      console.log(this.$route.params.project);
      if (this.$route.params.project) {
        this.chosenClient = this.$route.params.project;
      }

      console.log(this.chosenClient);
      this.$validator.validateAll().then((result) => {
        var obj = {};
        if (result) {
          if (this.$route.params.project) {
            obj = {
              title: this.name,
              keyword: this.keyword,
              location_id: this.location,
              language: this.language,
              client_id: this.chosenClient,
              type: this.type_of_gen,
            };
          } else if (!this.chosenClient.id) {
            obj = {
              title: this.name,
              keyword: this.keyword,
              location_id: this.location,
              language: this.language,
              client_id: this.chosenClient,
              type: this.type_of_gen,
            };
          } else {
            obj = {
              title: this.name,
              keyword: this.keyword,
              location_id: this.location,
              language: this.language,
              client_id: this.chosenClient.id,
              type: this.type_of_gen,
            };
          }

          console.log(obj);

          if (this.type_of_gen == "content-planner") {
            Automation.addSeoAutomation(obj)
              .then((response) => {
                this.$toast.success("Successful");

                // this.$bvToast.toast("successful", {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });

                this.$router.push({
                  name: "ai_seo_automation_campaign_recommended",
                  params: {
                    id: response.data.data.id,
                    location: response.data.data.location.id,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.add_url == "url") {
            console.log(obj);
            localStorage.setItem("seo_automation_data_create", JSON.stringify(obj));

            this.$router.push({
              name: "AI SEO Automation_Add Keyword",
              params: { step: "website_url" },
            });
          } else {
            console.log(this.chosenClient.id);
            Automation.addSeoAutomation(obj)
              .then((response) => {
                this.$toast.success("Successful");

                // this.$bvToast.toast("successful", {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });

                this.$router.push({
                  name: "ai_seo_automation_campaign",
                  params: {
                    id: response.data.data.id,
                    location: response.data.data.location.id,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    },
    previous() {
      this.$router.push({
        name: "AI SEO Automation_Add Keyword",
        params: { step: "project_details" },
      });
    },
  },
  created() {
    this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) => a.name.localeCompare(b.name));

    if (localStorage.project_for_seo_automation) {
      JSON.parse(localStorage.nexrank_client).forEach((element) => {
        if (element.id == localStorage.project_for_seo_automation) {
          this.chosenClient = element.id;
        }
      });
    }
  },
};
</script>
<style lang="css">
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

.card__inputbody {
  margin: 0 auto;
  padding: 3rem 0rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}

.card_inputgroup {
  display: flex;
  align-items: center;
  color: #355239;
  margin: 1rem 0;
}

.card_inputgroup__title {
  min-width: 200px;
  font-weight: bold;
}
.card_inputgroup__input {
  width: 100%;
}
.card_inputgroup__title .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}
.card_inputgroup__radio {
  display: flex;
  justify-content: start;
  margin-right: -1rem;
  user-select: none;
}
.card_inputgroup__radio .form-check .form-check-input {
  visibility: hidden;
}
.card_inputgroup__radio .form-check .form-check-label {
  transform: translate(-20px, 0px);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background-color: var(--white);
  border-radius: 20px;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
}
.card_inputgroup__radio .form-check .form-check-label:hover {
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  transition: all 0.3s ease-out;
}
.card_inputgroup__radio .form-check .form-check-input:checked ~ .form-check-label {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--white);
  transition: all 0.3s ease-out;
}
.b-form-tags .b-form-tags-list .badge {
  background: #e7e7e7 !important;
  visibility: visible !important;
  border-radius: 15px;
  padding: 0.2rem 0.2rem 0.1rem 0.7rem;
}
.b-form-tags .b-form-tags-list .badge,
.b-form-tag {
  font-size: 15px !important;
  color: grey !important;
}
.b-form-tags .b-form-tags-list .badge .b-form-tag,
.b-form-tag-content {
  color: black !important;
  font-size: 15px;
}
#tags-basic {
  font-size: 14px;
  margin-left: 0.5rem !important;
}
</style>
