<template>
  <div>
    <div class="card-wrapper">
      <div class="d-flex">
        <div class="me-3 w-100">
          <select id="inputGroupSelect04" aria-label="Example select with button addon" v-model="selectedLoc" @change="selectLoc()" class="form-select rounded w-100">
            <option :value="loc" :key="index" v-for="(loc, index) in locations">
              {{ loc.name | loc }}
            </option>
          </select>
        </div>

        <div class="me-3 w-100">
          <select id="inputGroupSelect05" aria-label="Example select with button addon" v-model="choosenPeriod" @click="selectPeriod(period)" class="form-select rounded w-100">
            <option :value="period.data" :key="index" v-for="(period, index) in periods">
              {{ period.name }}
            </option>
          </select>
        </div>

        <div class="me-3 w-100" v-if="choosenPeriod == 'date_filter'">
          <b-form-datepicker
            id="example-datepicker-start"
            class="w-100"
            menu-class="w-100"
            calendar-width="100%"
            v-model="startDate"
            placeholder="Filter Date From"
          ></b-form-datepicker>
        </div>
        <!-- <div class="me-3 w-100">
            <b-form-datepicker
              id="example-datepicker-end"
              class="w-100"
              menu-class="w-100"
              calendar-width="100%"
              v-model="endDate"
              placeholder="Filter Date Till"
            ></b-form-datepicker>
          </div> -->

        <!-- <div class="col-3">
            <select
              class="custom-select rounded"
              id="inputGroupSelect04"
              aria-label="Example select with button addon"
              @click="select(item)"
              v-model="choosenPeriod"
            >
              <option
                :value="time"
                :key="index"
                v-for="(time, index) in period"
              >
                {{ time.name }}
              </option>
            </select>
          </div> -->

        <div class="me-3 w-100">
          <button class="btn btn-primary-outlined" @click="clearFilter">Clear Filter</button>
        </div>
      </div>

      <div class="nextable mt-3">
        <div class="row nextable__head g-0">
          <div class="col-1"><p>Rank</p></div>
          <div class="col"><p>Keyword</p></div>
          <div class="col"><p>Url</p></div>
          <div class="col-2"><p>Location</p></div>
        </div>

        <div class="nextable__body__collection">
          <div class="row nextable__body g-0" :key="'rankShow' + indextr" v-for="(item, indextr) in rankShow">
            <div class="col-1 rank">
              <div v-if="item.url == 'Not Found'" class="text-red">> 100</div>
              <div v-else-if="choosenPeriod == 'rank' && item.rank == null">No Data</div>
              <div v-else-if="choosenPeriod == 'd7' && item.d7 == null">No Data</div>
              <div v-else-if="choosenPeriod == 'd30' && item.d30 == null">No Data</div>
              <div v-else-if="choosenPeriod == 'life' && item.life == null">No Data</div>
              <div v-else-if="choosenPeriod == 'date_filter' && item.rank == null">No Data</div>
              <div v-if="choosenPeriod == 'rank' && item.rank !== null && item.url != 'Not Found'" class="fw-bold d-flex align-items-center">
                <div style="width: 20px">{{ item.rank }}</div>
                <span class="material-icons-outlined grey" v-if="item.d7 == item.rank" v-b-tooltip.hover.right="{ variant: 'dark' }" :title="'performance compared to last 7 days'">
                  remove
                </span>
                <span
                  class="material-icons-outlined red"
                  v-else-if="item.d7 < item.rank"
                  v-b-tooltip.hover.right="{ variant: 'dark' }"
                  :title="'performance compared to last 7 days'"
                >
                  south
                </span>
                <span class="material-icons-outlined green" v-else v-b-tooltip.hover.right="{ variant: 'dark' }" :title="'performance compared to last 7 days'"> north </span>
              </div>

              <div v-if="choosenPeriod == 'date_filter' && item.rank !== null && item.url != 'Not Found'" class="fw-bold d-flex align-items-center">
                <div style="width: 20px">{{ item.rank }}</div>
                <span class="material-icons-outlined grey" v-if="item.d7 == item.rank" v-b-tooltip.hover.right="{ variant: 'dark' }" :title="'performance compared to last 7 days'">
                  remove
                </span>
                <span
                  class="material-icons-outlined red"
                  v-else-if="item.d7 < item.rank"
                  v-b-tooltip.hover.right="{ variant: 'dark' }"
                  :title="'performance compared to last 7 days'"
                >
                  south
                </span>
                <span class="material-icons-outlined green" v-else v-b-tooltip.hover.right="{ variant: 'dark' }" :title="'performance compared to last 7 days'"> north </span>
              </div>

              <p v-if="choosenPeriod == 'd7' && item.d7 !== null && item.url != 'Not Found'">
                {{ item.d7 }}
              </p>
              <p v-if="choosenPeriod == 'd30' && item.d30 !== null && item.url != 'Not Found'">
                {{ item.d30 }}
              </p>
              <p v-if="choosenPeriod == 'life' && item.life !== null && item.url != 'Not Found'">
                {{ item.life }}
              </p>
            </div>
            <div class="col">
              <p>{{ item.keyword }}</p>
            </div>

            <div class="col">
              <p v-if="item.url == null">No Url</p>
              <p v-if="item.url == 'Not Found'">Ranking over 100</p>
              <p v-else>{{ item.url }}</p>
            </div>

            <div class="col-2">
              <p>{{ item.location | loc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import KeywordTracker from "@/store/KeywordTracker.js";
import VueDatepickerUi from "vue-datepicker-ui";
import "vue-datepicker-ui/lib/vuedatepickerui.css";

export default {
  components: {
    VueDatepicker: VueDatepickerUi,
  },
  data() {
    return {
      client: [],
      selectedFormat: "xlsx",
      formats: ["xlsx", "csv", "txt"],
      original: [],
      allLocation: [],
      startDate: "",
      endDate: "",
      rankShow: [],
      rankAll: [],
      dateFilter: [],
      dateFilterAll: [],
      allDateFilter: [],
      lastIndex: "",
      choosenPeriod: "rank",
      location: "Malaysia",
      selectedLoc: { name: "All Locations", class: "tablink active" },
      locations: [{ name: "All Locations", class: "tablink active" }],
      periods: [
        { name: "Today", data: "rank", class: "tablink active" },
        { name: "Last 7 days", data: "d7", class: "tablink" },
        { name: "Last Month", data: "d30", class: "tablink" },
        { name: "Choose date", data: "date_filter", class: "tablink" },
        // { name: "All Time", data: "life", class: "tablink" },
      ],
    };
  },
  watch: {
    // endDate() {
    //   //

    //   if (
    //     this.startDate != undefined &&
    //     this.startDate != null &&
    //     this.startDate != ""
    //   ) {
    //     const obj = {
    //       id: this.$route.params.id,
    //       start_date: this.startDate,
    //       end_date: this.endDate,
    //     };

    //     let loader = this.$loading.show({
    //       // Optional parameters
    //       container: this.fullPage ? null : this.$refs.formContainer,
    //       canCancel: true,
    //       onCancel: this.onCancel,
    //     });

    //     KeywordTracker.fetchDailyKeywordDate(obj)
    //       .then((response) => {
    //         this.allLocation = [];
    //         (this.locations = [{ name: "All", class: "tablink active" }]),
    //           (this.rankShow = []);
    //         this.selectedLoc = { name: "All", class: "tablink active" };

    //         for (const [key, value] of Object.entries(response.data.data)) {
    //           value.forEach((element) => {
    //             element.location = key;
    //             this.rankShow.push(element);
    //           });
    //         }
    //         for (const [key, value] of Object.entries(response.data.data)) {
    //           if (value.length != 0) {
    //             this.allLocation.push({ key: key, value: value });
    //             this.locations.push({ name: key, class: "tablink" });
    //           }
    //         }

    //         this.rankAll = this.rankShow;
    //         localStorage.keyword_tracker_export_data = JSON.stringify(
    //           this.rankShow
    //         );

    //         loader.hide();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         loader.hide();
    //       });
    //   }
    // },

    startDate() {
      //

      // if (
      //   this.endDate != undefined &&
      //   this.endDate != null &&
      //   this.endDate != ""
      // ) {
      const obj = {
        id: this.$route.params.id,
        from_date: this.startDate,
        to_date: this.startDate,
      };

      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      KeywordTracker.fetchDailyKeywordDate(obj)
        .then((response) => {
          this.allLocation = [];
          (this.locations = [{ name: "All Locations", class: "tablink active" }]), (this.rankShow = []);
          this.selectedLoc = { name: "All Locations", class: "tablink active" };
          for (const [key, value] of Object.entries(response.data.data)) {
            value.forEach((element) => {
              element.location = key;
              this.rankShow.push(element);
            });
          }
          for (const [key, value] of Object.entries(response.data.data)) {
            if (value.length != 0) {
              this.allLocation.push({ key: key, value: value });
              this.locations.push({ name: key, class: "tablink" });
            }
          }

          this.rankAll = this.rankShow;
          localStorage.keyword_tracker_export_data = JSON.stringify(this.rankShow);

          loader.hide();
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
      // }
    },
  },

  methods: {
    clearFilter() {
      this.rankShow = this.original;
      this.startDate = "";
      this.endDate = "";
      (this.choosenPeriod = "rank"), (this.selectedLoc = { name: "All Locations", class: "tablink active" });
    },

    select(time) {
      if (time.data == "date_filter") {
      } else {
        this.choosenPeriod = time.data;
      }

      //
    },
    selectLoc() {
      //
      this.location = this.selectedLoc.name;

      if (this.selectedLoc.name == "All Locations") {
        this.rankShow = this.original;
      } else {
        this.allLocation.forEach((element) => {
          if (element.key === this.selectedLoc.name) {
            this.rankShow = element.value;
          }
        });
      }

      this.rankShow = this.rankShow;
    },
  },

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    KeywordTracker.fetchDailyKeyword(this.$route.params.id)
      .then((response) => {
        for (const [key, value] of Object.entries(response.data.data)) {
          value.forEach((element) => {
            element.location = key;
            this.original.push(element);
          });
        }

        for (const [key, value] of Object.entries(response.data.data)) {
          if (value.length != 0) {
            this.allLocation.push({ key: key, value: value });
            this.locations.push({ name: key, class: "tablink" });
          }
        }

        this.rankShow = this.original;
        this.rankAll = this.rankShow;

        localStorage.setItem("keyword_tracker_export_data", JSON.stringify(this.rankShow));
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
.card-wrapper {
  position: relative;
  margin: 0rem auto;
  padding: 1rem;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
}

.nextable {
  flex-direction: column;
  border-radius: 10px;
}
.nextable .nextable__body {
  border-bottom: 1px solid #e6e6e6;
}
.nextable .nextable__head {
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
}
.nextable .nextable__body__collection {
  height: 63vh;
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body__collection {
    height: 62vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 0.2rem;
  }
  .nextable .nextable__body__collection {
    height: 55vh;
  }
}
.nextable .nextable__head {
  margin-right: 8px;
}
.nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2 {
  padding: 1rem;
  font-weight: bold;
}

.nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2 {
  padding: 1rem;
  align-items: center;
  display: flex;
}

p {
  margin: 0;
  color: #323233;
}

.rank div {
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  color: #323233;
}
.rank .material-icons-outlined {
  font-size: 18px;
  margin-bottom: 0.1rem;
}
.rank .material-icons-outlined.grey {
  color: #323233;
}
.rank .material-icons-outlined.red,
.text-red {
  color: #d83d2f !important;
}
.rank .material-icons-outlined.green {
  color: #4da351;
}
</style>
