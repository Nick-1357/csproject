<template>
  <div>
    <b-modal id="modal-center-add-employee" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Add New Employee</strong>

        <div class="card-text mt-3">
          <label for="fname">Full Name</label>
        </div>

        <div class="card-text mt-2">
          <b-form-input autocorrect="off" autocomplete="off" v-model="name" type="text" id="name" name="name" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>
        </div>

        <div class="card-text mt-3">
          <label for="fname">Email</label>
        </div>

        <div class="card-text mt-2">
          <b-form-input autocorrect="off" autocomplete="off" type="text" id="email" name="email" v-model="email" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>
        </div>

        <div class="card-text mt-3">
          <label for="fname">Password </label>
        </div>

        <div class="card-text mt-2">
          <b-form-input autocorrect="off" autocomplete="off" v-model="password" type="password" id="password" name="password" v-validate="'required'" />
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first("password") }}</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-add-employee')">Cancel</button>
          <button @click="addEmployee" class="btn btn-primary ms-2">Add</button>
        </div>
      </div>
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / Employees
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
            <button v-b-modal.modal-center-add-employee class="btn btn-primary">Add Employee</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1 status"><p>Status</p></div>
            <div class="col"><p>Full Name</p></div>
            <div class="col-3"><p>Email</p></div>
            <div class="col-2"><p>Role</p></div>
            <div class="col-2"><p>Policy</p></div>
            <div class="col-1 action"><p>Action</p></div>
          </div>

          <div class="nextable__body">
            <div class="row nextable__row g-0" v-for="(item, index) in Employees" :key="'employees' + index">
              <div class="col-1 status">
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
              <div class="col">
                <p>{{ item.name }}</p>
              </div>
              <div class="col-3">
                <p>{{ item.email }}</p>
              </div>

              <div class="col-2 ps-0">
                <!-- =============================================================================
                if Role is assigned
                ============================================================================= -->

                <div v-if="item.roles.length != 0">
                  <ul class="policy">
                    <li style="list-style-type=none" v-for="(role, index) in item.roles.slice(0, 3)" :key="index">
                      <span> {{ role.name }}</span>
                    </li>

                    <b-collapse :id="'accordion-' + index">
                      <li style="list-style-type=none" v-for="(role, index) in item.roles.slice(3)" :key="(role, index)">
                        <span> {{ role.name }}</span>
                      </li>
                    </b-collapse>
                  </ul>
                  <span v-if="item.roles.length > 3" v-b-toggle="'accordion-' + index" style="display: grid; place-items: center">
                    <!-- <span class="when-open">Hide </span> -->
                    <!-- <span class="when-closed">Show </span> -->

                    <!-- style 1 -->
                    <span class="material-icons-outlined when-open text-primary">expand_more</span>
                    <span class="material-icons-outlined when-closed text-primary">expand_more</span>
                    <!-- style 2 -->
                    <!-- <small class="when-open text-primary">Hide</small>
                    <small class="when-closed text-primary">Show all</small> -->
                  </span>
                </div>

                <!-- =============================================================================
          if no Role 
          ============================================================================= -->
                <div v-else>
                  <span class="text-danger ms-3">No Role</span>
                </div>
              </div>
              <div class="col-2 ps-0">
                <!-- =============================================================================
          if Policy is assigned
          ============================================================================= -->

                <div v-if="item.plocies.length != 0">
                  <ul class="policy">
                    <li style="list-style-type=none" v-for="(role, index) in item.plocies.slice(0, 3)" :key="index">
                      <span> {{ role.name }}</span>
                    </li>

                    <b-collapse :id="'accordion-policy-' + index" class="accordion-popup">
                      <li v-for="(role, index) in item.plocies.slice(3)" :key="(role, index)">
                        <span> {{ role.name }}</span>
                      </li>
                    </b-collapse>
                  </ul>

                  <!-- <b-popover target="popover-target-1" triggers="hover" placement="bottom">
                    <li v-for="(role, index) in item.plocies.slice(3)" :key="(role, index)">
                      <span> {{ role.name }}</span>
                    </li>
                  </b-popover> -->
                  <span v-if="item.plocies.length > 3" v-b-toggle="'accordion-policy-' + index" style="display: grid; place-items: center">
                    <!-- <small class="text-primary" id="popover-target-1">Show all</small> -->
                    <!-- style 1 -->
                    <span class="material-icons-outlined when-open text-primary" style="margin-left: -47px">expand_more</span>
                    <span class="material-icons-outlined when-closed text-primary">expand_more</span>

                    <!-- style 2 -->
                    <!-- <small class="when-open text-primary" style="margin-left: -70px;">Hide</small>
                    <small class="when-closed text-primary">Show all</small> -->
                  </span>
                </div>

                <!-- =============================================================================
          if Policy is not assigned
          ============================================================================= -->
                <div v-else>
                  <span class="text-danger ms-3">No Policy</span>
                  <!-- <div><button class="AddRole">Add</button></div> -->
                </div>
              </div>
              <div class="col-1 action">
                <router-link
                  class="button td-none"
                  :to="{
                    name: 'employee',
                    params: { id: item.id },
                  }"
                >
                  <button class="btn btn-primary d-flex align-items-center p-2" v-b-tooltip.hover.left="{ variant: 'primary' }" title="Edit">
                    <span class="material-icons-outlined">edit</span>
                  </button>
                </router-link>
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
      Employees: [],
      name: "",
      email: "",
      password: "",
      is_manager: false,
      count_campaigns: 0,
      search_word: "",
      filterEmployee: [],
    };
  },
  methods: {
    edit(data) {
      this.$router.push({ name: "Employee", params: { id: data } });
    },
    changeStatus(data) {
      //

      this.Employees.forEach((element) => {
        if (element.id == data.id) {
          //

          if (element.statusActive == false) {
            // element.statusActive = false;

            delete element.statusActive;

            Settings.removeEmployee(element)

              .then(() => {
                this.assignEmployee();
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            // //
            // element.statusActive = true;

            delete element.statusActive;

            Settings.activeClientStaff(element)

              .then(() => {
                this.assignEmployee();
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      });
      // //
    },

    addEmployee() {
      const obj = {
        id: this.id,
        name: this.name,
        email: this.email,
        count_campaigns: this.count_campaigns,
        is_manager: this.is_manager ? 1 : 0,
        active: this.active,
        count_campaigns_type: "day",
        password: this.password,
      };
      // //

      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.dataId !== null && this.dataId >= 0) {
            Settings.updateEmployee(obj).catch((err) => {
              console.error(err);
            });
          } else {
            delete obj.id;
            Settings.addEmployee(obj)
              .then((response) => {
                this.$toast.success(response.data.message);

                // this.$bvToast.toast(response.data.message, {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });
                this.$bvModal.hide("modal-center-add-employee");
                this.$router.push({ name: "employee", params: { id: response.data.data.id } });
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

    assignEmployee() {
      Settings.fetchEmployees()
        .then((response) => {
          // //
          this.allEmployees = response.data;
          this.Employees = response.data;

          this.Employees.forEach((element) => {
            // //

            if (element.active == 0) {
              element.statusActive = false;
            } else {
              element.statusActive = true;
            }
          });

          //
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },
  },
  created() {
 
        this.permissions = JSON.parse(localStorage.userInfo).permissions;
     

    this.assignEmployee();
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
.nextable .nextable__row .col,
.nextable .nextable__row .col-1,
.nextable .nextable__row .col-2,
.nextable .nextable__row .col-3,
.nextable .nextable__row .col-4,
.nextable .nextable__row .col-5 {
  padding: 1rem;
  align-items: start;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
}
.nextable .nextable__head .col-1.action {
  text-align: end;
  padding-right: 0.5rem;
  width: 100px;
}

.nextable .nextable__row .col-1.action {
  text-align: end;
  justify-content: end;
  padding-right: 0.5rem;
  width: 100px;
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
/* .status {
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
} */

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

/* .tooltip.b-tooltip {
  transform: translate(4px, 0px);
} */

/* .accordion-popup {
  position: absolute;
  z-index: 1;
  background-color: #fff !important;
  border: 1px solid #a9a9a9;
  border-top: none;
  padding-left: 2rem;
  padding-right: 1rem;
  translate: -2rem 0rem;
} */

/* Status Toggle Column css */
.status {
  width: 80px !important;
}
.status .form-check-label span {
  margin: 0;
  font-weight: 600;
}
.status .form-check.form-switch,
.status .form-check-input {
  cursor: pointer !important;
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 47px;
}
.status .form-check-label {
  transform: translate(-39px, 2px);
}
.status span {
  font-size: 13px;
}
</style>
