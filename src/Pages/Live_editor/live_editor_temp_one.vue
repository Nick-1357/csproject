<template>
  <div>
    <h1 class="m-3">Website</h1>
    <p>
      save changes to your website before leave the page/ before change variant
    </p>
    <hr />

    <input
      v-if="$route.params.variant == 'split'"
      @change="setTime"
      v-model="current_variant"
      type="radio"
      id="A"
      name="fav_language"
      value="A"
    />
    <label v-if="$route.params.variant == 'split'" for="html">A</label><br />
    <input
      v-if="$route.params.variant == 'split'"
      @change="setTime"
      v-model="current_variant"
      type="radio"
      id="B"
      name="fav_language"
      value="B"
    />
    <label v-if="$route.params.variant == 'split'" for="css">B</label><br />

    title :
    <input
      type="text"
      autocorrect="off"
      autocomplete="off"
      name="title"
      class="form-control m-2"
      placeholder="Select an element"
      v-model="meta_title"
      aria-label="text"
      aria-describedby="text"
    />

    <div v-if="$route.params.seoAutomation">
      seo suggestions

      <div class="row">
        <div class="col">
          {{ seo_title_suggestion[0] }}
        </div>
      </div>
    </div>

    <button class="btn btn-outline-primary text-center m-2" @click="undoTitle">
      Undo Title
    </button>

    <button
      class="btn btn-outline-primary text-center m-2"
      @click="changeTitle"
    >
      Change title
    </button>
    Description :
    <input
      type="text"
      autocorrect="off"
      autocomplete="off"
      name="desc"
      class="form-control m-2"
      placeholder="Select an element"
      v-model="meta_Desc"
      aria-label="text"
      aria-describedby="text"
    />

    <div v-if="$route.params.seoAutomation">
      seo suggestions

      <div class="row">
        <div class="col">
          {{ seo_description_suggestion[0] }}
        </div>
      </div>
    </div>
    <button class="btn btn-outline-primary text-center m-2" @click="undoDesc">
      Undo Desc
    </button>
    <button class="btn btn-outline-primary text-center m-2" @click="changeDesc">
      Change Description
    </button>

    <span> Get value from Website (iframe) into platform: </span>

    <input
      type="text"
      autocorrect="off"
      autocomplete="off"
      name="text"
      class="form-control m-2"
      placeholder="Select an element"
      v-model="value_to_change"
      aria-label="text"
      aria-describedby="text"
    />

    <div v-if="$route.params.seoAutomation">
      seo suggestions

      <div class="row">
        <div class="col">
          <ol>
            <li
              v-for="(sug, index) in suggestion_to_show"
              :key="'suggestion_to_show' + index"
            >
              {{ sug }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <button class="btn btn-outline-primary text-center m-2" @click="undoValue">
      Undo
    </button>

    <button class="btn btn-outline-primary text-center m-2" @click="addValue">
      change content
    </button>

    <button
      class="btn btn-outline-primary text-center m-2"
      @click="updateWebsite"
    >
      Save changes
    </button>

    <!-- <div v-if="loading" class="d-flex justify-content-center mt-5 mb-3">
        <b-spinner variant="primary" label="Large Spinner"></b-spinner>
      </div> -->

    <div class="card">
      <iframe id="iframe" :src="source" width="100%" height="500px"></iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import meta_cms from "@/store/meta-cms.js";
import Automation from "@/store/Automation.js";
export default {
  components: {},
  data() {
    return {
      value_to_change: "",
      key_to_change: "",
      elements_undo: [],
      title_elements_undo: [],
      desc_elements_undo: [],
      original_key: "",
      original_value: "",
      website_page: [],
      changed_elements: [],
      meta_Desc: [],
      meta_title: [],
      current_variant: "A",
      array_to_store: [],
      page_id: null,
      original_meta_title: "",
      original_metal_description: "",
      source: "http://localhost:8081/?show_editor=true",
      seo_title_suggestion: [],
      seo_description_suggestion: [],
      seo_h1_suggestion: [],
      seo_h2_suggestion: [],
      seo_h3_suggestion: [],
      seo_p_suggestion: [],
      suggestion_to_show: [],
    };
  },

  watch: {
    value_to_change() {
      console.log(this.key_to_change);

      if (this.key_to_change.includes("h1")) {
        this.suggestion_to_show = this.seo_h1_suggestion;
      } else if (this.key_to_change.includes("h2")) {
        this.suggestion_to_show = this.seo_h2_suggestion;
      } else if (this.key_to_change.includes("h3")) {
        this.suggestion_to_show = this.seo_h3_suggestion;
      } else if (this.key_to_change.includes("p")) {
        this.suggestion_to_show = this.seo_p_suggestion;
      } else {
        this.suggestion_to_show = [];
      }
    },
  },

  methods: {
    setTime() {
      var f = document.getElementById("iframe");
      f.src = f.src;

      setTimeout(() => {
        this.changeVar();
      }, 500);
    },
    changeVar() {

      this.value_to_change = "";
      this.key_to_change = "";
      this.elements_undo = [];
      this.title_elements_undo = [];
      this.desc_elements_undo = [];
      this.original_key = "";
      this.original_value = "";
      this.meta_Desc = "";
      this.meta_title = "";
      this.array_to_store = [];

      if (this.page_id != null) {
        this.fetchVariant();
      } else {
        this.meta_Desc = this.original_meta_title;
        this.meta_title = this.original_metal_description;
      }
    },
    updateWebsite() {
      var Varianttype = [];
      if (this.$route.params.variant == "split") {
        Varianttype = "A/B";
        var submitArray = [];
        this.array_to_store.forEach((item, index) => {
          submitArray.push({
            key: item.key,
            value: item.value,
            variant: this.current_variant,
          });
        });
      } else {
        Varianttype = "single";
        var submitArray = [];

        this.array_to_store.forEach((item, index) => {
          submitArray.push({ key: item.key, value: item.value });
        });
      }

      var obj = {};

      if (this.$route.params.seoAutomation != "no_seo") {
        obj = {
          type: "xpath",
          elements: submitArray,
          url: "http://localhost:8081",
          campaign_type: Varianttype,
          seo_automation_id: this.$route.params.seoAutomation,
        };
      } else {
        obj = {
          type: "xpath",
          elements: submitArray,
          url: "http://localhost:8081",
          campaign_type: Varianttype,
        };
      }

      if (this.page_id == null) {
        meta_cms
          .postClientRecomandations(this.$route.params.client_id, obj)
          .then((response) => {
            this.$toast.success(response.data.message);
            this.page_id = response.data.data.id;
            this.website_page = response.data.data;
            this.changed_elements = response.data.data.elements;
          })
          .catch((error) => {
            this.$toast.error(error.respponse.message);
          });
      } else {
        meta_cms
          .updateClientRecommendation(
            this.$route.params.client_id,
            this.page_id,
            obj
          )
          .then((response) => {
            this.$toast.success(response.data.message);
            this.changed_elements = response.data.data.elements;
          })
          .catch((error) => {
            this.$toast.error(error.respponse.message);
          });
      }
    },
    changeTitle() {
      var obj = {
        key: "title",
        value: this.meta_title,
      };

      this.title_elements_undo.push(obj);
      this.sendToWebsite(obj);
      this.$toast.success("Title changed!");
    },
    changeDesc() {
      var obj = {
        key: "description",
        value: this.meta_Desc,
      };

      this.desc_elements_undo.push(obj);
      this.sendToWebsite(obj);
      this.$toast.success("Description changed!");
    },

    sendToWebsite(obj) {
      var duplicate = false;

      if (this.array_to_store.length == 0) {
        this.array_to_store.push(obj);
        duplicate = true;
      } else {
        this.array_to_store.forEach((item, index) => {
          if (obj.key == item.key) {
            item.value = obj.value;
            duplicate = true;
          }
        });
      }

      if (duplicate == false) {
        this.array_to_store.push(obj);
      }

      var iframeWin = document.getElementById("iframe").contentWindow;

      // console.log({ nexmind_live: obj });
      iframeWin.postMessage(
        { nexmind_live: obj },
        "http://localhost:8081/?show_editor=true"
      );
    },
    addValue() {
      if (this.key_to_change.length == 0) {
        this.$toast.warning("Select an element to change");
      } else {
        var obj = {
          key: this.key_to_change,
          value: this.value_to_change,
        };

        this.elements_undo.push(obj);

        this.sendToWebsite(obj);
      }
    },

    undoTitle() {
      if (this.title_elements_undo.length > 1) {
        this.title_elements_undo.splice(-1);

        var lastEntry = this.title_elements_undo.slice(-1).pop();

        this.meta_title = lastEntry.value;

        var iframeWin = document.getElementById("iframe").contentWindow;
        // console.log({ nexmind_live: obj });
        iframeWin.postMessage(
          { nexmind_live: lastEntry },
          "http://localhost:8081/?show_editor=true"
        );
      }
    },
    undoDesc() {
      if (this.desc_elements_undo.length > 1) {
        this.desc_elements_undo.splice(-1);

        var lastEntry = this.desc_elements_undo.slice(-1).pop();
        this.meta_Desc = lastEntry.value;

        var iframeWin = document.getElementById("iframe").contentWindow;
        // console.log({ nexmind_live: obj });
        iframeWin.postMessage(
          { nexmind_live: lastEntry },
          "http://localhost:8081/?show_editor=true"
        );
      }
    },

    undoValue() {
      if (this.elements_undo.length != 0) {
        this.elements_undo.splice(-1);

        var lastEntry = this.elements_undo.slice(-1).pop();

        this.key_to_change = "";
        this.value_to_change = "";
        this.original_key = "";
        this.original_value = "";

        this.sendToWebsite(lastEntry);
      }
    },

    localStoreHandler(e) {
      console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "nexmind_live_editor") {
        //  this.local_result = e.value;
      }
    },

    hearFromChild(e) {
      if (JSON.parse(e.data).nexmind_live) {
        if (JSON.parse(e.data).nexmind_live.key == "title") {
          this.original_meta_title = JSON.parse(e.data).nexmind_live.value;

          if (!this.page_id) {
            this.meta_title = this.original_meta_title;

            var obj = {
              key: "title",
              value: this.meta_title,
            };
            this.title_elements_undo.push(obj);
          }
        } else if (JSON.parse(e.data).nexmind_live.key == "description") {
          this.original_metal_description = JSON.parse(
            e.data
          ).nexmind_live.value;

          if (!this.page_id) {
            this.meta_Desc = this.original_metal_description;
            var obj = {
              key: "title",
              value: this.meta_Desc,
            };
            this.desc_elements_undo.push(obj);
          }
        } else {
          this.value_to_change = JSON.parse(e.data).nexmind_live.value;
          this.key_to_change = JSON.parse(e.data).nexmind_live.key;

          if (this.original_key.length == 0) {
            this.original_key = JSON.parse(e.data).nexmind_live.key;
            this.original_value = JSON.parse(e.data).nexmind_live.value;

            this.elements_undo.push({
              key: this.original_key,
              value: this.original_value,
            });
          }
          if (this.original_key != this.key_to_change) {
            this.original_key = JSON.parse(e.data).nexmind_live.key;
            this.original_value = JSON.parse(e.data).nexmind_live.value;
            this.elements_undo.push({
              key: this.original_key,
              value: this.original_value,
            });
          }
        }
      }
    },
    fetchVariant() {
      this.changed_elements.forEach((item, index) => {
        if (this.current_variant == item.variant) {
          var obj = {
            key: item.key,
            value: item.value,
          };
          if (item.key == "title") {
            console.log(obj);
            this.meta_title = item.value;
            this.title_elements_undo.push(obj);
          } else if (item.key == "description") {
            this.meta_Desc = item.value;
            this.desc_elements_undo.push(obj);
          } else {
          }
          console.log(obj);
          this.sendToWebsite(obj);

          console.log(this.meta_title, this.original_meta_title);
          console.log(this.meta_Desc, this.original_metal_description);

          if (this.meta_title.length == 0) {
            this.meta_title = this.original_meta_title;

            var obj = {
              key: "title",
              value: this.meta_title,
            };
            this.title_elements_undo.push(obj);
          }

          if (this.meta_Desc.length == 0) {
            this.meta_Desc = this.original_metal_description;
            var obj = {
              key: "title",
              value: this.meta_Desc,
            };
            this.desc_elements_undo.push(obj);
          }
        }
      });
    },
  },

  created() {},

  mounted() {
    window.addEventListener("message", this.hearFromChild);

    if (this.$route.params.seoAutomation != "no_seo") {
      console.log(this.$route.params.seoAutomation);
      Automation.fetchSeoAutomation({
        id: this.$route.params.seoAutomation,
      })
        .then((response) => {
          if (response.data.data.step.current_step == 1) {
            const foundContent = response.data.data.steps_data.step_1.find(
              (element) => element.slug === "content_data"
            );

            JSON.parse(foundContent.data).article.forEach((element) => {
              for (const [key, value] of Object.entries(element)) {
                if (key == "title") {
                  this.seo_title_suggestion.push(value);
                } else if (key == "description") {
                  this.seo_description_suggestion.push(value);
                } else if (key == "h1") {
                  this.seo_h1_suggestion.push(value);
                } else if (key == "h2") {
                  this.seo_h2_suggestion.push(value);
                } else if (key == "h3") {
                  this.seo_h3_suggestion.push(value);
                } else if (key == "p") {
                  this.seo_p_suggestion.push(value);
                }
              }
            });
          } else if (response.data.data.step.current_step == 2) {
            JSON.parse(response.data.data.steps_data.step_2[0].data).forEach(
              (element) => {
                for (const [key, value] of Object.entries(element)) {
                  if (key == "title") {
                    this.seo_title_suggestion.push(value);
                  } else if (key == "description") {
                    this.seo_description_suggestion.push(value);
                  } else if (key == "h1") {
                    this.seo_h1_suggestion.push(value);
                  } else if (key == "h2") {
                    this.seo_h2_suggestion.push(value);
                  } else if (key == "h3") {
                    this.seo_h3_suggestion.push(value);
                  } else if (key == "p") {
                    this.seo_p_suggestion.push(value);
                  }
                }
              }
            );
          }
        })
        .catch((error) => {});
    }
    if (this.$route.params.id) {
      this.page_id = this.$route.params.id;
      meta_cms
        .fetchRecommendation(
          this.$route.params.client_id,
          this.$route.params.id
        )
        .then((response) => {
          this.website_page = response.data.data;
          this.changed_elements = response.data.data.elements;

          if (this.website_page.campaign_type == "single") {
            this.changed_elements.forEach((item, index) => {
              var obj = {
                key: item.key,
                value: item.value,
              };
              if (item.key == "title") {
                this.meta_title = item.value;
                this.title_elements_undo.push(obj);
              } else if (item.key == "description") {
                this.meta_Desc = item.value;
                this.desc_elements_undo.push(obj);
              } else {
              }
              this.sendToWebsite(obj);

              if (this.meta_title.length == 0) {
                this.meta_title = this.original_meta_title;

                var obj = {
                  key: "title",
                  value: this.meta_title,
                };
                this.title_elements_undo.push(obj);
              }

              if (this.meta_Desc.length == 0) {
                this.meta_Desc = this.original_metal_description;
                var obj = {
                  key: "title",
                  value: this.meta_Desc,
                };
                this.desc_elements_undo.push(obj);
              }
            });
          } else {
            this.fetchVariant();
          }
        });
    }

    //fetch title and description

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);
  },
};
</script>


<style scoped>
.template_inside ::v-deep .title_id {
  color: red;
}
</style>