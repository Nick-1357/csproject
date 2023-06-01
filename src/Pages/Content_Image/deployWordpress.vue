<template>
  <div>
    <div class="card-body" v-if="type == 'info'">
      <strong class="card-title">Integration Guide!</strong>

      <div class="row mt-3" v-if="item.tokens.length != 0">
        <div class="col">
          <div class="row">
            <div class="col">
              <span v-if="failed == false"
                >Please ensure that you have integrated your wordpress account.
                Follow this link for instruction: </span
              ><span class="text-danger" v-else
                >Please Integrate WordPress Plugin Correctly. Follow this link
                for instruction: </span
              ><a
                href="https://www.nexmind.ai/wordpress-integration/"
                target="_blank"
                >https://www.nexmind.ai/wordpress-integration/</a
              >
            </div>
          </div>
          <div class="card p-1 mt-2">
            <div class="row">
              <div class="col-9 align-self-center">
                <b>Token ID :</b>
                <div class="row">
                  <div class="col-12">
                    <span>
                      {{ item.tokens[0].token_id }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-3 align-self-center">
                <copy-to-clipboard
                  :text="item.tokens[0].token_id"
                  @copy="handleCopy"
                >
                  <copy-icon size="1.2x" class="custom-class"></copy-icon>
                </copy-to-clipboard>
              </div>
            </div>

            <div class="row">
              <div class="col-9 align-self-center">
                <b>User ID :</b>
                <div class="row">
                  <div class="col-12">
                    <span>
                      {{ item.tokens[0].user_id }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-3 align-self-center">
                <copy-to-clipboard
                  :text="item.tokens[0].user_id"
                  @copy="handleCopy"
                >
                  <copy-icon size="1.2x" class="custom-class"></copy-icon>
                </copy-to-clipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col">
          <p>NO DATA</p>
        </div>
      </div>
    </div>

    <div class="card-body" v-else-if="type == 'update'">
      <strong class="card-title">Confirmation!</strong>

      <div class="card-text mt-3">
        <span>The wordpress page will be updated</span>
      </div>

      <div class="card-text d-flex mt-3">
        <button
          class="btn btn-primary-outlined ms-auto"
          @click="$bvModal.hide('modal-word-press')"
        >
          No
        </button>
        <button class="btn btn-primary ms-2" @click.once="editPage()">
          Update
        </button>
      </div>
    </div>

    <div class="card-body" v-else-if="type == 'remove'">
      <div class="card-body">
        <strong class="card-title">Confirmation!</strong>

        <div class="card-text mt-3">
          <span>The wordpress page will be removed</span>
        </div>

        <div class="card-text d-flex mt-3">
          <button
            class="btn btn-primary-outlined ms-auto"
            @click="$bvModal.hide('modal-word-press')"
          >
            No
          </button>
          <button class="btn btn-danger ms-2" @click.once="removeConfirm()">
            Remove
          </button>
        </div>
      </div>
    </div>

    <div class="card-body" v-else>
      <strong class="card-title" v-if="failed == false">Confirmation!</strong>

      <strong class="card-title text-danger" v-else>Deployment failed!</strong>

      <div class="card-text mt-3">
        <span v-if="failed == false"
          >The title of your Blog will be <b> {{ keyword }}</b></span
        >
      </div>

      <div class="row mt-3" v-if="item.tokens.length != 0">
        <div class="col">
          <div class="row">
            <div class="col">
              <span v-if="failed == false"
                >Please ensure that you have integrated your wordpress account.
                Follow this link for instruction: </span
              ><span class="text-danger" v-else
                >Please Integrate WordPress Plugin Correctly. Follow this link
                for instruction: </span
              ><a
                href="https://www.nexmind.ai/wordpress-integration/"
                target="_blank"
                >https://www.nexmind.ai/wordpress-integration/</a
              >
            </div>
          </div>
          <div class="card p-1 mt-2">
            <div class="row">
              <div class="col-9 align-self-center">
                <b>Token ID :</b>
                <div class="row">
                  <div class="col-12">
                    <span>
                      {{ item.tokens[0].token_id }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-3 align-self-center">
                <copy-to-clipboard
                  :text="item.tokens[0].token_id"
                  @copy="handleCopy"
                >
                  <copy-icon size="1.2x" class="custom-class"></copy-icon>
                </copy-to-clipboard>
              </div>
            </div>

            <div class="row">
              <div class="col-9 align-self-center">
                <b>User ID :</b>
                <div class="row">
                  <div class="col-12">
                    <span>
                      {{ item.tokens[0].user_id }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-3 align-self-center">
                <copy-to-clipboard
                  :text="item.tokens[0].user_id"
                  @copy="handleCopy"
                >
                  <copy-icon size="1.2x" class="custom-class"></copy-icon>
                </copy-to-clipboard>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-text mt-3">
        <span v-if="failed == false">Confirm Deployment ?</span>
      </div>

      <div class="card-text d-flex mt-3">
        <button
          class="btn btn-primary-outlined ms-auto"
          @click="$bvModal.hide('modal-word-press')"
        >
          No
        </button>
        <button
          class="btn btn-primary ms-2"
          v-if="failed == false"
          @click.once="deploy()"
        >
          Deploy to Wordpress
        </button>
        <button class="btn btn-primary ms-2" v-else @click="deploy()">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>
    

<script>
/* eslint-disable */

import AiContentGenerator from "@/store/AiContentGenerator.js";
import KeywordTracker from "@/store/KeywordTracker.js";
import CopyToClipboard from "vue-copy-to-clipboard";
import { CopyIcon } from "vue-feather-icons";
export default {
  props: {
    type: {
      type: String,
    },
  },

  components: {
    CopyToClipboard,
    CopyIcon,
  },
  data() {
    return {
      failed: false,
      content: [],
      keyword: "",
      content_id: "",
      item: [],
      deployed_pages: [],
    };
  },
  destroyed() {},
  methods: {
    handleCopy() {
      this.$toast.success("Copied")
      // this.$bvToast.toast("Copied", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    },
    deploy() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      var obj = {
        campaign_id: this.content_id,
        title: this.keyword,
        page_content: this.content,
      };

      AiContentGenerator.deployWordpress(obj, this.$route.params.client_id)
        .then((response) => {
          if (response.data.message == null) {
            this.failed = true;
            loader.hide();
          } else if (response.data.message.code) {
            this.$toast.error(response.data.message.message)

             loader.hide();
            // this.$bvToast.toast(response.data.message.message, {
            //   title: "Error!",
            //   variant: "danger",
            //   toaster: "b-toaster-bottom-left",
            //   solid: true,
            // });
          } else {
            loader.hide();
            this.$bvModal.hide("modal-word-press");

            window.open(response.data.message.url, "_blank");
            location.reload();
          }
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
    editPage() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      var obj = {
        title: this.deployed_pages.title,
        page_content: this.content,
      };

      AiContentGenerator.updateWordpress(
        this.$route.params.client_id,
        this.deployed_pages.id,
        obj
      )
        .then((response) => {
          loader.hide();
          this.$bvModal.hide("modal-word-press");

          window.open(response.data.message.url, "_blank");
          location.reload();
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
        });
    },
    removeConfirm() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      AiContentGenerator.removeItem(
        this.$route.params.client_id,
        this.deployed_pages.id
      )
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            loader.hide();
            this.$bvModal.hide("modal-word-press");
            location.reload();
          }, 10000);
        })
        .catch((err) => {
          console.log(err);
          loader.hide();
        });
    },
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    KeywordTracker.fetchClient(this.$route.params.client_id)
      .then((response) => {
        this.item = response.data.data;
        loader.hide();
      })

      .catch((error) => {
        loader.hide();
        console.log(error);
      });

    if (localStorage.deployed_content != undefined) {
      this.deployed_pages = JSON.parse(localStorage.deployed_content);
    }

    if (
      JSON.parse(localStorage.getItem("export_content")).content != undefined
    ) {
      this.content = JSON.parse(localStorage.getItem("export_content")).content;
    }

    if (
      JSON.parse(localStorage.getItem("export_content")).keyword != undefined
    ) {
      this.keyword = JSON.parse(localStorage.getItem("export_content")).keyword;
    }

    if (JSON.parse(localStorage.getItem("export_content")).id != undefined) {
      this.content_id = JSON.parse(localStorage.getItem("export_content")).id;
    }
  },
};
</script>
