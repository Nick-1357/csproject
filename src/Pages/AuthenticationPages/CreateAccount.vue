<template>
  <div class="form-card">
    <!-- v-if="view" -->
    <div  v-if="view">
      <h4>Create Account</h4>
      <div class="mb-3">
        <small class="ms-1"><a href="">Already have an account?</a></small>
      </div>
      <div class="mb-3">
        <small>{{ email }}</small>
      </div>

      <div class="login input-group my-2">
        <input
          type="text"
          autocorrect="off"
          autocomplete="off"
          name="name"
          v-validate="'required'"
          class="form-control"
          placeholder="Name"
          v-model="name"
          aria-label="name"
          aria-describedby="name"
        />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{
          errors.first("name")
        }}</span>
      </div>
      <div class="login input-group my-2">
        <input
          type="password"
          autocorrect="off"
          autocomplete="off"
          name="password"
          v-validate="'required'"
          class="form-control"
          placeholder="Password"
          v-model="password"
          aria-label="Password"
          aria-describedby="Password"
        />
        <span class="text-danger text-sm" v-show="errors.has('password')">{{
          errors.first("password")
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
          v-model="password_confirmation"
          aria-label="Password"
          aria-describedby="Password"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('confirm password')"
          >{{ errors.first("confirm password") }}</span
        >
      </div>
      <button @click="SignUp" class="btn btn-primary btn-signin my-3">
        Create Your Account
      </button>

      <span style="font-size: 14px; cursor: pointer; color: grey;">
        By creating an account, you acknowledge and agree to our
        <a class="text-primary" @click="goToTerms">Terms of Service</a> and
        <a class="text-primary" @click="goToPrivacy">Privacy Policy</a>. You
        also agree to receive product-related marketing emails from NexMind,
        which you can unsubscribe from at any time
      </span>
    </div>
  
   <!-- v-else -->
    <div v-else>
      <h4>Sorry!</h4>

      <div class="mb-3">
        <small>{{ message }}</small>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import KeywordAnalyzer from "@/store/KeywordAnalyzer.js";
import Auth from "@/store/Auth.js";
export default {
  data() {
    return {
      // firstname: null,
      email: "",
      name: "",
      location: [3],
      locations: [],
      token: this.$route.query.token,
      password: "",
      password_confirmation: "",
      locationRestriction: "",
      view: true,
      message: "",
      showLocation: true,
    };
  },

  methods: {
    goToPrivacy() {
      // this.$router.push({ name: "PrivatePolicy" });
      window.open("https://www.nexmind.ai/privacy-policy/");
    },
    goToTerms() {
      //this.$router.push({ name: "TermsOfServices" });
      window.open("https://www.nexmind.ai/terms-of-use/");
    },
    handleSelected() {
      // //
      // //

      if (this.location.length > this.locationRestriction) {
        this.location.splice(0, 1);
      }

      // //
    },
    loginPage() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      // localStorage.removeItem("me");
      this.$router.push({ name: "SignIn" });
    },
    SignUp() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      const obj = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        name: this.name,
        locations: this.location,
        token: this.token,
      };

      // if(this.showLocation==false){
      //   delete obj.locations
      // }

      //
      this.$validator.validateAll().then((result) => {
        if (result) {
          Auth.ConfigureAccount(obj)
            .then((response) => {
              // //
              this.$toast.success(response.data.message)
              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });

              // //
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userInfo");
              // localStorage.removeItem("me");
              this.$router.push({ name: "SignIn" });
              loader.hide();
            })
            .catch((error) => {
              console.log(error);
              loader.hide();
            });
        }
      });
    },
  },
  created() {
    Auth.accountRestrictions({ token: this.token })
      .then((response) => {
        this.view = true;
        const found = response.data.data.find(
          (element) => element.key === "manager_email"
        );
        this.email = found.value;
        // //
      })
      .catch((error) => {
        console.log(error);
        this.view = false;
        this.message = error.response.data.message;
      });
    KeywordAnalyzer.fetchAllLocations()
      .then((response) => {
        // //
        this.locations = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
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