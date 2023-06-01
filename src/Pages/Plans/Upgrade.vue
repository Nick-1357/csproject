<template>
  <div>
    <h5 class="text-upgrade fw-bold mb-3">Plan Upgrade</h5>

    <form
      action="https://api.platform.nexmind.ai/api/stripe-checkout"
      method="POST"
      id="payment-form"
    >
      <!--#attention new row-->
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="pricing-banner w-auto m-0">{{
          plans.plan.name | plans
        }}</span>
        <span class="fw-bold text-primary">
          {{ plans.price_id.period_count }}
          {{ plans.price_id.period_type | capitalize }} for ${{
            plans.price_id.price
          }}
        </span>
      </div>

      <!--#attention new row-->

      <!--#attention new row-->
      <span class="fw-bold"
        >Your Plan is valid until: {{ me.expiry_date | formatDate }}</span
      >

      <!-- =============================================================================-->
      <!--Stripe Elements Placeholder - dont rename[id="card-element" \\  id="card-button"]-->
      <!-- ============================================================================= -->
      <!--#attention new row-->
      <div class="d-flex my-3 align-items-center">
        <label class="cardno__label">Card Number</label>
        <div id="card-element" class="cardno__input"></div>
      </div>
      <button @click="update" id="card-button" class="btn btn-upgrade">
        Upgrade My Plan
      </button>
    </form>
  </div>
</template>

<script src="https://js.stripe.com/v3/"></script>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import Plan from "@/store/Plan.js";
import KeywordAnalyzer from "@/store/KeywordAnalyzer.js";
const stripe = Stripe(
  "pk_test_51Is063AYOu0yvcMN4Hwyt7He7WE1WEfAOFtZVgyNvSIewISSs3TRUKTeWfFxkvHFWrh9nuzN7tKEXks8duEU19vg00MhYdGbfD"
  //"pk_live_51Is063AYOu0yvcMNoEPlJDAt9kLyqwPUlB80OA0plRQXfhBuepCf0kHsKmLc2JrGc7v4al4X2Y98GegjyjrLz0w300FwaKv0Qo"
);
const elements = stripe.elements();
const cardElement = elements.create("card");

const cardHolderName = document.getElementById("card-holder-name");
const cardButton = document.getElementById("card-button");

export default {
  props: {
    plans: Object,
  },

  data() {
    return {
      me: [],
      plan_id: this.$route.params.id,
      locationRestriction: "",
      monthly_price: this.$route.params.monthly_price,
      annually_price: this.$route.params.annually_price,
      id: "",
      locations: JSON.parse(localStorage.locations),
      showLocations: [],
      selected: "monthly",
      options: [
        { value: "annually", text: "Annual" },
        { value: "monthly", text: "Monthly" },
      ],
      monthShow: true,
      month: 1,
    };
  },
  components: {},
  watch: {
    selected() {
      // //
      if (this.selected == "annually") {
        this.monthShow = false;
      } else {
        this.monthShow = true;
      }
    },
  },

  methods: {
    back() {
      this.$router.push({ name: "Overview" });
    },
    async update(e) {
      e.preventDefault();
      const { paymentMethod, error } = await stripe.createPaymentMethod(
        "card",
        cardElement,
        {
          billing_details: {
            name: this.me.email,
          },
        }
      );

      if (error) {
        console.error(error);
      } else {
        // //
        // var form = document.getElementById("payment-form");
        // var hiddenInput = document.createElement("input");
        // hiddenInput.setAttribute("type", "hidden");
        // hiddenInput.setAttribute("name", "paymentMethodId");
        // hiddenInput.setAttribute("value", paymentMethod.id);
        // form.appendChild(hiddenInput);
        // //

        // //
        this.id = paymentMethod.id;
        this.UpgradeData();

        //Submit the form
        form.submit();
      }
    },

    handleSelected() {
      // //
      // //

      if (this.location.length > this.locationRestriction) {
        this.location.splice(0, 1);
      }

      // //
    },

    UpgradeData() {
      const obj = {
        paymentMethodId: this.id,
        //locations: this.location,
        plan_id: this.plans.plan.id,
        plan_price_id: this.plans.price_id.id,
      };
      // //

      //       this.$bvToast.toast("Successfully", {
      //       title: "Success",
      //       variant: "success",
      //       toaster: "b-toaster-bottom-left",
      //       solid: true,
      //     });

      //      this.$bvModal.hide("modal-center-upgrade");

      //  setTimeout(this.$router.push(location.reload(), 10000))

      //     this.$router.push({ name: "Overview" });

      Plan.upgrade(obj)
        .then((response) => {
          //
          this.$toast.success(response.data.message);

          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          this.$bvModal.hide("modal-center-upgrade");

          setTimeout(location.reload(), 10000);
          this.$router.push({ name: "Overview" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  mounted() {
    cardElement.mount("#card-element");
  },
  created() {
    //
    // //
    // //

    // //
    // if (
    //   this.locationRestriction == 0 ||
    //   this.locationRestriction == "null" ||
    //   this.locationRestriction == undefined
    // ) {
    //   this.$router.push({ name: "Overview" });
    // }

    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    this.me = JSON.parse(localStorage.userInfo);

    // this.locationRestriction=this.plans.price_id.locations_count

    if (response.length > this.locationRestriction) {
      this.location.splice(0, this.locationRestriction);
    }

    // //

    KeywordAnalyzer.fetchAllLocations()
      .then((response) => {
        loader.hide();
        this.showLocations = response.data.data;
      })
      .catch((error) => {
        console.log(error);
        loader.hide();
      });
  },
};
</script>

<style scoped>
input[type="text"],
select,
textarea {
  border-radius: 4px;
  font-size: 13px;
  width: 100%;

  background: #ffffff 0% 0% no-repeat padding-box;
}

input[type="email"],
select,
textarea {
  border-radius: 4px;
  font-size: 13px;
  width: 100%;

  background: #ffffff 0% 0% no-repeat padding-box;
}

#demo-sb {
  height: 2.3vw;
}
</style>
