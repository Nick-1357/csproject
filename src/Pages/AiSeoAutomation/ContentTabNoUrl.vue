<template>
  <div>
    <!-- Contents Tab - Contents -->
    <div id="bodyfix__content__content" class="bodyfix__content__content">
      <div
        class="content__dropdown__group"
        v-for="(item, index) in content_article"
        :key="(item, index)"
      >
        <div class="content__dropdown__title d-flex">
          <div class="content__dropdown__title__left">
            <span class="title">{{ item.key | nexrank }}</span>
            <span class="description word-wrap">{{ item.value }}</span>
          </div>
          <div class="content__dropdown__title__right">
            <button
              v-if="item.key !== 'title' && item.key != 'description'"
              @click="removeData(index)"
              class="btn btn-outline-danger d-flex align-items-center me-2"
            >
              <span class="material-icons-outlined me-2">delete</span>Remove
            </button>

            <button
              class="btn-primary ms-2 btn-arrow-icon"
              v-b-toggle="'content_article_no_url' + index"
            >
              <span class="arrow-icon material-icons-outlined text-white">
                expand_more
              </span>
            </button>
          </div>
        </div>
        <b-collapse :id="'content_article_no_url' + index">
          <div class="content__dropdown__content pt-4">
            <!-- AI Suggestions Section - Tabs-->
            <h5 class="mb-3 user-select-none">AI Suggestions</h5>
            <div class="grey__card-outlined">
              <div class="aisuggestion__tabs">
                <button
                  class="aisuggestion__tab"
                  :class="tab.class"
                  v-for="(tab, index_tab) in item.Tabs_AiSuggestions"
                  :key="'tab' + index_tab"
                  @click="changeTab_AiSuggestions(tab.name, index, index_tab)"
                >
                  <span class="aisuggestion__tab__title">{{ tab.name }}</span>
                </button>
              </div>

              <!-- Suggestions Tab -->
              <div
                id="content__aisuggestions__suggestions"
                class="p-3"
                v-if="
                  item.chosenTab_AiSuggestions == 'Suggestions' &&
                  item.key != 'p'
                "
              >
                <h6 class="mb-3 user-select-none">Options</h6>

                <div
                  class="form-check suggestion"
                  v-for="(sug, index_sug) in item.suggestions"
                  :key="'suggestions' + index_sug"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    @change="getContent"
                    name="aisuggestion_suggestions"
                    :id="sug"
                    :value="sug"
                    v-model="item.value"
                  />
                  <label class="form-check-label" :for="sug">
                    <div class="d-flex align-items-center">
                      <!-- <span class="tag__score">+ 2.71</span
                      > -->
                      <span class="desc">{{ sug }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <div
                id="content__aisuggestions__suggestions"
                class="p-3"
                v-else-if="
                  item.chosenTab_AiSuggestions == 'Suggestions' &&
                  item.key == 'p'
                "
              >
                <h6 class="mb-3 user-select-none">Options</h6>

                <div
                  class="form-check suggestion"
                  v-for="(sug, index_sug) in item.suggestions"
                  :key="'suggestions' + index_sug"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    @change="getContent"
                    name="aisuggestion_suggestions"
                    :id="sug.paragraph"
                    :value="sug.paragraph"
                    v-model="item.value"
                  />
                  <label class="form-check-label" :for="sug.paragraph">
                    <div class="d-flex align-items-center">
                      <!-- <span class="tag__score">+ 2.71</span
                      > -->
                      <span class="desc">{{ sug.paragraph }}</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Custom Suggestions -->
              <div
                id="content__aisuggestions__custom"
                class="p-3"
                v-if="item.chosenTab_AiSuggestions == 'Custom'"
              >
                <h6 class="mb-3 user-select-none">Content</h6>
                <form action="validateCustom">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="ValidateTextArea"
                      rows="5"
                      placeholder="Type in your custom content here"
                      style="border-color: #888"
                      v-model="item.value"
                    ></textarea>
                  </div>
                  <!-- <button type="submit" class="btn btn-primary mt-3">
                    Validate Score
                  </button> -->
                </form>

                <div class="form-check suggestion">
                  <input
                    class="form-check-input"
                    type="radio"
                    @change="getContent"
                    name="aisuggestion_suggestions"
                    :id="item.value"
                    :value="item.value"
                    v-model="item.value"
                  />
                  <label class="form-check-label" :for="item.value">
                    <div class="d-flex align-items-center">
                      <!-- <span class="tag__score">+ 2.71</span
                      > -->
                      <span class="desc">{{ item.value }}</span>
                    </div>
                  </label>
                </div>

                <!-- <div class="d-flex align-items-center mt-3">
                  <span class="tag__score">7.61</span
                  ><span class="desc user-select-none">Custom Score Value</span>
                </div>
                <div
                  class="d-flex align-items-center mt-3 text-primary user-select-none"
                >
                  <span class="material-icons-outlined me-2">recommend</span>
                  <h6 class="desc mt-1 text-primary">
                    Congratulations! Highest Score Recorded
                  </h6>
                </div> -->
              </div>
            </div>

            <!-- <div class="d-flex">
              <button class="btn btn-primary d-flex align-items-center m-2">
                Update
              </button>
            </div> -->
          </div>
        </b-collapse>
      </div>

      <div class="d-flex">
        <h5 class="d-flex align-items-center ms-1 fw-600 text-darkgreen">
          Add Element :
        </h5>
        <button
          @click="addElement('h1')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H1 Element
        </button>

        <button
          @click="addElement('h2')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H2 Element
        </button>

        <button
          @click="addElement('h3')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
        >
          H3 Element
        </button>

        <button
          @click="addElement('p')"
          class="btn btn-primary-outlined d-flex align-items-center m-2 btn-lg"
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
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "description",
          value: "",
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "h1",
          value: "",
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "h2",
          value: "",
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "h3",
          value: "",
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
        {
          key: "p",
          value: "",
          Tabs_AiSuggestions: [
            { name: "Suggestions", class: "aisuggestion__tab active" },
            { name: "Custom", class: "aisuggestion__tab" },
          ],
          chosenTab_AiSuggestions: "Suggestions",
        },
      ],
      values: [],
      initialSuggestion: [],
    };
  },
  methods: {
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
.bodyfix__content {
  margin-top: 1rem;
}

/* ----- 1.content dropdown css - start */
.bodyfix__content__content .content__dropdown__group {
  border: 1px solid #2c8de0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}
.bodyfix__content__content .content__dropdown__group:last-child {
  margin-bottom: 0rem;
}
.content__dropdown__title {
  padding: 1.5rem 2rem;
  transition: all 0.4s ease-out;
  user-select: none;
}
.content__dropdown__title__left {
  display: flex;
  align-items: center;
  margin-right: auto;
}
.content__dropdown__title__left .title {
  margin-right: 1rem;
  color: #183b1c;
  font-size: 20px;
  min-width: 220px;
  font-weight: 600;
  user-select: none;
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
.btn-arrow-icon[aria-expanded="false"] .arrow-icon {
  transform: rotate(0deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.btn-arrow-icon[aria-expanded="true"] .arrow-icon {
  transform: rotate(180deg);
  transition: 0.3s ease-out;
  color: #2c8de0;
}
.content__dropdown__content {
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #2c8de0;
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
  margin-bottom: 0.5rem;
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
  position: absolute;
  margin-right: 0.5rem;
  margin-top: 0.3rem;
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
  color: #555555;
  font-weight: 500;
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
.btn-arrow-icon {
  border-radius: 50% !important;
}
/* ----- 1. content dropdown css - end */
</style>
