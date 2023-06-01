<template>
  <!-- Reena: SignUp page here -->
  <div class="signup-wrapper">
    <div class="login-form-card">
      <h3 class="fw-bolder color-dblue text-center">Sign Up to NexMind</h3>
      <div class="mb-4 color-dblue text-center">
        <small class="">Already have an account?</small>
        <small class="ms-1">
          <a href="https://www.nexmind.ai/payment-form-nexmind-monthly-plan-59/" class="color-dblue fw-bolder td-underline">Login</a>
          to NexMind
        </small>
      </div>
      <button class="btn btn-white mb-2" @click="loginWithGoogle">
        <img class="me-auto" src="@/assets/authentication/icon-google.png" style="width: 25px" />
        <span class="me-auto">Sign Up with Google</span>
      </button>
      <button class="btn btn-white mb-2" @click="loginWithMicrosoft">
        <img class="me-auto" src="@/assets/authentication/icon-microsoft365.png" style="width: 25px" />
        <span class="me-auto">Sign Up with Microsoft 365</span>
      </button>
      <!-- <div class="d-flex align-items-center my-2">
        <hr />
        <span class="mx-2">or</span>
        <hr />
      </div> -->
      <small class="color-dblue fw-bold">First Name</small>
      <div class="login input-group mt-1 mb-2">
        <input
          type="text"
          autocorrect="off"
          autocomplete="off"
          name="fname"
          v-validate="'required'"
          class="form-control input-blue"
          v-model="fname"
          aria-label="fname"
          aria-describedby="fname"
        />
        <span class="text-danger text-sm" v-show="errors.has('fname')">{{ errors.first("fname") }}</span>
      </div>

      <small class="color-dblue fw-bold">Last Name</small>
      <div class="login input-group mt-1 mb-2">
        <input
          type="text"
          autocorrect="off"
          autocomplete="off"
          name="lname"
          v-validate="'required'"
          class="form-control input-blue"
          v-model="lname"
          aria-label="lname"
          aria-describedby="lname"
        />
        <span class="text-danger text-sm" v-show="errors.has('lname')">{{ errors.first("lname") }}</span>
      </div>

      <small class="color-dblue fw-bold">Email</small>
      <div class="login input-group mt-1 mb-2">
        <input
          type="text"
          autocorrect="off"
          autocomplete="off"
          name="email"
          v-validate="'required'"
          class="form-control input-blue"
          v-model="email"
          aria-label="email"
          aria-describedby="email"
        />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>
      </div>

      <small class="color-dblue fw-bold">Country</small>
      <div class="login input-group mt-1 mb-2">
        <select class="form-select input-blue w-100" aria-label="location" v-model="location" name="location">
          <option :value="loc.id" :key="index" v-for="(loc, index) in locations">
            {{ loc.name | loc }}
          </option>
        </select>
        <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first("country") }}</span>
      </div>

      <small class="color-dblue fw-bold">How did you hear about us?</small>
      <div class="login input-group mt-1 mb-2">
        <input
          type="text"
          autocorrect="off"
          autocomplete="off"
          name="remark"
          v-validate="'required'"
          class="form-control input-blue"
          v-model="remark"
          aria-label="remark"
          aria-describedby="remark"
        />
        <span class="text-danger text-sm" v-show="errors.has('remark')">{{ errors.first("remark") }}</span>
      </div>
      <!-- <small class="mb-5 text-primary" style="cursor: pointer" @click="showPassword"> <small v-if="showPass">Show </small><small v-else>Hide </small>Password</small>

      <div class="d-flex flex-row-reverse">
        <small><a @click="forget" href="" class="text-muted">Forgot Password?</a></small>
      </div> -->

      <button class="btn btn-signup mt-3">Sign Up Now</button>

      <div class="mt-3 color-dblue d-flex align-items-center">
        <input type="checkbox" id="termsandconditions" name="1" value="1" class="checkbox-tnc" />
        <small class="ms-2">I have read and agreed to the <a href="">Terms and Conditions</a> </small>
      </div>
    </div>
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
      locations: JSON.parse(localStorage.locations),
      location: "",
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
      window.location.href = "https://app.nexmind.nexodn.com/microsoft/redirect";
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
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                    if (JSON.parse(localStorage.userInfo).type != "agent_client") {
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
          localStorage.setItem("permissions", JSON.stringify(res.data.data.permissions));
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
              let index_ca = res.data.data.findIndex((element) => element.name == "www.google.ca");
              res.data.data.splice(index_ca, 1);
              let index_vn = res.data.data.findIndex((element) => element.name == "www.google.com.vn");
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
.signup-wrapper {
  background-color: #fff;
  height: 100vh;
  width: 50vw;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.color-dblue {
  color: #094890;
  font-family: "Segoe UI";
}
.fw-bold {
  font-weight: 500 !important;
}
.fw-bolder {
  font-weight: 700 !important;
}
.td-underline {
  text-decoration: underline;
}
hr {
  color: #818181;
  width: 100%;
  margin: 0rem;
}
.login-form-card {
  background-color: #ffffff;
  border-radius: 10px;
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
  /* border-radius: 6px !important; */
  width: 100%;
}

.btn-signup {
  background-color: #094890;
  color: #fff;
  border-radius: 12px;
  transition: 0.4s ease-out;
}

.btn-signup:hover {
  background-color: #073b76;
  color: #fff;
  border-radius: 12px;
  transition: 0.4s ease-out;
}

.input-blue {
  border-radius: 12px !important;
  border: 2px solid #094890;
}
.checkbox-tnc {
  height: 20px;
  width: 20px;
  accent-color: #2c8ee1;
  border-color: #2c8ee1;
}
</style>
