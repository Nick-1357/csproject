<template>
  <div>
    <aside :class="isExpanded && 'is-expanded'" v-if="content.campaign_type != 'blog_writer'">
      <div class="nexcard__content active" v-for="(item, index) in p" :key="'p' + index">
        <div class="nexcard__content__title-blog_writer">
          <h5>{{ item.topics }}</h5>
        </div>
        <div class="nexcard__content__desc text-muted mt-4">
          <p v-html="item.content[0].replace(/\n/g, '<br/>')"></p>
          <div class="nexcard__content__buttons">
            <button @click="chosenContent('others', item.content[0].replace(/\n/g, '<br/>'))" class="btn btn-primary-outlined text-uppercase my-3">+ Add Content</button>
          </div>
        </div>
      </div>
    </aside>

    <aside :class="isExpanded && 'is-expanded'" v-else>
      <div v-if="IntroImage.length != 0 && IntroImage[0].complete >= 100 && IntroImage[0].image.length != 0">
        <div class="nexcard__content active img__nexcard" v-for="(img, index_image) in IntroImage[0].image" :key="'IntroImage' + index_image">
          <div class="nexcard__content__collapse" type="button" data-toggle="collapse" :data-target="'#IntroImage' + index_image" aria-expanded="false" aria-controls="Recommended Topic">
            <div class="nexcard__content__title">
              <h5>Image</h5>
              <span class="material-icons-outlined ms-auto p-0 arrow-icon">expand_more</span>
            </div>
          </div>
          <div class="collapse" :id="'IntroImage' + index_image">
            <div class="nexcard__content__desc mt-4">
              <img class="card-img-top" :src="`data:image/png;base64,${img.data}`" alt="" />
              <div class="nexcard__content__buttons">
                <button @click="chosenContent('Image', img.data)" class="btn btn-primary-outlined text-uppercase my-3">+ Add Content</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard__content" v-if="this.h1Elements.length != 0">
        <div class="nexcard__content__collapse" type="button" data-toggle="collapse" data-target="#Recommended Topic" aria-expanded="false" aria-controls="Recommended Topic">
          <div class="nexcard__content__title">
            <h5>Recommended Topic/H1</h5>
            <span class="material-icons-outlined ms-auto p-0 arrow-icon">expand_more</span>
          </div>
        </div>
        <div class="collapse" id="Recommended Topic">
          <div :key="index" v-for="(para, index) in h1Elements" class="nexcard__content__desc text-muted pt-3 pb-4">
            <p v-html="para.replace(/\n/g, '<br/>')"></p>
            <div class="nexcard__content__buttons">
              <button @click="chosenContent('H1', para.replace(/\n/g, '<br/>'))" class="btn btn-primary-outlined text-uppercase">+ Add Content</button>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__collapse" type="button" data-toggle="collapse" data-target="#Introduction" aria-expanded="false" aria-controls="Introduction">
          <div class="nexcard__content__title">
            <h5>Introduction</h5>
            <span class="material-icons-outlined ms-auto p-0 arrow-icon">expand_more</span>
          </div>
        </div>
        <div class="collapse" id="Introduction">
          <div class="nexcard__content__desc text-muted pt-3 pb-4">
            <p v-html="Intro.replace(/\n/g, '<br/>')"></p>
            <div class="nexcard__content__buttons">
              <button @click="chosenContent('Intro', Intro.replace(/\n/g, '<br/>'))" class="btn btn-primary-outlined text-uppercase">+ Add Content</button>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard__content" :key="index" v-for="(para, index) in paragraph">
        <div class="nexcard__content__collapse" type="button" data-toggle="collapse" :data-target="'#Body' + index" aria-expanded="false" aria-controls="Body">
          <div class="nexcard__content__title">
            <h5>Body Paragraph {{ index + 1 }}</h5>
            <span class="material-icons-outlined ms-auto p-0 arrow-icon">expand_more</span>
          </div>
        </div>

        <div class="collapse" :id="'Body' + index">
          <div class="nexcard__content__desc pt-3 pb-4">
            <b>{{ h2Elements[index] }}</b>
            <p class="text-muted" v-html="para.replace(/\n/g, '<br/>')"></p>
            <div class="nexcard__content__buttons">
              <button @click="chosenContent('body', para.replace(/\n/g, '<br/>'), index)" class="btn btn-primary-outlined text-uppercase">+ Add Content</button>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__collapse" type="button" data-toggle="collapse" data-target="#Conclusion" aria-expanded="false" aria-controls="Conclusion">
          <div class="nexcard__content__title">
            <h5>Conclusion</h5>
            <span class="material-icons-outlined ms-auto p-0 arrow-icon">expand_more</span>
          </div>
        </div>
        <div class="collapse" id="Conclusion">
          <div class="nexcard__content__desc text-muted pt-3 pb-4">
            <p v-html="conclusion.replace(/\n/g, '<br/>')"></p>
            <div class="nexcard__content__buttons">
              <button @click="chosenContent('conclusion', conclusion.replace(/\n/g, '<br/>'))" class="btn btn-primary-outlined text-uppercase">+ Add Content</button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- <div class="sidebar__button__wrapper">
      <button @click="toggleMenu" class="sidebar__button">
        <span class="material-icons-outlined">chevron_right</span>
      </button>
    </div> -->
  </div>
</template>
<script>
/* eslint-disable */
import editor from "@/Pages/Content_Image/ContentEditor";
import AiContentGenerator from "@/store/AiContentGenerator.js";
import SidebarleftContentEditor from "../components/SidebarleftContentEditor.vue";
export default {
  name: "SidebarLeft",
  components: { editor, SidebarleftContentEditor },
  data() {
    return {
      isExpanded: true,
      content: [],
      editor,
      h1Elements: [],
      h1Show: [],
      addResult: [],
      h1: [],
      h2: [],
      h3: [],
      title: [],
      desc: [],
      p: [],
      choosenPara: "",
      subtopics: [],
      anchors: [],
      IntroImage: [],
      paraShow: [],
      h2Elements: [],
      selected_content: "",
    };
  },
  watch: {
    isExpanded() {
      console.log(this.isExpanded);
    },
  },
  methods: {
    chosenContent(element, data, index) {
      if (element == "body") {
        this.selected_content = [element, `<h2>` + this.h2Elements[index] + `</h2><br>` + data];
        localStorage.setItem("editor_Content", JSON.stringify(this.selected_content));
      } else {
        this.selected_content = [element, data];
        localStorage.setItem("editor_Content", JSON.stringify(this.selected_content));
      }
    },

    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    handleAnchor(p, anchors) {
      p.forEach((element, index) => {
        element.content.forEach((content, index_content) => {
          anchors.forEach((anchor) => {
            if (content.toLowerCase().includes(anchor.toLowerCase())) {
              const mySentence = anchor;
              const words = mySentence.split(" ");

              for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
              }
              words.join(" ");
              content = content.replaceAll(words.join(" "), `<u style="color:blue">${words.join(" ")}</u>`);

              content = content.replaceAll(anchor.charAt(0).toUpperCase() + anchor.slice(1), `<u style="color:blue">${anchor.charAt(0).toUpperCase() + anchor.slice(1)}</u>`);

              content = content.replaceAll(anchor, `<u style="color:blue">${anchor}</u>`);
            }

            if (content.includes("\n")) {
              //
              content = content.replaceAll("\n", `<br>`);
            }
          });

          element.content[index_content] = content;
        });
      });

      // //
      return p;
    },

    handleAnchor_blog(data) {
      this.anchors.forEach((anchor) => {
        var count = 0;
        if (data.toLowerCase().includes(anchor.toLowerCase())) {
          const mySentence = anchor;
          const words = mySentence.split(" ");

          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          }

          words.join(" ");

          var t = 0;

          var result_1 = data.replace(words.join(" "), `<u style="color:blue">${words.join(" ")}</u>`);

          if (data != result_1) {
            count++;
          }

          if (count <= 3) {
            var result_2 = result_1.replace(new RegExp(words.join(" "), "g"), (match) => (++t === 2 ? `<u style="color:blue">${words.join(" ")}</u>` : match));
            if (result_2 != result_1) {
              count++;
            }
          } else {
            var result_2 = result_1;
          }

          if (count <= 3) {
            var t3 = 0;
            var result_3 = result_2.replace(new RegExp(words.join(" "), "g"), (match) => (++t3 === 3 ? `<u style="color:blue">${words.join(" ")}</u>` : match));

            if (result_2 != result_3) {
              count++;
            }
          } else {
            var result_3 = result_2;
          }

          data = result_3;

          if (count <= 3) {
            var t = 0;

            var result_1 = data.replace(anchor.charAt(0).toUpperCase() + anchor.slice(1), `<u style="color:blue">${anchor.charAt(0).toUpperCase() + anchor.slice(1)}</u>`);

            if (data != result_1) {
              count++;
            }
          } else {
            var result_1 = data;
          }

          if (count <= 3) {
            var result_2 = result_1.replace(new RegExp(anchor.charAt(0).toUpperCase() + anchor.slice(1), "g"), (match) =>
              ++t === 2 ? `<u style="color:blue">${anchor.charAt(0).toUpperCase() + anchor.slice(1)}</u>` : match
            );

            if (result_2 != result_1) {
              count++;
            }
          } else {
            var result_2 = result_1;
          }

          if (count <= 3) {
            var t3 = 0;
            var result_3 = result_2.replace(new RegExp(anchor.charAt(0).toUpperCase() + anchor.slice(1), "g"), (match) =>
              ++t3 === 3 ? `<u style="color:blue">${anchor.charAt(0).toUpperCase() + anchor.slice(1)}</u>` : match
            );

            if (result_2 != result_3) {
              count++;
            }
          } else {
            var result_3 = result_2;
          }

          data = result_3;

          if (count <= 3) {
            var t = 0;

            var result_1 = data.replace(anchor, `<u style="color:blue">${anchor}</u>`);
            if (result_1 != data) {
              count++;
            }
          } else {
            var result_1 = data;
          }

          if (count <= 3) {
            var result_2 = result_1.replace(new RegExp(anchor, "g"), (match) => (++t === 2 ? `<u style="color:blue">${anchor}</u>` : match));
            if (result_1 != result_2) {
              count++;
            }
          } else {
            var result_2 = result_1;
          }

          if (count <= 3) {
            var t3 = 0;
            var result_3 = result_2.replace(new RegExp(anchor, "g"), (match) => (++t3 === 3 ? `<u style="color:blue">${anchor}</u>` : match));
          } else {
            var result_3 = result_2;
          }

          data = result_3;
          //
        }
      });

      data = data.replaceAll("\n", `<br>`);
      return data;
    },

    arrangeAnchor(data) {
      var earlyAnchor = [];
      if (data.length != 0) {
        JSON.parse(data[0].value).forEach((val) => {
          earlyAnchor.push(val);
        });
      }

      var anchorCategory = [];

      earlyAnchor.forEach((val) => {
        const arr = val.split(" ");
        anchorCategory.push({
          val: val,
          length: arr.filter((word) => word !== "").length,
        });
      });

      // //

      var categoryAnchor = [];
      const groupByKey = (list, key, { omitKey = false }) =>
        list.reduce(
          (hash, { [key]: value, ...rest }) => ({
            ...hash,
            [value]: (hash[value] || []).concat(omitKey ? { ...rest } : { [key]: value, ...rest }),
          }),
          {}
        );

      // //
      categoryAnchor = groupByKey(anchorCategory, "length", { omitKey: true });

      var changeCategory = [];

      for (const [key, value] of Object.entries(categoryAnchor)) {
        // //

        changeCategory.push(value);
      }

      // //

      var newAnchor = [];

      changeCategory.reverse().forEach((element, index) => {
        var valNew = [];

        element.forEach((val) => {
          // //
          valNew.push(val.val);
        });

        newAnchor.push(valNew);
      });

      // //

      var concatArray = [];

      newAnchor.forEach((element, index) => {
        concatArray = concatArray.concat(element);
      });

      //

      return concatArray;
    },
    arrangeResult(data) {
      var result = [];
      var array = [];

      result = data;

      result.forEach((element) => {
        //  //

        if (JSON.parse(element.content).subtopic == undefined) {
          this.oldInterface = false;
        }
      });

      if (this.oldInterface == true) {
        result.forEach((element) => {
          if (element.content_type === "p") {
            array.push(element);
          }

          //array = this.assignEditor(array);
        });
      } else {
        result.forEach((element, index) => {
          array.push({
            topics: JSON.parse(element.content).topics,
            content: [JSON.parse(element.content).content],
          });
        });
        //

        return array;
        //this.p = this.assignEditorTitles(this.p);
      }
    },

    NexArtCards(data) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.IntroImage = [];

      data.forEach((element, index) => {
        AiContentGenerator.fetchNexArt(element.id)
          .then((response) => {
            if (element.image_id.value == "Introduction") {
              this.IntroImage.push({
                id: element.id,
                keyword: element.keyword,
                index: element.image_id.value,
                image: response.data.data.values,
                complete: element.complete_percentage,
              });
            }

            loader.hide();
          })
          .catch((err) => {
            loader.hide();
            console.log(err);
          });
      });

      //
    },

    localStoreHandler(e) {
      //console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "content_toggle") {
        this.isExpanded = e.value;
      }
    },
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);

    localStorage.setItem("content_toggle", true);

    AiContentGenerator.fetchContentCampaign({
      id: this.$route.params.id,
    }).then((response) => {
      ////
      this.content = response.data.data;

      loader.hide();

      if (this.content.campaign_type != "blog_writer") {
        var topics = [];
        topics = response.data.data.subtopics;

        if (response.data.data.subtopics != null) {
          this.subtopics = JSON.parse(topics.value);
        }

        this.anchors = this.arrangeAnchor(response.data.data.anchors);

        this.p = this.arrangeResult(response.data.data.texts);
        if (
          this.content.subtopic_case == "blog idea and outline" ||
          this.content.subtopic_case == "blog section writing" ||
          this.content.subtopic_case == "business idea pitching" ||
          this.content.subtopic_case == "selling copywriting" ||
          this.content.subtopic_case == "descriptive copywriting" ||
          this.content.subtopic_case == "paragraphs" ||
          this.content.subtopic_case == "keyword cluster"
        ) {
          this.p = this.handleAnchor(this.p, this.anchors);
        }
      } else {
        var earlyAnchor = [];
        if (response.data.data.anchors.length != 0) {
          JSON.parse(response.data.data.anchors[0].value).forEach((val) => {
            earlyAnchor.push(val);
          });
        }

        var anchorCategory = [];

        earlyAnchor.forEach((val) => {
          const arr = val.split(" ");

          anchorCategory.push({
            val: val,
            length: arr.filter((word) => word !== "").length,
          });
        });

        var categoryAnchor = [];
        const groupByKey = (list, key, { omitKey = false }) =>
          list.reduce(
            (hash, { [key]: value, ...rest }) => ({
              ...hash,
              [value]: (hash[value] || []).concat(omitKey ? { ...rest } : { [key]: value, ...rest }),
            }),
            {}
          );

        categoryAnchor = groupByKey(anchorCategory, "length", {
          omitKey: true,
        });

        var changeCategory = [];

        for (const [key, value] of Object.entries(categoryAnchor)) {
          changeCategory.push(value);
        }

        var newAnchor = [];

        changeCategory.reverse().forEach((element, index) => {
          var valNew = [];

          element.forEach((val) => {
            // //
            valNew.push(val.val);
          });

          newAnchor.push(valNew);
        });

        // //

        var concatArray = [];

        newAnchor.forEach((element, index) => {
          concatArray = concatArray.concat(element);
        });

        ////

        this.anchors = concatArray;

        response.data.data.result.forEach((element) => {
          if (element.key == "generated_text") {
            this.generated_text = JSON.parse(element.value);
            ////

            this.Intro = this.generated_text.Content.Introduction;
            this.conclusion = this.generated_text.Content.Conclusion;
            //
            this.paragraph = [];

            this.generated_text.Content.Body.forEach((element) => {
              //

              if (element.length != 0) {
                this.paragraph.push(element);
              }
            });

            // this.paragraph = this.generated_text.Content.Body;

            this.paragraph.forEach((element, index) => {
              //

              this.paragraph[index] = this.handleAnchor_blog(element);
              //
            });
          }
          if (element.key == "outlines") {
            if (typeof JSON.parse(element.value)[0] == "string") {
              this.h2Elements = JSON.parse(element.value);
            } else {
              this.h2Elements = JSON.parse(element.value)[0].topics;
            }
          }
        });
        if (this.generated_text.Content.H1) {
          this.generated_text.Content.H1.forEach((element) => {
            if (element.length != 0) {
              this.h1Elements.push(element);
            }
          });

          this.h1Elements.forEach((element, index) => {
            this.h1Show.push(true);

            this.h1Elements[index] = this.handleAnchor_blog(element);
            //
          });
        }

        this.Intro = this.handleAnchor_blog(this.Intro);

        this.conclusion = this.handleAnchor_blog(this.conclusion);

        if (response.data.data.nexart_camapaigns.length != 0) {
          this.NexArtCards(response.data.data.nexart_camapaigns);
        }

        //console.log(this.content.deployed_pages.length);

        if (this.content.deployed_pages.length != 0) {
          //
          this.editor.clipboard.dangerouslyPasteHTML(this.content.deployed_pages[0].content);
        } else {
        }
      }
    });
  },
};
</script>
<style scoped>
.img__nexcard:nth-child(n + 1) {
  margin-bottom: 1rem;
}
.img__nexcard:last-child {
  margin-bottom: 0.5rem;
}
aside {
  position: sticky;
  top: 67px;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--sidebar-bg-colour);
  transition: 0.4s ease-out;
  border-right: rgb(207, 207, 207) 1px solid;
  outline: rgb(207, 207, 207) 1px solid;
  transform: translateX(-350px);
  padding: 1.5rem;
  /* margin right sidebar when not expanded */
  margin-right: -350px;
  box-shadow: -2px 3px 20px 2px #c2c2c260;
}
aside::-webkit-scrollbar {
  display: none;
}
/* aside::-webkit-scrollbar-track {
  background: #fafafa;
  box-shadow: transparent;
  border-radius: 5px;
}
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
  /* margin right sidebar when expanded */
  margin-right: 0px;
}

/* Sidebar tab button concept */
/* aside ~ .sidebar__button__wrapper {
  border: 2px solid rgb(207, 207, 207);
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  top: 0;
  z-index: 9999;
  transform: translate(0px, 25px);
  transform: translate(0px, 100px);
  transform: translate(0px, 150px);

  transition: 0.4s ease-out !important;
}
aside.is-expanded ~ .sidebar__button__wrapper {
  border-left: none;
  transform: translate(349px, 25px);
  transform: translate(349px, 100px);
  transform: translate(349px, 150px);
  transition: 0.4s ease-out;
}
.sidebar__button__wrapper .sidebar__button {
  height: 80px;
  transform: rotate(0deg);
  transition: all 0.4s ease-out;
  border-left: none;
}
aside.is-expanded ~ .sidebar__button__wrapper .sidebar__button {
  transform: rotate(-180deg);
  transition: all 0.4s ease-out;
  border-left: none;
}
.sidebar__button__wrapper {
  background: linear-gradient(to left, #ededed, #fefefe);
  transition: 0.4s ease-out;
  border-left: none;
}
.sidebar__button__wrapper:hover {
  background: linear-gradient(to left, #e7e7e7, #fefefe);
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  transition: all 0.1s ease-out;
  border-left: none;
} */

/* nexcard css */
.nexcard__content {
  background-color: #ffffff;
  border: 1px solid var(--color-primary);
  outline: 1px solid transparent;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin: 0.5rem 0 0.5rem;
  transition: all 0.4s ease;
}

.nexcard__content__title {
  display: flex;
  border-bottom: 1px solid transparent;
  padding: 1rem 1rem 1rem;
  user-select: none;
  cursor: pointer;
  transition: 0.4s ease-in;
  transition: 0.3s ease-out;
}
.nexcard__content__title-blog_writer {
  display: flex;
  border-bottom: 1px solid transparent;
  padding: 1rem 1rem 0rem;
  user-select: none;
}
.nexcard__content__title:hover {
  background-color: #def;
  transition: 0.3s ease-out;
}
.nexcard__content__collapse[aria-expanded="true"] .nexcard__content__title {
  border-bottom: 1px solid var(--color-primary);
  transition: 0s ease-out;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.nexcard__content__collapse[aria-expanded="false"] .nexcard__content__title {
  border-radius: 10px;
}
.nexcard__content__collapse[aria-expanded="true"] .nexcard__content__buttons {
  margin-bottom: 1rem !important;
}
.nexcard__content h5 {
  margin-bottom: 0;
}
.nexcard__content__collapse[aria-expanded="true"] .arrow-icon {
  transform: rotate(180deg);
  transition: 0.3s ease-out;
  user-select: none;
  color: var(--color-primary);
}
.nexcard__content__collapse[aria-expanded="false"] .arrow-icon {
  transform: rotate(0deg);
  transition: 0.3s ease-out;
  user-select: none;
  color: var(--color-primary);
}
.nexcard__content.active {
  border: 1px solid var(--color-primary);
  /* outline: 1px solid var(--color-primary); */
  transition: all 0.4s ease;
}
.nexcard__content .nexcard__content__buttons {
  /* visibility: hidden; */
  /* opacity: 0; */
  transform: translateY(5px);
  transition: all 0.3s ease;
  /* display: none !important; */
}
.nexcard__content .nexcard__content__desc {
  /* display: none !important; */
  /* opacity: 0; */
  padding: 0rem 1rem 0rem;
  transition: all 0.3s ease;
  cursor: text;
}
.nexcard__content.active .nexcard__content__buttons {
  /* padding: 0rem 1rem 1rem; */
  display: block !important;
  visibility: visible;
  opacity: 1;
  transition: all 0.4s ease;
  transform: translateY(0px);
}

.nexcard__content.active .nexcard__content__desc {
  display: block !important;
  opacity: 1;
  transition: all 0.4s ease;
}
</style>
