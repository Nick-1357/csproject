
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [


        // =============================================================================
        //Layout without navigation bars
        // =============================================================================
        {
            path: "/",
            component: () =>
                import("@/Pages/FullLayoutPage.vue"),
            children: [{
                path: "/",
                redirect: "/login",
            },

            // =============================================================================
            //Authentication pages
            // =============================================================================
            {
                path: "/signup",
                name: "SignUp",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
                props: true,
            },
            {
                path: "/login",
                name: "SignIn",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
                props: true,
            },
            {
                path: "/signin",
                name: "SignIn",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
                props: true,
            },
            {
                path: "/enter_email",
                name: "enter_email",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
                props: true,
            },
            {
                path: "/Forgot-Password",
                name: "ResetPassword",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
                props: true,
            },
            {
                path: "/subscribe",
                name: "Subscribe",
                component: () =>
                    import("@/Pages/AuthenticationPages/subscribe.vue"),
            },
            {
                path: "/Creating-Account",
                name: "Create Account",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
            },
            {
                path: "/result",
                name: "Thank_you",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
            },
            {
                path: "/code/configuration",
                name: "codeConfiguration",
                component: () =>
                    import("@/Pages/AuthenticationPages/Background.vue"),
            },

            {
                path: "/agent_client/daily_keyword",
                name: "agent_client",
                component: () =>
                    import("@/Pages/AgentClient.vue"),
            },

            ]
        },

        // =============================================================================
        //Layout with Navigations Bars
        // =============================================================================
        {

            path: "",
            component: () =>
                import("@/Pages/DashboardLayout.vue"),
            children: [{
                path: "/",
                redirect: '/dashboard',

            },

            // =============================================================================
            //dashboard
            // =============================================================================
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () =>
                    import("@/Pages/Dashboard.vue")
            },

            // =============================================================================
            //Tables
            // =============================================================================
            {
                path: "/table_template",
                name: "table_template",
                component: () =>
                    import("@/Pages/TableLayouts/TableTemplate.vue")
            },
            {
                path: "/:feature/table/view_all/:id?",
                name: "feature_pagination_table",
                component: () =>
                    import("@/Pages/TableLayouts/FeaturePaginationTable.vue.vue")
            },

            {
                path: "/:feature/project_table/view_all",
                name: "project_pagination_table",
                component: () =>
                    import("@/Pages/TableLayouts/ProjectTable.vue")
            },

            {
                path: "/search/:keyword",
                name: "search_table",
                component: () =>
                    import("@/Pages/TableLayouts/SearchTable.vue")
            },
            // =============================================================================
            //projects
            // =============================================================================
            {
                path: "/projects/campaign/:id",
                name: "projects",
                component: () =>
                    import("@/Pages/Projects/campaign.vue")
            },
            {
                path: "/projects/create",
                name: "create_project",
                component: () =>
                    import("@/Pages/Projects/createProjectStatic.vue")
            },


            // =============================================================================
            //tutorials PAGE
            // =============================================================================
            {
                path: "/tutorials",
                name: "tutorials",
                component: () =>
                    import("@/Pages/Tutorials.vue")
            },


            // =============================================================================
            //live editor --split/single/seo/no_Seo/ http://localhost:8080/live_editor/11/split/no_seo/567 http://localhost:8080/TextToWebsite/284/single/619/565 http://localhost:8080/live_editor/11/split/no_seo/559
            // =============================================================================
            // {
            //     path: "/TextToWebsite/:client_id/:variant/:seoAutomation/:id?",
            //     name: "textEditor",
            //     component: () =>
            //         import("@/Pages/Live_editor/live_editor.vue")
            // },


            // =============================================================================
            // Keyword Discovery
            // =============================================================================
            {
                path: "/keyword_discovery/:project?/campaign/:id/:location",
                name: "keyword_discovery",
                component: () =>
                    import("@/Pages/KeywordDiscovery/Campaign.vue")
            },
            {
                path: "/keyword_discovery/:project?/campaign/add-keyword_discovery",
                name: "Keyword Discovery_Add Keyword",
                component: () =>
                    import("@/Pages/KeywordDiscovery/addKeywordDiscovery.vue")
            },



            // =============================================================================
            // Keyword Analyser
            // =============================================================================
            {
                path: "/keyword_analyzer",
                name: "keyword_analyzer",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },
            // =============================================================================
            // Keyword Tracker
            // =============================================================================
            {
                path: "/keyword_tracker/:project?/campaign/:id",
                name: "keyword_tracker",
                component: () =>
                    import("@/Pages/KeywordTracker/campaign.vue")
            },
            // =============================================================================
            // Content Optimizer
            // =============================================================================
            {
                path: "/content_optimizer",
                name: "content optimizer",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },
            // =============================================================================
            // Content Generator
            // =============================================================================
            {
                path: "/content_generator",
                name: "content generator",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },

            // =============================================================================
            // Plan
            // =============================================================================
            {
                path: "/plan",
                name: "plan",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },

            // =============================================================================
            // Outline
            // =============================================================================
            {
                path: "/outline",
                name: "outline",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },
            // =============================================================================
            // Cross Platform
            // =============================================================================
            {
                path: "/cross_platform",
                name: "cross_platform",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },
            // =============================================================================
            // AI SEO Automation
            // =============================================================================
            {
                path: "/ai_seo_automation/:project?/add_keyword/:step",
                name: "AI SEO Automation_Add Keyword",
                component: () =>
                    import("@/Pages/AiSeoAutomation/InputSteps.vue")
            },
            {
                path: "/ai_seo_automation/campaign/general/:project?/:id/:location/:step?",
                name: "ai_seo_automation_campaign",
                component: () =>
                    import("@/Pages/AiSeoAutomation/Campaign.vue")
            },

            {
                path: "/ai_seo_automation/planner/recommended_topics/:project?/:id/:location/",
                name: "ai_seo_automation_campaign_recommended",
                component: () =>
                    import("@/Pages/AiSeoAutomation/RecommendedTopics.vue")
            },



            {
                path: "/ai_seo_automation/campaign/planner/:project?/:id/:location/",
                name: "ai_seo_automation_campaign_planner",
                component: () =>
                    import("@/Pages/AiSeoAutomation/ContentPlanner.vue")
            },


            {
                path: "/ai_seo_automation/planner/steps/:cluster/:step/:project?/:id/:location/",
                name: "ai_seo_automation_campaign_planner_steps",
                component: () =>
                    import("@/Pages/AiSeoAutomation/ContentPlannerSteps.vue")
            },


       
            // =============================================================================
            // AI Content Generator
            // =============================================================================
            {
                path: "/content_image/:project?/add_content/:category?",
                name: "content_image_add",
                component: () =>
                    import("@/Pages/Content_Image/ContentImage.vue")
            },
            {
                path: "/content_image/:project?/add_content/input_value/:category/:step/:id?",
                name: "content_image_add_fields",
                component: () =>
                    import("@/Pages/Content_Image/InputSteps.vue")
            },

            // {
            //     path: "/content_image/content_editor/:category/:id",
            //     name: "content editor",
            //     component: () =>
            //         import("@/Pages/Content_Image/ContentEditor.vue")
            // },
            // =============================================================================
            // Image Generator
            // =============================================================================
            {
                path: "/image_generator",
                name: "image_generator",
                component: () =>
                    import("@/Pages/DashboardContentTwo.vue")
            },

            {
                path: "/image_generator/add_image/:step/:id?",
                name: "Image Generator_Add Keyword",
                component: () =>
                    import("@/Pages/ImageGeneration/addImage.vue")
            },



            // =============================================================================
            // Settings
            // =============================================================================
            {
                path: "/settings/:feature",
                name: "settings",
                component: () =>
                    import("@/Pages/Settings/Settings.vue")
            },
            {
                path: "/settings/employees/employee/:id",
                name: "employee",
                component: () =>
                    import("@/Pages/Settings/Employee.vue")
            },
            {
                path: "/settings/saas_clients/add_saas_client",
                name: "add_saas_client",
                component: () =>
                    import("@/Pages/Settings/AddSaasClient.vue")
            },
            {
                path: "/settings/saas_clients/saas_client/:id",
                name: "edit_saas_client",
                component: () =>
                    import("@/Pages/Settings/EditSaasClient.vue")
            },
            {
                path: "/settings/roles/role/:id",
                name: "edit_role",
                component: () =>
                    import("@/Pages/Settings/EditRole.vue")
            },
            {
                path: "/settings/policies/policy/:id",
                name: "edit_policy",
                component: () =>
                    import("@/Pages/Settings/EditPolicy.vue")
            },
            // =============================================================================
            // Page Speed Insight
            // =============================================================================
            // {
            //     path: "/page_speed_insight/:id",
            //     name: "page_speed_insight",
            //     component: () =>
            //         import("@/Pages/PageSpeedAnalysis/PageSpeedInsight.vue")
            // },



            // =============================================================================
            // meta-cms
            // =============================================================================
            {
                path: "/meta_cms/:project?/campaign/:id",
                name: "meta_cms",
                component: () =>
                    import("@/Pages/meta_cms/campaign.vue")
            },
            // {
            //     path: "/meta_cms/campaign/add_manual/:id",
            //     name: "meta_cms_add",
            //     component: () =>
            //         import("@/Pages/meta_cms/campaign.vue")
            // },

            // {
            //     path: "/meta_cms/campaign/manual_editor/:id/:url_id",
            //     name: "meta_cms_editor",
            //     component: () =>
            //         import("@/Pages/meta_cms/ManualEditor.vue")
            // },
            // =============================================================================
            //Enterprise SEO
            // =============================================================================
            {
                path: "/enterprise_seo/campaign/:project?/:id",
                name: "enterprise_seo",
                component: () =>
                    import("@/Pages/EnterpriseSeo/Campaign.vue")
            },
            {
                path: "/enterprise_seo/campaign/all-tasks/:id",
                name: "enterprise_seo_allTasks",
                component: () =>
                    import("@/Pages/EnterpriseSeo/allTasks.vue")
            },
            // {
            //     path: "/enterprise_seo/campaign/error-overview",
            //     name: "enterprise_seo_errorOverview",
            //     component: () =>
            //         import("@/Pages/EnterpriseSeo/ErrorOverview.vue")
            // },
            {
                path: "/enterprise_seo/:project?/campaign/add-enterprise-seo",
                name: "Enterprise SEO_Add Keyword",
                component: () =>
                    import("@/Pages/EnterpriseSeo/addEnterpriseSeo.vue")
            },

            {
                path: "/enterprise_seo/campaign/enterprise_seo_page_analysis/:id/",
                name: "enterprise_seo_page_analysis",
                component: () =>
                    import("@/Pages/EnterpriseSeo/pageAnalysisList.vue"),

            },

            {
                path: "/enterprise_seo/campaign/page_overview/:id/:page",
                name: "CrawlInsightPage",
                component: () =>
                    import("@/Pages/EnterpriseSeo/PagesOverview.vue"),

            },

            {
                path: "/enterprise_seo/campaign/error_overview/:id/:page",
                name: "topErrors",
                component: () =>
                    import("@/Pages/EnterpriseSeo/ErrorOverview.vue"),

            },


            {
                path: "/enterprise_seo/campaign/word_overview/:id/:category/:series",
                name: "CrawlWordCount",
                component: () =>
                    import("@/Pages/EnterpriseSeo/wordcountOverview.vue"),

            },
            {
                path: "/enterprise_seo/campaign/structured_data_overview/:id/:page/:category",
                name: "CrawlStuructured",
                component: () =>
                    import("@/Pages/EnterpriseSeo/structuredDataOverview.vue"),

            },
            {
                path: "/enterprise_seo/campaign/automation/:id/:automation_id/:location",
                name: "AutomationCrawl",
                component: () =>
                    import("@/Pages/AiSeoAutomation/Campaign.vue"),

            },



            {
                path: "/enterprise_seo/page_speed_insight/:id/:link_id?",
                name: "enterprise_seo_page_insight",
                component: () =>
                    import("@/Pages/PageSpeedAnalysis/PageSpeedInsight.vue")

            },






            // =============================================================================
            //GSC Analytics
            // =============================================================================
            {
                path: "/gsc",
                name: "gsc",
                component: () =>
                    import("@/Pages/GSCAnalytics/GSCAnalyticsDashboard.vue")
            },
            // =============================================================================
            //Pricing
            // =============================================================================
            {
                path: "/pricing",
                name: "pricing",
                component: () =>
                    import("@/Pages/Plans/Pricing.vue")
            },

            // =============================================================================
            //Subscribe
            // =============================================================================
            {
                path: "/subscribe-new",
                name: "subscribe",
                component: () =>
                    import("@/Pages/New/Subscribe.vue")
            },

            ]
        },

        // =============================================================================
        //Layout for Content Editor
        // =============================================================================


        {

            path: "/content_image",
            component: () =>
                import("@/Pages/ContentEditorLayout.vue"),
            children: [
                {
                    path: "/content_image/content_editor/:category/:id/:client_id",
                    name: "content editor",
                    component: () =>
                        import("@/Pages/Content_Image/ContentEditor.vue")
                },]



        },


        // =============================================================================
        //Layout for CMS Editor
        // =============================================================================


        {

            path: "/meta_cms",
            component: () =>
                import("@/Pages/CmsEditorLayout.vue"),
            children: [
                {
                    path: "/meta_cms/campaign/manual_editor/:id/:url_id",
                    name: "meta_cms_editor",
                    component: () =>
                        import("@/Pages/meta_cms/ManualEditor.vue")
                },
                {
                    path: "/meta_cms/campaign/add_manual/:id/:url",
                    name: "meta_cms_add",
                    component: () =>
                        import("@/Pages/meta_cms/AddManualCampaign.vue")
                },
                {
                    path: "/meta_cms/campaign/edit_manual_new/:id/:url_id",
                    name: "meta_cms_editor_new",
                    component: () =>
                        import("@/Pages/meta_cms/ManualEditorNew.vue")
                },]


        },

        // =============================================================================
        //Layout for CMS Editor
        // =============================================================================


        {

            path: "/live_editor",
            component: () =>
                import("@/Pages/LiveEditorLayout.vue"),
            children: [
               
                {
                    path: "/live_editor/:client_id/:variant/:seoAutomation/:id?",
                    name: "textEditor",
                    component: () =>
                        import("@/Pages/Live_editor/live_editor.vue")
                },]


        },

        // =============================================================================
        //Layout for CMS Editor
        // =============================================================================


        {

            path: "/layouts",
            name: "layouts",
            component: () => import("@/Pages/Layouts/Layouts.vue")
            


        }



    ]
});

export default router;
