<template>
  <div>
    <form class="card__inputbody">
        <div class="nexcard" v-if="url.length != 0">
        <!-- <div class="embed-responsive">
          <iframe class="embed-responsive-item" :src="url"></iframe>
        </div> -->

        <iframe :src="url" width="100%" height="100%" />
      </div>


      <!-- Base URL -->
      <div class="card_inputgroup">
        <span class="card_inputgroup__title">
          Target URL
          <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target URL"
            class="material-icons-outlined"
            >help_outline</span
          > -->
        </span>
        <div class="card_inputgroup__input input-group">
          <input
            autocorrect="off"
            autocomplete="off"
            type="url"
            class="form-control rounded"
            aria-label="url"
            aria-describedby="url"
            v-model="url"
            v-validate="'required|url'"
            name="Topic"
          />
          <span class="text-danger text-sm" v-show="errors.has('url')">{{
            errors.first("Topic")
          }}</span>
        </div>

        
      </div>

       <!-- <div class="card_inputgroup">
        <span class="card_inputgroup__exp">
          <span class="material-icons-outlined">help_outline</span>
          <small class="text-muted font-weight-normal"
            >'Target URL' will be used to track your keyword in Keyword Tracker
            and will be used in AI Content Generation to deploy your blog
            through wordpress</small
          >
        </span>
      </div> -->
    </form>
    <div class="card-text d-flex mt-3">
      <button @click="previous()" class="btn btn-primary-outlined ms-auto">Back</button>
      <button class="btn btn-primary ms-2 text-white" @click="submitData()">
        Next
      </button>
    </div>
  </div>
</template>



<script>
/* eslint-disable */
import Automation from "@/store/Automation.js";
export default {
  data() {
    return {
      url: "",
    };
  },
  methods: {
    previous(){
   this.$router.push({
              name: "AI SEO Automation_Add Keyword",
              params: { step: "topic_details" },
            });
    },
    submitData() {
      var obj = JSON.parse(localStorage.seo_automation_data_create);
      obj.url = this.url;

  

      Automation.addSeoAutomation(obj)
        .then((response) => {
          this.$toast.success("Successful")

          // this.$bvToast.toast("successful", {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });

          this.$router.push({
            name: "ai_seo_automation_campaign",
            params: {
              id: response.data.data.id,
              location: response.data.data.location.id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.card__inputbody {
  margin: 0 auto;
  padding: 3rem 0rem 0rem;
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
.card_inputgroup__exp{
 min-width: 200px;
  font-weight: normal;
}

.card_inputgroup__exp .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}

.card_inputgroup__title {
  min-width: 200px;
  font-weight: bold;
}
.card_inputgroup__input {
  width: 100%;
}
.card_inputgroup__title .material-icons-outlined {
  font-size: 15px;
  cursor: default;
}

.nexcard {
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  padding: 2rem;
}
</style>