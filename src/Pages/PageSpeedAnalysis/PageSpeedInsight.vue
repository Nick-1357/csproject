<template>
  <div>
    <div class="page-wrapper-lg">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'enterprise_seo' },
            }"
            class="route__link"
            >Enterprise SEO</router-link
          >
          /
          <router-link
            :to="{
              name: 'enterprise_seo_page_analysis',
              params: { id: $route.params.id },
            }"
            class="route__link"
            >{{ campaign.title }}</router-link
          >/ Page Speed Analysis
        </p>
      </div>

            <div class="nexcard details mb-5">
        <!-- Dropdown -->
        <div class="details__dropdown-button d-flex py-2 px-2">
          <div class="details__left d-flex align-items-center me-auto justify-content-between w-100">
            <div class="pe-3">
              <h6>Title</h6>
              <h6 class="mb-0 text-muted">{{ campaign.title | capitalize }}</h6>
            </div>
            <div class="pe-3">
              <h6>URL</h6>
              <h6 class="mb-0 text-muted">{{ campaign.url }}</h6>
            </div>
            <div class="px-3">
              <h6>Created By</h6>
              <h6 class="mb-0 text-muted">{{ campaign.creator }}</h6>
            </div>
            <div class="px-3">
              <h6>Created Date</h6>
              <h6 class="mb-0 text-muted">
                {{ campaign.created_at | formatDate }}
              </h6>
            </div>
            <!-- <div class="px-3">
              <h6>Last Updated</h6>
              <h6 class="mb-0 text-muted">04 Feb 2023</h6>
            </div>
            <div class="px-3">
              <h6>Total Pending Tasks</h6>
              <h6 class="mb-0 text-muted">08</h6>
            </div> -->
          </div>
 
        </div>

      </div>


      <div class="button-tabs-wrapper">
        <div class="button__tabs">
          <!-- <button class="button__tab active">
            <span class="button__tab__title">Reports</span>
          </button>
          <button class="button__tab">
            <span class="button__tab__title">Details</span>
          </button> -->

          <button class="button__tab" :class="tab.class" v-for="(tab, index) in tab__options" :key="'tab' + index" @click="selectTab(tab)">
            <span class="button__tab__title">{{ tab.name }}</span>
          </button>
        </div>
      </div>

      <!-- Tab - Reports -->
      <div class="content__tab__reports" v-if="tab__active == 'Reports'">
        <section class="pie-charts__section mt-4">
          <div class="row">
            <div class="col-6">
              <div class="nexcard h-100">
                <div class="d-flex">
                  <h6>Core Web Vitals Assessment</h6>
                  <small class="text-muted ms-2"></small>
                </div>
                <div class="nextable__card">
                  <div class="row nextable__head g-0">
                    <div class="col"><span>Topics</span></div>
                    <div class="col-2"><span>Desktop</span></div>
                    <div class="col-2"><span>Mobile</span></div>
                  </div>

                  <div class="nextable__body__collection">
                    <div class="row nextable__body g-0">
                      <div class="col">
                        <span>Core Web Vitals Assessment</span>
                      </div>
                      <div class="col-2" v-if="webCoreShow_web == true">
                        <span
                          :class="[
                            coreWebVitals_web.Overall_Category.category == 'SLOW' ? 'pill-badge red' : coreWebVitals_web.Overall_Category.category == 'FAST' ? 'pill-badge green' : 'pill-badge yellow',
                          ]"
                          >{{ coreWebVitals_web.Overall_Category.category }}</span
                        >
                      </div>

                      <div class="col-2" v-else>No Sufficient Data</div>
                      <div class="col-2" v-if="webCoreShow_mobile == true">
                        <span
                          :class="[
                            coreWebVitals_mobile.Overall_Category.category == 'SLOW'
                              ? 'pill-badge red'
                              : coreWebVitals_mobile.Overall_Category.category == 'FAST'
                              ? 'pill-badge green'
                              : 'pill-badge yellow',
                          ]"
                          >{{ coreWebVitals_mobile.Overall_Category.category }}</span
                        >
                      </div>

                      <div class="col-2" v-else>No Sufficient Data</div>
                    </div>
                  </div>
                </div>
                <div class="nextable__card">
                  <div class="row nextable__head g-0">
                    <div class="col">
                      <span>Discover what your users are experiencing</span>
                    </div>
                    <div class="col-2"><span></span></div>
                    <div class="col-2"><span></span></div>
                  </div>

                  <div class="nextable__body__collection">
                    <div class="row nextable__body g-0" v-for="(donut, index) in donutChart_web" :key="(donut, index)">
                      <div class="col">
                        <span>{{ donut.title }}</span>
                      </div>
                      <div class="col-2" v-if="webCoreShow_web == true">
                        <span :class="[donut.category == 'SLOW' ? 'pill-badge red' : donut.category == 'FAST' ? 'pill-badge green' : 'pill-badge yellow']">{{ donut.category }}</span>
                      </div>

                      <div class="col-2" v-else>No Sufficient Data</div>

                      <div class="col-2" v-if="webCoreShow_mobile == true">
                        <span :class="[donutChart_mobile[index].category == 'SLOW' ? 'pill-badge red' : donutChart_mobile[index].category == 'FAST' ? 'pill-badge green' : 'pill-badge yellow']">{{
                          donutChart_mobile[index].category
                        }}</span>
                      </div>

                      <div class="col-2" v-else>No Sufficient Data</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="col-6" v-else>
              <img
                class="logo"
                style="width: 13vw"
                src="~@/assets/icons/data no found.png"
              />
            </div> -->
            <div class="col-6">
              <div class="nexcard h-100">
                <div class="d-flex">
                  <h6>Metrics</h6>
                  <small class="text-muted ms-2"></small>
                </div>
                <div class="nextable__card" v-if="merrics_web.length != 0">
                  <div class="row nextable__head g-0">
                    <div class="col"><span>Topics</span></div>
                    <div class="col-2"><span>Desktop</span></div>
                    <div class="col-2"><span>Mobile</span></div>
                  </div>

                  <div class="nextable__body__collection">
                    <div class="row nextable__body g-0" v-for="(metric, index) in merrics_web" :key="(metric, index)">
                      <div class="col">
                        <span>{{ metric.title }}</span>
                      </div>
                      <div class="col-2" v-if="LightHouse_webShow == true">
                        <span :class="[metric.category == 'Poor' ? 'pill-badge red' : metric.category == 'Good' ? 'pill-badge green' : 'pill-badge yellow']">{{ metric.display_value }}</span>
                      </div>
                      <div class="col-2" v-else>No Sufficient Data</div>
                      <div class="col-2" v-if="LightHouse_mobileShow == true">
                        <span :class="[merrics_mobile[index].category == 'Poor' ? 'pill-badge red' : merrics_mobile[index].category == 'Good' ? 'pill-badge green' : 'pill-badge yellow']">{{
                          merrics_mobile[index].display_value
                        }}</span>
                      </div>
                      <div class="col-2" v-else>No Sufficient Data</div>
                    </div>
                  </div>
                </div>

                <div v-else>Problem Collecting Data</div>
              </div>
            </div>

            <!-- <div class="col-6" v-else>
              <img
                class="logo"
                style="width: 13vw"
                src="~@/assets/icons/wrong_data.png"
              />
            </div> -->
          </div>
        </section>

        <section class="pie-charts__section mt-5">
          <div class="row">
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>Diagnose Performance Issues</h6>
                <div class="pie-chart">
                  <div class="row mt-3">
                    <div class="col-6 d-flex" v-if="LightHouse_webShow == true">
                      <radial-progress-bar
                        class="m-auto"
                        :diameter="220"
                        :completed-steps="1"
                        :strokeWidth="20"
                        :innerStrokeWidth="20"
                        :total-steps="LightHouse_web.Overall_Category.score"
                        inner-stroke-color="#efefef"
                        :start-color="[LightHouse_web.Overall_Category.score <= 0.49 ? '#efefef' : LightHouse_web.Overall_Category.score >= 0.9 ? '#5FB355' : '#EDB95E']"
                        :stop-color="[LightHouse_web.Overall_Category.score <= 0.49 ? '#efefef' : LightHouse_web.Overall_Category.score >= 0.9 ? '#5FB355' : '#EDB95E']"
                      >
                        <span class="mb-2 fw-600"> Desktop </span>
                        <p>
                          <span
                            :class="[
                              LightHouse_web.Overall_Category.score <= 0.49 ? 'pill-badge red mt-2' : LightHouse_web.Overall_Category.score >= 0.9 ? 'pill-badge green mt-2' : 'pill-badge yellow mt-2',
                            ]"
                          >
                            {{ (LightHouse_web.Overall_Category.score*100).toFixed(2) }} %</span
                          >
                        </p>
                      </radial-progress-bar>
                    </div>

                    <div class="col-6 d-flex" v-else>
                      <span class="m-auto fw-600 d-flex align-items-center">
                        <span class="material-icons-outlined text-danger me-1"> error </span>
                        Problem Collecting Data...
                      </span>
                    </div>

                    <div class="col-6 d-flex" v-if="LightHouse_mobileShow == true">
                      <radial-progress-bar
                        class="m-auto"
                        :diameter="220"
                        :completed-steps="1"
                        :strokeWidth="20"
                        :innerStrokeWidth="20"
                        :total-steps="LightHouse_mobile.Overall_Category.score"
                        inner-stroke-color="#efefef"
                        :start-color="[LightHouse_mobile.Overall_Category.score <= 0.49 ? '#B00020' : LightHouse_mobile.Overall_Category.score >= 0.9 ? '#5FB355' : '#EDB95E']"
                        :stop-color="[LightHouse_mobile.Overall_Category.score <= 0.49 ? '#B00020' : LightHouse_mobile.Overall_Category.score >= 0.9 ? '#5FB355' : '#EDB95E']"
                      >
                        <span class="mb-2 fw-600"> Mobile </span>
                        <p>
                          <span
                            :class="[
                              LightHouse_mobile.Overall_Category.score <= 0.49
                                ? 'pill-badge red mt-2'
                                : LightHouse_mobile.Overall_Category.score >= 0.9
                                ? 'pill-badge green mt-2'
                                : 'pill-badge yellow mt-2',
                            ]"
                          >
                            {{ (LightHouse_mobile.Overall_Category.score*100).toFixed(2) }} %</span
                          >
                        </p>
                      </radial-progress-bar>
                    </div>

                    <div class="col-6 d-flex" v-else>
                      <span class="m-auto fw-600 d-flex align-items-center">
                        <span class="material-icons-outlined text-danger me-1"> error </span>
                        Problem Collecting Data...
                      </span>
                    </div>
                  </div>

                  <div class="row text-center mt-auto mb-2" v-if="LightHouse_webShow == true">
                    <div class="col-3">
                      <span class="pill-badge red text-capitalize">{{ LightHouse_web.Overall_Category.category_range.split(",")[0] }} </span>
                    </div>

                    <div class="col-6">
                      <span class="pill-badge yellow text-capitalize">{{ LightHouse_web.Overall_Category.category_range.split(",")[1] }} </span>
                    </div>

                    <div class="col-3">
                      <span class="pill-badge green text-capitalize">{{ LightHouse_web.Overall_Category.category_range.split(",")[2] }} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>Website Screenshot</h6>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="me-2" v-if="LightHouse_webShow == true">
                    <div class="screenshot_web__img-wrapper">
                      <expandable-image class="image" :src="`data:image/png;base64,${SSimage_web[1]}`" alt=" " />
                    </div>
                  </div>

                  <div class="m-auto" v-else>
                    <span class="m-auto fw-600 d-flex align-items-center">
                      <span class="material-icons-outlined text-danger me-1"> error </span>
                      Problem Collecting Data...
                    </span>
                  </div>

                  <div class="ms-2" v-if="LightHouse_mobileShow == true">
                    <div class="screenshot_web__img-wrapper">
                      <expandable-image class="image" :src="`data:image/png;base64,${SSimage_mobile[1]}`" alt=" " />
                    </div>
                  </div>

                  <div class="m-auto" v-else>
                    <span class="m-auto fw-600 d-flex align-items-center">
                      <span class="material-icons-outlined text-danger me-1"> error </span>
                      Problem <br />
                      Collecting Data...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- <section class="pie-charts__section mt-5" v-else>
          <img
            class="logo"
            style="width: 13vw"
            src="~@/assets/icons/wrong_data.png"
          />
        </section> -->

        <section class="pie-charts__section mt-5">
          <div class="row" v-if="donutChart_web.length != 0">
            <div class="col-6 mb-5" v-for="(donut, index) in donutChart_web" :key="(donut, index)">
              <div class="nexcard h-100">
                <h6>{{ donut.title }}</h6>
                <div class="pie-chart">
                  <div class="row">
                    <div class="col-6" v-if="webCoreShow_web == true">
                      <apexchart type="donut" :options="donut.chartOptions" :series="donut.series"></apexchart>

                      <div class="row text-center">
                        <div class="col">
                          <span class="fw-600">Desktop</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-6" v-else>
                      <img class="logo" style="width: 13vw" src="~@/assets/icons/data no found.png" />
                    </div>
                    <div class="col-6" v-if="webCoreShow_mobile == true">
                      <apexchart type="donut" :options="donutChart_mobile[index].chartOptions" :series="donutChart_mobile[index].series"></apexchart>

                      <div class="row text-center">
                        <div class="col">
                          <span class="fw-600">Mobile</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-6" v-else>
                      <img class="logo" style="width: 13vw" src="~@/assets/icons/data no found.png" />
                    </div>
                  </div>

                  <div v-if="webCoreShow_web == true">
                    <div class="row m-auto my-3">
                      <div class="col-4 text-end pe-5">
                        <b v-if="donut.score != null">{{ donut.series[0] }} % </b>
                        <b v-else>0 % </b>
                      </div>
                      <div class="col-4 text-center">
                        <span class="pill-badge green force-capitalize">{{ donut.category_range.split(",")[0] }} </span>
                      </div>

                      <div class="col-4 text-start ps-5">
                        <b v-if="donutChart_mobile[index].score != null">{{ donutChart_mobile[index].series[0] }} % </b>
                        <b v-else>0 % </b>
                      </div>
                    </div>

                    <div class="row m-auto my-3">
                      <div class="col-4 text-end pe-5">
                        <b v-if="donut.score != null">{{ donut.series[1] }} % </b>
                        <b v-else>0 % </b>
                      </div>
                      <div class="col-4 text-center">
                        <span class="pill-badge yellow force-capitalize">{{ donut.category_range.split(",")[1] }} </span>
                      </div>

                      <div class="col-4 text-start ps-5">
                        <b v-if="donutChart_mobile[index].score != null">{{ donutChart_mobile[index].series[1] }} % </b>
                        <b v-else>0 % </b>
                      </div>
                    </div>

                    <div class="row m-auto my-3">
                      <div class="col-4 text-end pe-5">
                        <b v-if="donut.score != null">{{ donut.series[2] }} % </b>
                        <b v-else>0 % </b>
                      </div>
                      <div class="col-4 text-center">
                        <span class="pill-badge red force-capitalize">{{ donut.category_range.split(",")[2] }} </span>
                      </div>

                      <div class="col-4 text-start ps-5">
                        <b v-if="donutChart_mobile[index].score != null">{{ donutChart_mobile[index].series[2] }} % </b>
                        <b v-else>0 % </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- <section class="pie-charts__section mt-5" v-else>
          <img
            class="logo"
            style="width: 13vw"
            src="~@/assets/icons/data no found.png"
          />
        </section> -->
      </div>

      <!-- Tab - Details -->
      <div class="content__tab__details" v-else>
        <detail-tab />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import detailTab from "./DetailsTabDesktop.vue";
import PageSpeed from "@/store/PageSpeedAnalysis.js";
import ExpandableImage from "./ExpandableImage.vue";
import ExpandableImageMobile from "./ExpandableImageMobile.vue";
import RadialProgressBar from "vue-radial-progress";
import Enterprise from "@/store/Enterprise.js";
export default {
  name: "page_speed_insight",
  components: {
    detailTab,
    ExpandableImage,
    ExpandableImageMobile,
    RadialProgressBar,
  },

  data() {
    return {
      n: 1,
      tab__active: "Reports",
      tab__options: [
        { name: "Reports", class: "button__tab active" },
        { name: "Details", class: "button__tab " },
      ],

      campaign: [],
      values: [],

      coreWebVitals_web: [],
      SSdesc_web: "",
      LightHouse_web: [],
      Screenshot_web: [],
      SSimage_web: [],
      LightHouse_webShow: false,
      merrics_web: [],
      donutChart_web: [],
      webCoreShow_web: false,

      coreWebVitals_mobile: [],
      SSdesc_mobile: "",
      LightHouse_mobile: [],
      Screenshot_mobile: [],
      SSimage_mobile: [],
      LightHouse_mobileShow: false,
      merrics_mobile: [],
      donutChart_mobile: [],
      webCoreShow_mobile: false,

      chosen_route_data: [],
    };
  },
  methods: {
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

    loadResult() {
      this.campaign = this.chosen_route_data;
      this.values = this.chosen_route_data.values;

      this.values.forEach((element) => {
        if (element.slug === "desktop_CoreWebVital") {
          this.coreWebVitals_web = JSON.parse(element.data);
        }
        if (element.slug === "desktop_LightHouse") {
          this.LightHouse_web = JSON.parse(element.data);
        }

        if (element.slug === "desktop_Screenshot") {
          this.Screenshot_web = JSON.parse(element.data);
        }
      });

      if (this.Screenshot_web.description) {
        this.SSdesc_web = this.Screenshot_web.description["Final-Screenshot"];
      }

      if (this.coreWebVitals_web) {
        for (const [key, value] of Object.entries(this.coreWebVitals_web)) {
          if (key == "Overall_Category") {
            this.webCoreShow_web = true;
          }
        }

        for (const [key, value] of Object.entries(this.coreWebVitals_web)) {
          if (
            key != "Overall_Category" &&
            key != "URL"
            // &&
            // value.distribution !== null
          ) {
            this.donutChart_web.push(value);
          }
        }

        //

        this.donutChart_web.forEach((element, index) => {
          if (element.score !== null) {
            var data = [];

            element.distribution.forEach((value) => {
              data.push(Math.round((value.proportion / 1) * 100));
            });

            (this.donutChart_web[index].series = data),
              (this.donutChart_web[index].chartOptions = {
                labels: ["FAST", "AVERAGE", "SLOW"],
                colors: ["#5FB355", "#EDB95E", "#B00020"],
                chart: {
                  type: "donut",
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        //      name: {
                        // show: false,
                        //      },
                        //      value: {
                        // show: false,
                        //      },

                        total: {
                          show: true,
                          showAlways: true,

                          label: "75th Percentile",
                          fontSize: "13px",
                          color: "#373d3f",
                          formatter: function (w) {
                            if (element.title == "Cumulative Layout Shift Score") {
                              return element.score;
                            } else {
                              return element.score + "s";
                            }
                          },
                        },
                      },
                    },
                  },
                },

                tooltip: {
                  enabled: true,
                  y: {
                    formatter: function (val) {
                      return val + " %";
                    },
                  },
                },
                legend: {
                  show: false,
                },
                dataLabels: {
                  enabled: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 400,
                      },
                    },
                  },
                ],
              });
          } else {
            element.category = "N/A";
            // element.score=0

            var data = [100];

            // element.distribution.forEach((value) => {
            //   data.push(Math.round((value.proportion / 1) * 100));
            // });

            (this.donutChart_web[index].series = data),
              (this.donutChart_web[index].chartOptions = {
                labels: [0],
                colors: ["#bababa"],
                chart: {
                  type: "donut",
                  // background: '#efefef',
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        //      name: {
                        // show: false,
                        //      },
                        //      value: {
                        // show: false,
                        //      },

                        total: {
                          show: true,
                          showAlways: true,

                          label: "N/A",
                          fontSize: "13px",
                          color: "#373d3f",
                          formatter: function (w) {
                            return;
                          },
                        },
                      },
                    },
                  },
                },

                tooltip: {
                  enabled: false,
                  y: {
                    formatter: function (val) {
                      return val + " %";
                    },
                  },
                },
                legend: {
                  show: false,
                },
                dataLabels: {
                  enabled: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 400,
                      },
                    },
                  },
                ],
              });

            //
          }
        });
      }
      // //
      if (this.LightHouse_web) {
        for (const [key, value] of Object.entries(this.LightHouse_web)) {
          if (key == "Overall_Category") {
            this.LightHouse_webShow = true;
          }
        }
      }

      if (this.LightHouse_web) {
        for (const [key, value] of Object.entries(this.LightHouse_web)) {
          if (key != "Overall_Category" && key != "URL") {
            this.merrics_web.push(value);
          }
        }
      }
      if (this.Screenshot_web.data) {
        this.SSimage_web = this.Screenshot_web.data["Final-Screenshot"];
      }
      this.values.forEach((element) => {
        if (element.slug === "mobile_CoreWebVital") {
          this.coreWebVitals_mobile = JSON.parse(element.data);
        }
        if (element.slug === "mobile_LightHouse") {
          this.LightHouse_mobile = JSON.parse(element.data);
        }
        if (element.slug === "mobile_FailedAudits") {
          this.FailedAudits = JSON.parse(element.data);
        }
        if (element.slug === "mobile_DiagnosticAudits") {
          this.DiagnosticAudits = JSON.parse(element.data);
        }
        if (element.slug === "mobile_PassedAudits") {
          this.PassedAudits = JSON.parse(element.data);
        }
        if (element.slug === "mobile_Screenshot") {
          this.Screenshot_mobile = JSON.parse(element.data);
        }
      });
      //
      //
      //
      //
      //
      //
      if (this.Screenshot_mobile.description) {
        this.SSdesc_mobile = this.Screenshot_mobile.description["Final-Screenshot"];
      }

      if (this.coreWebVitals_mobile) {
        for (const [key, value] of Object.entries(this.coreWebVitals_mobile)) {
          if (key == "Overall_Category") {
            this.webCoreShow_mobile = true;
          }
        }

        for (const [key, value] of Object.entries(this.coreWebVitals_mobile)) {
          if (
            key != "Overall_Category" &&
            key != "URL"
            // &&
            // value.distribution !== null
          ) {
            this.donutChart_mobile.push(value);
          }
        }

        //

        this.donutChart_mobile.forEach((element, index) => {
          if (element.score !== null) {
            var data = [];

            element.distribution.forEach((value) => {
              data.push(Math.round((value.proportion / 1) * 100));
            });

            (this.donutChart_mobile[index].series = data),
              (this.donutChart_mobile[index].chartOptions = {
                labels: ["FAST", "AVERAGE", "SLOW"],
                colors: ["#5FB355", "#EDB95E", "#B00020"],
                chart: {
                  type: "donut",
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        //      name: {
                        // show: false,
                        //      },
                        //      value: {
                        // show: false,
                        //      },

                        total: {
                          show: true,
                          showAlways: true,

                          label: "75th Percentile",
                          fontSize: "13px",
                          color: "#373d3f",
                          formatter: function (w) {
                            if (element.title == "Cumulative Layout Shift Score") {
                              return element.score;
                            } else {
                              return element.score + "s";
                            }
                          },
                        },
                      },
                    },
                  },
                },

                tooltip: {
                  enabled: true,
                  y: {
                    formatter: function (val) {
                      return val + " %";
                    },
                  },
                },
                legend: {
                  show: false,
                },
                dataLabels: {
                  enabled: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 400,
                      },
                    },
                  },
                ],
              });
          } else {
            element.category = "N/A";
            // element.score=0

            var data = [100];

            // element.distribution.forEach((value) => {
            //   data.push(Math.round((value.proportion / 1) * 100));
            // });

            (this.donutChart_mobile[index].series = data),
              (this.donutChart_mobile[index].chartOptions = {
                labels: [0],
                colors: ["#bababa"],
                chart: {
                  type: "donut",
                  // background: '#efefef',
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        //      name: {
                        // show: false,
                        //      },
                        //      value: {
                        // show: false,
                        //      },

                        total: {
                          show: true,
                          showAlways: true,

                          label: "N/A",
                          fontSize: "13px",
                          color: "#373d3f",
                          formatter: function (w) {
                            return;
                          },
                        },
                      },
                    },
                  },
                },

                tooltip: {
                  enabled: false,
                  y: {
                    formatter: function (val) {
                      return val + " %";
                    },
                  },
                },
                legend: {
                  show: false,
                },
                dataLabels: {
                  enabled: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 400,
                      },
                    },
                  },
                ],
              });

            //
          }
        });
      }
      // //
      if (this.LightHouse_mobile) {
        for (const [key, value] of Object.entries(this.LightHouse_mobile)) {
          if (key == "Overall_Category") {
            this.LightHouse_mobileShow = true;
          }
        }
      }
      if (this.LightHouse_mobile) {
        for (const [key, value] of Object.entries(this.LightHouse_mobile)) {
          if (key != "Overall_Category" && key != "URL") {
            this.merrics_mobile.push(value);
          }
        }
      }
      if (this.Screenshot_mobile.data) {
        this.SSimage_mobile = this.Screenshot_mobile.data["Final-Screenshot"];
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
  text-transform: lowercase;
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
  text-transform: lowercase;
}
.pill-badge.green {
  text-transform: lowercase;
  background-color: #e2f2e3;
  color: #4dae50;
}

.pill-badge:first-letter {
  text-transform: uppercase;
}

.nexcard .pie-chart {
  display: grid;
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
  padding: 1rem 2rem;
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

.force-capitalize {
  display: block;
  width: 200px;
  margin: 0 auto;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.force-capitalize:first-letter {
  text-transform: uppercase;
}
</style>
