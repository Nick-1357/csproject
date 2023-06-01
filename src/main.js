/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";

//import bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-vue/dist/bootstrap-vue.css";
// import { BootstrapVue, IconsPlugin, BVToastPlugin } from "bootstrap-vue";
import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue);
// Vue.use(BVToastPlugin);
// Vue.use(IconsPlugin);


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "bottom-left",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});



//import quill editor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

//import router
import router from "./router";
Vue.use(router);

//import axios
import axios from "./axios.js";
Vue.prototype.$http = axios;
const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

//import chart
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll)

Vue.config.productionTip = false;

import "./filters";
import jwt_decode from "jwt-decode";

import VueSecureHTML from 'vue-html-secure';
Vue.use(VueSecureHTML);

import getXPath from 'get-xpath';
Vue.use(getXPath)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(VueLoading, {
  color: '#086efc',
  backgroundColor: '#c9c7c7',
  opacity: 0.5,

})
import VueNestable from 'vue-nestable'
Vue.use(VueNestable)

import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTablePlugin);

import KProgress from "k-progress";
Vue.component("k-progress", KProgress);

import VueCountryCode from "vue-country-code";
Vue.use(VueCountryCode);

import VueTypedJs from 'vue-typed-js'
Vue.use(VueTypedJs)

import VueMq from 'vue-mq'
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    xs: 375,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1440,
    xxl: Infinity,


  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

import vmodal from 'vue-js-modal'
Vue.use(vmodal)


import CompositionApi from '@vue/composition-api'
Vue.use(CompositionApi)

import Storage from 'vue-ls';
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};
Vue.use(Storage, options);

// Add a 401 response interceptor
axios.interceptors.response.use(
  function (response) {
    if (response.data.logout == "true") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      router.push("/login");
    } else {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const token_broken = jwt_decode(token)
        if (Date.now() >= token_broken.exp * 1000) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          router.push({ path: "/login" });
        }
      } else {

        if (response.config.url == 'all-locations') {
        }
        else {

          var vars = [],
            hash;

          var query_string = window.location.search;


          var hashes = query_string.slice(1).split('&');
          for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
          }

          // //
          for (const [key] of Object.entries(vars)) {
            if (key == "token") {
              //
            } else if (key == "messages") {
              //

            } else {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userInfo");
              // localStorage.removeItem("me");
              router.push({ path: "/login" });
            }

          }


        }
      }

    }
    return response;
  },

  function (error) {
    if (401 === error.response.status) {

      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const token_broken = jwt_decode(token)
        if (Date.now() >= token_broken.exp * 1000) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          router.push({ path: "/login" });
        }
      }

      const vm = new Vue();
      vm.$toast.error(error.response.data.message)
      // vm.$bvToast.toast(error.response.data.message, {
      //   title: "Error",
      //   variant: "danger",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
      return Promise.reject(error.response);
    } else if ("Unauthenticated." === error.response.data.message) {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const token_broken = jwt_decode(token);
        if (Date.now() >= token_broken.exp * 1000) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          router.push({ path: "/login" });

        } else {
          //
          const vm = new Vue();
          vm.$toast.error(error.response.data.message)

          // vm.$bvToast.toast(error.response.data.message, {
          //   title: "Error",
          //   variant: "danger",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userInfo");
          router.push({ path: "/login" });

        }
      } else {
        const vm = new Vue();
        vm.$toast.error(error.response.data.message)


        
        // vm.$bvToast.toast(error.response.data.message, {
        //   title: "Error",
        //   variant: "danger",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        router.push({ path: "/login" });

      }
    }

    else if ("Validation error" === error.response.data.message) {
      const vm = new Vue();
      vm.$toast.error(error.response.data.message + ' : ' + error.response.data.data[0])
      // vm.$bvToast.toast(error.response.data.message + ' : ' + error.response.data.data[0], {
      //   title: "Error",
      //   variant: "danger",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    }


    else {
      const vm = new Vue();
      vm.$toast.error(error.response.data.message)
      // vm.$bvToast.toast(error.response.data.message, {
      //   title: "Error",
      //   variant: "danger",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
      return Promise.reject(error);
    }
  }
);

new Vue({
  router,

  render: (h) => h(App),
}).$mount("#app");