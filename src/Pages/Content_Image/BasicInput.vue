<template>
  <div>
    <form class="card__inputbody">
      <!-- Project name-->
      <div class="card_inputgroup" v-if="!$route.params.project">
        <span class="card_inputgroup__title">
          Project name<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <select
            class="form-select rounded"
            aria-label="Project name"
            v-model="chosenClient"
            name="Project"
          >
            <option
              :value="lan.id"
              :key="index"
              v-for="(lan, index) in submitClients"
            >
              {{ lan.name }}
            </option>
          </select>

          <span class="text-danger text-sm" v-show="errors.has('Project')">{{
            errors.first("Project")
          }}</span>
        </div>
      </div>
      <!-- Topic Name -->
      <draggable>
        <div
          class="card_inputgroup"
          v-if="
            case_keyword == 'blog idea and outline' ||
            case_keyword == 'blog section writing' ||
            case_keyword == 'selling copywriting' ||
            case_keyword == 'descriptive copywriting' ||
            case_keyword == 'paragraphs' ||
            case_keyword == 'facebook captions' ||
            case_keyword == 'linkedIn posts' ||
            case_keyword == 'facebook ads' ||
            case_keyword == 'linkedIn ads' ||
            case_keyword == 'instagram captions' ||
            case_keyword == 'tiktok captions' ||
            case_keyword == 'twitter posts' ||
            case_keyword == 'business idea pitching' ||
            case_keyword == 'keyword cluster' ||
            case_keyword == 'blog writing'
          "
        >
          <span class="card_inputgroup__title">
            Topic Name<span
              v-b-tooltip.hover.right="{ variant: 'dark' }"
              title="The Name of your Blog"
              class="material-icons-outlined"
            ></span>
          </span>

          <div class="card_inputgroup__input input-group">
            <input
              @mouseenter="mouseEnterKeyword"
              autocorrect="off"
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
        </div>
      </draggable>
      <!-- Company Name -->
      <div
        v-if="
          case_keyword == 'business idea pitching' ||
          case_keyword == 'google ad title' ||
          case_keyword == 'google ad descriptions' ||
          case_keyword == 'google search ads'
        "
        class="card_inputgroup"
      >
        <span class="card_inputgroup__title">
          Company Name<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="The Name of your Blog"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <input
            autocorrect="off"
            autocomplete="off"
            type="text"
            class="form-control"
            aria-label="Company Name"
            aria-describedby="Company Name"
            name="Company Name "
            v-model="product_name"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Company Name ')"
            >{{ errors.first("Company Name ") }}</span
          >
        </div>
      </div>
      <!-- Product/Service Name -->
      <div
        v-if="
          case_keyword == 'selling copywriting' ||
          case_keyword == 'descriptive copywriting' ||
          case_keyword == 'facebook ads' ||
          case_keyword == 'linkedIn ads' ||
          case_keyword == 'instagram captions' ||
          case_keyword == 'tiktok captions' ||
          case_keyword == 'twitter posts' ||
          case_keyword == 'product descriptions'
        "
        class="card_inputgroup"
      >
        <span class="card_inputgroup__title">
          Product/Service Name<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="The Name of your Blog"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <input
            autocorrect="off"
            autocomplete="off"
            type="text"
            class="form-control rounded"
            aria-label="Product/Service Name"
            aria-describedby="Product/Service Name"
            name="Product/Service Name "
            v-model="product_name"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Product/Service Name ')"
            >{{ errors.first("Product/Service Name ") }}</span
          >
        </div>
      </div>
      <!-- Product/Service Description -->
      <div
        v-if="
          case_keyword == 'selling copywriting' ||
          case_keyword == 'descriptive copywriting' ||
          case_keyword == 'facebook ads' ||
          case_keyword == 'linkedIn ads' ||
          case_keyword == 'instagram captions' ||
          case_keyword == 'tiktok captions' ||
          case_keyword == 'twitter posts' ||
          case_keyword == 'product descriptions'
        "
        class="card_inputgroup"
      >
        <span class="card_inputgroup__title">
          Product/Service Description<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="The Name of your Blog"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <input
            autocorrect="off"
            autocomplete="off"
            type="text"
            class="form-control"
            aria-label="Product/Service Name"
            aria-describedby="Product/Service Name"
            name="Product/Service Description "
            v-model="product_description"
          />
        </div>
        <span
          class="text-danger text-sm"
          v-show="errors.has('Product/Service Description ')"
          >{{ errors.first("Product/Service Description ") }}</span
        >
      </div>
      <!-- Video title -->
      <draggable>
        <div
          v-if="
            case_keyword == 'youtube intros' ||
            case_keyword == 'youtube descriptions' ||
            case_keyword == 'video description'
          "
          class="card_inputgroup"
        >
          <span class="card_inputgroup__title">
            Video Title<span
              v-b-tooltip.hover.right="{ variant: 'dark' }"
              title="The Name of your Blog"
              class="material-icons-outlined"
            ></span>
          </span>

          <div class="card_inputgroup__input input-group">
            <input
              @mouseenter="mouseEnterKeyword"
              autocorrect="off"
              autocomplete="off"
              type="text"
              class="form-control"
              aria-label="Video Title"
              aria-describedby="Video Title"
              name="Video Title "
              placeholder=""
              v-model="keyword"
            />

            <span
              class="text-danger text-sm"
              v-show="errors.has('Video Title ')"
              >{{ errors.first("Video Title ") }}</span
            >
          </div>
        </div>
      </draggable>
      <!-- Video topic -->
      <draggable>
        <div v-if="case_keyword == 'video idea'" class="card_inputgroup">
          <span class="card_inputgroup__title">
            Video Topic<span
              v-b-tooltip.hover.right="{ variant: 'dark' }"
              title="The Name of your Blog"
              class="material-icons-outlined"
            ></span>
          </span>

          <div class="card_inputgroup__input input-group">
            <input
              @mouseenter="mouseEnterKeyword"
              autocorrect="off"
              autocomplete="off"
              type="text"
              class="form-control"
              aria-label="Topic Topic"
              aria-describedby="Topic Topic"
              name="Video Topic "
              placeholder=""
              v-model="keyword"
            />
          </div>
        </div>
      </draggable>
      <!-- Target Phrases - Draggable -->
      <draggable>
        <div
          v-if="
            case_keyword == 'facebook captions' ||
            case_keyword == 'linkedIn posts' ||
            case_keyword == 'youtube intros' ||
            case_keyword == 'youtube descriptions' ||
            case_keyword == 'video description' ||
            case_keyword == 'video idea' ||
            case_keyword == 'blog writing'
          "
          class="card_inputgroup"
        >
          <span class="card_inputgroup__title">
            Target Phrases
            <span
              v-b-tooltip.hover.right="{ variant: 'dark' }"
              title="Keywords"
              class="material-icons-outlined"
            ></span>
          </span>

          <div class="card_inputgroup__input">
            <!-- @mouseenter="mouseEnter" -->
            <!-- <b-form-tags
              input-id="tags-basic"
              @change="getValue"
              autocorrect="off"
              autocomplete="off"
              separator=" ,;"
              placeholder="Add Keywords and press Enter"
              id="keywords"
              name="Target Keywords   "
              v-model="target_phrases"
            >
            </b-form-tags> -->

            <input
              @mouseenter="mouseEnter"
              autocorrect="off"
              autocomplete="off"
              type="text"
              class="form-control"
              aria-label="Target Phrases"
              aria-describedby="Target Phrases"
              name="Target Phrases "
              placeholder=""
              v-model="target_phrases"
            />

            <span
              class="text-danger text-sm"
              v-show="errors.has('Target Phrases  ')"
              >{{ errors.first("Target Phrases  ") }}</span
            >
          </div>
        </div>
      </draggable>
      <!-- Target Keyword & phrases- Draggable -->
      <draggable>
        <div
          class="card_inputgroup"
          v-if="
            case_keyword == 'product descriptions' ||
            case_keyword == 'google ad title' ||
            case_keyword == 'google ad descriptions' ||
            case_keyword == 'google search ads'
          "
        >
          <span class="card_inputgroup__title">
            Target Keywords
            <span
              v-b-tooltip.hover.right="{ variant: 'dark' }"
              title="Keywords"
              class="material-icons-outlined"
            ></span>
          </span>

          <div class="card_inputgroup__input">
            <input
              @mouseenter="mouseEnterKeyword"
              autocorrect="off"
              autocomplete="off"
              type="text"
              class="form-control"
              aria-label="Target Keywords"
              aria-describedby="Target Keywords"
              name="Target Keywords"
              placeholder=""
              v-model="keyword"
            />

            <span
              class="text-danger text-sm"
              v-show="errors.has('Target Keywords')"
              >{{ errors.first("Target Keywords") }}</span
            >
          </div>
        </div>
      </draggable>
      <!-- Target Keyword & phrases- Draggable -->
      <draggable>
        <div
          class="card_inputgroup"
          v-if="
            case_keyword == 'selling copywriting' ||
            case_keyword == 'descriptive copywriting' ||
            case_keyword == 'paragraphs'
          "
        >
          <span class="card_inputgroup__title">
            Target Keywords and Phrases
            <span
              v-b-tooltip.hover.right="{ variant: 'dark' }"
              title="Keywords"
              class="material-icons-outlined"
            ></span>
          </span>

          <div class="card_inputgroup__input">
            <input
              @mouseenter="mouseEnter"
              autocorrect="off"
              autocomplete="off"
              type="text"
              class="form-control"
              aria-label="Target Keywords"
              aria-describedby="Target Keywords"
              name="Target Keywords and Phrases"
              placeholder=""
              v-model="target_phrases"
            />

            <span
              class="text-danger text-sm"
              v-show="errors.has('Target Keywords and Phrases')"
              >{{ errors.first("Target Keywords and Phrases") }}</span
            >
          </div>
        </div>
      </draggable>
      <!-- Tone of Voice -->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Tone of Voice<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Tone of Voice"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <select
            class="form-select rounded"
            aria-label="Tone of Voice"
            v-model="chosenTone"
            v-validate="'required'"
            name="tone"
          >
            <option
              :value="lan"
              :key="index_lan"
              v-for="(lan, index_lan) in Tone"
            >
              {{ lan }}
            </option>
          </select>
          <span class="text-danger text-sm" v-show="errors.has('tone')">{{
            errors.first("tone")
          }}</span>
        </div>
      </div>
      <!-- Character Length -->
      <div class="card_inputgroup" v-if="case_keyword == 'blog writing'">
        <span class="card_inputgroup__title">
          Character Length<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Express Mode"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check">
            <input
              v-model="length"
              class="form-check-input"
              type="radio"
              name="length"
              id="short"
              value="short"
            />
            <label class="form-check-label" for="short">
              Short (400-600 words)
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="length"
              class="form-check-input"
              type="radio"
              name="length"
              id="medium"
              value="medium"
            />
            <label class="form-check-label" for="medium">
              Medium (750-1000 words)
            </label>
          </div>
        </div>
      </div>
      <!-- Language -->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Language<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Language of your blog"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <select
            class="form-select rounded"
            aria-label="Language"
            v-model="language"
            name="language"
            v-validate="'required'"
          >
            <optgroup
              :key="index"
              v-for="(item, index) in languages"
              :label="item.label"
            >
              <option
                :value="lan.value"
                :key="index_lan"
                v-for="(lan, index_lan) in item.languageOption"
              >
                {{ lan.name }}
              </option>
            </optgroup>
          </select>

          <span class="text-danger text-sm" v-show="errors.has('language')">{{
            errors.first("language")
          }}</span>
        </div>
      </div>
      <!-- Express Mode -->
      <div class="card_inputgroup" v-if="case_keyword != 'blog writing'">
        <span class="card_inputgroup__title">
          Express Mode<span
            v-b-tooltip.hover.right="{ variant: 'primary' }"
            title="Disable to Localise semantic keyword"
            class="material-icons-outlined"
            >help_outline</span
          >
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check">
            <input
              v-model="location_type"
              class="form-check-input"
              type="radio"
              name="location"
              id="no_location"
              value="no_location"
            />
            <label class="form-check-label" for="no_location"> Enable </label>
          </div>
          <div class="form-check">
            <input
              v-model="location_type"
              class="form-check-input"
              type="radio"
              name="location"
              id="has_location"
              value="has_location"
            />
            <label class="form-check-label" for="has_location"> Disable </label>
          </div>
        </div>
      </div>
      <!-- Target SEO Location -->
      <div
        class="card_inputgroup"
        v-if="case_keyword == 'blog writing' || location_type == 'has_location'"
      >
    


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
      <!-- Express Mode -->
      <div class="card_inputgroup" v-if="case_keyword == 'blog writing'">
        <span class="card_inputgroup__title">
          Express Mode<span
            v-b-tooltip.hover.right="{ variant: 'primary' }"
            title="One step function to generate whole blog. Disable to unlock 2 step mode for viewing and modifying the subtopics before generating the whole blog"
            class="material-icons-outlined"
            >help_outline</span
          >
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check">
            <input
              v-model="product_type"
              class="form-check-input"
              type="radio"
              name="express"
              id="express"
              value="express"
            />
            <label class="form-check-label" for="express"> Enable </label>
          </div>
          <div class="form-check">
            <input
              v-model="product_type"
              class="form-check-input"
              type="radio"
              name="express"
              id="two_steps"
              value="two_steps"
            />
            <label class="form-check-label" for="two_steps"> Disable </label>
          </div>
        </div>
      </div>
      <!--generate image-->
      <div class="card_inputgroup" v-if="case_keyword == 'blog writing'">
        <span class="card_inputgroup__title">
          Generate Image<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Express Mode"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check">
            <input
              v-model="add_image"
              class="form-check-input"
              type="radio"
              name="image"
              id="image"
              value="image"
            />
            <label class="form-check-label" for="image"> Yes </label>
          </div>
          <div class="form-check">
            <input
              v-model="add_image"
              class="form-check-input"
              type="radio"
              name="image"
              id="no_image"
              vlue="no_image"
            />
            <label class="form-check-label" for="no_image"> No </label>
          </div>
        </div>
      </div>
    </form>

    <div class="d-flex">
      <div class="ms-auto"></div>
      <!-- <button
        class="btn btn-primary-outlined ms-2 d-flex align-items-center"
        v-if="!$route.params.project"
        @click="previous()"
      >
        <span class="material-icons-outlined me-2"> keyboard_backspace </span>
        New Project
      </button> -->
      <button class="btn btn-primary btn-next" @click="generate()">Next</button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import draggable from "vuedraggable";
import AiContentGenerator from "@/store/AiContentGenerator.js";
export default {
  name: "BlogWriting",
  components: { draggable },
  data() {
    return {
      keyword_value: ["Keyword_1", "Keyword_2"],
      content: [],
      locations: JSON.parse(localStorage.locations),
      keyword: [],
      topic: "",
      blog_Intro: "",
      location: "",
      language: "",
      purpose: "",
      company_Name: "",
      company_Solution: "",
      permissions: localStorage.permissions,
      product_Description: "",
      target_Keywords_Phrases: "",
      call_To_Action: "",
      occasion: "",
      target_Keywords: "",
      video_Title: "",
      video_Hook: "",
      video_Description: "",
      video_Topic: "",
      chosenTone: "",
      length: "",
      chosenClient: "",
      id_client_id: "",
      id_language: "",

      target_phrases: "",
      product_name: "",
      product_description: "",

      case_keyword: this.$route.params.category,
      DisplayCase: [],
      product_type: "express",
      location_type: "no_location",
      add_image: "image",
      Tone: [
        "casual",
        "descriptive",
        "enthusiastic",
        "humorous",
        "informative",
        "inspirational",
        "joyful",
        "marketing",
        "passionate",
        "persuasive",
        "professional",
        "relaxed",
        "thoughtful",
      ],

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

      Chooselength: [
        // { text: "Long (2200-2500 words)", value: "long" },
        { text: "Medium (750-1000 words)", value: "medium" },
        { text: "Short (400-600 words)", value: "short" },
      ],

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
      subtopics: [],
      topics: [],
      words: [],
      anchors: [],
      p: [],
      keywordTimeout: null,
      filterContent: [],
    };
  },
  methods: {
    previous() {
      this.$router.push({
        name: "content_image_add_fields",
        params: { step: "project_details" },
      });
    },
    clickcheck() {
      console.log("clickcheck");
    },

    submit(data) {
      AiContentGenerator.addContentCampaign(data)
        .then((response) => {
          this.$router.push({
            name: "content_image_add_fields",
            params: { step: "content", id: response.data.data.id },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generate() {
      if (this.$route.params.project) {
        this.chosenClient = this.$route.params.project;
      }

      var incomplete = false;

      var objPay = {};

      if (this.case_keyword == "blog writing") {
        if (
          this.keyword.length == 0 ||
          this.location.length == 0 ||
          this.chosenClient.length == 0 ||
          this.length.length == 0 ||
          this.language.length == 0
        ) {
          incomplete = true;
          this.$toast.warning("All the inputs are required");
          // this.$bvToast.toast("All the inputs are required", {
          //   title: "Alert",
          //   variant: "warning",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
        } else {
          if (this.target_phrases.length == 0 && this.chosenTone.length == 0) {
            objPay = {
              type: "blog_writer",
              location_id: this.location,
              client_id: this.chosenClient,
              model_type: this.length,
              language: this.language,

              keyword: this.keyword,

              generation_depth: "new",
              product_type: this.product_type,
            };
          } else if (this.target_phrases.length == 0) {
            objPay = {
              type: "blog_writer",
              location_id: this.location,
              client_id: this.chosenClient,
              model_type: this.length,
              language: this.language,
              tone: this.chosenTone,
              keyword: this.keyword,

              generation_depth: "new",
              product_type: this.product_type,
            };
          } else if (this.chosenTone.length == 0) {
            objPay = {
              type: "blog_writer",
              location_id: this.location,
              client_id: this.chosenClient,
              model_type: this.length,
              language: this.language,

              keyword: this.keyword,
              target_phrases: this.target_phrases,
              generation_depth: "new",
              product_type: this.product_type,
            };
          } else {
            objPay = {
              type: "blog_writer",
              location_id: this.location,
              client_id: this.chosenClient,
              model_type: this.length,
              language: this.language,
              tone: this.chosenTone,
              keyword: this.keyword,
              target_phrases: this.target_phrases,
              generation_depth: "new",
              product_type: this.product_type,
            };
          }

          localStorage.setItem("content_gen_value", JSON.stringify(objPay));
          this.NextSubmit();
        }
      } else {
        if (
          this.chosenClient.length == 0 ||
          this.chosenTone.length == 0 ||
          this.language.length == 0
        ) {
          this.$toast.warning("All the inputs are required");

          // this.$bvToast.toast("All the inputs are required", {
          //   title: "Alert",
          //   variant: "warning",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
        } else {
          if (this.location_type == "no_location") {
            objPay = {
              type: "free_style",
              client_id: this.chosenClient,
              language: this.language,
              subtopic_case: this.case_keyword,
              tone: this.chosenTone,
              keyword: this.keyword,
              target_phrases: this.target_phrases,
              product_name: this.product_name,
              product_description: this.product_description,
              generation_depth: "new",
            };
          } else {
            objPay = {
              type: "free_style",
              location_id: this.location,
              client_id: this.chosenClient,
              language: this.language,
              subtopic_case: this.case_keyword,
              tone: this.chosenTone,
              keyword: this.keyword,
              target_phrases: this.target_phrases,
              product_name: this.product_name,
              product_description: this.product_description,
              generation_depth: "new",
            };
          }

          for (const [key, value] of Object.entries(objPay)) {
            if (value.length == 0) {
              delete objPay[key];
            }
          }

          //

          localStorage.setItem("content_gen_value", JSON.stringify(objPay));
          this.NextSubmit();
        }
      }
    },
    NextSubmit() {
      if (this.case_keyword == "blog writing") {
        if (this.add_image == "image") {
          this.$router.push({
            name: "content_image_add_fields",
            params: { step: "add_image_input" },
          });
        } else {
          this.submit(JSON.parse(localStorage.content_gen_value));
        }
      } else {
        this.submit(JSON.parse(localStorage.content_gen_value));
      }
    },
    mouseEnter(evt) {
      if (localStorage.draggedElement.length != 0) {
        console.log(localStorage.draggedElement);
        this.target_phrases = localStorage.draggedElement;

        localStorage.setItem("draggedElement", "");
      }
    },
    mouseEnterKeyword(evt) {
      if (localStorage.draggedElement.length != 0) {
        console.log(localStorage.draggedElement);
        this.keyword = localStorage.draggedElement;

        localStorage.setItem("draggedElement", "");
      }
    },
  },

  created() {
    if (
      this.case_keyword == "blog section writing" ||
      this.case_keyword == "paragraphs"
    ) {
      this.location_type = "has_location";
    } else {
      this.location_type = "no_location";
    }

    this.DisplayCase = this.Cases;

    this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (localStorage.project_for_seo_automation) {
      JSON.parse(localStorage.nexrank_client).forEach((element) => {
        if (element.id == localStorage.project_for_seo_automation) {
          this.chosenClient = element.id;
        }
      });
    }

    if (localStorage.content_gen_value) {
      if (this.$route.params.project) {
        this.chosenClient = this.$route.params.project;
      } else {
        this.chosenClient = JSON.parse(
          localStorage.content_gen_value
        ).client_id;
      }

      this.location = JSON.parse(localStorage.content_gen_value).location_id;
      this.length = JSON.parse(localStorage.content_gen_value).model_type;
      this.language = JSON.parse(localStorage.content_gen_value).language;
      this.chosenTone = JSON.parse(localStorage.content_gen_value).tone;
      this.keyword = JSON.parse(localStorage.content_gen_value).keyword;
      this.target_phrases = JSON.parse(
        localStorage.content_gen_value
      ).target_phrases;
      this.product_type = "express";
    }
  },
};
</script>
<style lang="css">
.card__inputbody {
  margin: 0 auto;
  padding: 3rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}
.card__title {
  color: #355239;
  font-weight: bold;
  margin: 1rem 0rem;
}
.card_inputgroup {
  display: flex;
  align-items: center;
  color: #355239;
  margin: 1rem 0;
}
/* .card_inputgroup.short {
  max-width: 400px;
} */
/* .card_inputgroup.short .card_inputgroup__radio{
  justify-content: start;
} */
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
  /* transform: translate(30px,5px);
  position: absolute;
  z-index: -1; */
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
.card_inputgroup__radio
  .form-check
  .form-check-input:checked
  ~ .form-check-label {
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
  color: red !important;
}
.b-form-tags .b-form-tags-list .badge .b-form-tag,
.b-form-tag-content {
  color: #61656a !important;
  font-size: 14px;
}
#tags-basic {
  font-size: 14px;
  margin-left: 0.5rem !important;
}
</style>
