<template>
  <div>
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
              params: { id: $route.params.project },
            }"
            class="route__link"
            >Project</router-link
          >
          /Keyword Discovery
        </p>

        <p class="text-muted fw-normal" v-else>
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard </router-link>/
          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'keyword_discovery' },
            }"
            class="route__link"
            >View All </router-link
          >/ Keyword Discovery
        </p>
      </div>

      <div class="nexcard h-100 px-4 py-3 mt-3 mb-4">
        <div class="row">
          <div class="col-3">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Title</span>
              <span class="projectgroup__desc">{{ campaign.title | capitalize }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Keyword</span>
              <span class="projectgroup__desc pe-3"> {{ campaign.keyword }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Locations</span>
              <span class="projectgroup__desc">{{ campaign.locations[0] | loc }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="projectinfo__group">
              <span class="projectgroup__title">Created By</span>
              <span class="projectgroup__desc">{{ campaign.creator }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="nexcard p-4" v-if="Percentage < 100">
        <div class="row mt-4">
          <div class="col text-center">
            <h4>{{ Percentage }} %</h4>
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
              :percent="Percentage"
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

      <div class="nexcard p-0 pt-4" v-else>
        <!-- BodyFix Section - Tabs -->
        <div class="keyworddiscovery__tabs px-4">
          <button class="keyworddiscovery__tab" :class="tab.class" v-for="(tab, index) in options" :key="'tab' + index" @click="select(tab)">
            <img class="keyworddiscovery__tab__img" :src="require(`@/assets/icons/${tab.icon}.svg`)" />
            <span class="keyworddiscovery__tab__title">{{ tab.name }}</span>
          </button>
        </div>
        <div class="row g-0">
          <div class="col-3">
            <!-- <div class="input-wrapper pt-4 px-4">
              <div class="search input-group">
                <span class="input-group-prepend">
                  <div class="input-group-text bg-transparent">
                    <span class="material-icons-outlined">search</span>
                  </div>
                </span>
                <input type="search" id="form1" class="form-control border-left-0" placeholder="Search" />
              </div>
            </div> -->
            <div class="d-flex p-2">
              <h6 class="ms-3 mt-2 fw-600">Average Monthly Searches</h6>
            </div>

            <!-- aaa -->
            <div class="left-col">
              <div :class="item[8]" @click="selectedData(item)" :key="'keyword_discovert' + index" v-for="(item, index) in general">
                <div class="keyword__text">
                  <h6>{{ item[0] }}</h6>
                  <span class="text-muted"> {{ item[1] }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-9 right-col py-4">
            <div class="d-flex">
              <h3 class="text-darkgreen me-auto">{{ selected[0] }}</h3>

              <button @click="addKeywordPool(selected[0])" v-b-tooltip.hover.top="{ variant: 'primary' }" title="Add to Keyword Pool" class="btn btn-primary-outlined h-38px">
                <span class="material-icons-outlined"> add </span>
              </button>
            </div>

            <div class="row py-3">
              <div class="col-3">
                <div class="nexcard-inner">
                  <img src="@/assets/icons/icon-target-goal.svg" alt="Level" />
                  <div class="card__textWrapper">
                    <h5>{{ selected[2] }}</h5>
                    <span class="card__title text-muted">Competition Level</span>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="nexcard-inner">
                  <img src="@/assets/icons/icon-bulletpoints-blue.svg" alt="Index" />
                  <div class="card__textWrapper">
                    <h5>{{ selected[3] }}</h5>
                    <span class="card__title text-muted">Competition Index</span>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="nexcard-inner">
                  <img src="@/assets/icons/icon-trending-down-blue.svg" alt="Low Range" />
                  <div class="card__textWrapper">
                    <h5>{{ selected[6] }}</h5>
                    <span class="card__title text-muted">Low Range - USD</span>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="nexcard-inner">
                  <img src="@/assets/icons/icon-trending-up-blue.svg" alt="High Range" />
                  <div class="card__textWrapper">
                    <h5>{{ selected[7] }}</h5>
                    <span class="card__title">High Range - USD</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="nexcard chart p-4 mt-3">
              <div id="chart">
                <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
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
import KeywordDiscovery from "@/store/KeywordDiscovery.js";
import Auth from "@/store/Auth.js";
export default {
  data() {
    return {
      Tabs_Keyworddiscovery: [
        {
          name: "Google Ads",
          icon: "icon-googleads-alt-logo",
          class: "keyworddiscovery__tab active",
        },
        {
          name: "Google Suggest",
          icon: "icon-google-alt-logo",
          class: "keyworddiscovery__tab",
        },
        {
          name: "Auto Complete",
          icon: "icon-check-green",
          class: "keyworddiscovery__tab",
        },
        {
          name: "List of Questions",
          icon: "help-circle",
          class: "keyworddiscovery__tab",
        },
        {
          name: "Related Words",
          icon: "icon-related-words",
          class: "keyworddiscovery__tab",
        },
      ],
      chosenTab_Keyworddiscovery: "Google Ads",

      campaign: [],

      GoogleAds: [],
      GoogleAdsTitle: [],

      GoogleSuggest: [],
      GoogleSuggestTitle: [],

      Autocomplete: [],
      AutocompleteTitle: [],

      QuestionList: [],
      QuestionListTitle: [],

      RelatedWords: [],
      RelatedWordsTitle: [],

      general: [],
      generalTitle: [],

      selected: [],
      component: "",
      options: [],

      mobileComponet: [],
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },

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
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
          colors: ["#01BFF1"],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },

      Percentage: 0,
      interval: null,
      completeDuration: null,
      duration: null,
    };
  },

  methods: {
    addKeywordPool(data) {
      Auth.addKeywordsPool(data)
        .then((res) => {
          this.$toast.success("Keyword Added " + res.data.message + "ly!");

          // this.$bvToast.toast(res.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          var list_keyword = [];

          // for (var count = 1; count < 5; count++) {
          //   Auth.keywordsPool(count)
          //     .then((response) => {
          //       response.data.data.data.forEach((element) => {
          //         list_keyword.push(element);
          //       });
          //       localStorage.setItem("keyword_pool", JSON.stringify(list_keyword));
          //     })
          //     .catch((error) => {});
          //   console.log(error);
          // }
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },

    selectedData(data) {
      // console.log(this.general, data);

      this.general.forEach((element) => {
        if (element[0] == data[0]) {
          element[8] = element[8] = "left-col__keyword px-4 active";
        } else {
          element[8] = "left-col__keyword px-4";
        }
      });

      this.selected = data;

      var month = [];

      data[5].forEach((element, index) => {
        ////
        ////

        month.push({ month: element, val: data[4][index] });
      });

      this.selected.data = month;

      (this.series = [
        {
          name: "Data Searches",
          data: this.selected[4],
        },
      ]),
        (this.chartOptions = {
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "30%",
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
            categories: this.selected[5],
          },
          yaxis: {
            title: {
              text: "Data Searches",
            },
          },
          fill: {
            opacity: 1,
            colors: ["#2D8FE2"],
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val;
              },
            },
          },
        }),
        ////
        this.$bvModal.show("modal-details");
    },

    select(data) {
      ////
      this.options.forEach((element) => {
        if (element.name === data.name) {
          element.class = "keyworddiscovery__tab active";
        } else {
          element.class = "keyworddiscovery__tab";
        }
      });
      this.component = data.name;

      this.selected = [];

      if (data.name == "Google Ads") {
        this.generalTitle = this.GoogleAdsTitle;
        this.general = this.GoogleAds;
      } else if (data.name == "Google Suggest") {
        this.generalTitle = this.GoogleSuggestTitle;
        this.general = this.GoogleSuggest;
      } else if (data.name == "Auto Complete") {
        this.generalTitle = this.AutocompleteTitle;
        this.general = this.Autocomplete;
      } else if (data.name == "List of Questions") {
        this.generalTitle = this.QuestionListTitle;
        this.general = this.QuestionList;
      } else if (data.name == "Related Words") {
        this.generalTitle = this.RelatedWordsTitle;
        this.general = this.RelatedWords;
      }
      this.selectedData(this.general[0]);

      ////
    },

    showResult() {
      var Google_Ads_Keyword_Planner = JSON.parse(this.campaign.values.find((element) => element.slug === "Google_Ads_Keyword_Planner").data);

      this.GoogleAdsTitle = Google_Ads_Keyword_Planner[1][0];

      if (this.GoogleAdsTitle != undefined) {
        this.options.push({
          name: "Google Ads",
          icon: "icon-googleads-alt-logo",
          class: "keyworddiscovery__tab",
        });
      }

      Google_Ads_Keyword_Planner[1].forEach((element, index) => {
        if (index != 0) {
          this.GoogleAds.push(element);
        }
      });

      // aaa
      this.GoogleAds.forEach((element, index) => {
        ////

        if (index == 0) {
          element.push("left-col__keyword px-4 active");
        } else {
          element.push("left-col__keyword px-4");
        }
      });

      //

      var Google_Suggest = JSON.parse(this.campaign.values.find((element) => element.slug === "Google_Suggest").data);

      this.GoogleSuggestTitle = Google_Suggest[1][0];

      if (this.GoogleSuggestTitle != undefined) {
        this.options.push({
          name: "Google Suggest",
          icon: "icon-google-alt-logo",
          class: "keyworddiscovery__tab",
        });
      }

      Google_Suggest[1].forEach((element, index) => {
        if (index != 0) {
          this.GoogleSuggest.push(element);
        }
      });

      this.GoogleSuggest.forEach((element, index) => {
        ////

        if (index == 0) {
          element.push("left-col__keyword px-4 active");
        } else {
          element.push("left-col__keyword px-4");
        }
      });

      //

      var Autocomplete = JSON.parse(this.campaign.values.find((element) => element.slug === "Autocomplete").data);

      this.AutocompleteTitle = Autocomplete[1][0];

      ////

      if (this.AutocompleteTitle != undefined) {
        this.options.push({
          name: "Auto Complete",
          icon: "icon-check-green",
          class: "keyworddiscovery__tab",
        });
      }

      Autocomplete[1].forEach((element, index) => {
        if (index != 0) {
          this.Autocomplete.push(element);
        }
      });

      //
      this.Autocomplete.forEach((element, index) => {
        ////

        if (index == 0) {
          element.push("left-col__keyword px-4 active");
        } else {
          element.push("left-col__keyword px-4");
        }
      });

      var List_of_Questions = JSON.parse(this.campaign.values.find((element) => element.slug === "List_of_Questions").data);

      this.QuestionListTitle = List_of_Questions[1][0];

      if (this.QuestionListTitle != undefined) {
        this.options.push({
          name: "List of Questions",
          icon: "help-circle",
          class: "keyworddiscovery__tab",
        });
      }

      List_of_Questions[1].forEach((element, index) => {
        if (index != 0) {
          this.QuestionList.push(element);
        }
      });

      this.QuestionList.forEach((element, index) => {
        ////

        if (index == 0) {
          element.push("left-col__keyword px-4 active");
        } else {
          element.push("left-col__keyword px-4");
        }
      });

      //

      var Related_Words = JSON.parse(this.campaign.values.find((element) => element.slug === "Related_Words").data);

      this.RelatedWordsTitle = Related_Words[1][0];

      if (this.RelatedWordsTitle != undefined) {
        this.options.push({
          name: "Related Words",
          icon: "icon-related-words",
          class: "keyworddiscovery__tab",
        });
      }

      Related_Words[1].forEach((element, index) => {
        if (index != 0) {
          this.RelatedWords.push(element);
        }
      });

      this.RelatedWords.forEach((element, index) => {
        ////

        if (index == 0) {
          element.push("left-col__keyword px-4 active");
        } else {
          element.push("left-col__keyword px-4");
        }
      });

      //

      this.options.forEach((element, index) => {
        if (index == 0) {
          this.options[index].class = "keyworddiscovery__tab active";
          this.component = element.name;
          this.mobileComponet = element;
        } else {
          this.options[index].class = "keyworddiscovery__tab";
        }

        ////
      });

      this.GoogleAds = this.GoogleAds.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

      this.GoogleSuggest = this.GoogleSuggest.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

      this.Autocomplete = this.Autocomplete.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

      this.QuestionList = this.QuestionList.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

      this.RelatedWords = this.RelatedWords.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));

      if (this.component == "Google Ads") {
        this.generalTitle = this.GoogleAdsTitle;
        this.general = this.GoogleAds;
      } else if (this.component == "Google Suggest") {
        this.generalTitle = this.GoogleSuggestTitle;
        this.general = this.GoogleSuggest;
      } else if (this.component == "Autocomplete") {
        this.generalTitle = this.AutocompleteTitle;
        this.general = this.Autocomplete;
      } else if (this.component == "List of Questions") {
        this.generalTitle = this.QuestionListTitle;
        this.general = this.QuestionList;
      } else if (this.component == "Related Words") {
        this.generalTitle = this.RelatedWordsTitle;
        this.general = this.RelatedWords;
      }

      this.selectedData(this.general[0]);
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

    KeywordDiscovery.fetchQuery({
      id: this.$route.params.id,
      LocationID: this.$route.params.location,
    })
      .then((response) => {
        this.campaign = response.data.data;

        var created = new Date(this.campaign.created_at);

        if (moment(new Date()).isBefore(moment(new Date(created.getTime() + 2 * 60000))) || moment(new Date()).isSame(moment(new Date(created.getTime() + 2 * 60000)))) {
          this.completeDuration = 180000;
          this.duration = 180000 - moment.duration(moment(new Date(created.getTime() + 2 * 60000)).diff(moment(new Date()))).as("milliseconds");

          this.Percentage = ((this.duration / this.completeDuration) * 100).toFixed(2);

          console.log(this.Percentage);

          this.interval = setInterval(() => {
            //

            if (moment(new Date()).isBefore(moment(new Date(created.getTime() + 2 * 60000))) || moment(new Date()).isSame(moment(new Date(created.getTime() + 2 * 60000)))) {
              this.completeDuration = 180000;
              this.duration = 180000 - moment.duration(moment(new Date(created.getTime() + 2 * 60000)).diff(moment(new Date()))).as("milliseconds");

              this.Percentage = ((this.duration / this.completeDuration) * 100).toFixed(2);

              // //
            } else {
              this.Percentage = 100;
              clearInterval(this.interval);
              location.reload();
            }
          }, 10000);
        } else {
          this.Percentage = 100;
          clearInterval(this.interval);
          this.campaign = response.data.data;
          this.showResult();
        }

        loader.hide();
      })
      .catch((error) => {
        loader.hide();
        console.log(error);
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

/* nexcard inner css */
.nexcard-inner {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 20px;
  padding: 1rem;
  overflow: hidden;
}
.card__textWrapper {
  height: 100%;
  padding-left: 1rem;
}
.nexcard-inner .card__title {
  color: #6f6f6f;
  font-size: 15px;
  font-weight: 400;
}
@media screen and (max-width: 1600px) {
  .nexcard-inner .card__title {
    font-size: 13px;
  }
}
/* Bodyfix section - Tabs */
.keyworddiscovery__tabs {
  display: flex;
  border-bottom: 2px solid #e8e8e8;
}
.keyworddiscovery__tab {
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
.keyworddiscovery__tab:hover {
  background-color: #dcefff;
  /* border-bottom: 2px solid #4e4e4e; */
  transition: 0.4s ease-out;
}
.keyworddiscovery__tab.active {
  /* border-bottom: 2px solid #1464c0; 
  background-color: #ececec;*/
  background-color: #2c8de0;
  transition: all 0.4s ease-out;
}
.keyworddiscovery__tab__img {
  height: 24px;
  object-fit: contain;
}
.keyworddiscovery__tab.active .keyworddiscovery__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
.keyworddiscovery__tab .keyworddiscovery__tab__title {
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
/* aaa */
.left-col .left-col__keyword.active {
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
</style>
