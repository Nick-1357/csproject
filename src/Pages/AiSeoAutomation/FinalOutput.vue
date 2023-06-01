<template>
  <div>
    <b-modal id="modal-confirm-content-ai-seo" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Confirmation</strong>

        <div class="card-text mt-3">
          <span>Kindly, make sure all the content is selected, you will not be able to revisit this page after optimized!</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            @click="$bvModal.hide('modal-confirm-content-ai-seo')"
            class="btn btn-primary-outlined ms-auto"
          >
            Cancel
          </button>
          <button @click="updateValue" class="btn btn-primary ms-2 text-white">
            Confirm
          </button>
        </div>
      </div>
    </b-modal>

    <div class="selectcontent">
      <div class="d-flex align-items-center">
        <span class="fw-600 mb-1">Your Final Content</span>
      </div>
      <div class="d-flex align-items-center">
        <small class="text-muted mb-1"
          >Selected content will be lost if you leave this page</small
        >
      </div>

      <!-- <div class="col-3">
          <button
            style="float: right"
            class="btn btn-primary ms-2"
           v-b-modal.modal-confirm-content-ai-seo
          >
            AI SEO Automation
          </button>
        </div> 
      </div> -->
      <div class="website-content nexcard">
        <div class="row website-element">
          <div class="col-2">
            <b class="text-muted"> Title</b>
          </div>
          <div class="col">
            <b>{{ finalContent.title }}</b>
          </div>
        </div>

        <div class="row website-element">
          <div class="col-2">
            <b class="text-muted"> Description</b>
          </div>
          <div class="col">
            <b>{{ finalContent.description }}</b>
          </div>
        </div>

        <div
          v-for="(item, index) in finalContent.header1"
          :key="'subtopics' + index"
        >
          <div class="row website-element">
            <div class="col-2">
              <b class="text-muted">H1</b>
            </div>
            <div class="col">
              <h1>{{ item.title }}</h1>
            </div>
          </div>

          <div class="row website-element" v-if="item.content.length != 0">
            <div class="col-2">
              <b class="text-muted">p</b>
            </div>
            <div class="col">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in finalContent.subtopics"
          :key="'subtopics' + index"
        >
          <div class="row website-element">
            <div class="col-2">
              <b class="text-muted">H2</b>
            </div>
            <div class="col">
              <h2>{{ item.title }}</h2>
            </div>
          </div>

          <div class="row website-element" v-if="item.content.length != 0">
            <div class="col-2">
              <b class="text-muted">p</b>
            </div>
            <div class="col">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>

        <div
          v-for="(item, index) in finalContent.question_list"
          :key="'subtopics' + index"
        >
          <div class="row website-element">
            <div class="col-2">
              <b class="text-muted">H3</b>
            </div>
            <div class="col">
              <h3>{{ item.title }}</h3>
            </div>
          </div>

          <div class="row website-element" v-if="item.content.length != 0">
            <div class="col-2">
              <b class="text-muted">p</b>
            </div>
            <div class="col">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex mt-4 mb-0">
      <div class="ms-auto"></div>
      <button class="btn btn-primary-outlined ms-auto" @click="back()">
        Back
      </button>

      <button
        class="btn btn-primary ms-2"
        v-b-modal.modal-confirm-content-ai-seo
      >
        AI SEO Automation
      </button>
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
      finalContent: JSON.parse(localStorage.content_planner_final_content),
    };
  },

  methods: {
    back() {
      this.$router.push({
        name: "ai_seo_automation_campaign_planner_steps",
        params: { step: "chooseFaq" },
      });
    },

    organiseData() {
      console.log(this.finalContent);

      var content_to_send = [];
      content_to_send.push({ title: this.finalContent.title });
      content_to_send.push({ description: this.finalContent.description });

      this.finalContent.header1.forEach((element, index) => {
        var arr = {};
        var arrContent = {};
        arr["h1"] = element.title;
        content_to_send.push(arr);
        arrContent["p"] = element.content;
        content_to_send.push(arrContent);
      });

      this.finalContent.subtopics.forEach((element, index) => {
        var arr = {};
        var arrContent = {};
        arr["h2"] = element.title;
        content_to_send.push(arr);
        arrContent["p"] = element.content;
        content_to_send.push(arrContent);
      });

      this.finalContent.question_list.forEach((element, index) => {
        var arr = {};
        var arrContent = {};
        arr["h3"] = element.title;
        content_to_send.push(arr);
        arrContent["p"] = element.content;
        content_to_send.push(arrContent);
      });

      console.log(content_to_send);

      var changed = { user_data: JSON.stringify(content_to_send) };

      return changed;

      // //
    },

    updateValue() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      var changed = {};

      changed = this.organiseData();

      Automation.updateUserData(changed, this.$route.params.id)
        .then((response) => {
          this.$toast.success(response.data.message);

          var me = this;

          setTimeout(() => {
            loader.hide();

            me.$router.push({
              name: "ai_seo_automation_campaign_planner",
            });
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {},
};
</script>

<style lang="css" scoped>
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

.website-content {
  margin-top: 2rem;
}
.website-element {
  display: flex;
  margin-bottom: 1rem;
}
.btn-edit {
  color: #757575;
  margin-left: auto;
}
.btn-edit:hover {
  color: #2c8de0;
  transition: all 0.3s ease-out;
}
</style>

