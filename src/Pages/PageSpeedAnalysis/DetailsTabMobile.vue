<template>
  <div class="">
    <div>
      <div class="nexcard mt-4 py-4 px-4 mb-4" v-if="showOpportunity == true">
        <h4 class="text-darkgreen">Opportunities</h4>
        <div class="pt-3 pb-4">
          <span :class="failedNav.state" @click="selectCategoryFailed(index)" v-for="(failedNav, index) in FailedNavigation" :key="(failedNav, index)">
            {{ failedNav.name }}
          </span>
        </div>
        <div>
          <div class="dropdown__list">
            <div class="dropdown__group" v-for="(failed, index) in opportunity" :key="(failed, index)">
              <div class="dropdown__title d-flex" type="button" v-b-toggle="'dropdown__bar_Opportunities' + index">
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ failed.title }}</span>
                    <span :class="[failed.score <= 0.49 ? 'pill-badge red' : failed.score >= 0.9 ? 'pill-badge green' : 'pill-badge yellow']">{{ failed.score }}</span>
                  </div>
                </div>
                <div class="dropdown__title__right">
                  <button class="btn-primary ms-2 btn-arrow-icon">
                    <span class="arrow-icon material-icons-outlined text-white"> expand_more </span>
                  </button>
                </div>
              </div>

              <b-collapse :id="'dropdown__bar_Opportunities' + index">
                <div class="dropdown__content pt-4">
                  <div class="pb-4">
                    <span class="text-muted">{{ failed.description }}</span>
                  </div>

                  <div class="pb-4">
                    <span class="text-muted">
                      {{ failed.displayValue }}
                    </span>
                  </div>
                  <div class="nexcard-inner" v-if="failed.details != null">
                    <div style="margin-top: 0.5vw" class="row">
                      <div class="col">
                        <div class="card">
                          <table class="nextable" id="my-table">
                            <tbody>
                              <tr v-for="(details, index2) in failed.details" :key="(details, index2)">
                                <td v-for="(detail, index3) in details" :key="(detail, index3)">
                                  <span v-html="detail"> </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <!-- <table class="nextable">
                      <thead>
                        <tr>
                          <th class="w-70">URL</th>
                          <th class="w-15">Transfer Size (KiB)</th>
                          <th class="w-15">Potential Savings(ms)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="n in 4" :key="n">
                          <td class="w-70">www.nexmind.com</td>
                          <td class="w-15">0.00</td>
                          <td class="w-15">000</td>
                        </tr>
                      </tbody>
                    </table> -->
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard py-4 px-4 mb-4" v-if="showDiagnostic == true">
        <h4 class="text-darkgreen">Diagnostics</h4>
        <div class="pt-3 pb-4">
          <span :class="diagnostic.state" @click="selectCategoryDiagnostic(index)" v-for="(diagnostic, index) in DignosticNavigation" :key="(diagnostic, index)">
            {{ diagnostic.name }}
          </span>
        </div>
        <div>
          <div class="dropdown__list">
            <div class="dropdown__group" v-for="(diagnosticItem, index) in diagnostic" :key="(diagnosticItem, index)">
              <div class="dropdown__title d-flex" type="button" v-b-toggle="'dropdown__bar_Diagnostics' + index">
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ diagnosticItem.title }}</span>
                    <span v-if="diagnosticItem.score == null"></span>
                    <span v-else :class="[diagnosticItem.score <= 0.49 ? 'pill-badge red' : diagnosticItem.score >= 0.9 ? 'pill-badge green' : 'pill-badge yellow']">{{ diagnosticItem.score }}</span>
                  </div>
                </div>
                <div class="dropdown__title__right">
                  <button class="btn-primary ms-2 btn-arrow-icon">
                    <span class="arrow-icon material-icons-outlined text-white"> expand_more </span>
                  </button>
                </div>
              </div>

              <b-collapse :id="'dropdown__bar_Diagnostics' + index">
                <div class="dropdown__content pt-4">
                  <div class="pb-4">
                    <span class="text-muted"> {{ diagnosticItem.description }}</span>
                  </div>
                  <div class="pb-4">
                    <span class="text-muted"> {{ diagnosticItem.displayValue }}</span>
                  </div>
                  <div class="nexcard-inner" v-if="diagnosticItem.details != null">
                    <div style="margin-top: 0.5vw" class="row">
                      <div class="col">
                        <div v-if="!diagnosticItem.outputType && !diagnosticItem.details.outputType" class="card">
                          <table class="table" id="my-table">
                            <tbody>
                              <tr v-for="(DiagnosticDetails, index2) in diagnosticItem.details" :key="(DiagnosticDetails, index2)">
                                <td v-for="(diagnosticDetailsItem, index3) in DiagnosticDetails" :key="(diagnosticDetailsItem, index3)">
                                  <span v-html="diagnosticDetailsItem"> </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div v-if="diagnosticItem.details.outputType == 'nestableItems'" style="max-height: 300px; overflow-x: hidden; overflow-y: auto" class="card p-3">
                          <vue-nestable v-model="diagnosticItem.details.children">
                            <vue-nestable-handle slot-scope="{ item }">
                              <div v-if="typeof item.data == 'string'">
                                <span>
                                  <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                  {{ item.data }}</span
                                >
                              </div>

                              <div v-else v-for="(item2, index) in item.data" :key="(item2, index)">
                                <div v-if="typeof item2 == 'string'">
                                  <span><corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon> {{ item2 }}</span>
                                </div>

                                <div v-else>
                                  <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>

                                  <div style="display: inline-block" v-for="(item3, index3) in item2" :key="(item3, index3)">
                                    <span> {{ item3 }}</span>
                                  </div>
                                </div>
                              </div>
                            </vue-nestable-handle>
                          </vue-nestable>
                        </div>

                        <div v-if="diagnosticItem.outputType == 'nestableItems'" style="max-height: 300px; overflow-x: hidden; overflow-y: auto" class="card p-3">
                          <vue-nestable v-model="diagnosticItem.details[0]">
                            <vue-nestable-handle slot-scope="{ item }">
                              <div v-if="typeof item.data == 'string'">
                                <span>
                                  <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                  {{ item.data.slice(0, 100) }}...</span
                                >
                              </div>

                              <div v-else v-for="(item2, index) in item.data" :key="(item2, index)">
                                <div v-if="typeof item2 == 'string'">
                                  <span><corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon> {{ item2.slice(0, 100) }}</span>
                                </div>

                                <div v-else>
                                  <div style="display: inline-block" v-for="(item3, index3) in item2" :key="(item3, index3)">
                                    <span style="display: inline" v-if="index3 == 'url'">
                                      <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                      {{ item3.slice(0, 100) }}...</span
                                    >

                                    <span style="font-weight: bold; display: inline" v-else-if="index3 == 'duration'"> {{ Math.round(item3 * 10) / 10 }} ms</span>

                                    <span style="font-weight: bold; display: inline" v-else> {{ item3 }} KiB</span>
                                  </div>
                                </div>
                              </div>
                            </vue-nestable-handle>
                          </vue-nestable>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard py-4 px-4 mb-4" v-if="showPass == true">
        <h4 class="text-darkgreen">Passed</h4>
        <div class="pt-3 pb-4">
          <span @click="selectCategoryPassed(index)" :class="passedNav.state" v-for="(passedNav, index) in PassedNavigation" :key="(passedNav, index)">
            {{ passedNav.name }}
          </span>
        </div>
        <div>
          <div class="dropdown__list">
            <div class="dropdown__group" v-for="(passedItem, index) in passed" :key="(passedItem, index)">
              <div class="dropdown__title d-flex" type="button" v-b-toggle="'dropdown__bar_passed' + index">
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ passedItem.title }}</span>
                    <span v-if="passedItem.score == null"></span>
                    <span v-else :class="[passedItem.score <= 0.49 ? 'pill-badge red' : passedItem.score >= 0.9 ? 'pill-badge green' : 'pill-badge yellow']">{{ passedItem.score }}</span>
                  </div>
                </div>
                <div class="dropdown__title__right">
                  <button class="btn-primary ms-2 btn-arrow-icon">
                    <span class="arrow-icon material-icons-outlined text-white"> expand_more </span>
                  </button>
                </div>
              </div>

              <b-collapse :id="'dropdown__bar_passed' + index">
                <div class="dropdown__content pt-4">
                  <div class="pb-4">
                    <span class="text-muted"> {{ passedItem.description }}</span>
                  </div>

                  <div class="pb-4">
                    <span class="text-muted"> {{ passedItem.displayValue }}</span>
                  </div>
                  <div class="nexcard-inner" v-if="passedItem.details != null">
                    <div style="margin-top: 0.5vw" class="row">
                      <div class="col">
                        <div class="card">
                          <div v-if="!passedItem.outputType && !passedItem.details.outputType" class="card">
                            <table class="table" id="my-table">
                              <tbody>
                                <tr v-for="(passedItemDetails, index2) in passedItem.details" :key="(passedItemDetails, index2)">
                                  <td v-for="(passedDetail, index3) in passedItemDetails" :key="(passedDetail, index3)">
                                    <span v-html="passedDetail"> </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div v-if="passedItem.details.outputType == 'nestableItems'" style="max-height: 300px; overflow-x: hidden; overflow-y: auto" class="card p-3">
                            <vue-nestable v-model="passedItem.details.children">
                              <vue-nestable-handle slot-scope="{ item }">
                                <div v-if="typeof item.data == 'string'">
                                  <span>
                                    <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                    {{ item.data.slice(0, 100) }}...</span
                                  >
                                </div>

                                <div v-else v-for="(item2, index) in item.data" :key="(item2, index)">
                                  <div v-if="typeof item2 == 'string'">
                                    <span><corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon> {{ item2.slice(0, 100) }}</span>
                                  </div>

                                  <div v-else>
                                    <div style="display: inline-block" v-for="(item3, index3) in item2" :key="(item3, index3)">
                                      <span style="display: inline" v-if="index3 == 'url'">
                                        <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                        {{ item3.slice(0, 100) }}...</span
                                      >

                                      <span style="display: inline" v-else-if="index3 == 'duration'">
                                        {{ item3 }}
                                      </span>

                                      <span style="display: inline" v-else> {{ item3 }}</span>
                                    </div>
                                  </div>
                                </div>
                              </vue-nestable-handle>
                            </vue-nestable>
                          </div>

                          <div v-if="passedItem.outputType == 'nestableItems'" style="max-height: 300px; overflow-x: hidden; overflow-y: auto" class="card p-3">
                            <vue-nestable v-model="passedItem.details[0]">
                              <vue-nestable-handle slot-scope="{ item }">
                                <div v-if="typeof item.data == 'string'">
                                  <span>
                                    <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                    {{ item.data.slice(0, 100) }}...</span
                                  >
                                </div>

                                <div v-else v-for="(item2, index) in item.data" :key="(item2, index)">
                                  <div v-if="typeof item2 == 'string'">
                                    <span><corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon> {{ item2.slice(0, 100) }}</span>
                                  </div>

                                  <div v-else>
                                    <div style="display: inline-block" v-for="(item3, index3) in item2" :key="(item3, index3)">
                                      <span style="display: inline" v-if="index3 == 'url'">
                                        <corner-down-right-icon size="1x" style="color: grey" class="custom-class"></corner-down-right-icon>
                                        {{ item3.slice(0, 100) }}...</span
                                      >

                                      <span style="display: inline" v-else-if="index3 == 'duration'">
                                        {{ Math.round(item3 * 10) / 10 }}
                                        ms</span
                                      >

                                      <span style="display: inline" v-else> {{ item3 }} KiB</span>
                                    </div>
                                  </div>
                                </div>
                              </vue-nestable-handle>
                            </vue-nestable>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PageSpeed from "@/store/PageSpeedAnalysis.js";
import mobile from "./DetailsTabMobile.vue";
import Enterprise from "@/store/Enterprise.js";
export default {
  components: {
    mobile,
  },
  name: "page_speed_insight",
  data() {
    return {
      n: 1,
      tab__active: "Reports",
      tab__options: [
        { name: "Reports", class: "button__tab active" },
        { name: "Details", class: "button__tab " },
      ],
      category__active: "All",
      category__options: [
        { name: "All", state: "pill-tabs active" },
        { name: "First Contentful Paint", state: "pill-tabs " },
        { name: "Total Blocking Time", state: "pill-tabs " },
        { name: "Largest Colourful Paint", state: "pill-tabs" },
        { name: "Cummulative Layout Shift", state: "pill-tabs" },
        { name: "Other", state: "pill-tabs" },
      ],

      FailedAudits: [],
      DiagnosticAudits: [],
      PassedAudits: [],
      FailedNavigation: [
        {
          name: "ALL",
          state: "pill-tabs active",
          data: [],
        },
        {
          name: "FCP",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "TBT",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "LCP",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "CLS",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "OTH",
          state: "pill-tabs",
          data: [],
        },
      ],

      DignosticNavigation: [
        {
          name: "ALL",
          state: "pill-tabs active",
          data: [],
        },
        {
          name: "FCP",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "TBT",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "LCP",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "CLS",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "OTH",
          state: "pill-tabs",
          data: [],
        },
      ],
      PassedNavigation: [
        {
          name: "ALL",
          state: "pill-tabs active",
          data: [],
        },
        {
          name: "FCP",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "TBT",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "LCP",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "CLS",
          state: "pill-tabs",
          data: [],
        },
        {
          name: "OTH",
          state: "pill-tabs",
          data: [],
        },
      ],

      nestableItems: [],

      opportunity: [],
      showOpportunity: true,
      diagnostic: [],
      showDiagnostic: true,
      passed: [],
      showPass: true,
      passedShow: false,

      buttons: [
        { caption: "Desktop", state: true },
        { caption: "Mobile", state: false },
      ],
      chosenView: "Desktop",
      chosen_route_data: [],
    };
  },
  methods: {
    changeView(data) {
      if (data == 0) {
        this.buttons[1].state = false;
        this.chosenView = this.buttons[0].caption;
      } else {
        this.buttons[0].state = false;
        this.chosenView = this.buttons[1].caption;
      }
      //
    },

    selectTab(data) {
      this.tab__options.forEach((element) => {
        if (element.name === data.name) {
          element.class = "button__tab active";
        } else {
          element.class = "button__tab";
        }
      });
      this.tab__active = data.name;
    },
    selectCategory(data) {
      this.category__options.forEach((element) => {
        if (element.name === data) {
          element.state = "pill-tabs active";
        } else {
          element.state = "pill-tabs";
        }
      });
      this.category__active = data;

      if (data == "All Pending Tasks") {
        (this.showCriticalTasks = true), (this.showWarningTasks = true), (this.showInfoTasks = true), (this.showCompleted = true), (this.showOptimizedUrls = true);
      } else if (data == "Critical Tasks") {
        (this.showCriticalTasks = true), (this.showWarningTasks = false), (this.showInfoTasks = false), (this.showCompleted = false), (this.showOptimizedUrls = false);
      } else if (data == "Warning Tasks") {
        (this.showCriticalTasks = false), (this.showWarningTasks = true), (this.showInfoTasks = false), (this.showCompleted = false), (this.showOptimizedUrls = false);
      } else if (data == "Info Tasks") {
        (this.showCriticalTasks = false), (this.showWarningTasks = false), (this.showInfoTasks = true), (this.showCompleted = false), (this.showOptimizedUrls = false);
      } else if (data == "Optimized Urls") {
        (this.showCriticalTasks = false), (this.showWarningTasks = false), (this.showInfoTasks = false), (this.showCompleted = false), (this.showOptimizedUrls = true);
      } else if (data == "Completed") {
        (this.showCriticalTasks = false), (this.showWarningTasks = false), (this.showInfoTasks = false), (this.showCompleted = true), (this.showOptimizedUrls = false);
      }
    },

    selectCategoryFailed(data) {
      this.FailedNavigation.forEach((element, index) => {
        if (index == data) {
          this.FailedNavigation[index].state = "pill-tabs active";
        } else {
          this.FailedNavigation[index].state = "pill-tabs";
        }
      });

      this.opportunity = this.FailedNavigation[data].data;

      // this.chosenCategoryFailed = this.FailedNavigation[data].name;
    },

    selectCategoryDiagnostic(data) {
      this.DignosticNavigation.forEach((element, index) => {
        if (index == data) {
          this.DignosticNavigation[index].state = "pill-tabs active";
        } else {
          this.DignosticNavigation[index].state = "pill-tabs";
        }
      });

      this.diagnostic = this.DignosticNavigation[data].data;

      // this.chosenCategoryFailed = this.FailedNavigation[data].name;
    },
    selectCategoryPassed(data) {
      this.PassedNavigation.forEach((element, index) => {
        if (index == data) {
          this.PassedNavigation[index].state = "pill-tabs active";
        } else {
          this.PassedNavigation[index].state = "pill-tabs";
        }
      });

      this.passed = this.PassedNavigation[data].data;

      // this.chosenCategoryFailed = this.FailedNavigation[data].name;
    },

    loadResult() {
      this.campaign = this.chosen_route_data;
      this.values = this.chosen_route_data.values;

      this.values.forEach((element) => {
        if (element.slug === "mobile_FailedAudits") {
          this.FailedAudits = JSON.parse(element.data);
        }
        if (element.slug === "mobile_DiagnosticAudits") {
          this.DiagnosticAudits = JSON.parse(element.data);
        }
        if (element.slug === "mobile_PassedAudits") {
          this.PassedAudits = JSON.parse(element.data);
        }
      });

      var unique = [];

      // //

      for (const [key, value] of Object.entries(this.FailedAudits)) {
        this.FailedNavigation.forEach((element, index) => {
          if (element.name == "ALL") {
            for (const [key1, value2] of Object.entries(value)) {
              if (!unique.includes(key1)) {
                unique.push(key1);
                element.data.push(value2);
              }
            }
          } else if (element.name == "FCP" && key == "first-contentful-paint") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "CLS" && key == "cumulative-layout-shift") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "LCP" && key == "largest-contentful-paint") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "TBT" && key == "total-blocking-time") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "OTH" && key == "Others") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          }
        });
      }

      var filtered = [];

      //

      this.FailedNavigation.forEach((element, index) => {
        if (Object.entries(element.data).length != 0) {
          filtered.push(element);
          // this.FailedNavigation.splice(index, 1);
        }
      });

      this.FailedNavigation = filtered;
      //

      if (this.FailedNavigation.length == 0) {
        this.showOpportunity = false;
      } else {
        this.opportunity = this.FailedNavigation[0].data;
      }

      //

      ////

      // //

      unique = [];

      for (const [key, value] of Object.entries(this.DiagnosticAudits)) {
        this.DignosticNavigation.forEach((element, index) => {
          if (element.name == "ALL") {
            for (const [key1, value2] of Object.entries(value)) {
              // redundent.push(key1)

              if (!unique.includes(key1)) {
                unique.push(key1);
                element.data.push(value2);
              }
            }
          } else if (element.name == "FCP" && key == "first-contentful-paint") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "CLS" && key == "cumulative-layout-shift") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "LCP" && key == "largest-contentful-paint") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "TBT" && key == "total-blocking-time") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "OTH" && key == "Others") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          }
        });
      }

      //

      var filtered = [];

      this.DignosticNavigation.forEach((element, index) => {
        if (Object.entries(element.data).length != 0) {
          filtered.push(element);
          // this.FailedNavigation.splice(index, 1);
        }
      });
      this.DignosticNavigation = filtered;

      if (this.DignosticNavigation.length == 0) {
        this.showDiagnostic = false;
      } else {
        this.diagnostic = this.DignosticNavigation[0].data;
      }

      //

      // //

      // //
      unique = [];

      for (const [key, value] of Object.entries(this.PassedAudits)) {
        this.PassedNavigation.forEach((element, index) => {
          if (element.name == "ALL") {
            for (const [key1, value2] of Object.entries(value)) {
              if (!unique.includes(key1)) {
                unique.push(key1);
                element.data.push(value2);
              }
            }
          } else if (element.name == "FCP" && key == "first-contentful-paint") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "CLS" && key == "cumulative-layout-shift") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "LCP" && key == "largest-contentful-paint") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "TBT" && key == "total-blocking-time") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          } else if (element.name == "OTH" && key == "Others") {
            for (const [key1, value2] of Object.entries(value)) {
              element.data.push(value2);
            }
          }
        });
      }

      var filtered = [];

      this.PassedNavigation.forEach((element, index) => {
        if (Object.entries(element.data).length != 0) {
          filtered.push(element);
          // this.FailedNavigation.splice(index, 1);
        }
      });
      this.PassedNavigation = filtered;

      if (this.PassedNavigation.length == 0) {
        this.showPass = false;
      } else {
        this.passed = this.PassedNavigation[0].data;
      }

      this.DignosticNavigation.forEach((element, index) => {
        var array = {};
        for (const [key, value] of Object.entries(element.data)) {
          //

          if (value.outputType && value.outputType == "nestableItems") {
            // //
            // //
            // //
            array = [value.details];
            // //

            this.DignosticNavigation[index].data[key].details = array;
          }
        }
      });

      this.PassedNavigation.forEach((element, index) => {
        var array = {};
        for (const [key, value] of Object.entries(element.data)) {
          //

          if (value.outputType && value.outputType == "nestableItems") {
            // //
            // //
            // //
            array = [value.details];
            // //

            this.PassedNavigation[index].data[key].details = array;
          }
        }
      });
    },
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    if (this.$route.params.link_id) {
      Enterprise.fetchData(this.$route.params.link_id, 1)
        .then((response) => {
          this.chosen_route_data = response.data.data;
          this.loadResult();
          loader.hide();
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    } else {
      PageSpeed.fetchPage(this.$route.params.id)
        .then((response) => {
          this.chosen_route_data = response.data.data;
          this.loadResult();
          loader.hide();
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    }
  },
};
</script>

<style lang="css" scoped>
/* table */
.table {
  border: none;
  background: white;
  table-layout: fixed;
}

tbody {
  display: block;
  max-height: 500px;
  overflow-y: scroll;
}

thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
  overflow-x: auto;
  border: none;
  background: white;
}

td {
  border-bottom: 0.001px solid #ddd;
  border-top: none;
  vertical-align: top;
}

th {
  border: none;
}
/* table */

.page-wrapper-lg {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1rem;
  position: relative;
}
.nexcard-inner {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  padding: 1rem;
  position: relative;
}
/* tab buttons */
.button-tabs-wrapper {
  margin-top: 3rem;
  border-bottom: 3px solid #cdcdcd;
  position: relative;
  height: 40px;
}
.button__tabs {
  z-index: 20;
  position: absolute;
  /* transform: translate(0px, -38px); */
}
.button__tab__title {
  padding: 1rem 1rem;
  /* color: #2c8de0; */
  font-weight: 500;
  font-size: 20px;
  transition: all 0.4s ease-out;
}
.button__tab {
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  margin-right: 1.5rem;
  transition: 0.2s ease-out;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* border: 1px solid #2c8de0; */
  background-color: #f4faff;
  border-bottom: 3px solid #cdcdcd;
  color: #1e8ef0;
  box-shadow: inset 0 -5px 8px #cdcdcd;
  /* background-image: linear-gradient(to top, #d7dee7, #f4faff); */
  /* opacity: 0.9; */
}
.button__tab:hover {
  background-color: #dcefff;
  transition: 0.4s ease-out;
  box-shadow: inset 0 -5px 8px #cdcdcd;
  color: #2c8de0;

  /* background-image: linear-gradient(to top, #f4faff, #f4faff); */
  /* opacity: 1; */
}
.button__tab.active {
  background-color: #2c8de0;
  box-shadow: none;
  color: #2c8de0;
  border-bottom: 3px solid #184d7b;
  /* background-image: linear-gradient(to top, #2c8de0, #2c8de0); */
  /* opacity: 1; */

  transition: all 0.4s ease-out;
}
.button__tab.active .button__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}

/* nextable table css */
.nextable {
  width: 100%;
}
.nextable thead {
  border-bottom: 2px solid #e8e8e8;
}
.nextable thead th {
  padding: 1rem 0.5rem;
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.nextable tbody td {
  border-bottom: 1px solid #e6e6e6;
}
.nextable tbody td {
  padding: 0.5rem;
  margin: 0;
  color: #323233;
}
/* .nextable .col-url {
  width: 10%;
}
.nextable .col-metaDesc {
  width: 65%;
}
.nextable .col-charCount {
  width: 10%;
}
.nextable .col-primaryAction {
  width: 10%;
}
.nextable .col-otherAction {
  width: 5%;
} */
.nextable thead {
  display: block;
  width: 100% !important;
}
.nextable tbody {
  display: block;
  width: 100% !important;
  overflow: auto;
  position: relative;
}
thead tr,
tbody tr {
  display: table;
  width: 100%;
}

@media screen and (min-height: 917px) {
  .nextable tbody {
    max-height: 60vh !important;
  }
}
@media screen and (max-height: 917px) {
  .nextable tbody {
    height: 58vh;
  }
}
@media screen and (max-height: 850px) {
  .nextable tbody {
    height: 50vh;
  }
}
.pill-badge {
  border-radius: 20px;
  border: none;
  background-color: #e8e8e8;
  padding: 0.2rem 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}
.pill-badge.red {
  background-color: #fce1de;
  color: #f54337;
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
}
.pill-badge.green {
  background-color: #e2f2e3;
  color: #4dae50;
}

.screenshot__img-wrapper img {
  object-fit: cover;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 16/9;
}
.nexcard .pie-chart {
  display: grid;
  place-content: center;
  height: 92%;
}
/* pill tabs css */
.pill-tabs {
  font-size: 18px;
  min-width: 60px;
  margin-right: 1rem;
  padding: 0.2rem 1rem;
  text-align: center;
  color: var(--color-primary);
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  border-radius: 20px;
  user-select: none;
  cursor: pointer;
}
.pill-tabs:hover {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--light);
  transition: all 0.3s ease-out;
}

.pill-tabs.active {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--light);
}

/* dropdown list css */
.dropdown__list .dropdown__group {
  border: 1px solid #2c8de0;
  border-bottom: none;
}
.dropdown__list .dropdown__group:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.dropdown__list .dropdown__group:last-child {
  margin-bottom: 0rem;
  border-bottom: 1px solid #2c8de0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.dropdown__title {
  padding: 1.5rem 1.5rem;
  transition: all 0.4s ease-out;
  user-select: none;
}
.dropdown__title__left {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
}
.dropdown__title__left .title {
  margin-right: 1rem;
  color: #183b1c;
  font-size: 20px;
  min-width: 220px;
  font-weight: 600;
  user-select: none;
}
.dropdown__title__left .badge {
  margin-right: 2rem;
  border: 1px solid black;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}
.dropdown__title__left .badge.critical {
  border-color: #e23c39;
  color: #e23c39;
}
.dropdown__title__left .badge.warning {
  border-color: #ff9800;
  color: #ff9800;
}
.dropdown__title__left .badge.information {
  border-color: #5791d0;
  color: #5791d0;
}
.dropdown__title__left .badge.completed {
  border-color: #4dae50;
  color: #4dae50;
}
.dropdown__title__left .description {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.dropdown__title__right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.dropdown__title__right .date {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.dropdown__title[aria-expanded="false"] .dropdown__title__right .arrow-icon {
  transform: rotate(0deg);
  transition: 0.3s ease-out;
  color: #2c8de0;
}
.dropdown__title[aria-expanded="true"] .dropdown__title__right .arrow-icon {
  transform: rotate(180deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.dropdown__content {
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #2c8de0;
}

/* nextable - simple */
.nextable__card {
  flex-direction: column;
}
.nextable__card .nextable__body__collection {
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
}
.nextable__card .nextable__head {
  margin-right: 8px;
  font-weight: bold;
}
.nextable__card .nextable__head .col,
.nextable__card .nextable__head .col-2 {
  padding: 0.5rem 1rem;
}
.nextable__card .nextable__body .col,
.nextable__card .nextable__body .col-2 {
  padding: 0.5rem 1rem;
  align-items: center;
  display: flex;
}
p {
  margin: 0;
  color: #323233;
}
.btn-arrow-icon {
  border-radius: 50% !important;
}
</style>
