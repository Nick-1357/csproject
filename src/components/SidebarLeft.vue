<template lang="">
  <aside :class="isExpanded && 'is-expanded'" @mouseover="toggleMenu" @mouseout="toggleMenu">
    <b-modal id="modal-g2-review" centered hide-footer hide-header>
      <div class="card-body text-center">
        <img style="width: 10rem" src="@/assets/icons/g2.png" />
      </div>

      <div class="card-text mt-2 text-center">
        <h3 class="font-weight-bold">Tell Us What You Think</h3>
      </div>
      <div class="card-text mt-2 text-center">
        <p>
          We'd love for your review us on G2! To continue, your email address will be shared with G2 to verify review authencity. Before choosing to submit a review, you can review G2's
          <a href="https://legal.g2.com/privacy-policy" target="_blank">Privacy Policy</a>
          and
          <a href="https://legal.g2.com/terms-of-use" target="_blank">Terms of Use</a>.
        </p>
      </div>

      <div class="card-text mt-2 text-center">
        <p class="text-secondary">Approximate time of completion: less than 10 minutes</p>
      </div>

      <div class="card-text mt-2 text-center">
        <button @click="forwardToReview" class="btn-primary w-100 text-center py-2 px-5 rounded">
          <b>Review us on G2!</b>
        </button>
      </div>
    </b-modal>

    <!--  @mouseover="toggleMenu" @mouseout="toggleMenu" -->
    <div class="sidebar-logo">
      <img src="../assets/nexmind/nexmind-logo.png" alt="Nexmind" />
      <span class="sidebar-logo__text">
        <strong>Nex<span style="color: #333333">Mind</span></strong>
      </span>
    </div>
    <div class="sidebar-fade"></div>
    <div class="menu-wrapper">
      <!-- *Dashboard -->
      <div class="menu d-flex">
        <div class="mb-auto" style="height: 90% !important">
          <router-link class="button" to="/dashboard">
            <span class="material-icons-outlined">space_dashboard</span>
            <span class="text">Dashboard</span>
          </router-link>
      

      
        </div>

        <div class="btn-review__wrapper mt-2 d-flex" v-if="!$route.fullPath.includes('settings')" style="position: absolute; bottom: 0; margin-bottom: 1rem">
          <button v-b-modal.modal-g2-review class="btn btn-primary-outlined mx-4 btn-review" style="width: 200px">
            <img src="../assets/icons/g2.png" alt="G2" style="height: 25px; object-fit: contain" />
            <span class="ms-2">Leave a Review</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: "SidebarLeft",
  data() {
    return {
      isExpanded: false,
      permissions: localStorage.permissions,
      userInfo: JSON.parse(localStorage.userInfo),
      showSeo: false,
      showContent: false,
      showInternal: false,
      seo_permissions: [
        {
          permission: "Seo-Automation.index",
          quota: JSON.parse(localStorage.userInfo).free_nex_automate_quota + JSON.parse(localStorage.userInfo).used_nex_automate_quota,
        },
        {
          permission: "keyword_query.index",
          quota: JSON.parse(localStorage.userInfo).free_keyword_query_quota + JSON.parse(localStorage.userInfo).used_keyword_query_quota,
        },
        {
          permission: "nexrank-clients.keywords.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
        {
          permission: "indexability.index",
          quota: JSON.parse(localStorage.userInfo).used_indexability_quota + JSON.parse(localStorage.userInfo).free_indexability_quota,
        },
        {
          permission: "Clients.Recommendation-Campaign.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
      ],
      content_permissions: [
        {
          permission: "Nexwriter.index",
          quota: JSON.parse(localStorage.userInfo).nexwriter_quota,
        },
      ],
      internal_permissions: [
        {
          permission: "websiteScanner.index",
          quota: JSON.parse(localStorage.userInfo).free_website_scanner_quota + JSON.parse(localStorage.userInfo).used_website_scanner_quota,
        },

        {
          permission: "Clients.Recommendation-Campaign.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
        {
          permission: "Outline.index",
          quota: JSON.parse(localStorage.userInfo).content_generation_quota,
        },
        {
          permission: "clientsCampaigns.index",
          quota: JSON.parse(localStorage.userInfo).company_campaigns,
        },
        {
          permission: "GSC.sync",
          quota: JSON.parse(localStorage.userInfo).company_campaigns,
        },
        {
          permission: "PageSpeed.index",
          quota: JSON.parse(localStorage.userInfo).free_page_speed_quota + JSON.parse(localStorage.userInfo).used_page_speed_quota,
        },
      ],
    };
  },
  methods: {
    forwardToReview() {
      window.open(JSON.parse(localStorage.userInfo).g2_review_form, "_blank");
      this.$bvModal.hide("modal-g2-review");
    },
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
      // $(".menu-wrapper").animate({ scrollTop: 0 }, "fast")
    },
  },
  created() {
    this.seo_permissions.forEach((element) => {
      if (this.permissions.includes(element.permission) && element.quota > 0) {
        this.showSeo = true;
      }
    });

    this.content_permissions.forEach((element) => {
      if (this.permissions.includes(element.permission) && element.quota > 0) {
        this.showContent = true;
      }
    });

    this.internal_permissions.forEach((element) => {
      if (this.permissions.includes(element.permission) && element.quota > 0) {
        this.showInternal = true;
      }
    });
  },
};
</script>
<style lang="css" scoped>
aside {
  /* sidebar always expand option */
  /*  */
  position: fixed;
  z-index: 99;
  display: flex;
  flex-direction: column;
  width: calc(3rem + 32px);
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--sidebar-bg-colour);
  transition: 0.2s ease-out;
  border-right: rgb(207, 207, 207) 1px solid;
  /* box-shadow: -2px 3px 13px 2px #81818160; */
  display: flex;
  flex-direction: column;
}

aside.is-expanded {
  /* box-shadow: -2px 3px 13px 2px #81818160; */
  box-shadow: -2px 3px 20px 2px #c2c2c260;
}

.sidebar-logo {
  margin: 0.5rem 0.5rem 0rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  user-select: none;
}
.sidebar-logo img {
  width: 2rem;
  object-fit: contain;
}
.sidebar-logo span {
  visibility: hidden;
}
.sidebar-fade {
  position: absolute !important;
  top: 55px;
  width: 100%;
  height: 46px;
  background-image: linear-gradient(to bottom, #ffffff, #ffffff, #ffffff00);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(44%, #ffffff), color-stop(73%, rgba(255, 255, 255, 0.51)), to(rgba(44, 48, 60, 0)));
}

.menu-wrapper {
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  width: 100%;
}
.menu-wrapper::-webkit-scrollbar {
  display: none;
}
.collapse.show {
  visibility: visible;
  display: block;
}

.is-expanded .sidebar-logo span {
  visibility: visible;
  transition: 0.2s ease-out;
}
.sidebar-logo__text {
  font-size: 30px;
  margin-left: 1rem;
  padding-top: 0.5rem;
  color: #2c8ee1;
  margin-bottom: 0.5rem;
}
/* @media only screen and (max-width: 768px) {
  aside {
    position: fixed;
    z-index: 99;
  }
} */

.is-expanded {
  width: var(--sidebar-width);
}
/* .menu-toggle-wrap {
  display: flex;
  margin-bottom: 1rem;
  position: relative;
  top: 0;
  transition: 0.2s ease-out;
} */

.menu-toggle {
  transition: 0.2s ease-out;
}

.material-icons-outlined {
  font-size: 1.8rem;
  transition: 0.2s ease-out;
  color: #707070;
  user-select: none;
}
.button-collapsible .arrow-icon {
  /* height: 24px; width: 24px; */
  margin-left: -3px;
}
.button-collapsible[aria-expanded="true"] .arrow-icon {
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  transform: rotate(-180deg);
  -webkit-transition: transform 0.5s ease;
  -o-transition: transform 0.5s ease;
  transition: transform 0.5s ease;
}

.button-collapsible[aria-expanded="false"] .arrow-icon {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: transform 0.5s ease;
  -o-transition: transform 0.5s ease;
  transition: transform 0.5s ease;
}

.dot-icon {
  display: block;
  font-size: 12px;
  color: #2c8ee1;
  text-align: center;
  margin-left: 0.5rem;
  line-height: 29px;
}
.is-expanded .dot-icon {
  display: none;
}
.arrow-icon {
  display: none;
}
.is-expanded .arrow-icon {
  display: block;
}

/* .is-expanded .menu-toggle-wrap {
  top: -3rem;
  margin-left: auto;
} */

.menu-wrapper {
  display: flex;
  flex-direction: column;
}
.menu {
  margin: 0 -1rem;
  display: flex;
  flex-direction: column;
}
.menu .button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: 0.2 ease-out;
  margin: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
}
.menu .button .text {
  font-weight: normal;
  visibility: hidden;
  transition: 0.2s ease-out;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
   color:#707070
}

.is-expanded .button .text {
  visibility: visible;
  transition: 0.2s ease-out;
  margin-left: 1rem;
}
.button:hover {
  background-color: #dce8f6;
  transition: 0.4s ease-out;
}
.button.active {
  background-color: #013d82;
  color: #fff !important;
  transition: 0.4s ease-out;
}

.menu .button.active .text,
.menu .button.active .material-icons-outlined {
  color: #fff !important;
}

/* .menu .button:active .material-icons-outlined{
  color: #2c8ee1 !important;
} */

/* .button:hover span{
  color: white !important;
} */
/* .menu .menu-collapsible{
  margin: 1rem 0;
} */
.menu .menu-collapsible .button-collapsible .text {
  /* margin: 1.5rem; */
  font-weight: bold;
  cursor: pointer;
  display: none;
  color:#707070
}

.is-expanded .menu .menu-collapsible .button-collapsible .text {
  /* margin: 1.5rem; */
  font-weight: bold;
  cursor: pointer;
  display: block;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  
}
.menu .menu-collapsible .button-collapsible {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: 0.2 ease-out;
  margin: 0 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  /* border-bottom: 1px solid #2C8EE1; */
}

.menu-collapse .button {
  margin: 0rem 0.5rem;
}

.menu-collapse .button .material-icons-outlined {
  color: #2c8ee1 !important;
  font-size: 1.5rem;
  margin-left: 0.1rem;
}

.menu-collapse .button .text {
  font-weight: normal;
  color: #2c8ee1;
  font-size: 14px;
  user-select: none;
}
.menu .btn-review__wrapper {
  visibility: hidden;
  opacity: 0;
  transition: 0.1s ease-out;
  translate: -50px 0px;
}
.is-expanded .menu .btn-review__wrapper {
  visibility: visible;
  opacity: 1;
  transition: 0.3s ease-out;
  translate: 0px 0px;
}
.btn-review {
  white-space: nowrap;
}
</style>
