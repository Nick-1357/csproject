<template>
  <div>
    <div class="container">
      <b-modal id="modal-center-change-password-employee" centered hide-footer hide-header>
        <div class="card-body">
          <div class="card-title">
            <b class="title">Change Password</b>
          </div>

          <div class="card-text mt-3">
            <label>New Password</label>
          </div>
          <div class="card-text mt-2">
            <b-form-input type="password" v-model="password"></b-form-input>
          </div>

          <div class="card-text d-flex mt-3">
            <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-change-password-employee')">Cancel</button>
            <button class="btn btn-primary ms-2" @click="ChangePassword">Change</button>
          </div>
        </div>
      </b-modal>

      <div class="route__linkpath my-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'settings',
              params: { feature: 'employees' },
            }"
            class="route__link"
            >View All
          </router-link>
          / Employee
        </p>
      </div>
      <div class="nexcard mt-3">
        <div class="d-flex">
          <div class="d-flex me-auto w-50">
            <div class="me-2 w-100">
              <!-- <label>Name</label> -->
              <b-form-input type="text" autocorrect="off" autocomplete="off" v-model="employee.name"></b-form-input>
            </div>
            <div class="me-auto w-100">
              <!-- <label>Email</label> -->
              <b-form-input type="text" autocorrect="off" autocomplete="off" v-model="employee.email"></b-form-input>
            </div>
          </div>

          <div class="ms-auto">
            <button @click="editDetail" class="btn btn-primary ms-2">Update Profile</button>
            <button v-b-modal.modal-center-change-password-employee class="btn btn-primary ms-2">Change Password</button>
          </div>
        </div>
      </div>

      <div class="nexcard mt-4">
        <div class="d-flex">
          <div class="ms-auto">
            <button class="btn btn-primary" @click="detachRole">Detach Roles</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1 title"></div>
            <div class="col-5 title"><p>Applicable Roles</p></div>
            <div class="col-6 title"><p>Description</p></div>
            <!-- <div class="col-2"></div> -->
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(role, index) in employee.roles" :key="'roles' + index">
              <div class="col-1 item">
                <input class="checkbox custom-checkbox" :value="role" type="checkbox" v-model="detachNames" />
              </div>
              <div class="col-5 item">
                <p>{{ role.name }}</p>
              </div>
              <div class="col-6 item">
                <p>{{ role.description }}</p>
              </div>
              <!-- <div class="col-2 item pe-0">
                <button @click="viewRole(role.id)" class="btn btn-primary ms-auto">View Details</button>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard mt-4">
        <div class="d-flex">
          <div class="ms-auto">
            <button class="btn btn-primary" @click="attachRole">Attach Roles</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1 title"></div>
            <div class="col-5 title"><p>Available Roles</p></div>
            <div class="col-6 title"><p>Description</p></div>
            <!-- <div class="col-2 title"></div> -->
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(role, index) in displayAllRoles" :key="'roles' + index">
              <div class="col-1 item">
                <input class="checkbox custom-checkbox" type="checkbox" :value="role" v-model="attachNames" />
              </div>
              <div class="col-5 item">
                <p>{{ role.name }}</p>
              </div>
              <div class="col-6 item">
                <p>{{ role.description }}</p>
              </div>
              <!-- <div class="col-2 item pe-0">
                <a @click="viewRole(role.id)" class="btn btn-primary ms-auto">View Details</a>
              </div> -->
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
// import { ChevronDownIcon } from "vue-feather-icons";
import Settings from "@/store/Settings.js";
import Auth from "@/store/Auth.js";

export default {
  components: {},
  data() {
    return {
      permissions: [],
      employee: [],
      allRoles: [],
      editable: false,
      detachNames: [],
      attachNames: [],
      displayAllRoles: [],
      employeeRoles: [],
      indexes: [],
      password: "",
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "Settings",
        params: { page: "Employee" },
      });
    },
    viewRole(roleId) {
      this.$router.push({ name: "Role", params: { id: roleId } });
    },
    changeStatus(data) {
      //

      //

      if (this.employee.statusActive == false) {
        // this.employee.statusActive = false;

        delete this.employee.statusActive;
        delete this.employee.morePolicies;
        delete this.employee.moreRoles;
        delete this.employee.showPlocies;
        delete this.employee.showRoles;

        Settings.removeEmployee(this.employee)

          .then(() => {
            Settings.fetchEmployees(this.$route.params.id)
              .then((response) => {
                // //
                this.employee = response.data.data;

                if (this.employee.active == 0) {
                  this.employee.statusActive = false;
                } else {
                  this.employee.statusActive = true;
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        // //
        // element.statusActive = true;

        delete this.employee.statusActive;
        delete this.employee.morePolicies;
        delete this.employee.moreRoles;
        delete this.employee.showPlocies;
        delete this.employee.showRoles;

        Settings.activeClientStaff(this.employee)

          .then(() => {
            Settings.fetchEmployees(this.$route.params.id)
              .then((response) => {
                this.employee = response.data.data;

                if (this.employee.active == 0) {
                  this.employee.statusActive = false;
                } else {
                  this.employee.statusActive = true;
                }

                // //
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      }

      // //
    },
    attachRole() {
      // //
      console.log(this.attachNames);
      this.attachNames.forEach((element) => {
        Settings.attachRoleEmployee({
          roleId: element.id,
          staffId: this.$route.params.id,
        })
          .then((response) => {
            this.$toast.success(response.data.message);

            // this.$bvToast.toast(response.data.message, {
            //   title: "Success",
            //   variant: "success",
            //   toaster: "b-toaster-bottom-left",
            //   solid: true,
            // });

            // //

            Settings.fetchEmployee({ id: this.$route.params.id })
              .then((response) => {
                // //
                this.employee = response.data.data;
                this.employeeRoles = response.data.data.roles;

                if (this.employee.active == 0) {
                  this.employee.statusActive = false;
                } else {
                  this.employee.statusActive = true;
                }

                Settings.fetchRoles()
                  .then((response) => {
                    while (this.displayAllRoles.length > 0) {
                      this.displayAllRoles.pop();
                    }

                    while (this.allRoles.length > 0) {
                      this.allRoles.pop();
                    }

                    // //
                    this.allRoles = response.data.data;
                    // //

                    this.allRoles.forEach((element) => {
                      // //
                      this.employeeRoles.forEach((role) => {
                        // //
                        // //
                        if (element.id == role.id) {
                          // //
                          element.id = 0;
                        }
                        // //
                      });
                    });
                    // //

                    this.allRoles.forEach((element) => {
                      // //
                      if (element.id == 0) {
                        // //
                      } else {
                        this.displayAllRoles.push(element);
                      }
                    });

                    // this.displayAllRoles=this.allRoles
                    // //
                  })
                  .catch((error) => {});
                console.log(error);
              })
              .catch((error) => {
                console.log(error);
              });

            while (this.detachNames.length > 0) {
              this.detachNames.pop();
            }

            while (this.attachNames.length > 0) {
              this.attachNames.pop();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    detachRole() {
      // //

      this.detachNames.forEach((element) => {
        // //
        Settings.detachRoleEmployee({
          roleId: element.id,
          staffId: this.$route.params.id,
        })
          .then((response) => {
            this.$toast.success(response.data.message);

            // this.$bvToast.toast(response.data.message, {
            //   title: "Success",
            //   variant: "success",
            //   toaster: "b-toaster-bottom-left",
            //   solid: true,
            // });

            // //

            Settings.fetchEmployee({ id: this.$route.params.id })
              .then((response) => {
                // //
                this.employee = response.data.data;
                this.employeeRoles = response.data.data.roles;

                if (this.employee.active == 0) {
                  this.employee.statusActive = false;
                } else {
                  this.employee.statusActive = true;
                }

                Settings.fetchRoles()
                  .then((response) => {
                    while (this.displayAllRoles.length > 0) {
                      this.displayAllRoles.pop();
                    }

                    while (this.allRoles.length > 0) {
                      this.allRoles.pop();
                    }

                    // //
                    this.allRoles = response.data.data;
                    // //

                    this.allRoles.forEach((element) => {
                      // //
                      this.employeeRoles.forEach((role) => {
                        // //
                        // //
                        if (element.id == role.id) {
                          // //
                          element.id = 0;
                        }
                        // //
                      });
                    });
                    // //

                    this.allRoles.forEach((element) => {
                      // //
                      if (element.id == 0) {
                        // //
                      } else {
                        this.displayAllRoles.push(element);
                      }
                    });

                    // this.displayAllRoles=this.allRoles
                    // //
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                while (this.detachNames.length > 0) {
                  this.detachNames.pop();
                }

                while (this.attachNames.length > 0) {
                  this.attachNames.pop();
                }
              })
              .catch((error) => {
                console.log(error);
              });

            //     this.displayAllRoles.push(element)
            // const ItemIndex = this.employee.roles.findIndex((p) => p.id === element.id)
            // this.employee.roles.splice(ItemIndex, 1)
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    ChangePassword() {
      this.employee.password = this.password;

      delete this.employee.statusActive;

      //

      Settings.updateEmployee(this.employee)

        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          this.$bvModal.hide("modal-center-change-password-employee");

          Settings.fetchEmployee({ id: this.$route.params.id })
            .then((response) => {
              // //
              this.employee = response.data.data;

              if (this.employee.active == 0) {
                this.employee.statusActive = false;
              } else {
                this.employee.statusActive = true;
              }

              // //
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editDetail() {
      delete this.employee.statusActive;

      Settings.updateEmployee(this.employee)

        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-edit-profile");
          Settings.fetchEmployee({ id: this.$route.params.id })
            .then((response) => {
              // //
              this.employee = response.data.data;

              if (this.employee.active == 0) {
                this.employee.statusActive = false;
              } else {
                this.employee.statusActive = true;
              }

              // //
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    feather.replace();
  },
  created() {

        this.permissions =JSON.parse(localStorage.userInfo).permissions;
   
let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    Settings.fetchEmployee({ id: this.$route.params.id })
      .then((response) => {
        loader.hide();
        // //
        this.employee = response.data.data;
        this.employeeRoles = response.data.data.roles;

        if (this.employee.active == 0) {
          this.employee.statusActive = false;
        } else {
          this.employee.statusActive = true;
        }

        Settings.fetchRoles()
          .then((response) => {
            // //
            this.allRoles = response.data.data;
            // //

            // =============================================================================
            //  Delete available roles which is already in applicable roles
            // =============================================================================

            this.allRoles.forEach((element) => {
              // //
              this.employeeRoles.forEach((role) => {
                // //
                // //
                if (element.id == role.id) {
                  // //
                  element.id = 0;
                }
                // //
              });
            });
            // //

            this.allRoles.forEach((element) => {
              // //
              if (element.id == 0) {
                // //
              } else {
                this.displayAllRoles.push(element);
              }
            });

            // this.displayAllRoles=this.allRoles
            // //
          })
          .catch((error) => {
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

<style scoped>
.container {
  padding: 0rem 0rem 3rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1rem;
}
.employee-center {
  position: relative;
  max-width: calc(1200px);
  margin: 0rem auto;
  padding: 0rem 2rem 2rem;
}
.nextable {
  flex-direction: column;
}

.nextable .nextable__head.non-stick {
  position: relative;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  position: relative;
}
.nextable .nextable__body__collection.no-scrollbar {
  overflow-y: hidden;
  max-height: 100%;
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
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__head .title {
  padding: 1rem;
  font-weight: bold;
}
.nextable .nextable__body .item {
  padding: 1rem;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
}
.nextable p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.custom-checkbox {
  height: 20px;
  width: 20px;
  accent-color: #2c8ee1;
}
</style>
