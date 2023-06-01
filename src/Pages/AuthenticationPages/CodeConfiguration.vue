<template>
  <div class="form-card">
    <h4>Create Account</h4>
    <div class="row">
      <div class="col-10">
        <div class="input-group my-2">
          <input
            type="text"
            autocorrect="off"
            autocomplete="off"
            name="redeem"
            v-validate="'required'"
            class="form-control rounded"
            placeholder="* Reedem Code"
            v-model="redeem"
         
          />
          <span class="text-danger text-sm" v-show="errors.has('redeem')">{{
            errors.first("redeem")
          }}</span>
        </div>
      </div>
      <div class="col-2">
        <button @click="AddData" class="btn btn-primary mt-2">Add Codes</button>
      </div>
    </div>

    <div class="row" :key="index" v-for="(item, index) in more_codes">
      <div class="col-10">
        <div class="input-group my-2">
          <input
            type="text"
            autocorrect="off"
            autocomplete="off"
            name="more_redeem"
            class="form-control rounded"
            placeholder="* More Reedem Code"
            v-model="item.code"
           
          />
        </div>
      </div>
      <div class="col-2">
        <button @click="removeData(index)" class="btn btn-primary-outlined mt-2">Remove</button>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="input-group my-2">
          <input
            autocorrect="off"
            autocomplete="off"
            type="email"
            v-model="email"
            id="email"
            name="email"
            placeholder="* Business Email"
            v-validate="'required'"
            class="form-control rounded"
         
          />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{
            errors.first("email")
          }}</span>
        </div>
        <div class="input-group my-2">
          <input
            autocorrect="off"
              autocomplete="off"
              type="text"
              v-model="name"
              id="name"
              name="name"
              placeholder="* Name"
              v-validate="'required'"
            class="form-control rounded"
        
          />
           <span
              style="display: block"
              class="text-danger text-sm"
              v-show="errors.has('name')"
              >{{ errors.first("name") }}</span
            >
        </div>

        <div class="input-group my-2">
          <input
             autocorrect="off"
              autocomplete="off"
              type="text"
              v-model="website"
              id="website"
              name="website"
              placeholder="* Website"
              v-validate="{ required: true, url: { require_protocol: true } }"
            class="form-control rounded"
            
          />
           <span
              style="display: block"
              class="text-danger text-sm "
              v-show="errors.has('website')"
              >{{ errors.first("website") }}</span
            >
        </div>

        <div class="input-group my-2">
          <div class="input-group-prepend">
           <vue-country-code
              @onSelect="onSelect"
              :preferredCountries="['vn', 'us', 'gb']"
              class="prepend-style"
            >
            </vue-country-code>
          </div>
          <input
            autocorrect="off"
              autocomplete="off"
              type="text"
              v-model="Contact"
              id="Contact"
              name="Contact"
              placeholder="* Contact Number"
              v-validate="'required'"
              class="form-control rounded-end"
          />
          <span
              style="display: block"
              class="text-danger text-sm"
              v-show="errors.has('Contact')"
              >{{ errors.first("Contact") }}</span
            >
        </div>
        <div class="input-group my-2">
          <input
             autocorrect="off"
              autocomplete="off"
              type="password"
              v-model="password"
              id="password"
              name="password"
              placeholder="* Password"
              v-validate="'required'"
              class="form-control rounded"
          />
            <span
              style="display: block"
              class="text-danger text-sm "
              v-show="errors.has('password')"
              >{{ errors.first("password") }}</span
            >
        </div>

        <div class="input-group my-2">
           <input
              autocorrect="off"
              autocomplete="off"
              type="password"
              v-model="password_confirmation"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="* Password Confirmation"
              v-validate="'required'"
              class="form-control rounded"
            />
         <span
              style="display: block"
              class="text-danger text-sm "
              v-show="errors.has('password_confirmation')"
              >{{ errors.first("password_confirmation") }}</span
            >
        </div>
      </div>

      <div class="col-6">
        <div class="input-group my-2">
          <input
              autocorrect="off"
              autocomplete="off"
              type="text"
              v-model="company_name"
              id="company"
              name="company"
              placeholder="* Company Name"
              v-validate="'required'"
              class="form-control rounded"
            />

            <span
              style="display: block"
              class="text-danger text-sm "
              v-show="errors.has('company')"
              >{{ errors.first("company") }}</span
            >
        </div>
        <div class="input-group my-2">
         <input
              autocorrect="off"
              autocomplete="off"
              type="text"
              v-model="industry"
              id="industry"
              name="industry"
              placeholder="* Industry"
              v-validate="'required'"
              class="form-control rounded"
            />

            <span
              style="display: block"
              class="text-danger text-sm"
              v-show="errors.has('industry')"
              >{{ errors.first("industry") }}</span
            >
        </div>

        <div class="input-group my-2">
          <select
              class="form-select w-100 rounded text-muted"
              id="country"
              name="country"
              v-model="countryChosen"
              v-validate="{ is_not: '* Country' }"
              @change="chooseCountry(countryChosen)"
            >
              <option hidden>* Country</option>
              <option
                :value="con"
                :key="index"
                v-for="(con, index) in Countries"
              >
                {{ con.name }}
              </option>
            </select>

            <span
              style="display: block"
              class="text-danger text-sm"
              v-show="errors.has('country')"
              >{{ errors.first("country") }}</span
            >
        </div>

        <div class="input-group my-2">
            <select
              class="form-select w-100 rounded text-muted"
              v-model="chosenState"
              id="state"
              name="state"
              v-validate="{ is_not: '* State' }"
              @change="chooseState(chosenState)"
            >
              <option hidden>* State</option>
              <option disabled v-if="chosenState == '* State'">
                --Please select your Country--
              </option>
              <option disabled v-if="chosenState == undefined">
                --No State--
              </option>
              <option :value="con" :key="index" v-for="(con, index) in States">
                {{ con.name }}
              </option>
            </select>

            <span
              style="display: block"
              class="text-danger text-sm"
              v-show="errors.has('state')"
              >{{ errors.first("state") }}</span
            >
        </div>
        <div class="input-group my-2">
          <select
              class="form-select w-100 rounded text-muted"
              v-model="ChosenCity"
              id="city"
              name="city"
              v-validate="{ is_not: '* City' }"
            >
              <option hidden>* City</option>
              <option disabled v-if="ChosenCity == '* City'">
                --Please select your State--
              </option>
              <option disabled v-if="ChosenCity == undefined">
                --No City--
              </option>
              <option :value="con" :key="index" v-for="(con, index) in cities">
                {{ con.name }}
              </option>
            </select>

            <span
              style="display: block"
              class="text-danger text-sm"
              v-show="errors.has('city')"
              >{{ errors.first("city") }}</span
            >
      </div>
    </div>
    </div>

    <button @click="SignUp" class="btn btn-primary btn-signin my-3">
      Create Your Account
    </button>

    <span style="font-size: 14px; cursor: pointer; color: grey">
      By creating an account, you acknowledge and agree to our
      <a class="text-primary" @click="goToTerms">Terms of Service</a> and
      <a class="text-primary" @click="goToPrivacy">Privacy Policy</a>. You also
      agree to receive product-related marketing emails from NexMind, which you
      can unsubscribe from at any time
    </span>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import { Country, State, City } from "country-state-city";

export default {
  data() {
    return {
      token: this.$route.query.token,
      website: "",
      company_name: "",
      country: "",
      state: "",
      industry: "",
      name: "",
      email: "",
      redeem: "",
      password: "",
      location: [3],
      Contact: "",
      countryCode: "",
      password_confirmation: "",
      //       locations: [{id: 1, name: "www.google.com.my"},
      // {id: 3, name: "www.google.com"},
      //  {id: 4, name: "www.google.com.au"},
      // {id: 5, name: "www.google.com.sg"}],
      locations: [],
      tokenLogin: "",
      addCode: false,
      more_codes: [],
      Countries: Country.getAllCountries(),
      countryChosen: "* Country",
      States: [],
      chosenState: "* State",
      ChosenCity: "* City",
      cities: [],
      city: "",
    };
  },
  components: {
    Country,
    State,
    City,
  },
  methods: {
    chooseCountry(data) {
      this.States = State.getStatesOfCountry(data.isoCode);

      this.chosenState = this.States[0];

      if (this.chosenState == undefined) {
        this.cities = [];
        this.ChosenCity = undefined;
      } else {
        this.cities = City.getCitiesOfState(
          data.isoCode,
          this.chosenState.isoCode
        );

        this.ChosenCity = this.cities[0];
      }
    },
    chooseState(data) {
      if (data == undefined) {
        this.cities = [];
        this.ChosenCity = undefined;
      } else {
        this.cities = City.getCitiesOfState(
          this.countryChosen.isoCode,
          data.isoCode
        );

        this.ChosenCity = this.cities[0];
      }
    },
    AddData() {
      // TODO: add maximum of 3 only
      this.addCode = true;
      this.more_codes.push({
        code: "",
      });
    },
    removeData(index) {
      this.more_codes.splice(index, 1);

      if (this.more_codes.length == 0) {
        this.addCode = false;
      }
    },

    onSelect({ name, iso2, dialCode }) {
      //
      this.countryCode = dialCode;
    },

   
    goToPrivacy() {
      // this.$router.push({ name: "PrivatePolicy" });
      window.open("https://www.nexmind.ai/privacy-policy/");
    },
    goToTerms() {
      //this.$router.push({ name: "TermsOfServices" });
      window.open("https://www.nexmind.ai/terms-of-use/");
    },
    SignUp() {
      this.country = this.countryChosen.name;

      if (this.chosenState != undefined) {
        this.state = this.chosenState.name;
      } else {
        this.state = "";
      }

      if (this.ChosenCity != undefined) {
        this.city = this.ChosenCity.name;
      } else {
        this.city = "";
      }

      if (this.password === this.password_confirmation) {
        var obj = {};
        if (this.more_codes.length == 0) {
          obj = {
            website: this.website,
            company_name: this.company_name,
            country: this.country,
            state: this.state,
            industry: this.industry,
            locations: this.location,
            name: this.name,
            email: this.email,
            code: this.redeem,
            password: this.password,
            country_code: this.countryCode,
            phone: this.Contact,
            city: this.city,
          };
        } else {
          var other_codes = [];

          this.more_codes.forEach((element) => {
            if (element.code != "") {
              other_codes.push(element.code);
            }
          });

          if (other_codes.length == 0) {
            obj = {
              website: this.website,
              company_name: this.company_name,
              country: this.country,
              state: this.state,
              industry: this.industry,
              locations: this.location,
              name: this.name,
              email: this.email,
              code: this.redeem,
              password: this.password,
              country_code: this.countryCode,
              phone: this.Contact,
              city: this.city,
            };
          } else {
            obj = {
              website: this.website,
              company_name: this.company_name,
              country: this.country,
              state: this.state,
              industry: this.industry,
              locations: this.location,
              name: this.name,
              email: this.email,
              code: this.redeem,
              password: this.password,
              country_code: this.countryCode,
              phone: this.Contact,
              other_codes: other_codes,
              city: this.city,
            };
          }
        }

        //
        var succ = false;
        // //
        this.$validator.validateAll().then((result) => {
          if (result) {
            let loader = this.$loading.show({
              // Optional parameters
              container: this.fullPage ? null : this.$refs.formContainer,
              canCancel: true,
              onCancel: this.onCancel,
            });

            Auth.ConfigureRedeemAccount(obj)
              .then((response) => {
                //

                this.tokenLogin = response.data.data.token;
                var site =
                  "https://www.app.nexmind.ai/login" +
                  `?token=` +
                  this.tokenLogin;
                window.open(site, "_self");
              })
              .catch((error) => {
                loader.hide();

                if (error.response.data.data.code != undefined) {
                  this.$toast.error(error.response.data.data.code)

                  // this.$bvToast.toast(error.response.data.data.code, {
                  //   title: "Error",
                  //   variant: "danger",
                  //   toaster: "b-toaster-bottom-left",
                  //   solid: true,
                  // });
                }
              });
          }
        });
      } else {
        this.$toast.error("Password and Confirm password does not match")

        // this.$bvToast.toast("Password and Confirm password does not match", {
        //   title: "Error",
        //   variant: "danger",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
      }
    },
  },
  created() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");

    //
    //
    //
    // KeywordAnalyzer.fetchAllLocations()
    //   .then((response) => {
    //     // //
    //     this.locations = response.data.data;

    //   })
    //   .catch((error) => {
    //
    //   });
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
  width: 900px;
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
/* .login.input-group {
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
} */
.input-group-prepend .prepend-style{
  border-top-left-radius: 6px; border-bottom-left-radius: 6px; border-bottom-right-radius: 0px; border-top-right-radius: 0px; height: 38px; border-color: #CED4DA;
}

</style>