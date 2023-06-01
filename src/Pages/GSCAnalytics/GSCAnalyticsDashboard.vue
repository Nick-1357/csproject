<template>
  <div>
    <div class="page-wrapper-xl">
      <!-- Route -->
      <div class="route__linkpath mb-3 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard </router-link> &nbsp;/&nbsp; <router-link to="" class="route__link"> GSC Analytics</router-link>&nbsp;/&nbsp;
          <router-link to="" class="route__link">{Campaign Name}</router-link> &nbsp;/ Dashboard
        </p>
      </div>
      <div class="button-tabs-wrapper">
        <div class="button__tabs">
          <button class="button__tab" :class="tab.class" v-for="(tab, index) in tab__options" :key="'tab' + index" @click="selectTab(tab)">
            <span class="button__tab__title">{{ tab.name }}</span>
          </button>
        </div>
      </div>
      <gscOverview v-if="tab__active == 'Overview'"></gscOverview>
      <websiteClicks v-if="tab__active == 'Website Clicks'"></websiteClicks>
      <siteMap v-if="tab__active == 'Site Map'"></siteMap>
      <urlInspection v-if="tab__active == 'URL Inspection'"></urlInspection>
    </div>
  </div>
</template>

<script>
import gscOverview from "./gscOverview.vue";
import websiteClicks from "./websiteClicks.vue";
import siteMap from "./siteMap.vue";
import urlInspection from "./urlInspection.vue";

export default {
  name: "content_planner",
  components: { gscOverview, websiteClicks, siteMap, urlInspection },
  data() {
    return {
      n: 1,
      tab__active: "Overview",
      tab__options: [
        { name: "Overview", class: "button__tab active" },
        { name: "Website Clicks", class: "button__tab " },
        { name: "Site Map", class: "button__tab " },
        { name: "URL Inspection", class: "button__tab " },
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
  },
};
</script>

<style>
/* tab buttons */
.button-tabs-wrapper {
  margin-top: 2rem;
  border-bottom: 3px solid #cdcdcd;
  position: relative;
  height: 40px;
}
.button__tabs {
  z-index: 20;
  position: absolute;
}
.button__tab__title {
  padding: 1rem 1rem;
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
  background-color: #f4faff;
  border-bottom: 3px solid #cdcdcd;
  color: #1e8ef0;
  box-shadow: inset 0 -5px 8px #cdcdcd;
}
.button__tab:hover {
  background-color: #dcefff;
  transition: 0.4s ease-out;
  box-shadow: inset 0 -5px 8px #cdcdcd;
  color: #2c8de0;
}
.button__tab.active {
  background-color: #2c8de0;
  box-shadow: none;
  color: #2c8de0;
  border-bottom: 3px solid #184d7b;
  transition: all 0.4s ease-out;
  /* TODO: add blue box shadow below */
  box-shadow: rgba(0, 109, 192, 0.3) 0px 30px 60px -30px;
}
.button__tab.active .button__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
</style>
