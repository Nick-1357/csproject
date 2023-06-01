<template>
  <div>
    <b-modal id="modal-view-graph" size="lg" centered hide-footer hide-header>
      <b>{{ chosen_linechart_top_errors.title }}</b>
      <div id="chart">
        <apexchart type="area" height="300" :options="chosen_linechart_top_errors.linechart_top_errors.chartOptions" :series="chosen_linechart_top_errors.linechart_top_errors.series"></apexchart>
      </div>
    </b-modal>
    <div class="nexcard">
      <!-- Table Top Bar -->
      <div class="d-flex flex-column">
        <div class="nextable-topbar mb-auto">
          <h5 class="me-auto">Top Errors</h5>
          <div v-if="changeTab_TopErrorsTabGroup2 == 'Graph'">
            <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="chosenError" @change="changeProject(chosenError)">
              <option :value="item" :key="index" v-for="(item, index) in errors">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <button v-for="item in tabs" :key="'tabs' + item" @click="changeTab(item)" :class="item.class" style="width: 80px">
              {{ item.name }}
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="indexationOverview__list" v-if="changeTab_TopErrorsTabGroup2 == 'List'">
          <div class="nextable">
            <!-- Table Head -->
            <div class="nextable__head">
              <div class="row g-0">
                <div class="col-4"><p>Name</p></div>
                <div class="col-2"><p class="ps-2">Change (%)</p></div>
                <div class="col"><p>No of errors</p></div>
                <div class="col-auto indexation__chartview">
                  <p>Chart View</p>
                </div>
              </div>
            </div>

            <!-- Table Body -->
            <div class="nextable__body">
              <div class="row g-0" :key="'topErrors' + index" v-for="(item, index) in topErrors">
                <div class="col-4">
                  <router-link
                    :to="{
                      name: 'topErrors',
                      params: {
                        page: item.title,
                      },
                    }"
                  >
                    <p class="indexation__name">
                      {{ item.title }}
                    </p>
                  </router-link>
                </div>

                <div class="col-2">
                  <div class="indexation__score-wrapper d-flex align-items-end">
                    <!-- red down-->
                    <div v-if="item.pct == 0 || item.pct == null || item.pct < 0" class="indexation__score red">
                      <span class="material-icons-outlined"  v-if="item.pct < 0"> north </span>

                      <span class="text-muted" v-if="item.pct == 0 || item.pct == null"> 0 </span>

                      <span class="text-danger" v-else-if="item.pct < 0"> {{ item.pct.toFixed(2) }} </span>
                    </div>

                    <!-- green up-->
                    <div v-else class="indexation__score green">
                      <span class="material-icons-outlined"> north </span>

                      <span style="font-size: 14px" class="text-success"> >{{ item.pct.toFixed(2) }} </span>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <p>{{ item.status }}</p>
                </div>
                <div class="col-auto indexation__chartview">
                  <button class="btn btn-grey-outlined" @click="openGraph(item)">View Graph</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="indexationOverview__graph mt-4" v-if="changeTab_TopErrorsTabGroup2 == 'Graph'">
          <!-- TODO: insert graph here -->
          <div id="chart">
            <apexchart type="line" height="402" :options="chosenError.linechart.chartOptions" :series="chosenError.linechart.series"></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Enterprise from "@/store/Enterprise.js";
export default {
  data() {
    return {
      n: 1,
      tabs: [
        {
          name: "List",
          class: "btn btn-grey-outlined br-l topErrors__tabgroup2 active",
        },
        {
          name: "Graph",
          class: "btn btn-grey-outlined br-r topErrors__tabgroup2",
        },
      ],
      chosen_category: "Indexation",
      categories: [
        {
          name: "Indexation",
          class: "btn btn-grey-outlined br-l topErrors__tabgroup1 active",
        },
        {
          name: "Content",
          class: "btn btn-grey-outlined br-r topErrors__tabgroup1",
        },
      ],
      changeTab_TopErrorsTabGroup2: "List",
      pageTitle: "",
      pageDesc: "",
      pageData: [],
      valueToSend: [],
      summary: [],
      links_breakdown: [],
      value: [],
      page: "",
      linechart_top_errors: [],
      linechart: [],
      campaign: [],
      StructuredData: [],
      showStructure: [],
      topQueryAll: [],
      topQuery: [],
      fullPage: 0,
      selectedLength: 5,
      SortLength: [5, 10, 20, 50],
      pageCurrent: 1,
      AllQuery: [],
      search_keyword: "",

      buttons: [
        { caption: "Last 7 days", state: false },
        { caption: "Last 30 days", state: false },
        { caption: "Last 90 days", state: true },
        { caption: "Last 6 months", state: false },
      ],
      chosenView: "Last 90 days",
      errors: [],
      chosenError: "",
      projects: [{ name: "Projects(6) selected" }],

      secColoumn: [
        { name: "Max Links" },
        { name: "Max Mobile Description" },
        { name: "Max Redirections" },
        { name: "Max Title Length" },
        { name: "Max URL Length" },
        { name: "Medium Bot Hits" },
        { name: "Medium Server Response" },
      ],
      chosen2ndColoumn: "Max Links",
      chosenProjects: "",
      topErrors: [
        // {title:'Non 301 Redirects', count1:846, count2:846, chart:[]},
      ],
      stacked: [],
      value: [],
      chosen_linechart_top_errors: [],
    };
  },
  methods: {
    openGraph(data) {
      this.chosen_linechart_top_errors = data;
      console.log(this.chosen_linechart_top_errors);
      this.$bvModal.show("modal-view-graph");
    },
    changeCategory(data) {
      this.chosenError = data.name;
      this.chosen_category = data.name;
      this.categories.forEach((element) => {
        if (element.name == data.name) {
          element.class = element.class + " active";
        } else {
          if (element.name == "Indexation") {
            element.class = "btn btn-grey-outlined br-l topErrors__tabgroup1";
          } else {
            element.class = "btn btn-grey-outlined br-r topErrors__tabgroup1";
          }
        }
      });
    },
    changeTab(data) {
      this.changeTab_TopErrorsTabGroup2 = data.name;
      this.tabs.forEach((element) => {
        if (element.name == data.name) {
          element.class = element.class + " active";
        } else {
          if (element.name == "List") {
            element.class = "btn btn-grey-outlined br-l topErrors__tabgroup2";
          } else {
            element.class = "btn btn-grey-outlined br-r topErrors__tabgroup2";
          }
        }
      });
    },
    errorsButton() {
      if (this.$route.params.fromDefault) {
        this.$router.push({
          name: "CrawlIssue",
          params: {
            fromDefault: "fromDefault",
          },
        });
      } else {
        this.$router.push({ name: "CrawlIssue" });
      }
    },
    RecommendationSelect() {
      if (this.$route.params.fromDefault) {
        this.$router.push({
          name: "CrawlIssueTracker",
          params: {
            fromDefault: "fromDefault",
          },
        });
      } else {
        this.$router.push({ name: "CrawlIssueTracker" });
      }
    },
    chooseErrorDetails(data) {
      this.$router.push({
        name: "topErrors",
        params: {
          id: this.$route.params.id,
          page: data,
        },
      });
    },
    changeProject(data) {
      ////
      this.chosenError = data;
    },
    changeView(data) {
      this.buttons.forEach((element, index) => {
        if (data == index) {
          this.buttons[index].state = true;
          this.chosenView = this.buttons[index].caption;
        } else {
          this.buttons[index].state = false;
          this.chosenView = this.buttons[index].caption;
        }
      });

      ////
    },
    searchKeyword() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities(1);
      }, 500);
    },

    getActivities() {
      this.search_keyword = this.search_keyword.toLowerCase();
      this.pageCurrent = 1;

      if (this.search_keyword == null || this.search_keyword == "") {
        this.topQueryAll = this.AllQuery;
        this.topQuery = this.topQueryAll.slice(0, this.selectedLength);
      } else {
        this.topQueryAll = [];
        this.AllQuery.forEach((element) => {
          if (element.url.toLowerCase().search(this.search_keyword) >= 0) {
            this.topQueryAll.push(element);
          }
        });
      }

      this.topQuery = this.topQueryAll.slice((this.pageCurrent - 1) * this.selectedLength, (this.pageCurrent - 1) * this.selectedLength + this.selectedLength);

      if (this.topQueryAll.length % this.selectedLength == 0) {
        this.fullPage = this.topQueryAll.length / this.selectedLength;
      } else {
        this.fullPage = Math.floor(this.topQueryAll.length / this.selectedLength) + 1;
      }
    },

    changePage(data) {
      if (data == "add") {
        if (this.pageCurrent < 1) {
        } else {
          ////

          this.pageCurrent = this.pageCurrent + 1;
          // //
          //   this.pageCurrent,
          //   this.topQueryAll.length / this.selectedLength,
          //   this.topQueryAll.length % this.selectedLength,
          //   Math.floor(this.topQueryAll.length / this.selectedLength)
          // );

          if (this.topQueryAll.length % this.selectedLength == 0) {
            if (this.pageCurrent <= this.topQueryAll.length / this.selectedLength) {
              this.topQuery = this.topQueryAll.slice((this.pageCurrent - 1) * this.selectedLength, (this.pageCurrent - 1) * this.selectedLength + this.selectedLength);
            } else {
              this.pageCurrent = this.topQueryAll.length / this.selectedLength;
            }
          } else {
            if (this.pageCurrent <= Math.floor(this.topQueryAll.length / this.selectedLength) + 1) {
              this.topQuery = this.topQueryAll.slice((this.pageCurrent - 1) * this.selectedLength, (this.pageCurrent - 1) * this.selectedLength + this.selectedLength);
            } else {
              this.pageCurrent = Math.floor(this.topQueryAll.length / this.selectedLength) + 1;
            }
          }
        }
      } else {
        if (this.topQueryAll.length % this.selectedLength == 0) {
          if (this.pageCurrent > this.topQueryAll.length / this.selectedLength) {
          } else {
            ////

            this.pageCurrent = this.pageCurrent - 1;
            // //
            //   this.pageCurrent,
            //   this.topQueryAll.length / this.selectedLength
            // );

            if (this.pageCurrent >= 1) {
              this.topQuery = this.topQueryAll.slice((this.pageCurrent - 1) * this.selectedLength, (this.pageCurrent - 1) * this.selectedLength + this.selectedLength);
            } else {
              this.pageCurrent = 1;
            }
          }
        } else {
          if (this.pageCurrent > Math.floor(this.topQueryAll.length / this.selectedLength) + 1) {
          } else {
            ////

            this.pageCurrent = this.pageCurrent - 1;
            // //
            //   this.pageCurrent,
            //   Math.floor(this.topQueryAll.length / this.selectedLength) + 1
            // );

            if (this.pageCurrent >= 1) {
              this.topQuery = this.topQueryAll.slice((this.pageCurrent - 1) * this.selectedLength, (this.pageCurrent - 1) * this.selectedLength + this.selectedLength);
            } else {
              this.pageCurrent = 1;
            }
          }
        }
      }

      ////

      ////
    },
    sortLength() {
      ////

      this.pageCurrent = 1;

      this.topQuery = this.topQueryAll.slice(0, this.selectedLength);

      if (this.topQueryAll.length % this.selectedLength == 0) {
        this.fullPage = this.topQueryAll.length / this.selectedLength;
      } else {
        this.fullPage = Math.floor(this.topQueryAll.length / this.selectedLength) + 1;
      }
    },
    firstPage() {
      this.pageCurrent = 1;

      this.topQuery = this.topQueryAll.slice(0, this.selectedLength);
    },
    lastPage() {
      this.pageCurrent = this.fullPage;

      this.topQuery = this.topQueryAll.slice((this.pageCurrent - 1) * this.selectedLength, (this.pageCurrent - 1) * this.selectedLength + this.selectedLength);
    },
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    Enterprise.fetchData(this.$route.params.id, 1).then((response) => {
      this.value = response.data.data.values;
      const found = this.value.find((element) => element.slug === "issue_dashboard");

      var SampleData = {
        indexation: JSON.parse(found.data).indexation,
        content: JSON.parse(found.data).content,
      };

      for (const [key, value] of Object.entries(SampleData)) {
        ////

        var project = [];
        var count = 0;
        var AllSeries = [];
        var dates = [];
        var times = [];
        for (const [key2, value_inside] of Object.entries(value)) {
          var series = [];
          value_inside.graph_data.forEach((element) => {
            //  //
            if (count <= 0) {
              var myDate = element.date;
              myDate = myDate.split("/");
              var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
              // //

              // var date = new Date(element.timestamp);
              // //

              // dates.push(newDate.getTime());

              // //

              // //

              dates.push(element.timestamp * 1000);
              times.push(element.timestamp);
            }
            series.push(element.number);

            // series.push(element.status_5xx)
          });

          count++;

          AllSeries.push({ name: value_inside.title, data: series });

          project.push({
            name: value_inside.title,
            value_inside,
            data: series,
            dates: dates,
            times: times,
          });
        }
        ////

        var linechart = [];

        (linechart.series = AllSeries),
          (linechart.chartOptions = {
            chart: {
              responsive: true,
              height: 350,
              type: "line",
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
              },
              toolbar: {
                autoSelected: "zoom",
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            legend: {
              position: "right",
              horizontalAlign: "right",
              itemMargin: {
                horizontal: 0,
                vertical: 0,
              },
            },
            markers: {
              size: 0.7,
            },
            xaxis: {
              categories: dates,
              type: "datetime",
              labels: {
                format: "dd MMM",
              },
              //  min: dates[0], // start date
              // max: dates[dates.length-1], // end date
              // tickAmount: dates.length,
            },
            yaxis: {
              reversed: false,

              legend: {
                position: "top",
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5,
              },
            },

            title: {
              text: "",
              align: "left",
              show: true,
            },
            colors: ["#1f77b4", "#9467bd", "#ff7f0e", "#8c564b", "#7f7f7f", "#bbbc26", "#e377c2", "#17becf"],
            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                },
              },
              x: {
                show: true,

                formatter: function (val, index) {
                  ////
                  var date = new Date(val);
                  // //
                  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                  //return new Date(val).toLocaleDateString() + " " +date.toLocaleTimeString();
                  return date.getDate() + " " + month[date.getMonth()] + " " + date.toLocaleTimeString();
                  //return new Date(val).toLocaleString();
                },
              },

              // y: [
              //   {
              //     title: {
              //       formatter: function (val) {
              //         return val;
              //       },
              //     },
              //   },
              // ],
            },
            grid: {
              borderColor: "#f1f1f1",
            },
          });

        this.errors.push({
          name: key,
          projects: project,
          linechart: linechart,
          dates: dates,
          data: AllSeries,
          times: times,
        });
      }
      //console.log(this.errors);

      this.chosenError = this.errors[0];

      var arr1 = JSON.parse(found.data).indexation;

      var arr2 = JSON.parse(found.data).content;

      var merged = {
        ...arr1,
        ...arr2,
      };

      var issue_top = JSON.parse(found.data).top_issue;

      // console.log(issue_top)

      var arranged_array = {};

      for (const [key2, value2] of Object.entries(issue_top)) {
        for (const [key, value] of Object.entries(merged)) {
          if (key == value2.index) {
            arranged_array[key] = value;
          }
        }
      }

      // //

      // //

      for (const [key, value] of Object.entries(arranged_array)) {
        ////
        // console.log(key, value)

        var dates = [];
        var series = [];
        value.graph_data.forEach((element, index) => {
          ////

          var myDate = element.date;
          myDate = myDate.split("/");
          var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
          // //

          var date = new Date(element.timestamp);
          // //

          //  //

          //newDate.getTime()

          dates.push(element.timestamp * 1000);

          series.push(element.number);
        });
        //
        this.topErrors.push({
          key: key,
          title: value.title,
          status: value.current_stats.number,
          pct: value.current_stats.pct_change,
          diff: value.current_stats.difference,
          linechart_top_errors: {
            series: [
              {
                name: key,
                data: series,
              },
            ],
            chartOptions: {
              chart: {
                toolbar: {
                  show: false,
                },
                responsive: true,
                height: 80,
                type: "area",
                dropShadow: {
                  enabled: true,
                  color: "#000",
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2,
                },
                zoom: {
                  enabled: false,
                },
              },

              dataLabels: {
                enabled: true,
              },
              stroke: {
                width: 2,
              },
              markers: {
                size: 0,
              },

              xaxis: {
                categories: dates,
                type: "datetime",
                labels: {
                  format: "dd MMM",
                },
                show: true,
                lines: {
                  show: true,
                },
                labels: {
                  show: true,
                },
              },

              yaxis: {
                show: true,

                legend: {
                  position: "top",
                  horizontalAlign: "right",
                  floating: true,
                  offsetY: -25,
                  offsetX: -5,
                },
                lines: {
                  show: true,
                },
              },

              title: {
                text: "",
                align: "left",
                show: false,
              },
              colors: ["#1f77b4", "#9467bd", "#ff7f0e", "#8c564b"],
              tooltip: {
                //                 custom: function({series, seriesIndex, dataPointIndex, w}) {
                //   var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

                //   return '<div  style="height:2w; width:2vw">' +
                //   '<div>' + data + '</div>' +
                //   '</div>';
                // }

                y: [
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
                show: true,

                yaxis: {
                  show: true,
                },
                xaxis: {
                  show: true,
                },
              },
            },
          },
        });
      }

      this.topErrors.forEach((element) => {
        for (const [key, value] of Object.entries(SampleData)) {
          for (const [key2, value_inside] of Object.entries(value)) {
            //  console.log(key2)
            if (element.key == key2) {
              element.category = key;
            }
          }
        }
      });

      this.chosen_linechart_top_errors = this.topErrors[0];

      // console.log(this.topErrors);
      // console.log(SampleData);
      // console.log(this.errors);
      loader.hide();
    });
  },
};
</script>

<style scoped>
/* input css */
.form-select {
  width: 250px;
  height: 38px;
  border-radius: 6px;
  border-color: #bcbdbc;
  margin-right: 10px;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  position: relative;
}
.nexcard.details {
  cursor: pointer;
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
  .nexcard {
    height: 712px;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 58vh;
  }
  .nexcard {
    height: 510px;
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
</style>
