<template>
  <div class="page-wrapper-xl bg-gradient-blue">
    <!-- Reena: New Subscribe Page Here -->
    <div class="contents-centered">
      <div class="nexcard mw-900">
        <h3 class="color-dblue mb-3">Subscribe to Essential Yearly</h3>
        <span class="color-dblue"
          >Once your trial period ends, the subscription fee for the first month will be automatically charged to your account.
          <a href="" class="color-lblue">Read Terms and Conditions</a>
        </span>

        <form class="py-4 px-2">
          <p class="color-dblue fw-bold">Full Name</p>
          <div class="login input-group mt-1 mb-2">
            <input
              type="text"
              autocorrect="off"
              autocomplete="off"
              name="name"
              v-validate="'required'"
              class="form-control input-blue"
              v-model="fullname"
              aria-label="name"
              aria-describedby="name"
            />
            <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first("name") }}</span>
          </div>

          <p class="color-dblue fw-bold">Email</p>
          <div class="login input-group mt-1 mb-2">
            <input
              type="text"
              autocorrect="off"
              autocomplete="off"
              name="email"
              v-validate="'required'"
              class="form-control input-blue"
              v-model="email"
              aria-label="email"
              aria-describedby="email"
            />
            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first("email") }}</span>
          </div>

          <p class="color-dblue fw-bold">Credit or Debit Card</p>
          <div class="mt-1 mb-3">
            <div id="card-element" class="cardno__input input-blue" style="color: black"></div>
          </div>
        </form>

        <h4 class="color-dblue fw-bold mb-3">Order Summary</h4>
        <div class="d-flex mt-2 align-items-center">
          <h5 class="color-dblue">Essential Yearly</h5>
          <div class="ms-3 discount-ribbon"><span class="">SAVE 20%</span></div>
          <div class="color-dblue ms-auto">$564.00/Year</div>
        </div>
        <small class="color-dblue">$ 47.00/Month x 12</small>
        <hr class="hr-dblue" />
        <div class="d-flex">
          <h4 class="color-dblue">Total Due Today</h4>
          <h4 class="color-dblue ms-auto fw-bolder">$1.00 USD</h4>
        </div>
        <hr class="hr-dblue" />

        <!-- <p class="color-dblue fw-bold">Discount Code</p> -->
        <div class="login input-group mt-1 mb-2">
          <input
            type="text"
            autocorrect="off"
            autocomplete="off"
            name="promo"
            v-validate="'required'"
            class="form-control input-blue input-opacity"
            v-model="promo"
            aria-label="promo"
            aria-describedby="promo"
            placeholder="Enter Discount Code"
          />
          <span class="text-danger text-sm" v-show="errors.has('promo')">{{ errors.first("promo") }}</span>
        </div>

        <button class="btn btn-signup mt-3 w-100">Sign Up Now</button>
      </div>
    </div>
  </div>
</template>
<script src="https://js.stripe.com/v3/"></script>

<script>
const stripe = Stripe(
  "pk_test_51Is063AYOu0yvcMN4Hwyt7He7WE1WEfAOFtZVgyNvSIewISSs3TRUKTeWfFxkvHFWrh9nuzN7tKEXks8duEU19vg00MhYdGbfD"
  //"pk_live_51Is063AYOu0yvcMNoEPlJDAt9kLyqwPUlB80OA0plRQXfhBuepCf0kHsKmLc2JrGc7v4al4X2Y98GegjyjrLz0w300FwaKv0Qo"
);
const elements = stripe.elements();
const cardElement = elements.create("card");

// const cardHolderName = document.getElementById("card-holder-name");
// const cardButton = document.getElementById("card-button");
export default {
  methods: {
    back() {
      this.$router.push({ name: "Overview" });
    },
    async update(e) {
      e.preventDefault();
      const { paymentMethod, error } = await stripe.createPaymentMethod("card", cardElement, {
        billing_details: {
          name: this.me.email,
        },
      });

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
  },
  mounted() {
    cardElement.mount("#card-element");
  },
};
</script>
<style lang="css">
h3,
h4,
h6,
span,
small,
p {
  font-family: "Segoe UI";
  margin-bottom: 0;
}
.bg-gradient-blue {
  background-image: linear-gradient(to top, #e2f2ff, #fefeff);
}
.contents-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.color-dblue {
  color: #094890;
}
.color-lblue {
  color: #4fa2e7;
}
.fw-bold {
  font-weight: 500 !important;
}
.fw-bolder {
  font-weight: 700 !important;
}
.td-underline {
  text-decoration: underline;
}
.input-blue {
  border-radius: 12px !important;
  border: 2px solid #094890 !important;
  height: 40px !important;
}
.cardno__input.input-blue {
  padding-top: 9px;
  padding-left: 10px;
}
.ElementsApp .Icon-fill {
  fill: #89a7ca;
}
.nexcard {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 10px -10px, rgba(0, 0, 0, 0.1) 0px 10px 10px -10px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 2rem;
}

.mw-900 {
  max-width: 700px;
}
.discount-ribbon {
  background-color: #ffca00;
  color: #094890;
  padding: 0rem 0.4rem 0rem;
  line-height: 5px;
  margin-bottom: 0.5rem;
}
.discount-ribbon span {
  line-height: 1.5rem;
  font-size: 14px;
}
.hr-dblue {
  height: 1px;
  background-color: #094890;
  border: none;
  opacity: 1;
}

.btn-signup {
  background-color: #094890;
  color: #fff;
  border-radius: 12px;
  transition: 0.4s ease-out;
}

.btn-signup:hover {
  background-color: #073b76;
  color: #fff;
  border-radius: 12px;
  transition: 0.4s ease-out;
}

.input-opacity {
  opacity: 0.6;
  border: 2px solid #b0b0b0 !important;
}
.input-opacity:focus {
  opacity: 1;
  border: 2px solid #094890 !important;
}
</style>
