<template>
  <div>
    <div class="page-wrapper-lg us-0">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
        </p>
      </div>
      <div class="nexcard">
        <h4 class="text-darkgreen text-center modal-card__title mt-5">
          Create Project
        </h4>

        <form class="card__inputbody">
          <!-- Project Name -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Project name
              <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Company name"
            class="material-icons-outlined"
            >help_outline</span
          > -->
            </span>
            <div class="card_inputgroup__input input-group">
              <input
                autocorrect="off"
                autocomplete="off"
                type="text"
                class="form-control rounded w-100"
                aria-label="name"
                aria-describedby="name"
                v-model="name"
                name="name"
                v-validate="'required'"
              />
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <!-- Base URL -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Base URL
              <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target URL"
            class="material-icons-outlined"
            >help_outline</span
          > -->
            </span>
            <div class="card_inputgroup__input input-group">
              <b-form-input
                class="form-control rounded w-100"
                autocorrect="off"
                autocomplete="off"
                type="text"
                id="url"
                name="url"
                placeholder="ex: www.example.com"
                v-model="url"
                v-validate="'required|url'"
              ></b-form-input>

              <span class="text-danger text-sm" v-show="errors.has('url')">{{
                errors.first("url")
              }}</span>
            </div>
          </div>


              <div class="card_inputgroup">
            <span class="card_inputgroup__exp">
           
             <span
            class="material-icons-outlined"
            >help_outline</span
          >   <small class="text-muted font-weight-normal">'Base URL' will be used to track your keyword in Keyword Tracker and will be used in AI Content Generation to deploy your blog through wordpress</small>
            </span>
              </div>


        

          <!-- <div class="card_inputgroup ms-auto">
        <div class="card_inputgroup__input input-group">
          <input
            v-model="status"
            type="checkbox"
            class="custom-control-input custom-checkbox"
            id="customSwitch1"
          />
          <label class="custom-control-label ms-2" for="customSwitch1"
            >Campaign Active?
          </label>
        </div>
      </div> -->
        </form>
        <div class="card-text d-flex mt-3">
          <button class="btn btn-primary-outlined ms-auto" @click="cancel()">
            Cancel
          </button>
          <button class="btn btn-primary ms-2 text-white" @click="nextStep()">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
/* eslint-disable */
import KeywordTracker from "@/store/KeywordTracker.js";
export default {
  data() {
    return {
      name: "",
      url: "",
      status: 1,
    };
  },

  methods: {
    cancel() {
      this.$router.push({
        name: "Dashboard",
      });
    },
    nextStep() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      const obj = {
        name: this.name,
        base_url: this.url,
        active: this.status ? 1 : 0,
      };
      //

      this.$validator.validateAll().then((result) => {
        if (result) {
          KeywordTracker.addClient(obj)
            .then((response) => {
              loader.hide();
              this.$toast.success(response.data.message);

              // this.$bvToast.toast(response.data.message, {
              //   title: "Success",
              //   variant: "success",
              //   toaster: "b-toaster-bottom-left",
              //   solid: true,
              // });

              KeywordTracker.fetchDomains()
                .then((res) => {
                  var project = [];
                  res.data.data.forEach((element) => {
                    project.push({ id: element.id, name: element.name });
                  });
                  localStorage.setItem(
                    "nexrank_client",
                    JSON.stringify(project)
                  );

                  this.$router.push({
                    name: "Dashboard",
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        loader.hide();
      });
    },
  },
};
</script>
<style lang="css" scoped>
.page-wrapper-lg {
  position: relative;
  max-width: 1200px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  position: relative;
}
.card-text {
  margin-top: 0.5rem;
}
.btn-dropdown[aria-expanded="false"] .arrow-icon {
  transition: 0.3s ease-out;
  rotate: 0deg;
}
.btn-dropdown[aria-expanded="true"] .arrow-icon {
  transition: 0.3s ease-out;
  rotate: 180deg;
}
.custom-control .custom-control-input {
  width: 16px;
  height: 16px;
}
.custom-control .custom-control-label {
  font-size: 16px;
  margin-left: 0.5rem;
  user-select: none;
}

.card__inputbody {
  margin: 0 auto;
  padding: 1rem 0rem 0rem;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}
.card__title {
  color: #355239;
  font-weight: bold;
  margin: 1rem 0rem;
}
.card_inputgroup {
  display: flex;
  align-items: center;
  color: #355239;
  margin: 1rem 0;
}

.card_inputgroup__title {
  min-width: 200px;
  font-weight: bold;
}
.card_inputgroup__exp{
 min-width: 200px;
  font-weight: normal;
}
.card_inputgroup__input {
  width: 100%;
}
.card_inputgroup__exp .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}
.card_inputgroup__title .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}
.card_inputgroup__radio {
  display: flex;
  justify-content: start;
  margin-right: -1rem;
  user-select: none;
}
.card_inputgroup__radio .form-check .form-check-input {
  visibility: hidden;
}
.card_inputgroup__radio .form-check .form-check-label {
  transform: translate(-20px, 0px);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background-color: var(--white);
  border-radius: 20px;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
}
.card_inputgroup__radio .form-check .form-check-label:hover {
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  transition: all 0.3s ease-out;
}
.card_inputgroup__radio
  .form-check
  .form-check-input:checked
  ~ .form-check-label {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--white);
  transition: all 0.3s ease-out;
}
.b-form-tags .b-form-tags-list .badge {
  background: #e7e7e7 !important;
  visibility: visible !important;
  border-radius: 15px;
  padding: 0.2rem 0.2rem 0.1rem 0.7rem;
}
.b-form-tags .b-form-tags-list .badge,
.b-form-tag {
  font-size: 15px !important;
  color: grey !important;
}
.b-form-tags .b-form-tags-list .badge .b-form-tag,
.b-form-tag-content {
  color: black !important;
  font-size: 15px;
}
#tags-basic {
  font-size: 14px;
  margin-left: 0.5rem !important;
}
.custom-checkbox {
  height: 20px;
  width: 20px;
  accent-color: #2c8ee1;
}

</style>
