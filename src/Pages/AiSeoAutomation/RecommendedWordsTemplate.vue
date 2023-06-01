<template>
    <div>
      <b-modal id="modal-center-view-competitors" size="lg" centered hide-footer hide-header>
        <h5>All Competitors</h5>
        <h6 class="mt-4 mb-0">Your Score</h6>
        <div class="yourscore__table">
          <div class="row yourscore__thead g-0">
            <div class="col-6">
              <span>Website</span>
              <button class="material-icons-outlined btn-orderby"> arrow_upward </button>
            </div>
            <div class="col-6">
              <span>Score</span>
              <button class="material-icons-outlined btn-orderby"> arrow_upward </button>
            </div>
          </div>

          <div class="row yourscore__tbody g-0">
            <div class="col-6">
              <span class="mb-0">Your Website Score</span>
            </div>
            <div class="col-6 pt-1">
              <div class="d-flex align-items-center">
                <div class="seochecklist_healthbar progress w-100">
                  <div class="progress-bar bg-danger" role="progressbar" style="width: 10%;" aria-valuenow="10" aria-valuemin="" aria-valuemax="100"></div>
                </div>
                <span class="ps-3 pe-2" style="min-width: 50px;">10</span>
              </div>
            </div>
          </div>
          <div class="row yourscore__tbody g-0">
            <div class="col">
              <span class="mb-0">Average Score</span>
            </div>
            <div class="col-6 pt-1">
              <div class="d-flex align-items-center">
                <div class="seochecklist_healthbar progress w-100">
                  <div class="progress-bar bg-warning" role="progressbar" style="width: 40%;" aria-valuenow="40" aria-valuemin="" aria-valuemax="100"></div>
                </div>
                <span class="ps-3 pe-2" style="min-width: 50px;">40</span>
              </div>
            </div>
          </div>
        </div>

        <h6 class="mt-4 mb-0">Top 10 Competitors</h6>
        <div class="yourscore__table">
          <div class="row yourscore__thead g-0">
            <div class="col-1">
              <span>Rank</span>
              <button class="material-icons-outlined btn-orderby"> arrow_upward </button>
            </div>
            <div class="col-5">
              <span class="ps-3">Website</span>
              <button class="material-icons-outlined btn-orderby"> arrow_upward </button>
            </div>
            <div class="col-6">
              <span>Score</span>
              <button class="material-icons-outlined btn-orderby"> arrow_upward </button>
            </div>
          </div>

          <div class="row yourscore__tbody g-0"  v-for="n in 10" :key="n">
            <div class="col-1 ps-2">
              <span class="mb-0">{{ n }}</span>
            </div>
            <div class="col-5 ps-3">
              <span class="mb-0">Website Name</span>
            </div>
            <div class="col-6 pt-1">
              <div class="d-flex align-items-center">
                <div class="progress w-100">
                  <div class="progress-bar bg-primary" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="" aria-valuemax="100"></div>
                </div>
                <span class="ps-3 pe-2" style="min-width: 50px;">50</span>
              </div>
            </div>
          </div>

        </div>
      </b-modal>
      <div id="bodyfix__content__recommendedwords" class="bodyfix__content__recommendedwords">
        <div class="recommendedwords__table">
          <div class="row recommendedwords__thead g-0">
            <div class="col-3">
              <span>Words</span>
              <button class="material-icons-outlined btn-orderby"> arrow_upward </button>
            </div>
            <div class="col-1"></div>
            <div class="col"></div>
            <div class="col-2"></div>
          </div>

          <div class="row recommendedwords__tbody g-0" v-for="n in 5" :key="n">
            <div class="col-3 d-flex align-items-center">
              <span class="ms-3 text-muted">Sports Injuries</span>
            </div>
            <div class="col-1 d-flex justify-content-center">
              <button class="btn btn-primary-outlined m-auto">+ Add</button>
            </div>
            <div class="col d-flex align-items-center">

              <!-- Pin Bar Graph -->
              <div class="pin__bar__graph">
                <!-- calc({{max}}/{{min}}*100 - 7px) -->
                <div class="pin blue" style="left: calc(20% - 7px) !important;">
                  <div class="pin__head" v-b-tooltip.hover.top.v-primary="{ variant: 'info' }" title="Your Count: 20"></div>
                  <div class="pin__tail"></div>
                </div>

                <div class="pin red" style="left: calc(50% - 7px) !important;">
                  <div class="pin__head" v-b-tooltip.hover.top.v-danger="{ variant: 'info' }" title="Market Average: 50"></div>
                  <div class="pin__tail"></div>
                </div>

                <div class="pin grey" style="left: calc(70% - 7px) !important;">
                  <div  class="pin__head" v-b-tooltip.hover.top="{ variant: 'dark' }" title="1 Healthline: 70"></div>
                  <div class="pin__tail"></div>
                </div>

                <div class="progress">
                  <div div class="progress-bar bg-primary" role="progressbar" 
                    style="width: 20%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>

                <div class="value min">
                  <span>0</span>
                </div>

                <div class="value blue" style="left: calc(20% - 9px) !important;">
                  <span>20</span>
                </div>

                <div class="value red" style="left: calc(50% - 9px) !important;">
                  <span>50</span>
                </div>

                <div class="value max">
                  <span>100</span>
                </div>
              </div>
            </div>

            <div class="col-2 d-flex justify-content-end align-items-center">
              <button class="btn btn-primary-outlined" style="height: 38px;" v-b-modal.modal-center-view-competitors>View all Competitors</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Recommended words tab",
  props: {
    content: {
      type: Object,
      required: true
    },
  },
  data() {
    return {};
  },
  created(){
    console.log(this.content)
  }
};
</script>
<style scoped>

/* ----- 3. recommended words css - start */
.modal-dialog-centered{
  width: 700px !important;
}
.yourscore__table {
  /* margin-top: 0.5rem; */
}
.yourscore__thead {
  font-weight: bold;
  padding-bottom: 0.5rem;
  color: #404040;
  padding: 0.5rem;
}
.yourscore__thead .material-icons-outlined {
  color: #2c8de0;
  margin-left: 0.1rem;
  padding: 0;
}
.yourscore__thead .col-1,
.yourscore__thead .col-5,
.yourscore__thead .col-6 {
  display: flex;
  align-items: center;
}
.yourscore__thead {
  border-bottom: 2px solid #2c8de0;
}
.yourscore__tbody {
  border-left: 1px solid rgb(187, 187, 187);
  border-right: 1px solid rgb(187, 187, 187);
  border-bottom: 1px solid rgb(187, 187, 187);
  padding: 0.5rem;
  /* padding-bottom: 0.2rem; */
}


/*  */
.recommendedwords__table {
  margin-top: 1.5rem;
}
.recommendedwords__thead {
  font-weight: bold;
  padding-bottom: 0.8rem;
  color: #404040;
}
.recommendedwords__thead .col,
.recommendedwords__thead .col-2,
.recommendedwords__thead .col-3 {
  display: flex;
  align-items: center;
}
.recommendedwords__thead {
  border-bottom: 2px solid #2c8de0;
  margin-bottom: 0.5rem;
}
.recommendedwords__tbody {
  border-bottom: 1px solid rgb(187, 187, 187);
  padding: 0.8rem 0rem;
}
.recommendedwords__thead .material-icons-outlined {
  color: #2c8de0;
  margin-left: 0.2rem;
}
.bg-primary {
  background-color: #2c8de0 !important;
}
/* pin graph */
.pin__bar__graph {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  position: relative;
  width: 100%;
}
.pin {
  display: grid;
  place-items: center;
  position: absolute;
  top: 7px;
}
.pin__head {
  width: 13px;
  height: 13px;
  border-radius: 50%;
}
.pin__tail {
  background-color: #727273;
  width: 1px;
  height: 20px;
  border-radius: 50%;
  z-index: 0;
}
.pin .pin__head {
  background-color: #2c8de0;
}
.pin.red .pin__head {
  background-color: #f44336;
}
.pin.grey .pin__head {
  background-color: #6f6f6f;
}
.pin__bar__graph .progress {
  width: 100%;
  height: 10px;
  position: absolute;
  z-index: 1;
}
.pin__bar__graph .value {
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 5px;
}
.pin__bar__graph .value.min {
  left: 0% !important;
}
.pin__bar__graph .value.max {
  right: 0% !important;
}
/* ----- recommended words css - end */
</style>