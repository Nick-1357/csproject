<template>
  <div>
    <b-modal id="modal-center-add-optimized" centered hide-footer hide-header>
      <add-webpage />
    </b-modal>

    <b-modal
      id="modal-center-delete-optimized-old"
      centered
      hide-footer
      hide-header
    >
      <div class="card-body">
        <h6 class="card-title">Delete</h6>

        <div class="card-text">
          <span>Do you want to delete Client of id {{ deleteId }} ?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-center-delete-optimized-old')"
          >
            Cancel
          </button>
          <button class="btn btn-danger ms-2" @click="deleteValueOld()">
            Yes
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-center-delete-optimized"
      centered
      hide-footer
      hide-header
    >
      <div class="card-body">
        <h6 class="card-title">Delete</h6>

        <div class="card-text">
          <span>Do you want to delete Client of id {{ deleteId }} ?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-center-delete-optimized')"
          >
            Cancel
          </button>
          <button class="btn btn-danger ms-2" @click="deleteValue()">
            Yes
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-center-edit-website-A/B"
      centered
      hide-footer
      hide-header
    >
      <div class="card-body">
        <b class="card-title">Edit Website</b>

        <div class="card-text">
          <label for="fname">Variant</label>
        </div>

        <div class="card-text">
          <b-form-radio-group
            id="radio-group-3"
            v-model="editVariant"
            :options="variantsType"
            name="radio-options-3"
            class="b-form-radio-buttons"
            button-variant="primary"
            buttons
          ></b-form-radio-group>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-center-edit-website-A/B')"
          >
            Cancel
          </button>
          <button class="btn btn-primary ms-2" @click="editAB()">Edit</button>
        </div>
      </div>
    </b-modal>

    <b-modal
      size="lg"
      id="modal-center-splitChoose"
      centered
      hide-footer
      hide-header
    >
      <div class="card-body">
        <b>Choose Stable Variant</b>

        <div class="row">
          <div class="col-6">
            <div @click="selectCard('A')" class="card p-2">
              <div class="row">
                <div class="col">
                  <span>
                    <b-form-radio
                      v-model="variantStable"
                      value="A"
                      style="display: inline"
                      name="radio"
                    >
                    </b-form-radio
                    >Variant A</span
                  >
                </div>
              </div>

              <div
                class="row"
                :key="indextr"
                v-for="(item, indextr) in splitChoose['A']"
              >
                <div class="col">
                  <div class="row">
                    <div class="col-6">
                      <b>{{ indextr | variant }}</b>
                    </div>
                    <div class="col-6">
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div @click="selectCard('B')" class="card p-2">
              <div class="row">
                <div class="col">
                  <span>
                    <b-form-radio
                      v-model="variantStable"
                      value="B"
                      style="display: inline"
                      name="radio"
                    >
                    </b-form-radio
                    >Variant B</span
                  >
                </div>
              </div>

              <div
                class="row"
                :key="indextr"
                v-for="(item, indextr) in splitChoose['B']"
              >
                <div class="col">
                  <div class="row">
                    <div class="col-6">
                      <b>{{ indextr | variant }}</b>
                    </div>
                    <div class="col-6">
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-center-splitChoose')"
          >
            Cancel
          </button>
          <button class="btn btn-primary ms-2" @click="ChooseVariant">
            Choose
          </button>
        </div>
      </div>
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>

          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
          /
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.id },
            }"
            class="route__link"
            >Project</router-link
          >
          /CMS Editor
        </p>

        <p class="text-muted fw-normal" v-else>
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
          /
          <router-link
            :to="{
              name: 'project_pagination_table',
              params: { feature: 'meta_cms' },
            }"
            class="route__link"
            >CMS Editor</router-link
          >
          / View All
        </p>
      </div>

      <!-- nexwriter script-->

      <div class="nexcard mb-4">
        <div class="d-flex">
          <h5 class="text-darkgreen fw-bold">Meta-CMS Script</h5>
        </div>
        <div class="d-flex">
          <p class="text-secondary">
            Please copy the script and paste at the header of your website.
          </p>
        </div>
        <div class="d-flex py-2">
          <div class="card p-2 me-3">
            <span class="text-muted">
              {{ user.nexrank_script }}
            </span>
          </div>
          <div>
            <copy-to-clipboard :text="user.nexrank_script" @copy="handleCopy">
              <button class="btn btn-primary-outlined" style="width: 127px">
                <span class="material-icons-outlined"> content_copy </span
                ><br />
                <span>Copy Script</span>
              </button>
            </copy-to-clipboard>
          </div>
        </div>
      </div>

      <div class="nexcard">
        <!--Search and Add Content button -->
        <div class="d-flex mb-4">
          <div>
            <div class="search input-group" style="">
              <span class="input-group-prepend">
                <div class="input-group-text bg-transparent">
                  <span class="material-icons-outlined">search</span>
                </div>
              </span>
              <input
                type="search"
                id="form1"
                class="form-control border-left-0"
                placeholder="Search"
                v-model="search_keyword"
                @input="searchKeyword"
                autocorrect="off"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="ms-auto">
            <button
              v-b-modal.modal-center-add-optimized
              class="btn btn-primary"
            >
              Add Webpage
            </button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1"><p>ID</p></div>
            <div class="col-5"><p>URI</p></div>
            <div class="col-1"><p>Type</p></div>
            <div class="col"><p>Campaign Type</p></div>
            <div class="col action"><p>Action</p></div>
          </div>

          <div class="nextable__body__collection">
            <div
              class="row nextable__body g-0"
              v-for="(item, indextr) in keyword_list"
              :key="'keyword_list' + indextr"
            >
              <div class="col-1">
                <p>{{ item.id }}</p>
              </div>

              <div class="col-5">
                <p v-if="item.uri != undefined">{{ item.uri }}</p>
                <p>{{ item.url }}</p>
              </div>
              <div class="col-1 date">
                <p>{{ item.type }}</p>
              </div>
              <div class="col date">
                <p>{{ item.campaign_type }}</p>
              </div>
              <div class="col action">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined"
                      >more_horiz</span
                    >
                  </button>
                  <div class="action-menu-dropdown">
                    <span
                      class="star"
                      @click="splitData(item)"
                      v-if="item.campaign_type == 'A/B'"
                      ><span class="material-icons-outlined">call_split</span
                      >A/B</span
                    >

                    <span
                      class="edit"
                      @click="update(item.id)"
                      v-if="
                        permissions.includes(
                          'Clients.Recommendation-Campaign.update'
                        ) && item.uri != undefined
                      "
                      ><span class="material-icons-outlined">edit</span
                      >Edit</span
                    >

                    <span
                      class="edit"
                      @click="editWebsite(item)"
                      v-if="
                        permissions.includes(
                          'Clients.Recommendation-Campaign.update'
                        ) && item.uri == undefined
                      "
                      ><span class="material-icons-outlined">edit</span
                      >Edit</span
                    >

                    <span
                      @click="deleteDataOld(item.id)"
                      v-if="
                        permissions.includes(
                          'Clients.Recommendation-Campaign.destroy'
                        ) && item.uri != undefined
                      "
                      class="delete"
                      ><span class="material-icons-outlined">delete</span
                      >Delete</span
                    >

                    <span
                      @click="deleteData(item.id)"
                      v-if="
                        permissions.includes(
                          'Clients.Recommendation-Campaign.destroy'
                        ) && item.uri == undefined
                      "
                      class="delete"
                      ><span class="material-icons-outlined">delete</span
                      >Delete</span
                    >
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
import CopyToClipboard from "vue-copy-to-clipboard";
import KeywordTracker from "@/store/KeywordTracker.js";
import meta_cms from "@/store/meta-cms.js";
import addWebpage from "./addWebpage.vue";
export default {
  name: "content_image_view_all",
  components: { addWebpage, CopyToClipboard },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userInfo")),
      keyword_list: [],
      allKeyword_list: [],
      allKeyword: [],
      permissions: JSON.parse(localStorage.permissions),
      keywordTimeout: null,
      search_keyword: "",
      allKeyword_list: [],
      variantsType: ["A", "B"],
      variant: "A",
      editVariant: "A",
      abEdit: [],
      splitChoose: [],
      variantStable: "",
      splitId: "",
    };
  },
  methods: {
    update(item) {
      //route
      this.$router.push({
        name: "meta_cms_editor",
        params: { url_id: item },
      });
    },
    cancelModel() {
      this.dataId = "";
      this.keyword = "";
      this.$bvModal.hide("modal-center-add-keyword");
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

    editAB() {
      this.$bvModal.hide("modal-center-edit-website-A/B");
      var env = "";

      if (location.href.includes("www.platform.nexmind.ai")) {
        env = "prod";
      } else {
        env = "uat";
      }

      var site =
        this.abEdit.url +
        `?nexmind_token=` +
        localStorage.accessToken +
        `&client_id=` +
        this.$route.params.id +
        `&nexmind_editor_variant=` +
        this.editVariant +
        `&nexmind_editor_campaign_type=AB` +
        `&optimize_id=` +
        this.abEdit.id +
        `&show_editor=true` +
        `&en=` +
        env;
      //
      window.open(site, "_blank");
    },

    editWebsite(data) {
      if (data.type == "xpath") {
        if (data.campaign_type == "single") {
          var env = "";

          if (location.href.includes("www.platform.nexmind.ai")) {
            env = "prod";
          } else {
            env = "uat";
          }

          // //
          var site =
            data.url +
            `?nexmind_token=` +
            localStorage.accessToken +
            `&client_id=` +
            this.$route.params.id +
            `&nexmind_editor_campaign_type=single` +
            `&optimize_id=` +
            data.id +
            `&show_editor=true` +
            `&en=` +
            env;
          //
          window.open(site, "_blank");
        } else {
          this.abEdit = data;

          this.$bvModal.show("modal-center-edit-website-A/B");
        }
      } else {
        //route

        this.$router.push({
          name: "meta_cms_editor_new",
          params: { url_id: data.id },
        });
      }
    },

    deleteData(data) {
      this.deleteId = data;
      this.$bvModal.show("modal-center-delete-optimized");
    },

    deleteValue() {
      const obj = {
        client_id: this.$route.params.id,
        id: this.deleteId,
      };

      meta_cms
        .removeClientRecommendation(obj)
        .then((response) => {
          this.$toast.success(response.data.message);
          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-delete-optimized");
          meta_cms
            .fetchRecommendations(this.$route.params.id)
            .then((response) => {
              //
              this.keyword_list = [...response.data.data].reverse();
              this.allKeyword_list = [...response.data.data].reverse();

              KeywordTracker.fetchRecommendations(this.$route.params.id)
                .then((response) => {
                  //
                  response.data.data.forEach((element) => {
                    this.keyword_list.push(element);
                    this.allKeyword_list.push(element);
                  });

                  this.pageAlter(this.allKeyword_list);

                  if (this.allKeyword_list.length % 5 == 0) {
                    this.fullPage = this.allKeyword_list.length / 5;
                  } else {
                    this.fullPage =
                      Math.floor(this.allKeyword_list.length / 5) + 1;
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
          // this.$vs.notify({
          //   color: "danger",
          //   title: "Campaign Error",
          //   text: err.response.data.message,
          // })
        });
    },

    deleteDataOld(data) {
      this.deleteId = data;
      this.$bvModal.show("modal-center-delete-optimized-old");
    },
    splitData(data) {
      this.splitChoose = data.metrics;
      this.splitId = data.id;
      this.$bvModal.show("modal-center-splitChoose");
    },

    ChooseVariant() {
      var obj = {
        client: this.$route.params.id,
        website_page: this.splitId,
        variant: this.variantStable,
      };

      //

      meta_cms
        .assignStable(obj)
        .then((response) => {
          this.$bvModal.hide("modal-center-splitChoose");

          meta_cms
            .fetchRecommendations(this.$route.params.id)
            .then((response) => {
              //
              this.keyword_list = [...response.data.data].reverse();
              this.allKeyword_list = [...response.data.data].reverse();

              KeywordTracker.fetchRecommendations(this.$route.params.id)
                .then((response) => {
                  //
                  response.data.data.forEach((element) => {
                    this.keyword_list.push(element);
                    this.allKeyword_list.push(element);
                  });

                  this.pageAlter(this.allKeyword_list);

                  if (this.allKeyword_list.length % 5 == 0) {
                    this.fullPage = this.allKeyword_list.length / 5;
                  } else {
                    this.fullPage =
                      Math.floor(this.allKeyword_list.length / 5) + 1;
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    selectCard(data) {
      this.variantStable = data;
    },

    deleteValueOld() {
      const obj = {
        client_id: this.$route.params.id,
        id: this.deleteId,
      };

      KeywordTracker.removeClientRecommendation(obj)
        .then((response) => {
          this.$toast.success(response.data.message);
          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-delete-optimized-old");

          meta_cms
            .fetchRecommendations(this.$route.params.id)
            .then((response) => {
              //
              this.keyword_list = [...response.data.data].reverse();
              this.allKeyword_list = [...response.data.data].reverse();

              KeywordTracker.fetchRecommendations(this.$route.params.id)
                .then((response) => {
                  //
                  response.data.data.forEach((element) => {
                    this.keyword_list.push(element);
                    this.allKeyword_list.push(element);
                  });

                  this.pageAlter(this.allKeyword_list);

                  if (this.allKeyword_list.length % 5 == 0) {
                    this.fullPage = this.allKeyword_list.length / 5;
                  } else {
                    this.fullPage =
                      Math.floor(this.allKeyword_list.length / 5) + 1;
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
          // this.$vs.notify({
          //   color: "danger",
          //   title: "Campaign Error",
          //   text: err.response.data.message,
          // })
        });
    },

    searchKeyword() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities();
      }, 500);
    },

    getActivities() {
      this.search_keyword = this.search_keyword.toLowerCase();

      if (this.search_keyword == null || this.search_keyword == "") {
        this.keyword_list = this.allKeyword;
      } else {
        this.keyword_list = [];
        this.allKeyword_list = [];

        this.allKeyword.forEach((element) => {
          if (element.uri.toLowerCase().search(this.search_keyword) >= 0) {
            this.allKeyword_list.push(element);
          }
        });

        this.keyword_list = this.allKeyword_list;
      }
    },
  },
  created() {
    localStorage.removeItem("nexmind_live_editor_to_get");
    localStorage.removeItem("nexmind_live_editor_title");
    localStorage.removeItem("nexmind_live_editor_description");
    localStorage.removeItem("nexmind_live_editor_save_changes");
    localStorage.removeItem("nexmind_live_editor_variant");
    localStorage.removeItem("nexmind_live_editor_editor");
    localStorage.removeItem("nexmind_live_editor_to_pass");

    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    meta_cms
      .fetchRecommendations(this.$route.params.id)
      .then((response) => {
        loader.hide();

        //
        this.keyword_list = [...response.data.data].reverse();
        this.allKeyword_list = [...response.data.data].reverse();
        this.allKeyword = [...response.data.data].reverse();

        KeywordTracker.fetchRecommendations(this.$route.params.id)
          .then((response) => {
            loader.hide();
            response.data.data.forEach((element) => {
              this.keyword_list.push(element);
              this.allKeyword_list.push(element);
              this.allKeyword.push(element);
            });
          })
          .catch((error) => {
            loader.hide();
            console.log(error);
          });
      })
      .catch((error) => {
        loader.hide();
        console.log(error);
      });
  },
};
</script>
<style lang="css" scoped>
.view-all-table-wrapper {
  position: relative;
  max-width: calc(1600px + 3rem);
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.nextable {
  flex-direction: column;
}

.nextable .nextable__head {
  border-bottom: 1px solid #e6e6e6;
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  position: relative;
  min-height: 40vh;
}

.nextable .nextable__body {
  border-bottom: 1px solid #e6e6e6;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body__collection {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body__collection {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body__collection {
    height: 53vh;
  }
}
.nextable .nextable__head {
  /* scroll-bar width */
  margin-right: 8px;
}
.nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2,
.nextable .nextable__head .col-3,
.nextable .nextable__head .col-4,
.nextable .nextable__head .col-5,
.nextable .nextable__head .col-6 {
  padding: 1rem;
  font-weight: bold;
  /* border: 1px solid black; */
}
.nextable .nextable__head .col.profile {
  text-align: end;
  max-width: 100px;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2,
.nextable .nextable__body .col-3,
.nextable .nextable__body .col-4,
.nextable .nextable__body .col-5,
.nextable .nextable__body .col-6 {
  padding: 1rem;
  align-items: center;
  display: flex;
  /* border: 1px solid black; */
}
.nextable .nextable__body .col.profile {
  text-align: end;
  max-width: 100px;
  justify-content: end;
}
.nextable .nextable__body .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
.nextable .nextable__body .col:last-child {
  text-align: center;
  max-width: 100px;
}
p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.col.campaign {
  display: flex;
  flex-direction: column;
  align-items: start !important;
}
.profile img {
  max-height: 35px;
  margin-top: 5px;
}
.date p {
  font-weight: normal;
}

.btn-action {
  color: #707070;
  margin: 0 auto;
  border-radius: 50%;
  padding: 2px;
}
.btn-action:hover {
  background-color: var(--color-primary-light);
  border-radius: 50%;
  transition: all 0.3s ease-out;
}
.status {
  display: flex;
}

.status .col {
  padding: 0.2rem 0.9rem !important;
}
.status__icon {
  max-height: 18px;
  margin-top: 2px;
  margin-left: 0px;
}
.status__text {
  font-weight: normal;
  color: #707070;
  margin-left: 0.4rem;
  text-transform: capitalize;
}
.profile__icon {
  margin-left: auto;
}

/* action menu css */
.action-menu-dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  text-align: left;
  transform: translate(-80px, -10px);
  width: 120px;
  color: #272727;
}
.action-menu:hover .action-menu-dropdown {
  display: flex;
}
.action-menu-dropdown span {
  cursor: pointer;
  user-select: none;
  padding: 0.1rem 0.5rem 0.1rem 0.2rem;
  margin: 0.1rem 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #707070;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
  color: #707070;
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;
}
.action-menu-dropdown span:hover.edit {
  transition: all 0.2s ease-out;
}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;
}
.action-menu-dropdown span:hover.delete {
  transition: all 0.2s ease-out;
}
</style>
