<template>
  <!--general layout-->
  <div class="d-flex">
    <div>
      <SidebarLeft />
    </div>
    <div class="app-content">
      <Header />
      <router-view :key="$route.path" class="view"></router-view>
    </div>
    <div>
      <SidebarRight />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import SidebarLeft from "@/components/SidebarLeft.vue";
import SidebarRight from "@/components/SidebarRight.vue";
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    SidebarLeft,
    Header,
    SidebarRight,
  },
  data() {
    return {};
  },
  created() {
    Auth.getMe().then(() => {});
  },
};
</script>

