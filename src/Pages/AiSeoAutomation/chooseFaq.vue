<template>
  <div>
    <b-modal id="modal-confirm-content-planner" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Confirmation</strong>

        <div class="card-text mt-3">
          <span>Kindly, make sure you have chosen all the contents.</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button @click="$bvModal.hide('modal-confirm-content-planner')" class="btn btn-primary-outlined ms-auto">Cancel</button>
          <button @click="nextStep()" class="btn btn-primary ms-2 text-white">Confirm</button>
        </div>
      </div>
    </b-modal>

    <div class="selectcontent">
      <!-- AI Suggestions Section - Tabs-->

      <div class="row">
        <div class="col">
          <div class="d-flex align-items-center">
            <span class="fw-600 mb-1">Choose your Question List</span>
          </div>

          <!-- Suggestions Tab -->

          <div class="selectcontent__content">
            <div class="selectcontent__checkbox" v-for="(normal, index_normal) in faq" :key="'topic' + index_normal">
              <input :name="'topic' + index_normal" :id="'topic' + index_normal" type="checkbox" :value="normal" v-model="chosenFaq" />
              <label v-if="normal.editor == false" :for="'topic' + index_normal">{{ normal.title }}</label>

              <b-form-textarea class="form-control custom-textarea" v-else type="text" id="content" v-model="normal.title" rows="2" max-rows="6"></b-form-textarea>

              <!--Jasdev done: generate and regenrate button-->

              <div>
                <div class="d-flex" v-if="normal.regenerate == false">
                  <button @click="generateContent(normal, index_normal)" class="btn btn-primary btn-generate">Generate</button>
                </div>

                <div class="card-text d-flex mt-1" v-if="normal.content.length != 0">
                  <div class="ms-auto"></div>
                  <button @click="RegenerateContent(normal, index_normal)" class="btn btn-primary-outlined btn-generate">Re-generate</button>
                  <!-- <button class="btn btn-primary-outlined ms-2">Edit</button> -->
                </div>
              </div>

              <!-- <button
                v-if="normal.loading == false"
                class="material-icons-outlined btn-edit"
                @click="changetoEditorTitle(index_normal)"
              >
                edit_note
              </button> -->

              <!--Jasdev done: content -- add edit button-->

              <!--ignore for now-->
              <div v-if="normal.loading" class="d-flex header-content-box py-4 justify-content-center">
                <b-spinner variant="primary" label="Large Spinner"></b-spinner>
              </div>

              <!--Jasdev done: non editable content-->
              <div class="header-content-box" v-if="normal.content.length != 0">
                <vue-typed-js v-if="normal.content_editor == false && normal.new" :typeSpeed="15" :strings="[normal.content]">
                  <p class="typing"></p>
                </vue-typed-js>

                <p v-if="normal.content_editor == false && !normal.new">
                  {{ normal.content }}
                </p>

                <div v-if="normal.content_editor == true">
                  <b-form-textarea
                    :ref="'input_content_' + index_normal"
                    class="form-control-content custom-textarea-content"
                    type="text"
                    id="content"
                    v-model="normal.content"
                    rows="2"
                    max-rows="15"
                  ></b-form-textarea>
                </div>
                  <button class="material-icons-outlined btn-edit-content"  @click="changetoEditorContent(index_normal)">edit</button>
                <!-- <button class="btn btn-primary-outlined btn-edit-content" @click="changetoEditorContent(index_normal)">Edit</button> -->
              </div>
              <!--Jasdev done: editable content-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hide_steps" class="d-flex mt-4 mb-0">
      <div class="ms-auto"></div>
      <button class="btn btn-primary-outlined ms-auto" disabled>Back</button>
      <button class="btn btn-primary ms-2" disabled>Next</button>
    </div>
    <div v-else class="d-flex mt-4 mb-0">
      <div class="ms-auto"></div>
      <button class="btn btn-primary-outlined ms-auto" @click="back()">Back</button>
      <button class="btn btn-primary ms-2" v-b-modal.modal-confirm-content-planner>Next</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Automation from "@/store/Automation.js";
export default {
  data() {
    return {
      n: 1,
      faq: [],
      chosenFaq: [],
      hide_steps: false,
    };
  },

  methods: {
    changetoEditorTitle(index) {
      var arr = this.faq[index];

      if (arr.editor == false) {
        arr.editor = true;
      } else {
        arr.editor = false;
      }

      this.faq[index].splice(index, 1, arr);

      //
    },
    changetoEditorContent(index) {
      var arr = this.faq[index];

      if (arr.content_editor == false) {
        arr.content_editor = true;
        arr.new = false;
      } else {
        arr.content_editor = false;
        arr.new = false;
      }

      this.faq[index].splice(index, 1, arr);

      //
    },

    RegenerateContent(sub, index) {
      this.hide_steps = true;
      this.faq[index].content = "";
      this.faq[index].regenerate = true;
      this.faq[index].loading = true;
      this.faq[index].new = true;
      this.$toast.success("Kindly wait, your content is being generated!");
      var obj = {
        subtopic: sub.title,
      };

      Automation.contentPlanner(this.$route.params.id, obj)
        .then((response) => {
          // this.$toast.success(res.data.message + " Kindly, wait!");

          this.faq[index].content = response.data.data.generated_text;

          this.faq[index].loading = false;
          this.faq[index].new = true;
          this.hide_steps = false;
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
          this.hide_steps = false;
        });
    },
    generateContent(sub, index) {
      this.hide_steps = true;
      this.faq[index].loading = true;
      this.faq[index].regenerate = true;
      this.$toast.success("Kindly wait, your content is being generated!");
      var obj = {
        subtopic: sub.title,
      };

      console.log(this.$route.params.id);

      Automation.contentPlanner(this.$route.params.id, obj)
        .then((response) => {
          console.log(response.data.data.generated_text);

          this.faq[index].content = response.data.data.generated_text;

          this.faq[index].loading = false;
          this.faq[index].new = true;
          this.hide_steps = false;
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
          this.hide_steps = false;
        });
    },

    back() {
      this.$router.push({
        name: "ai_seo_automation_campaign_planner_steps",
        params: { step: "chooseSubtopics" },
      });
    },
    nextStep() {
      console.log(this.chosenFaq);

      var arr = JSON.parse(localStorage.content_planner_final_content);

      arr.question_list = this.chosenFaq;

      localStorage.setItem("content_planner_final_content", JSON.stringify(arr));

      // var obj = {
      //   title: this.title.value,
      //   description: this.description.value,
      //   question_list: [],
      //   subtopics: [],
      //   question_list: [],
      // };

      // localStorage.setItem(
      //   "content_planner_final_content",
      //   JSON.stringify(obj)
      // );

      this.$router.push({
        name: "ai_seo_automation_campaign_planner_steps",
        params: { step: "finalContent" },
      });
    },
  },

  created() {
    JSON.parse(localStorage.content_planner_faq).forEach((element, index) => {
      this.faq.push({
        title: element,
        content: "",
        regenerate: false,
        loading: false,
        new: true,
        type: "h2",
        editor: false,
        content_editor: false,
      });
    });

    if (JSON.parse(localStorage.content_planner_planners).length != 0) {
      JSON.parse(localStorage.content_planner_planners).forEach((element) => {
        this.faq.forEach((element_subtopic) => {
          if (element_subtopic.title == element.subtopic) {
            element_subtopic.content = element.paragraphs[0].paragraph;
            (element_subtopic.regenerate = true), (element_subtopic.new = false);
          }
        });
      });
    }

    console.log(this.faq);

    if (localStorage.content_planner_final_content != undefined && localStorage.content_planner_final_content != "undefined") {
      if (JSON.parse(localStorage.content_planner_final_content).question_list.length != 0) {
        JSON.parse(localStorage.content_planner_final_content).question_list.forEach((element) => {
          this.chosenFaq.push(element);

          console.log(element.title);

          if (!this.faq.find((element_h1) => element_h1.title === element.title)) {
            this.faq.push(element);
          }
        });
      } else {
        this.chosenFaq.push(this.faq[0]);
      }
    } else {
      this.chosenFaq.push(this.faq[0]);
    }
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
  border: 2px solid #2c8de0;
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
/* .selectcontent__checkbox {
  display: flex;
} */
.selectcontent__checkbox .btn-edit {
  z-index: 2;
  position: absolute;
  right: 10px;
  top: 15px;
  /* margin-left: 2rem; */
}

.header-content-box .btn-edit-content {
  right: 20px;
  bottom: 10px;
  color: #757575;
  margin-left: auto;
  margin-bottom: 1rem;
}

.btn-edit-content:hover {
  color: #2c8de0;
  transition: all 0.3s ease-out;
}
/* .btn-edit-content {

  margin-left: auto;
  color: #fff;
  background-color: #2c8de0;
  border-radius: 6px;
  height: 38px;
}
.btn-edit-content:hover {
  color: #ffffff;
  background-color: #0379e0;
  transition: all 0.3s ease-out;
} */

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
  color: #2c8de0;
  border-color: #2c8de0;
  transition: all 300ms ease-out;
}

input:checked ~ label:before {
  transform: translate(-50%, -50%) scale3d(56, 56, 1);
  opacity: 1;
}

input:checked ~ label:after {
  background-color: #2c8de0;
  border-color: #2c8de0;
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

.form-control {
  padding-left: 2.5rem;
  padding-top: 1rem;
  padding-bottom: 0rem;
}

.form-control-content {
  padding-left: 0.2rem;
  padding-top: 0rem;
  padding-bottom: 1rem;
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
  border: 2px solid #2c8de0;
  transition: all 0.3s ease-out;
}
.selectcontent__selectable.active .check {
  color: #2c8de0;
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
/* .btn-edit {
 
  margin-left: auto;
  color: #fff;
  background-color: #2c8de0;
  border-radius: 6px;
  height: 38px;
}
.btn-edit:hover {
  color: #ffffff;
  background-color: #0379e0;
  transition: all 0.3s ease-out;
} */

.btn-edit {
  color: #757575;
  margin-left: auto;
}
.btn-edit:hover {
  color: #2c8de0;
  transition: all 0.3s ease-out;
}

.selectcontent__checkbox .btn-generate {
  z-index: 2;
  position: absolute;
  /* right: 55px; */
  right: 15px;
  top: 10px;
  margin-left: 4rem;
}

.header-content-box {
  border: 2px solid #bcbdbc;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: -10px;
  padding: 1.5rem 1rem 0rem;
  display: flex;
  flex-direction: column;
}
.custom-textarea {
  border: 2px solid #bcbdbc;
  box-shadow: none;
}

.custom-textarea-content {
  border: none;
  box-shadow: none;
}
</style>
