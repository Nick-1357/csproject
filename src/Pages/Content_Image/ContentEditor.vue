<template>
  <div>
    <div class="mt-4 mb-3">
      <button class="expand__button" @click="toggleMenu()" v-if="toggle">
        <span class="material-icons-outlined">keyboard_double_arrow_left</span
        >Hide Content
      </button>
      <button class="expand__button" @click="toggleMenu()" v-else>
        <span class="material-icons-outlined">keyboard_double_arrow_right</span
        >Show Content
      </button>
    </div>

    <div class="px-5 py-1 pb-5">
      <div class="nexcard details__card row">
        <div class="details__wrapper col-20">
          <h6 class="details__title">Project Name</h6>
          <h6 class="details__desc">{{ content.client_id | project_name }}</h6>
        </div>
        <div class="details__wrapper col-20">
          <h6 class="details__title">Topic</h6>
          <h6 class="details__desc">{{ content.keyword }}</h6>
        </div>

        <div
          class="details__wrapper col-20"
          v-if="content.campaign_type != 'blog_writer'"
        >
          <h6 class="details__title">Case</h6>
          <h6 class="details__desc">
            {{ content.subtopic_case | capitalize }}
          </h6>
        </div>
        <div class="details__wrapper col-20">
          <h6 class="details__title">Tone</h6>
          <h6 class="details__desc">{{ content.tone }}</h6>
        </div>
        <div class="details__wrapper col-20">
          <h6 class="details__title">Language</h6>
          <h6 class="details__desc">{{ content.language | lan }}</h6>
        </div>

        <div class="details__wrapper col-20">
          <h6 class="details__title">SEO Location</h6>
          <h6 class="details__desc">{{ content_location | loc }}</h6>
        </div>
        <div class="details__wrapper col-20">
          <h6 class="details__title">Length</h6>
          <h6 class="details__desc">{{ content.model_type }}</h6>
        </div>

        <div
          class="details__wrapper col-20"
          v-if="content_target_phrases.length != 0"
        >
          <h6 class="details__title">Target Phrases/Keyword</h6>
          <h6 class="details__desc">{{ content_target_phrases }}</h6>
        </div>

        <div
          class="details__wrapper col-20"
          v-if="content_product_name.length != 0"
        >
          <h6 class="details__title">Name</h6>
          <h6 class="details__desc">{{ content_product_name }}</h6>
        </div>

        <div
          class="details__wrapper col-20"
          v-if="content_product_description.length != 0"
        >
          <h6 class="details__title">Description</h6>
          <h6 class="details__desc">{{ content_product_description }}</h6>
        </div>

        <div
          class="details__wrapper col-20"
          v-if="content.campaign_type == 'blog_writer'"
        >
          <h6 class="details__title">Number of words</h6>
          <h6 class="details__desc">{{ generated_text["Number of Words"] }}</h6>
        </div>
        <div
          class="details__wrapper col-20"
          v-if="content.campaign_type == 'blog_writer'"
        >
          <h6 class="details__title">Number of characters</h6>
          <h6 class="details__desc">
            {{ generated_text["Number of Characters"] }}
          </h6>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col ps-0 mt-1">
          <h3 class="text-darkgreen mb-3">Content Editor</h3>
          <!-- <span class="material-icons-outlined text-darkgreen ms-2" v-b-tooltip.hover.top="{ variant: 'primary' }" title="Tooltip"> help_outline </span> -->
          <div class="nexcard" style="min-height: 400px">
            <div class="grammarly-plugin-wrapper">
              <GrammarlyEditorPlugin>
                <div ref="editor" style="min-height: 480px"></div>
              </GrammarlyEditorPlugin>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 pe-0 mt-1" v-if="this.words.length != 0">
          <!-- <h3 class="text-darkgreen mb-3">Content Score</h3>
          <div
            class="nexcard d-flex justify-content-center align-items-center"
            style="min-height: 300px"
          >
            <p>Score Meter</p>
          </div>  -->
          <h3 class="text-darkgreen mb-3">Keywords</h3>
          <div class="nexcard">
            <div class="d-flex">
              <!-- <button class="content-score__tab active">Keywords</button> -->
              <!-- <button class="content-score__tab">Articles</button> -->
            </div>

            <div>
              <!-- <h6 class="mt-2">Keywords</h6> -->
              <div class="row g-0">
                <div
                  class="col-auto p-1"
                  v-for="(word, index) in words"
                  :key="'word' + index"
                >
                  <button
                    @click="addContentSemantic(word[0])"
                    class="keyword-pill d-flex align-items-center justify-space-around"
                  >
                    <span class="keyword-pill__word text-muted">{{
                      word[0]
                    }}</span>
                    <button class="keyword-pill__button">
                      <span class="keyword-pill__score">{{ word[1] }} </span>
                      <span class="keyword-pill__add material-icons-outlined"
                        >add</span
                      >
                    </button>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-vue/v3";
import AiContentGenerator from "@/store/AiContentGenerator.js";
import CopyToClipboard from "vue-copy-to-clipboard";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";

export default {
  name: "Content_Editor",
  components: {
    CopyToClipboard,
    GrammarlyEditorPlugin,
    Grammarly,
    Quill,
  },

  data() {
    return {
      toggle: true,
      h1Elements: [],
      planQuota: [],
      documentType: ["pdf"],
      cursorPosition: 0,
      clientId: "client_LqFFJD3LHXVrduTTK7Yf9Y",
      text: "",
      permissions: localStorage.permissions,
      newContent: [],
      editor: null,
      content: [],
      has_wordpress_integration: false,
      downloadItem: [],
      questionIdeas: [],
      oldInterface: true,
      semanticTopics: [],
      words: [],
      deployContent: "",
      addContent: [],
      generated_text: "",
      content_location: "",
      content_target_phrases: "",
      content_product_name: "",
      content_product_description: "",
    };
  },
  watch: {
    addContent() {
      if (this.addContent.length != 0) {
        // console.log(JSON.parse(this.addContent));
        this.addContentResult(JSON.parse(this.addContent));
      }
    },
  },

  methods: {
    toggleMenu() {
      this.toggle = !this.toggle;
      localStorage.setItem("content_toggle", this.toggle);
    },
    change() {
      if (this.editor.getSelection() != null) {
        this.cursorPosition = this.editor.getSelection();
      }
    },

    ontextChange(quill) {
      // console.log('onchange', this.editor.root.innerHTML)
      var obj = {
        id: this.content.id,
        keyword: this.content.keyword,
        content: this.editor.root.innerHTML,
      };
      localStorage.setItem("export_content", JSON.stringify(obj));
    },

    addContentSemantic(data) {
      if (
        this.editor.getText().length > 1 &&
        this.cursorPosition.index == null
      ) {
        this.editor.clipboard.dangerouslyPasteHTML(
          this.editor.getText().length,
          `<br>` + data 
        );
      } else if (this.editor.getText().length == 1) {
        //  this.editor.insertText(0,this.p[data].content[0]);

        // this.editor.root.innerHTML =this.conclusion
        this.editor.clipboard.dangerouslyPasteHTML(data);
      } else {
        //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

        this.editor.clipboard.dangerouslyPasteHTML(
          this.cursorPosition.index,
          `<br>` + data 
        );
      }
    },
    addContentResult(data) {
      //console.log(data);
      if (data[0] == "Intro") {
        if (
          this.editor.getText().length > 1 &&
          this.cursorPosition.index == null
        ) {
          this.editor.clipboard.dangerouslyPasteHTML(
            this.editor.getText().length,
            `<br><br>` + data[1] + `<br><br>`
          );
        } else if (this.editor.getText().length == 1) {
          //  this.editor.insertText(0,this.p[data].content[0]);

          // this.editor.root.innerHTML =this.Intro
          this.editor.clipboard.dangerouslyPasteHTML(data[1]);
        } else {
          //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

          this.editor.clipboard.dangerouslyPasteHTML(
            this.cursorPosition.index,
            `<br><br>` + data[1] + `<br><br>`
          );
        }
      } else if (data[0] == "body") {
        if (
          this.editor.getText().length > 1 &&
          this.cursorPosition.index == null
        ) {
          this.editor.clipboard.dangerouslyPasteHTML(
            this.editor.getText().length,
            `<br><br>` + data[1] + `<br><br>`
          );
        } else if (this.editor.getText().length == 1) {
          //  this.editor.insertText(0,this.p[data].content[0]);

          //this.editor.root.innerHTML =this.fullParagraph
          this.editor.clipboard.dangerouslyPasteHTML(data[1]);
        } else {
          //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

          this.editor.clipboard.dangerouslyPasteHTML(
            this.cursorPosition.index,
            `<br><br>` + data[1] + `<br><br>`
          );
        }
      } else if (data[0] == "H1") {
        // console.log(data);
        if (
          this.editor.getText().length > 1 &&
          this.cursorPosition.index == null
        ) {
          this.editor.clipboard.dangerouslyPasteHTML(
            this.editor.getText().length,
            `<br><br><h1>` + data[1] + `</h1><br><br>`
          );
        } else if (this.editor.getText().length == 1) {
          //  this.editor.insertText(0,this.p[data].content[0]);

          //this.editor.root.innerHTML =this.fullParagraph
          this.editor.clipboard.dangerouslyPasteHTML(
            `<h1>` + data[1] + `</h1>`
          );
        } else {
          //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

          this.editor.clipboard.dangerouslyPasteHTML(
            this.cursorPosition.index,
            `<br><br><h1>` + data[1] + `</h1><br><br>`
          );
        }
      } else if (data[0] == "conclusion") {
        if (
          this.editor.getText().length > 1 &&
          this.cursorPosition.index == null
        ) {
          this.editor.clipboard.dangerouslyPasteHTML(
            this.editor.getText().length,
            `<br><br>` + data[1] + `<br><br>`
          );
        } else if (this.editor.getText().length == 1) {
          //  this.editor.insertText(0,this.p[data].content[0]);

          // this.editor.root.innerHTML =this.conclusion
          this.editor.clipboard.dangerouslyPasteHTML(data[1]);
        } else {
          //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

          this.editor.clipboard.dangerouslyPasteHTML(
            this.cursorPosition.index,
            `<br><br>` + data[1] + `<br><br>`
          );
        }
      } else if (data[0] == "Image") {
        if (
          this.editor.getText().length > 1 &&
          this.cursorPosition.index == null
        ) {
          this.editor.insertEmbed(
            this.editor.getText().length,
            "image",
            `data:image/png;base64,${data[1]}`
          );
        } else if (this.editor.getText().length == 1) {
          //  this.editor.insertText(0,this.p[data].content[0]);

          // this.editor.root.innerHTML =this.conclusion
          this.editor.insertEmbed(
            1,
            "image",
            `data:image/png;base64,${data[1]}`
          );
        } else {
          //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

          this.editor.insertEmbed(
            this.cursorPosition.index,
            "image",
            `data:image/png;base64,${data[1]}`
          );
        }
      } else {
        if (
          this.editor.getText().length > 1 &&
          this.cursorPosition.index == null
        ) {
          this.editor.clipboard.dangerouslyPasteHTML(
            this.editor.getText().length,
            `<br><br>` + data[1] + `<br><br>`
          );
        } else if (this.editor.getText().length == 1) {
          this.editor.clipboard.dangerouslyPasteHTML(data[1]);
        } else {
          //this.editor.insertText(this.cursorPosition.index, this.p[data].content[0]);

          this.editor.clipboard.dangerouslyPasteHTML(
            this.cursorPosition.index,
            `<br><br>` + data[1] + `<br><br>`
          );
        }
      }
    },
    addContentWords(data) {
      //
      //

      this.choosenPara = this.choosenPara.concat(this.words[data][0]);
    },
    addContentQuestion(data) {
      //
      //

      this.choosenPara = this.choosenPara.concat(this.questionIdeas[data]);
    },

    localStoreHandler(e) {
      //console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "editor_Content") {
        this.addContent = e.value;
      }
    },
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

    localStorage.setItem("editor_Content", "");

    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          // [{ script: "super" }, { script: "sub" }, "code-block"],

          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],

          ["link", "image", "video", "code-block"],
          ["clean"],
          ["undo", "redo"],
        ],
      },
      theme: "snow",
    });

    console.log(this.editor);

    this.editor.on("selection-change", () => this.change());
    this.editor.on("text-change", () => this.ontextChange());
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    localStorage.removeItem("content_gen_value");
    AiContentGenerator.fetchContentCampaign({
      id: this.$route.params.id,
    }).then((response) => {
      ////
      this.content = response.data.data;
      this.content_location = this.content.location.name;
      this.content_target_phrases = this.content.target_phrases;
      this.content_product_name = this.content.product_name;
      this.content_product_description = this.content.product_description;
      //console.log(JSON.stringify(response.data.data.deployed_pages))
      localStorage.setItem(
        "deployed_content",
        JSON.stringify(response.data.data.deployed_pages[0])
      );
      loader.hide();
      console.log();

      if (response.data.data.deployed_pages.length != 0) {
        this.editor.clipboard.dangerouslyPasteHTML(
          response.data.data.deployed_pages[0].content
        );
      } else if (localStorage.pass_to_editor) {
        this.editor.clipboard.dangerouslyPasteHTML(localStorage.pass_to_editor);
      }

      var obj = {
        id: this.content.id,
        keyword: this.content.keyword,
        content: this.editor.root.innerHTML,
      };
      localStorage.setItem("export_content", JSON.stringify(obj));

      if (this.content.result.length != 0) {
        this.content.result.forEach((element) => {
          if (element.key == "semanticTopics") {
            this.semanticTopics = JSON.parse(element.value);
            this.semanticTopics.forEach((element) => {
              this.words.push([element.text, element.value]);
            });
          }
        });
      }

      if (this.content.campaign_type == "blog_writer") {
        response.data.data.result.forEach((element) => {
          if (element.key == "generated_text") {
            this.generated_text = JSON.parse(element.value);
          }
        });
      }

      response.data.data.result.forEach((element) => {
        if (element.key == "semanticTopics") {
          this.semanticTopics = JSON.parse(element.value);
          this.semanticTopics.forEach((element) => {
            this.words.push([element.text, element.value]);
          });

          //
        }
        if (element.key == "semantic_topics") {
          this.semanticTopics = JSON.parse(element.value);
          this.semanticTopics.forEach((element) => {
            this.words.push([element.text, element.value]);
          });

          //
        }
      });
    });
  },
};
</script>

<style lang="css" scoped>
/* .ql-container.ql-snow { border: none !important;}
.ql-toolbar.ql-snow { border: none !important;} */

.expand__button {
  display: flex;
  background-color: #2c8ee1;
  color: #fff;
  border-radius: 20px;
  padding: 0.2rem 1.5rem 0.2rem 1rem;
  margin-left: 2.3rem;
  transition: 0.2s ease-out;
}
.expand__button:hover {
  background-color: #1367af;
  transition: 0.2s ease-out;
}
.expand__button .material-icons-outlined {
  margin-top: -1px;
  margin-right: 0.5rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
}
.text-darkgreen {
  color: #183b1c;
}
.details__desc {
  color: #717170;
}
.keyword-pill {
  margin: 0;
  background-color: #3737371f;
  padding: 3px 9px;
  border-radius: 20px;
  position: relative;
}
.keyword-pill:hover {
  background-color: #0101012a;
  transition: 0.2s ease-out;
}
/* .keyword-pill__word {
  font-size: 15px;
} */
.keyword-pill__button {
  font-size: 12px;
  background-color: #fff;
  margin-left: 0.4rem;
  padding: 0rem 0.2rem;
  border-radius: 4px;
  width: 42px;
  visibility: visible;
}
.keyword-pill__add {
  display: block;
  font-size: 15px;
  line-height: 17px;
}
.keyword-pill__add {
  font-weight: bold;
  display: none;
  color: #fff;
}
.keyword-pill:hover .keyword-pill__button {
  background-color: #2c8ee1;
}
.keyword-pill:hover .keyword-pill__score {
  display: none;
}
.keyword-pill:hover .keyword-pill__add {
  display: block;
}
.keyword-pill__add span {
  transform: translateY(-7px);
  color: white;
  height: 16px;
  display: block;
}
.content-score__tab {
  text-align: center;
  font-size: 20px;
  color: #000000;
  border-bottom: 2px solid transparent;
  width: 50%;
  margin-bottom: 1rem;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 0.5rem 0rem 0.3rem;
}
.content-score__tab:first-child {
  margin-right: 0.5rem;
}
.content-score__tab.active {
  text-align: center;
  font-size: 20px;
  color: #1565c0;
  border-bottom: 2px solid #1565c0;
  background-color: #efefef;
  transition: all 0.3s ease-out;
}
.content-score__tab:hover {
  color: #1565c0;
  border-bottom: 2px solid #1565c0;
  background-color: #e3e3e3;
  transition: all 0.3s ease-out;
}
.details__card {
  padding: 0.5rem 1rem 1rem;
  display: flex;
  justify-content: start;
}
.details__wrapper {
  padding-top: 1rem;
  min-width: 21px;
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
.col-20 {
  min-height: 1px;
  width: 20% !important;
}

.grammarly-plugin-wrapper {
  position: initial;
  z-index: 2;
}
/* Tooltip container */
</style>
