<template>
  <div>
    <div class="page-wrapper-lg">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / <router-link to="/enterprise_seo/table/view_all" class="route__link">Enterprise SEO</router-link> /
          <router-link to="/enterprise_seo/campaign" class="route__link">{Campaign Name}</router-link> / Error Overview
        </p>
      </div>
      <h2 class="text-darkgreen mb-4">Campaign Name</h2>
      <h4 class="text-darkgreen mb-3">Error Overview</h4>

      <div class="nexcard">
        <div class="nextable">
          <!-- Table Head -->
          <div class="nextable__head">
            <div class="row g-0">
              <div class="col-4"><p>Url</p></div>
              <div class="col"><p>Meta Description</p></div>
              <div class="col-2"><p>Character Count</p></div>
            </div>
          </div>

          <!-- Table Body -->
          <div class="nextable__body">
            <div class="row g-0" v-for="n in 15" :key="n">
              <div class="col-4">
                <p>00</p>
              </div>

              <div class="col">
                <p>00</p>
              </div>
              <div class="col-2">
                <p>00</p>
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
  name: "enterprise_seo_errorOverview",
  data() {
    return {
      n: 1,
    };
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
