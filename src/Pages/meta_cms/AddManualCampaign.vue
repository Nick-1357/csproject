<template>
  <div class="campaign__wrapper">
    <!-- Route Pathway Links -->
    <div class="route__linkpath mb-4 fw-normal">
      <p class="text-muted fw-normal">
        <router-link to="/dashboard" class="route__link">Dashboard</router-link>
        /
        <router-link
          :to="{
            name: 'project_pagination_table',
            params: { feature: 'meta_cms' },
          }"
          class="route__link"
          >CMS Editor</router-link
        >
        /
        <router-link
          :to="{
            name: 'meta_cms',
            params: { id: this.$route.params.id },
          }"
          class="route__link"
          >View All </router-link
        >/ Add Manual Editor
      </p>
    </div>

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

    <div class="nexcard">
      <div class="d-flex">
        <div class="d-flex w-100">
          <div class="w-60 d-flex">
            <div class="w-100">
              <select
                class="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                v-model="campaign.type"
              >
                <option :value="lan" :key="index" v-for="(lan, index) in types">
                  {{ lan.name }}
                </option>
              </select>
            </div>
            <div class="ms-2 w-100">
              <b-form-input
                type="text"
                autocorrect="off"
                autocomplete="off"
                id="uri"
                name="uri"
                v-model="campaign.uri"
              />
            </div>
          </div>
          <div class="w-40 d-flex">
            <div class="ms-auto">
              <button @click="save_changes" class="ms-2 btn btn-primary">
                Submit
              </button>
            </div>
            <div class="ms-2">
              <copy-to-clipboard :text="user.nexrank_script" @copy="handleCopy">
                <button class="btn btn-primary-outlined">
                  Copy CMS Editor Script
                </button>
              </copy-to-clipboard>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-md-12 col-lg-6">
        <div class="nexcard h-editor-card">
          <div class="d-flex">
            <h5>Meta Title Settings</h5>
          </div>

          <div class="card-text">
            <GrammarlyEditorPlugin>
              <b-form-textarea
                id="description"
                v-model="selected.title"
                rows="3"
                max-rows="6"
                class="h-editor"
              ></b-form-textarea>
            </GrammarlyEditorPlugin>
          </div>
        </div>

        <div class="nexcard mt-4">
          <div class="d-flex">
            <h5>H1 Settings</h5>
          </div>

          <div>
            <table class="nextable table">
              <thead>
                <tr>
                  <th class="text-start text-muted fw-600 w-10" scope="col">
                    Index
                  </th>
                  <th class="text-start text-muted fw-600 w-85" scope="col">
                    New H1
                  </th>
                  <th class="text-end text-muted fw-600 w-5" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in selected.h1">
                  <td class="w-10">
                    <b-form-input
                      autocorrect="off"
                      autocomplete="off"
                      type="text"
                      id="uri"
                      name="uri"
                      v-validate="'required'"
                      v-model="formDatah1[index]"
                      placeholder="No."
                      style="padding: 0.375rem 0.5rem"
                    />
                  </td>
                  <td class="w-85">
                    <GrammarlyEditorPlugin>
                      <quill-editor
                        v-model="h1[index]"
                        :options="options"
                      ></quill-editor>
                    </GrammarlyEditorPlugin>
                  </td>
                  <td class="w-5">
                    <button
                      v-if="isRemove || selected.h1"
                      @click="removeH1Arr(index)"
                    >
                      <span class="material-icons-outlined text-danger"
                        >clear</span
                      >
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex">
            <button
              type="line"
              class="btn btn-primary-outlined ms-auto"
              @click="addH1Arr"
            >
              Add H1
            </button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-12 col-lg-6">
        <div class="nexcard h-editor-card">
          <div class="d-flex">
            <h5>Meta Description Settings</h5>
          </div>

          <div class="card-text">
            <GrammarlyEditorPlugin>
              <b-form-textarea
                id="description"
                v-model="selected.description"
                rows="3"
                max-rows="6"
                class="h-editor"
              ></b-form-textarea>
            </GrammarlyEditorPlugin>
          </div>
        </div>

        <div class="nexcard mt-4">
          <div class="d-flex">
            <h5>H2 Settings</h5>
          </div>

          <div>
            <table class="nextable table">
              <thead>
                <tr>
                  <th class="text-start text-muted fw-600 w-10" scope="col">
                    Index
                  </th>
                  <th class="text-start text-muted fw-600 w-85" scope="col">
                    New H2
                  </th>
                  <th class="text-end text-muted fw-600 w-5" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(item, index) in selected.h2">
                  <td class="w-10">
                    <b-form-input
                      autocorrect="off"
                      autocomplete="off"
                      type="text"
                      v-model="formDatah2[index]"
                      placeholder="No."
                      style="padding: 0.375rem 0.5rem"
                    />
                  </td>
                  <td class="w-85">
                    <GrammarlyEditorPlugin>
                      <quill-editor
                        v-model="h2[index]"
                        :options="options"
                      ></quill-editor>
                    </GrammarlyEditorPlugin>
                  </td>
                  <td class="w-5 text-center">
                    <button
                      v-if="isRemove || selected.h2"
                      @click="removeH2Arr(index)"
                    >
                      <span class="material-icons-outlined text-danger"
                        >clear</span
                      >
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex">
            <button
              type="line"
              class="btn btn-primary-outlined ms-auto"
              @click="addH2Arr"
            >
              Add H2
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="nexcard mt-4">
      <div class="d-flex">
        <h5>Content Settings</h5>
      </div>

      <div class="d-flex">
        <table class="nextable table">
          <thead>
            <tr>
              <th class="text-start text-muted fw-600 w-5" scope="col">
                Index
              </th>
              <th class="text-start text-muted fw-600 w-90" scope="col">
                New Content
              </th>
              <th class="text-end text-muted fw-600 w-5" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(item, index) in selected.p">
              <td class="w-5">
                <b-form-input
                  autocorrect="off"
                  autocomplete="off"
                  type="text"
                  v-model="formDatap[index]"
                  placeholder="No."
                  style="padding: 0.375rem 0.5rem"
                />
              </td>
              <td class="w-90">
                <GrammarlyEditorPlugin>
                  <quill-editor
                    v-model="p[index]"
                    :options="optionsContent"
                  ></quill-editor>
                </GrammarlyEditorPlugin>
                <!-- 
                <input
                  type="text"
                  v-model="p[index]"
                  :options="options"
                /> -->
              </td>
              <td class="w-5">
                <button
                  v-if="isRemove || selected.p"
                  @click="removeContentArr(index)"
                >
                  <span class="material-icons-outlined text-danger">clear</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex">
        <button
          class="btn btn-primary-outlined ms-auto"
          type="line"
          @click="addContentArr"
        >
          Add Content
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-vue/v3";
import meta_cms from "@/store/meta-cms.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import CopyToClipboard from "vue-copy-to-clipboard";
export default {
  components: { CopyToClipboard, Grammarly, GrammarlyEditorPlugin },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userInfo")),
      options: {
        modules: {
          toolbar: [
            // [{ 'size': [] }],
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            // [{ 'color': [] }, { 'background': [] }],
            // [{ 'script': 'super' }, { 'script': 'sub' }],
            // [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            // [{ 'direction': 'rtl' }, { 'align': [] }],
            ["link"],
            // ['clean']
          ],
        },
      },
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

      types: [],
      clients: [],
      isRemove: false,
      submitted: false,
      thing: null,
      id: null,
      loading: false,
      selected: {
        h1: [],
        h2: [],
        p: [],
      },
      h1: [],
      h2: [],
      p: [],
      formDatah1: [],
      formDatah2: [],
      formDatap: [],
      intended_page: "",
      campaign: {
        type_id: "",
        uri: "",
        page: "",
        values: [],
        client: null,
        type: null,
      },
      inspects: {},
      toggle: true,
    };
  },

  methods: {
    toggleMenu() {
      this.toggle = !this.toggle;
      localStorage.setItem("cms_toggle", this.toggle);
    },
    addH1Arr() {
      this.selected.h1.push({});
      this.isRemove = true;
    },
    removeH1Arr(index) {
      this.selected.h1.splice(index, 1);
      this.h1.splice(index, 1);
      this.formDatah1.splice(index, 1);
    },
    back() {
      this.$router.push({
        name: "WebsiteEditorCampaigns",
        params: { id: this.$route.params.id },
      });
    },
    removeContentArr(index) {
      this.selected.p.splice(index, 1);
      this.p.splice(index, 1);
      this.formDatap.splice(index, 1);
    },
    addContentArr() {
      this.selected.p.push({});
      this.isRemove = true;
    },

    addH2Arr() {
      this.selected.h2.push({});
      this.isRemove = true;
    },
    removeH2Arr(index) {
      this.selected.h2.splice(index, 1);
      this.h2.splice(index, 1);
      this.formDatah2.splice(index, 1);
    },
    page() {
      // const url = new URL(this.campaign.page);
      // this.campaign.uri = url.pathname.substring(1);
    },
    appendTable() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      if (this.campaign.page === "") {
        // this.$vs.notify({
        //   color: "danger",
        //   title: "Empty URL",
        //   text: "The Url Must Not Be Empty To View The Data",
        // });
        // //
        loader.hide();
      } else {
        meta_cms
          .fetchInspects({
            url: this.campaign.page,
          })
          .then((response) => {
            // //
            this.inspects = response.data.data;
            this.submitted = true;
            loader.hide();
          })
          .catch((error) => {
            console.log(error);
            loader.hide();
          });

        // this.$store
        //   .dispatch("nexrank/fetchInspects", {
        //     url: this.campaign.page,
        //   })
        //   .then(() => {
        //     this.submitted = true;
        //   });
      }
    },

    handleCopy() {
      this.$toast.success("Copied");

      // this.$bvToast.toast("Copied", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    },

    save_changes() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      const values = [];
      //

      //
      //

      // //
      // //
      // //

      // //
      // //
      // //

      if (this.selected.title != undefined) {
        values.push({
          key: "title",
          value: this.selected.title,
          index: 1,
        });
        // //
        //   this.selected.title === "" || this.selected.description === ""
        // );
      }

      if (this.selected.description != undefined) {
        values.push({
          key: "description",
          value: this.selected.description,
          index: 1,
        });
        // //
        //   this.selected.title === "" || this.selected.description === ""
        // );
      }

      const h1 = Object.values(this.formDatah1);
      const h2 = Object.values(this.formDatah2);
      const p = Object.values(this.formDatap);

      var index;
      for (index = this.h1.length - 1; index >= 0; --index) {
        // //
        values.push({ key: "h1", value: this.h1[index], index: h1[index] });
      }
      for (index = this.h2.length - 1; index >= 0; --index) {
        // //
        values.push({ key: "h2", value: this.h2[index], index: h2[index] });
      }
      for (index = this.p.length - 1; index >= 0; --index) {
        // //
        values.push({ key: "p", value: this.p[index], index: p[index] });
      }

      //

      const obj = {
        client: this.$route.params.id,
        type: this.campaign.type.name,
        url: this.campaign.uri,
        elements: values,
      };

      //

      meta_cms
        .postClientRecomandations(obj)
        .then((response) => {
          this.$toast.success(response.data.message);
          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          loader.hide();
          this.$router.push({
            name: "meta_cms",
            params: { id: this.$route.params.id },
          });
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    this.campaign.uri = this.$route.params.url;

    meta_cms
      .fetchTypes()
      .then((response) => {
        //
        this.types = response.data.data;

        //
        loader.hide();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.campaign__wrapper {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
}
.expand__button {
  display: flex;
  background-color: #2c8ee1;
  color: #fff;
  border-radius: 20px;
  padding: 0.2rem 1.5rem 0.2rem 1rem;
  margin-left: 0rem;
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
.h-editor {
  height: 155px !important;
}
.h-editor-card {
  height: 222px;
}
.fw-600 {
  font-weight: 600;
}

.nextable.table thead {
  display: block;
  width: 100% !important;
}
.nextable.table tbody {
  display: block;
  width: 100% !important;
  overflow: auto;
  position: relative;
  max-height: 310px;
}
.nextable.table thead tr,
.nextable.table tbody tr {
  display: table;
  width: 100%;
}
</style>
