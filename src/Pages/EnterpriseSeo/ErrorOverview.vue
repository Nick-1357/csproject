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
          / Error Overview
        </p>
      </div>
      <h3 class="text-darkgreen mb-4">{{ pageTitle }}</h3>
      <h5 class="text-darkgreen mb-3">{{ pageDesc }}</h5>

      <div class="nexcard">
        <div class="mt-3">
          <div class="col">
            <vue-good-table
              :columns="columns"
              :rows="valueToSend"
              max-height="400px"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
                perPage: 5,
                position: 'top',
                perPageDropdown: [1, 5, 10, 20, 50],
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

      columns: [
        {
          label: "URL",
          field: "url",
        },
        {
          label: "Depth",
          field: "depth",
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
          name: "CrawlDashboard",
          params: {
            fromDefault: "fromDefault",
          },
        });
      } else {
        this.$router.push({ name: "CrawlDashboard" });
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

        this.pageTitle = this.page;
        //   this.valueToSend.push(value);

        this.pageData = this.summary.data;

        const found = this.value.find((element) => element.slug === "issue_dashboard");

        var arr1 = JSON.parse(found.data).indexation;

        var arr2 = JSON.parse(found.data).content;

        var merged = {
          ...arr1,
          ...arr2,
        };

        // //

        for (const [key, value] of Object.entries(merged)) {
          if (this.page == value.title) {
            // //
            for (const [key2, value2] of Object.entries(value.data)) {
              //  //

              this.valueToSend.push(value2);
            }
          }
        }

        //  //

        // //

        if (this.valueToSend[0].meta_desc != undefined || this.valueToSend[0].meta_desc == null) {
          this.columns = [];
          var count = 1;

          for (const [key1, value1] of Object.entries(this.valueToSend)) {
            // //

            for (const [key2, value2] of Object.entries(value1)) {
              if (count == 1) {
                // //

                this.columns.push({
                  label: key2,
                  field: key2,
                });
              }
            }

            count++;
          }
        }

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
