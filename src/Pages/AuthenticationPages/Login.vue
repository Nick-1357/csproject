<template>
  <div class="login-form-card">
    <h4>Sign In</h4>
    <div class="mb-3">
      <small>New User?</small>
      <small class="ms-1"
        ><a href="https://www.nexmind.ai/payment-form-nexmind-monthly-plan-59/"
          >Create an Account</a
        ></small
      >
    </div>
    <button class="btn btn-white mb-2" @click="loginWithGoogle">
      <img src="@/assets/authentication/icon-google.png" style="width: 25px" />
      <span class="ms-3">Continue with Google</span>
    </button>
    <button class="btn btn-white mb-2" @click="loginWithMicrosoft">
      <img
        src="@/assets/authentication/icon-microsoft365.png"
        style="width: 25px"
      />
      <span class="ms-3">Continue with Microsoft 365</span>
    </button>
    <div class="d-flex align-items-center my-2">
      <hr />
      <span class="mx-2">or</span>
      <hr />
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
    <div class="login input-group my-2">
      <input
        v-if="showPass"
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

      <input
        v-else
        type="text"
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
    <small
      class="mb-5 text-primary"
      style="cursor: pointer"
      @click="showPassword"
    >
      <small v-if="showPass">Show </small
      ><small v-else>Hide </small>Password</small
    >

    <div class="d-flex flex-row-reverse">
      <small
        ><a @click="forget" href="" class="text-muted"
          >Forgot Password?</a
        ></small
      >
    </div>

    <button @click="loginJWT" class="btn btn-primary btn-signin mt-3">
      Login
    </button>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import jwt_decode from "jwt-decode";
import axios from "@/axios.js";
export default {
  data() {
    return {
      // firstname: null,
      email: null,
      errorMessage: "",
      error: false,
      password: null,
      RememberMe: false,
      showPass: true,
    };
  },

  methods: {
    showPassword() {
      this.showPass = !this.showPass;
    },
    loginWithGoogle() {
      window.location.href = "https://app.nexmind.nexodn.com/google/redirect";
    },
    loginWithMicrosoft() {
      window.location.href =
        "https://app.nexmind.nexodn.com/microsoft/redirect";
    },
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
    loginJWT() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = {
            email: this.email,
            password: this.password,
          };

          Auth.loginJWT(payload)
            .then((response) => {
              // //
              this.$toast.success(response.data.message);
              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });

              let loader = this.$loading.show({
                // Optional parameters
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
              });

              if (localStorage.userInfo == undefined) {
                var timer = setInterval(() => {
                  if (localStorage.userInfo != undefined) {
                    clearInterval(timer);
                    if (
                      JSON.parse(localStorage.userInfo).type != "agent_client"
                    ) {
                      this.$router.push({ name: "Dashboard" });
                    } else {
                      this.$router.push({ name: "agent_client" });
                    }

                    loader.hide();
                  } else {
                    //  //
                  }
                }, 5000);
              } else {
                if (JSON.parse(localStorage.userInfo).type != "agent_client") {
                  this.$router.push({ name: "Dashboard" });
                } else {
                  this.$router.push({ name: "agent_client" });
                }
                loader.hide();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    forget() {
      this.$router.push({ name: "enter_email" });
    },

    showPassword() {
      this.showPass = !this.showPass;
    },
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    localStorage.removeItem("nexwriter_guide");
    localStorage.removeItem("checkbox");
    localStorage.removeItem("keyword_pool");
    localStorage.removeItem("nexmind_live_editor_to_get");
    localStorage.removeItem("nexmind_live_editor_title");
    localStorage.removeItem("nexmind_live_editor_description");
    localStorage.removeItem("nexmind_live_editor_save_changes");
    localStorage.removeItem("nexmind_live_editor_variant");
    localStorage.removeItem("nexmind_live_editor_editor");
    localStorage.removeItem("nexmind_live_editor_to_pass");

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(urlParams);
    console.log(token);

    if (token) {
      localStorage.setItem("accessToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(axios.defaults.headers.common["Authorization"]);
      axios
        .get("me")
        .then((res) => {
          loader.hide();
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          localStorage.setItem(
            "permissions",
            JSON.stringify(res.data.data.permissions)
          );
          const thisUser = res.data.data;
          let role = "editor";
          Object.assign(thisUser, { userRole: role });

          axios
            .get("nexrank-client")
            .then((res) => {
              var project = [];
              res.data.data.forEach((element) => {
                project.push({ id: element.id, name: element.name });
              });
              localStorage.setItem("nexrank_client", JSON.stringify(project));
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .get("locations")
            .then((res) => {
              let index_ca = res.data.data.findIndex(
                (element) => element.name == "www.google.ca"
              );
              res.data.data.splice(index_ca, 1);
              let index_vn = res.data.data.findIndex(
                (element) => element.name == "www.google.com.vn"
              );
              res.data.data.splice(index_vn, 1);

              var locations = [];

              res.data.data.forEach((element, index) => {
                if (element.name == "www.google.com") {
                  locations.push(element);
                }
              });

              res.data.data.forEach((element, index) => {
                if (element.name != "www.google.com") {
                  locations.push(element);
                }
              });

              localStorage.setItem("locations", JSON.stringify(locations));
            })
            .catch((error) => {
              console.log(error);
            });

          if (JSON.parse(localStorage.userInfo).type != "agent_client") {
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$router.push({ name: "agent_client" });
          }
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    } else if (localStorage.getItem("accessToken")) {
      loader.hide();
      const token = localStorage.getItem("accessToken");
      const token_broken = jwt_decode(token);
      if (Date.now() < token_broken.exp * 1000) {
        loader.hide();
        if (JSON.parse(localStorage.userInfo).type != "agent_client") {
          this.$router.push({ name: "Dashboard" });
        } else {
          this.$router.push({ name: "agent_client" });
        }
      }
    } else {
      loader.hide();
    }
  },
};
</script>

<style lang="css" scoped>
hr {
  color: #818181;
  width: 100%;
  margin: 0rem;
}
.login-form-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1rem;
  /* min-width: 350px; */
  /* min-height: 300px; */
  width: 350px;
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