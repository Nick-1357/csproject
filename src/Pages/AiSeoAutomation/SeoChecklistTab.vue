<template>
  <div>
    <b-modal
      id="modal-center-seo-checklist-analytics"
      size="lg"
      centered
      hide-footer
      hide-header
    >
      <h5 v-if="chosenKey == 'title' || chosenKey == 'description'">
        Google and Website Character Count
      </h5>
      <h5
        v-else-if="
          chosenKey == 'h1' || chosenKey == 'h2_h6' || chosenKey == 'p'
        "
      >
        Website Length
      </h5>

      <!-- <h5 v-else-if="chosenKey == 'h2_h6' || chosenKey == 'p'">
        SEO Checklist Analytics {{ chosenKey }}
      </h5> -->
      <h5 v-else>Number of Links</h5>
      <!-- analytics graph here -->

      <div id="chart">
        <apexchart
          height="350"
          :options="chosenAnalytics.chartOptions"
          :series="chosenAnalytics.series"
        ></apexchart>
      </div>
    </b-modal>

    <b-modal
      id="modal-center-seo-checklist-analytics-second"
      size="lg"
      centered
      hide-footer
      hide-header
    >
      <h5>Website Words Count</h5>
      <!-- analytics graph here -->

      <div id="chart">
        <apexchart
          height="350"
          :options="chosenAnalytics.chartOptionsSecond"
          :series="chosenAnalytics.seriesSecond"
        ></apexchart>
      </div>
    </b-modal>

    <div
      id="bodyfix__content__seochecklist"
      class="bodyfix__content__seochecklist"
    >
      <div
        class="seochecklist__dropdown__group"
        v-for="(data, index) in seo_checklist"
        :key="'seo_checklist' + index"
      >
        <div class="seochecklist__dropdown__title d-flex" type="button">
          <div class="seochecklist__dropdown__icon__left">
            <!-- TODO: Reena: Add tick or alert class depending on to show tick,warning or danger icon -->
            <div v-if="index == 'title' || index == 'description'">
              <span
                :class="[
                  user_seo_checklist[index].website_chars > 60 &&
                  user_seo_checklist[index].website_matchlist[0] !=
                    'Exact Match'
                    ? 'material-icons seochecklist-icon danger'
                    : user_seo_checklist[index].website_chars <= 60 &&
                      user_seo_checklist[index].website_matchlist[0] ==
                        'Exact Match'
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon warning',
                ]"
              ></span>
            </div>

            <div v-else-if="index == 'h1'">
              <span
                :class="[
                  user_seo_checklist[index][0].website_len != 1 &&
                  user_seo_checklist[index][0].website_matchlist[0] !=
                    'Exact Match'
                    ? 'material-icons seochecklist-icon danger'
                    : user_seo_checklist[index][0].website_len == 1 &&
                      user_seo_checklist[index][0].website_matchlist[0] ==
                        'Exact Match'
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon warning',
                ]"
              ></span>
            </div>

            <div v-else-if="index == 'h2_h6'">
              <span
                :class="[
                  user_seo_checklist[index][0].website_len <=
                    seo_checklist[index].web_sorted[6] &&
                  user_seo_checklist[index][0].website_len >=
                    seo_checklist[index].web_sorted[3]
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon danger',
                ]"
              ></span>
            </div>

            <div
              v-else-if="index == 'internal_links' || index == 'external_links'"
            >
              <span
                :class="[
                  user_seo_checklist[index].number_of_links <=
                    seo_checklist[index].link_sorted[6] &&
                  user_seo_checklist[index].number_of_links >=
                    seo_checklist[index].link_sorted[3]
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon danger',
                ]"
              ></span>
            </div>

            <div v-else-if="index == 'img_alt'">
              <span
                :class="[
                  user_seo_checklist[index].number_of_images +
                    user_seo_checklist[index].number_of_images_noalt <=
                    seo_checklist[index].link_sorted[6] &&
                  user_seo_checklist[index].number_of_images +
                    user_seo_checklist[index].number_of_images_noalt >=
                    seo_checklist[index].link_sorted[3]
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon danger',
                ]"
              ></span>
            </div>

            <div v-else-if="index == 'p'">
              <span
                :class="[
                  user_seo_checklist[index].website_len <=
                    seo_checklist[index].web_sorted[6] &&
                  user_seo_checklist[index].website_len >=
                    seo_checklist[index].web_sorted[3]
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon danger',
                ]"
              ></span>
            </div>

            <div v-else-if="index == 'keyword_prominence' || index == 'url'">
              <span
                :class="[
                  user_seo_checklist[index].website_matchlist[0] ==
                  'Exact Match'
                    ? 'material-icons seochecklist-icon tick'
                    : 'material-icons seochecklist-icon danger',
                ]"
              ></span>
            </div>
          </div>
          <div class="seochecklist__dropdown__title__left">
            <span class="title">{{ index | capitalize }}</span>
            <span
              class="description"
              v-if="index == 'title' || index == 'description'"
              >{{ user_seo_checklist[index].website_chars }} Characters in
              {{ index }}</span
            >

            <span class="description" v-if="index == 'h1' || index == 'h2_h6'"
              >{{ user_seo_checklist[index][0].website_len }}
              {{ index }} element</span
            >

            <span
              class="description"
              v-if="index == 'internal_links' || index == 'external_links'"
              >{{ user_seo_checklist[index].number_of_links }} Elements</span
            >

            <span class="description" v-if="index == 'img_alt'">
              {{
                user_seo_checklist[index].number_of_images +
                user_seo_checklist[index].number_of_images_noalt
              }}
              Elements</span
            >

            <span class="description" v-if="index == 'p'">
              {{ user_seo_checklist[index].website_len }}
              Elements</span
            >
          </div>
          <div class="seochecklist__dropdown__title__right">
            <button
              v-if="index != 'keyword_prominence' && index != 'url'"
              class="btn btn-primary d-flex align-items-center me-2"
              @click="viewSeoChecklistAnalytics(data, index)"
              v-b-tooltip.hover.top="{ variant: 'primary' }"
              :title="[
                index == 'title' || index == 'description'
                  ? ' Google and Website Character Count'
                  : index == 'h1' || index == 'h2_h6' || index == 'p'
                  ? ' Website Length'
                  : 'Number of Links',
              ]"
            >
              <span class="material-icons-outlined me-2">bar_chart</span
              >Analytics
            </button>

            <button
              v-if="index == 'h2_h6' || index == 'p'"
              class="btn btn-primary d-flex align-items-center"
              @click="viewSeoChecklistAnalyticsSecond(data, index)"
              v-b-tooltip.hover.top="{ variant: 'primary' }"
              title="Website Words Count"
            >
              <span class="material-icons-outlined me-2">bar_chart</span
              >Analytics
            </button>

            <button
              class="btn-primary ms-2 btn-arrow-icon"
              v-b-toggle="'seo_checklist_' + index"
            >
              <span class="arrow-icon material-icons-outlined text-white">
                expand_more
              </span>
            </button>
          </div>
        </div>

        <b-collapse :id="'seo_checklist_' + index">
          <div class="seochecklist__dropdown__content pt-5">
            <!-- <div class="d-flex"> -->
            <div class="row w-100">
              <!--count explanation-->
              <div v-if="index == 'title'" class="col-6">
                <div
                  v-if="user_seo_checklist[index].website_chars <= 60"
                  class="seochecklist__card green"
                >
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index].website_chars }}
                    characters, and it's optimal to have maximum of 60
                    characters</span
                  >
                </div>

                <div
                  v-else-if="
                    user_seo_checklist[index].website_chars == 0 ||
                    user_seo_checklist[index].website_chars > 60 ||
                    user_seo_checklist[index].website_chars <= 0
                  "
                  class="seochecklist__card red"
                >
                  <span
                    >Your webpage has
                    {{ user_seo_checklist[index].website_chars }}
                    characters, while it's optimal to have maximum of 60
                    characters</span
                  >
                </div>
              </div>

              <div v-if="index == 'description'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="user_seo_checklist[index].website_chars <= 160"
                >
                  <span
                    >Your webpage has
                    {{ user_seo_checklist[index].website_chars }}
                    characters, and it's optimal to have maximum of 160
                    characters</span
                  >
                </div>

                <div
                  class="seochecklist__card red"
                  v-else-if="
                    user_seo_checklist[index].website_chars == 0 ||
                    user_seo_checklist[index].website_chars > 160 ||
                    user_seo_checklist[index].website_chars <= 0
                  "
                >
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index].website_chars }}

                    characters, while it's optimal to have maximum of 160
                    characters</span
                  >
                </div>
              </div>

              <div v-if="index == 'h1'" class="col-6">
                <div
                  class="seochecklist__card red"
                  v-if="
                    user_seo_checklist[index][0].website_len == 0 ||
                    user_seo_checklist[index][0].website_len > 1
                  "
                >
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index][0].website_len }}
                    elements, and it's optimal to have exactly one H1
                    element</span
                  >
                </div>

                <div v-else class="seochecklist__card green">
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index][0].website_len }}
                    elements, and it's optimal to have exactly one H1
                    element</span
                  >
                </div>
              </div>

              <div v-if="index == 'h2_h6'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index][0].website_len <=
                      seo_checklist[index].web_sorted[6] &&
                    user_seo_checklist[index][0].website_len >=
                      seo_checklist[index].web_sorted[3]
                  "
                >
                  <span>
                    No action required, Your webpage has
                    {{ user_seo_checklist[index][0].website_len }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].web_sorted[3] }} to
                    {{ seo_checklist[index].web_sorted[6] }}</span
                  >
                </div>

                <div v-else class="seochecklist__card red">
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index][0].website_len }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].web_sorted[3] }} to
                    {{ seo_checklist[index].web_sorted[6] }} elements</span
                  >
                </div>
              </div>

              <div
                class="col-6"
                v-if="index == 'internal_links' || index == 'external_links'"
              >
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index].number_of_links <=
                      seo_checklist[index].link_sorted[6] &&
                    user_seo_checklist[index].number_of_links >=
                      seo_checklist[index].link_sorted[3]
                  "
                >
                  <span>
                    No action required, Your webpage has
                    {{ user_seo_checklist[index].number_of_links }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].number_of_links[3] }}
                    to
                    {{ seo_checklist[index].number_of_links[6] }}</span
                  >
                </div>

                <div class="seochecklist__card red" v-else>
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index].number_of_links }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].link_sorted[3] }} to
                    {{ seo_checklist[index].link_sorted[6] }} elements</span
                  >
                </div>
              </div>

              <div v-if="index == 'img_alt'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index].number_of_images +
                      user_seo_checklist[index].number_of_images_noalt <=
                      seo_checklist[index].link_sorted[6] &&
                    user_seo_checklist[index].number_of_images +
                      user_seo_checklist[index].number_of_images_noalt >=
                      seo_checklist[index].link_sorted[3]
                  "
                >
                  <span>
                    No action required, Your webpage has
                    {{
                      user_seo_checklist[index].number_of_images +
                      user_seo_checklist[index].number_of_images_noalt
                    }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].number_of_images[3] }}
                    to
                    {{ seo_checklist[index].number_of_images[6] }}</span
                  >
                </div>

                <div class="seochecklist__card red" v-else>
                  <span>
                    Your webpage has
                    {{
                      user_seo_checklist[index].number_of_images +
                      user_seo_checklist[index].number_of_images_noalt
                    }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].link_sorted[3] }} to
                    {{ seo_checklist[index].link_sorted[6] }} elements</span
                  >
                </div>
              </div>

              <div v-if="index == 'p'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index].website_len <=
                      seo_checklist[index].web_sorted[6] &&
                    user_seo_checklist[index].website_len >=
                      seo_checklist[index].web_sorted[3]
                  "
                >
                  <span>
                    No action required, Your webpage has
                    {{ user_seo_checklist[index].website_len }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].web_sorted[3] }} to
                    {{ seo_checklist[index].web_sorted[6] }}</span
                  >
                </div>

                <div v-else class="seochecklist__card red">
                  <span>
                    Your webpage has
                    {{ user_seo_checklist[index].website_len }}
                    elements, while it's optimal to have
                    {{ seo_checklist[index].web_sorted[3] }} to
                    {{ seo_checklist[index].web_sorted[6] }} elements</span
                  >
                </div>
              </div>

              <!--keyword explanation-->
              <div v-if="index == 'title'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index].website_matchlist[0] ==
                    'Exact Match'
                  "
                >
                  <span> Your {{ index }} has exact match</span>
                </div>

                <div
                  class="seochecklist__card red"
                  v-else-if="
                    user_seo_checklist[index].website_matchlist[0] == 'No match'
                  "
                >
                  <span>
                    Your {{ index }} has no target keyword, and it's optimal to
                    have 1 target keyword in the {{ index }} (Exact match)</span
                  >
                </div>

                <div class="seochecklist__card yellow" v-else>
                  <span>
                    Your {{ index }} has partial keyword match, and it's optimal
                    to have 1 target keyword in the {{ index }} (Exact
                    match)</span
                  >
                </div>
              </div>

              <div v-if="index == 'description'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index].website_matchlist[0] ==
                    'Exact Match'
                  "
                >
                  <span> Your {{ index }} has exact match</span>
                </div>

                <div
                  class="seochecklist__card red"
                  v-else-if="
                    user_seo_checklist[index].website_matchlist[0] == 'No match'
                  "
                >
                  <span>
                    Your {{ index }} has no target keyword, and it's optimal to
                    have 1 target keyword in the {{ index }} (Exact match)</span
                  >
                </div>

                <div v-else class="seochecklist__card yellow">
                  <span
                    >Your {{ index }} has partial keyword match, and it's
                    optimal to have 1 target keyword in the {{ index }} (Exact
                    match)</span
                  >
                </div>
              </div>

              <div v-if="index == 'h1'" class="col-6">
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index][0].website_matchlist[0] ==
                    'Exact Match'
                  "
                >
                  <span>Your {{ index }} has exact match</span>
                </div>

                <div
                  class="seochecklist__card red"
                  v-else-if="
                    user_seo_checklist[index][0].website_matchlist[0] ==
                    'No match'
                  "
                >
                  <span>
                    Your {{ index }} has no target keyword, and it's optimal to
                    have 1 target keyword in the {{ index }} (Exact match)</span
                  >
                </div>

                <div v-else class="seochecklist__card yellow">
                  <span>
                    Your {{ index }} has partial keyword match, and it's optimal
                    to have 1 target keyword in the {{ index }} (Exact
                    match)</span
                  >
                </div>
              </div>

              <!-- keyword_prominence -->
              <div
                v-if="index == 'keyword_prominence' || index == 'url'"
                class="col-6"
              >
                <div
                  class="seochecklist__card green"
                  v-if="
                    user_seo_checklist[index].website_matchlist[0] ==
                    'Exact Match'
                  "
                >
                  <span> Your {{ index }} has exact match</span>
                </div>

                <div
                  class="seochecklist__card red"
                  v-else-if="
                    user_seo_checklist[index].website_matchlist[0] == 'No match'
                  "
                >
                  <span>
                    Your {{ index }} has no target keyword, and it's optimal to
                    have 1 target keyword in the {{ index }} (Exact match)</span
                  >
                </div>

                <div v-else class="seochecklist__card yellow">
                  <span>
                    Your {{ index }} has partial keyword match, and it's optimal
                    to have 1 target keyword in the {{ index }} (Exact
                    match)</span
                  >
                </div>
              </div>
            </div>
            <!-- <button class="btn btn-primary d-flex align-items-center m-auto ms-auto " style="height: 38px;">
                      <span class="material-icons-outlined me-2">bar_chart</span>Analytics
                    </button> -->
            <!-- </div> -->

            <!-- table for title and description-->
            <div v-if="index == 'title' || index == 'description'" class="mt-5">
              <table class="nextable__AiSeoAutomation">
                <thead>
                  <tr>
                    <th class="w-15">Website</th>
                    <th class="w-10">Category</th>
                    <th class="w-10">Match</th>
                    <th class="w-50">Element</th>
                    <th class="w-15">Keywords</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(details, index_website) in data.website_matchlist"
                  :key="'website_matchlis' + index_website"
                >
                  <tr class="bb-grey">
                    <td class="br-grey fw-600 nowrap" rowspan="2">
                      {{ websiteName[index_website] }}
                    </td>
                    <td>Website</td>
                    <td>{{ details[0] }}</td>
                    <td>
                      <span
                        class="elements"
                        :key="'details_1' + index_val"
                        v-for="(val, index_val) in details[1]"
                        >{{ val }} <br />
                      </span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        :key="'details_2' + index_val"
                        v-for="(val, index_val) in details[2]"
                      >
                        {{ val }} <br />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Google</td>
                    <td>{{ data.google_matchlist[index_website][0] }}</td>
                    <td>
                      <span
                        class="elements"
                        :key="'google_matchlist' + index_val"
                        v-for="(val, index_val) in data.google_matchlist[
                          index_website
                        ][1]"
                        >{{ val }} <br />
                      </span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        :key="'google_matchlist_2' + index_val"
                        v-for="(val, index_val) in data.google_matchlist[
                          index_website
                        ][2]"
                      >
                        {{ val }} <br />
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr class="bb-grey">
                    <td class="br-grey fw-600 text-primary" rowspan="2">
                      Your Website
                    </td>
                    <td>Website</td>
                    <td>
                      {{ user_seo_checklist[index].website_matchlist[0] }}
                    </td>
                    <td>
                      <span
                        class="element"
                        :key="'user_web_matchlist' + index_val"
                        v-for="(val, index_val) in user_seo_checklist[index]
                          .website_matchlist[1]"
                        >{{ val }} <br />
                      </span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        :key="'user_web_matchlist' + index_val"
                        v-for="(val, index_val) in user_seo_checklist[index]
                          .website_matchlist[2]"
                      >
                        {{ val }} <br />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Google</td>
                    <td>{{ user_seo_checklist[index].google_matchlist[0] }}</td>
                    <td>
                      <span
                        class="element"
                        :key="'user_google_matchlist' + index_val"
                        v-for="(val, index_val) in user_seo_checklist[index]
                          .google_matchlist[1]"
                        >{{ val }} <br />
                      </span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        :key="'user_google_matchlist' + index_val"
                        v-for="(val, index_val) in user_seo_checklist[index]
                          .google_matchlist[2]"
                        >{{ val }} <br />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- table for keyword_prominence and url-->
            <div
              v-if="index == 'keyword_prominence' || index == 'url'"
              class="mt-5"
            >
              <table class="nextable__AiSeoAutomation">
                <thead>
                  <tr>
                    <th class="w-15">Website</th>
                    <th class="w-10">Category</th>
                    <th class="w-10">Match</th>
                    <th class="w-50">Element</th>
                    <th class="w-15">Keywords</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(details, index_website) in data.website_matchlist"
                  :key="'website_matchlis' + index_website"
                >
                  <tr class="bb-grey">
                    <td class="br-grey fw-600 nowrap">
                      {{ websiteName[index_website] }}
                    </td>
                    <td>Website</td>
                    <td>{{ details[0] }}</td>
                    <td>
                      <span
                        class="element"
                        :key="'details_1' + index_val"
                        v-for="(val, index_val) in details[1]"
                        >{{ val }} <br />
                      </span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        :key="'details_2' + index_val"
                        v-for="(val, index_val) in details[2]"
                      >
                        {{ val }} <br />
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr class="bb-grey">
                    <td class="br-grey fw-600 text-primary">Your Website</td>
                    <td>Website</td>
                    <td>
                      {{ user_seo_checklist[index].website_matchlist[0] }}
                    </td>
                    <td>
                      <span
                        class="element"
                        :key="'user_seo_checklist_1' + index_val"
                        v-for="(val, index_val) in user_seo_checklist[index]
                          .website_matchlist[1]"
                        >{{ val }} <br />
                      </span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        :key="'user_seo_checklist_2' + index_val"
                        v-for="(val, index_val) in user_seo_checklist[index]
                          .website_matchlist[2]"
                      >
                        {{ val }} <br />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- table for h1-->

            <div v-if="index == 'h1'" class="seochecklist__table mt-5">
              <table class="nextable__AiSeoAutomation">
                <thead>
                  <tr>
                    <th class="w-15">Website</th>
                    <th class="w-10">Category</th>
                    <th class="w-10">Match</th>
                    <th class="w-50">Element</th>
                    <th class="w-15">Keywords</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(details, index_website) in data.website_matchlist"
                  :key="'website_matchlis' + index_website"
                >
                  <tr class="bb-grey">
                    <td class="br-grey fw-600 nowrap">
                      {{ websiteName[index_website] }}
                    </td>
                    <td>Website</td>
                    <td>{{ details[0] }}</td>
                    <td>
                      <span
                        class="elements"
                        :key="'details1' + index_val"
                        v-for="(val, index_val) in details[1][0]"
                        >{{ val }}</span
                      >
                    </td>
                    <td class="keywords_string">
                      <span
                        :key="'details2' + index_val"
                        v-for="(val, index_val) in details[2][0]"
                        >{{ val }}</span
                      >
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr class="bb-grey">
                    <td class="br-grey fw-600 text-primary">Your Website</td>
                    <td>Website</td>
                    <td>
                      <span
                        class="match"
                        v-if="
                          user_seo_checklist[index].website_matchlist ==
                          undefined
                        "
                        >{{
                          user_seo_checklist[index][0].website_matchlist[0]
                        }}</span
                      >
                      <span class="match" v-else>{{
                        user_seo_checklist[index].website_matchlist[0]
                      }}</span>
                    </td>
                    <td>
                      <span
                        class="elements"
                        v-if="
                          user_seo_checklist[index].website_matchlist ==
                          undefined
                        "
                        >{{
                          user_seo_checklist[index][0].website_matchlist[1]
                        }}</span
                      >
                      <span class="elements" v-else>{{
                        user_seo_checklist[index].website_matchlist[1]
                      }}</span>
                    </td>
                    <td>
                      <span
                        class="keywords"
                        v-if="
                          user_seo_checklist[index].website_matchlist ==
                          undefined
                        "
                        >{{
                          user_seo_checklist[index][0].website_matchlist[2]
                        }}</span
                      >
                      <span class="keywords" v-else>{{
                        user_seo_checklist[index].website_matchlist[2]
                      }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- old table-->
              <!-- <div class="row seochecklist__thead g-0">
                <div class="col-2">
                  <span class="col-title">Website</span>
                  <button class="material-icons-outlined btn-orderby">arrow_upward</button>
                </div>
                <div class="col-2">
                  <span class="col-title">Category</span>
                  <button class="material-icons-outlined btn-orderby">arrow_upward</button>
                </div>
                <div class="col-2">
                  <span class="col-title">Match</span>
                  <button class="material-icons-outlined btn-orderby">arrow_upward</button>
                </div>
                <div class="col-4">
                  <span class="col-title">Element</span>
                  <button class="material-icons-outlined btn-orderby">arrow_upward</button>
                </div>
                <div class="col-1">
                  <span class="col-title">Keywords</span>
                  <button class="material-icons-outlined btn-orderby">arrow_upward</button>
                </div>
              </div>

              <div class="row seochecklist__tbody g-0" v-for="(details, index_website) in data.website_matchlist" :key="'website_matchlis' + index_website">
                <div class="col-2">
                  <span>{{ websiteName[index_website] }}</span>
                </div>
                <div class="col-2 border-left-grey">
                  <div class="full-row d-flex">
                    <span>Website</span>
                    <div class="seochecklist_healthbar progress">
                      <div class="progress-bar bg-green" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="full-row">
                    <span>{{ details[0] }}</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="full-row">
                    <span :key="'details1' + index_val" v-for="(val, index_val) in details[1][0]">{{ val }}</span>
                  </div>
                </div>
                <div class="col-2">
                  <div class="full-row">
                    <span :key="'details2' + index_val" v-for="(val, index_val) in details[2][0]">{{ val }}</span>
                  </div>
                </div>
              </div>

              <div class="row seochecklist__tbody g-0">
                <div class="col-2">
                  <span>Your Website</span>
                </div>
                <div class="col-2 border-left-grey">
                  <div class="full-row d-flex">
                    <span>Website</span>
                    <div class="seochecklist_healthbar progress">
                      <div class="progress-bar bg-green" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <div class="full-row">
                    <span v-if="user_seo_checklist[index].website_matchlist == undefined">{{ user_seo_checklist[index][0].website_matchlist[0] }}</span>

                    <span v-else>{{ user_seo_checklist[index].website_matchlist[0] }}</span>
                  </div>
                </div>
                <div class="col-4">
                  <div class="full-row">
                    <span v-if="user_seo_checklist[index].website_matchlist == undefined">{{ user_seo_checklist[index][0].website_matchlist[1] }}</span>

                    <span v-else>{{ user_seo_checklist[index].website_matchlist[1] }}</span>
                  </div>
                </div>
                <div class="col-2">
                  <div class="full-row">
                    <span v-if="user_seo_checklist[index].website_matchlist == undefined">{{ user_seo_checklist[index][0].website_matchlist[2] }}</span>

                    <span v-else>{{ user_seo_checklist[index].website_matchlist[2] }}</span>
                  </div>
                </div>
              </div> -->
            </div>

            <!-- list for img_alt-->

            <div v-if="index == 'img_alt'" class="seochecklist__table mt-5">
              <!-- inside a tab-->
              <div class="row seochecklist__thead g-0">
                <div class="col-2">
                  <span class="col-title">Image with alt</span>
                </div>
              </div>
              <!--list-->
              <div class="card p-2">
                <ol>
                  <li
                    style="word-break: break-all"
                    class="p-1"
                    v-for="(tr, index) in user_seo_checklist[index]
                      .list_of_images.imgwithalt"
                    :key="(tr, index)"
                  >
                    <a :href="tr" target="_blank">{{ tr }}</a>
                  </li>
                </ol>
              </div>

              <!-- inside a tab-->

              <div class="row seochecklist__thead g-0 mt-3">
                <div class="col-2">
                  <span class="col-title">Image without alt</span>
                </div>
              </div>
              <!--list-->
              <div class="card p-2">
                <ol>
                  <li
                    style="word-break: break-all"
                    class="p-1"
                    v-for="(tr, index) in user_seo_checklist[index]
                      .list_of_images.imgwithoutalt"
                    :key="(tr, index)"
                  >
                    <a>{{ tr }}</a>
                  </li>
                </ol>
              </div>

              <!-- inside a tab-->

              <div class="row seochecklist__thead g-0 mt-3">
                <div class="col-2">
                  <span class="col-title">Suggested Image alt</span>
                </div>
              </div>
              <!--list-->
              <div class="card p-2">
                <ol>
                  <li
                    class="p-1"
                    v-for="(tr, index) in seo_checklist[index]
                      .suggested_img_alt"
                    :key="(tr, index)"
                  >
                    <span>{{ tr }}</span>
                  </li>
                </ol>
              </div>
            </div>

            <!-- list for external_links and internal_links-->

            <div
              v-if="index == 'external_links' || index == 'internal_links'"
              class="seochecklist__table mt-5"
            >
              <!-- inside a tab-->
              <div class="row seochecklist__thead g-0">
                <div class="col-2">
                  <span class="col-title">Link Found</span>
                </div>
              </div>
              <!--single table-->
              <div class="card p-2">
                <table class="table" id="my-seo-table">
                  <thead>
                    <tr>
                      <th scope="col">Text</th>
                      <th scope="col">Link</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(tr, index) in user_seo_checklist[index]
                        .list_of_links"
                      :key="(tr, index)"
                    >
                      <td>
                        {{ tr.link_text }}
                      </td>
                      <td>
                        <a :href="tr" target="_blank">{{ tr.link_href }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- inside a tab-->
              <div class="row seochecklist__thead g-0 mt-3">
                <div class="col-2">
                  <span class="col-title">Suggested Anchor Text</span>
                </div>
              </div>
              <!--list-->
              <div class="card p-2">
                <ol>
                  <li
                    class="p-1"
                    v-for="(tr, index) in seo_checklist[index]
                      .suggested_anchor_text"
                    :key="(tr, index)"
                  >
                    <span>{{ tr }}</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "SeoChecklistTab",
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      seo_checklist: [],
      user_seo_checklist: [],
      websiteName: [],
      chosenAnalytics: [],
      chosenKey: "",
    };
  },
  methods: {
    viewSeoChecklistAnalytics(data, key) {
      var me = this;
      me.chosenAnalytics = data;
      me.chosenKey = key;

      this.$bvModal.show("modal-center-seo-checklist-analytics");
    },
    viewSeoChecklistAnalyticsSecond(data, key) {
      this.chosenAnalytics = data;
      this.chosenKey = key;

      this.$bvModal.show("modal-center-seo-checklist-analytics-second");
    },
  },

  created() {
    this.values = this.content.steps_data.step_1;

    const seo_checklist_result = this.values.find(
      (element) => element.slug === "seo_checklist"
    );
    if (seo_checklist_result != undefined) {
      this.seo_checklist = JSON.parse(seo_checklist_result.data);
      console.log(this.seo_checklist);

      this.websiteName = this.seo_checklist.domain;
      delete this.seo_checklist.domain;

      for (const [key, value] of Object.entries(this.seo_checklist)) {
        //

        var category = [];
        console.log(this.websiteName);
        this.websiteName.forEach((element) => {
          category.push(element);
        });

        var series = [];
        for (const [key_2, value_2] of Object.entries(value)) {
          //
          if (key_2 == "google_chars") {
            series.push({
              name: "Google Characters",
              data: value_2,
              content: this.seo_checklist[key].google,
            });
          }

          if (key_2 == "website_chars") {
            series.push({
              name: "Website Characters",
              data: value_2,
              content: this.seo_checklist[key].website,
            });
          }

          if (key_2 == "website_len") {
            series.push({
              name: "Website length",
              data: value_2,
              content: this.seo_checklist[key].website,
            });
          }

          if (key_2 == "website_words") {
            series.push({
              name: "Website Words",
              data: value_2,
              content: this.seo_checklist[key].website,
            });
          }
          if (key_2 == "number_of_links") {
            series.push({
              name: "Number of links",
              data: value_2,
              content: this.seo_checklist[key].suggested_anchor_text,
            });
          }
          if (key_2 == "number_of_images") {
            series.push({
              name: "Number of images",
              data: value_2,
              content: this.seo_checklist[key].suggested_img_alt,
            });
          }
          if (key_2 == "number_of_images_noalt") {
            series.push({
              name: "Number of images noalt",
              data: value_2,
              content: this.seo_checklist[key].suggested_img_alt,
            });
          }
        }

        var web_sorted = [];
        var google_sorted = [];
        var word_sorted = [];
        var link_sorted = [];

        for (const [key_2, value_2] of Object.entries(value)) {
          //
          if (key_2 == "google_chars") {
            google_sorted = [];
            value_2.forEach((element) => {
              google_sorted.push(element);
            });

            google_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].google_sorted = google_sorted;
          }

          if (key_2 == "website_len") {
            web_sorted = [];
            value_2.forEach((element) => {
              web_sorted.push(element);
            });

            web_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].web_sorted = web_sorted;
          }

          if (key_2 == "website_chars") {
            web_sorted = [];
            value_2.forEach((element) => {
              web_sorted.push(element);
            });

            web_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].web_sorted = web_sorted;
          }

          if (key_2 == "website_words") {
            word_sorted = [];
            value_2.forEach((element) => {
              word_sorted.push(element);
            });

            word_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].word_sorted = word_sorted;
          }

          if (key_2 == "number_of_links") {
            link_sorted = [];
            value_2.forEach((element) => {
              link_sorted.push(element);
            });

            link_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].link_sorted = link_sorted;
          }

          if (key_2 == "number_of_images") {
            //
            link_sorted = [];
            value_2.forEach((element, index_ele) => {
              //

              link_sorted.push(
                element +
                  this.seo_checklist[key].number_of_images_noalt[index_ele]
              );
            });

            link_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].link_sorted = link_sorted;

            //
          }

          if (key_2 == "number_of_images_noalt") {
            web_sorted = [];
            value_2.forEach((element) => {
              web_sorted.push(element);
            });

            web_sorted.sort(function (a, b) {
              return a - b;
            });

            this.seo_checklist[key].web_sorted = web_sorted;
          }
        }

        //
        console.log(category);

        if (key == "title" || key == "description" || key == "h1") {
          (this.seo_checklist[key].series = series),
            (this.seo_checklist[key].chartOptions = {
              chart: {
                type: "bar",
                height: 350,
                events: {
                  dataPointSelection: (series, seriesIndex, dataPointIndex) => {
                    ////

                    ////

                    this.show_element =
                      this.seo_checklist[key].series[
                        dataPointIndex.seriesIndex
                      ].content[dataPointIndex.dataPointIndex];
                    // this.$bvModal.show("modal-show-element");
                  },
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                  // distributed:true
                },
              },

              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              colors: ["#1976D2", "#80b1d3"],

              xaxis: {
                categories: category,
              },
              yaxis: {
                title: {
                  text: "Count",
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {},
            });
        } else if (key == "h2_h6" || key == "p") {
          //

          (this.seo_checklist[key].series = [series[0]]),
            (this.seo_checklist[key].chartOptions = {
              chart: {
                type: "bar",
                height: 350,
                events: {
                  dataPointSelection: (series, seriesIndex, dataPointIndex) => {
                    ////

                    ////

                    this.show_element =
                      this.seo_checklist[key].series[
                        dataPointIndex.seriesIndex
                      ].content[dataPointIndex.dataPointIndex];
                    // this.$bvModal.show("modal-show-element");
                  },
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                  // distributed:true
                },
              },
              annotations: {
                yaxis: [
                  {
                    y: web_sorted[3],
                    y2: web_sorted[6],
                    borderColor: "#000",
                    fillColor: "#1565C0",
                    label: {
                      borderColor: "#1565C0",
                      text:
                        `Website length Range` +
                        ` [ ` +
                        web_sorted[3] +
                        ` - ` +
                        web_sorted[6] +
                        ` ]`,
                    },
                  },
                ],
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              colors: ["#1976D2"],
              xaxis: {
                categories: category,
              },
              yaxis: {
                title: {
                  text: "Length",
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {},
            });

          (this.seo_checklist[key].seriesSecond = [series[1]]),
            (this.seo_checklist[key].chartOptionsSecond = {
              chart: {
                type: "bar",
                height: 350,
                events: {
                  dataPointSelection: (series, seriesIndex, dataPointIndex) => {
                    ////

                    ////

                    this.show_element =
                      this.seo_checklist[key].series[
                        dataPointIndex.seriesIndex
                      ].content[dataPointIndex.dataPointIndex];
                    //  this.$bvModal.show("modal-show-element");
                  },
                },
              },

              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                  // distributed:true
                },
              },
              annotations: {
                yaxis: [
                  {
                    y: word_sorted[3],
                    y2: word_sorted[6],
                    borderColor: "#000",
                    fillColor: "#b6defa",
                    label: {
                      borderColor: "#80b1d3",
                      text:
                        `Website Words Range` +
                        ` [ ` +
                        word_sorted[3] +
                        ` - ` +
                        word_sorted[6] +
                        ` ]`,
                    },
                  },
                ],
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              colors: ["#80b1d3"],

              xaxis: {
                categories: category,
              },
              yaxis: {
                title: {
                  text: "Words",
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {},
            });
        } else if (key == "internal_links" || key == "external_links") {
          //
          (this.seo_checklist[key].series = series),
            (this.seo_checklist[key].chartOptions = {
              chart: {
                type: "bar",
                height: 350,
                // events: {
                //   dataPointSelection: (
                //     series,
                //     seriesIndex,
                //     dataPointIndex
                //   ) => {
                //     ////

                //     ////

                //     this.show_element =
                //       this.seo_checklist[key].series[
                //         dataPointIndex.seriesIndex
                //       ].content[dataPointIndex.dataPointIndex];
                //     this.$bvModal.show("modal-show-element");
                //   },
                // },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                  // distributed:true
                },
              },
              annotations: {
                yaxis: [
                  {
                    y: link_sorted[3],
                    y2: link_sorted[6],
                    borderColor: "#000",
                    fillColor: "#1565C0",
                    label: {
                      borderColor: "#1565C0",
                      text:
                        `Link length Range` +
                        ` [ ` +
                        link_sorted[3] +
                        ` - ` +
                        link_sorted[6] +
                        ` ]`,
                    },
                  },
                ],
              },

              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              colors: ["#1976D2", "#80b1d3"],

              xaxis: {
                categories: category,
              },
              yaxis: {
                title: {
                  text: "Count",
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {},
            });

          //
        } else if (key == "img_alt") {
          (this.seo_checklist[key].series = series),
            (this.seo_checklist[key].chartOptions = {
              chart: {
                type: "bar",
                height: 350,
                events: {
                  dataPointSelection: (series, seriesIndex, dataPointIndex) => {
                    ////

                    ////

                    this.show_element =
                      this.seo_checklist[key].series[
                        dataPointIndex.seriesIndex
                      ].content[dataPointIndex.dataPointIndex];
                    //    this.$bvModal.show("modal-show-element");
                  },
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  endingShape: "rounded",
                  // distributed:true
                },
              },
              annotations: {
                yaxis: [
                  {
                    y: link_sorted[3],
                    y2: link_sorted[6],
                    borderColor: "#000",
                    fillColor: "#1565C0",
                    label: {
                      borderColor: "#1565C0",
                      text:
                        `Link length Range` +
                        ` [ ` +
                        link_sorted[3] +
                        ` - ` +
                        link_sorted[6] +
                        ` ]`,
                    },
                  },
                ],
              },

              dataLabels: {
                enabled: false,
              },
              stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
              },
              colors: ["#1976D2", "#80b1d3"],

              xaxis: {
                categories: category,
              },
              yaxis: {
                title: {
                  text: "Count",
                },
              },
              fill: {
                opacity: 1,
              },
              tooltip: {},
            });
        }
      }
    }

    const user_seo_checklist_result = this.values.find(
      (element) => element.slug === "user_seo_checklist"
    );

    if (user_seo_checklist_result != undefined) {
      this.user_seo_checklist = JSON.parse(user_seo_checklist_result.data);

      console.log(this.user_seo_checklist);

      //

      for (const [key, value] of Object.entries(this.user_seo_checklist)) {
        //
        if (key == "title" || key == "description") {
          this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

          ////

          var series = [];
          for (const [key_2, value_2] of Object.entries(value)) {
            if (key_2 == "google_chars") {
              // //
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Google Characters") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].google);
                }
              });
            }

            if (key_2 == "website_chars") {
              ////
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Website Characters") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }

            if (key_2 == "website_len") {
              //  //
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Website length") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }

            if (key_2 == "website_words") {
              //  //
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Website Words") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }
          }
        } else if (key == "h1") {
          //

          if (value.website == undefined) {
            this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

            var series = [];
            for (const [key_2, value_2] of Object.entries(value[0])) {
              //

              if (key_2 == "google_chars") {
                // //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Google Characters") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].google
                    );
                  }
                });
              }

              if (key_2 == "website_chars") {
                ////
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Characters") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }

              if (key_2 == "website_len") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website length") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }

              if (key_2 == "website_words") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Words") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }
            }
          } else {
            this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

            var series = [];
            for (const [key_2, value_2] of Object.entries(value)) {
              //

              if (key_2 == "google_chars") {
                // //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Google Characters") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].google);
                  }
                });
              }

              if (key_2 == "website_chars") {
                ////
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Characters") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }

              if (key_2 == "website_len") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website length") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }

              if (key_2 == "website_words") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Words") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }
            }
            //
          }
        } else if (key == "h2_h6") {
          if (value.website == undefined) {
            this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

            var series = [];
            for (const [key_2, value_2] of Object.entries(value[0])) {
              //

              if (key_2 == "google_chars") {
                // //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Google Characters") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].google
                    );
                  }
                });
              }

              if (key_2 == "website_chars") {
                ////
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Characters") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }

              if (key_2 == "website_len") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website length") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }

              if (key_2 == "website_words") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Words") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }
            }
          } else {
            this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

            var series = [];
            for (const [key_2, value_2] of Object.entries(value)) {
              //

              if (key_2 == "google_chars") {
                // //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Google Characters") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].google);
                  }
                });
              }

              if (key_2 == "website_chars") {
                ////
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Characters") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }

              if (key_2 == "website_len") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website length") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }

              if (key_2 == "website_words") {
                //
                this.seo_checklist[key].series.forEach((element) => {
                  if (element.name == "Website Words") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }
            }
            //
          }

          if (value.website == undefined) {
            this.seo_checklist[key].chartOptionsSecond.xaxis.categories.push(
              "You"
            );

            var series = [];
            for (const [key_2, value_2] of Object.entries(value[0])) {
              //

              if (key_2 == "google_chars") {
                // //
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Google Characters") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].google
                    );
                  }
                });
              }

              if (key_2 == "website_chars") {
                ////
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Website Characters") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }

              if (key_2 == "website_len") {
                //
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Website length") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }

              if (key_2 == "website_words") {
                //
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Website Words") {
                    element.data.push(value_2);
                    element.content.push(
                      this.user_seo_checklist[key][0].website
                    );
                  }
                });
              }
            }
          } else {
            this.seo_checklist[key].chartOptionsSecond.xaxis.categories.push(
              "You"
            );

            var series = [];
            for (const [key_2, value_2] of Object.entries(value)) {
              //

              if (key_2 == "google_chars") {
                // //
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Google Characters") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].google);
                  }
                });
              }

              if (key_2 == "website_chars") {
                ////
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Website Characters") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }

              if (key_2 == "website_len") {
                //
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Website length") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }

              if (key_2 == "website_words") {
                //
                this.seo_checklist[key].seriesSecond.forEach((element) => {
                  if (element.name == "Website Words") {
                    element.data.push(value_2);
                    element.content.push(this.user_seo_checklist[key].website);
                  }
                });
              }
            }
            //
          }
        } else if (key == "p") {
          this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

          ////

          var series = [];
          for (const [key_2, value_2] of Object.entries(value)) {
            if (key_2 == "google_chars") {
              // //
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Google Characters") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].google);
                }
              });
            }

            if (key_2 == "website_chars") {
              ////
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Website Characters") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }

            if (key_2 == "website_len") {
              //  //
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Website length") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }

            if (key_2 == "website_words") {
              //  //
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Website Words") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }
          }

          this.seo_checklist[key].chartOptionsSecond.xaxis.categories.push(
            "You"
          );

          ////

          var series = [];
          for (const [key_2, value_2] of Object.entries(value)) {
            if (key_2 == "google_chars") {
              // //
              this.seo_checklist[key].seriesSecond.forEach((element) => {
                if (element.name == "Google Characters") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].google);
                }
              });
            }

            if (key_2 == "website_chars") {
              ////
              this.seo_checklist[key].seriesSecond.forEach((element) => {
                if (element.name == "Website Characters") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }

            if (key_2 == "website_len") {
              //  //
              this.seo_checklist[key].seriesSecond.forEach((element) => {
                if (element.name == "Website length") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }

            if (key_2 == "website_words") {
              this.seo_checklist[key].seriesSecond.forEach((element) => {
                if (element.name == "Website Words") {
                  element.data.push(value_2);
                  element.content.push(this.user_seo_checklist[key].website);
                }
              });
            }
          }
        } else if (key == "internal_links" || key == "external_links") {
          this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

          var series = [];
          for (const [key_2, value_2] of Object.entries(value)) {
            if (key_2 == "number_of_links") {
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Number of links") {
                  element.data.push(value_2);
                  element.content.push(
                    this.user_seo_checklist[key].number_of_links
                  );
                }
              });
            }
          }
        } else if (key == "img_alt") {
          this.seo_checklist[key].chartOptions.xaxis.categories.push("You");

          var series = [];
          for (const [key_2, value_2] of Object.entries(value)) {
            if (key_2 == "number_of_images") {
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Number of images") {
                  element.data.push(value_2);
                  element.content.push(
                    this.user_seo_checklist[key].number_of_images
                  );
                }
              });
            }

            if (key_2 == "number_of_images_noalt") {
              this.seo_checklist[key].series.forEach((element) => {
                if (element.name == "Number of images noalt") {
                  element.data.push(value_2);
                  element.content.push(
                    this.user_seo_checklist[key].number_of_images_noalt
                  );
                }
              });
            }
          }
        } else if (key == "user_data_optimized_p") {
        }
      }
    }
    //console.log(this.seo_checklist);
  },
};
</script>

<style scoped>
/* ----- seo checklist css - start */
.bodyfix__content__seochecklist .seochecklist__dropdown__group {
  border: 1px solid #2c8de0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}
.bodyfix__content__seochecklist .seochecklist__dropdown__group:last-child {
  margin-bottom: 0rem;
}
.seochecklist__dropdown__title {
  padding: 1rem 1.5rem 1rem 1.5rem;
  transition: all 0.4s ease-out;
  user-select: none;
}
.seochecklist__dropdown__icon__left {
  margin-right: 1rem;
  line-height: 0px;
}
.seochecklist__dropdown__icon__left .seochecklist-icon {
  padding: 0 !important;
  margin: 0 !important;
}
.seochecklist__dropdown__icon__left .seochecklist-icon.tick::after {
  content: "check_circle";
  color: #4dae50;
  font-size: 54px;
}
.seochecklist__dropdown__icon__left .seochecklist-icon.warning::after {
  content: "error";
  color: #ff9900;
  font-size: 54px;
  text-align: start;
}
.seochecklist__dropdown__icon__left .seochecklist-icon.danger::after {
  content: "error";
  color: #d30000;
  font-size: 54px;
  text-align: start;
}

.seochecklist__dropdown__title__left {
  display: flex;
  flex-direction: column;
  text-align: start;
  align-items: start;
}
.seochecklist__dropdown__title__left .title {
  margin-right: 1rem;
  color: #183b1c;
  font-size: 20px;
  min-width: 220px;
  font-weight: 600;
  user-select: none;
}
.seochecklist__dropdown__title__left .description {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.seochecklist__dropdown__title__right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.seochecklist__dropdown__title__right .btn-analytics {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.seochecklist__dropdown__title__right
  .btn-arrow-icon[aria-expanded="false"]
  .arrow-icon {
  transform: rotate(0deg);
  transition: 0.4s ease-out;
  color: #2c8de0;
}
.seochecklist__dropdown__title__right
  .btn-arrow-icon[aria-expanded="true"]
  .arrow-icon {
  transform: rotate(180deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.seochecklist__dropdown__content {
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #2c8de0;
}
.seochecklist__card {
  /* max-width: 50%; */
  height: 100%;
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 10px;
}

.seochecklist__card.green {
  background-color: #edf6ec;
  color: #236b2b;
}
.seochecklist__card.red {
  background-color: #ffe5e5;
  color: #c84d4d;
}

.seochecklist__card.yellow {
  background-color: #f4e0c6;
  color: #9e5e05;
}
/* table */
.seochecklist__table {
  margin-top: 1.5rem;
}
.seochecklist__thead {
  font-weight: bold;
  padding-bottom: 0.8rem;
  color: #404040;
  border-bottom: 2px solid #2c8de0;
}
.seochecklist__thead .col-1,
.seochecklist__thead .col-2,
.seochecklist__thead .col-3,
.seochecklist__thead .col-4 {
  display: flex;
  align-items: center;
}
.seochecklist__thead .col-title {
  padding-left: 0.8rem;
}
.seochecklist__thead .material-icons-outlined {
  color: #2c8de0;
  margin-left: 0.2rem;
}
.seochecklist__tbody {
  border-left: 2px solid #888;
  border-right: 2px solid #888;
  border-bottom: 2px solid #888;
}
.border-left-grey {
  border-left: 1px solid #888;
}
.seochecklist__tbody .col-2:first-child {
  padding: 0.8rem;
}
.seochecklist__tbody:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.sub-row-1 {
  border-bottom: 1px solid #888;
  display: flex;
  align-items: start;
  padding: 0.8rem;
  height: 50%;
}

.sub-row-2 {
  display: flex;
  align-items: start;
  padding: 0.8rem;
  height: 50%;
}

.full-row {
  display: flex;
  align-items: start;
  padding: 0.8rem;
  height: 100%;
}
.seochecklist_healthbar.progress {
  margin-left: auto;
  width: 50%;
  height: 10px;
}
.seochecklist_healthbar.progress .progress-bar.bg-green {
  background-color: #4caf50;
}
.seochecklist_healthbar.progress .progress-bar.bg-yellow {
  background-color: #af8400;
}
.seochecklist_healthbar.progress .progress-bar.bg-red {
  background-color: #c75252;
}

/* ----- seo checklist css - end */
.col-11percent {
  min-height: 1px;
  padding-right: 5px;
  padding-left: 5px;
  width: 11% !important;
  float: left;
}
.fs-12px {
  font-size: 12px;
}
.btn-arrow-icon {
  border-radius: 50% !important;
}

/* Nextable table aiseoautomation */
.nextable__AiSeoAutomation {
  width: 100%;
}
.nextable__AiSeoAutomation thead {
  border-bottom: 2px solid #2c8de0;
}
.nextable__AiSeoAutomation thead tr {
  color: #404040;
}
.nextable__AiSeoAutomation tbody {
  border: 2px solid #888888;
  border-top: none;
  font-size: 15px;
}
/* .nextable__AiSeoAutomation tbody:last-child {
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
} */
.nextable__AiSeoAutomation tbody tr {
  vertical-align: text-top;
}
.br-grey {
  border-right: 1px solid #888888;
}
.bb-grey {
  border-bottom: 1px solid #888888;
}
.nextable__AiSeoAutomation tr th,
.nextable__AiSeoAutomation tr td {
  padding: 0.5rem;
}
.nowrap {
  white-space: nowrap;
}
.keywords {
  color: #404040;
  display: inline-block;
  background-color: #e8e8e8;
  padding: 0.1rem 0.6rem;
  border-radius: 20px;
  margin-bottom: 0.3rem !important;
  margin-right: 0.3rem !important;
}
.keywords_string {
  padding: 0 0.6rem !important;
  border-radius: 20px;
  color: #404040;
  display: inline-block;
  background-color: #e8e8e8;
  margin-bottom: 0.3rem !important;
}
/* .keywords_string {
  color: #404040;
  display: inline-block;
  background-color: #e8e8e8;
  margin-bottom: 0.3rem !important;
}
.keywords_string:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding-left: 0.6rem;
}
.keywords_string:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-right: 0.6rem;
} */
</style>
