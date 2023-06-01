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
          >/ Overview
        </p>
      </div>
      <h3 class="text-darkgreen mb-4">{{ pageTitle }}</h3>

      <div class="nexcard">
        <div v-if="this.$route.params.page == 'pages_in_structure' || this.$route.params.page == 'pages_crawled'" style="margin-top: 1vw" class="row">
          <div class="col">
            <vue-good-table
              :columns="columnsStructureCrawl"
              :rows="valueToSend"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [5, 10, 20, 50],
                dropdownAllowAll: true,
                setCurrentPage: 1,
                jumpFirstOrLast: true,
                firstLabel: 'First',
                lastLabel: 'Last',
                nextLabel: 'next',
                prevLabel: 'prev',
                rowsPerPageLabel: 'Per page',
                ofLabel: 'of',
                pageLabel: 'page', // for 'pages' mode
                allLabel: 'All',
              }"
            >
            </vue-good-table>
          </div>
        </div>

        <div v-else-if="this.$route.params.page == 'non_canonical'" style="margin-top: 1vw" class="row">
          <div class="col">
            <vue-good-table
              :columns="columnsNon"
              :rows="valueToSend"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [5, 10, 20, 50],
                dropdownAllowAll: true,
                setCurrentPage: 1,
                jumpFirstOrLast: true,
                firstLabel: 'First',
                lastLabel: 'Last',
                nextLabel: 'next',
                prevLabel: 'prev',
                rowsPerPageLabel: 'Per page',
                ofLabel: 'of',
                pageLabel: 'page', // for 'pages' mode
                allLabel: 'All',
              }"
            >
            </vue-good-table>
          </div>
        </div>

        <div
          v-else-if="this.$route.params.page == 'indexable_canonical' || this.$route.params.page == 'non_index_meta_robot' || this.$route.params.page == 'non_index_robot_txt'"
          style="margin-top: 1vw"
          class="row"
        >
          <div class="col">
            <vue-good-table
              :columns="columnsOther"
              :rows="valueToSend"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [5, 10, 20, 50],
                dropdownAllowAll: true,
                setCurrentPage: 1,
                jumpFirstOrLast: true,
                firstLabel: 'First',
                lastLabel: 'Last',
                nextLabel: 'next',
                prevLabel: 'prev',
                rowsPerPageLabel: 'Per page',
                ofLabel: 'of',
                pageLabel: 'page', // for 'pages' mode
                allLabel: 'All',
              }"
            >
            </vue-good-table>
          </div>
        </div>

        <div
          v-else-if="this.page == 'External follow' || this.page == 'Internal follow' || this.page == 'Internal nofollow' || this.page == 'External nofollow' || this.page == 'allLinksBreakdown'"
          style="margin-top: 1vw"
          class="row"
        >
          <div class="col">
            <vue-good-table
              :columns="columnsBreak"
              :rows="valueToSend"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [5, 10, 20, 50],
                dropdownAllowAll: true,
                setCurrentPage: 1,
                jumpFirstOrLast: true,
                firstLabel: 'First',
                lastLabel: 'Last',
                nextLabel: 'next',
                prevLabel: 'prev',
                rowsPerPageLabel: 'Per page',
                ofLabel: 'of',
                pageLabel: 'page', // for 'pages' mode
                allLabel: 'All',
              }"
            >
            </vue-good-table>
          </div>
        </div>

        <div
          v-else-if="
            this.page == 'Fast (< 0.5s)' ||
            this.page == 'Slow (1.0s - 2.0s)' ||
            this.page == 'Too Slow (> 2s)' ||
            this.page == 'NaN' ||
            this.page == 'Medium (0.5s - 1.0s)' ||
            this.page == 'allLoadTime'
          "
          style="margin-top: 1vw"
          class="row"
        >
          <div class="col">
            <vue-good-table
              :columns="columnsloadTime"
              :rows="valueToSend"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [5, 10, 20, 50],
                dropdownAllowAll: true,
                setCurrentPage: 1,
                jumpFirstOrLast: true,
                firstLabel: 'First',
                lastLabel: 'Last',
                nextLabel: 'next',
                prevLabel: 'prev',
                rowsPerPageLabel: 'Per page',
                ofLabel: 'of',
                pageLabel: 'page', // for 'pages' mode
                allLabel: 'All',
              }"
            >
            </vue-good-table>
          </div>
        </div>

        <div v-else style="margin-top: 1vw" class="row">
          <div class="col">
            <vue-good-table
              :columns="columnsOther"
              :rows="valueToSend"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [5, 10, 20, 50],
                dropdownAllowAll: true,
                setCurrentPage: 1,
                jumpFirstOrLast: true,
                firstLabel: 'First',
                lastLabel: 'Last',
                nextLabel: 'next',
                prevLabel: 'prev',
                rowsPerPageLabel: 'Per page',
                ofLabel: 'of',
                pageLabel: 'page', // for 'pages' mode
                allLabel: 'All',
              }"
            >
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ArrowLeftIcon } from "vue-feather-icons";
import Enterprise from "@/store/Enterprise.js";
export default {
  components: {
    ArrowLeftIcon,
  },
  data() {
    return {
      pageTitle: "",
      pageDesc: "",
      columnsBreak: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Target URL",
          field: "target_url",
        },
        {
          label: "Anchor Text",
          field: "anchor_text",
        },
        {
          label: "Internal/External",
          field: "internal_or_external",
        },
        {
          label: "Links Nofollow",
          field: "links_nofollow_list",
        },

        {
          label: "Status",
          field: "status",
          type: "number",
        },
      ],

      columnsStructureCrawl: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Depth",
          field: "depth",
        },
        {
          label: "Meta Robots",
          field: "meta_robots",
          html: true,
        },
        {
          label: "Status Code",
          field: "status",
          type: "number",
        },

        {
          label: "Redirect Target",
          field: "redirect_to",
        },
      ],
      columnsOther: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Depth",
          field: "depth",
        },
        {
          label: "Meta Robots",
          field: "meta_robots",
          html: true,
        },
        {
          label: "Status Code",
          field: "status",
          type: "number",
        },

        {
          label: "Redirect Target",
          field: "redirect_to",
        },
      ],

      columnsNon: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Depth",
          field: "depth",
        },
        {
          label: "Meta Robots",
          field: "meta_robots",
          html: true,
        },
        {
          label: "Status Code",
          field: "status",
          type: "number",
        },

        {
          label: "Rel Canonical",
          field: "non_canonical",
        },
      ],
      columnsloadTime: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Depth",
          field: "depth",
        },

        {
          label: "Load Time",
          field: "download_latency",
          type: "number",
        },
        {
          label: "Load Time Evaluation",
          field: "download_latency_group",
        },
        {
          label: "Status Code",
          field: "status",
          type: "number",
        },
        {
          label: "Redirect Target",
          field: "redirect_to",
        },
      ],

      pageData: [],
      valueToSend: [],
      summary: [],
      links_breakdown: [],
      value: [],
      page: "",
      campaign: [],
    };
  },
  methods: {
    goBack() {
      if (this.$route.params.fromDefault) {
        this.$router.push({
          name: "CrawlInsight",
          params: {
            fromDefault: "fromDefault",
          },
        });
      } else {
        this.$router.push({ name: "CrawlInsight" });
      }
    },
  },
  created() {
    //
    this.page = this.$route.params.page;
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

        const foundSummary = this.value.find((element) => element.slug === "summary");

        this.summary = JSON.parse(foundSummary.data);

        this.main = this.summary.stats;

        const foundlinks_breakdown = this.value.find((element) => element.slug === "links_breakdown");

        this.links_breakdown = JSON.parse(foundlinks_breakdown.data);

        for (const [key, value] of Object.entries(this.summary.stats)) {
          if (key == this.$route.params.page) {
            this.pageTitle = value.title;
            this.pageDesc = value.description;
          }
        }

        for (const [key, value] of Object.entries(this.summary.data)) {
          if (value.status == this.$route.params.page) {
            this.pageTitle = "Status Code: " + value.status;
            this.pageDesc = "";
          }
        }

        if (this.page == "External follow" || this.page == "Internal follow" || this.page == "Internal nofollow" || this.page == "External nofollow") {
          this.pageTitle = this.page;
        }

        if (this.page == "Fast (< 0.5s)" || this.page == "Slow (1.0s - 2.0s)" || this.page == "Too Slow (> 2s)" || this.page == "NaN" || this.page == "Medium (0.5s - 1.0s)") {
          this.pageTitle = this.page;
        }

        if (this.page == "allStatusCode") {
          this.pageTitle = "Status Code Data";
        }

        if (this.page == "allLoadTime") {
          this.pageTitle = "Load Time Data";
        }

        if (this.page == "allLinksBreakdown") {
          this.pageTitle = "Links Breakdown Data";
        }

        this.pageData = this.summary.data;

        //

        if (this.$route.params.page == "pages_crawled") {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (value["can_fetch"] == true) {
              this.valueToSend.push(value);
            }
          }
        } else if (this.$route.params.page == "non_index_robot_txt") {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (value["can_fetch"] == false) {
              this.valueToSend.push(value);
            }
          }
        } else if (this.$route.params.page == "pages_in_structure") {
          for (const [key, value] of Object.entries(this.pageData)) {
            this.valueToSend.push(value);
          }
        } else if (this.$route.params.page == "indexable_canonical" || this.$route.params.page == "non_canonical" || this.$route.params.page == "non_index_meta_robot") {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (value[this.$route.params.page] == true) {
              this.valueToSend.push(value);
            }
          }
        } else if (this.page == "External follow" || this.page == "Internal follow" || this.page == "Internal nofollow" || this.page == "External nofollow" || this.page == "allLinksBreakdown") {
          // //
          for (const [key, value] of Object.entries(this.links_breakdown.data)) {
            if (this.page == "allLinksBreakdown") {
              this.valueToSend.push(value);
            } else {
              if (
                value["internal_or_external"] == this.links_breakdown.stats[this.page]["internal_or_external"] &&
                value["links_nofollow_list"] == this.links_breakdown.stats[this.page]["links_nofollow_list"]
              ) {
                this.valueToSend.push(value);
                // //
              }
            }
          }
        } else if (this.page == "Fast (< 0.5s)" || this.page == "Slow (1.0s - 2.0s)" || this.page == "Too Slow (> 2s)" || this.page == "Medium (0.5s - 1.0s)" || this.page == "allLoadTime") {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (this.page == "allLoadTime") {
              this.valueToSend.push(value);
            } else {
              if (value["download_latency_group"] == this.page) {
                this.valueToSend.push(value);
              }
            }
          }
        } else if (this.page == "NaN") {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (value["download_latency_group"] == null) {
              this.valueToSend.push(value);
            }
          }
        } else {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (this.page == "allStatusCode") {
              this.valueToSend.push(value);
            } else {
              if (value.status == this.$route.params.page) {
                this.valueToSend.push(value);
              }
            }
          }
        }

        //

        // this.valueToSend.forEach((element) => {
        //   //
        //   element.meta_robots=element.meta_robots.split(",")

        //    element.meta_robots=`<b>HERE</b>`
        // });

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
