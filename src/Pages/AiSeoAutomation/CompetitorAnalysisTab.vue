<template>
  <div>
    <div
      id="bodyfix__content__competitoranalysis"
      class="bodyfix__content__competitoranalysis"
    >
      <div class="competitoranalysis__table">
        <div class="row competitoranalysis__thead g-0">
          <div class="col">
            <span>Competitor Source</span>
            <button class="material-icons-outlined btn-orderby">
              arrow_upward
            </button>
          </div>
          <div class="col-2">
            <div class="ms-auto d-flex pe-2">
              <span>Content Score</span>
              <button class="material-icons-outlined btn-orderby">
                arrow_upward
              </button>
            </div>
          </div>
          <div class="col-2">
            <div class="ms-auto d-flex pe-2">
              <span>Word Count</span>
              <button class="material-icons-outlined btn-orderby">
                arrow_upward
              </button>
            </div>
          </div>
        </div>

        <div
          class="row competitoranalysis__tbody g-0"
          v-for="(data, index) in WebStatistics"
          :key="'WebStatistics' + index"
        >
          <!-- v-for="(word, index) in words" :key="'word' + index" -->
          <div class="col">
            <b class="mb-0 text-darkgreen"> {{ data[1] }}</b>
            <p class="mb-0">{{ data[2] }}</p>
            <a :href="data[0]" target="_blank" class="text-muted"> {{ data[0] }}</a>

            <!-- <p>{{ word[0] }}</p> -->
          </div>
          <div class="col-2 text-end pe-4">
            <p class="text-values">{{ data[3] }}</p>
            <!-- <p>{{ word[1] }}</p> -->
          </div>
          <div class="col-2 text-end pe-4">
            <p class="text-values">{{ data[4] }}</p>
            <!-- <p>{{ word[2] }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    content_type: {
      type: String,
    },
  },
  data() {
    return {
      WebStatistics: [],
    };
  },
  created() {
    this.values = this.content.steps_data.step_1;

    const webStatistics = this.values.find(
      (element) => element.slug === "web_statistics"
    );

    this.WebStatistics = JSON.parse(webStatistics.data);
  },
};
</script>
<style scoped>
/* ----- 2. competitor analysis css - start */
.competitoranalysis__table {
  margin-top: 1.5rem;
}
.competitoranalysis__thead {
  font-weight: bold;
  padding-bottom: 0.8rem;
  color: #404040;
}
.competitoranalysis__thead .col,
.competitoranalysis__thead .col-2 {
  display: flex;
  align-items: center;
}
.competitoranalysis__thead {
  border-bottom: 2px solid #2c8de0;
  margin-bottom: 1rem;
}
.competitoranalysis__tbody {
  border-bottom: 1px solid rgb(187, 187, 187);
  margin-bottom: 0.6rem;
  padding-bottom: 0.5rem;
}
.competitoranalysis__thead .material-icons-outlined {
  color: #2c8de0;
  margin-left: 0.2rem;
}
.text-values {
  color: #2c8de0;
  font-size: 20px;
  font-weight: 500;
}
/* ----- competitor analysis css - end */
</style>
