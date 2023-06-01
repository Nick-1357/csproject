<template>
  <div>
    <div class="page-wrapper-lg">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          /
          <router-link to="" class="route__link">Page Speed Insight</router-link>
          / {Campaign Name}
        </p>
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
                  <small class="text-muted ms-2">Past 28 days</small>
                </div>
                <div class="nextable__card">
                  <div class="row nextable__head g-0">
                    <div class="col"><span>Topics</span></div>
                    <div class="col-2"><span>Website</span></div>
                    <div class="col-2"><span>Mobile</span></div>
                  </div>

                  <div class="nextable__body__collection">
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Core Web Vitals Assessment</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Cummulative Layout Shift Score</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                    </div>
                  </div>
                </div>
                <div class="nextable__card">
                  <div class="row nextable__head g-0">
                    <div class="col"><span>Discover what your users are experiencing</span></div>
                    <div class="col-2"><span></span></div>
                    <div class="col-2"><span></span></div>
                  </div>

                  <div class="nextable__body__collection">
                    <div class="row nextable__body g-0">
                      <div class="col"><span>First Contentful Paint</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Largest Contentful Paint</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>First Input Delay</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Cummulative Layout Shift Score</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="nexcard h-100">
                <div class="d-flex">
                  <h6>Metrics</h6>
                  <small class="text-muted ms-2">Past 28 days</small>
                </div>
                <div class="nextable__card">
                  <div class="row nextable__head g-0">
                    <div class="col"><span>Topics</span></div>
                    <div class="col-2"><span>Website</span></div>
                    <div class="col-2"><span>Mobile</span></div>
                  </div>

                  <div class="nextable__body__collection">
                    <div class="row nextable__body g-0">
                      <div class="col"><span>First Contentful Paint</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Speed Index</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Largest Colourful Paint</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Time to Interactive</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Total Blocking Time</span></div>
                      <div class="col-2"><span class="pill-badge green">Fast</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                    </div>
                    <div class="row nextable__body g-0">
                      <div class="col"><span>Cummulative Layout Shift</span></div>
                      <div class="col-2"><span class="pill-badge red">Slow</span></div>
                      <div class="col-2"><span class="pill-badge yellow">Average</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pie-charts__section mt-5">
          <div class="row">
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>Diagnose Performance Issues</h6>
                <div class="pie-chart">
                  <!-- TODO: insert graph here -->
                  Performance radial progress bars
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>Screenshots</h6>
                <div class="screenshot__img-wrapper">
                  <img src="@/assets/nexmind/screenshot_img_placeholder.png" alt="Nexmind" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pie-charts__section mt-5">
          <div class="row">
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>First Contentful Paint</h6>
                <div class="pie-chart">
                  <!-- TODO: insert graph here -->
                  Pie Chart
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>Largest Contentful Paint</h6>
                <div class="pie-chart">
                  <!-- TODO: insert graph here -->
                  Pie Chart
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pie-charts__section mt-5">
          <div class="row">
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>First Input Delay</h6>
                <div class="pie-chart">
                  <!-- TODO: insert graph here -->
                  Pie Chart
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="nexcard h-100">
                <h6>Cumulative Layout Shift Score</h6>
                <div class="pie-chart">
                  <!-- TODO: insert graph here -->
                  Pie Chart
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Tab - Details -->
      <div class="content__tab__details" v-else>
        <div class="mt-5">
          <div class="nexcard py-4 px-4 mb-4" v-for="n in 3" :key="n">
            <h4 class="text-darkgreen">Opportunities</h4>
            <div class="pt-3 pb-4">
              <span :class="item.state" @click="selectCategory(item.name)" v-for="(item, index) in category__options" :key="'category' + index">
                {{ item.name }}
              </span>
            </div>
            <div>
              <div class="dropdown__list">
                <div class="dropdown__group" v-for="n in 4" :key="n">
                  <div class="dropdown__title d-flex" type="button" v-b-toggle="'dropdown__bar'">
                    <div class="dropdown__title__left">
                      <div class="d-flex">
                        <span class="title">Lorem Ipsum</span>
                        <span class="pill-badge red">0.14 | Poor</span>
                      </div>
                    </div>
                    <div class="dropdown__title__right">
                      <span class="arrow-icon material-icons-outlined ms-3 p-0">expand_more</span>
                    </div>
                  </div>

                  <b-collapse :id="'dropdown__bar'">
                    <div class="dropdown__content pt-4">
                      <div class="pb-4">
                        <span class="text-muted"
                          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make a type specimen book.</span
                        >
                      </div>
                      <div class="nexcard-inner">
                        <table class="nextable">
                          <thead>
                            <tr>
                              <th class="w-70">URL</th>
                              <th class="w-15">Transfer Size (KiB)</th>
                              <th class="w-15">Potential Savings(ms)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="n in 4" :key="n">
                              <td class="w-70">www.nexmind.com</td>
                              <td class="w-15">0.00</td>
                              <td class="w-15">000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page_speed_insight",
  data() {
    return {
      n: 1,
      tab__active: "Reports",
      tab__options: [
        { name: "Reports", class: "button__tab active" },
        { name: "Details", class: "button__tab " },
      ],
      category__active: "All",
      category__options: [
        { name: "All", state: "pill-tabs active" },
        { name: "First Contentful Paint", state: "pill-tabs " },
        { name: "Total Blocking Time", state: "pill-tabs " },
        { name: "Largest Colourful Paint", state: "pill-tabs" },
        { name: "Cummulative Layout Shift", state: "pill-tabs" },
        { name: "Other", state: "pill-tabs" },
      ],
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
    selectCategory(data) {
      this.category__options.forEach((element) => {
        if (element.name === data) {
          element.state = "pill-tabs active";
        } else {
          element.state = "pill-tabs";
        }
      });
      this.category__active = data;

      if (data == "All Pending Tasks") {
        (this.showCriticalTasks = true), (this.showWarningTasks = true), (this.showInfoTasks = true), (this.showCompleted = true), (this.showOptimizedUrls = true);
      } else if (data == "Critical Tasks") {
        (this.showCriticalTasks = true), (this.showWarningTasks = false), (this.showInfoTasks = false), (this.showCompleted = false), (this.showOptimizedUrls = false);
      } else if (data == "Warning Tasks") {
        (this.showCriticalTasks = false), (this.showWarningTasks = true), (this.showInfoTasks = false), (this.showCompleted = false), (this.showOptimizedUrls = false);
      } else if (data == "Info Tasks") {
        (this.showCriticalTasks = false), (this.showWarningTasks = false), (this.showInfoTasks = true), (this.showCompleted = false), (this.showOptimizedUrls = false);
      } else if (data == "Optimized Urls") {
        (this.showCriticalTasks = false), (this.showWarningTasks = false), (this.showInfoTasks = false), (this.showCompleted = false), (this.showOptimizedUrls = true);
      } else if (data == "Completed") {
        (this.showCriticalTasks = false), (this.showWarningTasks = false), (this.showInfoTasks = false), (this.showCompleted = true), (this.showOptimizedUrls = false);
      }
    },
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
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
}
.pill-badge.green {
  background-color: #e2f2e3;
  color: #4dae50;
}

.screenshot__img-wrapper img {
  object-fit: cover;
  border-radius: 10px;
  width: 100%;
  aspect-ratio: 16/9;
}
.nexcard .pie-chart {
  display: grid;
  place-content: center;
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
</style>
