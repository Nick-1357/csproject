<template>
  <div>
    <b-modal id="modal-center-add-keyword" size="xl" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Add Keyword</strong>

        <div class="card-text mt-2">
          <div class="row d-flex align-items-center">
            <div class="col-5 d-flex">
              <label for="fname" class="mt-3">Keyword</label>
            </div>
            <div class="col-7 d-flex">
              <label for="fname" class="mt-3">Location</label>
            </div>
          </div>
        </div>

        <div class="card-text mt-1">
          <div class="row d-flex align-items-center" :key="'keywordPlace' + index" v-for="(item, index) in keywordPlace">
            <div class="col-5">
              <b-form-input autocorrect="off" autocomplete="off" v-model="item.keyword" type="text" id="keyword" name="keyword" v-validate="'required'" class="mt-1"></b-form-input>
            </div>

            <div class="col-6">
              <div class="row g-0 selectwidget__row mt-3">
                <div class="selectwidget__wrapper col-auto" v-for="(loc, index_loc) in item.locations" :key="'locations' + index_loc">
                  <input
                    :name="'checkbox_loc' + index"
                    :id="loc.id + '_keyword_' + index"
                    type="checkbox"
                    :value="loc.id"
                    v-model="item.ChosenLoc"
                    @change="choseClient(item, index)"
                    style="display: none"
                  />
                  <label :for="loc.id + '_keyword_' + index" class="selectwidget__checkbox__wrapper">
                    <div class="selectwidget__checkbox">
                      <h6>{{ loc.name | loc }}</h6>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div class="col-1 d-flex">
              <button class="material-icons-outlined ms-auto me-3 btn-clear" v-if="isRemove || keywordPlace.keyword" @click="removeData(index)">clear</button>
            </div>
          </div>
          <span class="text-danger text-sm" v-show="errors.has('keyword')">{{ errors.first("keyword") }}</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined me-auto" style="width: 158px" @click="AddData">Add Keyword</button>
          <button class="btn btn-primary-outlined ms-auto" @click="cancelModel">Cancel</button>
          <button class="btn btn-primary ms-2" @click="submitData">Submit</button>
        </div>
      </div>
    </b-modal>

    <div class="campaign__wrapper">
      <!-- Route Pathway Links -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>

          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.id },
            }"
            class="route__link"
            >Project</router-link
          >
          /Keyword Tracker
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard </router-link>/
          <router-link
            :to="{
              name: 'project_pagination_table',
              params: { feature: 'keyword_tracker' },
            }"
            class="route__link"
            >Keyword Tracker</router-link
          >/ Keyword
        </p>
      </div>

      <div class="nexcard d-flex align-items-center px-4 py-3 mt-3 mb-4">
        <div class="d-flex align-items-center">
          <div class="projectinfo__group pe-5">
            <span class="projectgroup__title">Name</span>
            <span class="projectgroup__desc">{{ client.name }}</span>
          </div>

          <div class="projectinfo__group pe-5">
            <span class="projectgroup__title">Base URL</span>
            <span class="projectgroup__desc">{{ client.base_url }}</span>
          </div>
          <div class="projectinfo__group">
            <span class="projectgroup__title">Created By</span>
            <span class="projectgroup__desc">{{ client.creator }}</span>
          </div>
        </div>
        <div class="ms-auto">
          <div v-if="chosenTab_keywordtracker == 'Daily Keyword Data'">
            <div class="projectinfo__group">
              <button @click="exportToExcel" class="btn btn-primary">Download Excel</button>
            </div>
          </div>
          <div v-if="chosenTab_keywordtracker == 'Additional Keyword Information'">
            <div class="projectinfo__group">
              <button v-b-modal.modal-center-add-keyword class="btn btn-primary">Add Keyword</button>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard p-0 pt-4">
        <!-- BodyFix Section - Tabs -->
        <div class="keywordtracker__tabs px-4">
          <button class="keywordtracker__tab" :class="tab.class" v-for="(tab, index) in Tabs_keywordtracker" :key="'tab' + index" @click="select(tab)" v-show="permissions.includes(tab.permission)">
            <!-- <img class="keywordtracker__tab__img" :src="require(`@/assets/icons/${tab.icon}.svg`)" /> -->
            <span class="keywordtracker__tab__title">{{ tab.name }}</span>
          </button>
        </div>

        <daily-keyword v-if="chosenTab_keywordtracker == 'Daily Keyword Data'" />
        <additional-keyword-info v-else-if="chosenTab_keywordtracker == 'Additional Keyword Information'" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import KeywordTracker from "@/store/KeywordTracker.js";
import dailyKeyword from "./dailyKeywordData.vue";
import additionalKeywordInfo from "./additionalKeywordInformation.vue";
import { Trash2Icon } from "vue-feather-icons";
import { XIcon } from "vue-feather-icons";
export default {
  components: { dailyKeyword, additionalKeywordInfo, Trash2Icon, XIcon },
  data() {
    return {
      permissions: localStorage.permissions,
      Tabs_keywordtracker: [
        {
          name: "Daily Keyword Data",
          icon: "icon-googleads-alt-logo",
          class: "keywordtracker__tab active",
          permission: "Clients.Recommendation-Campaign.index",
        },
        {
          name: "Additional Keyword Information",
          icon: "icon-google-alt-logo",
          class: "keywordtracker__tab",
          permission: "nexrank-clients.keywords.index",
        },
      ],
      chosenTab_keywordtracker: "Daily Keyword Data",
      client: [],
      passOnData: [],
      keywordPlace: [],
      locations: [],
      isRemove: false,
      exists: false,
    };
  },

  methods: {
    exportToExcel() {
      // //
      import("@/vendor/Export2Excel").then((excel) => {
        const list = JSON.parse(localStorage.keyword_tracker_export_data);

        const data = this.formatJson(["keyword", "rank", "d1", "d7", "d30", "life", "url"], list);
        excel.export_json_to_excel({
          header: ["keyword", "Rank", "Today", "Last 7 days", "Last Month", "All Time", "url"],
          data,
          filename: this.FileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat,
        });
      });
    },

    formatJson(filterVal, jsonData) {
      //

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
    select(data) {
      ////
      this.Tabs_keywordtracker.forEach((element) => {
        if (element.name === data.name) {
          element.class = "keywordtracker__tab active";
        } else {
          element.class = "keywordtracker__tab";
        }
      });
      this.chosenTab_keywordtracker = data.name;
    },
    cancelModel() {
      this.isRemove = false;
      this.keywordPlace = [];

      var loc = [];
      // this.locations.forEach((element) => {
      //   if (
      //     element.name == "www.google.com" ||
      //     element.name == "www.google.com.my" ||
      //     element.name == "www.google.com.au" ||
      //     element.name == "www.google.com.sg"
      //   ) {
      //     loc.push(element);
      //   }
      // });

      this.keywordPlace.push({
        keyword: "",
        ChosenLoc: [],
        locations: this.locations,
      });
      this.$bvModal.hide("modal-center-add-keyword");
      this.$bvModal.hide("modal-center-edit-keyword");
    },
    removeLocation(data, loc) {
      this.keywordPlace[data].showLoc.splice(loc, 1);

      //this.showLoc.splice(data, 1);
    },
    choseClient(data, index) {
      console.log(data, index);
      // var dup = false;

      // if (this.keywordPlace[index].showLoc.length != 0) {
      //   this.keywordPlace[index].showLoc.forEach((element) => {
      //     if (element.id == data.id) {
      //       dup = true;
      //     }
      //   });

      //   if (dup == false) {
      //     this.keywordPlace[index].showLoc.push(data);
      //   }
      // } else {
      //   this.keywordPlace[index].showLoc.push(data);
      // }
    },

    AddData() {
      var loc = [];
      // this.locations.forEach((element) => {
      //   if (
      //     element.name == "www.google.com" ||
      //     element.name == "www.google.com.my" ||
      //     element.name == "www.google.com.au" ||
      //     element.name == "www.google.com.sg"
      //   ) {
      //     loc.push(element);
      //   }
      // });

      this.keywordPlace.push({
        keyword: "",
        ChosenLoc: [],
        locations: this.locations,
      });
      this.isRemove = true;
    },
    removeData(index) {
      this.keywordPlace.splice(index, 1);

      if (this.keywordPlace.length == 1) {
        this.isRemove = false;
      }
    },
    submitData() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      this.keywordPlace.forEach((element) => {
        //
        // var locations = [];

        // element.showLoc.forEach((loc) => {
        //   locations.push(loc.id);
        // });
        const obj = {
          keyword_id: this.$route.params.id,
          keyword: element.keyword,
          locations: element.ChosenLoc,
        };
        //

        this.$validator.validateAll().then((result) => {
          if (result) {
            KeywordTracker.addClientKeyword(obj)
              .then((response) => {
                loader.hide();
                this.$toast.success(response.data.message);

                // this.$bvToast.toast(response.data.message, {
                //   title: "Success",
                //   variant: "success",
                //   toaster: "b-toaster-bottom-left",
                //   solid: true,
                // });

                location.reload();

                // KeywordTracker.fetchClientKeywords(this.$route.params.id)
                //   .then((response) => {
                //     // //
                //     this.keyword_list = [...response.data.data].reverse();
                //     this.allKeyword_list = [...response.data.data].reverse();
                //     this.allKeyword = [...response.data.data].reverse();
                //     loader.hide();
                //   })
                //   .catch((error) => {
                //     console.log(error);
                //     loader.hide();
                //   });
              })
              .catch((err) => {
                console.log(err);
                // this.$vs.notify({
                //   color: "danger",
                //   title: "Campaign Error",
                //   text: err.response.data.message,
                // })
              });
          }
        });

        loader.hide();

        // this.$refs['modal-center-recent'].hide()
      });

      this.isRemove = false;

      this.keywordPlace = [];
      var loc = [];
      // this.locations.forEach((element) => {
      //   if (
      //     element.name == "www.google.com" ||
      //     element.name == "www.google.com.my" ||
      //     element.name == "www.google.com.au" ||
      //     element.name == "www.google.com.sg"
      //   ) {
      //     loc.push(element);
      //   }
      // });

      this.keywordPlace.push({
        keyword: "",
        ChosenLoc: [],
        locations: this.locations,
      });

      this.$bvModal.hide("modal-center-add-keyword");
    },
  },
  destroyed() {
    localStorage.removeItem("keyword_tracker_export_data");
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    KeywordTracker.fetchClient(this.$route.params.id)
      .then((response) => {
        this.client = response.data.data;
        loader.hide();
      })

      .catch((error) => {
        loader.hide();
        console.log(error);
      });

    KeywordTracker.fetchDailyKeyword(this.$route.params.id)
      .then((response) => {
        loader.hide();

        this.passOnData = response.data.data;
      })
      .catch((error) => {
        loader.hide();
        console.log(error);
      });

    this.locations = JSON.parse(localStorage.locations);

    var loc = [];
    // this.locations.forEach((element) => {
    //   if (
    //     element.name == "www.google.com" ||
    //     element.name == "www.google.com.my" ||
    //     element.name == "www.google.com.au" ||
    //     element.name == "www.google.com.sg"
    //   ) {
    //     loc.push(element);
    //   }
    // });

    this.keywordPlace.push({
      keyword: "",
      ChosenLoc: [],
      locations: this.locations,
    });
  },
};
</script>

<style lang="css" scoped>
.campaign__wrapper {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 4rem 3rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px;
  /* padding: 1.5rem; */
}
.nexcard.chart {
  max-height: 400px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 20px;
}

.nexcard-inner {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 20px;
  padding: 1rem;
}
.card__textWrapper {
  height: 100%;
  padding-left: 1.2rem;
}
.nexcard-inner .card__title {
  color: #6f6f6f;
  font-size: 15px;
}
@media screen and (max-width: 1600px) {
  .nexcard-inner .card__title {
    font-size: 13px;
  }
}
/* Bodyfix section - Tabs */
.keywordtracker__tabs {
  display: flex;
  border-bottom: 2px solid #e8e8e8;
}
.keywordtracker__tab {
  display: flex;
  align-items: center;
  padding-top: 0.3rem;
  padding-bottom: 0.2rem;
  /* border-bottom: 2px solid transparent; */
  margin-right: 1rem;
  margin-bottom: 1.5rem;
  transition: 0.2s ease-out;
  /* border-top-right-radius: 10px;
  border-top-left-radius: 10px; */
  border-radius: 20px;
  border: 1px solid #2c8de0;
  background-color: #f4faff;
}
.keywordtracker__tab:hover {
  background-color: #dcefff;
  /* border-bottom: 2px solid #4e4e4e; */
  transition: 0.4s ease-out;
}
.keywordtracker__tab.active {
  /* border-bottom: 2px solid #1464c0; 
  background-color: #ececec;*/
  background-color: #2c8de0;
  transition: all 0.4s ease-out;
}
.keywordtracker__tab__img {
  height: 24px;
  object-fit: contain;
}
.keywordtracker__tab.active .keywordtracker__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
.keywordtracker__tab .keywordtracker__tab__title {
  padding: 0rem 0.5rem;
  color: #2c8de0;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.4s ease-out;
  user-select: none;
}
/* left */
.left-col {
  border-right: 2px solid #e8e8e8;
  height: 634px;
  overflow-y: scroll;
}
.left-col .left-col__keyword {
  padding: 0;
  cursor: pointer;
}
.left-col .left-col__keyword:hover {
  background-color: #ededed;
  transition: 0.4s ease-out;
}
.keyword__text {
  border-top: 1px solid #e8e8e8;
  padding: 0.5rem 0px;
}
.left-col .left-col__keyword:hover .keyword__text {
  border-top: 1px solid transparent;
}
.input-wrapper {
  padding-right: 0;
}
.right-col {
  padding: 0px 28px;
}
.text-darkgreen {
  color: #183b1c;
}

.projectinfo__group {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0rem;
}
.projectgroup__title {
  color: black;
  font-weight: 600;
}
.projectgroup__desc {
  color: #656565;
}
.projectinfo__img {
  display: flex;
  align-items: center;
  padding-right: 1rem;
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
.btn-clear {
  color: #e04a58;
}
.btn-clear:hover {
  color: #fc0019;
}
</style>
