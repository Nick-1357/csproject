<template>
  <aside class="sidebar-right d-flex">
    <div class="menu-bar">
      <!-- @click="toggleMenu" -->
      <!-- *Info -->
      <button @click="toggleMenu('info')">
        <span id="hoverBtnInfo" class="material-icons-outlined">info</span>
        <b-popover :target="'hoverBtnInfo'" triggers="hover" placement="left" custom-class="sidebar-right__popover info"><template>Info</template></b-popover>
      </button>
      <!-- *Favourites -->
      <!-- <button @click="toggleMenu('favourites')">
        <span id="hoverBtnFavourites" class="material-icons-outlined">star_border</span>
        <b-popover :target="'hoverBtnFavourites'" triggers="hover" placement="left" custom-class="sidebar-right__popover"><template>Favourites</template></b-popover>
      </button> -->
      <!-- *Widgets -->
      <button @click="toggleMenu('widgets')">
        <span id="hoverBtnDashboard" class="material-icons-outlined">widgets</span>
        <b-popover :target="'hoverBtnDashboard'" triggers="hover" placement="left" custom-class="sidebar-right__popover"><template>Dashboard Widgets</template></b-popover>
      </button>
      <!-- *Activity -->
      <button @click="toggleMenu('activity')">
        <span id="hoverBtnActivity" class="material-icons-outlined">history</span>
        <b-popover :target="'hoverBtnActivity'" triggers="hover" placement="left" custom-class="sidebar-right__popover"><template>Activity Log</template></b-popover>
      </button>
      <!-- *Keyword Pool -->
      <button @click="toggleMenu('keywordpool')">
        <span id="hoverBtnKeyword" class="material-icons-outlined">comment_bank</span>
        <b-popover :target="'hoverBtnKeyword'" triggers="hover" placement="left" custom-class="sidebar-right__popover"><template>Keyword Pool</template></b-popover>
      </button>
    </div>

    <!-- <span  v-b-tooltip.hover.left="{ variant: 'primary', customClass: 'custom-tooltip' }" title="Info" class="material-icons-outlined">info</span> -->

    <div class="menu-wrapper" :class="rmenu_isExpanded && 'rmenu_is-expanded'">
      <div class="menu-content">
        <template v-if="component_to_toggle == 'info'">
          <Info />
        </template>
        <template v-else-if="component_to_toggle == 'favourites'">
          <MyFavourite />
        </template>
        <template v-else-if="component_to_toggle == 'widgets'">
          <Widgets />
        </template>
        <template v-else-if="component_to_toggle == 'activity'">
          <Activity />
        </template>
        <template v-else-if="component_to_toggle == 'keywordpool'">
          <KeywordPool />
        </template>
      </div>
    </div>
  </aside>
</template>
<script>
import Info from "@/components/SidebarRight-menus/Info.vue";
import MyFavourite from "@/components/SidebarRight-menus/MyFavourite.vue";
import KeywordPool from "@/components/SidebarRight-menus/KeywordPool.vue";
import Widgets from "@/components/SidebarRight-menus/Widgets.vue";
import Activity from "@/components/SidebarRight-menus/Activity.vue";

export default {
  name: "SidebarRight",
  components: {
    Info,
    MyFavourite,
    KeywordPool,
    Widgets,
    Activity,
  },
  data() {
    return {
      rmenu_isExpanded: false,
      component_already_open: "",
      component_to_toggle: "",
    };
  },
  methods: {
    toggleMenu(item) {
      this.component_to_toggle = item;

      if (this.component_already_open.length == 0) {
        this.component_already_open = item;
        this.rmenu_isExpanded = !this.rmenu_isExpanded;
      } else {
        if (this.component_already_open == this.component_to_toggle) {
          this.component_already_open = "";
          this.rmenu_isExpanded = !this.rmenu_isExpanded;
        } else {
          this.component_already_open = item;
        }
      }

      // this.rmenu_isExpanded = !this.rmenu_isExpanded
    },
  },
};
</script>
<style lang="css" scoped>
.text-darkgrey {
  color: #474747;
}

aside {
  position: sticky;
  z-index: 99;
  display: flex;
  flex-direction: column;
  /* width: calc(3rem + 32px); */
  min-height: 100%;
  background-color: var(--sidebar-bg-colour);
  width: 3.5rem;
}

.menu-wrapper {
  display: block;
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  transform: translateX(300px);
  transition: 0.3s ease;
  background-color: #ffffff;
  border-left: rgb(207, 207, 207) 1px solid;
  /* box-shadow: -2px 3px 13px 2px #81818160; */
  box-shadow: -2px 3px 20px 2px #c2c2c260;
}
.rmenu_is-expanded.menu-wrapper {
  position: fixed;
  width: 300px;
  min-height: 100%;
  overflow: hidden;
  background-color: var(--sidebar-bg-colour);
  /* padding: 0rem 1rem; */
  border-left: rgb(207, 207, 207) 1px solid;
  align-items: start;
  transform: translateX(-3.5rem);
  transition: 0.3s ease;
}

/* .menu-content {
  padding: 1rem 0rem;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100vh;
  width: 100%;
} */

/* .menu-content::-webkit-scrollbar {
  display: none;
} */

.menu-bar {
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 3.5rem;
  min-height: 100%;
  background-color: var(--sidebar-bg-colour);
  padding: 0.7rem 1rem;
  transition: 0.2s ease-out;
  border-left: rgb(207, 207, 207) 1px solid;
  align-items: center;
}

.menu-bar button {
  padding: 0.5rem 0.5rem 0.2rem;
  border-radius: 5px;
  margin-bottom: 0.2rem;
}

.menu-bar button .material-icons-outlined {
  font-size: 1.5rem;
  transition: 0.2s ease-out;
  color: #2c8ee1;
  user-select: none;
}

.menu-bar button:hover {
  background-color: #dce8f6;
  transition: 0.4s ease-out;
}

.custom-tooltip {
  margin-right: 0.7rem;
  color: #2c8ee1;
}
</style>
