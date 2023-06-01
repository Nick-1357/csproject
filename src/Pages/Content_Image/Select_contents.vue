<template>
  <div>
    <div class="selectcontent">
      <div class="selectcontent__title">
        <span class="fw-600">You may choose {{ restriction }} content points to generate your blog</span>
        <!-- <span class="material-icons-outlined">help_outline</span> -->
      </div>

      <div class="selectcontent__content">
        <!-- <form class="selectcontent__checkbox" v-for="n in 4" :key="n">
          <input id="content1" name="content1" type="checkbox" value="content1"/>
          <label for="content1">Content Point {{ n }}</label>
          <button class="material-icons-outlined btn-edit">edit_note</button>
        </form> -->

        <div class="selectcontent__checkbox" v-for="(topic, index) in allTopics" :key="'topic' + index">
          <input :id="topic.value" type="checkbox" :value="topic.value" v-model="selected_topics" @change="handleSelected" />
          <label :for="topic.value" v-if="topic.editor == false">{{ topic.value }}</label>
          <b-form-textarea v-else type="text" id="content" v-model="topic.value" rows="2" max-rows="6"></b-form-textarea>
          <button class="material-icons-outlined btn-edit" @click="changetoEditor(index)">edit_note</button>
        </div>
      </div>
    </div>
    <div class="d-flex mt-4 mb-0">
      <div class="ms-auto"></div>
      <!-- <button class="btn btn-primary-outlined ms-auto">Back</button> -->
      <button class="btn btn-primary ms-2" @click.once="generate">Next</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import AiContentGenerator from "@/store/AiContentGenerator.js";

export default {
  name: "select_contents",
  components: {},

  data() {
    return {
      n: 1,
      content: [],
      Intro: "Introduction will be filled here",
      conclusion: "Conclusion will be filled here",
      topics: [],
      points: [],
      semanticTopics: [],
      Outline: [],
      allTopics: [],
      mainEditor: [],
      chosenVariant: 0,
      selected_topics: [],
      restriction: 0,
    };
  },

  watch: {
    p(value) {
      // //
      // //
    },
    deep: true,
  },

  destroyed() {
    clearInterval(this.interval);
  },

  methods: {
    changetoEditor(index) {
      var arr = this.allTopics[index];

      if (arr.editor == false) {
        arr.editor = true;
      } else {
        arr.editor = false;
      }

      this.allTopics[index].splice(index, 1, arr);

      //
    },
    changeTitleEditor(indexTopic) {
      this.mainEditor[indexTopic];
      var arr = this.mainEditor[indexTopic];
      //

      if (arr == false) {
        arr = true;
      } else {
        arr = false;
      }

      this.mainEditor.splice(indexTopic, 1, arr);
    },

    handleSelected() {
      if (this.selected_topics.length > this.restriction) {
        this.selected_topics.splice(0, 1);
      }
    },
    EditSubtopic() {
      AiContentGenerator.editSubtopic(this.Outline, this.$route.params.id)
        .then((response) => {
          this.$router.push({
            name: "content_image_add_fields",
            params: {
              step: "content",
              id: this.$route.params.id,
              category: "blog writing",
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    generate() {
      console.log(this.selected_topics.length);

      if (this.selected_topics.length == 0 || this.selected_topics.length < this.restriction) {
        this.$toast.warning(`Important: Kindly choose ${this.restriction} content points`);

        // this.$bvToast.toast(
        //   `Kindly choose ${this.restriction} content points`,
        //   {
        //     title: "Important!",
        //     variant: "warning",
        //     toaster: "b-toaster-bottom-left",
        //     solid: true,
        //   }
        // );
      } else {
        this.Outline = {
          outlines: JSON.stringify(this.selected_topics),
        };

        //  console.log(this.selected_topics)

        this.EditSubtopic();
      }
    },
  },
  mounted() {},

  created() {
    AiContentGenerator.fetchContentCampaign({
      id: this.$route.params.id,
    }).then((response) => {
      ////
      this.content = response.data.data;

      if (this.content.model_type == "medium") {
        this.restriction = 4;
      } else if (this.content.model_type == "short") {
        this.restriction = 3;
      }

      response.data.data.result.forEach((element) => {
        if (element.key == "semanticTopics") {
          this.semanticTopics = JSON.parse(element.value);

          this.semanticTopics.forEach((element) => {
            this.words.push([element.text, element.value]);
          });

          // //
        }

        if (element.key == "outlines") {
          this.topics = JSON.parse(element.value);
          console.log(this.topics);
          // //

          this.topics.forEach((element, index) => {
            this.mainEditor.push(false);
            element.topics.forEach((topic, index2) => {
              this.allTopics.push({
                OriginalValue: topic,
                value: topic,
                editor: false,
              });
            });
          });

          console.log(this.allTopics);
          //
        }
      });
    });
  },
};
</script>

<style lang="css" scoped>
/* selectcontent__checkbox css */
.selectcontent__checkbox {
  background-color: #ffffff;
  display: block;
  margin: 10px 0;
  position: relative;
  border-radius: 8px;
}
.selectcontent__checkbox label {
  padding: 15px 50px;
  width: 100%;
  display: block;
  text-align: left;
  color: #3c454c;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 200ms ease-in;
  overflow: hidden;
  border: 2px solid #bcbdbc;
  border-radius: 8px;
  user-select: none;
}
.selectcontent__checkbox label:hover {
  background-color: #ededed;
  border: 2px solid #309e58;
  transition: all 300ms ease-out;
}
.selectcontent__checkbox label:before {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  content: "";
  background-color: #f5f5f7;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale3d(1, 1, 1);
  opacity: 0;
  z-index: -1;
}
.selectcontent__checkbox {
  display: flex;
}
.selectcontent__checkbox .btn-edit {
  z-index: 2;
  position: absolute;
  right: 10px;
  top: 15px;
}

.selectcontent__checkbox label:after {
  width: 25px;
  height: 25px;
  content: "";
  border: 1px solid transparent;
  background-color: #afafaf;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
  background-repeat: no-repeat;
  background-position: 0px 1px;
  border-radius: 50%;
  z-index: 2;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 300ms ease-out;
}

input:checked ~ label {
  color: #309e58;
  border-color: #309e58;
  transition: all 300ms ease-out;
}

input:checked ~ label:before {
  transform: translate(-50%, -50%) scale3d(56, 56, 1);
  opacity: 1;
}

input:checked ~ label:after {
  background-color: #309e58;
  border-color: #309e58;
}

input {
  width: 32px;
  height: 32px;
  order: 1;
  z-index: 2;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  visibility: hidden;
}

/* ------------------------------------------------------- */
.selectcontent {
  margin: 0 auto;
  padding: 3rem 0rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}
.selectcontent__title {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.selectcontent__title .material-icons-outlined {
  color: black;
  font-size: 15px;
  cursor: default;
  margin-left: 0.5rem;
}

.selectcontent__content {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
}
.selectcontent__selectable {
  display: flex;
  align-items: center;
  border: 2px solid #bcbdbc;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  padding: 1rem 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable .check {
  color: #bcbdbc;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable.active {
  border: 2px solid #309e58;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable.active .check {
  color: #309e58;
  transition: all 0.3s ease-out;
}

.selectcontent__selectable:hover {
  border: 2px solid #757575;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable:hover .check {
  color: #757575;
  transition: all 0.3s ease-out;
}

.selectcontent__contentpoint {
  margin-left: 1rem;
}
.btn-edit {
  color: rgb(52, 52, 52);
  margin-left: auto;
}
.btn-edit:hover {
  color: #2d8ee3;
  transition: all 0.3s ease-out;
}
</style>
