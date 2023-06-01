<template>
  <div>
    <b-modal
      id="modal-action-optimise"
      size="xl"
      centered
      hide-footer
      hide-header
    >
      <div class="p-1">
        <h3 class="modal-card__title text-center">Optimise</h3>
        <form class="card__inputbody">
          <!-- Keyword -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Keyword
              <span
                v-b-tooltip.hover.right="{ variant: 'dark' }"
                title="Target URL"
                class="material-icons-outlined"
                >help_outline</span
              >
            </span>

            <div
              v-if="nexautomate_data_keywords.length != 0"
              class="card_inputgroup__input input-group"
            >
              <select
                @change="choose_others"
                class="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                v-model="nexautomate_data_keyword"
                v-validate="'required'"
                name="keyword"
              >
                <option
                  :value="val"
                  :key="index"
                  v-for="(val, index) in nexautomate_data_keywords"
                >
                  {{ val }}
                </option>
              </select>
            </div>

            <div v-else class="card_inputgroup__input input-group">
              <input
                type="text"
                class="form-control rounded"
                aria-label="Topic Name"
                aria-describedby="Topic Name"
                v-model="nexautomate_data_keyword"
                v-validate="'required'"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('keyword')"
                >{{ errors.first("keyword") }}</span
              >
            </div>
          </div>

          <!-- Other keyword -->
          <div class="card_inputgroup" v-if="showOthers == true">
            <span class="card_inputgroup__title">
              Other keyword:
              <span
                v-b-tooltip.hover.right="{ variant: 'dark' }"
                title="Target URL"
                class="material-icons-outlined"
                >help_outline</span
              >
            </span>
            <div
              v-if="showOthers == true"
              class="card_inputgroup__input input-group"
            >
              <input
                type="text"
                class="form-control rounded"
                aria-label="Topic Name"
                aria-describedby="Topic Name"
                v-model="nexautomate_data_otherKeyword"
                v-validate="'required'"
                name="keyword"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('keyword')"
                >{{ errors.first("keyword") }}</span
              >
            </div>
          </div>

          <!-- Target URL -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Target URL (opt)
              <span
                v-b-tooltip.hover.right="{ variant: 'dark' }"
                title="Target URL"
                class="material-icons-outlined"
                >help_outline</span
              >
            </span>
            <div
              v-if="nexautomate_data_urls.length != 0"
              class="card_inputgroup__input input-group"
            >
              <select
                class="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                v-model="nexautomate_data_url"
                v-validate="'required'"
                name="urls"
              >
                <option
                  :value="val"
                  :key="index"
                  v-for="(val, index) in nexautomate_data_urls"
                >
                  {{ val }}
                </option>
              </select>
            </div>

            <div v-else class="card_inputgroup__input input-group">
              <input
                type="text"
                class="form-control rounded"
                aria-label="Topic Name"
                aria-describedby="Topic Name"
                v-model="nexautomate_data_url"
                v-validate="{ required: true, url: { require_protocol: true } }"
                name="url"
              />
              <span class="text-danger text-sm" v-show="errors.has('url')">{{
                errors.first("url")
              }}</span>
            </div>
          </div>

          <!-- Language -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Language

              <!-- <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Language"
            class="material-icons-outlined"
            >help_outline</span
          > -->
            </span>
            <div class="card_inputgroup__input input-group">
              <select
                class="form-select rounded"
                aria-label="Language"
                v-model="nexautomate_data_language"
                name="language"
                v-validate="'required'"
              >
                <optgroup
                  :key="index"
                  v-for="(item, index) in languages"
                  :label="item.label"
                >
                  <option
                    :value="lan.value"
                    :key="index_lan"
                    v-for="(lan, index_lan) in item.languageOption"
                  >
                    {{ lan.name }}
                  </option>
                </optgroup>
              </select>

              <span
                class="text-danger text-sm"
                v-show="errors.has('language')"
                >{{ errors.first("language") }}</span
              >
            </div>
          </div>

          <!-- Target SEO Location -->
          <div class="card_inputgroup">
            <span class="card_inputgroup__title">
              Target SEO Location<span
                v-b-tooltip.hover.right="{ variant: 'dark' }"
                title="Tone of Voice"
                class="material-icons-outlined"
              ></span>
            </span>
            <div class="card_inputgroup__input input-group">
              <select
                class="form-select rounded"
                aria-label="location"
                v-model="nexautomate_data_location_id"
                v-validate="'required'"
              >
                <option
                  :value="loc.id"
                  :key="index"
                  v-for="(loc, index) in locations"
                >
                  {{ loc.name | loc }}
                </option>
              </select>
                <span class="text-danger text-sm" v-show="errors.has('location')">{{
              errors.first("location")
            }}</span>
            </div>

            <!-- <span class="card_inputgroup__title">
              Target SEO Location
            <span
            v-b-tooltip.hover.right="{ variant: 'dark' }"
            title="Target SEO Location"
            class="material-icons-outlined"
            >help_outline</span
          > 
            </span>
            <div class="card_inputgroup__radio input-group">
              <div
                class="form-check"
                :key="index"
                v-for="(loc, index) in locations"
              >
                <input
                  v-model="nexautomate_data_location_id"
                  class="form-check-input"
                  type="radio"
                  name="location"
                  :id="loc.id"
                  :value="loc.id"
                  v-validate="'required'"
                />
                <label class="form-check-label" :for="loc.id">{{
                  loc.name | loc
                }}</label>
              </div>
            </div>
            <span class="text-danger text-sm" v-show="errors.has('location')">{{
              errors.first("location")
            }}</span> -->
          </div>
        </form>

        <div class="card-text d-flex mt-2">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-action-optimise')"
          >
            Cancel
          </button>
          <button class="btn btn-primary ms-2" @click="addNexautomate()">
            Optimize
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal id="modal-center-delete-task" centered hide-footer hide-header>
      <div class="card-body">
        <strong class="card-title">Dismiss/Done</strong>

        <div class="card-text mt-1">
          <span>Are you sure?</span>
        </div>

        <div class="card-text d-flex mt-2">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-center-delete-task')"
          >
            Cancel
          </button>
          <button class="btn btn-primary ms-2" @click="changeValue">Yes</button>
        </div>
      </div>
    </b-modal>

    <div class="page-wrapper-lg">
      <!-- Route -->
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button
            @click="$router.go(-1)"
            class="material-icons-outlined btn-back"
          >
            arrow_back
          </button>
          <router-link to="/dashboard" class="route__link"
            >Dashboard</router-link
          >
          /
          <router-link to="/enterprise_seo/table/view_all" class="route__link"
            >Enterprise SEO</router-link
          >
          /
          <router-link
            :to="{
              name: 'enterprise_seo',
              params: { id: campaign.id },
            }"
            class="route__link"
            >{{ campaign.title }}</router-link
          >
          / All Tasks
        </p>
      </div>

      <div v-if="!showCrawl" class="d-flex">
        <h2 class="text-darkgreen">Campaign Name</h2>
        <div class="ms-auto">
          <button @click="reCrawl()" class="btn btn-primary-outlined">
            Re-Crawl
          </button>
          <router-link
            :to="{
              name: 'enterprise_seo_page_analysis',
            }"
            class="btn btn-primary-outlined ms-2"
            >Get Speed Analysis</router-link
          >
        </div>
      </div>

      <div v-if="showCrawl" class="row mt-3">
        <div class="col text-center">
          <h6>{{ Percentage }} %</h6>
        </div>
      </div>

      <div class="nexcard" v-if="showCrawl">
        <div class="row mt-3" v-if="showCrawl">
          <div class="col-12 col-md-12 col-lg-2"></div>
          <div class="col-12 col-md-12 col-lg-8">
            <k-progress
              :showText="false"
              activeColor="#AA22E9"
              :border="true"
              :lineHeight="20"
              :cutWidth="100"
              color="rgb(33, 186, 233)"
              bgColor="#ddd"
              type="line"
              active
              :percent="Percentage"
            >
            </k-progress>
          </div>
          <div class="col-12 col-md-12 col-lg-2"></div>
        </div>

        <div v-if="showCrawl" class="row mt-3">
          <div class="col text-center">
            <span>Re-Crawl is in progress, please wait for the update</span>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="mt-5">
          <span
            :class="item.state"
            @click="selectCategory(item.name)"
            v-for="(item, index) in tab__options"
            :key="'category' + index"
          >
            {{ item.name }}
          </span>
        </div>

        <!-- <section class="page__metrics__section">
        <div class="page__metrics__title row pt-3">
          <h4 class="text-darkgreen mb-3">All Tasks</h4>
        </div>
        <div class="page__metrics__cards row pt-2 pb-3">
          <div class="col-2" v-for="card in Nexcard_Metrics" :key="card">
            <div class="nexcard-metrics">
              <div class="card__topwrapper">
                <span class="card__title">{{ card.name }}</span>
                <span class="material-icons-outlined icon__tooltip" v-b-tooltip.hover.top.v-primary="'Tooltip!'"> help_outline </span>
              </div>
              <div class="card__bottomwrapper">
                <img :src="require(`@/assets/icons/${card.icon}.svg`)" />
                <h3>00</h3>
                <span class="material-icons-outlined icon__view-more"> arrow_forward </span>
              </div>
            </div>
          </div>
        </div>
      </section> -->

        <section class="page__fixes__section mt-5">
          <div class="nexcard mb-5" v-if="showCriticalTasks">
            <h4 class="text-darkgreen mb-3">Critical</h4>

            <div
              class="dropdown__group"
              :key="index"
              v-for="(tr, index) in showStructure"
              v-show="
                tr.probdismis != 100 &&
                tr.probdismis != 100.0 &&
                tr.probdismis != '100.00' &&
                tr.type == 'critical'
              "
            >
              <div
                class="dropdown__title d-flex"
                type="button"
                v
                v-b-toggle="'dropdown__critical-' + index"
              >
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ tr.title }}</span>
                    <span class="badge critical">{{ tr.type }}</span>
                  </div>

                  <span class="description">{{ tr.description }}</span>
                </div>
                <div class="dropdown__title__right">
                  <!-- <span class="date">Date 2023</span> -->
                  <span class="arrow-icon material-icons-outlined ms-3 p-0"
                    >expand_more</span
                  >
                </div>
              </div>

              <b-collapse :id="'dropdown__critical-' + index">
                <div class="dropdown__content pt-4">
                  <div class="nexcard-inner">
                    <table class="table" id="my-table">
                      <thead>
                        <tr>
                          <th
                            v-for="(title, index_title) in tr.table_title"
                            :key="(title, index_title)"
                            v-show="
                              title != 'mark_as_done' && title != 'dismiss'
                            "
                          >
                            {{ title | capitalize }}
                          </th>
                          <th class="col action"><p>Other Action</p></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(details, index2) in tr.data"
                          :key="(details, index2)"
                        >
                          <td
                            v-for="(detail, index3) in details"
                            :key="(detail, index3)"
                            v-show="
                              details.dismiss == false &&
                              details.mark_as_done == false &&
                              index3 != 'optimized' &&
                              index3 != 'complete_percentage' &&
                              index3 != 'dismiss' &&
                              index3 != 'mark_as_done'
                            "
                          >
                            <div
                              v-if="index3 == 'nexautomate' && detail == false"
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && detail == false
                              "
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div v-else-if="typeof detail == 'object'">
                              <ul
                                class="mb-2"
                                :key="index4"
                                v-for="(tr3, index4) in detail"
                              >
                                <li>{{ tr3 }}</li>
                              </ul>
                            </div>

                            <div v-else>
                              <span>
                                {{ detail }}
                              </span>
                            </div>
                          </td>

                          <td
                            v-if="
                              details.dismiss == false &&
                              details.mark_as_done == false
                            "
                          >
                            <div class="col action">
                              <div class="action-menu">
                                <button class="text-center">
                                  <span
                                    class="btn-action material-icons-outlined"
                                    >more_horiz</span
                                  >
                                </button>
                                <div class="action-menu-dropdown">
                                  <span
                                    @click="
                                      changeStatus(
                                        index,
                                        index2,
                                        'mark_as_done'
                                      )
                                    "
                                    class="done"
                                    ><span class="material-icons-outlined"
                                      >done</span
                                    >Mark as Done</span
                                  >
                                  <span
                                    @click="
                                      changeStatus(index, index2, 'dismiss')
                                    "
                                    class="dismiss"
                                    ><span class="material-icons-outlined"
                                      >close</span
                                    >Dismiss</span
                                  >
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
          <div class="nexcard mb-5" v-if="showWarningTasks">
            <h4 class="text-darkgreen mb-3">Warning</h4>

            <div
              class="dropdown__group"
              :key="index"
              v-for="(tr, index) in showStructure"
              v-show="
                tr.probdismis != 100 &&
                tr.probdismis != 100.0 &&
                tr.probdismis != '100.00' &&
                tr.type == 'warning'
              "
            >
              <div
                class="dropdown__title d-flex"
                type="button"
                v
                v-b-toggle="'dropdown__warning-' + index"
              >
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ tr.title }}</span>
                    <span class="badge warning">{{ tr.type }}</span>
                  </div>

                  <span class="description">{{ tr.description }}</span>
                </div>
                <div class="dropdown__title__right">
                  <!-- <span class="date">Date 2023</span> -->
                  <span class="arrow-icon material-icons-outlined ms-3 p-0"
                    >expand_more</span
                  >
                </div>
              </div>

              <b-collapse :id="'dropdown__warning-' + index">
                <div class="dropdown__content pt-4">
                  <div class="nexcard-inner">
                    <table class="table" id="my-table">
                      <thead>
                        <tr>
                          <th
                            v-for="(title, index_title) in tr.table_title"
                            :key="(title, index_title)"
                            v-show="
                              title != 'mark_as_done' && title != 'dismiss'
                            "
                          >
                            {{ title | capitalize }}
                          </th>
                          <th class="col action"><p>Other Action</p></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(details, index2) in tr.data"
                          :key="(details, index2)"
                        >
                          <td
                            v-for="(detail, index3) in details"
                            :key="(detail, index3)"
                            v-show="
                              details.dismiss == false &&
                              details.mark_as_done == false &&
                              index3 != 'optimized' &&
                              index3 != 'complete_percentage' &&
                              index3 != 'dismiss' &&
                              index3 != 'mark_as_done'
                            "
                          >
                            <div
                              v-if="index3 == 'nexautomate' && detail == false"
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && detail == false
                              "
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div v-else-if="typeof detail == 'object'">
                              <ul
                                class="mb-2"
                                :key="index4"
                                v-for="(tr3, index4) in detail"
                              >
                                <li>{{ tr3 }}</li>
                              </ul>
                            </div>

                            <div v-else>
                              <span>
                                {{ detail }}
                              </span>
                            </div>
                          </td>

                          <td
                            v-if="
                              details.dismiss == false &&
                              details.mark_as_done == false
                            "
                          >
                            <div class="col action">
                              <div class="action-menu">
                                <button class="text-center">
                                  <span
                                    class="btn-action material-icons-outlined"
                                    >more_horiz</span
                                  >
                                </button>
                                <div class="action-menu-dropdown">
                                  <span
                                    @click="
                                      changeStatus(
                                        index,
                                        index2,
                                        'mark_as_done'
                                      )
                                    "
                                    class="done"
                                    ><span class="material-icons-outlined"
                                      >done</span
                                    >Mark as Done</span
                                  >
                                  <span
                                    @click="
                                      changeStatus(index, index2, 'dismiss')
                                    "
                                    class="dismiss"
                                    ><span class="material-icons-outlined"
                                      >close</span
                                    >Dismiss</span
                                  >
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
          <div class="nexcard mb-5" v-if="showInfoTasks">
            <h4 class="text-darkgreen mb-3">Information</h4>

            <div
              class="dropdown__group"
              :key="index"
              v-for="(tr, index) in showStructure"
              v-show="
                tr.probdismis != 100 &&
                tr.probdismis != 100.0 &&
                tr.probdismis != '100.00' &&
                tr.type == 'info'
              "
            >
              <div
                class="dropdown__title d-flex"
                type="button"
                v
                v-b-toggle="'dropdown__information-' + index"
              >
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ tr.title }}</span>
                    <span class="badge information">{{ tr.type }}</span>
                  </div>

                  <span class="description">{{ tr.description }}</span>
                </div>
                <div class="dropdown__title__right">
                  <!-- <span class="date">Date 2023</span> -->
                  <span class="arrow-icon material-icons-outlined ms-3 p-0"
                    >expand_more</span
                  >
                </div>
              </div>

              <b-collapse :id="'dropdown__information-' + index">
                <div class="dropdown__content pt-4">
                  <div class="nexcard-inner">
                    <table class="table" id="my-table">
                      <thead>
                        <tr>
                          <th
                            v-for="(title, index_title) in tr.table_title"
                            :key="(title, index_title)"
                            v-show="
                              title != 'mark_as_done' && title != 'dismiss'
                            "
                          >
                            {{ title | capitalize }}
                          </th>
                          <th class="col action"><p>Other Action</p></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(details, index2) in tr.data"
                          :key="(details, index2)"
                        >
                          <td
                            v-for="(detail, index3) in details"
                            :key="(detail, index3)"
                            v-show="
                              details.dismiss == false &&
                              details.mark_as_done == false &&
                              index3 != 'optimized' &&
                              index3 != 'complete_percentage' &&
                              index3 != 'dismiss' &&
                              index3 != 'mark_as_done'
                            "
                          >
                            <div
                              v-if="index3 == 'nexautomate' && detail == false"
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && detail == false
                              "
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div v-else-if="typeof detail == 'object'">
                              <ul
                                class="mb-2"
                                :key="index4"
                                v-for="(tr3, index4) in detail"
                              >
                                <li>{{ tr3 }}</li>
                              </ul>
                            </div>

                            <div v-else>
                              <span>
                                {{ detail }}
                              </span>
                            </div>
                          </td>

                          <td
                            v-if="
                              details.dismiss == false &&
                              details.mark_as_done == false
                            "
                          >
                            <div class="col action">
                              <div class="action-menu">
                                <button class="text-center">
                                  <span
                                    class="btn-action material-icons-outlined"
                                    >more_horiz</span
                                  >
                                </button>
                                <div class="action-menu-dropdown">
                                  <span
                                    @click="
                                      changeStatus(
                                        index,
                                        index2,
                                        'mark_as_done'
                                      )
                                    "
                                    class="done"
                                    ><span class="material-icons-outlined"
                                      >done</span
                                    >Mark as Done</span
                                  >
                                  <span
                                    @click="
                                      changeStatus(index, index2, 'dismiss')
                                    "
                                    class="dismiss"
                                    ><span class="material-icons-outlined"
                                      >close</span
                                    >Dismiss</span
                                  >
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
          <div class="nexcard mb-5" v-if="showCompleted">
            <h4 class="text-darkgreen mb-3">Completed</h4>

            <div
              class="dropdown__group"
              :key="index"
              v-for="(tr, index) in showStructure"
              v-show="
                tr.prob != null &&
                tr.prob != 0 &&
                tr.prob != 0.0 &&
                tr.prob != '0.00'
              "
            >
              <div
                class="dropdown__title d-flex"
                type="button"
                v
                v-b-toggle="'dropdown__completed-' + index"
              >
                <div class="dropdown__title__left">
                  <div class="d-flex">
                    <span class="title"> {{ tr.title }}</span>
                    <span class="badge completed">{{ tr.type }}</span>
                  </div>

                  <span class="description">{{ tr.description }}</span>
                </div>
                <div class="dropdown__title__right">
                  <!-- <span class="date">Date 2023</span> -->
                  <span class="arrow-icon material-icons-outlined ms-3 p-0"
                    >expand_more</span
                  >
                </div>
              </div>

              <b-collapse :id="'dropdown__completed-' + index">
                <div class="dropdown__content pt-4">
                  <div class="nexcard-inner">
                    <table class="table" id="my-table">
                      <thead>
                        <tr>
                          <th
                            v-for="(title, index_title) in tr.table_title"
                            :key="(title, index_title)"
                            v-show="
                              title != 'mark_as_done' && title != 'dismiss'
                            "
                          >
                            {{ title | capitalize }}
                          </th>
                          <th class="col action"><p>Other Action</p></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(details, index2) in tr.data"
                          :key="(details, index2)"
                        >
                          <td
                            v-for="(detail, index3) in details"
                            :key="(detail, index3)"
                            v-show="
                              details.dismiss == false &&
                              details.mark_as_done == true &&
                              index3 != 'optimized' &&
                              index3 != 'complete_percentage' &&
                              index3 != 'dismiss' &&
                              index3 != 'mark_as_done'
                            "
                          >
                            <div
                              v-if="index3 == 'nexautomate' && detail == false"
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && detail == false
                              "
                            >
                              none
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && details.optimized
                              "
                            >
                              <button
                                v-if="details.complete_percentage >= 100"
                                class="btn btn-outline-success"
                                @click="viewResultComplete(details)"
                              >
                                Result
                              </button>

                              <button
                                v-else
                                disabled
                                class="btn btn-outline-warning"
                              >
                                Progress
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'seo automation' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div
                              v-else-if="
                                index3 == 'nexautomate' && !details.optimized
                              "
                            >
                              <button
                                class="btn btn-primary-outlined"
                                @click="nexautomate(details)"
                              >
                                Optimize
                              </button>
                            </div>

                            <div v-else-if="typeof detail == 'object'">
                              <ul
                                class="mb-2"
                                :key="index4"
                                v-for="(tr3, index4) in detail"
                              >
                                <li>{{ tr3 }}</li>
                              </ul>
                            </div>

                            <div v-else>
                              <span>
                                {{ detail }}
                              </span>
                            </div>
                          </td>

                          <td v-if="details.mark_as_done == true">
                            <div class="col action">
                              <div class="action-menu">
                                <button class="text-center">
                                  <span
                                    class="btn-action material-icons-outlined"
                                    >more_horiz</span
                                  >
                                </button>
                                <div class="action-menu-dropdown">
                                  <span
                                    @click="
                                      changeStatus(index, index2, 'dismiss')
                                    "
                                    class="dismiss"
                                    ><span class="material-icons-outlined"
                                      >close</span
                                    >Dismiss</span
                                  >
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
          <div class="nexcard mb-5" v-if="showOptimizedUrls">
            <h4 class="text-darkgreen mb-3">Optimized URLs</h4>

            <div class="nexcard-inner">
              <div class="nextable">
                <!-- Table Head -->
                <div class="nextable__head p-2">
                  <div class="row g-0">
                    <div class="col-9"><p>Url</p></div>

                    <div class="col-3"><p>AI SEO Automation</p></div>
                  </div>
                </div>

                <!-- Table Body -->
                <div class="nextable__body">
                  <div
                    class="row g-0 p-2"
                    :key="index"
                    v-for="(tr, index) in seoAutoCamp"
                  >
                    <div class="col-9">
                      <p>{{ tr.url }}</p>
                    </div>

                    <div class="col-3">
                      <button
                        v-if="tr.complete_percentage >= 100"
                        class="btn btn-outline-success"
                        @click="viewResult(tr)"
                      >
                        Result
                      </button>

                      <button v-else disabled class="btn btn-outline-warning">
                        Progress
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Enterprise from "@/store/Enterprise.js";
export default {
  components: {},
  data() {
    return {
      n: 1,
      tab__options: [
        { name: "Total Pending Tasks", state: "pill-tabs active" },
        { name: "Critical Tasks", state: "pill-tabs " },
        { name: "Warning Tasks", state: "pill-tabs " },
        { name: "Info Tasks", state: "pill-tabs" },
        { name: "Completed", state: "pill-tabs" },
        { name: "Optimized Urls", state: "pill-tabs" },
      ],
      completeDuration: null,
      duration: null,
      timer: null,
      Percentage: 10,
      showCriticalTasks: true,
      showWarningTasks: true,
      showInfoTasks: true,
      showCompleted: true,
      showOptimizedUrls: true,
      component: "Total Pending Tasks",
      pageTitle: "",
      pageDesc: "",
      pageData: [],
      valueToSend: [],
      summary: [],
      links_breakdown: [],
      value: [],
      page: "",
      campaign: [],
      StructuredData: [],
      showStructure: [],
      topQueryAll: [],
      topQuery: [],
      fullPage: 0,
      selectedLength: 5,
      SortLength: [5, 10, 20, 50],
      pageCurrent: 1,
      AllQuery: [],
      search_keyword: "",
      value_to_send: [],
      index_to_change: [],

      nexautomate_data_keywords: [],
      nexautomate_data_keyword: "",
      nexautomate_data_url: "",
      nexautomate_data_language: "",
      nexautomate_data_location_id: "",
      nexautomate_data_urls: [],
      nexautomate_data_otherKeyword: "",

      seoAutoCamp: [],
      optimized: [],
      locations: JSON.parse(localStorage.locations),
      showOthers: false,
      location: "",
      keyword: "",
      showCrawl: false,
      language: [],
      languages: [
        {
          label: "General",
          languageOption: [{ name: "English", value: "en" }],
        },
        {
          label: "Southeast Asia",
          languageOption: [
            { name: "Bahasa Malaysia", value: "ms" },
            { name: "Filipino", value: "tl" },
            { name: "Vietnamese", value: "vi" },
            { name: "Indonesian", value: "id" },
          ],
        },
        {
          label: "East Asia",
          languageOption: [
            { name: "Chinese (Simplified)", value: "zh-CN" },

            { name: "Japanese", value: "ja" },
          ],
        },
        {
          label: "West Asia",
          languageOption: [{ name: "العربية", value: "ar" }],
        },
        {
          label: "Europe",
          languageOption: [
            { name: "Italian", value: "it" },
            { name: "French", value: "fr" },
            { name: "German", value: "de" },
            { name: "Portuguese ", value: "pt" },
            { name: "Spanish", value: "es" },
          ],
        },
      ],
    };
  },
  methods: {
    selectCategory(data) {
      this.tab__options.forEach((element) => {
        if (element.name === data) {
          element.state = "pill-tabs active";
        } else {
          element.state = "pill-tabs";
        }
      });
      this.component = data;

      if (data == "Total Pending Tasks") {
        (this.showCriticalTasks = true),
          (this.showWarningTasks = true),
          (this.showInfoTasks = true),
          (this.showCompleted = true),
          (this.showOptimizedUrls = true);
      } else if (data == "Critical Tasks") {
        (this.showCriticalTasks = true),
          (this.showWarningTasks = false),
          (this.showInfoTasks = false),
          (this.showCompleted = false),
          (this.showOptimizedUrls = false);
      } else if (data == "Warning Tasks") {
        (this.showCriticalTasks = false),
          (this.showWarningTasks = true),
          (this.showInfoTasks = false),
          (this.showCompleted = false),
          (this.showOptimizedUrls = false);
      } else if (data == "Info Tasks") {
        (this.showCriticalTasks = false),
          (this.showWarningTasks = false),
          (this.showInfoTasks = true),
          (this.showCompleted = false),
          (this.showOptimizedUrls = false);
      } else if (data == "Optimized Urls") {
        (this.showCriticalTasks = false),
          (this.showWarningTasks = false),
          (this.showInfoTasks = false),
          (this.showCompleted = false),
          (this.showOptimizedUrls = true);
      } else if (data == "Completed") {
        (this.showCriticalTasks = false),
          (this.showWarningTasks = false),
          (this.showInfoTasks = false),
          (this.showCompleted = true),
          (this.showOptimizedUrls = false);
      }
    },
    choose_others() {
      if (this.nexautomate_data_keyword == "others") {
        this.showOthers = true;
      } else {
        this.showOthers = false;
      }
    },
    reCrawl() {
      Enterprise.reIndex(this.$route.params.id)
        .then((response) => {
          //
          this.$toast.success("The result will be updated soon");

          // this.$bvToast.toast("The result will be updated soon", {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          Enterprise.fetchData(this.$route.params.id, 1).then((response) => {
            this.timerCalculation(response.data.data);
          });
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    },
    timerCalculation(data) {
      //

      this.showCrawl = true;

      console.log(data);

      var created = new Date(data.reIndexCapmaign.created_at);

      this.completeDuration = 300000;
      this.duration =
        300000 -
        moment
          .duration(
            moment(new Date(created.getTime() + 5 * 60000)).diff(
              moment(new Date())
            )
          )
          .as("milliseconds");

      this.Percentage = ((this.duration / this.completeDuration) * 100).toFixed(
        2
      );

      this.timer = setInterval(() => {
        Enterprise.fetchData(this.$route.params.id, 1).then((response) => {
          //

          if (response.data.data.reIndexCapmaign.complete_percentage >= 100) {
            clearInterval(this.timer);
            location.reload();
          } else if (this.Percentage >= 100) {
            this.Percentage = 100;
          } else {
            var created = new Date(
              response.data.data.reIndexCapmaign.created_at
            );

            this.completeDuration = 300000;
            this.duration =
              300000 -
              moment
                .duration(
                  moment(new Date(created.getTime() + 5 * 60000)).diff(
                    moment(new Date())
                  )
                )
                .as("milliseconds");

            this.Percentage = (
              (this.duration / this.completeDuration) *
              100
            ).toFixed(2);
          }
        });
      }, 20000);
    },
    pageAnalysis() {
      if (this.$route.params.fromDefault) {
        this.$router.push({
          name: "PageAnalysisCrawl",
          params: {
            fromDefault: "fromDefault",
          },
        });
      } else {
        this.$router.push({ name: "PageAnalysisCrawl" });
      }
    },
    viewResult(data) {
      this.$router.push({
        name: "AutomationCrawl",
        params: {
          id: data.id,
          location: data.location_id,
          automation_id: this.$route.params.id,
        },
      });

      // var selected_url = "";
      // if (data.url) {
      //   selected_url = data.url;
      // } else {
      //   selected_url = data.page;
      // }

      // this.seoAutoCamp.forEach((element) => {
      //   if (element.url == selected_url) {
      //     //
      //     if (this.$route.params.fromDefault) {
      //       this.$router.push({
      //         name: "AutomationCrawl",
      //         params: {
      //           fromDefault: "fromDefault",
      //           automation_id: element.id,
      //         },
      //       });
      //     } else {
      //       this.$router.push({
      //         name: "AutomationCrawl",
      //         params: {
      //           automation_id: element.id,
      //         },
      //       });
      //     }
      //   }
      // });
    },

    viewResultComplete(data) {
      var selected_url = "";
      if (data.url) {
        selected_url = data.url;
      } else {
        selected_url = data.page;
      }

      this.seoAutoCamp.forEach((element) => {
        if (element.url == selected_url) {
          //
          if (this.$route.params.fromDefault) {
            this.$router.push({
              name: "AutomationCrawl",
              params: {
                fromDefault: "fromDefault",
                automation_id: element.id,
              },
            });
          } else {
            this.$router.push({
              name: "AutomationCrawl",
              params: {
                automation_id: element.id,
              },
            });
          }
        }
      });
    },

    addNexautomate() {
      if (
        this.nexautomate_data_keyword.length == 0 ||
        // Stuck here//    this.nexautomate_data_keyword == 'others' ||
        this.nexautomate_data_url.length == 0 ||
        this.nexautomate_data_language.length == 0 ||
        this.nexautomate_data_location_id.length == 0
      ) {
        this.$toast.warning("All the inputs are required");

        // this.$bvToast.toast("All the inputs are required", {
        //   title: "Alert",
        //   variant: "warning",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
      } else if (
        this.nexautomate_data_keyword == "others" &&
        this.nexautomate_data_otherKeyword.length == 0
      ) {
        this.$toast.warning("All the inputs are required");

        // this.$bvToast.toast("All the inputs are required", {
        //   title: "Alert",
        //   variant: "warning",
        //   toaster: "b-toaster-bottom-left",
        //   solid: true,
        // });
      } else {
        var obj = {};

        if (this.nexautomate_data_keyword == "others") {
          obj = {
            keyword: this.nexautomate_data_otherKeyword,
            url: this.nexautomate_data_url,
            language: this.nexautomate_data_language,
            location_id: this.nexautomate_data_location_id,
          };
        } else {
          obj = {
            keyword: this.nexautomate_data_keyword,
            url: this.nexautomate_data_url,
            language: this.nexautomate_data_language,
            location_id: this.nexautomate_data_location_id,
          };
        }

        Enterprise.crawl_automate(this.$route.params.id, obj)
          .then((response) => {
            //
            this.$bvModal.hide("modal-center-nexcrawl-nexautomate");
            this.$toast.success("Your content is optimizing");
            // this.$bvToast.toast("Your content is optimizing", {
            //   title: "Success",
            //   variant: "success",
            //   toaster: "b-toaster-bottom-left",
            //   solid: true,
            // });
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    nexautomate(data) {
      // get client id - company name -
      this.showOthers = false;

      (this.nexautomate_data_keyword = ""),
        (this.nexautomate_data_url = ""),
        (this.nexautomate_data_language = ""),
        (this.nexautomate_data_location_id = ""),
        (this.nexautomate_data_urls = []),
        (this.nexautomate_data_otherKeyword = "");

      if (data.query) {
        this.nexautomate_data_keywords = ["others"];
      } else {
        this.nexautomate_data_keywords = [];
      }
      // this.nexautomate_data_keywords.push('others')

      if (data.urls) {
        this.nexautomate_data_urls = data.urls;
      } else if (data.url) {
        this.nexautomate_data_url = data.url;
      } else if (data.page) {
        this.nexautomate_data_url = data.page;
      }

      if (data.query) {
        data.query.forEach((element) => {
          this.nexautomate_data_keywords.push(element);
        });
      }

      this.$bvModal.show("modal-action-optimise");
    },
    assignTable(data) {
      for (const [key, value] of Object.entries(data)) {
        data[key].table_title = [];
        data[key].prob = null;
        var all = 0;
        var done = 0;
        var allOpt = 0;
        var doneOpt = 0;
        data[key].probOpt = null;
        var alldismis = 0;
        var donedismis = 0;
        data[key].probdismis = null;
        for (const [key2, value2] of Object.entries(value)) {
          if (key2 == "data") {
            for (const [key3, value3] of Object.entries(value2[0])) {
              if (key3 == "optimized") {
              } else if (key3 == "nexautomate") {
                if (value3) {
                  data[key].table_title.push(key3);
                }
              } else if (key3 == "complete_percentage") {
                //
              } else {
                data[key].table_title.push(key3);
              }

              //
            }

            for (const [key3, value3] of Object.entries(value2)) {
              allOpt = allOpt + 1;

              if (value3.optimized) {
                doneOpt = doneOpt + 1;
              }
            }

            for (const [key3, value3] of Object.entries(value2)) {
              all = all + 1;

              if (value3.mark_as_done == true && value3.dismiss == false) {
                done = done + 1;
              }
            }

            for (const [key3, value3] of Object.entries(value2)) {
              alldismis = alldismis + 1;

              if (value3.dismiss == true) {
                donedismis = donedismis + 1;
              }

              if (value3.mark_as_done == true && value3.dismiss == false) {
                donedismis = donedismis + 1;
              }
            }

            data[key].probdismis = ((donedismis / alldismis) * 100).toFixed(2);

            data[key].probOpt = ((doneOpt / allOpt) * 100).toFixed(2);

            data[key].prob = ((done / all) * 100).toFixed(2);
          }
        }
      }

      return data;
    },
    changeValue() {
      this.value_to_send = [];

      this.showStructure[this.index_to_change[0]].data[this.index_to_change[1]][
        this.index_to_change[2]
      ] = true;

      this.value_to_send = {
        campaign_key: this.index_to_change[0],
        campaign_value: this.showStructure[this.index_to_change[0]],
      };

      delete this.value_to_send.campaign_value.table_title;
      delete this.value_to_send.campaign_value.prob;

      //

      this.$bvModal.hide("modal-center-delete-task");
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      Enterprise.update_key(this.$route.params.id, this.value_to_send)
        .then((response) => {
          console.log(response);
          loader.hide();
          location.reload();

          // Enterprise.fetchData(this.$route.params.id, 1)
          //   .then((response) => {
          //     this.value = response.data.data.values;

          //     this.showStructure = {};
          //     this.value.forEach((element) => {
          //       //

          //       if (element.slug.includes("task_dashboard_suggestions")) {
          //         this.showStructure[element.slug] = JSON.parse(element.data);
          //         // suggestions.push(element.slug)
          //         ////
          //       }
          //     });

          //     this.showStructure = this.assignTable(this.showStructure);

          //     loader.hide();

          //     this.$bvToast.toast("The result is updated", {
          //       title: "Success",
          //       variant: "success",
          //       toaster: "b-toaster-bottom-left",
          //       solid: true,
          //     });
          //   })
          //   .catch(() => {
          //     loader.hide();
          //   });
        })
        .catch((error) => {
          console.log(error);
          loader.hide();
        });
    },
    changeStatus(index, index2, index3) {
      this.index_to_change = [index, index2, index3];
      this.$bvModal.show("modal-center-delete-task");
    },

    searchKeyword() {
      clearTimeout(this.keywordTimeout);

      this.keywordTimeout = setTimeout(() => {
        this.getActivities(1);
      }, 500);
    },

    getActivities() {
      this.search_keyword = this.search_keyword.toLowerCase();
      this.pageCurrent = 1;

      if (this.search_keyword == null || this.search_keyword == "") {
        this.topQueryAll = this.AllQuery;
        this.topQuery = this.topQueryAll.slice(0, this.selectedLength);
      } else {
        this.topQueryAll = [];
        this.AllQuery.forEach((element) => {
          if (element.url.toLowerCase().search(this.search_keyword) >= 0) {
            this.topQueryAll.push(element);
          }
        });
      }

      this.topQuery = this.topQueryAll.slice(
        (this.pageCurrent - 1) * this.selectedLength,
        (this.pageCurrent - 1) * this.selectedLength + this.selectedLength
      );

      if (this.topQueryAll.length % this.selectedLength == 0) {
        this.fullPage = this.topQueryAll.length / this.selectedLength;
      } else {
        this.fullPage =
          Math.floor(this.topQueryAll.length / this.selectedLength) + 1;
      }
    },

    changePage(data) {
      if (data == "add") {
        if (this.pageCurrent < 1) {
        } else {
          //

          this.pageCurrent = this.pageCurrent + 1;

          if (this.topQueryAll.length % this.selectedLength == 0) {
            if (
              this.pageCurrent <=
              this.topQueryAll.length / this.selectedLength
            ) {
              this.topQuery = this.topQueryAll.slice(
                (this.pageCurrent - 1) * this.selectedLength,
                (this.pageCurrent - 1) * this.selectedLength +
                  this.selectedLength
              );
            } else {
              this.pageCurrent = this.topQueryAll.length / this.selectedLength;
            }
          } else {
            if (
              this.pageCurrent <=
              Math.floor(this.topQueryAll.length / this.selectedLength) + 1
            ) {
              this.topQuery = this.topQueryAll.slice(
                (this.pageCurrent - 1) * this.selectedLength,
                (this.pageCurrent - 1) * this.selectedLength +
                  this.selectedLength
              );
            } else {
              this.pageCurrent =
                Math.floor(this.topQueryAll.length / this.selectedLength) + 1;
            }
          }
        }
      } else {
        if (this.topQueryAll.length % this.selectedLength == 0) {
          if (
            this.pageCurrent >
            this.topQueryAll.length / this.selectedLength
          ) {
          } else {
            //

            this.pageCurrent = this.pageCurrent - 1;

            if (this.pageCurrent >= 1) {
              this.topQuery = this.topQueryAll.slice(
                (this.pageCurrent - 1) * this.selectedLength,
                (this.pageCurrent - 1) * this.selectedLength +
                  this.selectedLength
              );
            } else {
              this.pageCurrent = 1;
            }
          }
        } else {
          if (
            this.pageCurrent >
            Math.floor(this.topQueryAll.length / this.selectedLength) + 1
          ) {
          } else {
            //

            this.pageCurrent = this.pageCurrent - 1;

            if (this.pageCurrent >= 1) {
              this.topQuery = this.topQueryAll.slice(
                (this.pageCurrent - 1) * this.selectedLength,
                (this.pageCurrent - 1) * this.selectedLength +
                  this.selectedLength
              );
            } else {
              this.pageCurrent = 1;
            }
          }
        }
      }

      //

      //
    },
    sortLength() {
      //

      this.pageCurrent = 1;

      this.topQuery = this.topQueryAll.slice(0, this.selectedLength);

      if (this.topQueryAll.length % this.selectedLength == 0) {
        this.fullPage = this.topQueryAll.length / this.selectedLength;
      } else {
        this.fullPage =
          Math.floor(this.topQueryAll.length / this.selectedLength) + 1;
      }
    },
    firstPage() {
      this.pageCurrent = 1;

      this.topQuery = this.topQueryAll.slice(0, this.selectedLength);
    },
    lastPage() {
      this.pageCurrent = this.fullPage;

      this.topQuery = this.topQueryAll.slice(
        (this.pageCurrent - 1) * this.selectedLength,
        (this.pageCurrent - 1) * this.selectedLength + this.selectedLength
      );
    },
  },

  destroyed() {
    clearInterval(this.timer);
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    Enterprise.fetchData(this.$route.params.id, 1)
      .then((response) => {
        loader.hide();
        this.campaign = response.data.data;
        this.value = response.data.data.values;

        if (response.data.data.reIndexCapmaign != null) {
          if (
            response.data.data.reIndexCapmaign.complete_percentage !=
              undefined &&
            response.data.data.reIndexCapmaign.complete_percentage < 100
          ) {
            console.log(response.data.data);
            this.timerCalculation(response.data.data);
          }
        }

        this.showStructure = {};
        this.value.forEach((element) => {
          //

          if (element.slug.includes("task_dashboard_suggestions")) {
            this.showStructure[element.slug] = JSON.parse(element.data);
            // suggestions.push(element.slug)
            ////
          }
        });

        //

        this.seoAutoCamp = response.data.data.seoAutomationCampaigns;
        response.data.data.seoAutomationCampaigns.forEach((element) => {
          this.optimized.push(element);
        });

        //

        //

        for (const [key, value] of Object.entries(this.showStructure)) {
          for (const [key_data, value_data] of Object.entries(value.data)) {
            this.optimized.forEach((element) => {
              if (value_data.url) {
                if (element.url == value_data.url) {
                  //

                  //

                  this.showStructure[key].data[key_data].optimized = true;
                  this.showStructure[key].data[key_data].complete_percentage =
                    element.complete_percentage;

                  //
                }
              } else if (value_data.page) {
                if (element.url == value_data.page) {
                  //
                  //

                  this.showStructure[key].data[key_data].optimized = true;
                  this.showStructure[key].data[key_data].complete_percentage =
                    element.complete_percentage;

                  //
                }
              }
            });
          }
        }
        //

        for (const [key, value] of Object.entries(this.showStructure)) {
          for (const [key_data, value_data] of Object.entries(value.data)) {
            if (value_data.urls)
              value_data.urls.forEach((element, index) => {
                this.optimized.forEach((element_opt) => {
                  if (element == element_opt.url) {
                    //
                    //
                    this.showStructure[key].data[key_data].urls.splice(
                      index,
                      1
                    );
                  }
                });
              });
          }
        }

        this.showStructure = this.assignTable(this.showStructure);

        // console.log(this.showStructure);

        loader.hide();
      })
      .catch(() => {
        loader.hide();
      });
  },
};
</script>

<style lang="css" scoped>
.page-wrapper-lg {
  position: relative;
  max-width: 1600px;
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
}
.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 40px;
  padding: 1rem;
  position: relative;
}
.nexcard-inner {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px;
  padding: 1rem;
  position: relative;
}

/* nexcard metrics */
/* .nexcard-metrics {
  display: flex;
  align-items: start;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 20px;
  padding: 0.8rem 0.8rem 0.8rem 1rem;
  flex-direction: column;
  cursor: pointer;
}
.card__topwrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.card__topwrapper .card__title {
  color: #6f6f6f;
  font-size: 15px;
  white-space: nowrap;
}
.card__topwrapper .icon__tooltip {
  color: #c5c5c5;
  font-size: 18px;
}
.card__bottomwrapper {
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 100%;
}
.card__bottomwrapper img {
  height: 35px;
}
.page__metrics__cards .col-2:nth-child(4) .card__bottomwrapper img {
  height: 32px;
}

.card__bottomwrapper h3 {
  color: var(--color-primary);
  margin-left: 1rem;
  font-size: 42px;
  margin-bottom: 0;
  line-height: 40px;
}

.nexcard-metrics .card__bottomwrapper .icon__view-more {
  margin-left: auto;
  font-size: 35px;
  margin-bottom: 0;
  line-height: 28px;
  opacity: 0;
  color: #c5c5c5;
  transition: 0.2s ease-out;
  translate: -20px;
}
.nexcard-metrics:hover .card__bottomwrapper .icon__view-more {
  opacity: 1;
  transition: 0.2s ease-out;
  translate: 3px;
}

@media screen and (max-width: 1600px) {
  .nexcard-metrics .card__title {
    font-size: 13px;
  }
}

.nexcard.pie-chart {
  display: grid;
  place-content: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 50px;
  aspect-ratio: 1/1;
}

.nexcard.bar-chart {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 50px;
  min-height: 400px;
} */

/* nextable css */
.nextable .nextable__head {
  background-color: transparent !important;
  top: 0;
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__body {
  overflow-y: scroll;
  position: relative;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body {
    max-height: 60vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body {
    height: 58vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body {
    height: 50vh;
  }
}
.nextable .nextable__head {
  margin-right: 8px;
}
.nextable .nextable__head .col,
.nextable .nextable__head .col-1,
.nextable .nextable__head .col-2,
.nextable .nextable__head .col-4,
.nextable .nextable__head .col-5,
.nextable .nextable__head .col-6 {
  padding: 1rem;
  font-weight: bold;
}
.nextable .nextable__head p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
/* .nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
} */

.nextable__body .row {
  border-bottom: 1px solid #e6e6e6;
}
.nextable .nextable__body .col,
.nextable .nextable__body .col-1,
.nextable .nextable__body .col-2,
.nextable .nextable__body .col-4,
.nextable .nextable__body .col-5,
.nextable .nextable__body .col-6 {
  padding: 1rem;
  align-items: center;
  display: flex;
}
.nextable .col-auto {
  padding: 1rem;
}
.nextable .nextable__body p {
  margin: 0;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
/* --------------- */
/* Bodyfix section - Contents */
.bodyfix__content {
  margin-top: 1rem;
}

/* ----- 1.content dropdown css - start */
.dropdown__group {
  border: 1px solid #2c8de0;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}
.dropdown__group:last-child {
  margin-bottom: 0rem;
}
.dropdown__title {
  padding: 1.5rem 2rem;
  transition: all 0.4s ease-out;
  user-select: none;
}
.dropdown__title__left {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: auto;
}
.dropdown__title__left .title {
  margin-right: 1rem;
  color: #183b1c;
  font-size: 20px;
  min-width: 220px;
  font-weight: 600;
  user-select: none;
}
.dropdown__title__left .badge {
  margin-right: 2rem;
  border: 1px solid black;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}
.dropdown__title__left .badge.critical {
  border-color: #e23c39;
  color: #e23c39;
}
.dropdown__title__left .badge.warning {
  border-color: #ff9800;
  color: #ff9800;
}
.dropdown__title__left .badge.information {
  border-color: #5791d0;
  color: #5791d0;
}
.dropdown__title__left .badge.completed {
  border-color: #4dae50;
  color: #4dae50;
}
.dropdown__title__left .description {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.dropdown__title__right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.dropdown__title__right .date {
  font-size: 16px;
  color: #808081;
  font-weight: 500;
}
.dropdown__title[aria-expanded="false"] .dropdown__title__right .arrow-icon {
  transform: rotate(0deg);
  transition: 0.3s ease-out;
  color: #2c8de0;
}
.dropdown__title[aria-expanded="true"] .dropdown__title__right .arrow-icon {
  transform: rotate(180deg);
  transition: 0.2s ease-out;
  color: #2c8de0;
}
.dropdown__content {
  padding: 1rem 2rem 2rem;
  border-top: 1px solid #2c8de0;
}

/* .tag__score {
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
} */
.desc {
  font-size: 16px;
  color: #555555;
  font-weight: 500;
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
/* action menu css */
.btn-action {
  color: #707070;
  margin: 0 auto;
  border-radius: 50%;
  padding: 2px;
}
.btn-action:hover {
  background-color: var(--color-primary-light);
  border-radius: 50%;
  transition: all 0.3s ease-out;
}
.action-menu-dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  text-align: left;
  transform: translate(-140px, -10px);
  width: 180px;
  color: #272727;
}
/* last row action menu on top */
.nextable__body .row:last-child .col.action .action-menu-dropdown {
  transform: translate(-140px, -110px);
}
.action-menu:hover .action-menu-dropdown {
  display: flex;
}
.action-menu-dropdown span {
  cursor: pointer;
  user-select: none;
  padding: 0.1rem 0.5rem 0.1rem 0.2rem;
  margin: 0.1rem 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.done {
  transition: all 0.2s ease-out;
  color: #4da351;
}
.action-menu-dropdown span:hover.dismiss {
  transition: all 0.2s ease-out;
  color: #e11300;
}
/* .action-menu-dropdown span:hover.edit,
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;
  color: #279a2a;
}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;
  color: #2d8fe2;
}
.action-menu-dropdown span:hover.folder {
  transition: all 0.2s ease-out;
  color: #6f2de2;
} */

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
</style>
