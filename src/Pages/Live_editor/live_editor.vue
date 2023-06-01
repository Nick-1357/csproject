<template>
  <div>
    <!-- <div v-if="loading" class="d-flex justify-content-center mt-5 mb-3">
        <b-spinner variant="primary" label="Large Spinner"></b-spinner>
      </div> -->

    <div class="card">
      <iframe
        id="iframe"
        :src="source"
        width="100%"
        style="height: 99vh"
      ></iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import meta_cms from "@/store/meta-cms.js";
import Automation from "@/store/Automation.js";
export default {
  components: {},
  data() {
    return {
      get_data: {},
      pass_data: {},
     // source: "https://nexmind.ai",
     //$("a").click(function(e) { e.preventDefault(); })
      //source: "http://localhost:8081/?show_editor=true",
    };
  },

  watch: {},

  methods: {
        setTime() {
      var f = document.getElementById("iframe");
      f.src = f.src;

      setTimeout(() => {
        this.changeVar();
      }, 500);
    },
    sendToWebsite() {
      var iframeWin = document.getElementById("iframe").contentWindow;

    console.log(this.get_data);
      iframeWin.postMessage(
        { nexmind_live: this.get_data },
        "http://localhost:8081/?show_editor=true"
      );
    },

    localStoreHandler(e) {
     // console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "nexmind_live_editor_to_pass") {
        this.get_data = JSON.parse(e.value);
        this.sendToWebsite();
      }
    },

    hearFromChild(e) {
      if (JSON.parse(e.data).nexmind_live) {
        localStorage.setItem("nexmind_live_editor_to_get", e.data);
      }
    },
  },

  created() {},

  mounted() {
    window.addEventListener("message", this.hearFromChild);

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);
  },
};
</script>


<style scoped>
.template_inside ::v-deep .title_id {
  color: red;
}
</style>