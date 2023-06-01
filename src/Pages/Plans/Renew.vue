<template>
  <div>
    <h5 class="text-primary fw-bold"> Plan Renewal </h5>

    <form
      action="https://app.nexmind.nexodn.com/api/stripe-checkout"
      method="POST"
      id="payment-form"
    >
      <!--#attention new row-->
      <span class="fw-bold">Your Plan is valid until: {{ me.expiry_date | formatDate }}</span>

      <!-- =============================================================================-->
      <!--Stripe Elements Placeholder - dont rename[id="card-element" \\  id="card-button"]-->
      <!-- ============================================================================= -->
      <!--#attention new row-->
      <div class="d-flex my-3 align-itemd-center">
        <label class="cardno__label">Card Number</label>
        <div id="card-element" class="cardno__input" style="color: black;"></div>
      </div>
      
      <!--#attention new row-->
      <button @click="update" id="card-button" class="btn btn-primary w-100">Renew My Plan</button>
    </form>
  </div>
</template>

<script src="https://js.stripe.com/v3/"></script>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import Plan from "@/store/Plan.js";
const stripe = Stripe(
  "pk_test_51Is063AYOu0yvcMN4Hwyt7He7WE1WEfAOFtZVgyNvSIewISSs3TRUKTeWfFxkvHFWrh9nuzN7tKEXks8duEU19vg00MhYdGbfD"
  //"pk_live_51Is063AYOu0yvcMNoEPlJDAt9kLyqwPUlB80OA0plRQXfhBuepCf0kHsKmLc2JrGc7v4al4X2Y98GegjyjrLz0w300FwaKv0Qo"
);
const elements = stripe.elements();
const cardElement = elements.create("card");

const cardHolderName = document.getElementById("card-holder-name");
const cardButton = document.getElementById("card-button");

export default {
  data() {
    return {
      selected: "monthly",
      options: [
        { value: "annually", text: "Annual" },
        { value: "monthly", text: "Monthly" },
      ],
      monthShow: true,

      me: [],
      month: 1,
      id: "",
    };
  },
  components: {
  
  },
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
        this.renewData();

        //Submit the form
        form.submit();
      }
    },

    renewData() {
      const obj = {
        paymentMethodId: this.id,
        plan_price_id: this.me.current_plan_price.id,
      };
      //

      Plan.renew(obj)

        .then((response) => {
          //
          this.$toast.success(response.data.message)
          // this.$bvToast.toast(response.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.$bvModal.hide("modal-center-renew-custom");
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
          // //
        this.me = JSON.parse(localStorage.userInfo);
  
  },
};
</script>
