<template>
  <div>
    <b-modal id="modal-center-upgrade" centered hide-footer hide-header>
      <div class="card-body">
        <upgrade :plans="chosenPlan"></upgrade>
      </div>
    </b-modal>

    <div class="pricing-page d-flex flex-column align-items-center text-center">
      <div class="d-flex align-items-center mb-4">
        <img
          src="@/assets/nexmind/nexmind-image.png"
          alt="Nexmind"
          style="height: 50px; object-fit: contain"
        />
        <h6
          style="color: #2d8fe2; font-weight: 600; font-size: 46px"
          class="ms-4 mb-1"
        >
          Pricing
        </h6>
      </div>

      <!-- customed plan -->
      <div v-if="otherPlan == null">
        <div class="pricing-banner">
          <span>There are no Upgradable Plans</span>
        </div>
      </div>

      <!-- listing plan -->
      <div class="pricing-banner" v-if="otherPlan.length != 0">
        <span>Recommended Plan</span>
      </div>
      <div class="row" v-if="otherPlan.length != 0">
        <div class="col" v-for="(item2, index2) in otherPlan" :key="index2">
          <div class="nexcard">
            <h2 style="color: #2d8fe2; font-weight: 600; margin-bottom: 2rem">
              ${{ item2.price }} / {{ item2.period_type | capitalize }}
            </h2>
            <div class="plan-details">
              <div class="d-flex flex-column">
                <div
                  class="d-flex align-items-center mb-2 ms-1"
                  v-for="(spec, index) in item2.desc"
                  :key="index"
                >
                  <img src="@/assets/icons/icon-check-green.svg" alt="Pros" />
                  <span class="ms-3"> {{ spec | capitalize }}</span>
                </div>
              </div>
            </div>
            <div v-if="current_plan.length != 0 && current_plan.renewable == 1">
              <button
                class="btn btn-upgrade mt-3"
                v-if="myPlan.id == current_plan.id"
                @click="upgrade_plan_price(item, item2)"
              >
                Upgrade
              </button>
              <button
                @click="upgrade_plan_price(item, item2)"
                v-else
                class="btn btn-upgrade mt-3"
              >
                Subscribe
              </button>
            </div>
            <div v-else><p>You can not upgrade</p></div>
          </div>
        </div>
      </div>

      <!-- appsumo plan -->
      <div v-for="(item, index) in upgrade_plan" :key="index">
        <div class="pricing-banner">
          <span>{{ item.name | plans }}</span>
        </div>
        <div class="row" style="width: 900px; margin: 0rem auto 2rem">
          <div
            class="col-6"
            v-for="(item2, index2) in item.prices"
            :key="index2"
          >
            <div class="nexcard">
              <h2 style="color: #2d8fe2; font-weight: 600; margin-bottom: 2rem">
                ${{ item2.price }} / {{ item2.period_type | capitalize }}
              </h2>
              <div class="plan-details">
                <div class="d-flex flex-column">
                  <div
                    class="d-flex align-items-center mb-2 ms-1"
                    v-for="(spec, index) in item2.desc"
                    :key="index"
                  >
                    <img src="@/assets/icons/icon-check-green.svg" alt="Pros" />
                    <span class="ms-3">{{ spec | capitalize }}</span>
                  </div>
                </div>
              </div>
              <button
                @click="upgrade_plan_price(item, item2)"
                class="btn btn-upgrade mt-3"
                v-if="item.renewable == 1"
              >
                Upgrade
              </button>
              <p v-else>You can not upgrade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import Auth from "@/store/Auth.js";
import upgrade from "@/Pages/Plans/Upgrade.vue";
export default {
  components: {upgrade},
  data() {
    return {
      myPlan: [],
      otherPlan: [],
      me: [],
      chosenPlan: {},
      current_plan: [],
      upgrade_plan: [],
    };
  },
  methods: {
    upgrade_plan_price(plan, price) {
      this.chosenPlan = { plan: plan, price_id: price };
      this.$bvModal.show("modal-center-upgrade");
    },
  },

  mounted() {
  
  },

  created() {
   
    // =============================================================================
    //  Get the current and other plans
    // =============================================================================

        this.me = JSON.parse(localStorage.userInfo);

        if (response.data.data.current_plan_price != undefined) {
          this.myPlan = response.data.data.current_plan_price;

          if (this.myPlan != null) {
            this.myPlan.desc = eval(this.myPlan.description);
          }
        }

        //
        if (response.data.data.current_plan != undefined) {
          if (response.data.data.current_plan.length != 0) {
            this.otherPlan = response.data.data.current_plan[0].prices;
            this.current_plan = response.data.data.current_plan[0];

            if (this.otherPlan != null) {
              this.otherPlan.forEach((element, index) => {
                this.otherPlan[index].desc = eval(element.description);
              });
            }

            this.otherPlan.forEach((element, index) => {
              if (element.price == this.myPlan.price) {
                this.otherPlan.splice(index, 1);
              }
            });
          }
        }

        if (response.data.data.upgradable_plans != undefined) {
          if (response.data.data.upgradable_plans.length != 0) {
            this.upgrade_plan = response.data.data.upgradable_plans;
          }
        }

        if (this.upgrade_plan != null) {
          this.upgrade_plan.forEach((element, index) => {
            element.prices.forEach((element2, index2) => {
              this.upgrade_plan[index].prices[index2].desc = eval(
                element2.description
              );
            });
          });
        }
  
        //
        //
   
  },
};
</script>

<style lang="css">
.pricing-page {
  position: relative;
  max-width: 1600px;
  margin: 2rem auto;
  padding: 2rem;
}
.text-primary {
  color: #2c8ee1;
  font-weight: bold;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  padding: 2rem;
  margin: 2rem 0;
}

.pricing-banner {
  padding: 0.5rem 1rem;
  margin: 1rem auto 0rem;
  width: calc(450px - 6rem * 0.5);
  font-weight: bold;
  border-radius: 6px;

  color: #2c8ee1;
  background-color: #e7edf3;
  /* background-color: #2c8ee1;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  
}
.pricing-banner span {
  margin: 0;
  font-size: 28px;
  /* text-decoration: underline; */
}
.btn-upgrade {
  background-color: #4caf50;
  color: #fff;
  font-weight: bold;
  width: 100%;
}
.btn-upgrade:hover,
.btn-upgrade:active {
  background-color: #309e58 !important;
  border-color: #309e58 !important;
  color: #fff !important;
  transition: all 0.2s ease-out;
}
</style>