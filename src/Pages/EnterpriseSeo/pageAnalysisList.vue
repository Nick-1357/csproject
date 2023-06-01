<template>
  <div>
    <div class="page-wrapper-lg">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="/enterprise_seo/table/view_all" class="route__link">Enterprise SEO</router-link>
          /
          <router-link
            :to="{
              name: 'enterprise_seo',
              params: { id: campaign.id },
            }"
            class="route__link"
            >{{ campaign.title }}</router-link
          >
          / Page Speed Analysis list
        </p>
      </div>
      <h3 class="text-darkgreen mb-4">Page Analysis</h3>

      <div class="nexcard">
        <div class="nextable">
          <!-- Table Head -->
          <div class="nextable__head">
            <div class="row g-0">
              <div class="w-80 title"><p>Url</p></div>
              <div class="w-20 title"><p>Action</p></div>
            </div>
          </div>

          <!-- Table Body -->
          <div class="nextable__body">
            <div class="row g-0 p-2" :key="'topQuery' + index" v-for="(tr, index) in topQuery">
              <div class="w-60 item">
                <p>{{ tr.url }}</p>
              </div>

              <div class="w-20 item" v-if="tr.PageSpeed_id && tr.percentage < 100">
                <button class="btn btn-outline-info w-100" disabled>In Progress</button>
              </div>

              <div class="w-20 item" v-if="!tr.PageSpeed_id">
                <button class="btn btn-primary" @click="analysePage(tr.url)">Analyse Now</button>
              </div>

              <div class="w-20 item" v-if="tr.PageSpeed_id && tr.percentage >= 100">
                <button class="btn btn-outline-success" @click="viewResult(tr.PageSpeed_id)">View Result</button>
              </div>

              <div class="w-20 item" v-if="tr.PageSpeed_id">
                <button class="btn btn-primary-outlined" @click="analysePage(tr.url)">Re-Analyse</button>
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
import Enterprise from "@/store/Enterprise.js";

export default {
  components: {},
  data() {
    return {
      campaign: [],
      value: [],
      search_keyword: "",
      analysedList: [],
      StructuredData: [
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },

        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
        {
          url: "https://ses.ryte.com/nexmind-ai/search-success/trial",
          fcp: 35,
          lcp: 35,
          fid: 35,
          cls: 35,
        },
      ],
      topQueryAll: [],
      topQuery: [],
      fullPage: 0,
      selectedLength: 5,
      SortLength: [5, 10, 20, 50],
      pageCurrent: 1,
      AllQuery: [],
    };
  },
  methods: {
    viewResult(id) {
      //

      this.$router.push({
        name: "enterprise_seo_page_insight",
        params: {
          link_id: id,
          id: this.$route.params.id,
        },
      });
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

    analysePage(url) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      var obj = { url: url };

      //  //

      Enterprise.pageSpeed(this.$route.params.id, obj)
        .then((response) => {
          //

          Enterprise.fetchData(this.$route.params.id, 1)
            .then((response) => {
              this.$toast.success("Your result is being generated");

              this.analysedList = response.data.data.pageSpeedCheckCapmaigns;

              this.topQuery = this.topQueryAll;

              this.topQuery.forEach((element) => {
                this.analysedList.forEach((element_analysed) => {
                  if (element.url == element_analysed.url) {
                    element.PageSpeed_id = element_analysed.id;
                    element.percentage = element_analysed.complete_percentage;
                  }
                });
              });

              //
              var analysedArray = [];
              var nonAnalysedArray = [];

              this.topQuery.forEach((element) => {
                if (element.PageSpeed_id == undefined) {
                  nonAnalysedArray.push(element);
                } else {
                  analysedArray.push(element);
                }
              });

              this.topQuery = analysedArray.concat(nonAnalysedArray);

              this.AllQuery = this.topQuery;

              this.pageCurrent = 1;

              //

              loader.hide();
              //
            })
            .catch((err) => {
              console.log(err);
              loader.hide();
            });
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
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

    Enterprise.fetchData(this.$route.params.id, 1)
      .then((response) => {
        this.campaign = response.data.data;
        this.value = response.data.data.values;
        this.analysedList = response.data.data.pageSpeedCheckCapmaigns;

        const foundStructured = this.value.find((element) => element.slug === "performance_score");
        this.StructuredData = JSON.parse(foundStructured.data).data;
        // this.topQuery = JSON.parse(foundStructured.data).data;

        this.topQuery = Object.assign([], this.StructuredData);

        this.topQuery.forEach((element) => {
          this.analysedList.forEach((element_analysed) => {
            if (element.url == element_analysed.url) {
              element.PageSpeed_id = element_analysed.id;
              element.percentage = element_analysed.complete_percentage;
            }
          });
        });

        //
        var analysedArray = [];
        var nonAnalysedArray = [];

        this.topQuery.forEach((element) => {
          if (element.PageSpeed_id == undefined) {
            nonAnalysedArray.push(element);
          } else {
            analysedArray.push(element);
          }
        });

        this.topQuery = analysedArray.concat(nonAnalysedArray);

        this.AllQuery = this.topQuery;

        this.topQueryAll = this.topQuery;

        //

        loader.hide();
      })
      .catch(() => {
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
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1rem;
  position: relative;
}

/* nextable css */
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
    max-height: 58vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 56vh;
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
  margin-right: 12px;
  margin-left: 8px;
}
/* .nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2,
.nextable .nextable__head .col-4,
.nextable .nextable__head .col-5,
.nextable .nextable__head .col-6 {
  padding: 1rem;
  font-weight: bold;
} */
.nextable .nextable__head .title {
  padding: 0.5rem;
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
/* .nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2,
.nextable .nextable__body .col-4,
.nextable .nextable__body .col-5,
.nextable .nextable__body .col-6 {
  padding: 1rem;
  align-items: center;
  display: flex;
} */

.nextable .nextable__body .item {
  padding: 0.5rem;
  align-items: start;
  display: flex;
}
.nextable .col-auto {
  padding: 1rem;
}
.nextable .nextable__body p {
  margin: 0;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
</style>
