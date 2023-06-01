<template>
  <div>
    <section class="bg-nexmind-blue">
      <div class="banner__sidebyside">
        <div class="banner__text">
          <div>
            <h5 class="banner__heading mb-0">{{ planChosen }}</h5>
            <h4 class="text-white mb-0">{{ priceChosen }}</h4>
            <hr class="custom__hr" />
            <ul class="list__info">
              <li
                :key="'showDetails' + index"
                v-for="(details, index) in showDetails"
              >
                {{ details }}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div class="input-card">
            <h4>You're just a few clicks away from creating better content.</h4>
            <form action="" class="form__inputgroup mt-4">
              <h6 class="mt-1">Choose Your Plan</h6>
              <div class="layoutform_inputgroup__radio input-group mt-1 mb-3">
                <div class="form-check">
                  <input
                    v-model="planChosen"
                    @change="changePlan"
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="Essential (Monthly)"
                    value="Essential (Monthly)"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="Essential (Monthly)"
                    >Essential (Monthly)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    v-model="planChosen"
                      @change="changePlan"
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="Essential (Yearly)"
                    value="Essential (Yearly)"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="Essential (Yearly)"
                    >Essential (Yearly)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    v-model="planChosen"
                      @change="changePlan"
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="Business (Monthly)"
                    value="Business (Monthly)"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="Business (Monthly)"
                    >Business (Monthly)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    v-model="planChosen"
                      @change="changePlan"
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="Business (Yearly)"
                    value="Business (Yearly)"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="Business (Yearly)"
                    >Business (Yearly)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    v-model="planChosen"
                      @change="changePlan"
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="SEO only (Monthly)"
                    value="SEO only (Monthly)"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="SEO only (Monthly)"
                    >SEO only (Monthly)</label
                  >
                </div>
                <div class="form-check">
                  <input
                    v-model="planChosen"
                      @change="changePlan"
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="SEO only (Yearly)"
                    value="SEO only (Yearly)"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="SEO only (Yearly)"
                    >SEO only (Yearly)</label
                  >
                </div>
                <!-- <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="medium"
                    value="medium"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="medium">Medium</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="website"
                    id="others"
                    value="others"
                    v-validate="'required'"
                  />
                  <label class="form-check-label" for="others">Others</label>
                </div> -->
              </div>

              <div class="input">
                <input
                  class="input__field"
                  id="firstname"
                  type="text"
                  required
                />
                <label for="firstname" class="input__label">First Name</label>
              </div>
              <div class="input">
                <input
                  class="input__field"
                  id="lastname"
                  type="text"
                  required
                />
                <label for="lastname" class="input__label">Last Name</label>
              </div>
              <div class="input">
                <input class="input__field" id="email2" type="email" required />
                <label for="email2" class="input__label">Email Address</label>
              </div>
              <div class="input">
                <input class="input__field" id="phone2" type="tel" required />
                <label for="phone2" class="input__label">Phone</label>
              </div>
              <!-- <div class="textarea">
                <textarea class="input__field" id="question" type="textarea" required />
                <label for="question" class="input__label">Question</label>
              </div> -->
              <div class="mb-3">
                <select
                  class="input__field w-100 rounded text-muted"
                  id="country"
                  name="country"
                  v-model="countryChosen"
                  v-validate="{ is_not: 'Country' }"
                  @change="chooseCountry(countryChosen)"
                >
                  <option hidden>Country</option>
                  <option
                    :value="con"
                    :key="index"
                    v-for="(con, index) in Countries"
                  >
                    {{ con.name }}
                  </option>
                </select>
                <!-- <label for="phone2" class="input__label">Phone</label> -->
              </div>

                  <!-- =============================================================================-->
      <!--Stripe Elements Placeholder - dont rename[id="card-element" \\  id="card-button"]-->
      <!-- ============================================================================= -->
      <!--#attention new row-->
      <div class="d-flex my-3 align-items-center">
        <!-- <label class="cardno__label">Card Number</label> -->
        <div id="card-element" class="cardno__input"></div>
      </div>

            </form>

            <label for="terms"
              >I have read and agree to the
              <a
                href="https://www.nexmind.ai/wp-	content/uploads/2023/03/Terms-and-Conditions-Nexmind.pdf"
                target="_blank"
                style="text-decoration: underline; color: blue"
                >Terms and Conditions.</a
              ></label
            ><br /><br />
            <button  id="card-button" class="btn btn-primary w-100">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable */
import { Country } from "country-state-city";
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
  components: {
    Country,
  },
  data() {
    return {
      Countries: Country.getAllCountries(),
      countryChosen: "Country",
      planChosen: "Essential (Monthly)",
      priceChosen: "$ 59/Month",
      showDetails: [
        "Free Trial - 4 Days",
        "240 credits/51,000 words (60 blogs) per month",
        "Blog Writing",
        "Freestyle (long and short)",
        "Image Generator (blog writing)",
        "Support 12 Languages with Target Location",
        "20 Use-Cases with 13 Tones",
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    changePlan() {
      console.log(this.planChosen)
      if (this.planChosen == "Essential (Monthly)") {
        this.priceChosen = "$ 59/Month"
          this.showDetails = [
            "Free Trial - 4 Days",
            "240 credits/51,000 words (60 blogs) per month",
            "Blog Writing",
            "Freestyle (long and short)",
            "Image Generator (blog writing)",
            "Support 12 Languages with Target Location",
            "20 Use-Cases with 13 Tones",
          ]
        
      } else if (this.planChosen == "Essential (Yearly)") {
        this.priceChosen = "$ 47/Month (Save $144/yr)"
          this.showDetails = [
            "Free Trial - 4 Days",
            "240 credits/51,000 words (60 blogs) per month",
            "Blog Writing",
            "Freestyle (long and short)",
            "Image Generator (blog writing)",
            "Support 12 Languages with Target Location",
            "20 Use-Cases with 13 Tones",
          ]
        
      } else if (this.planChosen == "Business (Monthly)") {
        this.priceChosen = "$ 119/Month"
          this.showDetails = [
            "Everything from essential plan 240credits/51,000words (60blogs) per month",
            "Optimize and Track 30 Page Per Month",
            "NLP Key Term",
            "Outcome Driven Content Suggestions for Better Ranking",
            "Live Editor Mode on Suggested Content!",
            "WordPress Integration",
          ]
        
      } else if (this.planChosen == "Business (Yearly)") {
        this.priceChosen = "$ 95/Month (Save $288/yr)"
          this.showDetails = [
            "Everything from essential plan 240credits/51,000words (60blogs) per month",
            "Optimize and Track 30 Page Per Month",
            "NLP Key Term",
            "Outcome Driven Content Suggestions for Better Ranking",
            "Live Editor Mode on Suggested Content!",
            "WordPress Integration",
          ]
        
      } else if (this.planChosen == "SEO only (Monthly)") {
        this.priceChosen = "$ 79/Month"
          this.showDetails = [
            "Optimize and Track 30 Page Per Month",
            "NLP Key Term",
            "Real-Time View on Content Scoring",
            "Outcome Driven Content Suggestions for Better Ranking",
            "Live Editor Mode on Suggested Content!",
          ]
        
      } else if (this.planChosen == "SEO only (Yearly)") {
        this.priceChosen = "$ 63/Month (Save $189/yr)"
          this.showDetails = [
            "Optimize and Track 30 Page Per Month",
            "NLP Key Term",
            "Real-Time View on Content Scoring",
            "Outcome Driven Content Suggestions for Better Ranking",
            "Live Editor Mode on Suggested Content!",
          ]
        
      }
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

      Plan.stripe_checkout(obj)
        .then((response) => {
          //
          this.$toast.success(response.data.message)

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
};
</script>
<style lang="css" scoped>
.cardno__label {
  white-space: nowrap;
  margin: auto 1rem auto auto;
}
.cardno__input {
   padding: 10px;
  border: 1px solid #838383;
  border-radius: 4px;
  background-color: transparent;
  outline: 2px solid #fff;
  width: 100%;
  color: #838383 !important;
}
.w-100 {
  width: 100% !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.mt-4 {
  margin-top: 2rem !important;
}
.color-white {
  color: white;
}
.custom__hr {
  border: none;
  height: 2px;
  background: #fff;
  opacity: 1;
}
.list__info {
  padding: 0;
}
.list__info li {
  font-size: 1rem;
  color: #fff;
  background: url(https://www.nexmind.ai/wp-content/uploads/2022/07/check.svg)
    no-repeat left center;
  padding: 5px 10px 5px 45px;
  list-style: none;
  /* margin: 0; */
  vertical-align: middle;
}
button {
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  background-color: rgb(66, 66, 66);
  color: #fff;
  font-weight: 600;
  transition: 0.2s ease-out;
}
.button-purple {
  background-color: #a722e6;
}

.input-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  width: 500px;
  margin-left: 5rem;
}
.input-card form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input {
  position: relative;
  margin-bottom: 2rem;
}
.textarea {
  position: relative;
  margin-bottom: 1rem;
}
.input__field {
  padding: 10px;
  border: 1px solid #838383;
  border-radius: 4px;
  background-color: transparent;
  outline: 2px solid #fff;
  width: 100%;
  color: #838383 !important;
}
.input__label {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(10px, 12px);
  transform-origin: left;
  transition: transform 0.25s;
  color: #838383;
}

.input__field:focus-visible ~ .input__label,
.input__field:valid ~ .input__label {
  transform: translate(0, -25px) scale(0.8);
  color: #838383;
}

.banner__sidebyside {
  margin: 0rem auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 6rem 0rem;
  max-width: 1400px;
}
.bg-lightgray {
  background-color: #f7f6f6;
}
.bg-nexmind-blue {
  background-image: url("https://www.nexmind.ai/wp-content/uploads/2022/05/background01-scaled.jpg");
}
.bg-blurrylights {
  background-image: url("https://images.unsplash.com/photo-1495422964407-28c01bf82b0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
  background-repeat: no-repeat;
  background-size: 100% 130%;
}
/* text */
.banner__text {
  /* border: 1px solid red; */
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  text-align: start;
}
.banner__heading {
  /* border: 1px solid rgb(70, 70, 72); */
  font-size: 3rem;
  margin: auto;
  margin-bottom: 2rem;
  color: #fff;
  text-align: start;
}
.banner_subheading {
  /* border: 1px solid rgb(24, 24, 26); */
  margin: auto;
  font-weight: normal;
  margin-bottom: 2rem;
  color: #282828;
  text-align: start;
}

/* image */
.banner__image {
  /* border: 1px solid blue; */
  display: grid;
  place-items: center;
}
.banner__image .img-wrapper {
  display: flex;
}
.banner__image img {
  object-fit: contain;
  max-width: 100%;
  border: 2px solid #4d505b;
  border-radius: 16px;
}
/* image full */
.banner__image-full {
  border: 1px solid blue;
  display: flex;
}
.banner__image-full .img-wrapper {
  display: flex;
}
.banner__image-full img {
  object-fit: contain;
  max-width: 100%;
  border: 2px solid #4d505b;
  border-radius: 16px;
}

@media (max-width: 991px) {
  .banner__sidebyside {
    margin: 0rem auto;
    padding: 5rem 3rem 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .banner__text {
    padding: 1rem 0rem 3rem;
    margin: auto;
  }
  .input-card {
    width: auto;
    max-width: 500px;
    margin: auto;
  }
}
@media (max-width: 480px) {
  .banner__sidebyside {
    padding: 4rem 2rem;
  }

  .banner__text h1 {
    font-size: 3rem;
    text-align: start;
  }
  .input-card {
    width: auto;
    margin-left: auto;
  }
  .bg-blurrylights {
    background-size: cover;
  }
}

/* layouts css */
.button-primary {
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  background-color: rgb(66, 66, 66);
  color: #fff;
  font-weight: 600;
  transition: 0.2s ease-out;
}
.button-primary:hover {
  border: 1px solid transparent;
  background-color: rgb(42, 42, 42);
  transition: 0.2s ease-out;
  color: #fff;
}

.button-secondary {
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  background-color: rgb(104, 104, 104);
  color: #fff;
  font-weight: 200;
  transition: 0.2s ease-out;
}
.button-secondary:hover {
  border: 1px solid transparent;
  background-color: rgb(82, 82, 82);
  transition: 0.2s ease-out;
  color: #fff;
}
.toolbar {
  display: none;
  background-color: azure;
  position: absolute;
  left: 50%;
}
section:hover .toolbar {
  display: block;
}

.layoutform_inputgroup__radio {
  display: flex;
  justify-content: start;
  user-select: none;
}
.layoutform_inputgroup__radio .form-check .form-check-input {
  visibility: hidden;
}
.layoutform_inputgroup__radio .form-check .form-check-label {
  transform: translate(-20px, 0px);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background-color: var(--white);
  border-radius: 20px;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
.layoutform_inputgroup__radio .form-check .form-check-label:hover {
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  transition: all 0.3s ease-out;
}
.layoutform_inputgroup__radio
  .form-check
  .form-check-input:checked
  ~ .form-check-label {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--white);
  transition: all 0.3s ease-out;
}
</style>
