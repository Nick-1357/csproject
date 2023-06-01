<template>
  <div>
    <div class="content-image">
            <div class="route__linkpath fw-normal">
      <p class="text-muted  fw-normal"  v-if="$route.params.project">
         <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
        <router-link to="/dashboard" class="route__link">Dashboard</router-link>/
        <router-link  :to="{
              name: 'projects',
              params: { id:$route.params.project },
            }" class="route__link">Project</router-link>
       
        / AI Content Generation
      </p>


        <p class="text-muted fw-normal"  v-else>
           <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
        <router-link to="/dashboard" class="route__link">Dashboard</router-link>
        / AI Content Generation
      </p>
            </div>
      <div class="d-flex align-items-center">
        <span :class="item.state" @click="selectCategory(item.name)" v-for="(item, index) in options" :key="'category' + index">
          {{ item.name }}
        </span>
        <span class="ms-auto">
          <router-link
            :to="{
              name: 'feature_pagination_table',
              params: { feature: 'content_image' },
            }"
          >
            <button class="btn btn-primary">View All</button>
          </router-link>
        </span>
      </div>

      <!-- ============================================================================= -->
      <!-- Category 1                                                                    -->
      <!-- ============================================================================= -->

      <section class="mt-5" v-if="showBlogWriting">
        <h5 class="sectionTitle">Blog Writing (4 credits)</h5>
        <div class="row">
          <div class="col-3" v-for="(n, index) in Cases_blogwriting" :key="'Cases_blogwriting' + index">
            <div class="cardIcon" @click="addContent(n.title)">
              <div class="cardIcon__iconwrapper">
                <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
              </div>
              <p class="cardIcon__title">{{ n.title | capitalize }}</p>
              <p class="cardIcon__desc">{{ n.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================================= -->
      <!-- Category 2                                                                    -->
      <!-- ============================================================================= -->

      <section class="mt-5" v-if="showFreestyle">
        <h5 class="sectionTitle">Freestyle (4 credits)</h5>
        <div class="row cardRow">
          <div class="col-3 cardCol" v-for="(n, index) in Cases_long" :key="'Cases_long' + index">
            <div class="cardIcon" @click="addContent(n.title)">
              <div class="cardIcon__iconwrapper">
                <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
              </div>
              <p class="cardIcon__title">{{ n.title | capitalize }}</p>
              <p class="cardIcon__desc">{{ n.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================================= -->
      <!-- Category 3                                                                    -->
      <!-- ============================================================================= -->

      <section class="mt-5" v-if="showAdvertisement">
        <h5 class="sectionTitle">Advertisement (1 credit)</h5>
        <div class="row">
          <div class="col-3" v-for="(n, index) in Cases_short_Adv" :key="'Cases_short_Adv' + index">
            <div class="cardIcon" @click="addContent(n.title)">
              <div class="cardIcon__iconwrapper">
                <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
              </div>
              <p class="cardIcon__title">{{ n.title | capitalize }}</p>
              <p class="cardIcon__desc">{{ n.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================================= -->
      <!-- Category 4                                                                    -->
      <!-- ============================================================================= -->

      <section class="mt-5" v-if="showPostCaption">
        <h5 class="sectionTitle">Post and captions idea (1 credit)</h5>
        <div class="row">
          <div class="col-3" v-for="(n, index) in Cases_short_Post" :key="'Cases_short_Post' + index">
            <div class="cardIcon" @click="addContent(n.title)">
              <div class="cardIcon__iconwrapper">
                <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
              </div>
              <p class="cardIcon__title">{{ n.title | capitalize }}</p>
              <p class="cardIcon__desc">{{ n.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================================================= -->
      <!-- Category 5                                                                    -->
      <!-- ============================================================================= -->

      <section class="mt-5" v-if="showECommerce">
        <h5 class="sectionTitle">E-commerce (1 credit)</h5>
        <div class="row">
          <div class="col-3" v-for="(n, index) in Cases_short_Prod" :key="'Cases_short_Prod' + index">
            <div class="cardIcon" @click="addContent(n.title)">
              <div class="cardIcon__iconwrapper">
                <img :src="require(`@/assets/icons/${n.icon}.svg`)" alt="" class="cardIcon__icon" />
              </div>
              <p class="cardIcon__title">{{ n.title | capitalize }}</p>
              <p class="cardIcon__desc">{{ n.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- <img :src="'@/assets/icons/icon_' + blog_writing.icon + '_blue.svg'" alt="blog_writing.icon" style="height: 40px;"> -->

      <!-- <section class="mt-5">
        <h5 class="sectionTitle">Blog Writing</h5>
        <div class="row">
          <div class="col-3" v-for="(item_case_category, index_case_category) in Cases_blogwriting" :key="index_case_category">
            <div class="cardIcon">
              <div class="cardIcon__iconwrapper">
                <img src={{ item_case_category.icon }} alt="icon" class="cardIcon__icon">
              </div>
              <p class="cardIcon__title">{{item_case_category.title | capitalize}}</p>
              <p class="cardIcon__desc">{{ item_case_category.desc }}</p>
            </div>
          </div>
        </div>
      </section> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "content_image_add",
  data() {
    return {
      n: 1,
      search_case: "",
      options: [
        { name: "All Category", state: "pill-tabs active" },
        { name: "Blog Writing", state: "pill-tabs " },
        { name: "Freestyle", state: "pill-tabs " },
        { name: "Advertisement", state: "pill-tabs" },
        { name: "Post and Captions Idea", state: "pill-tabs" },
        { name: "E-commerce", state: "pill-tabs" },
      ],
      component: "All Category",
      showBlogWriting: true,
      showFreestyle: true,
      showAdvertisement: true,
      showPostCaption: true,
      showECommerce: true,
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
          icon: "icon-lightbulb-blue",
        },
        {
          title: "blog section writing",
          desc: "Make it easier for you to create section writing to improve the readability, clarity, and SEO of your content. ",
          icon: "icon-blogsectionwriting-blue",
        },
        {
          title: "business idea pitching",
          desc: "Create a successful pitch to secure funding, build partnerships and momentum for your business. ",
          icon: "icon-businessideapitching-blue",
        },
        {
          title: "selling copywriting",
          desc: "The best-performing copywriting that converts visitors into customers. ",
          icon: "icon-copywriting-blue",
        },
        {
          title: "descriptive copywriting",
          desc: "Compelling description that effectively communicates the value of your product or service to potential customers. ",
          icon: "icon-copywriting-blue",
        },

        {
          title: "paragraphs",
          desc: "Entice your audience with well-structured paragraphs that are easy to read and effectively convey your message. ",
          icon: "icon-paragraph-blue",
        },

        {
          title: "keyword cluster",
          desc: "Get a keyword cluster related to your topic and generate paragraphs accordingly",
          icon: "icon-keywordcluster-blue",
        },
      ],

      Cases_short_Adv: [
        {
          title: "facebook ads",
          desc: "Make your Facebook ads stand out with compelling ad copy.  ",
          icon: "icon-facebook-blue",
        },
        {
          title: "linkedIn ads",
          desc: "Eye-catching LinkedIn ads that help you engage and persuade your readers to take action. ",
          icon: "icon-linkedin-blue",
        },
        {
          title: "google ad title",
          desc: "Create a strong ad title and entice potential customers to click on the ad. ",
          icon: "icon-google-blue",
        },
        {
          title: "google ad descriptions",
          desc: "An attractive and effective description that helps your ad stand out.",
          icon: "icon-google-blue",
        },
        {
          title: "google search ads",
          desc: "Maximize your ad's visibility and drive more targeted traffic to your website. ",
          icon: "icon-google-blue",
        },
      ],

      Cases_short_Post: [
        {
          title: "facebook captions",
          desc: "Make your Facebook posts stand out and draw in more engagement. ",
          icon: "icon-facebook-blue",
        },
        {
          title: "linkedIn posts",
          desc: "Create a LinkedIn post that inspires and informs, and watch as your trust and authority within your industry grows. ",
          icon: "icon-linkedin-blue",
        },
        {
          title: "youtube intros",
          desc: "Catchy intros that will grab the viewer's attention and establish your brand. ",
          icon: "icon-youtube-blue",
        },
        {
          title: "youtube descriptions",
          desc: "Rank your videos higher with influential descriptions.  ",
          icon: "icon-youtube-blue",
        },
        {
          title: "instagram captions",
          desc: "Create captivating Instagram captions that stop the scroll.",
          icon: "icon-instagram-outline",
        },
        {
          title: "tiktok captions",
          desc: "Create engaging and high-quality hook on your TikTok.",
          icon: "icon-tiktok-outline",
        },
        {
          title: "twitter posts",
          desc: "Use AI to produce current and pertinent tweets.",
          icon: "icon-twitter-outline",
        },
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
          icon: "icon-lightbulb-blue",
        },
      ],
    };
  },
  methods: {
    selectCategory(data) {
      this.options.forEach((element) => {
        if (element.name === data) {
          element.state = "pill-tabs active";
        } else {
          element.state = "pill-tabs";
        }
      });
      this.component = data;

      if (data == "All Category") {
        (this.showBlogWriting = true), (this.showFreestyle = true), (this.showAdvertisement = true), (this.showPostCaption = true), (this.showECommerce = true);
      } else if (data == "Blog Writing") {
        (this.showBlogWriting = true), (this.showFreestyle = false), (this.showAdvertisement = false), (this.showPostCaption = false), (this.showECommerce = false);
      } else if (data == "Freestyle") {
        (this.showBlogWriting = false), (this.showFreestyle = true), (this.showAdvertisement = false), (this.showPostCaption = false), (this.showECommerce = false);
      } else if (data == "Advertisement") {
        (this.showBlogWriting = false), (this.showFreestyle = false), (this.showAdvertisement = true), (this.showPostCaption = false), (this.showECommerce = false);
      } else if (data == "Post and Captions Idea") {
        (this.showBlogWriting = false), (this.showFreestyle = false), (this.showAdvertisement = false), (this.showPostCaption = true), (this.showECommerce = false);
      } else if (data == "E-commerce") {
        (this.showBlogWriting = false), (this.showFreestyle = false), (this.showAdvertisement = false), (this.showPostCaption = false), (this.showECommerce = true);
      }
    },
    addContent(title) {

      if(this.$route.params.project){
           this.$router.push({
        name: "content_image_add_fields",
        params: { category: title, step: "topic_details", project:this.$route.params.project },
      });

      }else{
           this.$router.push({
        name: "content_image_add_fields",
        params: { category: title, step: "topic_details" },
      });
      }
   
    },
  },
  created() {
     localStorage.removeItem("content_gen_value");
    if (this.$route.params.category) {
      this.selectCategory(this.$route.params.category);
    }
  },
};
</script>
<style lang="css" scoped>
.sectionTitle {
  font-weight: bold;
  margin-bottom: 0;
}
.content-image {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem;
}
.route__link {
  text-decoration: none;
  color: #6c757d;
}
.route__link:hover {
  text-decoration: none;
  color: #4f555b;
  text-decoration: underline;
  transition: all 0.5s ease-out;
}
.pill-tabs {
  font-size: 18px;
  min-width: 60px;
  margin-right: 1rem;
  padding: 0.2rem 1rem;
  text-align: center;
  color: var(--color-primary);
  background-color: var(--light);
  border: 1px solid var(--color-primary);
  border-radius: 20px;
  user-select: none;
  cursor: pointer;
}
.pill-tabs:hover {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--light);
  transition: all 0.3s ease-out;
}
.pill-tabs.active {
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: var(--light);
}
/* .cardRow{
  grid-auto-rows: 1fr !important;
  display: flex;
  background-color: gray;
}
.cardCol{
  background-color: green;
} */
.cardIcon {
  margin-top: 4rem;
  padding: 3rem 1rem 1rem;
  background-color: var(--white);
  border: 1px solid rgb(207, 207, 207);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  height: 70%;
  /* min-height: 70%; */
  /* max-height: 100%; */
}
.cardIcon__title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
/* .cardIcon__desc{
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
} */
.cardIcon__iconwrapper {
  position: absolute;
  padding: 1rem;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid rgb(207, 207, 207);
  box-shadow: rgba(0, 0, 0, 0.12) 1px 1px 10px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  transform: translate(5px, -85px);
  height: 74px;
  width: 74px;
}
.cardIcon__icon {
  height: 40px;
  object-fit: contain;
  margin: auto 0;
  aspect-ratio: 1/1;
}
.cardIcon:hover {
  background-color: var(--light);
  border: 1px solid var(--primary);
  transition: all 0.4s ease-out;
  cursor: pointer;
}
.cardIcon:hover .cardIcon__iconwrapper {
  border: 1px solid var(--primary);
  transition: all 0.4s ease-out;
}
</style>
