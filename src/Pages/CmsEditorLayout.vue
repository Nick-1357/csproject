<template>
  <div>
    <Header />
    <div class="d-flex">
      <SidebarleftContentEditor />
      <router-view :key="$route.path" class="view"></router-view>
    </div>
  </div>
</template>
<!-- style="overflow-y: auto !important; overflow-x: hidden !important;" -->
<!-- style="overflow-y: scroll;" -->

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import SidebarleftContentEditor from "../components/SidebarleftCmsEditor.vue";
import Header from "@/components/Header.vue";
export default {
  name: "App_2",
  components: { SidebarleftContentEditor, Header },
  data() {
    return {};
  },

  destroyed() {
    localStorage.removeItem("cms_toggle");
  },
  created() {
    Auth.getMe().then(() => {});
  },
};
</script>