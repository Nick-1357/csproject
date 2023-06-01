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
import SidebarleftContentEditor from "../components/SidebarleftContentEditor.vue";
import Header from "@/components/Header.vue";
export default {
  name: "App_2",
  components: { SidebarleftContentEditor, Header },
  data() {
    return {};
  },

  destroyed() {
    localStorage.removeItem("editor_Content");
    localStorage.removeItem("content_toggle");
    localStorage.removeItem("export_content");
    localStorage.removeItem("pass_to_editor");
  },
  created() {
    Auth.getMe().then(() => {});
  },
};
</script>