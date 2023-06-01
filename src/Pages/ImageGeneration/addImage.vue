<template>
  <div>
    <div class="keywordpage__wrapper">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>/

          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'image_generator' },
            }"
            class="route__link"
            >View All </router-link
          >/ Add Keyword
        </p>
      </div>

      <div class="nexcard">
        <h3 class="modal-card__title text-center mb-4">Image Generation</h3>

        <div class="step__row" style="max-width: 350px">
          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step1-active.svg" v-if="this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Keyword Details</span>
          </div>

          <hr />

          <div class="step__col">
            <img src="@/assets/input-step-icons/icon-step2-inactive.svg" v-if="this.$route.params.step == 'topic_details'" />
            <img src="@/assets/input-step-icons/icon-step2-active.svg" v-else-if="this.$route.params.step == 'result'" />
            <img src="@/assets/input-step-icons/icon-step-complete.svg" v-else />
            <span class="step__name">Result</span>
          </div>
        </div>

        <div v-if="this.$route.params.step == 'topic_details'">
          <form class="card__inputbody">
            <!-- Project name-->
            <div class="card_inputgroup">
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

            <div class="card_inputgroup">
              <span class="card_inputgroup__title">
                Title
                <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span> -->
              </span>
              <div class="card_inputgroup__input input-group">
                <input class="form-control rounded w-100" autocorrect="off" autocomplete="off" type="text" id="title" name="title" placeholder="" v-model="title" />

                <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first("title") }}</span>
              </div>
            </div>

            <div class="card_inputgroup">
              <span class="card_inputgroup__title">
                Keyword
                <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span> -->
              </span>
              <div class="card_inputgroup__input input-group">
                <input class="form-control rounded w-100" autocorrect="off" autocomplete="off" type="text" id="keyword" name="keyword" placeholder="" v-model="keyword" />

                <span class="text-danger text-sm" v-show="errors.has('keyword')">{{ errors.first("keyword") }}</span>
              </div>
            </div>

            <div class="card_inputgroup">
              <span class="card_inputgroup__title">
                Size
                <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span> -->
              </span>
              <div class="card_inputgroup__input input-group">
                <select class="form-select" id="inputGroupSelect04" v-model="img_option">
                  <option :value="lan" :key="index" v-for="(lan, index) in sizes">
                    {{ lan }}
                  </option>
                </select>

                <span class="text-danger text-sm" v-show="errors.has('size')">{{ errors.first("size") }}</span>
              </div>
            </div>

            <div class="card_inputgroup">
              <span class="card_inputgroup__title">
                Style
                <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Project name"
            class="material-icons-outlined"
          ></span> -->
              </span>
              <div class="card_inputgroup__input input-group">
                <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="style">
                  <option :value="lan" :key="index" v-for="(lan, index) in styles">
                    {{ lan }}
                  </option>
                </select>

                <span class="text-danger text-sm" v-show="errors.has('style')">{{ errors.first("style") }}</span>
              </div>
            </div>
          </form>

          <div class="card-text d-flex mt-3">
            <div class="ms-auto"></div>
            <button class="btn btn-primary-outlined ms-2" @click="previous()">Back</button>
            <button class="btn btn-primary ms-2 text-white" @click="generate()">Next</button>
          </div>
        </div>

        <result v-else-if="this.$route.params.step == 'result'" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// import draggable from "vuedraggable";
import result from "./ImageResult.vue";
import ImageGenerator from "@/store/ImageGenerator.js";
export default {
  components: { result },
  data() {
    return {
      keyword_value: ["Keyword_1", "Keyword_2"],
      limit: 5,
      submitClients: "",
      submitClients: [],
      img_option: "",
      sizes: ["256x256", "512x512", "1024x1024"],
      style: "",
      styles: ["painting", "fantasy", "digital art", "cartoon", "realistic"],
      title: "",
    };
  },
  methods: {
    previous() {
      this.$router.push({
        name: "feature_pagination_table",
        params: {
          feature: "image_generator",
        },
      });
    },
    generate() {
      if (this.keyword.length == 0 || this.img_option.length == 0 || this.style.length == 0 || this.title.length == 0 || this.chosenClient.length == 0) {
        this.$toast.success("All the inputs are required");
      } else {
        var obj = {
          keyword: this.keyword,
          title: this.title,
          img_option: this.img_option,
          style: this.style,
          client_id: this.chosenClient.id,
        };

        ImageGenerator.addArtCampaign(obj)
          .then((response) => {
            this.$toast.success(response.data.message);
            this.$router.push({
              name: "Image Generator_Add Keyword",
              params: {
                step: "result",
                id: response.data.data.id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    this.submitClients = JSON.parse(localStorage.nexrank_client).sort((a, b) => a.name.localeCompare(b.name));
  },
};
</script>
<style lang="css">
hr {
  width: 80px;
  margin: 1rem 0.5rem 1rem 0.5rem;
}
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
.step__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}
.step__col {
  min-width: 20px;
  text-align: center;
  user-select: none;
}

.step__name {
  white-space: pre;
  margin-left: 0.5rem;
}
</style>
