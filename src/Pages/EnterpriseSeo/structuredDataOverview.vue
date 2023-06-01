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
          / Structured Data Distribution Overview
        </p>
      </div>
      <h2 class="text-darkgreen mb-4">{{ pageTitle }}</h2>
      <h4 class="text-darkgreen mb-3">Structured Data Distribution Overview</h4>

      <div class="nexcard">
        <div class="nextable">
          <!-- Table Head -->
          <div class="nextable__head">
            <div class="row g-0">
              <div class="col"><p>Url</p></div>
            </div>
          </div>

          <!-- Table Body -->
          <div class="nextable__body">
            <div class="row g-0 p-2" :key="'topQuery' + index" v-for="(tr, index) in topQuery">
              <div class="col-9">
                <p>{{ tr.url }}</p>

                <b-collapse :id="'accordion-structured-data-' + index" class="mt-2">
                  <div class="row">
                    <div class="col">
                      <div>
                        <b-tabs content-class="mt-3" align="left">
                          <b-tab v-if="tr.microdata_extract_flatten.length != 0" title="Microdata" active style="max-height: 25vw; overflow-y: scroll">
                            <div :key="index_microdata_extract_flatten" v-for="(micro, index_microdata_extract_flatten) in tr.microdata_extract_flatten">
                              <div class="card p-2 m-2">
                                <table class="table">
                                  <tbody style="display: block; max-height: 100%">
                                    <tr :key="index_micro" v-for="(micro_data, index_micro) in micro">
                                      <td>
                                        <b v-html="micro_data.index"> </b>
                                      </td>
                                      <td>
                                        <span>
                                          {{ micro_data.value }}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </b-tab>
                          <b-tab v-if="tr.json_ld_extract_flatten.length != 0" title="Json-ld" style="max-height: 25vw; overflow-y: scroll">
                            <div :key="index_json_ld_extract_flatten" v-for="(micro, index_json_ld_extract_flatten) in tr.json_ld_extract_flatten">
                              <div class="card p-2 m-2">
                                <table class="table">
                                  <tbody style="display: block; max-height: 100%">
                                    <tr :key="index_micro" v-for="(micro_data, index_micro) in micro">
                                      <td>
                                        <b v-html="micro_data.index"> </b>
                                      </td>
                                      <td>
                                        <span>
                                          {{ micro_data.value }}
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </b-tab>
                        </b-tabs>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
              <div class="col-3">
                <chevron-down-icon size="1.5x" style="cursor: pointer; float: right" class="custom-class" v-b-toggle="'accordion-structured-data-' + index"></chevron-down-icon>
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
import { ArrowLeftIcon } from "vue-feather-icons";
import { ChevronDownIcon } from "vue-feather-icons";
import Enterprise from "@/store/Enterprise.js";
import { ChevronsLeftIcon } from "vue-feather-icons";
import { ChevronsRightIcon } from "vue-feather-icons";
import { SearchIcon } from "vue-feather-icons";
export default {
  components: {
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    SearchIcon,
  },
  data() {
    return {
      pageTitle: "",
      pageDesc: "",
      pageData: [],
      valueToSend: [],
      summary: [],
      links_breakdown: [],
      value: [],
      page: "",
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
    };
  },
  methods: {
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

        if (this.$route.params.category == "all") {
          this.pageTitle = "";
        } else {
          this.pageTitle = this.$route.params.category + " - " + this.$route.params.page;
        }

        const foundStructured = this.value.find((element) => element.slug === "structured_data_distribution");
        this.StructuredData = JSON.parse(foundStructured.data).data;
        //

        for (const [key, value] of Object.entries(this.StructuredData)) {
          if (this.$route.params.category == "Json-ld") {
            for (const [key2, value2] of Object.entries(value.json_ld_type)) {
              if (this.$route.params.page == value2) {
                //
                this.showStructure.push(value);
              }
            }
          } else if (this.$route.params.category == "Microdata") {
            for (const [key2, value2] of Object.entries(value.microdata_type)) {
              if (this.$route.params.page == value2) {
                //
                this.showStructure.push(value);
              }
            }
          } else if (this.$route.params.category == "all") {
            this.showStructure.push(value);
          }
        }

        this.topQuery = Object.assign([], this.showStructure);

        this.AllQuery = this.topQuery;

        this.topQueryAll = this.topQuery;

        console.log(this.topQuery);

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
