<template>
  <div>
    <b-modal id="modal-center-add-policy" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Add New Policy</strong>

        <div class="card-text mt-2">
          <label for="fname">Policy Name</label>
        </div>

        <div class="card-text mt-3">
          <b-form-input autocorrect="off" autocomplete="off" v-model="name" type="text" id="name" name="name" />
        </div>

        <div class="card-text mt-2">
          <label for="fname">Description</label>
        </div>

        <div class="card-text mt-3">
          <b-form-textarea id="description" v-model="description" rows="3" max-rows="6"></b-form-textarea>
        </div>

        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-add-policy')">Cancel</button>
          <button class="btn btn-primary ms-2" @click="addPolicy">Add</button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-center-delete-policy" centered hide-footer hide-header>
      <div class="card-body">
        <h6 class="card-title">Delete</h6>

        <div class="card-text mt-3">
          <span>Do you want to delete Policy of id {{ deleteId }} ?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-delete-policy')">Cancel</button>
          <button @click="deleteValue" class="btn btn-red ms-2 text-white">Yes</button>
        </div>
      </div>
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / Policies
        </p>
      </div>
      <div class="nexcard">
        <!--Search and Add Content button -->
        <div class="d-flex mb-4">
          <div>
            <div class="search input-group">
              <span class="input-group-prepend">
                <div class="input-group-text bg-transparent">
                  <span class="material-icons-outlined">search</span>
                </div>
              </span>
              <input type="search" id="form1" class="form-control border-left-0" placeholder="Search" autocorrect="off" autocomplete="off" @input="searchWord" v-model="search_word" />
            </div>
          </div>
          <div class="ms-auto">
            <button v-b-modal.modal-center-add-policy class="btn btn-primary">Add Policy</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col"><p>Policy Name</p></div>
            <div class="col"><p>Description</p></div>
            <div class="col action"><p>Action</p></div>
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(item, index) in Policies" :key="'employees' + index">
              <div class="col">
                <p>{{ item.name }}</p>
              </div>
              <div class="col">
                <p>{{ item.description }}</p>
              </div>

              <div class="col action" v-if="item.Editable">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
                    <span @click="editPolicy(item.id)" class="edit"><span class="material-icons-outlined">edit</span>Edit</span>
                    <span @click="deletePolicy(item.id)" class="delete"><span class="material-icons-outlined">delete</span>Delete</span>
                  </div>
                </div>
              </div>

              <div v-else class="col action">
                <p class="text-warning">Disabled</p>
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
import Settings from "@/store/Settings.js";
import Auth from "@/store/Auth.js";
export default {
  data() {
    return {
      permissions: [],
      showModal: false,
      Policies: [],
      search_word: "",
      filterPolicies: [],
      allpolicies: [],
      deleteId: null,
      name: "",
      description: "",
    };
  },
  methods: {
    editPolicy(data) {
      // //
      this.$router.push({ name: "edit_policy", params: { id: data } });
    },
    searchWord() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities(1);
      }, 500);
    },

    getActivities() {
      // //
      this.search_word = this.search_word.toLowerCase();

      if (this.search_word == null) {
        // //
        this.Policies = this.allpolicies;
      } else {
        // //

        // //

        while (this.filterPolicies.length > 0) {
          this.filterPolicies.pop();
        }

        this.allpolicies.forEach((element) => {
          if (element.name.toLowerCase().search(this.search_word) >= 0) {
            // //

            this.filterPolicies.push(element);
          }
        });

        this.Policies = this.filterPolicies;
        // //
      }
    },

    addPolicy() {
      Settings.addPolicy({ name: this.name, description: this.description })
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          Settings.fetchPolicies()
            .then((response) => {
              // //
              this.Policies = response.data.data;
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

      this.$bvModal.hide("modal-center-add-policy");
    },

    deletePolicy(data) {
      this.deleteId = data;
      this.$bvModal.show("modal-center-delete-policy");
    },

    deleteValue() {
      Settings.removePolicy(this.deleteId)
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-delete-policy");
          Settings.fetchPolicies()
            .then((response) => {
              // //
              this.Policies = response.data.data;
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
  },

  created() {
   let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
        this.permissions = JSON.parse(localStorage.userInfo).permissions;
    
    Settings.fetchPolicies()
      .then((response) => {
        loader.hide();
        // //
        this.allpolicies = response.data.data;
        this.Policies = response.data.data;
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
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  position: relative;
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
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #e8e8e8;
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
.nextable .nextable__body .col {
  padding: 1rem;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
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
  /* font-weight: 600; */
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
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;
  color: #ff9800;
}
.action-menu-dropdown span:hover.edit {
  transition: all 0.2s ease-out;
  color: #4caf50;
}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;
  color: #2d8fe2;
}

.action-menu-dropdown span:hover.delete {
  transition: all 0.2s ease-out;
  color: #d30000;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
