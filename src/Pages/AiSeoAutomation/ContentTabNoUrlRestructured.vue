<template>
  <div>
    <!-- Contents Tab - Contents -->
    <div id="bodyfix__content__content" class="bodyfix__content__content">

        <div class="d-flex">
        <h6 class="d-flex align-items-center ms-1 fw-600 text-darkgreen">
          Add Element :
        </h6>
        <button
          @click="addElement('h1')"
          class="btn btn-sm btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H1 Element
        </button>

        <button
          @click="addElement('h2')"
          class="btn btn-sm btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H2 Element
        </button>

        <button
          @click="addElement('h3')"
          class="btn btn-sm btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H3 Element
        </button>

        <button
          @click="addElement('p')"
          class="btn btn-sm btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          P Element
        </button>
        <!-- 
        <button
          @click="downloadText"
          class="btn btn-outline-secondary d-flex justify-content-end align-items-center my-2 ms-auto"
        >
          Export HTML
        </button> -->
      </div>


      <div class="row">
        <div class="col-8 content__dropdown__group p-4">
          <div
            v-for="(item, index) in content_article"
            :key="'content_article' + index"
          >
            <div>
              <div @click="chooseItem(index)" class="td-none">
                <div class="content__dropdown__title__left">
                  <span class="title text-muted">
                    {{ item.key | nexrank }}</span
                  >

                  <div v-if="item.value.length == 0 && !item.editor">
                    <span class="text-muted">
                      Click here to see the suggestion of the element</span
                    >
                  </div>

                  <textarea
                    v-if="item.editor"
                    v-model="item.value"
                    class="form-control w-70"
                    id=""
                    rows="5"
                    column="10"
                    placeholder="Type in your custom content here"
                    style="border-color: #888"
                  ></textarea>

                  <div class="element-content" v-else>
                    <h1 v-if="item.key == 'h1' && choosenIndex != index">
                      {{ item.value }}
                    </h1>

                    <h1
                      v-else-if="item.key == 'h1' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </h1>

                    <h2 v-else-if="item.key == 'h2' && choosenIndex != index">
                      {{ item.value }}
                    </h2>

                    <h2
                      v-else-if="item.key == 'h2' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </h2>

                    <h3 v-else-if="item.key == 'h3' && choosenIndex != index">
                      {{ item.value }}
                    </h3>

                    <h3
                      v-else-if="item.key == 'h3' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </h3>

                    <p v-else-if="item.key == 'p' && choosenIndex != index">
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="item.key == 'p' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </p>

                    <p v-else-if="item.key == 'title' && choosenIndex != index">
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="item.key == 'title' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="
                        item.key == 'description' && choosenIndex != index
                      "
                    >
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="
                        item.key == 'description' && choosenIndex == index
                      "
                      class="text-primary"
                    >
                      {{ item.value }}
                    </p>

                    <p
                      style="text-decoration: underline"
                      v-else-if="item.key == 'url'"
                    >
                      {{ item.value }}
                    </p>
                  </div>

                  <button
                    @click="changeEditor(index)"
                    class="material-icons-outlined btn-edit-content"
                  >
                    edit
                  </button>

                  <button
                    v-if="item.key !== 'title' && item.key != 'description'"
                    @click="removeData(index)"
                    class="material-icons-outlined btn-undo-content"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div  class="content__dropdown__group">
            <div
             
              v-for="(item, index) in content_article"
              :key="'content_article' + index"
              v-show="choosenIndex == index"
            >
              <div
                class="content__dropdown__content pt-2"
                
              >
                <!-- AI Suggestions Section - Tabs-->

                <!-- <div class="aisuggestion__tabs">
                  <button
                    class="aisuggestion__tab"
                    :class="tab.class"
                    v-for="(tab, index_tab) in item.Tabs_AiSuggestions"
                    :key="'tab' + index_tab"
                    @click="changeTab_AiSuggestions(tab.name, index, index_tab)"
                  >
                    <span class="aisuggestion__tab__title">{{ tab.name }}</span>
                  </button>
                </div> -->

                <div
                  id="content__aisuggestions__suggestions"
                  class="px-3"
                  v-if="
                    item.chosenTab_AiSuggestions == 'Suggestions' &&
                    item.key == 'p'
                  "
                >
                <h6 class="mb-3 user-select-none font-weight-bold">{{item.key  | nexrank}}</h6> 
                  <small class="text-muted"
                    >Suggestion based on the keyword</small
                  >
                  <div
                    class="form-check suggestion mt-3"
                    v-for="(normal, index_normal) in item.suggestions"
                    :key="'suggestions' + index_normal"
                  >
                    <div class="row">
                      <div class="col-1">
                        <input
                          class="form-check-input"
                          type="radio"
                          :name="'aisuggestion_suggestions' + index"
                          :id="normal.paragraph"
                          :value="normal.paragraph"
                          v-model="item.value"
                            @change="getContent"
                        />
                        <label class="form-check-label" :for="normal.paragraph">
                        </label>
                      </div>

                      <div class="col">
                        <div class="d-flex align-items-center">
                          <span class="desc"
                            >{{ normal.paragraph }}
                            <span
                              v-if="index_normal == 0"
                              v-b-tooltip.hover.top="{ variant: 'primary' }"
                              title="The AI ranked these options according to what it considers to be the best choice"
                              class="material-icons-outlined"
                            >
                              grade
                            </span>
                          </span>
                        </div>

                        <!-- <span
                            v-if="index_normal == 0"
                            v-b-tooltip.hover.top="{ variant: 'primary' }"
                            title="The AI ranked these options according to what it considers to be the best choice"
                            class="pill-badge blue text-center mx-2 px-4 py-1 py-1 d-flex w-40"
                            >Best Choice</span
                          > -->
                      </div>
                    </div>
                  </div>
                </div>

                <!--for other elements-->

                <div
                  id="content__aisuggestions__suggestions"
                  class="px-3"
                  v-if="
                    item.chosenTab_AiSuggestions == 'Suggestions' &&
                    item.key != 'p'
                  "
                >
                 <h6 class="mb-3 user-select-none  font-weight-bold">{{item.key | nexrank}}</h6> 
                  <small class="text-muted"
                    >Suggestion based on the keyword</small
                  >
                  <div
                    class="form-check suggestion mt-3"
                    v-for="(normal, index_normal) in item.suggestions"
                    :key="'suggestions' + index_normal"
                  >
                    <div class="row">
                      <div class="col-1">
                        <input
                          class="form-check-input"
                          type="radio"
                          :name="'aisuggestion_suggestions' + index"
                          :id="normal"
                          :value="normal"
                          v-model="item.value"
                            @change="getContent"
                        />
                        <label class="form-check-label" :for="normal"> </label>
                      </div>
                      <div class="col">
                        <div class="d-flex align-items-center">
                          <span class="desc"
                            >{{ normal }}
                            <span
                              v-if="index_normal == 0"
                              v-b-tooltip.hover.top="{ variant: 'primary' }"
                              title="The AI ranked these options according to what it considers to be the best choice"
                              class="material-icons-outlined"
                            >
                              grade
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
export default {
  name: "content_tab_without_url",
  props: {
    content: {
      type: Object,
      required: true,
    },
    content_type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content_article: [
        {
          key: "title",
          value: "",
          editor: false,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "description",
          value: "",
          editor: false,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "h1",
          value: "",
          editor: false,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "h2",
          value: "",
          editor: false,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "h3",
          value: "",
          editor: false,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "p",
          value: "",
          editor: false,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
      ],
      values: [],
      initialSuggestion: [],
      choosenIndex: 0,
    };
  },
  methods: {
    chooseItem(data) {
      this.choosenIndex = data;
      console.log(this.choosenIndex);
    },
    changeEditor(data) {
      var arr = this.content_article[data];
      arr.editor = !arr.editor;

      if (!arr.editor) {
        this.getContent();
      }

      this.content_article.splice(data, 1, arr);
    },
    getContent() {
      var Local = [
        {
          title: [],
          description: [],
          content: [],
        },
      ];

      this.content_article.forEach((element) => {
        if (element.key == "title") {
          Local[0].title = element.value;
        } else if (element.key == "description") {
          Local[0].description = element.value;
        } else {
          Local[0].content.push({ key: element.key, value: element.value });
        }
      });

      console.log(Local);
      localStorage.setItem("ai_seo_content", JSON.stringify(Local[0]));
    },
    downloadText() {
      var downloadItem = "";

      this.content_article.forEach((element) => {
        if (element.key == "title") {
          downloadItem =
            downloadItem + "\n" + `<title>` + element.value + `</title>`;
        } else if (element.key == "description") {
          downloadItem =
            downloadItem +
            "\n" +
            `<meta name="description" content="` +
            element.value +
            `">`;
        } else {
          downloadItem =
            downloadItem +
            "\n" +
            `<` +
            element.key +
            `>` +
            element.value +
            `</` +
            element.key +
            `>`;
        }
      });

      var blob = new Blob([downloadItem], { type: "text/plain" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Text.html";
      link.click();
    },

    removeData(index) {
      this.content_article.splice(index, 1);
    },

    addElement(data) {
      if (data == "h1") {
        const h1 = this.values.find((element) => element.slug === "h1");

        this.content_article.push({
          key: data,
          value: "",
          editor: false,
          suggestions: JSON.parse(h1.data),
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      } else if (data == "h2") {
        const h2 = this.values.find((element) => element.slug === "h2");

        this.content_article.push({
          key: data,
          value: "",
          editor: false,
          suggestions: JSON.parse(h2.data),
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      } else if (data == "h3") {
        const h3 = this.values.find((element) => element.slug === "h3");

        this.content_article.push({
          key: data,
          value: "",
          editor: false,
          suggestions: JSON.parse(h3.data),
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      } else if (data == "p") {
        const foundp = this.values.find(
          (element) => element.slug === "paragraphs"
        );

        this.initialSuggestion = JSON.parse(foundp.data);

        this.content_article.push({
          key: data,
          value: "",
          editor: false,
          suggestions: this.initialSuggestion,
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        });
      }

      console.log(this.content_article);
    },
    changeTab_AiSuggestions(name, item_index, tab_index) {
      console.log(name, item_index, tab_index);
      //   console.log(this.content_article[item_index]);
      this.content_article[item_index].chosenTab_AiSuggestions = name;
      this.content_article[item_index].Tabs_AiSuggestions.forEach(
        (element, index) => {
          if (index == tab_index) {
            element.class = "aisuggestion__tab active";
          } else {
            element.class = "aisuggestion__tab";
          }
        }
      );
    },
    assignSuggestion(content_Array) {
      content_Array.forEach((element) => {
        if (element.key == "title") {
          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );

          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metatitle);
          });

          element.suggestions = sugTitle;
        } else if (element.key == "description") {
          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );
          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metadescription);
          });

          element.suggestions = sugTitle;
        } else if (element.key == "h1") {
          const h1 = this.values.find((element) => element.slug === "h1");

          element.suggestions = JSON.parse(h1.data);
        } else if (element.key == "h2") {
          const h2 = this.values.find((element) => element.slug === "h2");

          element.suggestions = JSON.parse(h2.data);
        } else if (element.key == "h3") {
          const h3 = this.values.find((element) => element.slug === "h3");

          element.suggestions = JSON.parse(h3.data);
        } else if (element.key == "p") {
          const foundp = this.values.find(
            (element) => element.slug === "paragraphs"
          );

          this.initialSuggestion = JSON.parse(foundp.data);

          element.suggestions = this.initialSuggestion;
        }
      });

      return content_Array;
    },
  },
  created() {
    console.log(this.content);
    this.values = this.content.steps_data.step_1;

    this.content_article = this.assignSuggestion(this.content_article);

    console.log(this.content_article);
  },
};
</script>

<style scoped>
/* Bodyfix section - Contents */

/* ----- 1.content dropdown css - start */
.bodyfix__content__content .content__dropdown__group {
  border: 1px solid #2c8de0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  height: 650px;
  overflow-y: auto;
  padding-left: 1rem;
  padding-top: 1rem;
}
.bodyfix__content__content .content__dropdown__group-element {
  border: none;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  height: 650px;
  overflow-y: auto;
}
.bodyfix__content__content .content__dropdown__group:last-child {
  margin-bottom: 0rem;
}
.content__dropdown__title {
  display: flex;
  padding: 1.5rem 1.5rem;
  transition: all 0.4s ease-out;
  user-select: none;
  border-radius: 10px;
}
.content__dropdown__group .content__dropdown__title.collapsed:hover,
.content__dropdown__group .content__dropdown__title.not-collapsed:hover {
  background-color: #f5f5f7;
}
.content__dropdown__title__left {
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-bottom: 1rem;
  position: relative;
  /* border-bottom:1px solid #e7f3fe; */
}
.content__dropdown__title__left .title {
  margin-right: 0.5rem;
  color: #183b1c;
  font-size: 16px;
  min-width: 140px;
  font-weight: 600;
}

.content__dropdown__title__left .element-content {
  margin-right: 4rem;
  min-width: 130px;
}

.content__dropdown__title__left .btn-undo-content {
  color: #757575;
  float: right;
  display: column;
  vertical-align: middle;
  position: absolute;

  right: -10px;
}
.btn-edit-content:hover {
  color: #757575;
  transition: all 0.3s ease-out;
}
.content__dropdown__title__left .btn-edit-content {
  color: #2c8de0;
  float: right;
  display: column;
  vertical-align: middle;
  position: absolute;

  right: 30px;
}
.btn-undo-content {
  color: #757575;
  transition: all 0.3s ease-out;
}

.content__dropdown__title__left .score {
  margin-right: 2rem;
  border: 1px solid black;
  padding: 0.1rem 0.5rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}
.content__dropdown__title__left .score.score-low {
  border-color: #e23c39;
  color: #e23c39;
}
.content__dropdown__title__left .score.score-avg {
  border-color: #5791d0;
  color: #5791d0;
}
.content__dropdown__title__left .score.score-high {
  border-color: #4dae50;
  color: #4dae50;
}
.content__dropdown__title__left .description {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.content__dropdown__title__right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.content__dropdown__title__right .date {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.content__dropdown__title[aria-expanded="false"]
  .content__dropdown__title__right
  .arrow-icon {
  transform: rotate(0deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.content__dropdown__title[aria-expanded="true"]
  .content__dropdown__title__right
  .arrow-icon {
  transform: rotate(180deg);
  transition: 0.3s ease-out;
  color: #2c8de0;
}
.content__dropdown__content {
  /* padding: 1rem 2rem 2rem; */
  /* height: 400px; */
  overflow-y: auto;
  /* border-top: 1px solid #2c8de0; */
}
.grey__card-outlined {
  border: 1px solid #8b8b8b;
  padding: 1rem 1rem;
  border-radius: 10px;
  color: black;
}

/* ai suggestion tabs */
.aisuggestion__tab__title {
  padding: 0.5rem;
  color: #2c8de0;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.4s ease-out;
}
.aisuggestion__tab {
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  margin-right: 1rem;
  /* margin-bottom: 0.5rem; */
  transition: 0.2s ease-out;
  border-radius: 20px;
  border: 1px solid #2c8de0;
  background-color: #f4faff;
}
.aisuggestion__tab:hover {
  background-color: #dcefff;
  transition: 0.4s ease-out;
}
.aisuggestion__tab.active {
  background-color: #2c8de0;
  transition: all 0.4s ease-out;
}
.aisuggestion__tab.active .aisuggestion__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
.suggestion {
  margin-bottom: 1.2rem;
  display: flex;
  align-items: start;
}
.suggestion .form-check-input {
  /* position: absolute; */
  /* margin-right: 0.5rem;
  margin-top: 0.3rem; */
}
.tag__score {
  background-color: #4dae50;
  border-radius: 6px;
  padding: 0.1rem 0.8rem 0.1rem 0.5rem;
  color: white;
  font-weight: 500;
  margin-bottom: -0.2rem;
  margin-right: 1rem;
  margin-left: 0.2rem;
  white-space: nowrap;
  user-select: none;
}
.desc {
  font-size: 16px;
  font-weight: 500;
}

.desc .material-icons-outlined {
  font-size: 1.5rem;
  color: #ff9900;
  vertical-align: middle;
}
.word-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2rem;
  max-width: 800px;
}
@media screen and (max-width: 1600px) {
  .word-wrap {
    max-width: 600px;
  }
}
@media screen and (max-width: 1382px) {
  .word-wrap {
    max-width: 400px;
  }
}
.user-select-none {
  user-select: none;
}
label {
  cursor: pointer !important;
}
/* ----- 1. content dropdown css - end */
.pill-badge {
  border-radius: 20px;
  border: none;
  background-color: #e8e8e8;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.2rem 1rem;
  margin-top: 0.2rem;
}
.pill-badge.red {
  background-color: #fce1de;
  color: #f54337;
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
}
.pill-badge.green {
  background-color: #e2f2e3;
  color: #4dae50;
}

.pill-badge:first-letter {
  text-transform: uppercase;
}
.btn-arrow-icon {
  border-radius: 50% !important;
}
.show-all-button {
  cursor: pointer;
}

.td-none {
  cursor: pointer;
}

.td-none:hover .description {
  color: #2c8de0;
}

.radial-progress-container {
  font-weight: 600;
  font-size: 1.5rem;
}
.radial-progress-container #number-green {
  color: #5fb355 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.radial-progress-container #number-red {
  color: #e11300 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.radial-progress-container #number-yellow {
  color: #edb95e !important;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
