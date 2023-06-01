<template>
  <div>
    <div class="container pt-2 pb-4">
      <div class="route__linkpath my-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'settings',
              params: { feature: 'saas_clients' },
            }"
            class="route__link"
            >View All
          </router-link>
          / SaaS Client
        </p>
      </div>
      <div class="nexcard mt-3">
        <div class="row">
          <div class="col-4">
            <div class="card-text">
              <span for="fname">Manager Name</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.manager_name" type="text" id="manager_name" name="manager_name" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('manager_name')">{{ errors.first("manager_name") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Company Name</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.company_name" type="text" id="company_name" name="company_name" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('company_name')">{{ errors.first("company_name") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Country</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.country" type="text" id="country" name="country" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first("country") }}</span>
            </div>
          </div>

          <div class="col-4">
            <div class="card-text">
              <span for="fname">Email</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.manager_email" type="email" id="manager_email" name="manager_email" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('manager_email')">{{ errors.first("manager_email") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Expiry Date</span>
            </div>
            <div class="card-text">
              <b-form-datepicker id="example-datepicker" v-model="expiry_date" class="w-100" menu-class="w-100" calendar-width="100%"></b-form-datepicker>
            </div>
            <div class="card-text">
              <span for="fname">Industry</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.industry" type="text" id="industry" name="industry" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('industry')">{{ errors.first("industry") }}</span>
            </div>
          </div>

          <div class="col-4">
            <div class="card-text">
              <span for="fname">State</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.state" type="text" id="state" name="state" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('state')">{{ errors.first("state") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Website</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.website" type="text" id="website" name="website" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('website')">{{ errors.first("website") }}</span>
            </div>
          </div>
        </div>

        <div class="card-text">
          <span for="fname">Locations</span>
        </div>

        <div class="card-text">
          <div class="row g-0 selectwidget__row">
            <div class="selectwidget__wrapper col-auto" v-for="(loc, index) in locations" :key="'locations' + index">
              <input :id="loc.id" type="checkbox" :value="loc.id" v-model="showClients" @change="choseClient(showClients)" style="display: none" />
              <label :for="loc.id" class="selectwidget__checkbox__wrapper">
                <div class="selectwidget__checkbox">
                  <h6>{{ loc.name | loc }}</h6>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard mt-3">
        <div class="row">
          <div class="col-4">
            <div class="card-text">
              <span for="fname">Analyzer Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.count_campaigns" type="text" id="count_campaigns" name="count_campaigns" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('count_campaigns')">{{ errors.first("count_campaigns") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Account/Sub Account Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.users_qouta" type="text" id="users_quota" name="users_quota" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('users_quota')">{{ errors.first("users_quota") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Optimization Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.website_scanner" type="text" id="website_scanner" name="website_scanner" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('website_scanner')">{{ errors.first("website_scanner") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">AI Content Generator Credits</span>
            </div>

            <div class="card-text">
              <b-form-input
                autocorrect="off"
                autocomplete="off"
                v-model="data_local.paragraph_content_generation"
                type="text"
                id="paragraph_content_generation"
                name="paragraph_content_generation"
                v-validate="'required'"
              />
              <span class="text-danger text-sm" v-show="errors.has('paragraph_content_generation')">{{ errors.first("paragraph_content_generation") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Enterprise SEO Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.indexability" type="text" id="indexability" name="indexability" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('indexability')">{{ errors.first("indexability") }}</span>
            </div>
          </div>

          <div class="col-4">
            <div class="card-text">
              <span for="fname">Tracker Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.keywords_qouta" type="text" id="keywords_quota" name="keywords_quota" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('keywords_quota')">{{ errors.first("keywords_quota") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Content Credits</span>
            </div>

            <div class="card-text">
              <b-form-select v-model="selectContent" :options="contents" class="form-select"></b-form-select>
            </div>

            <div class="card-text">
              <span for="fname">AI SEO Automation Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.nex_automate" type="text" id="nex_automate" name="nex_automate" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('nex_automate')">{{ errors.first("nex_automate") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Page Speed Insight Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.page_speed" type="text" id="page_speed" name="page_speed" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('page_speed')">{{ errors.first("page_speed") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Discovery Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.keyword_query" type="text" id="keyword_query" name="keyword_query" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('keyword_query')">{{ errors.first("keyword_query") }}</span>
            </div>
          </div>

          <div class="col-4">
            <div class="card-text">
              <span for="fname">Projects Credits</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.domains_quota" type="text" id="domains_quota" name="domains_quota" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('domains_quota')">{{ errors.first("domains_quota") }}</span>
            </div>

            <div v-if="selectContent == 'Essential Only'">
              <div class="card-text">
                <span for="fname">Essential</span>
              </div>

              <div class="card-text">
                <b-form-input
                  autocorrect="off"
                  autocomplete="off"
                  v-model="data_local.essential_content_generation"
                  type="text"
                  id="essential_content_generation"
                  name="essential_content_generation"
                  v-validate="'required'"
                />
                <span class="text-danger text-sm" v-show="errors.has('essential_content_generation')">{{ errors.first("essential_content_generation") }}</span>
              </div>
            </div>

            <div v-if="selectContent == 'Essential with Paragraph'">
              <div class="card-text" v-if="selectContent == 'Essential with Paragraph'">
                <span for="fname">Essential with Paragraph</span>
              </div>

              <div class="card-text">
                <b-form-input
                  autocorrect="off"
                  autocomplete="off"
                  v-model="data_local.essential_and_paragraph_content_generation"
                  type="text"
                  id="essential_and_paragraph_content_generation"
                  name="essential_and_paragraph_content_generation"
                  v-validate="'required'"
                />
                <span class="text-danger text-sm" v-show="errors.has('essential_and_paragraph_content_generation')">{{ errors.first("essential_and_paragraph_content_generation") }}</span>
              </div>
            </div>

            <div class="card-text">
              <span for="fname">Monthly Price</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.monthly_renew_price" type="text" id="monthly_renew_price" name="monthly_renew_price" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('monthly_renew_price')">{{ errors.first("monthly_renew_price") }}</span>
            </div>

            <div class="card-text">
              <span for="fname">Annual Price</span>
            </div>

            <div class="card-text">
              <b-form-input autocorrect="off" autocomplete="off" v-model="data_local.annually_renew_price" type="text" id="annually_renew_price" name="annually_renew_price" v-validate="'required'" />
              <span class="text-danger text-sm" v-show="errors.has('annually_renew_price')">{{ errors.first("annually_renew_price") }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card-text d-flex flex-row-reverse ms-auto">
        <button class="btn btn-primary my-3" v-if="permissions.includes('Saas-Client.store')" @click="save_changes">Edit SaaS Client</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Saas from "@/store/SaaS.js";
import Auth from "@/store/Auth.js";

export default {
  data() {
    return {
      selectedLocations: [],
      data_local: [],
      format: "yyyy-MM-dd",
      expiry_date: "",
      loc: [],
      locations: JSON.parse(localStorage.locations),
      permissions: [],
      select: "",

      ObjSub: [],
      showClients: [],

      labels: [],
      isRemove: false,

      contents: ["Essential Only", "Essential with Paragraph"],
      selectContent: "Essential Only",
    };
  },
  methods: {
    choseClient(data) {
      console.log(this.showClients);
      // var dup = false;

      // if (this.showClients.length != 0) {
      //   this.showClients.forEach((element) => {
      //     if (element.id == data.id) {
      //       dup = true;
      //     }
      //   });

      //   if (dup == false) {
      //     this.showClients.push(data);
      //   }
      // } else {
      //   this.showClients.push(data);
      // }

      //
    },

    formatDate(date) {
      let d = new Date(date),
        month = `${d.getMonth() + 1}`,
        day = `${d.getDate()}`,
        year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    },

    save_changes() {
      // this.showClients.forEach((element) => this.selectedLocations.push(element.id));
      //   //
      this.data_local.locations = this.showClients;
      //   //
      this.data_local.expiry_date = this.formatDate(this.expiry_date);

      this.data_local.keywords_quota = this.data_local.keywords_qouta;

      //

      if (this.selectContent == "Essential Only") {
        this.data_local.essential_and_paragraph_content_generation = 0;
      } else {
        this.data_local.essential_content_generation = 0;
      }

      const arr = [];

      this.labels.forEach((element) => {
        ////
        arr.push(element.keyword);
      });

      this.data_local.labels = arr;

      //
      Saas.updateSaaSClient(this.data_local)
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
        })
        .catch((err) => {
          console.log(err);
        });
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
    Saas.fetchSaaSClient(this.$route.params.id).then((response) => {
      loader.hide();
      //  //
      this.data_local = response.data;

      (this.expiry_date = this.data_local.expiry_date),
        this.data_local.locations.forEach((element) => {
          this.showClients.push(element.id);
        });

      console.log(this.showClients);

      if (this.data_local.labels.length > 1) {
        this.isRemove = true;
      }

      this.data_local.labels.forEach((element) => {
        this.labels.push({ keyword: element });
      });

      //    this.data_local.locations.forEach((element) => {
      //                   this.locations.forEach((client) => {
      //                     // //
      //                     if (element == client.id) {

      //                        this.showClients.push(client);
      //                     }
      //                   });
      //                 });
    });

    //
  },
};
</script>

<style scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 0.5rem 1rem 1rem 1rem;
}
.card-text {
  margin-top: 0.5rem;
}

/* select widget css */
.selectwidget__row {
  display: flex;
  align-items: center;
}
.selectwidget__wrapper {
  margin-right: 0.5rem;
  height: 45px;
}
.selectwidget__checkbox {
  border-radius: 10px;
  padding: 0.4rem 1rem;
}
.selectwidget__checkbox h6 {
  font-weight: 500 !important;
  white-space: nowrap !important;
}
.selectwidget__wrapper input ~ label {
  border-color: #dce8f6 !important;
  background-color: #dce8f6 !important;
  border-radius: 20px !important;
  margin: 0px !important;
}
.selectwidget__wrapper input ~ label h6 {
  color: #545353 !important;
}
.selectwidget__wrapper input:checked ~ label {
  border-color: #2c8de0 !important;
  background-color: #2c8de0 !important;
}
.selectwidget__wrapper input:checked ~ label h6 {
  color: #fff !important;
}
.selectwidget__checkbox:hover {
  background-color: #c7dffa !important;
}
.selectwidget__wrapper input:checked ~ label .selectwidget__checkbox:hover {
  background-color: #2c8de0 !important;
}

.selectwidget__checkbox:hover ~ label h6 {
  color: #545353 !important;
}
</style>
