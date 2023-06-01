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
          / Word Count Evaluation Overview
        </p>
      </div>
      <h3 class="text-darkgreen mb-4">{{ pageTitle }}</h3>
      <h4 class="text-darkgreen mb-3">{{ pageDesc }}</h4>

      <div class="nexcard">
        <div class="row mt-3">
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

      columnsOther: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Category",
          field: "dir_1",
        },

        {
          label: "Word Count Group",
          field: "word_count_group",
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

        if (this.$route.params.series == "allWord") {
          this.pageTitle = "Word Count Evaluation";
        } else {
          this.pageTitle = this.$route.params.category + " ( " + this.$route.params.series + " ) ";
        }

        this.pageData = this.summary.data;

        // //

        const foundword_count_eval = this.value.find((element) => element.slug === "word_count_eval");

        //

        if (this.$route.params.category == "allWord") {
          for (const [key, value] of Object.entries(this.pageData)) {
            this.valueToSend.push(value);
          }
        } else if (this.$route.params.category == "others") {
          for (const [key, value] of Object.entries(this.pageData)) {
            for (const [key2, value2] of Object.entries(JSON.parse(foundword_count_eval.data).category.others)) {
              if (value.dir_1 == value2) {
                if (this.$route.params.series == value.word_count_group) {
                  // //

                  this.valueToSend.push(value);
                }
              }
            }
          }
        } else {
          for (const [key, value] of Object.entries(this.pageData)) {
            if (this.$route.params.category == value.dir_1) {
              if (this.$route.params.series == value.word_count_group) {
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
