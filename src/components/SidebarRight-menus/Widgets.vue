<template>
  <div>
    <div class="menu-heading">
      <h5>Dashboard Widgets</h5>
      <!-- <button class="btn-close"></button> -->
    </div>
    <div class="menu-body">
      <!-- TODO: Widgets List -->
      <div class="menu-widget-collection">
        <div
          class="selectwidget__wrapper"
          v-show="permissions.includes(topic.permission) && topic.quota > 0"
          v-for="(topic, index) in seo_caegories"
          :key="'seo_caegories' + index"
        >
          <input :id="topic.title" type="checkbox" :value="topic.title" v-model="selected_categories" @change="handleSelected" style="display: none" />
          <label :for="topic.title" class="d-flex">
            <div class="selectwidget__checkbox">
              <img :src="require(`@/assets/icons/${topic.icon}.svg`)" />
              <h6>{{ topic.title | capitalize }}</h6>
              <span class="material-icons-outlined radio-uncheck">radio_button_unchecked</span>
              <span class="material-icons-outlined radio-check">check_circle</span>
            </div>
          </label>
        </div>

        <div
          v-show="permissions.includes('Nexwriter.index') && content_quota > 0"
          class="selectwidget__wrapper"
          v-for="(topic, index) in Cases_blogwriting"
          :key="'Cases_blogwriting' + index"
        >
          <input :id="topic.title" type="checkbox" :value="topic.title" v-model="selected_categories" @change="handleSelected" style="display: none" />
          <label :for="topic.title" class="d-flex">
            <div class="selectwidget__checkbox">
              <img :src="require(`@/assets/icons/${topic.icon}.svg`)" />
              <h6>{{ topic.title | capitalize }}</h6>
              <span class="material-icons-outlined radio-uncheck">radio_button_unchecked</span>
              <span class="material-icons-outlined radio-check">check_circle</span>
            </div>
          </label>
        </div>

        <div v-show="permissions.includes('Nexwriter.index') && content_quota > 0" class="selectwidget__wrapper" v-for="(topic, index) in Cases_long" :key="'Cases_long' + index">
          <input :id="topic.title" type="checkbox" :value="topic.title" v-model="selected_categories" @change="handleSelected" style="display: none" />
          <label :for="topic.title" class="d-flex">
            <div class="selectwidget__checkbox">
              <img :src="require(`@/assets/icons/${topic.icon}.svg`)" />
              <h6>{{ topic.title | capitalize }}</h6>
              <span class="material-icons-outlined radio-uncheck">radio_button_unchecked</span>
              <span class="material-icons-outlined radio-check">check_circle</span>
            </div>
          </label>
        </div>

        <div
          v-show="permissions.includes('Nexwriter.index') && content_quota > 0"
          class="selectwidget__wrapper"
          v-for="(topic, index) in Cases_short_Adv"
          :key="'Cases_short_Adv' + index"
        >
          <input :id="topic.title" type="checkbox" :value="topic.title" v-model="selected_categories" @change="handleSelected" style="display: none" />
          <label :for="topic.title" class="d-flex">
            <div class="selectwidget__checkbox">
              <img :src="require(`@/assets/icons/${topic.icon}.svg`)" />
              <h6>{{ topic.title | capitalize }}</h6>
              <span class="material-icons-outlined radio-uncheck">radio_button_unchecked</span>
              <span class="material-icons-outlined radio-check">check_circle</span>
            </div>
          </label>
        </div>

        <!-- <div
          v-for="(topic, index) in Cases_short_Adv"
          :key="'Cases_short_Adv' + index"
          class="selectwidget__checkbox menu-widget p-2 my-3 pb-1 d-flex align-items-center rounded"
          style="
            border: 2px solid rgb(207, 207, 207);
            cursor: pointer;
            user-select: none;
          "
        >
          <input
            :id="topic.title"
            type="checkbox"
            :value="topic.title"
            v-model="selected_categories"
            @change="handleSelected"
          />
          <div class="pe-0">
            <img
              :src="require(`@/assets/icons/${topic.icon}.svg`)"
              alt=""
              class="cardIcon__icon_widget"
            />
          </div>
          <div class="ms-3 me-auto">
            <h6 class="fw-bold text-darkgrey mb-0">
              {{ topic.title | capitalize }}
            </h6>
          </div>
          <div class="pe-0">
            <span class="material-icons-outlined text-success"
              >check_circle</span
            >
          </div>
        </div> -->

        <div
          v-show="permissions.includes('Nexwriter.index') && content_quota > 0"
          class="selectwidget__wrapper"
          v-for="(topic, index) in Cases_short_Post"
          :key="'Cases_short_Post' + index"
        >
          <input :id="topic.title" type="checkbox" :value="topic.title" v-model="selected_categories" @change="handleSelected" style="display: none" />
          <label :for="topic.title" class="d-flex">
            <div class="selectwidget__checkbox">
              <img :src="require(`@/assets/icons/${topic.icon}.svg`)" />
              <h6>{{ topic.title | capitalize }}</h6>
              <span class="material-icons-outlined radio-uncheck">radio_button_unchecked</span>
              <span class="material-icons-outlined radio-check">check_circle</span>
            </div>
          </label>
        </div>

        <!-- <div
          v-for="(topic, index) in Cases_short_Post"
          :key="'Cases_short_Post' + index"
          class="selectwidget__checkbox menu-widget p-2 my-3 pb-1 d-flex align-items-center rounded"
          style="
            border: 2px solid rgb(207, 207, 207);
            cursor: pointer;
            user-select: none;
          "
        >
          <input
            :id="topic.title"
            type="checkbox"
            :value="topic.title"
            v-model="selected_categories"
            @change="handleSelected"
          />
          <div class="pe-0">
            <img
              :src="require(`@/assets/icons/${topic.icon}.svg`)"
              alt=""
              class="cardIcon__icon_widget"
            />
          </div>
          <div class="ms-3 me-auto">
            <h6 class="fw-bold text-darkgrey mb-0">
              {{ topic.title | capitalize }}
            </h6>
          </div>
          <div class="pe-0">
            <span class="material-icons-outlined text-success"
              >check_circle</span
            >
          </div>
        </div> -->

        <div
          v-show="permissions.includes('Nexwriter.index') && content_quota > 0"
          class="selectwidget__wrapper"
          v-for="(topic, index) in Cases_short_Prod"
          :key="'Cases_short_Prod' + index"
        >
          <input :id="topic.title" type="checkbox" :value="topic.title" v-model="selected_categories" @change="handleSelected" style="display: none" />
          <label :for="topic.title" class="d-flex">
            <div class="selectwidget__checkbox">
              <img :src="require(`@/assets/icons/${topic.icon}.svg`)" />
              <h6>{{ topic.title | capitalize }}</h6>
              <span class="material-icons-outlined radio-uncheck">radio_button_unchecked</span>
              <span class="material-icons-outlined radio-check">check_circle</span>
            </div>
          </label>
        </div>

        <!-- <div
          v-for="(topic, index) in Cases_short_Prod"
          :key="'Cases_short_Prod' + index"
          class="selectwidget__checkbox menu-widget p-2 my-3 pb-1 d-flex align-items-center rounded"
          style="
            border: 2px solid rgb(207, 207, 207);
            cursor: pointer;
            user-select: none;
          "
        >
          <input
            :id="topic.title"
            type="checkbox"
            :value="topic.title"
            v-model="selected_categories"
            @change="handleSelected"
          />
          <div class="pe-0">
            <img
              :src="require(`@/assets/icons/${topic.icon}.svg`)"
              alt=""
              class="cardIcon__icon_widget"
            />
          </div>
          <div class="ms-3 me-auto">
            <h6 class="fw-bold text-darkgrey mb-0">
              {{ topic.title | capitalize }}
            </h6>
          </div>
          <div class="pe-0">
            <span class="material-icons-outlined text-success"
              >check_circle</span
            >
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Widgets",
  data() {
    return {
      n: 1,
      selected_categories: [],
      permissions: localStorage.permissions,
      content_quota: JSON.parse(localStorage.userInfo).nexwriter_quota,
      showAiSeo:
        JSON.parse(localStorage.userInfo).free_keyword_query_quota +
        JSON.parse(localStorage.userInfo).used_keyword_query_quota +
        JSON.parse(localStorage.userInfo).keywords_qouta +
        JSON.parse(localStorage.userInfo).free_nex_automate_quota +
        JSON.parse(localStorage.userInfo).used_nex_automate_quota +
        JSON.parse(localStorage.userInfo).used_indexability_quota +
        JSON.parse(localStorage.userInfo).free_indexability_quota,
      seo_caegories: [
        {
          title: "Keyword Discovery",
          icon: "icon-keyword-discovery",
          permission: "keyword_query.index",
          quota: JSON.parse(localStorage.userInfo).free_keyword_query_quota + JSON.parse(localStorage.userInfo).used_keyword_query_quota,
        },
        {
          title: "Keyword Tracker",
          icon: "icon-keyword-tracker",
          permission: "nexrank-clients.keywords.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
        {
          title: "AI SEO Automation",
          icon: "icon-ai-seo-automation",
          permission: "Seo-Automation.index",
          quota: JSON.parse(localStorage.userInfo).free_nex_automate_quota + JSON.parse(localStorage.userInfo).used_nex_automate_quota,
        },
        {
          title: "CMS Editor",
          icon: "icon-cms-editor",
          permission: "nexrank-client.index",
          quota: JSON.parse(localStorage.userInfo).keywords_qouta,
        },
        {
          title: "Enterprise SEO",
          icon: "icon-seo-split-testing",
          permission: "indexability.index",
          quota: JSON.parse(localStorage.userInfo).used_indexability_quota + JSON.parse(localStorage.userInfo).free_indexability_quota,
        },
      ],
      Cases_blogwriting: [
        {
          title: "blog writing",
          desc: "Generate unique, SEO-optimized, long-form (up to 1,000 words) blog articles in just a few simple steps.",
          icon: "icon-blogwriting-blue",
        },
      ],
      Cases_long: [
        {
          title: "blog idea and outline",
          desc: "Well-structured blog ideas and outlines for you to write a clear and cohesive blog post. ",
          icon: "icon-idea",
        },
        {
          title: "blog section writing",
          desc: "Make it easier for you to create section writing to improve the readability, clarity, and SEO of your content. ",
          icon: "icon-writing",
        },
        {
          title: "business idea pitching",
          desc: "Create a successful pitch to secure funding, build partnerships and momentum for your business. ",
          icon: "icon-business-idea-pitching",
        },
        {
          title: "selling copywriting",
          desc: "The best-performing copywriting that converts visitors into customers. ",
          icon: "icon-copywriting",
        },
      ],

      Cases_short_Adv: [
        {
          title: "facebook ads",
          desc: "Make your Facebook ads stand out with compelling ad copy.  ",
          icon: "icon-facebook-outline",
        },
        {
          title: "linkedIn ads",
          desc: "Eye-catching LinkedIn ads that help you engage and persuade your readers to take action. ",
          icon: "icon-linkedin-outline",
        },
        {
          title: "google ad title",
          desc: "Create a strong ad title and entice potential customers to click on the ad. ",
          icon: "icon-google-outline",
        },
        {
          title: "google ad descriptions",
          desc: "An attractive and effective description that helps your ad stand out.",
          icon: "icon-google-outline",
        },
        {
          title: "google search ads",
          desc: "Maximize your ad's visibility and drive more targeted traffic to your website. ",
          icon: "icon-google-outline",
        },
      ],

      Cases_short_Post: [
        {
          title: "facebook captions",
          desc: "Make your Facebook posts stand out and draw in more engagement. ",
          icon: "icon-facebook-outline",
        },
        {
          title: "linkedIn posts",
          desc: "Create a LinkedIn post that inspires and informs, and watch as your trust and authority within your industry grows. ",
          icon: "icon-linkedin-outline",
        },
        {
          title: "youtube intros",
          desc: "Catchy intros that will grab the viewer's attention and establish your brand. ",
          icon: "icon-youtube-outline",
        },
        {
          title: "youtube descriptions",
          desc: "Rank your videos higher with influential descriptions.  ",
          icon: "icon-youtube-outline",
        },
        // {
        //   title: "instagram captions",
        //   desc: "Create captivating Instagram captions that stop the scroll.  ",
        //   icon: "icon-instagram-outline",
        // },
        // {
        //   title: "tiktok captions",
        //   desc: "Create engaging and high-quality hook on your TikTok.  ",
        //   icon: "icon-tiktok-outline",
        // },
        // {
        //   title: "twitter posts",
        //   desc: "Use AI to produce current and pertinent tweets.  ",
        //   icon: "icon-twitter-outline",
        // },
      ],

      Cases_short_Prod: [
        {
          title: "product descriptions",
          desc: "Compelling product descriptions that will inform, persuade, and differentiate.  ",
          icon: "icon-features-blue",
        },
        {
          title: "video description",
          desc: "Compelling product descriptions that will inform, persuade, and differentiate.  ",
          icon: "icon-description-blue",
        },
        {
          title: "video idea",
          desc: "Compelling product descriptions that will inform, persuade, and differentiate.  ",
          icon: "icon-idea",
        },
      ],
    };
  },
  methods: {
    handleSelected() {
      console.log(this.selected_categories);
      localStorage.setItem("dashboardWidgets", JSON.stringify(this.selected_categories));
      //this.$emit("clicked", "keyword");
      // console.log(this.selected_categories, event.srcElement._value);
    },
  },

  created() {
    // ls.set('foo', 'boo_changes');
    this.selected_categories = JSON.parse(localStorage.dashboardWidgets);
  },
};
</script>
<style lang="css">
.selectwidget__checkbox {
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  user-select: none;
}
.selectwidget__checkbox:hover {
  background-color: #f5f5f7;
}
.menu-widget-collection {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0rem 1rem 0rem 0rem;
}
.selectwidget__checkbox img {
  height: 30px;
  object-fit: contain;
  margin: auto 0;
  aspect-ratio: 1/1;
  margin-left: 2px;
  margin-right: 12px;
}
.selectwidget__checkbox h6 {
  font-weight: 600;
  color: #474747;
  margin-bottom: 0;
}

/*  */
.selectwidget__wrapper label {
  width: 100%;
  margin: 15px 1px;
  display: block;
  text-align: left;
  color: #3c454c;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 200ms ease-in;
  overflow: hidden;
  border: 1px solid #bcbdbc;
  /* outline: 1px solid transparent; */
  border-radius: 8px;
  user-select: none;
}
.selectwidget__wrapper input:checked ~ label {
  border-color: #2c8ee1;
  /* outline: 1px solid #2C8EE1; */
  transition: all 300ms ease-out;
}
label .radio-uncheck {
  margin-left: auto;
  color: #bcbdbc;
  transition: all 300ms ease-out;
  opacity: 1;
}
label .radio-check {
  position: absolute;
  right: 8px;
  color: #2c8ee1;
  transition: all 300ms ease-out;
  opacity: 0;
}
.selectwidget__wrapper input:checked ~ label .radio-uncheck {
  color: #bcbdbc;
  transition: all 300ms ease-out;
  opacity: 0;
}
.selectwidget__wrapper input:checked ~ label .radio-check {
  color: #2c8ee1;
  transition: all 300ms ease-out;
  opacity: 1;
}
</style>
