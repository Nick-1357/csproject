<template>
  <div>
    <!-- Contents Tab - Contents -->
    <div id="bodyfix__content__content" class="bodyfix__content__content">
      <div class="row mb-3">
        <div class="col text-center">
          <b class="font-weight-bold text-primary"> Content Score</b
          ><b
            :class="[
              targetValues.content_score < targetValues.target_score
                ? 'text-danger'
                : 'text-success',
            ]"
          >
            {{ targetValues.content_score }}</b
          >
        </div>
        <div
          class="col text-center"
          v-b-tooltip.hover.top="{ variant: 'primary' }"
          title="Average of top 10 websites"
        >
          <b class="font-weight-bold text-primary"> Average Score </b
          ><b class="text-warning">
            {{ targetValues.average_score.toFixed(2) }}</b
          >
        </div>
        <div
          class="col text-center"
          v-b-tooltip.hover.top="{ variant: 'primary' }"
          title="Top 25% of top 10 websites"
        >
          <b class="font-weight-bold text-primary">Target Score </b>
          <b class="text-success">
            {{ targetValues.target_score.toFixed(2) }}</b
          >
        </div>
        <div class="col text-center">
          <b class="font-weight-bold text-primary">Word Count </b
          ><b
            :class="[
              targetValues.word_count < targetValues.target_count
                ? 'text-danger'
                : 'text-success',
            ]"
            >{{ targetValues.word_count }}</b
          >
        </div>
        <div
          class="col text-center"
          v-b-tooltip.hover.top="{ variant: 'primary' }"
          title="Average of top 10 websites"
        >
          <b class="font-weight-bold text-primary"> Average Count </b
          ><b class="text-warning">
            {{ targetValues.average_count.toFixed(0) }}</b
          >
        </div>
        <div
          class="col text-center"
          v-b-tooltip.hover.top="{ variant: 'primary' }"
          title="Top 25% of top 10 websites"
        >
          <b class="font-weight-bold text-primary">Target Count </b>
          <b class="text-success">
            {{ targetValues.target_count.toFixed(0) }}</b
          >
        </div>

        <div class="col">
          <small
            v-if="!showAllElements"
            @click="show_all_elements"
            class="show-all-button text-muted"
            style="text-decoration: underline; float: right"
          >
            Show All Elements
          </small>
          <small
            v-else
            @click="show_all_elements"
            class="show-all-button text-muted"
            style="text-decoration: underline; float: right"
          >
            Show Relevent Elements
          </small>
        </div>
      </div>
      <!-- <div class="d-flex flex-row-reverse py-0">
        <p
          v-if="!showAllElements"
          @click="show_all_elements"
          class="show-all-button text-primary"
        >
          Show All Elements
        </p>
        <p
          v-else
          @click="show_all_elements"
          class="show-all-button text-primary"
        >
          Show Relevent Elements
        </p>
      </div> -->

      <div class="row">
        <div v-if="showAllElements" class="col-8 content__dropdown__group p-4">
          <div
            v-for="(item, index) in content_article"
            :key="'content_article' + index"
          >
            <div>
              <div @click="chooseItem(index)" class="td-none">
                <div class="content__dropdown__title__left">
                  <span class="title text-muted">
                    {{ item.key | nexrank }}</span
                  >
                  <h1 v-if="item.key == 'h1' && choosenIndex != index">
                    {{ item.value }}
                  </h1>

                  <h1
                    v-else-if="item.key == 'h1' && choosenIndex == index"
                    class="text-primary"
                  >
                    {{ item.value }}
                  </h1>

                  <h2 v-else-if="item.key == 'h2' && choosenIndex != index">
                    {{ item.value }}
                  </h2>

                  <h2
                    v-else-if="item.key == 'h2' && choosenIndex == index"
                    class="text-primary"
                  >
                    {{ item.value }}
                  </h2>

                  <h3 v-else-if="item.key == 'h3' && choosenIndex != index">
                    {{ item.value }}
                  </h3>

                  <h3
                    v-else-if="item.key == 'h3' && choosenIndex == index"
                    class="text-primary"
                  >
                    {{ item.value }}
                  </h3>

                  <h4 v-else-if="item.key == 'h4'">{{ item.value }}</h4>
                  <h5 v-else-if="item.key == 'h5'">{{ item.value }}</h5>
                  <h6 v-else-if="item.key == 'h6'">{{ item.value }}</h6>

                  <p v-else-if="item.key == 'p' && choosenIndex != index">
                    {{ item.value }}
                  </p>

                  <p
                    v-else-if="item.key == 'p' && choosenIndex == index"
                    class="text-primary"
                  >
                    {{ item.value }}
                  </p>

                  <p v-else-if="item.key == 'title' && choosenIndex != index">
                    {{ item.value }}
                  </p>

                  <p
                    v-else-if="item.key == 'title' && choosenIndex == index"
                    class="text-primary"
                  >
                    {{ item.value }}
                  </p>

                  <p
                    v-else-if="
                      item.key == 'description' && choosenIndex != index
                    "
                  >
                    {{ item.value }}
                  </p>

                  <p
                    v-else-if="
                      item.key == 'description' && choosenIndex == index
                    "
                    class="text-primary"
                  >
                    {{ item.value }}
                  </p>

                  <p
                    style="text-decoration: underline"
                    v-else-if="item.key == 'url'"
                  >
                    {{ item.value }}
                  </p>

                  <span v-else-if="item.key != 'li'">{{ item.value }}</span>
                  <div v-if="item.key == 'li'">
                    <div
                      v-for="(item_li, index2) in item.value"
                      :key="(item_li, index2)"
                    >
                      {{ item_li }}
                    </div>
                  </div>
                </div>

                <!-- <button class="material-icons-outlined btn-edit-content">
                  edit_note
                </button> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="!showAllElements" class="col-8 content__dropdown__group p-4">
          <div
            v-for="(item, index) in content_article"
            :key="'content_article' + index"
            v-show="
              item.key == 'title' ||
              item.key == 'description' ||
              item.key == 'h1' ||
              item.key == 'h2' ||
              item.key == 'h3' ||
              item.key == 'p'
            "
          >
            <div>
              <div @click="chooseItem(index)" class="td-none">
                <div class="content__dropdown__title__left">
                  <span class="title text-muted">
                    {{ item.key | nexrank }}</span
                  >

             
                    <textarea  v-if="item.editor"
                      v-model="item.value"
                      class="form-control w-70"
                      id=""
                      rows="5"
                      column="10"
                      placeholder="Type in your custom content here"
                      style="border-color: #888;"
                    ></textarea>
                
                  <div class="element-content" v-else>
                    <h1 v-if="item.key == 'h1' && choosenIndex != index">
                      {{ item.value }}
                    </h1>

                    <h1
                      v-else-if="item.key == 'h1' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </h1>

                    <h2 v-else-if="item.key == 'h2' && choosenIndex != index">
                      {{ item.value }}
                    </h2>

                    <h2
                      v-else-if="item.key == 'h2' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </h2>

                    <h3 v-else-if="item.key == 'h3' && choosenIndex != index">
                      {{ item.value }}
                    </h3>

                    <h3
                      v-else-if="item.key == 'h3' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </h3>

                    <p v-else-if="item.key == 'p' && choosenIndex != index">
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="item.key == 'p' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </p>

                    <p v-else-if="item.key == 'title' && choosenIndex != index">
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="item.key == 'title' && choosenIndex == index"
                      class="text-primary"
                    >
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="
                        item.key == 'description' && choosenIndex != index
                      "
                    >
                      {{ item.value }}
                    </p>

                    <p
                      v-else-if="
                        item.key == 'description' && choosenIndex == index
                      "
                      class="text-primary"
                    >
                      {{ item.value }}
                    </p>
                  </div>

                  <button
                    @click="changeEditor(index)"
                    class="material-icons-outlined btn-edit-content"
                  >
                    edit
                  </button>

                  <button
                    @click="revert(index)"
                    class="material-icons-outlined btn-undo-content"
                  >
                    undo
                  </button>
                </div>

                <!-- <button class="material-icons-outlined btn-edit-content">
                  edit_note
                </button> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div>
            <div
              class="content__dropdown__group"
              v-for="(item, index) in content_article"
              :key="'content_article' + index"
              v-show="choosenIndex == index"
            >
              <h5>AI Content Score</h5>
              <div class="d-flex justify-content-center">
                <div class="radial-progress-bar__wrapper">
                  <radial-progress-bar
                    animateSpeed="400"
                    timingFunc="linear"
                    diameter="180"
                    :completed-steps="UserStatistics[1]"
                    strokeWidth="15"
                    innerStrokeWidth="15"
                    total-steps="100"
                    inner-stroke-color="#efefef"
                    :start-color="[
                      UserStatistics[1] < targetValues.target_score
                        ? '#e11300'
                        : '#5FB355',
                    ]"
                    :stop-color="[
                      UserStatistics[1] < targetValues.target_score
                        ? '#e11300'
                        : '#5FB355',
                    ]"
                  >
                    <div
                      :id="[
                        UserStatistics[1] < targetValues.target_score
                          ? 'number-red'
                          : 'number-green',
                      ]"
                    >
                      {{ UserStatistics[1] }}%
                    </div>
                    <div class="">
                      <div
                        style="font-size: 12px"
                        :class="[
                          UserStatistics[1] < targetValues.target_score
                            ? 'pill-badge red text-center'
                            : 'pill-badge green text-center',
                        ]"
                        v-b-tooltip.hover.top="{ variant: 'primary' }"
                        v-if="UserStatistics[1] < targetValues.target_score"
                      >
                        Needs <br />
                        Improvement
                      </div>
                      <div
                        :class="[
                          UserStatistics[1] < targetValues.target_score
                            ? 'pill-badge red text-center'
                            : 'pill-badge green text-center',
                        ]"
                        v-b-tooltip.hover.top="{ variant: 'primary' }"
                        v-else
                      >
                        Good
                      </div>
                      <!-- <div
                        :class="[
                          UserStatistics[1] <targetValues.target_score
                            ? 'pill-badge red text-center'
                            : 'pill-badge green text-center'

                        ]"
                        v-b-tooltip.hover.top="{ variant: 'primary' }"
                        v-else
                      >
                        Average
                      </div> -->
                    </div>
                  </radial-progress-bar>
                </div>
              </div>

              <div
                v-if="
                  choosenIndex == 0 ||
                  item.key == 'url' ||
                  item.key == 'h4' ||
                  item.key == 'h5' ||
                  item.key == 'h6' ||
                  item.key == 'li'
                "
                class="content__dropdown__content pt-3"
              >
                <p class="text-muted">
                  Only Title, Description, Header 1, Header 2, Header 3 and
                  Paragraph has suggestions
                </p>
              </div>

              <div v-else>
                <div class="content__dropdown__content pt-3">
                  <!-- AI Suggestions Section - Tabs-->

                  <div class="aisuggestion__tabs">
                    <button
                      class="aisuggestion__tab"
                      :class="tab.class"
                      v-for="(tab, index_tab) in item.Tabs_AiSuggestions"
                      :key="'tab' + index_tab"
                      @click="
                        changeTab_AiSuggestions(tab.name, index, index_tab)
                      "
                    >
                      <span class="aisuggestion__tab__title">{{
                        tab.name
                      }}</span>
                    </button>
                  </div>

                  <!-- Specified Tab -->
                  <!-- <div
                    id="content__aisuggestions__suggestions"
                    class="p-3"
                    v-if="item.chosenTab_AiSuggestions == 'Specified'"
                  >
                 

                    <p class="text-muted">
                      Optimized Suggestions based on original content
                    </p>

                    <div
                      class="form-check suggestion"
                      v-for="(
                        customized, index_customized
                      ) in item.customized_suggestion"
                      :key="'customized_suggestion' + index_customized"
                    >
                      <div class="row">
                        <div class="col-1">
                          <input
                            class="form-check-input"
                            type="radio"
                            :name="'aisuggestion_suggestions' + index"
                            :id="customized"
                            :value="customized"
                            v-model="item.value"
                            @change="calcScore"
                          />
                          <label class="form-check-label" :for="customized">
                          </label>
                        </div>
                        <div class="col">
                          <div class="d-flex align-items-center">
                        
                            <span class="desc">{{ customized }} </span>
                          </div>
                          <span
                            v-if="index_customized == 0"
                            v-b-tooltip.hover.top="{ variant: 'primary' }"
                            title="The AI ranked these options according to what it considers to be the best choice"
                            class="pill-badge blue text-center mx-2 px-4 py-1 d-flex w-40"
                            >Best Choice</span
                          >
                        </div>
                      </div>
                    </div>
                  </div> -->

                  <!-- Suggestions Tab -->

                  <!--for p elements-->

                  <div
                    id="content__aisuggestions__suggestions"
                    class="p-3"
                    v-if="
                      item.chosenTab_AiSuggestions == 'Suggestions' &&
                      item.key == 'p'
                    "
                  >
                    <div v-if="item.customized_suggestion.length != 0">
                      <small class="text-muted mb">
                        Optimized Suggestions based on original content
                      </small>

                      <div
                        class="form-check suggestion mt-2"
                        v-for="(
                          customized, index_customized
                        ) in item.customized_suggestion"
                        :key="'customized_suggestion' + index_customized"
                      >
                        <div class="row">
                          <div class="col-1">
                            <input
                              class="form-check-input"
                              type="radio"
                              :name="'aisuggestion_suggestions' + index"
                              :id="customized"
                              :value="customized"
                              v-model="item.value"
                              @change="calcScore"
                            />
                            <label class="form-check-label" :for="customized">
                            </label>
                          </div>
                          <div class="col">
                            <div class="d-flex align-items-center">
                              <!-- <span class="tag__score">+33</span
                      > -->
                              <span class="desc"
                                >{{ customized }}
                                <span
                                  v-if="index_customized == 0"
                                  v-b-tooltip.hover.top="{ variant: 'primary' }"
                                  title="The AI ranked these options according to what it considers to be the best choice"
                                  class="material-icons-outlined"
                                >
                                  grade
                                </span>
                              </span>
                            </div>
                            <!-- <span
                              v-if="index_customized == 0"
                              v-b-tooltip.hover.top="{ variant: 'primary' }"
                              title="The AI ranked these options according to what it considers to be the best choice"
                              class="pill-badge blue text-center mx-2 px-4 py-1 d-flex w-40"
                              >Best Choice</span
                            > -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <h6 class="mb-3 user-select-none">Options</h6> -->
                    <small class="text-muted"
                      >Suggestion based on the keyword</small
                    >
                    <div
                      class="form-check suggestion mt-3"
                      v-for="(normal, index_normal) in item.suggestions"
                      :key="'suggestions' + index_normal"
                    >
                      <div class="row">
                        <div class="col-1">
                          <input
                            class="form-check-input"
                            type="radio"
                            :name="'aisuggestion_suggestions' + index"
                            :id="normal.paragraph"
                            :value="normal.paragraph"
                            v-model="item.value"
                            @change="calcScore"
                          />
                          <label
                            class="form-check-label"
                            :for="normal.paragraph"
                          >
                          </label>
                        </div>

                        <div class="col">
                          <div class="d-flex align-items-center">
                            <!-- <span class="tag__score">{{
                        item.suggestions_score[index_normal]
                      }}</span
                      > -->
                            <span class="desc"
                              >{{ normal.paragraph }}
                              <span
                                v-if="index_normal == 0"
                                v-b-tooltip.hover.top="{ variant: 'primary' }"
                                title="The AI ranked these options according to what it considers to be the best choice"
                                class="material-icons-outlined"
                              >
                                grade
                              </span>
                            </span>
                          </div>

                          <!-- <span
                            v-if="index_normal == 0"
                            v-b-tooltip.hover.top="{ variant: 'primary' }"
                            title="The AI ranked these options according to what it considers to be the best choice"
                            class="pill-badge blue text-center mx-2 px-4 py-1 py-1 d-flex w-40"
                            >Best Choice</span
                          > -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--for other elements-->

                  <div
                    id="content__aisuggestions__suggestions"
                    class="p-3"
                    v-if="
                      item.chosenTab_AiSuggestions == 'Suggestions' &&
                      item.key != 'p'
                    "
                  >
                    <!-- <h6 class="mb-3 user-select-none">Options</h6> -->
                    <small class="text-muted"
                      >Suggestion based on the keyword</small
                    >
                    <div
                      class="form-check suggestion mt-3"
                      v-for="(normal, index_normal) in item.suggestions"
                      :key="'suggestions' + index_normal"
                    >
                      <div class="row">
                        <div class="col-1">
                          <input
                            class="form-check-input"
                            type="radio"
                            :name="'aisuggestion_suggestions' + index"
                            :id="normal"
                            :value="normal"
                            v-model="item.value"
                            @change="calcScore"
                          />
                          <label class="form-check-label" :for="normal">
                          </label>
                        </div>
                        <div class="col">
                          <div class="d-flex align-items-center">
                            <!-- <span class="tag__score">{{
                        item.suggestions_score[index_normal]
                      }}</span
                      > -->
                            <span class="desc"
                              >{{ normal }}
                              <span
                                v-if="index_normal == 0"
                                v-b-tooltip.hover.top="{ variant: 'primary' }"
                                title="The AI ranked these options according to what it considers to be the best choice"
                                class="material-icons-outlined"
                              >
                                grade
                              </span>
                            </span>
                          </div>
                          <!-- <span
                            v-if="index_normal == 0"
                            v-b-tooltip.hover.top="{ variant: 'primary' }"
                            title="The AI ranked these options according to what it considers to be the best choice"
                            class="pill-badge blue text-center mx-2 px-4 py-1 d-flex w-40"
                            >Best Choice</span
                          > -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Advanced Suggestions -->
                  <div
                    id="content__aisuggestions__advanced"
                    class="p-3"
                    v-if="item.chosenTab_AiSuggestions == 'Advanced'"
                  >
                    <small class="text-muted">
                      Advanced tool to generate most relevant content from
                      keyword data scraped
                    </small>
                    <div v-if="total_genetic_quota <= 0">
                      <div class="d-flex mt-4">
                        <button
                          class="btn btn-info w-40 p-2 text-white"
                          disabled
                        >
                          Contact Us to Subscribe to Advance Feature
                        </button>
                      </div>
                    </div>

                    <div v-else>
                      <div v-if="item.advanced_suggestions_percentage">
                        <div v-if="item.advanced_suggestions_percentage >= 100">
                          <!-- <h6 class="my-3 user-select-none">Options</h6> -->
                          <div
                            class="form-check suggestion"
                            v-for="(
                              advance, index_advance
                            ) in item.advanced_suggestions"
                            :key="'suggestions' + index_advance"
                          >
                            <div class="row">
                              <div class="col-1">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  :name="'aisuggestion_suggestions' + index"
                                  :id="advance.generated_text"
                                  :value="advance.generated_text"
                                  v-model="item.value"
                                  @change="calcScore"
                                />
                                <label
                                  class="form-check-label"
                                  :for="advance.generated_text"
                                >
                                </label>
                              </div>
                              <div class="col">
                                <div class="d-flex align-items-center">
                                  <span class="desc"
                                    >{{ advance.generated_text }}

                                    <span
                                      v-if="index_advance == 0"
                                      v-b-tooltip.hover.top="{
                                        variant: 'primary',
                                      }"
                                      title="The AI ranked these options according to what it considers to be the best choice"
                                      class="material-icons-outlined"
                                    >
                                      grade
                                    </span>
                                  </span>
                                </div>
                                <!-- <span
                                  v-if="index_advance == 0"
                                  v-b-tooltip.hover.top="{
                                    variant: 'primary',
                                  }"
                                  title="The AI ranked these options according to what it considers to be the best choice"
                                  class="pill-badge blue text-center mx-2 px-4 py-1 d-flex w-40"
                                  >Best Choice</span
                                > -->
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-else>
                          <div class="d-flex my-4 justify-content-center">
                            <b>
                              {{
                                item.advanced_suggestions_percentage.toFixed(2)
                              }}
                              %
                            </b>
                          </div>
                          <k-progress
                            class="justify-content-center"
                            :showText="false"
                            activeColor="#AA22E9"
                            :border="true"
                            :lineHeight="20"
                            :cutWidth="100"
                            color="rgb(33, 186, 233)"
                            bgColor="#ddd"
                            type="line"
                            active
                            :percent="
                              Math.round(item.advanced_suggestions_percentage)
                            "
                          >
                          </k-progress>

                          <div class="d-flex mt-2 justify-content-center">
                            <p>
                              Kindly wait, your Result is being generated...
                            </p>
                          </div>
                        </div>
                      </div>

                      <div v-else>
                        <div class="d-flex mt-2">
                          <b>Content: </b>
                        </div>
                        <div class="d-flex mt-2">
                          <span class="desc user-select-none">{{
                            item.value
                          }}</span>
                        </div>

                        <div class="d-flex mt-4">
                          <button
                            :id="'optimizeButton' + index"
                            @click="optimizeContent(index)"
                            class="btn-primary w-25 p-2"
                          >
                            Optimize
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Custom Suggestions -->
                  <!-- <div
                    id="content__aisuggestions__custom"
                    class="p-3"
                    v-if="item.chosenTab_AiSuggestions == 'Edit'"
                  >
           

                    <div class="form-group">
                      <GrammarlyEditorPlugin>
                        <textarea
                          v-model="item.value"
                          class="form-control"
                          id="ValidateTextArea"
                          rows="15"
                          placeholder="Type in your custom content here"
                          style="border-color: #888"
                        ></textarea>
                      </GrammarlyEditorPlugin>
                    </div>
                    <button
                      @click="calcScore()"
                      class="btn btn-primary mt-3 me-2"
                    >
                      Calculate Score
                    </button>
                    <button
                      @click="revert(index)"
                      class="btn btn-outline-primary mt-3 ms-2"
                    >
                      Original
                    </button>

         
                  </div> -->

                  <!-- <button class="btn btn-primary mt-3">Update</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import RadialProgressBar from "vue-radial-progress";
import Automation from "@/store/Automation.js";
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-vue/v3";
export default {
  name: "ContentTab",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  components: {
    GrammarlyEditorPlugin,
    Grammarly,
    RadialProgressBar,
  },
  data() {
    return {
      showUpdateWebsite: false,
      showAllElements: false,
      content_article: [],
      values: [],
      user_seo_checklist: [],
      user_data_optimized_p: [],
      content_to_calc_score: [],
      UserStatistics: [],
      data_for_calculation: [],
      step_1_content: [],
      geneticAlgo: [],
      index_still_in_process: [],
      timer: null,
      total_genetic_quota:
        JSON.parse(localStorage.userInfo).used_genetic_algo_quota +
        JSON.parse(localStorage.userInfo).free_genetic_algo_quota,
      choosenIndex: 1,
      targetValues: {
        content_score: "",
        average_score: "",
        target_score: "",
        word_count: "",
        average_count: "",
        target_count: "",
      },
    };
  },
  methods: {
    chooseItem(data) {
      this.choosenIndex = data;
    },
    show_all_elements() {
      this.showAllElements = !this.showAllElements;
    },
    changeTab_AiSuggestions(name, item_index, tab_index) {
      //   console.log(name, item_index, tab_index);
      //   console.log(this.content_article[item_index]);
      this.content_article[item_index].chosenTab_AiSuggestions = name;
      // console.log(this.content_article[item_index].Tabs_AiSuggestions);
      this.content_article[item_index].Tabs_AiSuggestions.forEach(
        (element, index) => {
          if (index == tab_index) {
            element.class = "aisuggestion__tab active";
          } else {
            element.class = "aisuggestion__tab";
          }
        }
      );
    },
    changeEditor(data) {
      var arr = this.content_article[data];
      arr.editor = !arr.editor;

      if (!arr.editor) {
        this.calcScore();
      }

      this.content_article.splice(data, 1, arr);
    },

    revert(data) {
      var arr = this.content_article[data];
      (arr.value = arr.original), this.content_article.splice(data, 1, arr);
      this.calcScore();
    },

    assignSuggestion(content) {
      content.forEach((para, index) => {
        if (para.key == "title") {
          // var original = this.content_article[index].value
          this.content_to_calc_score = this.content_article;

          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );
          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];
          para.suggestions_score = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metatitle);
            //console.log(this.content_to_calc_score[index])
            this.content_to_calc_score[index].value = element.metatitle;
          });

          para.suggestions = sugTitle;
          //  para.suggestions_score= sugScore
          // console.log("sugScore title", para);

          this.content_to_calc_score[index].value =
            this.content_article[index].original;
          this.content_article[index].value =
            this.content_article[index].original;
        } else if (para.key == "description") {
          this.content_to_calc_score = this.content_article;

          const metaTag = this.values.find(
            (element) => element.slug === "meta_tags_result"
          );
          this.initialSuggestion = JSON.parse(metaTag.data);

          var sugTitle = [];
          para.suggestions_score = [];

          this.initialSuggestion.forEach((element) => {
            sugTitle.push(element.metadescription);
            this.content_to_calc_score[index].value = element.metadescription;
          });

          para.suggestions = sugTitle;
          // console.log("sugScore desc", para);

          this.content_to_calc_score[index].value =
            this.content_article[index].original;
          this.content_article[index].value =
            this.content_article[index].original;
        } else if (para.key == "h1") {
          this.content_to_calc_score = this.content_article;

          para.suggestions_score = [];
          const h1 = this.values.find((element) => element.slug === "h1");

          JSON.parse(h1.data).forEach((element) => {
            this.content_to_calc_score[index].value = element;
          });

          para.suggestions = JSON.parse(h1.data);

          // console.log("sugScore h1", para);

          this.content_to_calc_score[index].value =
            this.content_article[index].original;
          this.content_article[index].value =
            this.content_article[index].original;
        } else if (para.key == "h2") {
          this.content_to_calc_score = this.content_article;

          para.suggestions_score = [];
          const h2 = this.values.find((element) => element.slug === "h2");

          JSON.parse(h2.data).forEach((element) => {
            this.content_to_calc_score[index].value = element;
          });

          para.suggestions = JSON.parse(h2.data);

          // console.log("sugScore h2", para);

          this.content_to_calc_score[index].value =
            this.content_article[index].original;
          this.content_article[index].value =
            this.content_article[index].original;
        } else if (para.key == "h3") {
          this.content_to_calc_score = this.content_article;

          const h3 = this.values.find((element) => element.slug === "h3");
          para.suggestions_score = [];
          JSON.parse(h3.data).forEach((element) => {
            this.content_to_calc_score[index].value = element;
          });

          para.suggestions = JSON.parse(h3.data);

          // console.log("sugScore h3", para);

          this.content_to_calc_score[index].value =
            this.content_article[index].original;
          this.content_article[index].value =
            this.content_article[index].original;
        } else if (para.key == "p") {
          this.content_to_calc_score = this.content_article;

          const foundp = this.values.find(
            (element) => element.slug === "paragraphs"
          );
          para.suggestions_score = [];
          this.initialSuggestion = JSON.parse(foundp.data);

          JSON.parse(foundp.data).forEach((element) => {
            this.content_to_calc_score[index].value = element;
          });

          para.suggestions = this.initialSuggestion;
          // console.log(this.user_data_optimized_p);

          // console.log("sugScore p", para);

          this.content_to_calc_score[index].value =
            this.content_article[index].original;
          this.content_article[index].value =
            this.content_article[index].original;

          para.customized_suggestion = [];
          this.user_data_optimized_p.forEach((element, ele_index) => {
            if (ele_index == index) {
              element.p.forEach((sug) => {
                if (sug.length != 0) {
                  para.customized_suggestion.push(sug);
                }
              });
            }
          });
        }

        //  this.content_to_calc_score[index].value=original
        //    this.content_article[index].value=original
      });

      return content;
    },
    organiseData(data) {
      this.data_for_calculation = [];
      // //

      data.forEach((element, index) => {
        if (element.key == "li") {
          element.value.forEach((li) => {
            var arr = {};
            arr[element.key] = li;

            this.data_for_calculation.push(arr);
          });
        } else {
          var arr = {};
          arr[element.key] = element.value;

          this.data_for_calculation.push(arr);
        }
      });

      var change_to_string = {
        user_data: JSON.stringify(this.data_for_calculation),
      };

      // //

      return change_to_string;
    },
    calcScore() {
      var final_string = {};

      final_string = this.organiseData(this.content_article);

      ////

      Automation.updateUserData(final_string, this.$route.params.id)
        .then((response_update) => {
          Automation.fetchSeoAutomation({
            id: this.$route.params.id,
          }).then((response) => {
            const userStatistics = response.data.data.steps_data.step_1.find(
              (element) => element.slug === "user_statistics"
            );

            this.UserStatistics = JSON.parse(userStatistics.data);
            this.targetValues.content_score = this.UserStatistics[1];
            this.targetValues.word_count = this.UserStatistics[2];
            // localStorage.setItem(
            //   "ai_seo_automation_content_Score",
            //   JSON.stringify(this.UserStatistics)
            // );
          });
          this.$toast.info("The AI SEO Automation Content Score is updated");
          // this.$bvToast.toast(
          //   "The AI SEO Automation Content Score is updated",
          //   {
          //     title: "Success",
          //     variant: "success",
          //     toaster: "b-toaster-bottom-left",
          //     solid: true,
          //     autoHideDelay: 10000,
          //   }
          // );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    assignAdvancedSuggestion(data) {
      data.forEach((element_data, index) => {
        this.geneticAlgo.forEach((element) => {
          if (
            element.img_option.value == index &&
            element.complete_percentage >= 100
          ) {
            element_data.advanced_suggestions = JSON.parse(
              JSON.parse(element.values[0].data)
            );
            element_data.advanced_suggestions_plot = JSON.parse(
              element.values[1].data
            );
            element_data.advanced_suggestions_percentage =
              element.complete_percentage;
          } else if (
            element.img_option.value == index &&
            element.complete_percentage < 100
          ) {
            element_data.advanced_suggestions_percentage =
              element.complete_percentage;
          }
        });
      });

      console.log(data);

      return data;
    },

    optimizeContent(content_index) {
      var arr = this.content_article[content_index];

      arr.advanced_suggestions_percentage = 10;

      this.content_article.splice(content_index, 1, arr);

      var obj = {
        user_text: this.content_article[content_index].value,
        element_id: content_index,
        express_mode: true,
      };

      Automation.addGeneticAlgo(obj, this.$route.params.id)
        .then((response_2) => {
          console.log(response_2);

          this.setTimerGenetic();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setTimerGenetic() {
      Automation.fetchSeoAutomation({
        id: this.$route.params.id,
      })
        .then((response_initial) => {
          this.geneticAlgo = response_initial.data.data.geneticAlgo;

          const genetic_processing = this.geneticAlgo.find(
            (element) => element.complete_percentage < 100
          );

          this.content_article = this.assignAdvancedSuggestion(
            this.content_article
          );

          var me = this;

          // if one of the genetic campaign is processing

          console.log("genetic_processing!=undefined", genetic_processing);

          if (genetic_processing != undefined) {
            this.timer = setInterval(() => {
              Automation.fetchSeoAutomation({
                id: me.$route.params.id,
              })
                .then((response_timer) => {
                  const genetic_timer =
                    response_timer.data.data.geneticAlgo.find(
                      (element) => element.complete_percentage < 100
                    );

                  console.log(
                    "genetic_timer!=undefined)",
                    genetic_timer != undefined
                  );
                  // if one of the genetic campaign is processing
                  if (genetic_timer != undefined) {
                    console.log("timer content_article", this.content_article);
                    me.content_article.forEach((element_data, index) => {
                      response_timer.data.data.geneticAlgo.forEach(
                        (element) => {
                          if (
                            element.img_option.value == index &&
                            element.complete_percentage < 100 &&
                            element_data.advanced_suggestions == undefined
                          ) {
                            var arr = element_data;

                            console.log("timer element_data", element_data);
                            arr.advanced_suggestions_percentage =
                              element.complete_percentage;

                            this.content_article.splice(index, 1, arr);
                            console.log(
                              "timer after splice",
                              this.content_article
                            );
                          } else if (
                            element.img_option.value == index &&
                            element.complete_percentage >= 100 &&
                            element_data.advanced_suggestions == undefined
                          ) {
                            var arr = element_data;

                            arr.advanced_suggestions = JSON.parse(
                              JSON.parse(element.values[0].data)
                            );
                            arr.advanced_suggestions_plot = JSON.parse(
                              element.values[1].data
                            );
                            arr.advanced_suggestions_percentage =
                              element.complete_percentage;

                            this.content_article.splice(index, 1, arr);
                          }
                        }
                      );
                    });
                  }
                  // if all 100% done
                  else {
                    clearInterval(this.timer);
                    console.log("result content_article", this.content_article);
                    me.geneticAlgo = response_timer.data.data.geneticAlgo;
                    //update those dont have value yet
                    me.content_article.forEach((element_data, index) => {
                      me.geneticAlgo.forEach((element) => {
                        if (
                          element.img_option.value == index &&
                          element_data.advanced_suggestions == undefined
                        ) {
                          var arr = element_data;

                          console.log("result element_data", element_data);
                          arr.advanced_suggestions = JSON.parse(
                            JSON.parse(element.values[0].data)
                          );
                          arr.advanced_suggestions_plot = JSON.parse(
                            element.values[1].data
                          );
                          arr.advanced_suggestions_percentage =
                            element.complete_percentage;

                          console.log(
                            "result after splice",
                            this.content_article
                          );
                          this.content_article.splice(index, 1, arr);
                        }
                      });
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.values = this.content.steps_data.step_1;

    const userStatistics = this.content.steps_data.step_1.find(
      (element) => element.slug === "user_statistics"
    );

    this.UserStatistics = JSON.parse(userStatistics.data);
    // console.log("UserStatistics", this.UserStatistics);
    this.targetValues.content_score = this.UserStatistics[1];
    this.targetValues.word_count = this.UserStatistics[2];

    const webStatistics = this.values.find(
      (element) => element.slug === "web_statistics"
    );

    var all_score = [];
    var all_count = [];

    console.log("webStatistics", JSON.parse(webStatistics.data));

    for (const [key, value] of Object.entries(JSON.parse(webStatistics.data))) {
      all_score.push(value[3]);
      all_count.push(value[4]);
    }

    this.targetValues.average_score =
      all_score.reduce((x, y) => x + y) / all_score.length;
    this.targetValues.average_count =
      all_count.reduce((x, y) => x + y) / all_count.length;

    all_score.sort(function (a, b) {
      return a - b;
    });

    all_count.sort(function (a, b) {
      return a - b;
    });
    this.targetValues.target_score = all_score[3];
    this.targetValues.target_count = all_count[3];

    const user_seo_checklist_result = this.values.find(
      (element) => element.slug === "user_seo_checklist"
    );

    if (user_seo_checklist_result != undefined) {
      this.user_seo_checklist = JSON.parse(user_seo_checklist_result.data);

      for (const [key, value] of Object.entries(this.user_seo_checklist)) {
        if (key == "user_data_optimized_p") {
          this.user_data_optimized_p = value;
        }
      }
    }

    const foundContent = this.values.find(
      (element) => element.slug === "content_data"
    );

    var contentVal = JSON.parse(foundContent.data);

    for (const [key, value] of Object.entries(contentVal.article)) {
      for (const [key2, value2] of Object.entries(value).reverse()) {
        if (key2 == "p") {
          this.step_1_content.push({
            key: key2,
            customized: value2,
            value: value2,
            original: value2,
            editor: false,

            Tabs_AiSuggestions: [
              //  { name: "Specified", class: "aisuggestion__tab active" },
              { name: "Suggestions", class: "aisuggestion__tab active" },
              { name: "Advanced", class: "aisuggestion__tab" },
              //  { name: "Edit", class: "aisuggestion__tab" },
            ],
            chosenTab_AiSuggestions: "Suggestions",
            original_suggestion: "original",
          });
        } else {
          this.step_1_content.push({
            key: key2,
            customized: value2,
            value: value2,
            original: value2,
            editor: false,
            Tabs_AiSuggestions: [
              { name: "Suggestions", class: "aisuggestion__tab active" },

              //  { name: "Edit", class: "aisuggestion__tab" },
            ],
            chosenTab_AiSuggestions: "Suggestions",
            original_suggestion: "original",
          });
        }
      }
    }

    if (this.content.step.current_step == 1) {
      this.content_article = this.step_1_content;
    } else {
      this.showUpdateWebsite = true;

      var liList = [];
      JSON.parse(this.content.steps_data.step_2[0].data).forEach((element) => {
        for (const [key, value] of Object.entries(element)) {
          if (key != "li") {
            if (liList.length != 0) {
              this.content_article.push({ key: "li", value: liList });
            }
            liList = [];

            if (key == "p") {
              this.content_article.push({
                key: key,
                customized: value,
                value: value,
                original: value,
                editor: false,
                Tabs_AiSuggestions: [
                  //  { name: "Specified", class: "aisuggestion__tab active" },
                  { name: "Suggestions", class: "aisuggestion__tab active" },
                  { name: "Advanced", class: "aisuggestion__tab" },
                  // { name: "Edit", class: "aisuggestion__tab" },
                ],
                chosenTab_AiSuggestions: "Suggestions",
                original_suggestion: "original",
              });
            } else {
              this.content_article.push({
                key: key,
                customized: value,
                value: value,
                original: value,
                editor: false,
                Tabs_AiSuggestions: [
                  { name: "Suggestions", class: "aisuggestion__tab active" },
                  // { name: "Advanced", class: "aisuggestion__tab" },
                  //  { name: "Edit", class: "aisuggestion__tab" },
                ],
                chosenTab_AiSuggestions: "Suggestions",
                original_suggestion: "original",
              });
            }
          } else {
            liList.push(value);
          }
        }
      });
      if (liList.length != 0) {
        this.content_article.push({ key: "li", value: liList });
      }
    }

    this.content_article = this.assignSuggestion(this.content_article);

    this.setTimerGenetic();

    // this.content_article = this.assignAdvancedSuggestion(this.content_article);

    this.content_article.forEach((element, index) => {
      element.original = this.step_1_content[index].original;
    });

    console.log(this.content_article);
    // console.log(this.step_1_content)
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
/* Bodyfix section - Contents */

/* ----- 1.content dropdown css - start */
.bodyfix__content__content .content__dropdown__group {
  border: 1px solid #2c8de0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  height: 650px;
  overflow-y: auto;
  padding-left: 1rem;
  padding-top: 1rem;
}
.bodyfix__content__content .content__dropdown__group-element {
  border: none;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  height: 650px;
  overflow-y: auto;
}
.bodyfix__content__content .content__dropdown__group:last-child {
  margin-bottom: 0rem;
}
.content__dropdown__title {
  display: flex;
  padding: 1.5rem 1.5rem;
  transition: all 0.4s ease-out;
  user-select: none;
  border-radius: 10px;
}
.content__dropdown__group .content__dropdown__title.collapsed:hover,
.content__dropdown__group .content__dropdown__title.not-collapsed:hover {
  background-color: #f5f5f7;
}
.content__dropdown__title__left {
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-bottom: 1rem;
  position: relative;
  /* border-bottom:1px solid #e7f3fe; */
}
.content__dropdown__title__left .title {
  margin-right: 0.5rem;
  color: #183b1c;
  font-size: 16px;
  min-width: 140px;
  font-weight: 600;
}

.content__dropdown__title__left .element-content {
  margin-right: 4rem;
  min-width: 130px;
}

.content__dropdown__title__left .btn-undo-content {
  color: #2c8de0;
  float: right;
  display: column;
  vertical-align: middle;
  position: absolute;

  right: -10px;
}
.btn-edit-content:hover {
  color: #757575;
  transition: all 0.3s ease-out;
}
.content__dropdown__title__left .btn-edit-content {
  color: #2c8de0;
  float: right;
  display: column;
  vertical-align: middle;
  position: absolute;

  right: 30px;
}
.btn-undo-content {
  color: #757575;
  transition: all 0.3s ease-out;
}

.content__dropdown__title__left .score {
  margin-right: 2rem;
  border: 1px solid black;
  padding: 0.1rem 0.5rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}
.content__dropdown__title__left .score.score-low {
  border-color: #e23c39;
  color: #e23c39;
}
.content__dropdown__title__left .score.score-avg {
  border-color: #5791d0;
  color: #5791d0;
}
.content__dropdown__title__left .score.score-high {
  border-color: #4dae50;
  color: #4dae50;
}
.content__dropdown__title__left .description {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.content__dropdown__title__right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.content__dropdown__title__right .date {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.content__dropdown__title[aria-expanded="false"]
  .content__dropdown__title__right
  .arrow-icon {
  transform: rotate(0deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.content__dropdown__title[aria-expanded="true"]
  .content__dropdown__title__right
  .arrow-icon {
  transform: rotate(180deg);
  transition: 0.3s ease-out;
  color: #2c8de0;
}
.content__dropdown__content {
  /* padding: 1rem 2rem 2rem; */
  height: 400px;
  overflow-y: auto;
  /* border-top: 1px solid #2c8de0; */
}
.grey__card-outlined {
  border: 1px solid #8b8b8b;
  padding: 1rem 1rem;
  border-radius: 10px;
  color: black;
}

/* ai suggestion tabs */
.aisuggestion__tab__title {
  padding: 0.5rem;
  color: #2c8de0;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.4s ease-out;
}
.aisuggestion__tab {
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  margin-right: 1rem;
  /* margin-bottom: 0.5rem; */
  transition: 0.2s ease-out;
  border-radius: 20px;
  border: 1px solid #2c8de0;
  background-color: #f4faff;
}
.aisuggestion__tab:hover {
  background-color: #dcefff;
  transition: 0.4s ease-out;
}
.aisuggestion__tab.active {
  background-color: #2c8de0;
  transition: all 0.4s ease-out;
}
.aisuggestion__tab.active .aisuggestion__tab__title {
  color: #fff;
  transition: all 0.4s ease-out;
}
.suggestion {
  margin-bottom: 1.2rem;
  display: flex;
  align-items: start;
}
.suggestion .form-check-input {
  /* position: absolute; */
  /* margin-right: 0.5rem;
  margin-top: 0.3rem; */
}
.tag__score {
  background-color: #4dae50;
  border-radius: 6px;
  padding: 0.1rem 0.8rem 0.1rem 0.5rem;
  color: white;
  font-weight: 500;
  margin-bottom: -0.2rem;
  margin-right: 1rem;
  margin-left: 0.2rem;
  white-space: nowrap;
  user-select: none;
}
.desc {
  font-size: 16px;
  font-weight: 500;
}

.desc .material-icons-outlined {
  font-size: 1.5rem;
  color: #ff9900;
  vertical-align: middle;
}
.word-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2rem;
  max-width: 800px;
}
@media screen and (max-width: 1600px) {
  .word-wrap {
    max-width: 600px;
  }
}
@media screen and (max-width: 1382px) {
  .word-wrap {
    max-width: 400px;
  }
}
.user-select-none {
  user-select: none;
}
label {
  cursor: pointer !important;
}
/* ----- 1. content dropdown css - end */
.pill-badge {
  border-radius: 20px;
  border: none;
  background-color: #e8e8e8;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.2rem 1rem;
  margin-top: 0.2rem;
}
.pill-badge.red {
  background-color: #fce1de;
  color: #f54337;
}
.pill-badge.yellow {
  background-color: #ffe7bd;
  color: #ff9900;
}
.pill-badge.green {
  background-color: #e2f2e3;
  color: #4dae50;
}

.pill-badge:first-letter {
  text-transform: uppercase;
}
.btn-arrow-icon {
  border-radius: 50% !important;
}
.show-all-button {
  cursor: pointer;
}

.td-none {
  cursor: pointer;
}

.td-none:hover .description {
  color: #2c8de0;
}

.radial-progress-container {
  font-weight: 600;
  font-size: 1.5rem;
}
.radial-progress-container #number-green {
  color: #5fb355 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.radial-progress-container #number-red {
  color: #e11300 !important;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.radial-progress-container #number-yellow {
  color: #edb95e !important;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
