<template>
  <div class="form-card">
    <h4>Recover your password</h4>
    <div class="mb-3">
      <small>
        Please enter your email address and we'll send you instructions on how
        to reset your password.</small
      >
    </div>

    <div class="login input-group my-2">
      <input
        type="email"
        autocorrect="off"
        autocomplete="off"
        name="email"
        v-validate="'required'"
        class="form-control"
        placeholder="Email"
        v-model="email"
        aria-label="Email"
        aria-describedby="Email"
      />
      <span class="text-danger text-sm" v-show="errors.has('email')">{{
        errors.first("email")
      }}</span>
    </div>

    <small class="mb-5"
      ><a @click="back" href="" class="text-muted">Back to Login</a></small
    >

    <button @click="forget" class="btn btn-primary btn-signin mt-3">
      Continue
    </button>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";

export default {
  data() {
    return {
      email: null,
      errorMessage: "",
      error: false,
    };
  },

  methods: {
    validation() {
      // //
      if (this.email == null || this.email == "") {
        // //
        this.errorMessage = "Email required.";
        this.error = true;
        return true;
      } else if (!this.validEmail()) {
        // //
        this.errorMessage = "Invalid email format";
        this.error = true;
        return true;
      } else {
        this.error = false;
        return false;
      }
    },

    validEmail() {
      // //
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },
    forget() {
      if (this.validation()) {
        //  //
      } else {
        const payload = {
          email: this.email,
        };

        Auth.forgetPassword(payload)
          .then((response) => {
            this.$toast.success(response.data.message + " Success! Check your Email")

            // this.$bvToast.toast(response.data.message, {
            //   title: "Success! Check your Email",
            //   variant: "success",
            //   toaster: "b-toaster-bottom-left",
            //   solid: true,
            // });
            // //
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    back() {
      this.$router.push({ name: "SignIn" });
    },
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