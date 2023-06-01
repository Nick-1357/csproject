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
              params: { feature: 'policies' },
            }"
            class="route__link"
            >View All
          </router-link>
          / Policy
        </p>
      </div>
      <div class="nexcard mt-3">
        <div class="row">
          <div class="col-5 d-flex align-items-center">
            <b> Policy: </b>
            <span> &nbsp;{{ policy.name | capitalize }} </span>
          </div>
          <div class="col-5 d-flex align-items-center">
            <b> Description:</b>
            <span> &nbsp;{{ policy.description }} </span>
          </div>

          <div class="col-2 d-flex">
            <button @click="updatePolicy()" class="btn btn-primary ms-auto w-150px">Update Policy</button>
          </div>
        </div>
      </div>

      <div class="nexcard mt-4">
        <div class="row">
          <div class="col-10">
            <b>Permissions</b>
          </div>
          <div class="toggle col-2 d-flex">
            <button class="btn btn-primary ms-auto w-150px" @click="toggleAll">Toggle All</button>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-4 mb-2" v-for="(item, index) in all_available_permissions" :key="'all_available_permissions' + index">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" :id="item.id" v-model="selected_permissions" :value="item.id" />
              <label class="form-check-label" :for="item.id">
                <span class="text-secondary">{{ item.description }}</span>
              </label>
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

export default {
  components: {},
  data() {
    return {
      permissions: [],
      policy: [],
      my_permissions: [],
      all_available_permissions: [],
      display_permissions: [],
      toggle_all: false,
      selected_permissions: [],
    };
  },
  watch: {},
  methods: {
    toggleAll() {
      this.selected_permissions = [];
      if (this.toggle_all) {
        this.all_available_permissions.forEach((my_perm) => {
          this.selected_permissions.push(my_perm.id);
        });
        this.toggle_all = false;
      } else {
        this.selected_permissions = [];
        this.toggle_all = true;
      }
    },
    updatePolicy() {
      console.log(this.selected_permissions);

      Settings.attachPermissionToPolicy({
        permissionId: this.selected_permissions,
        policyId: this.$route.params.id,
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
        })
        .catch((error) => {
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

    Settings.fetchPolicy({ id: this.$route.params.id })
      .then((response) => {
        loader.hide();
        this.policy = response.data;

        this.my_permissions = response.data.permission;

        this.my_permissions.forEach((my_perm) => {
          this.selected_permissions.push(my_perm.id);
        });

        Settings.fetchPermissions()
          .then((response) => {
            this.all_available_permissions = response.data.permissions;
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
/* .custom-checkbox {
  height: 20px;
  width: 20px;
  accent-color: #2c8ee1;
} */
.form-check.form-switch,
.form-check-input {
  cursor: pointer !important;
}
.toggle a {
  cursor: pointer !important;
  float: right;
}
</style>
