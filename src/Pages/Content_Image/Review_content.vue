<template>
  <div>
    <!--#attention generate image pop up-->
    <b-modal
      id="modal-generate-image"
      ref="modal-generate-image"
      centered
      hide-footer
      hide-header
    >
      <div class="card-body">
        <strong class="card-title">Generate image for the content</strong>

        <div class="row">
          <div class="col-6">
            <div class="card-text mt-3">
              <label for="fname">Keyword </label>
            </div>

            <div class="card-text mt-2">
              <b-form-input
                autocorrect="off"
                autocomplete="off"
                type="text"
                id="keyword"
                name="keyword"
                placeholder=""
                v-model="keyword"
              />
            </div>
            <span class="text-danger text-sm" v-show="errors.has('keyword')">{{
              errors.first("keyword")
            }}</span>
          </div>

          <div class="col-3">
            <div class="card-text mt-3">
              <label for="fname">Size </label>
            </div>

            <div class="card-text mt-2">
              <div class="input-group">
                <select
                  class="custom-select rounded"
                  id="inputGroupSelect04"
                  v-model="img_option"
                >
                  <option
                    :value="lan"
                    :key="index"
                    v-for="(lan, index) in sizes"
                  >
                    {{ lan }}
                  </option>
                </select>
              </div>

              <span class="text-danger text-sm" v-show="errors.has('size')">{{
                errors.first("size")
              }}</span>
            </div>
          </div>
          <div class="col-3">
            <div class="card-text mt-3">
              <label for="fname">Style </label>
            </div>

            <div class="card-text mt-2">
              <div class="input-group">
                <select
                  class="custom-select rounded"
                  id="inputGroupSelect04"
                  aria-label="Example select with button addon"
                  v-model="style"
                >
                  <option
                    :value="lan"
                    :key="index"
                    v-for="(lan, index) in styles"
                  >
                    {{ lan }}
                  </option>
                  <!-- <option>Others</option> -->
                </select>
              </div>

              <span class="text-danger text-sm" v-show="errors.has('style')">{{
                errors.first("style")
              }}</span>
            </div>
          </div>
        </div>

        <div class="card-text mt-3 d-flex">
          <button
            @click="$bvModal.hide('modal-generate-image')"
            class="btn btn-primary-outlined ms-auto"
          >
            Cancel
          </button>
          <button @click.once="generateImage()" class="btn btn-primary ms-2">
            Generate
          </button>
        </div>
      </div>
    </b-modal>

    <div class="nexcard details__card row mt-4">
      <div class="details__wrapper col-20">
        <h6 class="details__title">Project Name</h6>
        <h6 class="details__desc">{{ content.client_id | project_name }}</h6>
      </div>
      <div class="details__wrapper col-20">
        <h6 class="details__title">Topic</h6>
        <h6 class="details__desc">{{ content.keyword }}</h6>
      </div>

      <div
        class="details__wrapper col-20"
        v-if="content.campaign_type != 'blog_writer'"
      >
        <h6 class="details__title">Case</h6>
        <h6 class="details__desc">
          {{ content.subtopic_case | capitalize }}
        </h6>
      </div>
      <div class="details__wrapper col-20">
        <h6 class="details__title">Tone</h6>
        <h6 class="details__desc">{{ content.tone }}</h6>
      </div>
      <div class="details__wrapper col-20">
        <h6 class="details__title">Language</h6>
        <h6 class="details__desc">{{ content.language | lan }}</h6>
      </div>

      <div class="details__wrapper col-20">
        <h6 class="details__title">SEO Location</h6>
        <h6 class="details__desc">{{ content_location | loc }}</h6>
      </div>
      <div class="details__wrapper col-20">
        <h6 class="details__title">Length</h6>
        <h6 class="details__desc">{{ content.model_type }}</h6>
      </div>

      <div
        class="details__wrapper col-20"
        v-if="content_target_phrases.length != 0"
      >
        <h6 class="details__title">Target Phrases/Keyword</h6>
        <h6 class="details__desc">{{ content_target_phrases }}</h6>
      </div>

      <div
        class="details__wrapper col-20"
        v-if="content_product_name.length != 0"
      >
        <h6 class="details__title">Name</h6>
        <h6 class="details__desc">{{ content_product_name }}</h6>
      </div>

      <div
        class="details__wrapper col-20"
        v-if="content_product_description.length != 0"
      >
        <h6 class="details__title">Description</h6>
        <h6 class="details__desc">{{ content_product_description }}</h6>
      </div>

      <div
        class="details__wrapper col-20"
        v-if="content.campaign_type == 'blog_writer'"
      >
        <h6 class="details__title">Number of words</h6>
        <h6 class="details__desc">{{ generated_text["Number of Words"] }}</h6>
      </div>
      <div
        class="details__wrapper col-20"
        v-if="content.campaign_type == 'blog_writer'"
      >
        <h6 class="details__title">Number of characters</h6>
        <h6 class="details__desc">
          {{ generated_text["Number of Characters"] }}
        </h6>
      </div>
    </div>

    <div class="card__inputbody">
      <div class="review__tabs d-flex align-items-center">
        <button
          :class="tab.class"
          v-for="(tab, index) in tabs"
          :key="'tab' + index"
          @click="changeTab(index)"
        >
          <!-- <span class="review__tab__counter">01</span> -->
          <span class="review__tab__title">{{ tab.name }}</span>
        </button>
      </div>

      <div class="review__content py-3">
        <!--#attention if the content is blog writing-->
        <div
          class="review__content__results"
          v-if="content.campaign_type == 'blog_writer' && chosenTab == 'Result'"
        >
          <!-- Image Generator -->
          <section
            class="section__imagegenerator mb-5"
            v-if="this.permissions.includes('nexart.store')"
          >
            <h3 class="text-darkgreen my-3">Image</h3>

            <!--#attention if image is already generated-->

            <div
              v-if="IntroImage.length != 0 && IntroImage[0].image.length != 0"
              class="mb-2 text-darkgreen"
            >
              <b>Keyword: </b> {{ IntroImage[0].keyword }}
            </div>
            <div
              class="row"
              v-if="IntroImage.length != 0 && IntroImage[0].image.length != 0"
            >
              <!--#attention if image is already generated but loading-->
              <div class="col" v-if="IntroImage[0].complete < 100">
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
                  :percent="IntroImage[0].complete"
                >
                </k-progress>
              </div>

              <!--#attention if image is already generated after loading-->
              <div
                class="col"
                style="width: 20%; flex: none"
                v-for="(img, index_image) in IntroImage[0].image"
                :key="'img' + index_image"
                v-else
              >
                <div class="results__imagewrapper">
                  <a
                    :href="`data:image/png;base64,${img.data}`"
                    :download="`${IntroImage[0].keyword}`"
                    class="results__downloadbtn"
                  >
                    <img :src="`data:image/png;base64,${img.data}`" alt="" />
                  </a>
                  <span
                    @click="downloadImg(img.data, IntroImage[0].keyword)"
                    class="results__downloadtext"
                    >Download</span
                  >
                </div>
              </div>
            </div>
            <!--#attention if image is not generated-->
            <div
              class="row"
              v-if="IntroImage.length == 0 || IntroImage[0].image.length == 0"
            >
              <div class="col">
                <button
                  v-b-modal.modal-generate-image
                  src=""
                  alt=""
                  class="results__image_placeholder"
                >
                  <p>Generate Image</p>
                </button>
              </div>
            </div>
          </section>

          <section class="section__contentgenerator">
            <h3 class="text-darkgreen my-3">Content</h3>

            <!-- !NOTE: can toggle the active class with mouse-enter to show button and card blue outline -->
            <!-- H1 elements-->
            <div
              class="nexcard__content"
              v-if="this.h1Elements.length != 0"
              :class="{ active: 'h1Elements' === isActive }"
              @mouseover="isActive = 'h1Elements'"
              @mouseleave="isActive = ''"
            >
              <div class="d-flex align-items-center">
                <h5>Recommended Topic/H1</h5>
              </div>
              <div
                class="text-muted mt-4"
                :key="index"
                v-for="(para, index) in h1Elements"
              >
                <div class="nexcard__content__buttons ms-auto">
                  <button
                    @click.once="addToEditor(`<h1>` + para + `</h1>`)"
                    class="btn btn-primary"
                  >
                    + Add to Editor
                  </button>
                  <copy-to-clipboard :text="para" @copy="handleCopy"
                    ><button class="btn btn-primary ms-2 btn-copy">
                      <span class="material-icons-outlined">
                        content_copy
                      </span>
                    </button>
                  </copy-to-clipboard>
                </div>
                <p v-html="para.replace(/\n/g, '<br/>')"></p>
              </div>
            </div>

            <!--introduction-->
            <div
              class="nexcard__content"
              :class="{ active: 'intro' === isActive }"
              @mouseover="isActive = 'intro'"
              @mouseleave="isActive = ''"
            >
              <div class="d-flex align-items-center">
                <h5>Introduction</h5>
                <div class="nexcard__content__buttons ms-auto">
                  <button
                    @click.once="addToEditor(Intro)"
                    class="btn btn-primary"
                  >
                    + Add to Editor
                  </button>
                  <copy-to-clipboard :text="Intro" @copy="handleCopy">
                    <button class="btn btn-primary ms-2 btn-copy">
                      <span class="material-icons-outlined">
                        content_copy
                      </span>
                    </button>
                  </copy-to-clipboard>
                </div>
              </div>
              <div class="text-muted mt-4">
                <p v-html="Intro.replace(/\n/g, '<br/>')"></p>
              </div>
            </div>

            <!--Body paragraph-->
            <div
              class="nexcard__content"
              :key="index"
              v-for="(para, index) in paragraph"
              :class="{ active: 'body_' + index === isActive }"
              @mouseover="isActive = 'body_' + index"
              @mouseleave="isActive = ''"
            >
              <div class="d-flex align-items-center">
                <h5>Body Paragraph {{ index + 1 }}</h5>
                <div class="nexcard__content__buttons ms-auto">
                  <button
                    @click.once="
                      addToEditor(
                        `<h2>` + h2Elements[index] + `</h2><br>` + para
                      )
                    "
                    class="btn btn-primary"
                  >
                    + Add to Editor
                  </button>
                  <copy-to-clipboard :text="para" @copy="handleCopy">
                    <button class="btn btn-primary ms-2 btn-copy">
                      <span class="material-icons-outlined">
                        content_copy
                      </span>
                    </button>
                  </copy-to-clipboard>
                </div>
              </div>
              <b v-if="h2Elements.length != 0"> {{ h2Elements[index] }}</b>
              <div class="text-muted mt-4">
                <p v-html="para.replace(/\n/g, '<br/>')"></p>
              </div>
            </div>

            <!--Conclusion-->
            <div
              class="nexcard__content"
              :class="{ active: 'conclusion' === isActive }"
              @mouseover="isActive = 'conclusion'"
              @mouseleave="isActive = ''"
            >
              <div class="d-flex align-items-center">
                <h5>Conclusion</h5>
                <div class="nexcard__content__buttons ms-auto">
                  <button
                    @click.once="addToEditor(conclusion)"
                    class="btn btn-primary"
                  >
                    + Add to Editor
                  </button>
                  <copy-to-clipboard :text="conclusion" @copy="handleCopy">
                    <button class="btn btn-primary ms-2 btn-copy">
                      <span class="material-icons-outlined">
                        content_copy
                      </span>
                    </button>
                  </copy-to-clipboard>
                </div>
              </div>
              <div class="text-muted mt-4">
                <p v-html="conclusion.replace(/\n/g, '<br/>')"></p>
              </div>
            </div>
          </section>
        </div>

        <!--#attention if the content is OTHER THAN blog writing-->
        <div
          class="review__content__results"
          v-else-if="
            content.campaign_type != 'blog_writer' && chosenTab == 'Result'
          "
        >
          <section class="section__contentgenerator">
            <h3 class="text-darkgreen my-3">Content</h3>

            <!-- !NOTE: can toggle the active class with mouse-enter to show button and card blue outline -->
            <!--Body paragraph-->
            <div
              class="nexcard__content"
              :key="'para' + index"
              v-for="(para, index) in p"
              :class="{ active: 'body_' + index === isActive }"
              @mouseover="isActive = 'body_' + index"
              @mouseleave="isActive = ''"
            >
              <div class="d-flex align-items-center">
                <h5>{{ para.topics }}</h5>
                <div class="nexcard__content__buttons ms-auto">
                  <button
                    class="btn btn-primary"
                    @click.once="addToEditor(para.content[0])"
                  >
                    + Add to Editor
                  </button>
                  <copy-to-clipboard :text="para.content[0]" @copy="handleCopy">
                    <button class="btn btn-primary ms-2 btn-copy">
                      <span class="material-icons-outlined">
                        content_copy
                      </span>
                    </button>
                  </copy-to-clipboard>
                </div>
              </div>

              <div class="text-muted mt-4">
                <p v-html="para.content[0].replace(/\n/g, '<br/>')"></p>
              </div>
            </div>
          </section>
        </div>

        <div
          class="review__content__keywords mt-4"
          v-if="chosenTab == 'Keyword Semantic Analysis'"
        >
          <section class="card__keywords_table">
            <div class="keywords_table">
              <div class="row keywords_thead g-0">
                <div class="col d-flex">
                  <span>Suggestion of Words</span>
                  <button class="material-icons-outlined btn-orderby">
                    arrow_upward
                  </button>
                </div>
                <div class="col-3 d-flex">
                  <span>Score</span>
                  <button class="material-icons-outlined btn-orderby">
                    arrow_upward
                  </button>
                </div>
                <div class="col-1"></div>
              </div>

              <div
                class="row keywords_tbody g-0"
                v-for="(word, index) in words"
                :key="'word' + index"
              >
                <div class="col">
                  <p>{{ word[0] }}</p>
                </div>
                <div class="col-2">
                  <p>{{ word[1] }}</p>
                </div>
                <div class="col-1 col-copy">
                  <button
                    @click.once="addKeywordPool(word[0])"
                    v-b-tooltip.hover.top="{ variant: 'primary' }"
                    title="Add to Keyword Pool"
                    class="btn-copy btn-primary material-icons-outlined"
                    style="height: 30px; width: 44px"
                  >
                    add
                  </button>
                </div>

                <div class="col-1 col-copy">
                  <copy-to-clipboard :text="word[0]" @copy="handleCopy">
                    <button
                      class="btn btn-primary btn-copy"
                      style="height: 30px"
                      v-b-tooltip.hover.top="{ variant: 'primary' }"
                      title="Copy Keyword"
                    >
                      <span
                        class="material-icons-outlined"
                        style="font-size: 18px; translate: 0 -2px"
                      >
                        content_copy
                      </span>
                    </button>
                  </copy-to-clipboard>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="d-flex mt-4 mb-0">
      <div class="ms-auto"></div>
      <!-- <button class="btn btn-primary-outlined ms-auto">Back</button> -->
      <router-link
        :to="{
          name: 'content editor',
          params: { client_id: content.client_id },
        }"
      >
        <button class="btn btn-primary">Content Editor</button>
      </router-link>
      <!-- <button class="btn btn-success ms-2">Create</button> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import AiContentGenerator from "@/store/AiContentGenerator.js";
import CopyToClipboard from "vue-copy-to-clipboard";
export default {
  name: "review_create",
  components: {
    CopyToClipboard,
  },

  data() {
    return {
      tabs: [
        { name: "Result", class: "review__tab active" },
        { name: "Keyword Semantic Analysis", class: "review__tab" },
      ],
      chosenTab: "Result",
      content: [],
      h2Elements: [],
      h1Elements: [],
      h1Show: [],
      generated_text: [],
      Intro: "",
      conclusion: "",
      paragraph: [],
      fullParagraph: ``,
      semanticTopics: [],
      words: [],
      image_id: "Introduction",
      initialImg: [],
      IntroImage: [],
      ConclImage: [],
      paraShow: [],
      permissions: [],
      deleteImageId: "",
      keyword: "",
      img_option: "256x256",
      sizes: ["256x256", "512x512", "1024x1024"],
      style: "realistic",
      styles: ["painting", "fantasy", "digital art", "cartoon", "realistic"],
      p: [],
      topics: [],
      anchors: [],
      isActive: "",
      content: [],
      content_location: [],
      content_target_phrases: [],
      content_product_name: [],
      content_product_description: [],
    };
  },
  watch: {
    isActive() {
      console.log("isActive", this.isActive);
    },
  },

  methods: {
    downloadImg(data, name) {
      var a = document.createElement("a"); //Create <a>
      a.href = "data:image/png;base64," + data; //Image Base64
      a.download = name; //File name Here
      a.click(); //Downloaded file
    },
    changeTab(data) {
      this.chosenTab = this.tabs[data].name;
      this.tabs.forEach((element, index) => {
        if (index == data) {
          element.class = "review__tab active";
        } else {
          element.class = "review__tab";
        }
      });
    },
    generateImage() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      var objImg = {
        keyword: this.keyword,
        image_id: "Introduction",
        img_option: this.img_option,
        style: this.style,
      };

      AiContentGenerator.addNexArt(this.$route.params.id, objImg)
        .then((response_img) => {
          setTimeout(() => {
            loader.hide();
            this.$bvModal.hide("modal-generate-image");
            location.reload();
          }, 15000);
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },

    percentageCalc(id) {
      AiContentGenerator.fetchContentCampaign({
        id: this.$route.params.id,
      })
        .then((response) => {
          ////
          response.data.data.nexart_camapaigns.forEach((element, index) => {
            if (element.id == id) {
              AiContentGenerator.fetchNexArt(element.id)
                .then((response) => {
                  if (element.image_id.value == "Introduction") {
                    this.IntroImage[0].complete = element.complete_percentage;
                  } else if (element.image_id.value == "Conclusion") {
                    this.ConclImage[0].complete = element.complete_percentage;
                  } else {
                    this.paraShow[element.image_id.value - 1] = false;

                    this.initialImg.forEach((img) => {
                      if (img.index == element.image_id.value) {
                        img.complete = element.complete_percentage;
                      }
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  loader.hide();
                });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    AddArtPercentage(data) {
      AiContentGenerator.fetchContentCampaign({
        id: this.$route.params.id,
      })
        .then((response) => {
          ////
          response.data.data.nexart_camapaigns.forEach((element, index) => {
            if (element.id == data) {
              AiContentGenerator.fetchNexArt(element.id)
                .then((response) => {
                  if (element.image_id.value == "Introduction") {
                    this.IntroImage.push({
                      id: element.id,
                      keyword: element.keyword,
                      index: element.image_id.value,
                      image: response.data.data.values,
                      complete: element.complete_percentage,
                    });

                    setTimeout(function () {
                      me.percentageCalc(element.id);
                    }, 10000);
                  } else if (element.image_id.value == "Conclusion") {
                    this.ConclImage.push({
                      id: element.id,
                      keyword: element.keyword,
                      index: element.image_id.value,
                      image: response.data.data.values,
                      complete: element.complete_percentage,
                    });

                    setTimeout(function () {
                      me.percentageCalc(element.id);
                    }, 10000);
                  } else {
                    this.paraShow[element.image_id.value - 1] = false;

                    this.initialImg.push({
                      id: element.id,
                      keyword: element.keyword,
                      index: element.image_id.value,
                      image: response.data.data.values,
                      complete: element.complete_percentage,
                    });

                    setTimeout(function () {
                      me.percentageCalc(element.id);
                    }, 10000);
                  }

                  //
                })
                .catch((err) => {
                  console.log(err);
                  loader.hide();
                });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToEditor(text) {
      //console.log(text)
      localStorage.setItem("pass_to_editor", text);

      this.$router.push({
        name: "content editor",
        params: { client_id: this.content.client_id },
      });
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
    handleAnchor(data) {
      this.anchors.forEach((anchor) => {
        var count = 0;
        if (data.toLowerCase().includes(anchor.toLowerCase())) {
          const mySentence = anchor;
          const words = mySentence.split(" ");

          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          }

          words.join(" ");

          var t = 0;

          var result_1 = data.replace(
            words.join(" "),
            `<u style="color:blue">${words.join(" ")}</u>`
          );

          if (data != result_1) {
            count++;
          }

          if (count <= 3) {
            var result_2 = result_1.replace(
              new RegExp(words.join(" "), "g"),
              (match) =>
                ++t === 2
                  ? `<u style="color:blue">${words.join(" ")}</u>`
                  : match
            );
            if (result_2 != result_1) {
              count++;
            }
          } else {
            var result_2 = result_1;
          }

          if (count <= 3) {
            var t3 = 0;
            var result_3 = result_2.replace(
              new RegExp(words.join(" "), "g"),
              (match) =>
                ++t3 === 3
                  ? `<u style="color:blue">${words.join(" ")}</u>`
                  : match
            );

            if (result_2 != result_3) {
              count++;
            }
          } else {
            var result_3 = result_2;
          }

          data = result_3;

          if (count <= 3) {
            var t = 0;

            var result_1 = data.replace(
              anchor.charAt(0).toUpperCase() + anchor.slice(1),
              `<u style="color:blue">${
                anchor.charAt(0).toUpperCase() + anchor.slice(1)
              }</u>`
            );

            if (data != result_1) {
              count++;
            }
          } else {
            var result_1 = data;
          }

          if (count <= 3) {
            var result_2 = result_1.replace(
              new RegExp(anchor.charAt(0).toUpperCase() + anchor.slice(1), "g"),
              (match) =>
                ++t === 2
                  ? `<u style="color:blue">${
                      anchor.charAt(0).toUpperCase() + anchor.slice(1)
                    }</u>`
                  : match
            );

            if (result_2 != result_1) {
              count++;
            }
          } else {
            var result_2 = result_1;
          }

          if (count <= 3) {
            var t3 = 0;
            var result_3 = result_2.replace(
              new RegExp(anchor.charAt(0).toUpperCase() + anchor.slice(1), "g"),
              (match) =>
                ++t3 === 3
                  ? `<u style="color:blue">${
                      anchor.charAt(0).toUpperCase() + anchor.slice(1)
                    }</u>`
                  : match
            );

            if (result_2 != result_3) {
              count++;
            }
          } else {
            var result_3 = result_2;
          }

          data = result_3;

          if (count <= 3) {
            var t = 0;

            var result_1 = data.replace(
              anchor,
              `<u style="color:blue">${anchor}</u>`
            );
            if (result_1 != data) {
              count++;
            }
          } else {
            var result_1 = data;
          }

          if (count <= 3) {
            var result_2 = result_1.replace(new RegExp(anchor, "g"), (match) =>
              ++t === 2 ? `<u style="color:blue">${anchor}</u>` : match
            );
            if (result_1 != result_2) {
              count++;
            }
          } else {
            var result_2 = result_1;
          }

          if (count <= 3) {
            var t3 = 0;
            var result_3 = result_2.replace(new RegExp(anchor, "g"), (match) =>
              ++t3 === 3 ? `<u style="color:blue">${anchor}</u>` : match
            );
          } else {
            var result_3 = result_2;
          }

          data = result_3;
          //
        }
      });

      return data;
    },
    downloadImg(data, name) {
      var a = document.createElement("a"); //Create <a>
      a.href = "data:image/png;base64," + data; //Image Base64
      a.download = name; //File name Here
      a.click(); //Downloaded file
    },

    NexArtCards(data) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.initialImg = [];
      this.IntroImage = [];
      this.ConclImage = [];

      data.forEach((element, index) => {
        AiContentGenerator.fetchNexArt(element.id)
          .then((response) => {
            if (
              element.image_id.value == "Introduction" &&
              element.values.length != 0
            ) {
              this.IntroImage.push({
                id: element.id,
                keyword: element.keyword,
                index: element.image_id.value,
                image: response.data.data.values,
                complete: element.complete_percentage,
              });
            } else if (element.image_id.value == "Conclusion") {
              this.ConclImage.push({
                id: element.id,
                keyword: element.keyword,
                index: element.image_id.value,
                image: response.data.data.values,
                complete: element.complete_percentage,
              });
            } else {
              this.paraShow[element.image_id.value - 1] = false;

              this.initialImg.push({
                id: element.id,
                keyword: element.keyword,
                index: element.image_id.value,
                image: response.data.data.values,
                complete: element.complete_percentage,
              });
            }

            loader.hide();
          })
          .catch((err) => {
            loader.hide();
            console.log(err);
          });
      });

      console.log(this.IntroImage);

      //
    },

    handleAnchor_others(p, anchors) {
      p.forEach((element, index) => {
        element.content.forEach((content, index_content) => {
          anchors.forEach((anchor) => {
            if (content.toLowerCase().includes(anchor.toLowerCase())) {
              //  content = content
              //     .toLowerCase()
              //     .replaceAll(anchor, `<u style="color:blue">${anchor}</u>`);
              // //
              // //
              const mySentence = anchor;
              const words = mySentence.split(" ");

              for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
              }

              words.join(" ");

              //

              content = content.replaceAll(
                words.join(" "),
                `<u style="color:blue">${words.join(" ")}</u>`
              );

              content = content.replaceAll(
                anchor.charAt(0).toUpperCase() + anchor.slice(1),
                `<u style="color:blue">${
                  anchor.charAt(0).toUpperCase() + anchor.slice(1)
                }</u>`
              );

              content = content.replaceAll(
                anchor,
                `<u style="color:blue">${anchor}</u>`
              );
            }

            if (content.includes("\n")) {
              //
              content = content.replaceAll("\n", `<br>`);
            }
          });

          element.content[index_content] = content;
        });
      });

      // //
      return p;
    },

    arrangeAnchor(data) {
      var earlyAnchor = [];
      if (data.length != 0) {
        JSON.parse(data[0].value).forEach((val) => {
          earlyAnchor.push(val);
        });

        // //
      }

      //  //

      var anchorCategory = [];

      earlyAnchor.forEach((val) => {
        const arr = val.split(" ");

        // //

        anchorCategory.push({
          val: val,
          length: arr.filter((word) => word !== "").length,
        });
      });

      // //

      var categoryAnchor = [];
      const groupByKey = (list, key, { omitKey = false }) =>
        list.reduce(
          (hash, { [key]: value, ...rest }) => ({
            ...hash,
            [value]: (hash[value] || []).concat(
              omitKey ? { ...rest } : { [key]: value, ...rest }
            ),
          }),
          {}
        );

      // //
      categoryAnchor = groupByKey(anchorCategory, "length", { omitKey: true });

      var changeCategory = [];

      for (const [key, value] of Object.entries(categoryAnchor)) {
        // //

        changeCategory.push(value);
      }

      // //

      var newAnchor = [];

      changeCategory.reverse().forEach((element, index) => {
        var valNew = [];

        element.forEach((val) => {
          // //
          valNew.push(val.val);
        });

        newAnchor.push(valNew);
      });

      // //

      var concatArray = [];

      newAnchor.forEach((element, index) => {
        concatArray = concatArray.concat(element);
      });

      //

      console.log("concatArray", concatArray);

      return concatArray;
    },
    arrangeResult(data) {
      var result = [];
      var array = [];

      result = data;

      result.forEach((element, index) => {
        //

        array.push({
          topics: JSON.parse(element.content).topics,
          content: [JSON.parse(element.content).content],
        });
      });
      //

      return array;
      //this.p = this.assignEditorTitles(this.p);
    },

    addKeywordPool(data) {
      Auth.addKeywordsPool(data)
        .then((res) => {
          this.$toast.success(res.data.message);

          // this.$bvToast.toast(res.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          var list_keyword = [];

          // for (var count = 1; count < 5; count++) {
          //   Auth.keywordsPool(count)
          //     .then((response) => {
          //       response.data.data.data.forEach((element) => {
          //         list_keyword.push(element);
          //       });
          //       localStorage.setItem(
          //         "keyword_pool",
          //         JSON.stringify(list_keyword)
          //       );
          //     })
          //     .catch((error) => {});
          // }
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    },
  },

  created() {
    if (!this.$route.params.id) {
    }

    localStorage.removeItem("content_gen_value");

    this.permissions = localStorage.permissions;

    AiContentGenerator.fetchContentCampaign({
      id: this.$route.params.id,
    }).then((response) => {
      ////
      this.content = response.data.data;

      this.content_location = this.content.location.name;
      this.content_target_phrases = this.content.target_phrases;
      this.content_product_name = this.content.product_name;
      this.content_product_description = this.content.product_description;

      if (this.content.campaign_type != "blog_writer") {
        this.first_step = false;
        var topics = [];
        topics = response.data.data.subtopics;

        console.log(response.data.data.subtopics);

        if (response.data.data.subtopics != null) {
          this.subtopics = JSON.parse(topics.value);
        }
        console.log(this.subtopics);

        this.anchors = this.arrangeAnchor(response.data.data.anchors);
        console.log(JSON.parse(response.data.data.anchors[0].value).length==0);
        console.log(response.data.data.texts);
        this.p = this.arrangeResult(response.data.data.texts);
        if(JSON.parse(response.data.data.anchors[0].value).length!=0){
        if (
          this.content.subtopic_case == "blog idea and outline" ||
          this.content.subtopic_case == "blog section writing" ||
          this.content.subtopic_case == "business idea pitching" ||
          this.content.subtopic_case == "selling copywriting" ||
          this.content.subtopic_case == "descriptive copywriting" ||
          this.content.subtopic_case == "paragraphs" ||
          this.content.subtopic_case == "keyword cluster"
        ) {
          this.p = this.handleAnchor_others(this.p, this.anchors);

          console.log(this.p);
        }
        }
        console.log(this.content.result);

         if(JSON.parse(this.content.result[0].value).length!=0){  
        if (this.content.result.length != 0) {
          this.content.result.forEach((element) => {
            if (element.key == "semantic_topics") {
              this.semanticTopics = JSON.parse(element.value);
              this.semanticTopics.forEach((element) => {
                this.words.push([element.text, element.value]);
              });

              //console.log(this.words.length)

              if (this.words.length == 0) {
                this.tabs.splice(1, 1);
              }
            }
          });
        }
         }
    

        console.log(this.p);
      } else {
        if (response.data.data.nexart_camapaigns.length != 0) {
          this.NexArtCards(response.data.data.nexart_camapaigns);
        }

        if (this.content.result.length != 0) {
          this.content.result.forEach((element) => {
            if (element.key == "semanticTopics") {
              this.semanticTopics = JSON.parse(element.value);
              this.semanticTopics.forEach((element) => {
                this.words.push([element.text, element.value]);
              });
            }
          });
        }

        var earlyAnchor = [];
        if (response.data.data.anchors.length != 0) {
          JSON.parse(response.data.data.anchors[0].value).forEach((val) => {
            earlyAnchor.push(val);
          });
        }

        var anchorCategory = [];

        earlyAnchor.forEach((val) => {
          const arr = val.split(" ");

          anchorCategory.push({
            val: val,
            length: arr.filter((word) => word !== "").length,
          });
        });

        var categoryAnchor = [];
        const groupByKey = (list, key, { omitKey = false }) =>
          list.reduce(
            (hash, { [key]: value, ...rest }) => ({
              ...hash,
              [value]: (hash[value] || []).concat(
                omitKey ? { ...rest } : { [key]: value, ...rest }
              ),
            }),
            {}
          );

        categoryAnchor = groupByKey(anchorCategory, "length", {
          omitKey: true,
        });

        var changeCategory = [];

        for (const [key, value] of Object.entries(categoryAnchor)) {
          changeCategory.push(value);
        }

        var newAnchor = [];

        changeCategory.reverse().forEach((element, index) => {
          var valNew = [];

          element.forEach((val) => {
            // //
            valNew.push(val.val);
          });

          newAnchor.push(valNew);
        });

        // //

        var concatArray = [];

        newAnchor.forEach((element, index) => {
          concatArray = concatArray.concat(element);
        });

        ////

        this.anchors = concatArray;

        response.data.data.result.forEach((element) => {
          if (element.key == "generated_text") {
            this.generated_text = JSON.parse(element.value);
            // console.log("generated_text",this.generated_text)

            this.Intro = this.generated_text.Content.Introduction;
            this.conclusion = this.generated_text.Content.Conclusion;

            //

            this.generated_text.Content.Body.forEach((element) => {
              if (element.length != 0) {
                this.paragraph.push(element);
              }
            });

            // this.paragraph = this.generated_text.Content.Body;

            this.paragraph.forEach((element, index) => {
              this.paraShow.push(true);

              this.paragraph[index] = this.handleAnchor(element);
              //
            });

            if (this.generated_text.Content.H1) {
              this.generated_text.Content.H1.forEach((element) => {
                if (element.length != 0) {
                  this.h1Elements.push(element);
                }
              });

              this.h1Elements.forEach((element, index) => {
                this.h1Show.push(true);

                this.h1Elements[index] = this.handleAnchor(element);
                //
              });
            }

            // var printItem = ``;

            // this.paragraph.forEach((element) => {
            //   printItem = printItem + `\n` + element + `\n`;

            //   printItem = this.handleAnchor(printItem);
            //   //
            // });

            // this.fullParagraph = printItem;

            // this.CopyParagraph =
            //   this.Intro + `\n` + this.fullParagraph + `\n` + this.conclusion;

            ////
          }

          if (element.key == "outlines") {
            if (typeof JSON.parse(element.value)[0] == "string") {
              this.h2Elements = JSON.parse(element.value);
            } else {
              this.h2Elements = JSON.parse(element.value)[0].topics;
            }
          }
        });
        console.log(this.h2Elements);

        this.Intro = this.handleAnchor(this.Intro);

        this.conclusion = this.handleAnchor(this.conclusion);
      }
    });
  },
};
</script>

<style lang="css" scoped>
.details__card {
  padding: 0.5rem 1rem 1rem;
  display: flex;
  justify-content: start;
}
.details__wrapper {
  padding-top: 1rem;
  min-width: 21px;
}
.col-20 {
  min-height: 1px;
  width: 20% !important;
}
.details__desc {
  color: #717170;
}
.custom-select {
  border: 1px solid #ced4da !important;
  padding: 0.375rem 0.25rem;
}

.results__downloadtext {
  position: absolute;
  color: white;
  background-color: var(--color-primary);
  padding: 0 0.5rem;
  border-radius: 4px;
  transform: translate(-128px, 50%);
  font-weight: bold;
  opacity: 0;
  transition: all 0.4s ease-out;
  pointer-events: none;
}
.results__downloadbtn:hover ~ .results__downloadtext {
  opacity: 1;
  transition: all 0.4s ease-out;
}
/* keywords semantics analysis */
.card__keywords_table {
  border: 2px solid var(--color-primary);
  border-radius: 10px;
  padding: 1rem;
  max-width: 900px;
  /* display: flex;
  flex-direction: column;
  margin: 0 auto; */
}
.keywords_thead {
  font-weight: bold;
  padding-bottom: 1rem;
}
.keywords_thead .col,
.keywords_thead .col-2 {
  display: flex;
  align-items: center;
}
.keywords_thead,
.keywords_tbody {
  border-bottom: 1px solid rgb(187, 187, 187);
  margin-bottom: 0.6rem;
}
.keywords_tbody:last-child {
  border-bottom: 1px solid transparent;
  margin-bottom: -0.5rem;
}
.keywords_thead .material-icons-outlined {
  color: rgb(78, 78, 78);
  margin-left: 0.2rem;
  padding-bottom: 0.3rem;
}
/* ------------------------------------------------------------------- */
/* test border animation*/
/* h1 { color: #666;display:inline-block; margin:0;text-transform:uppercase; }
h1:after {
  display:block;
  content: '';
  border-bottom: solid 3px #019fb6;  
  transform: scaleX(0);  
  transition: transform 250ms ease-in-out;
}
h1:hover:after { transform: scaleX(1); }
h1.fromRight:after{ transform-origin:100% 50%; }
h1.fromLeft:after{  transform-origin:  0% 50%; } */

/* --------------------- */
.card__inputbody {
  margin: 0 auto;
  padding: 3rem 0rem 0rem;
   /* max-width: 1200px; */
  max-width: 900px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
}

/*added */
.details__card{
 max-width: 900px;
   margin: 0 auto;
   display: flex;

}

/* #707070 */
.review__tab {
  padding: 1rem 0.5rem 0.8rem;
  border-bottom: 2px solid transparent;
  margin-right: 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.review__tab:hover {
  background-color: #ececec;
  transition: all 0.3s ease-out;
  border-bottom: 2px solid #707070;
}
/* .review__tab__counter {
  padding: 0.5rem;
  background-color: #707070;
  border-radius: 5px;
  width: 24px;
  font-weight: bold;
  color: #fff;
} */
.review__tab__title {
  padding: 0.5rem;
  color: #707070;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
}

.review__tab.active {
  border-bottom: 2px solid #1464c0;
  background-color: #ececec;
  transition: all 0.5s ease-out;
}
.review__tab.active .review__tab__counter {
  background-color: #1464c0;
  transition: all 0.5s ease-out;
}

.review__tab.active .review__tab__title {
  color: #1464c0;
  transition: all 0.5s ease-out;
}

.text-darkgreen {
  color: #183b1c;
}
.results__imagewrapper {
  height: 100%;
  aspect-ratio: 1/1;
}
.results__imagewrapper img {
  border: none;
  border-radius: 10px;
  height: 100%;
  aspect-ratio: 1/1;
}
.results__image_placeholder {
  display: grid;
  place-items: center;
  border: 1px solid #183b1c;
  border-radius: 10px;
  color: #183b1c;
  font-size: 20px;
  font-weight: 500;
  height: 100%;
  aspect-ratio: 1/1;
  padding: 1rem;
  text-align: center;
}

.nexcard__content {
  background-color: #ffffff;
  border: 1px solid rgb(207, 207, 207);
  outline: 1px solid transparent;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin: 1rem 0 2rem;
  transition: all 0.4s ease;
}
.nexcard__content.active {
  border: 1px solid var(--color-primary);
  outline: 1px solid var(--color-primary);
  transition: all 0.4s ease;
}
.nexcard__content .nexcard__content__buttons {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  transform: translate(670px, -15px);
  transition: all 0.4s ease !important;
}

.nexcard__content.active .nexcard__content__buttons {
  position: absolute;
  visibility: visible;
  opacity: 1;
  transform: translate(670px, -5px);
  transition: all 0.4s ease !important;
}

.nexcard__content__buttons .btn-copy {
  height: 38px;
}
.nexcard__content__buttons .btn-copy .material-icons-outlined {
  font-size: 22px;
}
.col-copy {
  text-align: end;
}

.btn-orderby {
  color: rgb(52, 52, 52);
  padding-bottom: 0.2 !important;
}
.col-copy .btn-copy:hover,
.btn-orderby:hover {
  color: #2d8ee3;
  transition: all 0.2s ease-out;
}
</style>
