<template>
  <div>
    <b-modal id="modal-center-add-employee" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Add New Client</strong>

        <div class="card-text mt-2">
          <label class="text-muted mb-2" for="fname">Full Name</label>
        </div>

        <div class="card-text">
          <b-form-input autocorrect="off" autocomplete="off" v-model="name" type="text" id="name" name="name" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>
        </div>

        <div class="card-text">
          <label class="text-muted mb-2" for="fname">Email</label>
        </div>

        <div class="card-text">
          <b-form-input autocorrect="off" autocomplete="off" type="text" id="email" name="email" v-model="email" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>
        </div>

        <div class="card-text">
          <label class="text-muted mb-2" for="fname">Password </label>
        </div>

        <div class="card-text">
          <b-form-input autocorrect="off" autocomplete="off" v-model="password" type="password" id="password" name="password" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first("password") }}</span>
        </div>

        <div class="card-text">
          <label class="text-muted mb-2" for="fname">Password Confirmation </label>
        </div>

        <div class="card-text">
          <b-form-input autocorrect="off" autocomplete="off" v-model="password_Confirmation" type="password" id="password_Confirmation" name="password_Confirmation" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('password_Confirmation')">{{ errors.first("password_Confirmation") }}</span>
        </div>

        <div class="card-text">
          <label class="text-muted mb-2" for="fname">Choose your Project </label>
        </div>

        <div class="card-text">
          <div class="input-group">
            <select
              class="form-select"
              id="inputGroupSelect04"
              aria-label="Example select with button addon"
              v-model="chosenClient"
              v-validate="'required'"
              name="Project"
              @change="choseClient(chosenClient)"
            >
              <option :value="lan.id" :key="index" v-for="(lan, index) in submitClients">
                {{ lan.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <ul style="margin-left: -2vw">
              <li style="display: inline; margin-left: 0vw" :key="index" v-for="(lan, index) in showClients">
                <span @click="remove(index)" variant="secondary">
                  {{ lan.name }}
                  <x-icon size="1x" class="custom-class"></x-icon>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-add-employee')">Cancel</button>
          <button class="btn btn-primary ms-2" @click="addEmployee">Add</button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-center-edit-role" centered hide-footer hide-header>
      <strong class="card-title">Edit Project</strong>

      <div class="card-text mt-3">
        <label class="text-muted mb-2" for="fname">Full Name</label>
      </div>

      <div class="card-text">
        <b-form-input autocorrect="off" autocomplete="off" v-model="editData.name" type="text" id="name" name="name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>
      </div>

      <div class="card-text">
        <label class="text-muted mb-2" for="fname">Email</label>
      </div>

      <div class="card-text">
        <b-form-input autocorrect="off" autocomplete="off" type="text" id="email" name="email" v-model="editData.email" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>
      </div>

      <div class="card-text">
        <label class="text-muted mb-2" for="fname">Choose your Project </label>
      </div>

      <div class="card-text">
        <div class="input-group">
          <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="chosenClient_edit" name="Project" @change="choseClient_edit(chosenClient_edit)">
            <option :value="lan" :key="index" v-for="(lan, index) in submitClients">
              {{ lan.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <ul style="margin-left: -2vw">
            <li style="display: inline; margin-left: 0vw" :key="index" v-for="(lan, index) in editData_clientName">
              <span @click="remove_edit(index)" style="font-size: 13px; cursor: pointer; opacity: 0.7" variant="secondary">
                {{ lan.name }}
                <x-icon size="1x" class="custom-class"></x-icon>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card-text d-flex mt-3">
        <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-edit-role')">Cancel</button>
        <button class="btn btn-primary ms-2" @click="editValue">Edit</button>
      </div>
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / My clients
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
            <button v-b-modal.modal-center-add-employee class="btn btn-primary">Add Clients</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1"><p>Status</p></div>
            <div class="col-3"><p>Full Name</p></div>
            <div class="col-3"><p>Email</p></div>
            <div class="col-4"><p>Assigned Clients</p></div>
            <div class="col-1 action"><p>Action</p></div>
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(item, index) in Employees" :key="'employees' + index">
              <div class="col-1">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="activeSwitch" @change="changeStatus(item)" v-model="item.statusActive" />
                  <label class="form-check-label" for="activeSwitch">
                    <span v-if="item.statusActive" class="text-success">Active</span>
                    <span v-else class="text-danger">Inactive</span>
                  </label>
                </div>

                <!-- <b-form-checkbox
                  @change="changeStatus(item)"
                  v-model="item.statusActive"
                  switch
                  ><span v-if="item.statusActive" class="ms-2 text-success">Active</span
                  ><span v-else class="ms-2 text-danger">Inactive</span>
                </b-form-checkbox> -->
              </div>
              <div class="col-3">
                <p>{{ item.name }}</p>
              </div>
              <div class="col-3">
                <p>{{ item.email }}</p>
              </div>

              <div class="col-4 ps-0">
                <div v-if="item.clients.length != 0">
                  <ul class="policy">
                    <li style="list-style-type=none" v-for="(role, index) in item.clientName.slice(0, 3)" :key="index">
                      <span> {{ role.name }}</span>
                    </li>

                    <b-collapse :id="'accordion-' + index">
                      <li style="list-style-type=none" v-for="(role, index) in item.clientName.slice(3)" :key="(role, index)">
                        <span> {{ role.name }}</span>
                      </li>
                    </b-collapse>
                  </ul>
                  <span
                    v-if="item.clientName.length > 3"
                    v-b-toggle="'accordion-' + index"
                    style="opacity: 0.6; text-decoration: underline; font-weight: bold; font-size: 13px; cursor: pointer; margin-left: 2vw"
                  >
                    Show All</span
                  >
                </div>

                <!-- =============================================================================
          if no Role 
          ============================================================================= -->
                <div v-else class="col-3">
                  <span style="color: red">No Clients</span>
                  <div>
                    <!-- <button
                              v-if="permissions.includes('employees.update')"
                              @click="edit(item.id)"
                              class="AddRole"
                            >
                              Add
                            </button> -->
                  </div>
                </div>
              </div>

              <div class="col-1 action">
                <button class="btn btn-primary d-flex align-items-center"><span @click="edit(item)" class="material-icons-outlined me-2">edit</span>Edit</button>
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
import feather from "feather-icons";
import { SearchIcon } from "vue-feather-icons";
// import { ArrowDownIcon } from 'vue-feather-icons'
import Settings from "@/store/Settings.js";
import { ChevronDownIcon } from "vue-feather-icons";
import Auth from "@/store/Auth.js";
import { Edit3Icon } from "vue-feather-icons";
import KeywordTracker from "@/store/KeywordTracker.js";
// import VueMultiSelect from "vue-simple-multi-select"
import vSelect from "vue-select";

import vueMultiSelect from "vue-multi-select";
import "vue-multi-select/dist/lib/vue-multi-select.css";
import { XIcon } from "vue-feather-icons";
import { Trash2Icon } from "vue-feather-icons";
export default {
  components: {
    XIcon,
    SearchIcon,
    ChevronDownIcon,
    Edit3Icon,
    vueMultiSelect,
    vSelect,
    Trash2Icon,
  },
  data() {
    return {
      permissions: [],
      showModal: false,
      Employees: [],
      name: "",
      email: "",
      password: "",
      password_Confirmation: "",
      is_manager: false,
      count_campaigns: 0,
      search_word: "",
      filterEmployee: [],
      submitClients: [],
      chosenClient: [],
      showClients: [],
      deleteId: "",
      editData: [],
      chosenClient_edit: [],
      editData_clientName: [],
      options: {
        multi: true,
        groups: false,
      },
      btnLabel: (chosenClient) => `Choose the clients`,
    };
  },
  methods: {
    edit(data) {
      console.log(data);
      this.editData = [];
      this.editData_clientName = [];
      this.editData = data;
      this.editData_clientName = data.clientName;

      this.$bvModal.show("modal-center-edit-role");
    },
    assignClients() {
      Settings.fetchClients()
        .then((response) => {
          // //
          this.allEmployees = response.data;
          this.Employees = response.data;

          this.Employees.forEach((element) => {
            // //

            element.clientName = [];

            this.submitClients.forEach((nexrank) => {
              element.clients.forEach((client) => {
                // //
                if (nexrank.id == client) {
                  //
                  element.clientName.push(nexrank);
                }
              });
            });

            if (element.active == 0) {
              element.statusActive = false;
            } else if (element.active == null) {
              element.statusActive = false;
            } else {
              element.statusActive = true;
            }
          });

          // //
        })
        .catch((error) => {
          console.log(error);
        });
    },

    choseClient_edit(data) {
      var dup = false;
      if (this.editData_clientName.length != 0) {
        this.editData_clientName.forEach((element) => {
          if (element.id == data.id) {
            dup = true;
          }
        });

        if (dup == false) {
          this.editData_clientName.push(data);
        }
      } else {
        this.editData_clientName.push(data);
      }

      // this.editData.clientName.push(data);
      // //
    },
    remove_edit(idx) {
      this.editData_clientName.splice(idx, 1);
    },
    editValue() {
      //
      var final = [];

      this.editData_clientName.forEach((client) => {
        final.push(client.id);
      });

      const obj = {
        id: this.editData.id,
        name: this.editData.name,
        email: this.editData.email,

        clients: final,
      };

      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          Settings.updateClient(obj)
            .then((response) => {
              this.$bvModal.hide("modal-center-edit-role");
              this.$toast.success(response.data.message);

              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });

              this.assignClients();
            })
            .catch((err) => {
              console.log(err);
              // this.$vs.notify({
              //   color: "danger",
              //   title: "Campaign Error",
              //   text: err.response.data.message,
              // })
            });
        }
      });
    },

    deleteRole(data) {
      this.deleteId = data;
      this.$bvModal.show("modal-center-delete-role");
    },
    deleteValue() {
      Settings.removeClient(this.deleteId)
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-delete-role");
          this.assignClients();
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

    changeStatus(data) {
      //

      this.Employees.forEach((element) => {
        if (element.id == data.id) {
          //

          if (element.statusActive == false) {
            // element.statusActive = false;

            delete element.statusActive;
            delete element.morePolicies;
            delete element.moreRoles;
            delete element.showPlocies;
            delete element.showRoles;
            delete element.clientName;
            //

            Settings.removeClient(element)

              .then((response) => {
                this.$toast.success(response.data.message);

                // this.$bvToast.toast(response.data.message, {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });
                this.assignClients();
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            // //
            // element.statusActive = true;
            delete element.statusActive;
            delete element.morePolicies;
            delete element.moreRoles;
            delete element.showPlocies;
            delete element.showRoles;
            delete element.clientName;
            //

            Settings.activeClient(element)

              .then((response) => {
                this.$toast.success(response.data.message);

                // this.$bvToast.toast(response.data.message, {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });
                this.assignClients();
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      });
      // //
    },
    choseClient(data) {
      var dup = false;

      if (this.showClients.length != 0) {
        this.showClients.forEach((element) => {
          if (element.id == data.id) {
            dup = true;
          }
        });

        if (dup == false) {
          this.showClients.push(data);
        }
      } else {
        this.showClients.push(data);
      }

      //
    },

    addEmployee() {
      //
      var final = [];

      this.submitClients.forEach((element) => {
        this.showClients.forEach((client) => {
          if (element.id == client.id) {
            final.push(client.id);
          }
        });
      });

      //
      const obj = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_Confirmation,
        clients: final,
      };
      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.dataId !== null && this.dataId >= 0) {
            Settings.updateClient(obj).catch((err) => {
              console.error(err);
            });
          } else {
            Settings.addClient(obj)
              .then((response) => {
                this.$toast.success(response.data.message);

                // this.$bvToast.toast(response.data.message, {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });
                this.$bvModal.hide("modal-center-add-employee");
                (this.name = ""), (this.email = ""), (this.password = ""), (this.password_Confirmation = ""), (this.chosenClient = ""), (this.showClients = "");
                this.assignClients();
              })
              .catch((err) => {
                console.log(err);
                // this.$vs.notify({
                //   color: "danger",
                //   title: "Campaign Error",
                //   text: err.response.data.message,
                // })
              });
          }
        }
      });

      // this.$refs['modal-center-recent'].hide()
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
        this.Employees = this.allEmployees;
      } else {
        // //

        // //

        while (this.filterEmployee.length > 0) {
          this.filterEmployee.pop();
        }

        this.allEmployees.forEach((element) => {
          if (element.name.toLowerCase().search(this.search_word) >= 0) {
            // //

            this.filterEmployee.push(element);
          }
        });

        this.Employees = this.filterEmployee;
        // //
      }
    },
  },
  mounted() {
    feather.replace();
  },
  created() {
   let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
        this.permissions =JSON.parse(localStorage.userInfo).permissions;
  
    KeywordTracker.fetchDomains()
      .then((response) => {
        // //
        loader.hide();
        this.submitClients = response.data.data.sort((a, b) => a.name.localeCompare(b.name));
        // this.submitClients.forEach(element=>{
        //  this.showClients.push(element.name)
        // })

        //

        this.assignClients();
      })
      .catch((error) => {
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
.nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2,
.nextable .nextable__head .col-3,
.nextable .nextable__head .col-4,
.nextable .nextable__head .col-5 {
  padding: 1rem;
  font-weight: bold;
  border-bottom: 2px solid #e8e8e8;
}

.nextable .nextable__head .col-1.action {
  text-align: center;
  max-width: 150px;
}
/* .nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 150px;
} */
.nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2,
.nextable .nextable__body .col-3,
.nextable .nextable__body .col-4,
.nextable .nextable__body .col-5 {
  padding: 1rem;
  align-items: start;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
}
.nextable .nextable__body .col-1.action {
  text-align: center;
  max-width: 150px;
  justify-content: center;
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

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.material-icons-outlined.when-closed {
  transform: rotate(0deg);
  transition: all 0.4s ease-out;
}
.material-icons-outlined.when-open {
  transform: rotate(180deg);
  transition: all 0.4s ease-out;
}
.form-check-label span {
  margin: 0;
  font-weight: 600;
}
.form-check.form-switch,
.form-check-input {
  cursor: pointer !important;
}
/* .form-check-input{
  height: 25px !important;
  width: 40px !important;
} */
</style>
