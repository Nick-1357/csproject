<template lang="">
  <div>
    <div class="my-5">
      <div class="row">
        <div class="col-3" v-for="(card, index) in Nexcard_Metrics" :key="'Nexcard_Metrics' + index">
          <div class="nexcard-inner">
            <div class="d-flex flex-column me-auto">
              <div class="d-flex align-items-center mb-1">
                <span class="fw-600 text-darkgrey">{{ card.name }}</span>
                <span class="material-icons-outlined icon-tooltip ms-2" v-b-tooltip.hover.right="{ variant: 'primary' }" :title="card.tooltip">help_outline</span>
              </div>
              <h1 class="mt-auto mb-0 text-darkgrey">{{ card.value }}</h1>
            </div>
            <span class="material-icons-outlined text-primary fs-4rem"> {{ card.icon }} </span>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="nexcard mt-5" style="min-height: 500px">
          <h5 class="text-darkgreen">Performance</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gscOverview",
  data() {
    return {
      n: 1,
      Nexcard_Metrics: [
        {
          slug: "",
          name: "Total Clicks",
          value: "2711",
          icon: "ads_click",
          tooltip: "Total number of clicks received on your campaign",
        },
        {
          slug: "",
          name: "Total Impressions",
          value: "468777",
          icon: "visibility",
          tooltip: "The number of times your content is displayed, no matter if it was clicked or not",
        },
        {
          slug: "",
          name: "Average CTR",
          value: "0.58",
          icon: "percent",
          tooltip: "Average click-through rate is the ratio of ad clicks to impressions in your Ads campaigns",
        },
        {
          slug: "",
          name: "Average Position",
          value: "60.65",
          icon: "signal_cellular_alt",
          tooltip: "The average rank in the Google's Search Engine Result Pages",
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped>
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
}
.nexcard-inner {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 20px;
  padding: 1rem;
}
.icon-tooltip {
  font-size: 15px;
}
.fs-4rem {
  font-size: 4rem;
}
</style>
