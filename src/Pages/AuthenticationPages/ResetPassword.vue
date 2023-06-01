<template>
  <div class="form-card">
    <h4 class="mb-3">Recover your password</h4>

    <div class="login input-group my-2">
      <input
        type="password"
        autocorrect="off"
        autocomplete="off"
        name="new password"
        v-validate="'required'"
        class="form-control"
        placeholder="New Password"
        v-model="Newpassword"
        aria-label="Password"
        aria-describedby="Password"
      />
      <span class="text-danger text-sm" v-show="errors.has('new password')">{{
        errors.first("new password")
      }}</span>
    </div>

    <div class="login input-group my-2">
      <input
        type="password"
        autocorrect="off"
        autocomplete="off"
        name="confirm password"
        v-validate="'required'"
        class="form-control"
        placeholder="Confirm Password"
        v-model="Confirmpassword"
        aria-label="Password"
        aria-describedby="Password"
      />
      <span
        class="text-danger text-sm"
        v-show="errors.has('confirm password')"
        >{{ errors.first("confirm password") }}</span
      >
    </div>

    <small class="mb-5"
      ><a @click="back" href="" class="text-muted">Back to Login</a></small
    >

    <button @click="reset" class="btn btn-primary btn-signin mt-3">
      Reset Password
    </button>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
export default {
  data() {
    return {
      Newpassword: null,
      Confirmpassword: null,
      token: "",
    };
  },
  methods: {
    reset() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          //  //
          //         //
          //          //

          if (this.Newpassword === this.Confirmpassword) {
            const payload = {
              token: this.token,
              password: this.Newpassword,
              password_confirmation: this.Confirmpassword,
            };

            Auth.updatePassword(payload)
              .then((response) => {
                // //
                 this.$toast.success(response.data.message)
                // this.$bvToast.toast(response.data.message, {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userInfo");
                // localStorage.removeItem("me");

                this.$router.push({ name: "SignIn" });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
             this.$toast.error( "New Password and Confirm password does not match")

            // this.$bvToast.toast(
            //   "New Password and Confirm password does not match",
            //   {
            //     title: "Error",
            //     variant: "danger",
            //     toaster: "b-toaster-bottom-left",
            //     solid: true,
            //   }
            // );
          }
        }
      });
    },
    back() {
  this.$router.push({ name: "SignIn" });
    },
  },
  created() {
    this.token = this.$route.query.token;
    // //
    // //
  },
};
</script>


<style lang="css" scoped>
/* .input-group{
  border-radius: 10px;
} */
hr {
  color: #818181;
  width: 100%;
  margin: 0rem;
}
.form-card {
  background-color: #ffffff;
  border-radius: 10px;
  min-width: 350px;
  /* min-height: 300px; */
  padding: 1rem;
  width: 400px;
}
small {
  font-size: 14px;
}
small a {
  text-decoration: none;
}
.btn {
  width: 100%;
}
.btn-white {
  border-color: rgb(207, 207, 207);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-white:hover,
.btn-white:active {
  border-color: #e9e9e9;
  background-color: #e9e9e9;
}
.login.input-group {
  display: block;
}
.login.input-group .text-danger {
  margin-top: 0.5rem;
}
.login.input-group span {
  display: block;
}
.login.input-group input {
  border-radius: 6px !important;
  width: 100%;
}
</style>