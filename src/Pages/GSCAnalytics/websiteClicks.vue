<template lang="">
  <div>
    <div class="nexcard mt-5" style="min-height: 400px">
      <h5 class="text-darkgreen mb-3">Clicks</h5>
      <div class="card_inputgroup__radio input-group">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="chart" id="chart" value="1" />
          <label class="form-check-label" for="chart">Lifetime</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="chart" id="chart" value="1" />
          <label class="form-check-label" for="chart">Today</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="chart" id="chart" value="1" />
          <label class="form-check-label" for="chart">Week</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="chart" id="chart" value="1" />
          <label class="form-check-label" for="chart">Month</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="chart" id="chart" value="1" />
          <label class="form-check-label" for="chart">Year</label>
        </div>
      </div>
    </div>
    <div class="row d-flex mt-5">
      <div class="col-4">
        <div class="nexcard pb-3 h-100">
          <div class="d-flex align-items-center mb-2">
            <h5 class="text-darkgreen mb-0">Recent Clicks</h5>
            <button class="text-primary ms-auto">View all</button>
          </div>
          <div class="nextable">
            <div class="nextable__head">
              <div class="row g-0">
                <div class="col-9 th"><span>Date</span></div>
                <div class="col-3 th"><span>Clicks</span></div>
              </div>
            </div>
            <div class="nextable__body">
              <div class="row g-0" v-for="n in 10" :key="n">
                <div class="col-9 td"><span>00 April 2023</span></div>
                <div class="col-3 td"><span>00000</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="nexcard h-100">
          <h5 class="text-darkgreen">Devices</h5>
          <div class="row">
            <div class="col-5 d-flex">
              <div class="m-auto">Donut Chart Here</div>
            </div>
            <div class="col-7 d-grid">
              <div class="row">
                <div class="nextable p-5">
                  <div class="nextable__head">
                    <div class="row g-0 p-2">
                      <div class="col-9 th"><span>Devices</span></div>
                      <div class="col-3 th"><span>Clicks</span></div>
                    </div>
                  </div>
                  <div class="nextable__body">
                    <div class="row g-0 p-2">
                      <div class="col-9 td d-flex text-darkgrey">
                        <span class="material-icons-outlined me-2"> computer </span>
                        <span class="fw-600">Desktop</span>
                      </div>
                      <div class="col-3 td">
                        <span class="fw-600">00000</span>
                      </div>
                    </div>
                    <div class="row g-0 p-2">
                      <div class="col-9 td d-flex text-darkgrey">
                        <span class="material-icons-outlined me-2"> smartphone </span>
                        <span class="fw-600">Mobile</span>
                      </div>
                      <div class="col-3 td">
                        <span class="fw-600">00000</span>
                      </div>
                    </div>
                    <div class="row g-0 p-2">
                      <div class="col-9 td d-flex text-darkgrey">
                        <span class="material-icons-outlined me-2"> tablet </span>
                        <span class="fw-600">Tablet</span>
                      </div>
                      <div class="col-3 td">
                        <span class="fw-600">00000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-4">
        <div class="nexcard h-100">
          <div class="d-flex align-items-center mb-2">
            <h5 class="text-darkgreen mb-0">Queries | Top 10</h5>
            <button class="text-primary ms-auto">View all</button>
          </div>
          <div class="nextable">
            <div class="nextable__head">
              <div class="row g-0">
                <div class="col-9 th"><span>Date</span></div>
                <div class="col-3 th"><span>Clicks</span></div>
              </div>
            </div>
            <div class="nextable__body">
              <div class="row g-0" v-for="n in 10" :key="n">
                <div class="col-9 td"><span>00 April 2023</span></div>
                <div class="col-3 td"><span>00000</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="nexcard h-100">
          <div class="d-flex align-items-center mb-2">
            <h5 class="text-darkgreen mb-0">Pages | Top 10</h5>
            <button class="text-primary ms-auto">View all</button>
          </div>
          <div class="nextable">
            <div class="nextable__head">
              <div class="row g-0">
                <div class="col-9 th"><span>Date</span></div>
                <div class="col-3 th"><span>Clicks</span></div>
              </div>
            </div>
            <div class="nextable__body">
              <div class="row g-0" v-for="n in 10" :key="n">
                <div class="col-9 td"><span>00 April 2023</span></div>
                <div class="col-3 td"><span>00000</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="nexcard h-100">
          <div class="d-flex align-items-center mb-2">
            <h5 class="text-darkgreen mb-0">Countries | Top 10</h5>
            <button class="text-primary ms-auto">View all</button>
          </div>
          <div class="nextable">
            <div class="nextable__head">
              <div class="row g-0">
                <div class="col-9 th"><span>Date</span></div>
                <div class="col-3 th"><span>Clicks</span></div>
              </div>
            </div>
            <div class="nextable__body">
              <div class="row g-0" v-for="n in 10" :key="n">
                <div class="col-9 td"><span>00 April 2023</span></div>
                <div class="col-3 td"><span>00000</span></div>
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
  name: "websiteClicks",
  data() {
    return {
      n: 1,
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

/* nextable css */
.nextable .nextable__head {
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__head .th {
  padding: 0.5rem 0rem;
  font-weight: bold;
}
.nextable .nextable__head span {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.nextable .col-3 {
  text-align: end;
}
.nextable .nextable__body {
  overflow-y: auto;
  margin-top: 0.5rem;
  font-size: 14px;
}
/* .nextable__body .row {
  border-bottom: 1px solid #e6e6e6;
} */
.nextable .nextable__body .td {
  padding: 0.2rem 0rem;
  align-items: start;
  display: flex;
}
.nextable .col-3 span {
  margin-left: auto;
}

/* @media screen and (min-height: 917px) {
  .nextable .nextable__body {
    max-height: 60vh;
  }
  .nexcard {
    height: 712px;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 58vh;
  }
  .nexcard {
    height: 510px;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body {
    height: 50vh;
  }
} */
/* .nextable .nextable__head {
  margin-right: 8px;
} */
</style>
