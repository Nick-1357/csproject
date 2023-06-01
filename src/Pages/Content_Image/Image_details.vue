<template>
  <div>
    <form class="card__inputbody">
      <!-- Topic Name -->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Keyword<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="The Name of your Blog"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__input input-group">
          <input
            type="text"
            class="form-control"
            aria-label="keyword"
            aria-describedby="keyword"
            v-model="keyword"
            name="keyword"
            autocorrect="off"
            autocomplete="off"
          />
          <span class="text-danger text-sm" v-show="errors.has('keyword')">{{
            errors.first("keyword")
          }}</span>
        </div>
      </div>

      <!-- image option-->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Size<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target SEO Location"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check" :key="index" v-for="(lan, index) in sizes">
            <input
              v-model="img_option"
              class="form-check-input"
              type="radio"
              name="size"
              :id="lan"
              :value="lan"
            />
            <label class="form-check-label" :for="lan">{{ lan }}</label>
          </div>
        </div>

        <span class="text-danger text-sm" v-show="errors.has('size')">{{
          errors.first("size")
        }}</span>
      </div>

      <!-- Style option-->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Style<span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target SEO Location"
            class="material-icons-outlined"
          ></span>
        </span>
        <div class="card_inputgroup__radio input-group">
          <div class="form-check" :key="index" v-for="(lan, index) in styles">
            <input
              v-model="style"
              class="form-check-input"
              type="radio"
              name="style"
              :id="lan"
              :value="lan"
            />
            <label class="form-check-label" :for="lan">{{ lan }}</label>
          </div>
        </div>

        <span class="text-danger text-sm" v-show="errors.has('style')">{{
          errors.first("style")
        }}</span>
      </div>
    </form>

    <div class="d-flex">
      <div class="ms-auto"></div>
      <button
        class="btn btn-primary-outlined ms-2 d-flex align-items-center"
        @click="back()"
      >
        Back
      </button>
      <button class="btn btn-primary btn-next" @click="generate()">Next</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import AiContentGenerator from "@/store/AiContentGenerator.js";
export default {
  components: {},
  data() {
    return {
      img_option: "",
      showSize: [],
      sizes: ["256x256", "512x512", "1024x1024"],
      style: "",
      styles: ["painting", "fantasy", "digital art", "cartoon", "realistic"],
      keyword: JSON.parse(localStorage.content_gen_value).target_phrases,
    };
  },

  methods: {
    back() {
      this.$router.push({
        name: "content_image_add_fields",
        params: { step: "topic_details" },
      });
    },
    generate() {
      if (
        this.keyword.length == 0 ||
        this.img_option.length == 0 ||
        this.style.length == 0
      ) {
        this.$toast.warning("All the inputs are required");

        // this.$bvToast.toast("All the inputs are required", {
        //   title: "Alert",
        //   variant: "warning",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
      } else {
        var obj = {
          img_option: this.img_option,
          style: this.style,
          keyword: this.keyword,
          image_id: "Introduction",
        };

        AiContentGenerator.addContentCampaign(
          JSON.parse(localStorage.content_gen_value)
        )
          .then((response) => {
            AiContentGenerator.addNexArt(response.data.data.id, obj)
              .then((response_img) => {
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "content",
                    id: response.data.data.id,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
                this.$router.push({
                  name: "content_image_add_fields",
                  params: {
                    step: "content",
                    id: response.data.data.id,
                  },
                });

                loader.hide();
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },

  created() {},
  mounted() {},
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