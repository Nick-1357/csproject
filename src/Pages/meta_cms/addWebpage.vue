<template>
  <div class="card-body">
    <h4 class="modal-card__title mt-2 mb-4">Add Webpage</h4>

    <div class="card-text mt-4 b-form-radio-wrapper">
      <b-form-radio-group id="radio-group-1" v-model="selected" :options="options" name="radio-options" class="b-form-radio-buttons" button-variant="primary" buttons></b-form-radio-group>
    </div>

    <div class="card-text mt-3">
      <b class="mb-4">URL</b>
    </div>

    <b-form-input autocorrect="off" autocomplete="off" v-model="url" type="text" id="url" name="url" v-validate="'required'" class="mt-2"></b-form-input>

    <span class="text-danger text-sm" v-show="errors.has('url')">{{ errors.first("url") }}</span>

    <div v-if="selected == 'Website Editor'" class="card-text mt-4">
      <b>Campaign Type</b>
    </div>

    <div v-if="selected == 'Website Editor'" class="card-text mt-2">
      <b-form-radio-group id="radio-group-2" v-model="campaign_type" :options="campaignType" name="radio-options-2" class="b-form-radio-buttons" button-variant="primary" buttons></b-form-radio-group>
    </div>

    <div v-if="campaign_type == 'SEO A/B Testing' && selected == 'Website Editor'" class="card-text mt-4">
      <b>Variant</b>
    </div>

    <div v-if="campaign_type == 'SEO A/B Testing' && selected == 'Website Editor'" class="card-text mt-2">
      <b-form-radio-group id="radio-group-3" v-model="variant" :options="variantsType" name="radio-options-3" class="b-form-radio-buttons" button-variant="primary" buttons></b-form-radio-group>
    </div>

    <div class="card-text d-flex mt-3">
      <button class="btn btn-primary-outlined ms-auto" @click="$bvModal.hide('modal-center-add-optimized')">Cancel</button>
      <button @click="openWebsite" class="btn btn-primary ms-2">Add</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import meta_cms from "@/store/meta-cms.js";

export default {
  data() {
    return {
      url: "",
      options: ["Website Editor", "Manual Editor"],
      selected: "Website Editor",
      campaignType: ["Single", "SEO A/B Testing"],
      campaign_type: "Single",
      variantsType: ["A", "B"],
      variant: "A",
    };
  },

  methods: {
    openWebsite() {
      if (this.selected == "Website Editor") {
        var env = "";

        if (location.href.includes("www.platform.nexmind.ai")) {
          env = "prod";
        } else {
          env = "uat";
        }

        if (this.campaign_type == "Single") {
          window.open(
            this.url + `?nexmind_token=` + localStorage.accessToken + `&nexmind_editor_campaign_type=single` + `&client_id=` + this.$route.params.id + `&show_editor=true` + `&en=` + env,
            "_blank"
          );
        } else {
          window.open(
            this.url +
              `?nexmind_token=` +
              localStorage.accessToken +
              `&nexmind_editor_variant=` +
              this.variant +
              `&nexmind_editor_campaign_type=AB` +
              `&client_id=` +
              this.$route.params.id +
              `&show_editor=true` +
              `&en=` +
              env,
            "_blank"
          );
        }

        this.$bvModal.hide("modal-center-add-optimized");
      } else {
        console.log(this.url);

        this.$router.push({
          name: "meta_cms_add",
          params: { url: this.url },
        });

        this.$bvModal.hide("modal-center-add-optimized");
      }
    },
  },
  created() {},
};
</script>

<style lang="css" scoped></style>
