<template>
  <div>
    <div class="container">
      <div class="route__linkpath my-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'settings',
              params: { feature: 'roles' },
            }"
            class="route__link"
            >View All
          </router-link>
          / Role
        </p>
      </div>
      <div class="nexcard mt-3">
        <div class="row">
          <div class="col-6">
            <b> Role : </b>

            <span>
              {{ role.name | capitalize }}
            </span>
          </div>
          <div class="col-6">
            <b> Description :</b>

            <span> {{ role.description }} </span>
          </div>
        </div>
      </div>

      <div class="nexcard mt-4">
        <div class="d-flex">
          <div class="ms-auto">
            <button class="btn btn-primary" @click="detachPolicy">Detach Policies</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1"><p></p></div>
            <div class="col-5"><p>Applicabe Policies</p></div>
            <div class="col-6"><p>Description</p></div>
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(policy, index) in role.policies" :key="'policy' + index">
              <div class="col-1">
                <input class="checkbox custom-checkbox" :value="policy" type="checkbox" v-model="detachNames" />
              </div>
              <div class="col-5">
                <p>{{ policy.name }}</p>
              </div>
              <div class="col-6">
                <p>{{ policy.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard mt-4">
        <div class="d-flex">
          <div class="ms-auto">
            <button class="btn btn-primary" @click="attachPolicy">Attach Policies</button>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col-1"></div>
            <div class="col-5"><p>Available Policies</p></div>
            <div class="col-6"><p>Description</p></div>
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(policy, index) in displayAllPolicies" :key="'policy' + index">
              <div class="col-1">
                <input class="checkbox custom-checkbox" :value="policy" type="checkbox" v-model="attachNames" />
              </div>
              <div class="col-5">
                <p>{{ policy.name }}</p>
              </div>
              <div class="col-6">
                <p>{{ policy.description }}</p>
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
  components: {},
  data() {
    return {
      permissions: [],
      role: [],
      rolePolicies: [],
      allPolicies: [],
      displayAllPolicies: [],
      editable: false,
      policyValues: [],
      detachNames: [],
      attachNames: [],
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "Settings",
        params: { page: "Access Control" },
      });
    },
    viewPolicy(data) {
      this.$router.push({ name: "Policy", params: { id: data } });
    },

    attachPolicy() {
      // //
      this.attachNames.forEach((element) => {
        // //
        this.policyValues.push(element.id);
      });

      // //

      Settings.attachPolicyToRole({
        policies: this.policyValues,
        roleId: this.$route.params.id,
      })
        .then((response) => {
          // //
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          Settings.fetchRole(this.$route.params.id)
            .then((response) => {
              while (this.policyValues.length > 0) {
                this.policyValues.pop();
              }

              // //
              this.rolePolicies = response.data.policies;
              this.rolePolicies.forEach((element) => {
                this.policyValues.push(element.id);
              });

              this.role = response.data;

              Settings.fetchPolicies()
                .then((response) => {
                  while (this.displayAllPolicies.length > 0) {
                    this.displayAllPolicies.pop();
                  }

                  while (this.allPolicies.length > 0) {
                    this.allPolicies.pop();
                  }

                  // //
                  this.allPolicies = response.data.data;

                  this.allPolicies.forEach((element) => {
                    // //
                    this.rolePolicies.forEach((role) => {
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

                  this.allPolicies.forEach((element) => {
                    // //
                    if (element.id == 0) {
                      // //
                    } else {
                      this.displayAllPolicies.push(element);
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
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      while (this.attachNames.length > 0) {
        this.attachNames.pop();
      }
    },
    detachPolicy() {
      // //

      this.detachNames.forEach((element) => {
        const ItemIndex = this.policyValues.findIndex((p) => p === element.id);
        this.policyValues.splice(ItemIndex, 1);
      });

      // //

      Settings.attachPolicyToRole({
        policies: this.policyValues,
        roleId: this.$route.params.id,
      })
        .then((response) => {
          // //
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          Settings.fetchRole(this.$route.params.id)
            .then((response) => {
              while (this.policyValues.length > 0) {
                this.policyValues.pop();
              }

              // //
              this.rolePolicies = response.data.policies;
              this.rolePolicies.forEach((element) => {
                this.policyValues.push(element.id);
              });

              this.role = response.data;

              Settings.fetchPolicies()
                .then((response) => {
                  while (this.displayAllPolicies.length > 0) {
                    this.displayAllPolicies.pop();
                  }

                  while (this.allPolicies.length > 0) {
                    this.allPolicies.pop();
                  }

                  // //
                  this.allPolicies = response.data.data;

                  this.allPolicies.forEach((element) => {
                    // //
                    this.rolePolicies.forEach((role) => {
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

                  this.allPolicies.forEach((element) => {
                    // //
                    if (element.id == 0) {
                      // //
                    } else {
                      this.displayAllPolicies.push(element);
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
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      while (this.detachNames.length > 0) {
        this.detachNames.pop();
      }
    },
  },

  created() {
   

 
        this.permissions = JSON.parse(localStorage.userInfo).permissions;
    
let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    Settings.fetchRole(this.$route.params.id)
      .then((response) => {
        loader.hide();
        // //
        this.rolePolicies = response.data.policies;
        this.rolePolicies.forEach((element) => {
          this.policyValues.push(element.id);
        });

        this.role = response.data;

        Settings.fetchPolicies()
          .then((response) => {
            // //
            this.allPolicies = response.data.data;

            this.allPolicies.forEach((element) => {
              // //
              this.rolePolicies.forEach((role) => {
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

            this.allPolicies.forEach((element) => {
              // //
              if (element.id == 0) {
                // //
              } else {
                this.displayAllPolicies.push(element);
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
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.employee-center {
  position: relative;
  max-width: calc(1200px);
  margin: 0rem auto;
  padding: 0rem 2rem 2rem;
}
.nextable {
  flex-direction: column;
  position: relative;
}

.nextable .nextable__head {
  /* background-color: transparent !important; */
  position: sticky;
  top: 0;
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
  border-bottom: 2px solid #e8e8e8;
  background-color: #fff;
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
.nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2,
.nextable .nextable__body .col-3,
.nextable .nextable__body .col-4,
.nextable .nextable__body .col-5,
.nextable .nextable__body .col-6 {
  padding: 1rem;
  align-items: start;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
}
p {
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
