<template>
  <div>
    <b-modal id="modal-center-add-domain" centered hide-footer hide-header>
      <create-project />
    </b-modal>

    <b-modal id="modal-center-edit-domain" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Edit Project</strong>

        <div class="card-text mt-3">
          <label for="fname">Name</label>
        </div>

        <div class="card-text mt-2">
          <b-form-input autocorrect="off" autocomplete="off" v-model="EditName" type="text" id="name" name="name" v-validate="'required'"></b-form-input>

          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>
        </div>

        <div class="card-text mt-3">
          <label for="fname">Base URL</label>
        </div>

        <div class="card-text mt-2">
          <b-form-input autocorrect="off" autocomplete="off" type="text" id="url" name="url" v-model="EditUrl" v-validate="'required|url'"></b-form-input>

          <span class="text-danger text-sm" v-show="errors.has('url')">{{ errors.first("url") }}</span>
        </div>

        <div style="float: left" class="mt-2 ms-1 custom-control custom-switch">
          <input v-model="EditStatus" type="checkbox" class="custom-control-input" id="customSwitch1" />
          <label class="custom-control-label ms-2" for="customSwitch1">Campaign Active? </label>
        </div>

        <div class="card-text d-flex mt-5">
          <button @click="$bvModal.hide('modal-center-edit-domain')" class="btn btn-primary-outlined ms-auto">Cancel</button>
          <button @click.once="editData" class="btn btn-primary ms-2">Edit</button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-center-delete" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Delete</strong>

        <div class="card-text mt-3">
          <span>Do you want to delete Project of id {{ deleteId }} ?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button @click="$bvModal.hide('modal-center-delete')" class="btn btn-primary-outlined ms-auto">Cancel</button>
          <button @click.once="deleteValue" class="btn btn-red ms-2 text-white">Delete</button>
        </div>
      </div>
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-3 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          {{ MainTool.title }}
        </p>
      </div>
      <div class="nexcard">
        <!--Search and Add Content button -->
        <div class="d-flex mb-4">
          <div>
            <div class="search input-group" style="width: 500px">
              <span class="input-group-prepend">
                <div class="input-group-text bg-transparent">
                  <span class="material-icons-outlined">search</span>
                </div>
              </span>
              <input
                type="search"
                id="form1"
                class="form-control border-left-0"
                placeholder="Search Name"
                autocorrect="off"
                autocomplete="off"
                @input="searchKeyword"
                v-model="search_keyword"
              />
            </div>
          </div>
          <div class="ms-auto">
            <button class="btn btn-primary" v-b-modal.modal-center-add-domain>Add Project</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col"><p>Project Name</p></div>
            <div class="col"><p>Base URL</p></div>
            <div class="col"><p>Created By</p></div>
            <div class="col action"><p>Action</p></div>
          </div>


            <div v-if="loading" class="d-flex justify-content-center mt-5 mb-3">
              <b-spinner variant="primary" label="Large Spinner"></b-spinner>
            </div>

          <div class="nextable__body" v-infinite-scroll="addData" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
            <div class="row nextable__row g-0" v-for="(item, index) in showContent" :key="'showContent' + index">
              <div class="col">
                <p>{{ item.name }}</p>
              </div>
              <div class="col date">
                <p>{{ item.base_url }}</p>
              </div>
              <div class="col date">
                <p>{{ item.creator }}</p>
              </div>
              <div class="col action">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
                    <span class="open" @click="select(item.id)"><span class="material-icons-outlined">file_open</span>Open</span>

                    <span @click="edit(item)" class="edit"><span class="material-icons-outlined">edit</span>Edit</span>
                    <span @click="deleteData(item.id)" class="delete"><span class="material-icons-outlined">delete</span>Delete</span>
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
import createProject from "@/Pages/Projects/createProject.vue";

import KeywordTracker from "@/store/KeywordTracker.js";
export default {
  name: "project_view_all",
  components: {
    createProject,
  },
  data() {
    return {
      page: 0,
      MainTool: [],
      showContent: [],
      allContent: [],
      contents: [],
      showContent: [],
      pageList: [],
      filterContent: [],
      search_keyword: "",
      keywordTimeout: null,
      EditName: "",
      EditUrl: "",
      EditStatus: "",
      EditId: "",
      name: "",
      url: "",
      status: "",
      deleteId: "",
      loading: true,
    };
  },
  watch: {
    // $route() {
    //   this.MainTool = [];
    //   this.showContent = [];
    //   this.allContent = [];
    //   this.contents = [];
    //   this.showContent = [];
    //   this.pageList = [];
    //   this.page = 0;
    //   this.filterContent = [];
    //   this.search_keyword = "";
    //   this.assignTable();
    //   this.fetchContentData();
    // },
  },
  methods: {
    select(data) {
      if (this.$route.fullPath.includes("keyword_tracker")) {
        this.$router.push({
          name: "keyword_tracker",
          params: {
            id: data,
          },
        });
      } else if (this.$route.fullPath.includes("projects")) {
        this.$router.push({
          name: "projects",
          params: {
            id: data,
          },
        });
      } else if (this.$route.fullPath.includes("meta_cms")) {
        this.$router.push({
          name: "meta_cms",
          params: {
            id: data,
          },
        });
      }
    },
    edit(data) {
      // //
      (this.EditName = data.name), (this.EditUrl = data.base_url), (this.EditStatus = data.active);
      this.EditId = data.id;
      this.$bvModal.show("modal-center-edit-domain");
    },
    editData() {
      // //

      const obj = {
        id: this.EditId,
        name: this.EditName,
        base_url: this.EditUrl,
        active: this.EditStatus ? 1 : 0,
      };
      // //

      this.$validator.validateAll().then((result) => {
        if (result) {
          KeywordTracker.updateClient(obj)
            .then((response) => {
              this.$toast.success(response.data.message);

              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });
              this.$bvModal.hide("modal-center-edit-domain");
              this.name = "";
              this.url = "";
              this.status = false;

              this.fetchContentData();
              KeywordTracker.fetchDomains()
                .then((res) => {
                  var project = [];
                  res.data.data.forEach((element) => {
                    project.push({ id: element.id, name: element.name });
                  });
                  localStorage.setItem("nexrank_client", JSON.stringify(project));
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    deleteData(data) {
      this.deleteId = data;
      this.$bvModal.show("modal-center-delete");
    },
    deleteValue() {
      KeywordTracker.removeItem(this.deleteId)
        .then((response) => {
          this.$toast.success(response.data.message);
          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-delete");
          this.fetchContentData();

          KeywordTracker.fetchDomains()
            .then((res) => {
              var project = [];
              res.data.data.forEach((element) => {
                project.push({ id: element.id, name: element.name });
              });
              localStorage.setItem("nexrank_client", JSON.stringify(project));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addData() {
      this.page = this.page + 1;

      let currentList = this.pageList.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10);

      currentList.forEach((element) => {
        this.showContent.push(element);
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

      if (this.search_keyword == null || this.search_keyword.length == 0) {
        this.contents = this.allContent;
        this.showContent = this.contents.slice(0, 10);
        this.pageList = this.contents;
        this.page = 1;
      } else {
        while (this.filterContent.length > 0) {
          this.filterContent.pop();
        }

        this.allContent.forEach((element) => {
          if (element.name.toLowerCase().search(this.search_keyword) >= 0) {
            this.filterContent.push(element);
          }
        });

        this.contents = this.filterContent;
        this.showContent = this.contents.slice(0, 10);
        this.pageList = this.contents;
        this.page = 1;
        // //
      }
    },

    fetchContentData() {
 

      KeywordTracker.fetchDomains()
        .then((response) => {
          this.loading = false;
          this.allContent = response.data.data;
          this.contents = response.data.data;

          this.showContent = this.contents.slice(0, 10);
          this.pageList = this.contents;
        })
        .catch((error) => {
          console.log(error);
         this.loading = false;
        });
    },

    assignTable() {
      if (this.$route.fullPath.includes("keyword_tracker")) {
        this.MainTool = {
          title: "Keyword Tracker",
        };
      } else if (this.$route.fullPath.includes("projects")) {
        this.MainTool = {
          title: "Projects",
        };
      } else if (this.$route.fullPath.includes("meta_cms")) {
        this.MainTool = {
          title: "CMS Editor",
        };
      }
    },
  },
  created() {
    this.assignTable();
    this.fetchContentData();
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
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body {
  overflow-y: scroll;
  position: relative;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body {
    height: 55vh;
  }
}
.nextable .nextable__head {
  margin-right: 8px;
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
  background-color: #fff;
  white-space: nowrap;
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
.nextable .nextable__row {
  border-bottom: 1px solid #e6e6e6;
  transition: 0.4s ease-out;
}
.nextable .nextable__row:hover {
  background-color: #f5f5f7;
  cursor: pointer;
  transition: 0.4s ease-out;
}
.nextable .nextable__row .col {
  padding: 1rem;
  align-items: start;
  display: flex;
}
.nextable .nextable__row .col.no-bb {
  border-bottom: none;
}
.nextable .nextable__row .col.profile {
  text-align: end;
  max-width: 100px;
  justify-content: end;
}
.nextable .nextable__row .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
/* .nextable .nextable__row .col:last-child {
  text-align: center;
  max-width: 100px;
} */
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
  z-index: 10;
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
  color:#707070;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
  color:#707070
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;
  color: grey;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;

}
.action-menu-dropdown span:hover.edit,
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;

}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;

}
.action-menu-dropdown span:hover.folder {
  transition: all 0.2s ease-out;

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

.input-group-text .material-icons-outlined {
  color:#707070
}
</style>
