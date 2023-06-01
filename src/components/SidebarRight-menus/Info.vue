<template>
  <div>
    <div class="menu-heading">
      <h5>Info</h5>
      <!-- <button class="btn-close"></button> -->
    </div>
    <div class="menu-body">
      <!-- Search Bar -->
      <div class="input-wrapper">
        <div class="search input-group">
          <span class="input-group-prepend">
            <div class="input-group-text bg-transparent">
              <span class="material-icons-outlined">search</span>
            </div>
          </span>
          <input @input="searchKeyword" v-model="search_keyword" type="search" id="form1" class="form-control border-left-0" placeholder="Search" />
        </div>
      </div>
      <div v-if="loading" class="d-flex justify-content-center mt-5 mb-3">
        <b-spinner variant="primary" label="Large Spinner"></b-spinner>
      </div>

      <div class="menu-info-collection pt-3">
        <!-- ============================================================================= -->
        <!-- Category 6 : AI Content Generation review - only in AI Content generation- Change according to router  -->
        <!-- ============================================================================= -->
        <!-- <div v-if="show_review">
          <div class="menu-info py-1">
            <h6 class="fw-bold text-darkgrey">Leave a review on G2 !</h6>

         
            <button
              class="btn btn-primary"
              style="width: 150px; margin: 0 auto 1rem"
              v-b-modal.modal-g2-review
            >
              Support Us
            </button>
          </div>
        </div> -->

        <!-- ============================================================================= -->
        <!-- Category 1 : Main features explanations - Change according to router  -->
        <!-- ============================================================================= -->
        <div v-if="!$route.fullPath.includes('dashboard')">
          <div
            class="menu-info py-1"
            v-for="(feature, idx_feature) in feature_explanations_filtered"
            :key="'feature' + idx_feature"
            v-show="$route.fullPath.includes(feature.route)"
          >
            <div class="menu-info-set">
              <h6 class="fw-bold text-darkgrey">
                {{ feature.title }}
              </h6>
              <p class="text-muted fs-small" v-html="feature.desc"></p>
            </div>
          </div>
        </div>

        <!-- ============================================================================= -->
        <!-- Category 2 : Quata Explanations - Change according to permissions and router  -->
        <!-- ============================================================================= -->
        <div>
          <div
            class="menu-info py-1"
            v-for="(quota, idx_quota) in quota_details_filtered"
            :key="'quota' + idx_quota"
            v-show="$route.fullPath.includes(quota.route) || $route.fullPath.includes('dashboard') || $route.fullPath.includes('cross_platform')"
          >
            <!-- show if user got quota-->
            <div class="menu-info-set" v-if="quota.total > 0 && permissions.includes(quota.permission)">
              <h6 class="fw-bold text-darkgrey">{{ quota.name }}</h6>
              <p class="fs-small text-primary">
                You have {{ quota.used }} credits left out of
                {{ quota.total }}
              </p>
            </div>
          </div>

          <div class="menu-info py-1" v-if="$route.fullPath.includes('dashboard') || $route.fullPath.includes('ai_seo_automation')">
            <!-- show if user got quota-->
            <div class="menu-info-set" v-if="total_genetic_quota > 0">
              <h6 class="fw-bold text-darkgrey">Advance AI SEO Automation Suggestion Credits</h6>
              <p class="fs-small text-primary">
                You have {{ used_genetic_quota }} credits left out of
                {{ total_genetic_quota }}
              </p>
            </div>
          </div>
        </div>

        <!-- ============================================================================= -->
        <!-- Category 3 :  Website editor script- only in relavent features Change according to router  -->
        <!-- ============================================================================= -->
        <div
          v-if="
            this.$route.fullPath.includes('ai_seo_automation') ||
            this.$route.fullPath.includes('meta_cms') ||
            this.$route.fullPath.includes('content_optimizer') ||
            this.$route.fullPath.includes('content_generator') ||
            this.$route.fullPath.includes('dashboard')
          "
        >
          <div class="menu-info py-1" v-if="show_script">
            <h6 class="fw-bold text-darkgrey">CMS Editor</h6>
            <small class="text-muted">Please copy the script and paste it into the header of your target website.</small>

            <!--#attention card -->
            <div class="card p-2 mt-2 mb-3">
              <p class="text-muted fs-small">
                {{ nexrank_script }}
              </p>

              <!--#attention button -->
              <copy-to-clipboard :text="nexrank_script" @copy="handleCopy">
                <button class="btn btn-primary-outlined w-100 d-flex">
                  <span class="d-flex align-items-center mx-auto">
                    <span class="material-icons-outlined me-2"> content_copy </span>
                    <span class="pe-3">Copy Script</span>
                  </span>
                </button>
              </copy-to-clipboard>
            </div>
          </div>
        </div>

        <!-- ============================================================================= -->
        <!-- Category 4 : Sub features explanations - only in relavent features- Change according to router  -->
        <!-- ============================================================================= -->
        <div v-if="!this.$route.fullPath.includes('dashboard')">
          <div
            class="menu-info py-1"
            v-for="(sub_feature_title, idx_sub_feature_title) in sub_feature_explanations_filtered"
            :key="'sub_feature' + idx_sub_feature_title"
            v-show="$route.fullPath.includes(sub_feature_title.route)"
          >
            <h6 class="fw-bold text-darkgrey">
              {{ sub_feature_title.name }}
            </h6>
            <p class="text-muted fs-small">{{ sub_feature_title.desc }}</p>
          </div>
        </div>

        <!-- ============================================================================= -->
        <!-- Category 5 : Wordpress token - only in relavent features- Change according to router  -->
        <!-- ============================================================================= -->
        <!-- v-if="item.tokens.length != 0" -->
        <div v-if="this.$route.fullPath.includes('review_create') && show_wordpress">
          <!-- v-if="has_wordpress_integration" -->
          <div class="menu-info py-1" v-if="has_wordpress_integration && token.length != 0">
            <h6 class="fw-bold text-darkgrey">Please ensure that you have integrated your wordpress account. Follow this link for instruction:</h6>
            <a href="https://www.nexmind.ai/wordpress-integration/" target="_blank">https://www.nexmind.ai/wordpress-integration/</a>

            <div class="card p-2 my-2">
              <p class="text-muted fs-small">Token ID :</p>
              <p class="text-muted fs-small">{{ token.tokens[0].token_id }}</p>

              <copy-to-clipboard :text="token.tokens[0].token_id" @copy="handleCopy">
                <button class="btn btn-primary" style="width: 150px">Copy Token ID</button>
              </copy-to-clipboard>

              <p class="text-muted fs-small">User ID :</p>
              <p class="text-muted fs-small">{{ token.tokens[0].user_id }}</p>
              <copy-to-clipboard :text="token.tokens[0].user_id" @copy="handleCopy">
                <button class="btn btn-primary" style="width: 150px">Copy User ID</button>
              </copy-to-clipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import KeywordTracker from "@/store/KeywordTracker.js";
import CopyToClipboard from "vue-copy-to-clipboard";
import AiContentGenerator from "@/store/AiContentGenerator.js";
export default {
  components: { CopyToClipboard },
  name: "Info",
  data() {
    return {
      company: [],
      token: [],
      loading: true,
      permissions: [],
      user_type: [],
      plan_detail: [],
      quota_details_to_show: [],
      quota_details_filtered: [],
      show_review: true,
      show_script: true,
      show_wordpress: true,
      other_search: [
        `Leave a review on G2 !`,
        `Please ensure that you have integrated your wordpress account.
              Follow this link for instruction:`,
        `Please copy the script and paste it into the header of your target
              website.`,
      ],
      quota_details: [],

      feature_explanations: [
        {
          title: "What is Keyword Discovery ?",
          route: "keyword_discovery",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/keyword+query.mp4",
          desc: "Keyword Discovery is a tool that allows users to identify keywords and their strengths.",
        },
        {
          title: "What is Keyword Tracker ?",
          route: "keyword_tracker",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/keyword+tracker.mp4",
          desc: "Add website URLs, track ranking of target keywords and view trend of ranking movements.",
        },
        {
          title: "What is Content Generator ?",
          route: "content_generator",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/content+generator.mp4",
          desc: "This Content Generator tool utilizes a one-click deep learning proprietary topic and content generator technology",
        },
        {
          title: "What is Keyword Analyzer ?",
          route: "keyword_analyzer",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/Keyword+Analyzer.mp4",
          desc: " Analyze the Top 20 Google ranking results and get visualized data, analysis and content insights.",
        },
        {
          title: "What is Page Speed Insight ?",
          route: "page_speed_insight",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/page+speed+insight.mp4",
          desc: "Check your page loading speed and analyse website structure",
        },
        {
          title: "What is Content Optimizer ?",
          route: "content_optimizer",
          video: "",
          desc: `The most effective way to score your content for all important on-page SEO elements is to optimize your content for more organic traffic. This will ensure that your content is relevant and targeted to your audience, and that it is of the highest quality. \n Make sure your content includes all the relevant semantic terms and Importance  keywords related to your focus topic in order to increase its audience reach.`,
        },
        {
          title: "What is AI SEO Automation ?",
          route: "ai_seo_automation",
          video: "",
          desc: `One step SEO simplified process to help you edit your 
                  webpage with AI content suggestion and live editing experience.`,
        },
        {
          title: "What is Enterprise SEO ?",
          route: "enterprise_seo",
          video: "",
          desc: `To add the domain and check the domain's all links status.
                  Analyze all links to let users know various information including status code, page speed insight, page with structured data, etc.`,
        },
        {
          title: "What is  AI Content Generator ?",
          route: "One-click deep learning content generation technology with tones and cases. ",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/content+generator.mp4",
          desc: `This Content Generator tool utilizes a one-click deep learning proprietary topic and content generator technology
            <br>
            <br>
            AI Content Generator comes with two modes which are
            <b>Blog Writing</b> and <b>Freestyle</b>. <b>Blog Writing</b> is for
            generating short, medium, and long-sized blog articles complete with
            an introduction and conclusion.
            <br>
            <br>
             Meanwhile, <b>Freestyle</b> is for generating the content for
            various cases such as Google Ads, social media posts and captions,
            <b>Blog Writing</b> outlines, and many more. The
            <b>Freestyle</b> comes with tones including persuasive, humorous,
            and professional.`,
        },
        // {
        //   title: "What is AI Content Generator ?",
        //   route: "content_image",
        //   video:
        //     "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/Nexwriter.mp4",
        //   desc: "One-click deep learning content generation technology with tones and cases. ",
        // },
        {
          title: "What is CMS Editor ?",
          route: "meta_cms",
          video: "",
          desc: `Edit your webpage with a live editing experience.`,
        },
        {
          title: "What is GSC (Google Search Console) Analytics ?",
          route: "gsc",
          video: "",
          desc: `  The GSC tools and reports can help you measure your site's
                  traffic and performance, fix any issues, and make your site
                  look great in Google Search rankings. You can use this tool to
                  find out how often your site appears in Google Search, which
                  queries are bringing users to your site, how many clicks your
                  site gets, and more.
                  <br>
                  <br>
                  Get the credential file from your Google Console account to Connect your GSC Account`,
        },
        {
          title: "What is Cross Platform ?",
          route: "cross_platform",
          video: "https://nexmind-videos.s3.ap-southeast-1.amazonaws.com/v3/Nexwriter.mp4",
          desc: `  An integrated functions that allow you to run multiple seo tools
              with one time input insertions. Tools consists of modules from
              Keywords, Analytics and Content.`,
        },
      ],
      feature_explanations_filtered: [],
      nexrank_script: "",
      has_wordpress_integration: JSON.parse(localStorage.userInfo).has_wordpress_integration,
      sub_feature_explanations: [
        {
          name: "Google Ads",
          route: "keyword_discovery",
          desc: "Keywords that are collected from Google ads Keyword Planner",
        },
        {
          name: "Google Suggest",
          route: "keyword_discovery",
          desc: "Keywords that are collected from Google search box suggested keywords",
        },
        {
          name: "Autocomplete",
          route: "keyword_discovery",
          desc: "Keywords that are completing the seed keyword",
        },
        {
          name: "List of Questions",
          route: "keyword_discovery",
          desc: "Possible questions that are related to the seed keyword",
        },
        {
          name: "Related Words",
          route: "keyword_discovery",
          desc: "Related possible keywords from Google query",
        },

        {
          name: "Daily Keyword Data",
          route: "keyword_tracker",
          desc: "To view your added website daily ranking",
        },
        {
          name: "Additional Keyword Information",
          route: "keyword_tracker",
          desc: "To add or modify website and keyword, and view historical data of it.",
        },

        {
          name: "Pages In Structure",
          route: "enterprise_seo",
          desc: `Pages that are linked within the website's structure.`,
        },
        {
          name: "Pages Crawled",
          route: "enterprise_seo",
          desc: "Pages that are discovered and crawled",
        },
        {
          name: "Indexable Canonical Pages",
          route: "enterprise_seo",
          desc: "Pages fetched from the server without no-index in meta robots, that are canonical and have a valid status code.",
        },
        {
          name: "Non-Indexable Pages by Meta Robots",
          route: "enterprise_seo",
          desc: "Pages fetched from the server with noindex in meta robots.",
        },
        {
          name: "Non-Indexable Pages by Robots.txt",
          route: "enterprise_seo",
          desc: "Pages that are not crawlable because of robots.txt.",
        },
        {
          name: "Non-canonical Pages",
          route: "enterprise_seo",
          desc: "Pages with canonical URL that is different than the URL.",
        },
        {
          name: "Status Codes",
          route: "enterprise_seo",
          desc: "HTTP response status code.",
        },
        {
          name: "Load Time",
          route: "enterprise_seo",
          desc: "Distribution of pages by load time evaluation.",
        },
        {
          name: "Links Breakdown",
          route: "enterprise_seo",
          desc: "Distribution of internal links and external links.",
        },
        {
          name: "Page Analysis",
          route: "enterprise_seo",
          desc: "Summary of Core Web Vitals which reports field user experience.",
        },
        {
          name: "Word Count Evaluation",
          route: "enterprise_seo",
          desc: "Distribution of word counts grouped by page categories",
        },

        {
          name: "Structured Data Distribution",
          route: "enterprise_seo",
          desc: "Structured data markup grouped by JSON-LD and Microdata formats.",
        },

        {
          name: "Importance Tech Score",
          route: "keyword_analyzer",
          desc: "Words importance weightage analyzed using machine learning algorithms from real-time Google search result top ranking websites.",
        },
        {
          name: "SERP/Content Insight",
          route: "keyword_analyzer",
          desc: "An intelligence tool to analyze the titles, descriptions and content paragraphs of the top ranking websites, and get more information of recommended words to be included in your titles, description and content paragraphs",
        },
        {
          name: "Competitor Insight",
          route: "keyword_analyzer",
          desc: "This feature shows you the complete information about the top ranking websites, giving you insights of the elements so that you can modify your website pertaining to this.",
        },
        {
          name: "Content",
          route: "ai_seo_automation",
          desc: "Here is the Content Section, which shows the current webpage elements of your website.",
        },
        // {
        //   name: "Missing Elements",
        //   route: "ai_seo_automation",
        //   desc: "These are the suggested missing elements to add in your website",
        // },
        {
          name: "Specified",
          route: "ai_seo_automation",
          desc: "Optimized Suggestions based on original content",
        },
        {
          name: "Suggestions",
          route: "ai_seo_automation",
          desc: "Suggestion based on the keyword",
        },
        {
          name: "Advanced Suggestions",
          route: "ai_seo_automation",
          desc: "Advanced tool to generate most relevant content from keyword data scraped",
        },
        {
          name: "Competitor Analysis",
          route: "ai_seo_automation",
          desc: "Research and analysis on competitors on the target keyword",
        },
        {
          name: "Recommended Words",
          route: "ai_seo_automation",
          desc: "Here are Importance research keywords recommendation you can integrates in your website's elements for better google ranking.",
        },
        {
          name: "SEO Checklist",
          route: "ai_seo_automation",
          desc: "Comprehensive list of tasks and best practices that need to be followed to improve the website's visibility and ranking in search engine results pages (SERPs)",
        },

        {
          name: "Express mode [Blog writing]",
          route: "content_image",
          desc: "One step function to generate whole blog. Disable to unlock 2 step mode for viewing and modifying the subtopics before generating the whole blog",
        },
        {
          name: "Express mode [Others]",
          route: "content_image",
          desc: "Disable to Localise semantic keyword",
        },

        {
          name: "Website editor",
          route: "meta_cms",
          desc: "Make changes on your website in live action",
        },
        {
          name: "Manual editor",
          route: "meta_cms",
          desc: "Make changes on your website through NexMind platform",
        },
        {
          name: "Single testing",
          route: "meta_cms",
          desc: "Optimize your website in single variant without an alternate version",
        },
        {
          name: "A/B Split testing",
          route: "meta_cms",
          desc: "Compare two versions of your website after the optimization, to determine which one performs better. ",
        },

        // {
        //   name: "Competitor Insight",
        //   desc: "This feature shows you the complete information about the top ranking websites, giving you insights of the elements so that you can modify your website pertaining to this.",
        // },

        {
          name: "Light",
          route: "content_optimizer",
          desc: "",
        },
        {
          name: "Detailed",
          route: "content_optimizer",
          desc: "",
        },
        {
          name: "Content",
          route: "content_optimizer",
          desc: "Here is the Content Section, which shows the current webpage elements of your website.",
        },
        {
          name: "Recommended Words",
          route: "content_optimizer",
          desc: "",
        },

        {
          name: "Importance Terms Density",
          route: "content_optimizer",
          desc: "Scores of the amount of Importance research keywords importance occurs in your websites",
        },
        {
          name: "Words Count",
          route: "content_optimizer",
          desc: "Number of words in your website's elements",
        },
        {
          name: "Recommendations",
          route: "content_optimizer",
          desc: "Here are Importance research keywords recommendation you can integrates in your website's elements for better google ranking.",
        },
        {
          name: "Competitors Statistics",
          route: "content_optimizer",
          desc: "Scores of the amount of Importance research keywords occurs of your competitors' websites",
        },

        {
          name: "First Contentful Paint",
          route: "page_speed_insight",

          desc: `(second) First Contentful Paint (FCP) metric measures the time from when the page starts loading to when any part of the page's content is rendered on the screen. For this metric, "content" refers to text, images (including background images), <svg> elements, or non-white <canvas> elements.`,
        },
        {
          name: "Largest Contentful Paint",
          route: "page_speed_insight",
          desc: "(second) Largest Contentful Paint (LCP) metric reports the render time of the largest image or text block visible within the viewport, relative to when the page first started loading.",
        },
        {
          name: "First Input Delay",
          route: "page_speed_insight",
          desc: "(second) First Input Delay (FID) measures the time from when a user first interacts with a page (i.e. when they click a link, tap on a button, or use a custom, JavaScript-powered control) to the time when the browser is actually able to begin processing event handlers in response to that interaction.",
        },
        {
          name: "Cumulative Layout Shift Score",
          route: "page_speed_insight",
          desc: "Cumulative Layout Shift (CLS) is a measure of the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.",
        },

        {
          name: "Diagnose performance issues ",
          route: "page_speed_insight",
          desc: "To know how is the performance of the current website and detect what is the issue",
        },
        {
          name: "Screenshot",
          route: "page_speed_insight",
          desc: "The last screenshot captured of the pageload.",
        },
        {
          name: "Metrics",
          route: "page_speed_insight",
          desc: "Indicator for measuring website user experience performance",
        },
        {
          name: "Opportunities",
          route: "page_speed_insight",
          desc: "Rooms to improve for your website structure performance",
        },
        {
          name: "Diagnostics",
          route: "page_speed_insight",
          desc: "Detected issues of website user experience",
        },
        {
          name: "Passed",
          route: "page_speed_insight",
          desc: "Website user experience structures that are in good performance",
        },

        {
          name: "Total Clicks",
          route: "gsc",
          desc: `Number of times a user clicked through to your site. How this is counted depends on the search result type.`,
        },
        {
          name: "Total Impressions",
          route: "gsc",
          desc: "Number of times a user saw a link to your site in search results. This is calculated differently for images and other search result types, depending on whether or not the result was scrolled into view.",
        },
        {
          name: "Average CTR",
          route: "gsc",
          desc: "The percentage of impressions that resulted in a click.",
        },
        {
          name: "Average Position",
          route: "gsc",
          desc: "The average position of your site in search results, based on its highest position whenever it appeared in a search. Individual page position is available in the table below the chart. Position determination can be complicated by features such as carousels or Knowledge Panels.",
        },

        {
          name: "Performace",
          route: "gsc",
          desc: "The number of click the user search and see the website in the search according to the categories",
        },
        {
          name: "Sitemaps",
          route: "gsc",
          desc: "The website's heirarachy that should google crawl and index",
        },
        {
          name: "URL Inspection",
          route: "gsc",
          desc: "Inspect the status of website page in google",
        },
      ],
      sub_feature_explanations_filtered: [],
      search_keyword: "",
      used_genetic_quota: "",
      total_genetic_quota: "",
    };
  },
  methods: {
    forwardToReview() {
      window.open(JSON.parse(localStorage.userInfo).g2_review_form, "_blank");
      this.$bvModal.hide("modal-g2-review");
    },
    searchKeyword() {
      setTimeout(() => {
        this.startSearch();
      }, 500);
    },
    startSearch() {
      //once deleted restore
      this.search_keyword = this.search_keyword.toLowerCase();

      if (this.search_keyword == null || this.search_keyword.length == 0) {
        this.show_review = true;
        this.show_script = true;
        this.show_wordpress = true;

        this.quota_details_filtered = this.quota_details_to_show;
        this.feature_explanations_filtered = this.feature_explanations;
        this.sub_feature_explanations_filtered = this.sub_feature_explanations;
      } else {
        this.show_review = false;
        this.show_script = false;
        this.show_wordpress = false;
        (this.quota_details_filtered = []), (this.feature_explanations_filtered = []);
        this.sub_feature_explanations_filtered = [];

        if (`Leave a review on G2`.toLowerCase().includes(this.search_keyword)) {
          this.show_review = true;
        }
        if (
          `Please ensure that you have integrated your wordpress account.
              Follow this link for instruction:`
            .toLowerCase()
            .includes(this.search_keyword)
        ) {
          this.show_wordpress = true;
        }
        if (
          `Please copy the script and paste it into the header of your target
              website.`
            .toLowerCase()
            .includes(this.search_keyword)
        ) {
          this.show_script = true;
        }

        this.quota_details_to_show.forEach((element) => {
          if (element.name.toLowerCase().includes(this.search_keyword)) {
            this.quota_details_filtered.push(element);
          }
        });

        this.feature_explanations.forEach((element) => {
          if (element.title.toLowerCase().includes(this.search_keyword)) {
            this.feature_explanations_filtered.push(element);
          }
        });

        this.sub_feature_explanations.forEach((element) => {
          if (element.name.toLowerCase().includes(this.search_keyword)) {
            this.sub_feature_explanations_filtered.push(element);
          }
        });
      }
    },

    handleCopy() {
      this.$toast.success("Copied");
      // this.$bvToast.toast("Copied", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    },
    quota_plan_of_subscription() {
      //console.log(this.quota_details);

      //client
      if (this.plan_detail.length != 0) {
        //business plan

        if (this.planQuota.id == 200 || this.planQuota.id == 320) {
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Keyword Discovery Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Keyword Tracker Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Enterprise SEO Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "AI SEO Automation Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "AI Content Generator Credits"));
        }
        //seo plan
        else if (this.planQuota.id == 220 || this.planQuota.id == 310) {
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Keyword Discovery Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Keyword Tracker Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Enterprise SEO Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "AI SEO Automation Credits"));
        }
        //content generation plan
        else if (this.planQuota.id == 80 || this.planQuota.id == 300) {
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "AI Content Generator Credits"));
        }
        //app sumo
        else if (this.planQuota.id == 401 || this.planQuota.id == 402 || this.planQuota.id == 403 || this.planQuota.id == 404 || this.planQuota.id == 405) {
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Keyword Discovery Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Keyword Tracker Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "Enterprise SEO Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "AI SEO Automation Credits"));
          this.quota_details_filtered.push(this.quota_details.find((element) => element.name === "AI Content Generator Credits"));
        }

        this.quota_details_to_show = this.quota_details_filtered;
      }

      //employee
      else {
        this.quota_details_to_show = this.quota_details;
        this.quota_details_filtered = this.quota_details;
      }
    },
    Redirect() {
      window.open("https://www.g2.com/products/nexwriter/reviews?utm_source=Platform&utm_medium=Platform&utm_campaign=nexmind_platform#details", "_blank");
    },
    checkQuotaSub(used, full) {
      if (used >= full) {
        return "Credits Limit Reached! Top Up/Upgrade your plan to Research more Keywords";
      } else {
        return "";
      }
    },
  },
  created() {
    //Load until server response

    //get user type, quota and permission details from localstorage
    (this.feature_explanations_filtered = this.feature_explanations),
      (this.sub_feature_explanations_filtered = this.sub_feature_explanations),
      (this.permissions = localStorage.permissions);
    this.user_type = JSON.parse(localStorage.userInfo).type;
    this.nexrank_script = JSON.parse(localStorage.userInfo).nexrank_script;
    this.has_wordpress_integration = JSON.parse(localStorage.userInfo).has_wordpress_integration;

    //revoke me api plan
    Auth.getMe()
      .then((response) => {
        this.company = response.data.data;

        this.used_genetic_quota = response.data.data.used_genetic_algo_quota;
        this.total_genetic_quota = response.data.data.used_genetic_algo_quota + response.data.data.free_genetic_algo_quota;

        if (!response.data.data.current_plan) {
          this.plan_detail = [];
        } else {
          if (response.data.data.current_plan.length != 0) {
            this.plan_detail = response.data.data.current_plan[0];
          }
        }

        this.quota_details_to_show = [
          {
            name: "Projects Credits",
            used: this.company.used_domains_quota,
            total: this.company.domains_quota,
            permission: "nexrank-client.index",
          },
        ];

        this.quota_details = [
          {
            name: "Projects Credits",
            route: "projects",
            used: this.company.used_domains_quota,
            total: this.company.domains_quota,
            permission: "nexrank-client.index",
          },
          {
            name: "Keyword Discovery Credits",
            route: "keyword_discovery",
            used: this.company.used_keyword_query_quota,
            total: this.company.free_keyword_query_quota + this.company.used_keyword_query_quota,
            permission: "keyword_query.index",
          },
          {
            name: "Keyword Analyzer Credits",
            route: "keyword_analyzer",
            used: this.company.used_company_campaigns,
            total: this.company.company_campaigns,
            permission: "clientsCampaigns.index",
          },
          {
            name: "Keyword Tracker Credits",
            route: "keyword_tracker",
            used: this.company.used_keywords_qouta,
            total: this.company.keywords_qouta,
            permission: "nexrank-clients.keywords.index",
          },
          {
            name: "Content Optimization Credits",
            route: "content_optimizer",
            used: this.company.used_website_scanner_quota,
            total: this.company.free_website_scanner_quota + this.company.used_website_scanner_quota,
            permission: "websiteScanner.index",
          },
          {
            name: "Content Generator Credits",
            route: "content_generator",
            used: this.company.used_content_generation_quota,
            total: this.company.content_generation_quota,
            permission: "Content-Generation-Campaigns.index",
          },
          {
            name: "AI Content Generator Credits",
            route: "content_image",
            used: this.company.used_nexwriter_quota,
            total: this.company.nexwriter_quota,
            permission: "Nexwriter.index",
          },
          {
            name: "AI Image Generator Credits",
            route: "image_generator",
            used: this.company.used_nexart_quota,
            total: this.company.free_nexart_quota + this.company.used_nexart_quota,
            permission: "nexart.index",
          },
          {
            name: "AI SEO Automation Credits",
            route: "ai_seo_automation",
            used: this.company.used_nex_automate_quota,
            total: this.company.free_nex_automate_quota + this.company.used_nex_automate_quota,
            permission: "Seo-Automation.index",
          },
          {
            name: "Enterprise SEO Credits",
            route: "enterprise_seo",
            used: this.company.used_indexability_quota,
            total: this.company.free_indexability_quota + this.company.used_indexability_quota,
            permission: "indexability.index",
          },
          {
            name: "Page Speed Insight Credits",
            route: "page_speed_insight",
            used: this.company.used_page_speed_quota,
            total: this.company.free_page_speed_quota + this.company.used_page_speed_quota,
            permission: "PageSpeed.index",
          },
        ];

        //displaying quota accoring to plan of subscription
        this.quota_plan_of_subscription();

        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });

    if (this.$route.fullPath.includes("review_create")) {
      AiContentGenerator.fetchContentCampaign({
        id: this.$route.params.id,
      }).then((response) => {
        KeywordTracker.fetchClient(response.data.data.client_id)
          .then((response) => {
            this.token = response.data.data;
            loader.hide();
          })

          .catch((error) => {
            loader.hide();
            console.log(error);
          });
      });
    }

    //  KeywordTracker
    // .fetchClient(this.content.client_id)
    // .then((response) => {
    //   this.item = response.data.data;
    // })

    // .catch((error) => {
    //   loader.hide();
    //   console.log(error);
    // });
  },
};
</script>
<style lang="css">
.input-wrapper {
  padding-right: 1rem;
  padding-bottom: 1rem;
}
.menu-content .menu-heading {
  padding: 1.3rem 1rem 1rem;
  border-bottom: rgb(207, 207, 207) 1px solid;
  display: flex;
  align-items: center;
  height: 62.67px;
}
.menu-content .menu-heading h5 {
  margin: 0;
}

.menu-content .menu-heading .btn-close {
  margin-left: auto;
  color: #6c757d;
  padding: 8px 0 0 0;
}
.menu-content .menu-heading .btn-close:focus {
  border: none;
  box-shadow: none;
}
.menu-content .menu-body {
  padding: 1rem 0rem 1rem 1rem;
  height: 95vh;
  display: flex;
  flex-direction: column;
}
.menu-info-collection {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0rem 1rem 0rem 0rem;
}
/* .form-outline{
  display: contents;
} */

.fs-small {
  font-size: 14px;
}
.text-darkgrey {
  color: #474747;
}
</style>
