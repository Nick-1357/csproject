<template>
  <div>
    <b-modal id="modal-upgrade-keyword" centered hide-footer hide-header>
      <h4 class="text-darkgreen mb-3">Upgrade Keyword</h4>
      <div class="card-text">
        <span for="fname">URL Count *</span>
      </div>
      <div class="card-text">
        <b-form-input autocorrect="off" autocomplete="off" v-model="seo_title" type="text" id="seo_title" name="seo_title" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('seo_title')">{{ errors.first("seo_title") }}</span>
      </div>
    </b-modal>

    <div class="page-wrapper-lg">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal" v-if="$route.params.project">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>

          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link
            :to="{
              name: 'projects',
              params: { id: $route.params.project },
            }"
            class="route__link"
            >Project</router-link
          >
          /Enterprise SEO
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="/enterprise_seo/table/view_all" class="route__link">Enterprise SEO</router-link>
          / {{ campaign.title | capitalize }}
        </p>
      </div>

      <!-- Title - Campaign Details -->
      <!-- <h2 class="text-darkgreen mb-4">Campaign Name</h2>
      <h4 class="text-darkgreen mb-3">Campaign Details</h4> -->

      <!-- Card - Campaign Details -->
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
              <h6>Company Name</h6>
              <h6 class="mb-0 text-muted">{{ campaign.company_name }}</h6>
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
          <div v-if="!processing" class="details__right d-flex align-items-center ms-4">
            <router-link class="btn btn-primary-outlined text-nowrap" :to="{ name: 'enterprise_seo_allTasks' }">See All Tasks</router-link>

            <!-- Dropdown Button Variant 1 -->
            <!-- <span class="material-icons-outlined text-primary arrow-icon ms-2" v-b-toggle.details__dropdown-content> expand_more </span> -->
            <!-- Dropdown Button Variant 2 -->
            <button class="btn-primary ms-2 btn-arrow-icon">
              <span class="material-icons-outlined text-white arrow-icon" v-b-toggle.details__dropdown-content> expand_more </span>
            </button>
          </div>
        </div>

        <!-- Dropdown Contents -->
        <b-collapse id="details__dropdown-content">
          <div class="details__dropdown-contents px-2 pt-5 pb-3">
            <div class="row">
              <div class="col-5" v-for="item in metadata" :key="'metadata' + item">
                <div class="me-5">
                  <div class="d-flex">
                    <h6 class="me-auto">{{ item.key | crawl_input }}</h6>
                    <h6 class="text-muted">{{ item.value }}</h6>
                  </div>
                </div>
              </div>
              <!-- <div class="col-2 d-flex">
                <div class="ms-auto">
                  <button
                    class="btn btn-primary"
                    v-b-modal.modal-upgrade-keyword
                  >
                    Upgrade Keyword
                  </button>
                </div>
              </div> -->
            </div>
          </div>
        </b-collapse>
      </div>

      <div class="nexcard mt-5 mb-3" v-if="processing">
        <div class="row">
          <div class="col text-center">
            <h4>{{ duration.toFixed(2) }}</h4>
          </div>
        </div>
        <!-- :percent="duration.toFixed(2)" -->
        <div class="row mt-3 d-flex justify-content-center">
          <div class="col text-center">
            <k-progress
              :showText="false"
              activeColor="#AA22E9"
              :border="true"
              :lineHeight="20"
              :cutWidth="100"
              color="rgb(33, 186, 233)"
              bgColor="#ddd"
              type="line"
              active
              :percent="Math.round(duration)"
              style="padding-right: 0 !important"
            >
            </k-progress>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col text-center">
            <p>Kindly wait, your Result is being generated...</p>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- Title - Text Indexation -->
        <h4 class="text-darkgreen mb-3">Indexation Overview</h4>

        <indexation-overview />

        <section class="page__metrics__section mt-5">
          <div class="page__metrics__title row pt-3">
            <div class="col-8">
              <h4 class="text-darkgreen mb-3">Pages</h4>
            </div>
            <div class="col-4">
              <h4 class="text-darkgreen mb-3">Non-Indexable Pages</h4>
            </div>
          </div>
          <div class="page__metrics__cards row pt-2 pb-3">
            <div class="col-2" v-for="(card, index) in Nexcard_Metrics" :key="'Nexcard_Metrics' + index">
              <div class="nexcard-metrics" @click="choosePage(card.slug)">
                <div class="card__topwrapper">
                  <span class="card__title">{{ card.name }}</span>
                  <!-- <span class="material-icons-outlined icon__tooltip" v-b-tooltip.hover.top.v-primary="card.description"> help_outline </span> -->
                </div>
                <div class="card__bottomwrapper">
                  <img :src="require(`@/assets/icons/${card.icon}.svg`)" />
                  <h3>{{ card.pages }}</h3>
                  <span class="material-icons-outlined icon__view-more"> arrow_forward </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pie-charts__section mt-5">
          <h4 class="text-darkgreen mb-4">Performance</h4>
          <div class="row">
            <div class="col-4">
              <div @click="choosePage('allStatusCode')" class="nexcard-chart">
                <div class="d-flex">
                  <h5>Status Codes</h5>
                  <span class="material-icons-outlined icon__view-more ms-auto">arrow_forward</span>
                </div>
                <div id="chart" class="pie-chart">
                  <apexchart type="donut" height="400" :options="donutChart.chartOptions" :series="donutChart.series"></apexchart>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div @click="choosePage('allLoadTime')" class="nexcard-chart">
                <div class="d-flex">
                  <h5>Load Time</h5>
                  <span class="material-icons-outlined icon__view-more ms-auto">arrow_forward</span>
                </div>
                <div id="chart" class="pie-chart">
                  <apexchart type="donut" height="400" :options="loadTime_chart.chartOptions" :series="loadTime_chart.series"></apexchart>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div @click="choosePage('allLinksBreakdown')" class="nexcard-chart">
                <div class="d-flex">
                  <h5>Links breakdown</h5>
                  <span class="material-icons-outlined icon__view-more ms-auto">arrow_forward</span>
                </div>
                <div id="chart" class="pie-chart">
                  <apexchart type="donut" height="400" :options="LinksBreakdown_chart.chartOptions" :series="LinksBreakdown_chart.series"></apexchart>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pie-charts__section mt-5">
          <h4 class="text-darkgreen mb-4">Words Charts</h4>
          <div class="row">
            <div class="col-6">
              <div @click="chooseWordCount('allWord', 'allWord')" class="nexcard-chart">
                <div class="d-flex">
                  <h5 class="text-darkgreen">Word Count Evaluation</h5>
                  <span class="material-icons-outlined icon__view-more ms-auto">arrow_forward</span>
                </div>
                <!-- TODO: insert graph here -->

                <div id="chart">
                  <apexchart type="bar" height="350" :options="stacked.chartOptions" :series="stacked.series"></apexchart>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div @click="chooseStructure('all', 'all')" class="nexcard-chart">
                <div class="d-flex">
                  <h5 class="text-darkgreen">Structured Data Distribution</h5>
                  <span class="material-icons-outlined icon__view-more ms-auto">arrow_forward</span>
                </div>
                <!-- TODO: insert graph here -->
                <div id="chart">
                  <apexchart type="bar" height="350" :options="structured.chartOptions" :series="structured.series"></apexchart>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Enterprise from "@/store/Enterprise.js";
import IndexationOverview from "./IndexationOverview.vue";
export default {
  components: { IndexationOverview },
  data() {
    return {
      n: 1,
      // changeTab_TopErrorsTabGroup2: "All",
      changeTab_TopErrorsTabGroup2: "List",
      Nexcard_Metrics: [
        {
          slug: "pages_in_structure",
          name: "Total Pages",
          icon: "icon-totalpages",
          tooltip: "blah",
        },
        {
          slug: "pages_crawled",
          name: "Pages Crawled",
          icon: "icon-pagescrawled",
          tooltip: "blah",
        },
        {
          slug: "indexable_canonical",
          name: "Canonical Pages",
          icon: "icon-canonical",
          tooltip: "blah",
        },
        {
          slug: "non_canonical",
          name: "Non-canonical Pages",
          icon: "icon-noncanonical",
          tooltip: "blah",
        },
        {
          slug: "non_index_meta_robot",
          name: "Meta Robots",
          icon: "icon-metarobots",
          tooltip: "blah",
        },
        {
          slug: "non_index_robot_txt",
          name: "Robots.txt",
          icon: "icon-robots",
          tooltip: "blah",
        },
      ],
      campaign: [],
      value: [],
      duration: 0,
      interval: null,
      processing: true,
      completeDuration: [],
      showCrawl: true,
      Percentage: null,
      timer: null,
      selected: "",
      options: [],
      seo_title: "",
      metadata: [],

      LinkStatusInsight: [
        { page: "Pages pointing to 2xx", pages: 51, links: 1597 },
        { page: "Pages pointing to 3xx", pages: 54, links: 17 },
        { page: "Pages pointing to 4xx", pages: 51, links: 1597 },
        { page: "Pages pointing to 4xx", pages: 51, links: 1597 },
      ],
      status_code: [],
      summary: [],
      linksInsight: [
        { title: "Number of follow inlinks", score: 1705 },
        { title: "Page with 1 follow inlink", score: 1 },
        { title: "Pages with less than 10 follow inlinks", score: 5 },
      ],
      linechart: [],
      linechartTest: [],

      StructuredData: [],

      nestedData: [],
      donutChart: [],
      stacked: [],
      loadTime: [],
      loadTime_chart: [],
      LinksBreakdown: [],
      LinksBreakdown_chart: [],
      word_count: [],
      structured: [],

      seriesRadial: [76],
      chartOptionsRadial: {
        colors: ["#4A90E2"],
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Average Results"],
      },
    };
  },
  methods: {
    openError() {
      this.$router.push({
        name: "errorOverview",
      });
    },

    choosePage(data) {
      ////

      this.$router.push({
        name: "CrawlInsightPage",
        params: {
          page: data,
        },
      });
    },
    chooseWordCount(category, series) {
      this.$router.push({
        name: "CrawlWordCount",
        params: {
          category: category,
          series: series,
        },
      });
    },
    chooseStructure(category, data) {
      this.$router.push({
        name: "CrawlStuructured",
        params: {
          page: data,
          category: category,
        },
      });
    },

    displayResult() {
      Enterprise.fetchData(this.$route.params.id, 1)
        .then((response) => {
          // //
          this.campaign = response.data.data;
          this.value = response.data.data.values;

          this.campaign.metadata.forEach((element) => {
            if (element.key != "client_id" && element.key != "robotstxt_obey") {
              this.metadata.push(element);
            }
          });

          this.metadata.forEach((element) => {
            if (
              element.key != "company_name" &&
              element.key != "max_url" &&
              element.key != "depth_limit" &&
              element.key != "max_speed" &&
              element.key != "user_agent" &&
              element.key != "sitemaps_urls"
            ) {
              ////
              if (element.value == 1) {
                element.value = true;
              } else {
                element.value = false;
              }
            }
          });
          //

          const foundSummary = this.value.find((element) => element.slug === "summary");

          this.summary = JSON.parse(foundSummary.data);

          this.Nexcard_Metrics.forEach((element) => {
            for (const [key, value] of Object.entries(this.summary.stats)) {
              if (element.slug == key) {
                element.description = value.description;
                element.pages = value.pages;
              }
            }
          });

          const found = this.value.find((element) => element.slug === "status_code");

          this.status_code = JSON.parse(found.data);

          var first_series = [];
          var first_label = [];
          for (const [key, value] of Object.entries(this.status_code.stats)) {
            first_series.push(Math.round((value.Percentage / 1) * 100));
            first_label.push(key);
          }

          this.donutChart.series = first_series;
          this.donutChart.chartOptions = {
            labels: first_label,
            colors: ["#5FB355", "#EDB95E", "#B00020", "#4A90E2"],
            chart: {
              type: "donut",

              events: {
                dataPointSelection: (event, chartContext, config) => {
                  ////
                  ////
                  ////

                  ////

                  this.choosePage(config.w.config.labels[config.dataPointIndex]);

                  // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                },
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "40%",
                  labels: {
                    show: true,
                    total: {
                      show: false,
                      showAlways: true,

                      label: "60 %",
                      fontSize: "2vw",
                      color: "#373d3f",
                      formatter: function (w) {
                        return "";
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
              show: true,
              position: "bottom",
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
          };

          const foundload = this.value.find((element) => element.slug === "load_time");

          this.loadTime = JSON.parse(foundload.data);

          var first_series = [];
          var first_label = [];
          for (const [key, value] of Object.entries(this.loadTime.stats)) {
            first_series.push(Math.round((value.Percentage / 1) * 100));
            first_label.push(key);
          }

          this.loadTime_chart.series = first_series;
          this.loadTime_chart.chartOptions = {
            labels: first_label,
            // colors: ["#B00020", "#EDB95E", "#4A90E2", "#5FB355",],
            colors: [
              function ({ value, seriesIndex, w }) {
                // //

                if (w.config.labels[seriesIndex] == "Too Slow (> 2s)") {
                  return "#B00020";
                } else if (w.config.labels[seriesIndex] == "Slow (1.0s - 2.0s)") {
                  return "#EDB95E";
                } else if (w.config.labels[seriesIndex] == "Fast (< 0.5s)") {
                  return "#5FB355";
                } else if (w.config.labels[seriesIndex] == "Medium (0.5s - 1.0s)") {
                  return "#4A90E2";
                } else {
                  return "#99A7BE";
                }
              },
            ],
            chart: {
              type: "donut",
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  // //
                  // //
                  // //

                  ////

                  this.choosePage(config.w.config.labels[config.dataPointIndex]);

                  // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                },
              },
            },

            plotOptions: {
              pie: {
                donut: {
                  size: "40%",
                  labels: {
                    show: true,
                    total: {
                      show: false,
                      showAlways: true,

                      label: "60 %",
                      fontSize: "2vw",
                      color: "#373d3f",
                      formatter: function (w) {
                        return "";
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
              show: true,

              position: "bottom",
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
          };

          const foundLink = this.value.find((element) => element.slug === "links_breakdown");

          this.LinksBreakdown = JSON.parse(foundLink.data);

          var first_series = [];
          var first_label = [];
          for (const [key, value] of Object.entries(this.LinksBreakdown.stats)) {
            first_series.push(Math.round((value.Percentage / 1) * 100));
            first_label.push(key);
          }

          this.LinksBreakdown_chart.series = first_series;
          this.LinksBreakdown_chart.chartOptions = {
            labels: first_label,
            // colors: ["#1f77b4", "#ff7f0e", "#8c564b", "#9467bd"],
            colors: ["#bc80bd", "#80b1d3", "#fdb462", "#ffed6f"],
            chart: {
              type: "donut",
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  // //
                  // //

                  this.choosePage(config.w.config.labels[config.dataPointIndex]);

                  // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                },
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "40%",
                  labels: {
                    show: true,
                    total: {
                      show: false,
                      showAlways: true,

                      label: "60 %",
                      fontSize: "2vw",
                      color: "#373d3f",
                      formatter: function (w) {
                        return "";
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
              show: true,
              position: "bottom",
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
          };

          const foundword_count_eval = this.value.find((element) => element.slug === "word_count_eval");

          this.word_count = JSON.parse(foundword_count_eval.data);

          var series = [];

          for (const [key, value] of Object.entries(this.word_count.data)) {
            series.push({ name: key, data: value });
          }

          (this.stacked.series = series),
            (this.stacked.chartOptions = {
              chart: {
                type: "bar",
                height: 350,
                stacked: true,
                stackType: "100%",
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    // //
                    //   chartContext.w.config.series[config.seriesIndex].name,
                    //   chartContext.w.config.xaxis.categories[
                    //     config.dataPointIndex
                    //   ]
                    // )

                    this.chooseWordCount(
                      chartContext.w.config.xaxis.categories[config.dataPointIndex],
                      chartContext.w.config.series[config.seriesIndex].name,
                      chartContext.w.config.xaxis.categories[config.dataPointIndex]
                    );

                    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                  },
                },
              },

              // colors: ["#B00020", "#D88090" ,  "#EDB95E","#F6DCAF", "#5FB355", "#9FD199"],
              colors: ["#B00020", "#D88090", "#EDB95E", "#F6DCAF", "#9FD199", "#5FB355"],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      position: "bottom",
                      offsetX: -10,
                      offsetY: 0,
                    },
                  },
                },
              ],
              tooltip: {
                x: {
                  show: true,
                },
                y: {
                  formatter: function (value) {
                    return value;
                  },
                  title: {
                    formatter: (seriesName) => seriesName,
                  },
                },
              },

              xaxis: {
                categories: this.word_count.category.main,
              },
              yaxis: {
                labels: {
                  formatter: function (value) {
                    return value + "%";
                  },
                },
              },
              fill: {
                opacity: 1,
              },
              legend: {
                position: "right",
                offsetX: 0,
                offsetY: 50,
              },
              dataLabels: {
                enabled: false,
              },
            });

          const foundStructured = this.value.find((element) => element.slug === "structured_data_distribution");

          var series = [];

          for (const [key, value] of Object.entries(JSON.parse(foundStructured.data).stats.index)) {
            for (const [key_1, value_1] of Object.entries(JSON.parse(foundStructured.data).stats.data)) {
              if (key == key_1) {
                series.push({ name: value, data: value_1 });
              }
            }
          }

          (this.structured.series = series),
            (this.structured.chartOptions = {
              chart: {
                type: "bar",
                height: 350,
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    // //
                    //   chartContext.w.config.series[config.seriesIndex].name,
                    //   chartContext.w.config.xaxis.categories[
                    //     config.dataPointIndex
                    //   ]
                    // );

                    this.chooseStructure(chartContext.w.config.series[config.seriesIndex].name, chartContext.w.config.xaxis.categories[config.dataPointIndex]);

                    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                  },
                },
              },
              colors: ["#bc80bd", "#80b1d3", "#fdb462", "#ffed6f"],
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              xaxis: {
                categories: JSON.parse(foundStructured.data).stats.columns,
              },
              yaxis: {
                title: {
                  text: "",
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return val;
                  },
                },
              },
            }),
            (this.StructuredData = JSON.parse(foundStructured.data).data);
          ////

          loader.hide();
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    },
  },

  destroyed() {
    clearInterval(this.interval);
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    Enterprise.fetchData(this.$route.params.id, 1)
      .then((response) => {
        this.campaign = response.data.data;

        if (this.campaign.complete_percentage < 100) {
          this.duration = this.campaign.complete_percentage;
          this.processing = true;

          this.interval = setInterval(() => {
            Enterprise.fetchData(this.$route.params.id, 1).then((response) => {
              if (response.data.data.complete_percentage >= 100) {
                clearInterval(this.interval);
                location.reload();
                this.processing = false;
                this.displayResult();
              } else {
                this.duration = response.data.data.complete_percentage;
                this.processing = true;
              }
            });
          }, 10000);
        } else {
          this.duration = 100;
          this.processing = false;
          this.displayResult();
        }

        loader.hide();
      })
      .catch((error) => {
        console.log(error);
        loader.hide();
      });
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  position: relative;
}
.nexcard.details {
  user-select: none;
}
.nextable-topbar {
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  margin-bottom: 1rem;
}
.nextable .nextable__head {
  background-color: transparent !important;
  top: 0;
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__body {
  overflow-y: scroll;
  position: relative;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body {
    max-height: 60vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 58vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body {
    height: 50vh;
  }
}
.nextable .nextable__head {
  margin-right: 8px;
}
.nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2,
.nextable .nextable__head .col-4,
.nextable .nextable__head .col-5,
.nextable .nextable__head .col-6 {
  padding: 1rem;
  font-weight: bold;
}
.nextable .nextable__head p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
/* .nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
} */

.nextable__body .row {
  border-bottom: 1px solid #e6e6e6;
}
.nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2,
.nextable .nextable__body .col-4,
.nextable .nextable__body .col-5,
.nextable .nextable__body .col-6 {
  padding: 1rem;
  align-items: center;
  display: flex;
}
.nextable .col-auto {
  padding: 1rem;
}
.nextable .nextable__body p {
  margin: 0;
}
.nextable .nextable__body .indexation__name {
  margin: 0;
  color: #323233;
  text-decoration: underline;
  cursor: pointer;
}

.nextable .nextable__body .indexation__score {
  display: flex;
  align-items: center;
  margin: 0;
  color: #323233;
}
.nextable .nextable__body .indexation__score.green {
  color: #4da351;
}
.nextable .nextable__body .indexation__score.green .material-icons-outlined {
  transform: rotate(0deg);
}

.nextable .nextable__body .indexation__score.red {
  color: #e11300;
}
.nextable .nextable__body .indexation__score.red .material-icons-outlined {
  transform: rotate(180deg);
}

.nextable .nextable__body .indexation__lcrawled {
  margin: 0;
  color: #4da351;
}
.nextable .indexation__chartview {
  text-align: center;
  width: 142px;
}

/* nexcard metrics */
.nexcard-metrics {
  display: flex;
  align-items: start;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 20px;
  padding: 0.8rem 0.8rem 0.8rem 1rem;
  flex-direction: column;
  cursor: pointer;
}
.card__topwrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.card__topwrapper .card__title {
  color: #6f6f6f;
  font-size: 15px;
  white-space: nowrap;
}
.card__topwrapper .icon__tooltip {
  color: #c5c5c5;
  font-size: 18px;
}
.card__bottomwrapper {
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 100%;
}
.card__bottomwrapper img {
  height: 35px;
}
.page__metrics__cards .col-2:nth-child(4) .card__bottomwrapper img {
  height: 32px;
}

.card__bottomwrapper h3 {
  color: var(--color-primary);
  margin-left: 1rem;
  font-size: 42px;
  margin-bottom: 0;
  line-height: 40px;
}

.nexcard-metrics .card__bottomwrapper .icon__view-more {
  margin-left: auto;
  font-size: 35px;
  margin-bottom: 0;
  line-height: 28px;
  opacity: 0;
  color: #c5c5c5;
  transition: 0.2s ease-out;
  translate: -20px;
}
.nexcard-metrics:hover .card__bottomwrapper .icon__view-more {
  opacity: 1;
  transition: 0.2s ease-out;
  translate: 3px;
}

.pie-charts__section .nexcard-chart .icon__view-more {
  margin-left: auto;
  font-size: 35px;
  margin-bottom: 0;
  line-height: 28px;
  opacity: 0;
  color: #c5c5c5;
  transition: 0.2s ease-out;
  translate: -20px;
}
.pie-charts__section .nexcard-chart:hover .icon__view-more {
  opacity: 1;
  transition: 0.2s ease-out;
  translate: 3px;
}

@media screen and (max-width: 1600px) {
  .nexcard-metrics .card__title {
    font-size: 13px;
  }
}

.nexcard-chart {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  position: relative;
  cursor: pointer;
}
.nexcard-chart h5 {
  color: var(--color-darkgreen);
}
.pie-chart {
  display: grid;
  place-content: center;
  aspect-ratio: 1/1;
}
/* input css */
.input-select {
  width: 250px;
  height: 38px;
  border-radius: 6px;
  border-color: #bcbdbc;
}
/* .details__dropdown-button.collapsed .arrow-icon {
  rotate: 0deg;
  transition: 0.4s ease-out;
}
.details__dropdown-button.not-collapsed .arrow-icon {
  rotate: 180deg;
  transition: 0.4s ease-out;
} */

.arrow-icon[aria-expanded="false"] {
  rotate: 0deg;
  transition: 0.3s ease-out;
}
.arrow-icon[aria-expanded="true"] {
  rotate: 180deg;
  transition: 0.3s ease-out;
}

.tooltip .tooltip-inner {
  max-width: var(--bs-tooltip-max-width);
  padding: var(--bs-tooltip-padding-y) var(--bs-tooltip-padding-x);
  color: var(--color-primary) !important;
  text-align: center;
  background-color: var(--bs-tooltip-bg);
  border-radius: var(--bs-tooltip-border-radius);
}
</style>
