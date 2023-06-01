<template>
  <div>
    <div class="page-wrapper-inner">
      <div class="row">
        <div class="col-4 pe-2">
          
          <h5 class="mt-3">Subtopics</h5>
          <div class="nexcard mt-1 py-3 pl-0 pr-3 us-0">
            <div class="tabs__vertical">
              <div
                class="tab__vertical"
                :class="item.class"
                @click="selectCategory(item)"
                v-for="(item, index) in tab__options"
                :key="'category' + index"
              >
                <span>{{ item.cluster }} </span>
                <span class="text-muted">[{{ item.count }}]</span>
              </div>
            </div>
          </div>


          <h5 class="mt-3">Header 1</h5>
          <div class="nexcard mt-3 pl-0 pr-3  us-0">
            <div class="tabs__vertical">
              <div
                class="tab__vertical"
                :class="item.class"
                @click="selectCategory(item)"
                v-for="(item, index) in tab__options_h1"
                :key="'category' + index"
              >
                <span>{{ item.cluster }} </span>
                <span v-if="item.content_planner.content.length==0" class="text-muted">[0]</span>
                <span v-else class="text-muted">[1]</span>
              </div>
            </div>
          </div>

          <h5 class="mt-3">Question List</h5>
          <div class="nexcard mt-3 pl-0 pr-3  us-0">
            <div class="tabs__vertical">
              <div
                class="tab__vertical"
                :class="item.class"
                @click="selectCategory(item)"
                v-for="(item, index) in tab__options_faq"
                :key="'category' + index"
              >
                <span>{{ item.cluster }} </span>
                <span v-if="item.content_planner.content.length==0" class="text-muted">[0]</span>
                <span v-else class="text-muted">[1]</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8">
          <!-- SEO Global -->
          <div class="group__topic">
            <div
              class="group__subtopic"
              v-if="tab__active.type == 'keyword' && tab__active.count != 0"
            >
              <h5 class="subtopic__title">
                {{ tab__active.cluster | capitalize }}
              </h5>
              <div
                class="subtopic__card nexcard"
                v-show="n.content.length != 0"
                v-for="n in tab__active.content_planner"
                :key="n"
              >
                <h5 class="subtopic__name">{{ n.subtopic }}</h5>
                <p class="subtopic_desc">
                  {{ n.content }}
                </p>
              </div>
            </div>

            <div
              class="group__topic"
              v-else-if="
                tab__active.type == 'keyword' && tab__active.count == 0
              "
            >
              <h5 class="subtopic__title">
                {{ tab__active.cluster | capitalize }}
              </h5>
              <span class="text-muted">None Found</span>
            </div>

            <div
              class="group__subtopic"
              v-else-if="
                tab__active.type == 'faq' &&
                tab__active.content_planner.content.length != 0
              "
            >
              <h5 class="subtopic__title">
                {{ tab__active.cluster | capitalize }}
              </h5>
              <div
                class="subtopic__card nexcard"
                v-if="tab__active.content_planner.content.length != 0"
              >
                <p class="subtopic_desc">
                  {{ tab__active.content_planner.content }}
                </p>
              </div>
            </div>

            <div
              class="group__topic"
              v-else-if="
                tab__active.type == 'faq' &&
                tab__active.content_planner.content.length == 0
              "
            >
              <h5 class="subtopic__title">
                {{ tab__active.cluster | capitalize }}
              </h5>
              <span class="text-muted">None Found</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      n: 1,
      tab__options: [
        { name: "SEO Global", class: "tab__vertical active" },
        { name: "SEO Services", class: "tab__vertical " },
        { name: "SEO Companies", class: "tab__vertical " },
        { name: "Website Optimisation", class: "tab__vertical" },
        { name: "Digital Marketing", class: "tab__vertical" },
      ],
      tab__options_h1:[],
      tab__options_faq: [],
      tab__active: [],
      values: [],
      keyword_cluster: [],
      FAQ: [],
      planners: [],
      h1:[]
    };
  },
  methods: {
    selectCategory(data) {
      this.tab__options.forEach((element) => {
        if (element.cluster === data.cluster) {
          element.class = "tab__vertical active";
        } else {
          element.class = "tab__vertical";
        }
      });

      this.tab__options_faq.forEach((element) => {
        if (element.cluster === data.cluster) {
          element.class = "tab__vertical active";
        } else {
          element.class = "tab__vertical";
        }
      });

       this.tab__options_h1.forEach((element) => {
        if (element.cluster === data.cluster) {
          element.class = "tab__vertical active";
        } else {
          element.class = "tab__vertical";
        }
      });
      this.tab__active = data;

    
    },
  },

  created() {
    this.values = this.content.steps_data.step_1;
    this.planners = this.content.planners;

    const keyword_cluster_data = this.values.find(
      (element) => element.slug === "keyword_cluster"
    );
    var keyword_cluster = JSON.parse(keyword_cluster_data.data);
    // console.log("keyword_cluster", keyword_cluster);

    this.keyword_cluster = keyword_cluster;

    this.keyword_cluster.forEach((element) => {
      element.class = "tab__vertical ";
    });

    const question_list_data = this.values.find(
      (element) => element.slug === "question_list"
    );
    var question_list = JSON.parse(question_list_data.data);
    // console.log("question_list", question_list);

    this.FAQ = question_list;

    this.tab__options = [];

    this.tab__options_faq = [];

     this.tab__options_h1 = [];

    this.keyword_cluster.forEach((element) => {
      element.type = "keyword";
      element.class = "tab__vertical";
      this.tab__options.push(element);
    });

    var h1_data = this.values.find((element) => element.slug === "h1");

    this.h1 = JSON.parse(h1_data.data);

    this.h1.forEach((element) => {
      var arr = [];
      arr = { type: "faq", class: "tab__vertical", cluster: element };
      this.tab__options_h1.push(arr);
    });
        

    this.FAQ.generated_question_list.forEach((element) => {
      var arr = [];
      arr = { type: "faq", class: "tab__vertical", cluster: element };
      this.tab__options_faq.push(arr);
    });

    this.FAQ.google_question_list.forEach((element) => {
      var arr = [];
      arr = { type: "faq", class: "tab__vertical", cluster: element };
      this.tab__options_faq.push(arr);
    });

    this.tab__options.forEach((element, index) => {
      var arr = [];
      element.subtopics.forEach((element_subtopic, index_subtopic) => {
        arr.push({ subtopic: element_subtopic, content: "" });

        this.tab__options[index].content_planner = arr;
      });
      console.log(this.tab__options[index]);
    });

    this.tab__options_h1.forEach((element, index) => {
      var arr = [];
      arr = { subtopic: element.cluster, content: "" };

      this.tab__options_h1[index].content_planner = arr;
    });


    this.tab__options_faq.forEach((element, index) => {
      var arr = [];
      arr = { subtopic: element.cluster, content: "" };

      this.tab__options_faq[index].content_planner = arr;
    });

    if (this.planners.length != 0) {
      this.planners.forEach((element) => {
        this.tab__options.forEach((element_cluster) => {
          element_cluster.content_planner.forEach((content_planner) => {
            if (content_planner.subtopic == element.subtopic) {
              content_planner.content = element.paragraphs[0].paragraph;
            }
          });
        });
      });

      this.planners.forEach((element) => {
        this.tab__options_faq.forEach((content_planner) => {
          if (content_planner.content_planner.subtopic == element.subtopic) {
            content_planner.content_planner.content =
              element.paragraphs[0].paragraph;
          }
        });
      });

         this.planners.forEach((element) => {
        this.tab__options_h1.forEach((content_planner) => {
          if (content_planner.content_planner.subtopic == element.subtopic) {
            content_planner.content_planner.content =
              element.paragraphs[0].paragraph;
          }
        });
      });

      this.tab__options.forEach((element_keyword, index) => {
        var count = 0;
        element_keyword.subtopics.forEach((element_subtopic) => {
          this.planners.forEach((element) => {
            if (element_subtopic == element.subtopic) {
              count = count + 1;
            }
          });
          this.tab__options[index].count = count;
        });
      });
    }

    // console.log(this.tab__options);
    // console.log(this.tab__options_faq);

    this.tab__active = this.tab__options[0];
    this.tab__options[0].class = "tab__vertical active";
  },
};
</script>

<style lang="css">
.page-wrapper-inner {
  padding: 2rem 0rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1.5rem;
}

/* Tabs Vertical Section */
.tabs__vertical {
  display: flex;
  flex-direction: column;
}
.tab__vertical {
  padding: 0.5rem 0rem 0.5rem 1rem;
  font-weight: 600;
  font-size: 1rem;
  border-left: 4px solid transparent;
}
.tab__vertical:hover {
  background-color: #f5f5f7;
  cursor: pointer;
}
.tab__vertical.active {
  border-left: 4px solid var(--color-primary);
  background-color: #f5f5f7;
}

/* Topic Category Content Section */
h4 {
  color: var(--color-darkgreen);
}
.w-150px {
  width: 150px;
}
.group__topic {
  margin-bottom: 3rem;
}
.topic__title {
  margin-bottom: 1rem;
}
.group__subtopic {
  margin-bottom: 2rem;
}
.subtopic__title {
  margin-bottom: 1rem;
  color: var(--color-darkgreen);
}
.subtopic__card {
  margin-bottom: 1.2rem;
}
.subtopic__name {
  color: var(--color-darkgreen);
}
.subtopic_desc {
  color: var(--color-muted);
}
.subtopic__btns {
  display: flex;
  margin-top: 1.5rem;
}
</style>