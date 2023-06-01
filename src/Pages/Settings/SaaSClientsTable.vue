<template>
  <div>
    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / SaaS Clients
        </p>
      </div>
      <div class="nexcard">
        <!--Search and Add Content button -->
        <div class="d-flex mb-4">
          <div>
            <div class="search input-group">
              <span class="input-group-prepend">
                <div class="input-group-text bg-transparent">
                  <span class="material-icons-outlined">search</span>
                </div>
              </span>
              <input type="search" id="form1" class="form-control border-left-0" placeholder="Search" autocorrect="off" autocomplete="off" @input="searchWord" v-model="search_word" />
            </div>
          </div>
          <div class="ms-auto">
            <router-link class="button" to="/settings/saas_clients/add_saas_client">
              <button class="btn btn-primary">Add SaaS Client</button>
            </router-link>
          </div>
        </div>

        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="title w-5 status w-5"><p>Status</p></div>
            <div class="title w-15"><p>Company Name</p></div>
            <div class="title w-20"><p>Email</p></div>
            <div class="title w-7-5 ps-1"><p>Created Date</p></div>
            <div class="title w-7-5 ps-1"><p>Expiry Date</p></div>
            <div class="title w-20"><p>Plan</p></div>
            <div class="title w-10"><p>Label</p></div>
            <div class="title w-10"><p>Reedem Code</p></div>
            <div class="title action w-5"><p>Action</p></div>
          </div>

          <div class="nextable__body1">
            <div class="row nextable__row g-0" v-for="(item, index) in Employees" :key="'employees' + index">
              <div class="status w-5 item">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="activeSwitch" @change="changeStatus(item)" v-model="item.statusActive" />
                  <label class="form-check-label" for="activeSwitch">
                    <span v-if="item.statusActive" class="text-success">Active</span>
                    <span v-else class="text-danger">Inactive</span>
                  </label>
                </div>
              </div>
              <div class="w-15 item">
                <p>{{ item.company_name }}</p>
              </div>
              <div class="w-20 item">
                <p>{{ item.manager_email }}</p>
              </div>
              <div class="w-7-5 item ps-1">
                <p>{{ item.created_at | formatDate }}</p>
              </div>
              <div class="w-7-5 item ps-1">
                <p>{{ item.expiry_date | formatDate }}</p>
              </div>
              <div class="w-20 item">
                <p>{{ item.plan_name | plans }}</p>
              </div>
              <div class="w-10 item">
                <div v-for="(lab, index) in item.labels" :key="index" style="list-style-type=none">
                  <span style="font-size: 0.8rem"> {{ lab }}, <br /></span>
                </div>
              </div>

              <div class="w-10 item">
                <span v-if="item.redeem_code != 0" style="font-size: 0.8rem; word-break: break-all">{{ item.redeem_code }}</span>
                <span v-else style="font-size: 0.8rem">No Code</span>
              </div>

              <div class="w-5 item action">
                <router-link
                  class="button td-none"
                  :to="{
                    name: 'edit_saas_client',
                    params: { id: item.id },
                  }"
                >
                  <button class="btn btn-primary d-flex align-items-center p-2" v-b-tooltip.hover.left="{ variant: 'primary' }" title="Edit">
                    <span class="material-icons-outlined">edit</span>
                  </button>
                </router-link>
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
import Saas from "@/store/SaaS.js";
import Auth from "@/store/Auth.js";
export default {
  data() {
    return {
      permissions: [],
      showModal: false,
      Employees: [],
      name: "",
      email: "",
      password: "",
      is_manager: false,
      count_campaigns: 0,
      search_word: "",
      filterEmployee: [],
    };
  },
  methods: {
    exportToExceltop() {
      var printEmployee = [];

      this.Employees.forEach((element, index) => {
        printEmployee.push(element);
        printEmployee[index]["Analyzer Credits"] = element.count_campaigns - element.free_keyword_analyzer_quota + "/" + element.free_keyword_analyzer_quota;
        printEmployee[index]["Projects Credits"] = element.used_domains_quota + "/" + element.domains_quota;
        printEmployee[index]["SEO Automation Credits"] = element.used_nex_automate_quota + "/" + element.nex_automate;
        printEmployee[index]["Page Speed Insight Credits"] = element.used_page_speed_quota + "/" + element.page_speed;
        printEmployee[index]["Content Credits"] = element.used_content_generation_quota + "/" + element.essential_content_generation;
        printEmployee[index]["Tracker Credits"] = element.used_keywords_qouta + "/" + element.keywords_qouta;
        printEmployee[index]["Queries Credits"] = element.used_keyword_query_quota + "/" + element.keyword_query;
        printEmployee[index]["Optimization Credits"] = element.used_website_scanner_quota + "/" + element.website_scanner;
        printEmployee[index]["AI Content Generator Credits"] = element.used_nexwriter_quota + "/" + element.paragraph_content_generation;
        printEmployee[index]["Enterprise SEO Credits"] = element.used_indexability_quota + "/" + element.indexability;
      });

      //

      import("@/vendor/Export2Excel").then((excel) => {
        const list = printEmployee;

        const data = this.formatJson(
          [
            "statusActive",
            "company_name",
            "created_at",
            "expiry_date",
            "website",
            "plan_name",
            "labels",
            "redeem_code",
            "manager_email",
            "country",
            "Analyzer Credits",
            "Projects Credits",
            "SEO Automation Credits",
            "Page Speed Insight Credits",
            "Content Credits",
            "Tracker Credits",
            "Queries Credits",
            "Optimization Credits",
            "AI Content Generator Credits",
            "Enterprise SEO Credits",
          ],
          list
        );
        excel.export_json_to_excel({
          header: [
            "Status",
            "Full Name",
            "Created Date",
            "Expiry Date",
            "Website",
            "Plan",
            "Labels",
            "Reedem Code",
            "Email",
            "Country",
            "Analyzer Credits",
            "Projects Credits",
            "SEO Automation Credits",
            "Page Speed Insight Credits",
            "Content Credits",
            "Tracker Credits",
            "Queries Credits",
            "Optimization Credits",
            "AI Content Generator Credits",
            "Enterprise SEO Credits",
          ],
          data,
          filename: "SaaS-Client",
          autoWidth: false,
          bookType: "csv",
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          // Add col name which needs to be translated
          // if (j === 'timestamp') {
          //   return parseTime(v[j])
          // } else {
          //   return v[j]
          // }

          return v[j];
        })
      );
    },

    addSaaS() {
      this.$router.push({
        name: "AddSaaS",
      });
    },
    edit(data) {
      this.$router.push({ name: "EditSaaS", params: { id: data } });
    },
    view(data) {
      this.$router.push({ name: "ViewSaaS", params: { id: data } });
    },
    changeStatus(data) {
      //

      this.Employees.forEach((element) => {
        if (element.id == data.id) {
          //

          if (element.statusActive == false) {
            // element.statusActive = false;

            delete element.statusActive;

            Saas.removeSaaSClient(element.id)

              .then(() => {
                this.assignEmployee();
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            // //
            // element.statusActive = true;

            delete element.statusActive;

            Saas.ActivateSaaSClient(element.id)

              .then(() => {
                this.assignEmployee();
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      });
      // //
    },

    searchWord() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities(1);
      }, 500);
    },

    getActivities() {
      // //
      this.search_word = this.search_word.toLowerCase();

      if (this.search_word == null) {
        // //
        this.Employees = this.allEmployees;
      } else {
        // //

        // //

        while (this.filterEmployee.length > 0) {
          this.filterEmployee.pop();
        }

        this.allEmployees.forEach((element) => {
          if (element.manager_email.toLowerCase().search(this.search_word) >= 0) {
            // //

            this.filterEmployee.push(element);
          }
        });

        this.Employees = this.filterEmployee;
        // //
      }
    },

    assignEmployee() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      Saas.fetchSaaSClients()
        .then((response) => {
          loader.hide();
          //
          this.allEmployees = [...response.data.data].reverse();
          this.Employees = [...response.data.data].reverse();

          this.Employees.forEach((element) => {
            if (element.active == 0) {
              element.statusActive = false;
            } else {
              element.statusActive = true;
            }
          });

          //
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },
  },
  created() {
 
        this.permissions = JSON.parse(localStorage.userInfo).permissions;
    

    this.assignEmployee();
  },
};
</script>
<style lang="css" scoped>
.view-all-table-wrapper {
  position: relative;
  max-width: calc(1600px + 3rem);
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.nextable {
  flex-direction: column;
}

.nextable .nextable__head {
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body1 {
  overflow-y: scroll;
  /* overflow-x: scroll; */

  position: relative;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body1 {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body1 {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body1 {
    height: 53vh;
  }
}
.nextable .nextable__head {
  /* scroll-bar width */
  margin-right: 8px;
  border-bottom: 2px solid #e8e8e8;
}

.nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2,
.nextable .nextable__head .col-3,
.nextable .nextable__head .col-4,
.nextable .nextable__head .col-5,
.nextable .nextable__head .col-6,
.nextable .nextable__head .w-10,
.nextable .nextable__head .w-15,
.nextable .nextable__head .title {
  padding: 1rem;
  font-weight: bold;
  background-color: #fff;
  white-space: nowrap;
}
.nextable .nextable__row {
  border-bottom: 1px solid #e6e6e6;
  font-size: 15px;
}
.nextable .nextable__row .col,
.nextable .nextable__row .col-1,
.nextable .nextable__row .col-2,
.nextable .nextable__row .col-3,
.nextable .nextable__row .col-4,
.nextable .nextable__row .col-5,
.nextable .nextable__row .col-6,
.nextable .nextable__row .w-15,
.nextable .nextable__row .w-10,
.nextable .nextable__row .item {
  padding: 1rem;
  align-items: start;
  display: flex;
  font-size: 14px;
}
.nextable .nextable__head .col-1.action {
  text-align: end;
  padding-right: 0.5rem;
  width: 5%;
}

.nextable .nextable__row .col-1.action {
  text-align: end;
  justify-content: end;
  padding-right: 0.5rem;
  width: 5%;
}

p {
  margin: 0;
  color: #323233;

}
.col.campaign {
  display: flex;
  flex-direction: column;
  align-items: start !important;
}
.profile img {
  max-height: 35px;
  margin-top: 5px;
}
.date p {
  font-weight: normal;
}

.btn-action {
  color: #707070;
  margin: 0 auto;
  border-radius: 50%;
  padding: 2px;
}
.btn-action:hover {
  background-color: var(--color-primary-light);
  border-radius: 50%;
  transition: all 0.3s ease-out;
}
.status {
  display: flex;
}

.status .col {
  padding: 0.2rem 0.9rem !important;
}
.status__icon {
  max-height: 18px;
  margin-top: 2px;
  margin-left: 0px;
}
.status__text {
  font-weight: normal;
  color: #707070;
  margin-left: 0.4rem;
  text-transform: capitalize;
}
.profile__icon {
  margin-left: auto;
}

/* action menu css */
.action-menu-dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  text-align: left;
  transform: translate(-80px, -10px);
  width: 120px;
  color: #272727;
}
.action-menu:hover .action-menu-dropdown {
  display: flex;
}
.action-menu-dropdown span {
  cursor: pointer;
  user-select: none;
  padding: 0.1rem 0.5rem 0.1rem 0.2rem;
  margin: 0.1rem 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;
  color: #ff9800;
}
.action-menu-dropdown span:hover.edit {
  transition: all 0.2s ease-out;
  color: #4caf50;
}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;
  color: #2d8fe2;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
/* Status Toggle Column css */
.status {
  width: 5% !important;
}
.status .form-check-label span {
  margin: 0;
 
}
.status .form-check.form-switch,
.status .form-check-input {
  cursor: pointer !important;
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 45px;
}
.status .form-check-label {
  transform: translate(-37px, 3px);
}
.status span {
  font-size: 13px;
}
</style>
