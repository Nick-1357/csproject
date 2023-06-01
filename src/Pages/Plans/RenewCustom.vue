<template>
  <div>
    <h5 class="text-primary"> Plan Renewal </h5>
    <form
      action="https://app.nexmind.nexodn.com/api/stripe-checkout"
      method="POST"
      id="payment-form"
    >
      <!--#attention new row-->
      <span class="fw-bold">Your Plan is valid until: {{ me.expiry_date | formatDate }}</span>
      <!--#attention new row-->
      <div class="row my-3">
        <div class="col-5 d-flex align-items-center">
          <label class="type__label">Type</label>
          <b-form-select class="type__select" v-model="selected" :options="options"></b-form-select>
        </div>
        <div class="col-7 d-flex align-items-center">
          <!--#attention new row-->
          <label class="period__label">Period of Renewal</label>
          <b-form-spinbutton
            id="demo-sb"
            v-model="month"
            min="1"
            max="100"
            class="period__spinbutton"
          ></b-form-spinbutton>
        </div>
      </div>
      <!-- =============================================================================-->
      <!--Stripe Elements Placeholder - dont rename[id="card-element" \\  id="card-button"]-->
      <!-- ============================================================================= -->
      <div class="d-flex mb-3 align-items-center">
        <label class="cardno__label">Card Number</label>
        <div id="card-element" class="cardno__input"></div>
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
  // "pk_live_51Is063AYOu0yvcMNoEPlJDAt9kLyqwPUlB80OA0plRQXfhBuepCf0kHsKmLc2JrGc7v4al4X2Y98GegjyjrLz0w300FwaKv0Qo"
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
        count: this.month,
        type: this.selected,
      };
      // //

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
          this.$bvModal.hide("modal-center-renew");
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

 


        //
        // //
        this.me = JSON.parse(localStorage.userInfo);
   
   
  },
};
</script>
