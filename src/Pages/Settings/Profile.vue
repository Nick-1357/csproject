<template>
  <div class="container">
    <b-modal id="modal-Unsubscribe" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Confirmation!</strong>

        <div class="card-text mt-3">
          <span>Do you want to cancel your subscription?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-Unsubscribe')"
          >
            No
          </button>
          <button class="btn btn-danger ms-2" @click.once="unsubscribe()">
            Yes
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-cancel-trial" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Confirmation!</strong>

        <div class="card-text mt-3">
          <span>Do you want to cancel your free trial?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-cancel-trial')"
          >
            No
          </button>
          <button class="btn btn-danger ms-2" @click.once="cancel_trial()">
            Yes
          </button>
        </div>
      </div>
    </b-modal>

    <div class="d-flex align-items-center">
      <div class="route__linkpath my-4 fw-normal">
        <p class="text-muted fw-normal">
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
          / Profile
        </p>
      </div>
    </div>
    <div class="profile-center">
      <h4>Profile</h4>

      <div class="nexcard">
        <div class="row">
          <div class="col-6">
            <label for="fname">Company Name : </label>

            <b> {{ profile.company_name }}</b>
          </div>
          <div class="col-6">
            <label>Website : </label>
            <b> {{ profile.website }}</b>
          </div>
        </div>
      </div>

      <div class="nexcard mt-3">
        <div class="row">
          <div class="col-6">
            <!-- <label>Name</label> -->

            <b-form-input
              type="text"
              autocorrect="off"
              autocomplete="off"
              v-model="profile.name"
            ></b-form-input>
          </div>
          <div class="col-6">
            <!-- <label>Email</label> -->
            <b-form-input
              type="text"
              autocorrect="off"
              autocomplete="off"
              v-model="profile.email"
            ></b-form-input>
          </div>
        </div>

        <div class="card-text d-flex flex-row-reverse mt-3">
          <button @click="save" class="btn btn-primary ms-2">
            Update Profile
          </button>
        </div>
      </div>

      <div class="nexcard mt-3">
        <div class="row">
          <div class="col-6">
            <b-form-input
              autocorrect="off"
              autocomplete="off"
              type="password"
              placeholder="Current Password"
              v-model="form.old_password"
            ></b-form-input>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-6">
            <b-form-input
              type="password"
              autocorrect="off"
              autocomplete="off"
              placeholder="New Password"
              v-model="form.password"
            ></b-form-input>
          </div>
          <div class="col-6">
            <b-form-input
              autocorrect="off"
              autocomplete="off"
              type="password"
              placeholder="Confirm Password"
              v-model="form.password_confirmation"
            ></b-form-input>
          </div>
        </div>

        <div class="card-text d-flex flex-row-reverse mt-3">
          <button @click="savePassword" class="btn btn-primary ms-2">
            Update Password
          </button>
        </div>
      </div>

      <div class="nexcard mt-3" v-if="profile.has_subscription == true">
        <div class="card-text d-flex">
          <b class="text-danger"> End Subscription </b>
        </div>

        <div class="card-text d-flex">
          <p class="text-secondary">
            This account will be available only until your subscription period
          </p>
        </div>

        <div class="card-text d-flex flex-row-reverse">
          <button
            v-b-modal.modal-Unsubscribe
            v-b-modal.modal-cancel-trial
            class="btn btn-outline-danger ms-2"
          >
            Cancel my Subscription
          </button>
        </div>
      </div>

      <div class="nexcard mt-3" v-if="profile.in_trial_period == true">
        <div class="card-text d-flex">
          <b class="text-danger"> End Free Trial </b>
        </div>

        <div class="card-text d-flex">
          <p class="text-secondary">Your free trial will be cancelled</p>
        </div>

        <div class="card-text d-flex flex-row-reverse">
          <button
            v-b-modal.modal-cancel-trial
            class="btn btn-outline-danger ms-2"
          >
            Cancel my Free Trial
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import feather from "feather-icons";
import Auth from "@/store/Auth.js";
import plan from "@/store/Plan.js";
export default {
  components: {},
  data() {
    return {
      disable: true,
      editprofile: true,
      planQuota: [],

      profile: [],
      form: {
        old_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    unsubscribe() {
      plan
        .cancel_subscription()
        .then((response) => {
          //
          this.$toast.success(response.data.message);
          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          this.$bvModal.hide("modal-Unsubscribe");
          if (response.data.logout == true) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("me");
            this.$router.push("/login");
          } else {
            location.reload();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cancel_trial() {
      plan
        .skip_trial()
        .then((response) => {
          //
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          if (response.data.logout == true) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("me");
            this.$router.push("/login");
          } else {
            location.reload();
          }

          this.$bvModal.hide("modal-cancel-trial");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    edit() {
      (this.disable = false), (this.editprofile = false);
    },
    cancel() {
      (this.disable = true), (this.editprofile = true);
    },
    save() {
      Auth.updateProfile({ name: this.profile.name, email: this.profile.email })
        .then((response) => {
          //
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

      (this.disable = true), (this.editprofile = true);
    },
    savePassword() {
      Auth.changePassword(this.form)
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          // //
          this.$bvModal.hide("modal-center-change-password");
          this.form = {
            old_password: "",
            password: "",
            password_confirmation: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    change() {
      this.$router.push({ name: "ChangePassword" });
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      // localStorage.removeItem("me");
      this.$router.push("/login");
    },
  },
  mounted() {
    feather.replace();
  },
  created() {

        this.planQuota = JSON.parse(localStorage.userInfo).current_plan[0];
 
  },
};
</script>

<style scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.profile-center {
  position: relative;
  max-width: calc(800px);
  margin: 0rem auto;
  padding: 0rem 2rem 2rem;
}
</style>
