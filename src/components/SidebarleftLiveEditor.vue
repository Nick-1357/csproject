<template>
  <div>
    <aside :class="is_expand && 'is-expanded'">
      <h4>Update Content</h4>
      <small class="text-muted">
        Save changes before leave the page/ change variant
      </small>
      <!-- move to center -->
      <!-- <div class="nexcard__content mt-4">
        <button
          @click="fetchTitle"
          class="btn btn-primary text-center"
          v-b-tooltip.hover.bottom="{ variant: 'primary' }"
          title="Fetch meta title"
        >
          Title
        </button>

        <button
          @click="fetchDesc"
          class="btn btn-primary text-center m-2"
          v-b-tooltip.hover.bottom="{ variant: 'primary' }"
          title="Fetch meta description"
        >
          Description
        </button>
      </div> -->

      <div v-if="!change_title && !change_desc" class="nexcard__content">
        <div class="nexcard__content__desc mt-4">
          <span>{{ ChosenElement }}</span>
          <GrammarlyEditorPlugin>
            <quill-editor
              v-model="value_to_change"
              :options="optionsContent"
            ></quill-editor>
          </GrammarlyEditorPlugin>
          <!-- <input
            type="text"
            autocorrect="off"
            autocomplete="off"
            name="text"
            class="form-control"
            placeholder="Select an element"
            v-model="value_to_change"
            aria-label="text"
            aria-describedby="text"
          /> -->

          <!-- move to center -->
          <div class="d-flex flex-row-reverse mt-3">
            <button
              class="btn btn-primary-outlined text-center ms-2"
              @click="undoValue"
            >
              Undo
            </button>

            <button
              class="btn btn-primary-outlined text-center"
              @click="addValue"
            >
              Change
            </button>
          </div>

          <hr v-if="$route.params.seoAutomation != 'no_seo'" />
          <div
            class="seo-suggestion"
            v-if="$route.params.seoAutomation != 'no_seo'"
          >
            <span class="text-muted">AI SEO Automation Option</span>

            <div
              v-b-tooltip.hover.bottom="{ variant: 'primary' }"
              title="Select to replace the existing element"
              class="card sug-card"
              v-for="(sug, index) in suggestion_to_show"
              :key="'suggestion_to_show' + index"
              @click="chooseElementSug(sug)"
            >
              {{ sug }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="change_title" class="nexcard__content">
        <div class="nexcard__content__desc mt-4">
          <span>Title</span>
          <input
            type="text"
            autocorrect="off"
            autocomplete="off"
            name="title"
            class="form-control"
            placeholder=""
            v-model="meta_title"
            aria-label="text"
            aria-describedby="text"
          />

          <!-- move to center -->
          <div class="d-flex flex-row-reverse mt-3">
            <button
              class="btn btn-primary-outlined text-center ms-2"
              @click="undoTitle"
            >
              Undo
            </button>

            <button
              class="btn btn-primary-outlined text-center"
              @click="changeTitle"
            >
              Change
            </button>
          </div>
          <hr v-if="$route.params.seoAutomation != 'no_seo'" />
          <div
            class="seo-suggestion"
            v-if="$route.params.seoAutomation != 'no_seo'"
          >
            <span class="text-muted">AI SEO Automation Option</span>

            <div
              v-b-tooltip.hover.bottom="{ variant: 'primary' }"
              title="Select to replace the existing element"
              class="card sug-card"
              @click="chooseTitleSug(seo_title_suggestion[0])"
            >
              {{ seo_title_suggestion[0] }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="change_desc" class="nexcard__content">
        <div class="nexcard__content__desc mt-4">
          <span>Description</span>
          <textarea
            autocorrect="off"
            autocomplete="off"
            name="desc"
            class="form-control"
            v-model="meta_Desc"
            rows="4"
            cols="50"
          >
          </textarea>
          <!-- <input
            type="text"
            autocorrect="off"
            autocomplete="off"
            name="desc"
            class="form-control"
            placeholder=""
            v-model="meta_Desc"
            aria-label="text"
            aria-describedby="text"
          /> -->

          <!-- move to center -->
          <div class="d-flex flex-row-reverse mt-3">
            <button
              class="btn-primary-outlined text-center ms-2"
              @click="undoDesc"
            >
              Undo
            </button>

            <button
              class="btn btn-primary-outlined text-center"
              @click="changeDesc"
            >
              Change
            </button>
          </div>
          <hr v-if="$route.params.seoAutomation != 'no_seo'" />
          <div
            class="seo-suggestion"
            v-if="$route.params.seoAutomation != 'no_seo'"
          >
            <span class="text-muted"> AI SEO Automation Option</span>

            <div
              v-b-tooltip.hover.bottom="{ variant: 'primary' }"
              title="Select to replace the existing element"
              class="card sug-card"
              @click="chooseDescSug(seo_description_suggestion[0])"
            >
              {{ seo_description_suggestion[0] }}
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>Change Title</h5>
        </div>

        <div class="nexcard__content__desc">
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

          <div class="seo-suggestion" v-if="$route.params.seoAutomation">
            <span class="text-muted"> SEO Suggestion</span>

            <div
              v-b-tooltip.hover.bottom="{ variant: 'primary' }"
              title="Select to replace the existing element"
              class="card sug-card"
            >
              {{ seo_title_suggestion[0] }}
            </div>
          </div>

          <button
            class="btn btn-outline-primary text-center m-2"
            @click="undoTitle"
          >
            Undo Title
          </button>

          <button
            class="btn btn-outline-primary text-center m-2"
            @click="changeTitle"
          >
            Change title
          </button>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>Change Description</h5>
        </div>
        <div class="nexcard__content__desc">
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

          <div class="seo-suggestion" v-if="$route.params.seoAutomation">
            <span class="text-muted"> SEO Suggestions</span>
         
            <div
              v-b-tooltip.hover.bottom="{ variant: 'primary' }"
              title="Select to replace the existing element"
              class="card sug-card"
            >
              {{ seo_description_suggestion[0] }}
            </div>
          </div>
          <button
            class="btn btn-outline-primary text-center m-2"
            @click="undoDesc"
          >
            Undo Desc
          </button>
          <button
            class="btn btn-outline-primary text-center m-2"
            @click="changeDesc"
          >
            Change Description
          </button>
        </div>
      </div> -->

      <!-- <button class="btn btn-primary text-center" @click="updateWebsite">
        Save changes
      </button> -->
    </aside>
  </div>
</template>

<script>
/* eslint-disable */
import meta_cms from "@/store/meta-cms.js";
import Automation from "@/store/Automation.js";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-vue/v3";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: { GrammarlyEditorPlugin, Grammarly },
  data() {
    return {
      is_expand: true,
      optionsContent: {
        modules: {
          toolbar: [
            // [{ 'size': [] }],
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            // [{ 'script': 'super' }, { 'script': 'sub' }],
            // [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }, { 'align': [] }],
            ["link"],
            // ['clean']
          ],
        },
      },
      ChosenElement: "",
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
      change_title: false,
      change_desc: false,
      get_data: {},
      set_data: {},
      counter: 0,
    };
  },

  watch: {
    value_to_change() {
      console.log(this.key_to_change);

      (this.change_title = false), (this.change_desc = false);

      if (this.key_to_change.includes("h1")) {
        if (this.seo_h1_suggestion.length != 0) {
          this.suggestion_to_show = this.seo_h1_suggestion;
        }

        this.ChosenElement = "H1 element";
      } else if (this.key_to_change.includes("h2")) {
        if (this.seo_h2_suggestion.length != 0) {
          this.suggestion_to_show = this.seo_h2_suggestion;
        }
        this.ChosenElement = "H2 element";
      } else if (this.key_to_change.includes("h3")) {
        if (this.seo_h3_suggestion.length != 0) {
          this.suggestion_to_show = this.seo_h3_suggestion;
        }

        this.ChosenElement = "H2 element";
      } else if (this.key_to_change.includes("p")) {
        if (this.seo_p_suggestion.length != 0) {
          this.suggestion_to_show = this.seo_p_suggestion;
        }

        this.ChosenElement = "p element";
      } else {
        this.suggestion_to_show = [];
      }
    },
  },

  methods: {
    chooseDescSug(data) {
      this.meta_Desc = data;
      var obj = {
        key: "description",
        value: this.meta_Desc,
      };

      this.desc_elements_undo.push(obj);
      this.sendToWebsite(obj);
      this.$toast.success("Description changed!");
    },
    chooseTitleSug(data) {
      this.meta_title = data;
      var obj = {
        key: "title",
        value: this.meta_title,
      };

      this.title_elements_undo.push(obj);
      this.sendToWebsite(obj);
      this.$toast.success("Title changed!");
    },
    chooseElementSug(data) {
      this.value_to_change = data;
      var obj = {
        key: this.key_to_change,
        value: this.value_to_change,
      };

      this.elements_undo.push(obj);

      this.sendToWebsite(obj);
    },
    fetchTitle() {
      this.change_title = true;
      this.change_desc = false;
    },
    fetchDesc() {
      this.change_desc = true;
      this.change_title = false;
    },
    setTime() {
      var f = document.getElementById("iframe");
      f.src = f.src;

        this.change_title = false;
      this.change_desc = false;

      setTimeout(() => {
        this.changeVar();
      }, 500);
    },
    changeVar() {
      this.ChosenElement = "";
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
        this.meta_Desc = this.original_metal_description;
        this.meta_title =  this.original_meta_title;
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

      localStorage.setItem("nexmind_live_editor_to_pass", JSON.stringify(obj));
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
        localStorage.setItem(
          "nexmind_live_editor_to_pass",
          JSON.stringify(lastEntry)
        );
      }
    },
    undoDesc() {
      if (this.desc_elements_undo.length > 1) {
        this.desc_elements_undo.splice(-1);

        var lastEntry = this.desc_elements_undo.slice(-1).pop();
        this.meta_Desc = lastEntry.value;
        localStorage.setItem(
          "nexmind_live_editor_to_pass",
          JSON.stringify(lastEntry)
        );
      }
    },

    undoValue() {
      if (this.elements_undo.length != 0) {
        this.elements_undo.splice(-1);

        var lastEntry = this.elements_undo.slice(-1).pop();
        this.ChosenElement = "";
        this.key_to_change = "";
        this.value_to_change = "";
        this.original_key = "";
        this.original_value = "";

        this.sendToWebsite(lastEntry);
      }
    },

    localStoreHandler(e) {
      //console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "nexmind_live_editor_to_get") {
        this.set_data = e.value;
        this.hearFromChild();
      }
      if (e.key == "nexmind_live_editor_title") {
        this.ChosenElement='Title'
        this.change_title = true;
        this.change_desc = false;
      }
      if (e.key == "nexmind_live_editor_description") {
          this.ChosenElement='Description'
        this.change_desc = true;
        this.change_title = false;
      }
      if (e.key == "nexmind_live_editor_save_changes") {
        this.counter++;
        console.log(
          `👉 localStorage.set('${e.key}', '${e.value}') updated`,
          this.counter
        );
        if (this.counter == 1) {
          this.updateWebsite();
          var me = this;
          setTimeout(() => {
            this.counter = 0;
          }, 5000);
        }
      }
      if (e.key == "nexmind_live_editor_variant") {
        this.current_variant = e.value;
        this.setTime();
      }
      if (e.key == "nexmind_live_editor_editor") {
        this.is_expand = e.value;
      }
    },

    hearFromChild() {
      console.log(this.set_data);

      if (JSON.parse(this.set_data).nexmind_live.key == "title") {
        this.original_meta_title = JSON.parse(this.set_data).nexmind_live.value;

        if (!this.page_id) {
          this.meta_title = this.original_meta_title;

          var obj = {
            key: "title",
            value: this.meta_title,
          };
          this.title_elements_undo.push(obj);
        }
      } else if (JSON.parse(this.set_data).nexmind_live.key == "description") {
        this.original_metal_description = JSON.parse(
          this.set_data
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
        this.value_to_change = JSON.parse(this.set_data).nexmind_live.value;
        this.key_to_change = JSON.parse(this.set_data).nexmind_live.key;

        if (this.original_key.length == 0) {
          this.original_key = JSON.parse(this.set_data).nexmind_live.key;
          this.original_value = JSON.parse(this.set_data).nexmind_live.value;

          this.elements_undo.push({
            key: this.original_key,
            value: this.original_value,
          });
        }
        if (this.original_key != this.key_to_change) {
          this.original_key = JSON.parse(this.set_data).nexmind_live.key;
          this.original_value = JSON.parse(this.set_data).nexmind_live.value;
          this.elements_undo.push({
            key: this.original_key,
            value: this.original_value,
          });
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
    },
  },

  destroyed() {
    localStorage.removeItem("nexmind_live_editor_to_get");
    localStorage.removeItem("nexmind_live_editor_title");
    localStorage.removeItem("nexmind_live_editor_description");
    localStorage.removeItem("nexmind_live_editor_save_changes");
    localStorage.removeItem("nexmind_live_editor_variant");
    localStorage.removeItem("nexmind_live_editor_editor");
    localStorage.removeItem("nexmind_live_editor_to_pass");
  },
  mounted() {
    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);

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

          //this.suggestion_to_show = this.seo_h1_suggestion;
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
  },
};
</script>


<style lang="css" scoped>
aside {
  position: sticky;
  top: 67px;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 92vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--white);
  transition: 0.4s ease-out;
  border-right: rgb(207, 207, 207) 1px solid;
  outline: rgb(207, 207, 207) 1px solid;
  transform: translateX(-350px);
  padding: 1rem 1rem 0rem 1rem;
  /* margin right sidebar when not expanded */
  margin-right: -350px;
  box-shadow: -2px 3px 20px 2px #c2c2c260;
}
input {
  padding: 0.375rem 0.75rem;
}

/* aside::-webkit-scrollbar {
  display: none;
} */
aside::-webkit-scrollbar-track {
  background: #f9f9f9;
  box-shadow: transparent;
  border-radius: 5px;
}
/* 
aside::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 5px;
  border-left: 3px solid transparent;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}
aside::-webkit-scrollbar-thumb:hover {
  background: transparent;
  border-left: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
} */
.is-expanded {
  width: 350px;
  transform: translateX(0px);
  transition: 0.4s ease-out;
  margin-right: 0px;
}

.sug-card {
  margin-top: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}
.seo-suggestion {
  margin: 1rem 0rem;
  overflow-y: auto;
  display: block;
  max-height: 40vh !important;
}

/* nexcard css */
.nexcard__content {
  /* background-color: #ffffff; */
  /* border: 1px solid var(--color-primary); */
  /* outline: 1px solid transparent; */
  /* border-radius: 10px; */
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px; */
  /* margin: 0.5rem 0 0.5rem; */
  transition: all 0.4s ease;
}
.nexcard__content h5 {
  margin-bottom: 0;
}
</style>
