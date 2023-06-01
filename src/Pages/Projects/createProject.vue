<template>
  <div>
    <div class="card-body">
      <strong class="card-title">Add New Project</strong>

      <div class="card-text mt-3">
        <label for="fname">Name</label>
      </div>

      <div class="card-text mt-2">
        <b-form-input
          autocorrect="off"
          autocomplete="off"
          v-model="name"
          type="text"
          id="name"
          name="name"
          v-validate="'required'"
        ></b-form-input>

        <span class="text-danger text-sm" v-show="errors.has('name')">{{
          errors.first("name")
        }}</span>
      </div>

      <div class="card-text mt-3">
        <label>Base URL</label>
      </div>

      <div class="card-text mt-2">
        <b-form-input
          autocorrect="off"
          autocomplete="off"
          type="text"
          id="url"
          name="url"
          placeholder="ex: www.example.com"
          v-model="url"
          v-validate="'required|url'"
        ></b-form-input>

        <span class="text-danger text-sm" v-show="errors.has('url')">{{
          errors.first("url")
        }}</span>
      </div>

      <div class="card_inputgroup">
        <span class="card_inputgroup__exp">
          <span class="material-icons-outlined">help_outline</span>
          <small class="text-muted font-weight-normal"
            >'Base URL' will be used to track your keyword in Keyword Tracker
            and will be used in AI Content Generation to deploy your blog
            through wordpress</small
          >
        </span>
      </div>

      <!-- <div style="float: left" class="mt-2 ms-1 custom-control custom-switch">
        <input
          v-model="status"
          type="checkbox"
          class="custom-control-input"
          id="customSwitch1"
        />
        <label class="custom-control-label ms-2" for="customSwitch1"
          >Campaign Active?
        </label>
      </div> -->

      <div class="card-text d-flex mt-5">
        <button
          @click="$bvModal.hide('modal-center-add-domain')"
          class="btn btn-primary-outlined ms-auto"
        >
          Cancel
        </button>
        <button @click.once="submitData" class="btn btn-primary ms-2">
          Add
        </button>
      </div>
    </div>
  </div>
</template>



<script>
/* eslint-disable */

import KeywordTracker from "@/store/KeywordTracker.js";

export default {
  data() {
    return {
      name: "",
      url: "",
      status: 1,
    };
  },

  methods: {
    afterCreated() {
      this.$bvModal.hide("modal-success-seo");
    },

    submitData() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      // this.allDomain.forEach((element) => {
      //   if (this.url == element.base_url) {
      //     this.$bvToast.toast("This URL Already Exist", {
      //       title: "Warning",
      //       variant: "warning",
      //       toaster: "b-toaster-bottom-left",
      //       solid: true,
      //     });

      //     this.exists = true;
      //   }
      // });
      var obj = {};

      obj = {
        name: this.name,
        base_url: this.url,
        active: this.status ? 1 : 0,
      };
      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          KeywordTracker.addClient(obj)
            .then((response) => {
              this.$toast.success(response.data.message);

              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });

              KeywordTracker.fetchDomains()
                .then((res) => {
                  var project = [];
                  res.data.data.forEach((element) => {
                    project.push({ id: element.id, name: element.name });
                  });
                  localStorage.setItem(
                    "nexrank_client",
                    JSON.stringify(project)
                  );

                  loader.hide();

                  this.$bvModal.hide("modal-center-add-domain");

                  if (this.$route.fullPath.includes("projects")) {
                    location.reload();
                  } else {
                    this.$router.push({
                      name: "project_pagination_table",
                      params: {
                        feature: "projects",
                      },
                    });
                  }

                  this.name = "";
                  this.url = "";
                  this.status = false;
                })
                .catch((error) => {
                  loader.hide();
                  console.log(error);
                });
            })
            .catch((err) => {
              loader.hide();
              console.log(err);
            });
        }
      });
    },
  },
};
</script>
<style scoped>

.card_inputgroup__exp{
 min-width: 200px;
  font-weight: normal;
}

.card_inputgroup__exp .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}
</style>