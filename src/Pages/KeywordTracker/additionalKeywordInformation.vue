<template>
  <div>
    <b-modal id="modal-center-edit-keyword" size="xl" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Edit Keyword</strong>

        <div class="row mt-3">
          <div class="col-5 align-self-center">
            <label for="fname" class="text-muted">Keyword</label>
          </div>
          <div class="col-7 align-self-center">
            <label for="fname" class="text-muted">Location</label>
          </div>
        </div>

        <div class="row mt-1">
          <div class="col-5 mt-3">
            <b-form-input autocorrect="off" autocomplete="off" v-model="keyword" type="text" id="keyword" name="keyword" v-validate="'required'"></b-form-input>
            <span class="text-danger text-sm" v-show="errors.has('keyword')">{{ errors.first("keyword") }}</span>
          </div>

          <div class="col-7">
            <div class="row g-0 selectwidget__row mt-3">
              <div class="selectwidget__wrapper col-auto" v-for="(loc, index) in locations" :key="'locations' + index">
                <input :id="loc.id" type="checkbox" :value="loc.id" v-model="showLoc" @change="showChange()" style="display: none" />
                <label :for="loc.id" class="selectwidget__checkbox__wrapper">
                  <div class="selectwidget__checkbox">
                    <h6>{{ loc.name | loc }}</h6>
                  </div>
                </label>
              </div>
            </div>

            <!-- <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" name="locations" v-model="ChosenLoc" @change="choseClientEdit(ChosenLoc)">
              <option :value="loc" :key="index_2" v-for="(loc, index_2) in locations">
                {{ loc.name | loc }}
              </option>
            </select> -->

            <!-- <div class="card_inputgroup__radio input-group">
              <div class="form-check" :key="index" v-for="(loc, index) in locations">
                <input v-model="location" class="form-check-input" type="radio" name="location" :id="loc.id" :value="loc.id" v-validate="'required'" />
                <label class="form-check-label" :for="loc.id">{{ loc.name | loc }}</label>
              </div>
            </div>
            <span class="text-danger text-sm" v-show="errors.has('location')">{{ errors.first("location") }}</span> -->
          </div>
        </div>

        <!-- <div class="row mb-1 mt-1">
          <div class="col-6"></div>
          <div class="col-6">
            <div class="">
              <div class="pill__selected__wrapper row g-0">
                <div :key="index_3" v-for="(lan, index_3) in showLoc" class="pill__selected col-auto">
                  <span>{{ lan.name | loc }}</span>
                  <div class="btn-remove" @click="removeLocationEdit(index_3)">
                    <span class="material-icons-outlined"> close </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="card-text d-flex mt-4">
          <button class="btn btn-primary-outlined ms-auto" @click="cancelModel">Cancel</button>
          <button class="btn btn-primary ms-2" @click="EditData">Submit</button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-center-delete-keyword" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Delete</strong>

        <div class="card-text">
          <span>Do you want to delete Keyword of id {{ deleteId }} ?</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-delete-keyword')">Cancel</button>
          <button class="btn btn-danger ms-2" @click="deleteValue">Yes</button>
        </div>
      </div>
    </b-modal>

    <div class="card-wrapper">
      <!-- <div class="row">
        <div class="col-4">
          <b-form-datepicker
            id="example-datepicker-start"
            v-model="startDate"
            placeholder="Filter Date From"
          ></b-form-datepicker>
        </div>
        <div class="col-4">
          <b-form-datepicker
            id="example-datepicker-end"
            v-model="endDate"
            placeholder="Filter Date Till"
          ></b-form-datepicker>
        </div>
      </div> -->

      <div class="d-flex mb-4">
        <div>
          <div class="search input-group" style="">
            <span class="input-group-prepend">
              <div class="input-group-text bg-transparent">
                <span class="material-icons-outlined">search</span>
              </div>
            </span>
            <input
              type="search"
              id="form1"
              class="form-control border-left-0"
              placeholder="Search"
              autocorrect="off"
              autocomplete="off"
              v-model="search_keyword"
              @input="searchKeyword"
            />
          </div>
        </div>
      </div>

      <div class="nextable">
        <div class="row nextable__head g-0">
          <div class="col"><p>Keyword</p></div>
          <div class="col"><p>Date Created</p></div>
          <div class="col"><p>Actions</p></div>
        </div>

        <div class="nextable__body__collection">
          <div class="row nextable__body g-0" :key="'rankShow' + indextr" v-for="(item, indextr) in keyword_list">
            <div class="col">
              <p>{{ item.keyword }}</p>
            </div>
            <div class="col">
              <p>{{ item.created_at | formatDate }}</p>
            </div>
            <div class="col action">
              <div class="action-menu">
                <button class="text-center">
                  <span class="btn-action material-icons-outlined">more_horiz</span>
                </button>
                <div class="action-menu-dropdown">
                  <span v-b-modal.modal-center-edit-keyword @click="update(item)" class="edit"><span class="material-icons-outlined">edit</span>Edit</span>

                  <span @click="deleteData(item.id)" class="delete"><span class="material-icons-outlined">delete</span>Delete</span>
                </div>
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

import KeywordTracker from "@/store/KeywordTracker.js";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";

export default {
  components: {
    VueDatepicker: VueDatepickerUi,
  },
  data() {
    return {
      selected: [],
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" },
      ],

      //
      showLoc: [],
      ChosenLoc: [],
      locations: [],
      permissions: [],
      client: [],
      used_keywords_qouta: 0,
      keywords_qouta: 0,
      keyword_list: [],
      keyword: "",
      exists: false,
      fullPage: 0,

      keywordPlace: [],
      dataId: "",
      lastIndex: "",
      allKeyword: [],
      allKeyword_list: "",
      currentList: "",
      TotalItemNumber: "",
      search_keyword: "",
      pageCurrent: 1,
      startDate: "",
      endDate: "",
      filterKeyword: [],
      filterDate: [],
      urlId: this.$route.params.id,
      pagination: [],
      isRemove: false,
      deleteId: null,
      series: [
        {
          name: "Rank",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 8, 5],
        },

        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "";
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1,
          colors: ["#4A90E2"],
        },
        title: {
          text: "Rank",
          align: "left",
        },
        colors: ["#4A90E2"],
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },

            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
  },

  watch: {
    startDate() {
      // //
      if (this.endDate == "" || this.endDate == null) {
        // //
      } else {
        this.$router.push({
          name: "Date-View",
          params: {
            id: this.$route.params.id,
            from_date: this.$options.filters.formatDate2(this.startDate),
            to_date: this.$options.filters.formatDate2(this.endDate),
          },
        });
      }
    },

    endDate() {
      // //

      if (this.startDate == "" || this.startDate == null) {
        // //
      } else {
        // this.//
        this.$router.push({
          name: "Date-View",
          params: {
            id: this.$route.params.id,
            from_date: this.$options.filters.formatDate2(this.startDate),
            to_date: this.$options.filters.formatDate2(this.endDate),
          },
        });
      }
    },
  },

  methods: {
    showChange() {
      console.log(this.showLoc);
    },
    update(item) {
      //
      this.dataId = item.id;
      this.keyword = item.keyword;
      this.showLoc = [];
      item.locations.forEach((element) => {
        this.showLoc.push(element.id);
      });
      //
    },

    cancelModel() {
      this.$bvModal.hide("modal-center-edit-keyword");
    },

    EditData() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      // var locations = [];

      // this.showLoc.forEach((loc) => {
      //   locations.push(loc.id);
      // });

      const obj = {
        id: this.dataId,
        keyword_id: this.urlId,
        keyword: this.keyword,
        locations: this.showLoc,
      };
      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          KeywordTracker.updateClientKeyword(obj)
            .then((response) => {
              loader.hide();
              // //
              this.dataId = "";
              this.keyword = "";
              this.showLoc = [];
              this.ChosenLoc = [];
              this.$bvModal.hide("modal-center-edit-keyword");

              this.$toast.success(response.data.message);
              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });

              KeywordTracker.fetchClientKeywords(this.$route.params.id)
                .then((response) => {
                  // //
                  this.keyword_list = [...response.data.data].reverse();
                  this.allKeyword_list = [...response.data.data].reverse();
                  this.allKeyword = [...response.data.data].reverse();
                  loader.hide();
                })
                .catch((error) => {
                  console.log(error);
                  loader.hide();
                });
            })
            .catch((err) => {
              loader.hide();
              console.error(err);
            });
        }
      });

      //this.$refs['modal-center-recent'].hide()
    },

    deleteData(data) {
      this.deleteId = data;
      this.$bvModal.show("modal-center-delete-keyword");
    },

    deleteValue() {
      const obj = {
        id: this.$route.params.id,
        item_id: this.deleteId,
      };

      KeywordTracker.removeClientKeyword(obj)
        .then((response) => {
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          this.$bvModal.hide("modal-center-delete-keyword");
          KeywordTracker.fetchClientKeywords(this.$route.params.id)
            .then((response) => {
              // //
              this.keyword_list = [...response.data.data].reverse();
              this.allKeyword_list = [...response.data.data].reverse();
              this.allKeyword = [...response.data.data].reverse();
              loader.hide();
            })
            .catch((error) => {
              console.log(error);
              loader.hide();
            });
        })
        .catch((err) => {
          console.log(err);
          // this.$vs.notify({
          //   color: "danger",
          //   title: "Campaign Error",
          //   text: err.response.data.message,
          // })
        });
    },

    searchKeyword() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities();
      }, 500);
    },

    getActivities() {
      this.search_keyword = this.search_keyword.toLowerCase();

      if (this.search_keyword == null || this.search_keyword == "") {
        this.keyword_list = this.allKeyword;
        this.allKeyword_list = this.allKeyword;
      } else {
        this.keyword_list = [];
        this.allKeyword_list = [];

        this.allKeyword.forEach((element) => {
          if (element.keyword.toLowerCase().search(this.search_keyword) >= 0) {
            this.allKeyword_list.push(element);
          }
        });

        this.keyword_list = this.allKeyword_list;
      }
    },
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    KeywordTracker.fetchClientKeywords(this.$route.params.id)
      .then((response) => {
        // //
        this.keyword_list = [...response.data.data].reverse();
        this.allKeyword_list = [...response.data.data].reverse();
        this.allKeyword = [...response.data.data].reverse();
        loader.hide();
      })
      .catch((error) => {
        console.log(error);
        loader.hide();
      });

    this.locations = JSON.parse(localStorage.locations);
  },
};
</script>

<style lang="css" scoped>
.card-wrapper {
  position: relative;
  margin: 0rem auto;
  padding: 1rem;
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
  border-bottom: 1px solid #e6e6e6;
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  position: relative;
}
.nextable .nextable__body {
  border-bottom: 1px solid #e6e6e6;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body__collection {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body__collection {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body__collection {
    height: 53vh;
  }
}
.nextable .nextable__head {
  /* scroll-bar width */
  margin-right: 8px;
}
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
  /* border: 1px solid black; */
}
.nextable .nextable__head .col.profile {
  text-align: end;
  max-width: 100px;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body .col {
  padding: 1rem;
  align-items: center;
  display: flex;
  /* border: 1px solid black; */
}
.nextable .nextable__body .col.profile {
  text-align: end;
  max-width: 100px;
  justify-content: end;
}
.nextable .nextable__body .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
.nextable .nextable__body .col:last-child {
  text-align: center;
  max-width: 100px;
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
.action-menu-dropdown span:hover.delete {
  transition: all 0.2s ease-out;
  color: #d30000;
}
.route__link {
  text-decoration: none;
  color: #6c757d;
}
.route__link:hover {
  text-decoration: none;
  color: #4f555b;
  text-decoration: underline;
  transition: all 0.5s ease-out;
}

.pill__selected__wrapper {
  margin-top: 0.5rem;
}
.pill__selected {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: 0.2s ease-out;
  border-radius: 20px;
  border: 1px solid #2c8de0;
  background-color: #2c8de0;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
.pill__selected .btn-remove {
  background-color: rgb(246, 246, 246);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  margin-left: 0.5rem;
}
.pill__selected .btn-remove .material-icons-outlined {
  font-size: 12px;
  color: #838383;
}
.pill__selected .btn-remove:hover .material-icons-outlined {
  color: red;
  transition: 0.3s ease-out;
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
