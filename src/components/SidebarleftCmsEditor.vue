<template>
  <div>
    <aside :class="isExpandedCms && 'is-expanded'">
      <div class="input__searchSite input-group mb-3">
        <input v-model="url" type="text" class="form-control" placeholder="url" aria-label="url" aria-describedby="basic-addon2" />
        <div class="input-group-append">
          <button @click="search" class="btn btn-primary" type="button">
            <span class="material-icons-outlined">search</span>
          </button>
        </div>
      </div>
      <h5>Original Website Content</h5>

      <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>Title</h5>
        </div>
        <div class="nexcard__content__desc">
          <copy-to-clipboard :text="inspects.title" @copy="handleCopy">
            <p>{{ inspects.title }}</p>
            <button class="btn-copy material-icons-outlined">copy</button>
          </copy-to-clipboard>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>Description</h5>
        </div>
        <div class="nexcard__content__desc">
          <copy-to-clipboard :text="inspects.description" @copy="handleCopy">
            <p>{{ inspects.description }}</p>
            <button class="btn-copy material-icons-outlined">copy</button>
          </copy-to-clipboard>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>H1</h5>
        </div>
        <div :key="index" v-for="(item, index) in inspects.h1s" class="nexcard__content__desc">
          <copy-to-clipboard :text="item" @copy="handleCopy">
            <p>{{ index + 1 + ". " + item }}</p>
            <button class="btn-copy material-icons-outlined">copy</button>
          </copy-to-clipboard>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>H2</h5>
        </div>
        <div :key="index" v-for="(item, index) in inspects.h2s" class="nexcard__content__desc">
          <copy-to-clipboard :text="item" @copy="handleCopy">
            <p>{{ index + 1 + ". " + item }}</p>
            <button class="btn-copy material-icons-outlined">copy</button>
          </copy-to-clipboard>
        </div>
      </div>

      <div class="nexcard__content">
        <div class="nexcard__content__title">
          <h5>Content</h5>
        </div>
        <div :key="index" v-for="(item, index) in inspects.ps" class="nexcard__content__desc">
          <copy-to-clipboard :text="item" @copy="handleCopy">
            <p>{{ index + 1 + ". " + item }}</p>
            <button class="btn-copy material-icons-outlined">copy</button>
          </copy-to-clipboard>
        </div>
      </div>
    </aside>
  </div>
</template>
<script>
/* eslint-disable */
import CopyToClipboard from "vue-copy-to-clipboard";
import meta_cms from "@/store/meta-cms.js";
import KeywordTracker from "@/store/KeywordTracker.js";
export default {
  name: "SidebarLeftCMS",
  components: { CopyToClipboard },
  data() {
    return {
      isExpandedCms: true,
      inspects: [],
      campaign: [],
      original_url: "",
      url: "",
    };
  },
  watch: {
    isExpanded() {
      console.log(this.isExpandedCms);
    },
  },
  methods: {
    localStoreHandler(e) {
      //console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "cms_toggle") {
        this.isExpandedCms = e.value;
      }
    },
    handleCopy() {
       this.$toast.success("Copied")
      // this.$bvToast.toast("Copied", {
      //   title: "Success",
      //   variant: "success",
      //   toaster: "b-toaster-bottom-left",
      //   solid: true,
      // });
    },
    search() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      if (this.url === "") {
        this.url = this.original_url;
        loader.hide();
      } else {
        meta_cms
          .fetchInspects({
            url: this.url,
          })
          .then((response) => {
            // //
            this.inspects = response.data.data;

            loader.hide();
          })
          .catch((error) => {
            console.log(error);
            loader.hide();
          });

        // this.$store
        //   .dispatch("nexrank/fetchInspects", {
        //     url: this.campaign.page,
        //   })
        //   .then(() => {
        //     this.submitted = true;
        //   });
      }
    },
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);

    localStorage.setItem("cms_toggle", true);

    if (this.$route.params.url_id) {
      if (!this.$route.fullPath.includes("edit_manual_new")) {
        KeywordTracker.fetchRecommendation({
          client_id: this.$route.params.id,
          id: this.$route.params.url_id,
        })
          .then((response) => {
            // //
            this.campaign = response.data.data;

            this.original_url = this.campaign.client + this.campaign.uri;
            this.url = this.campaign.client + this.campaign.uri;

            KeywordTracker.fetchInspects({
              url: this.campaign.client + this.campaign.uri,
            })
              .then((response) => {
                // //
                this.inspects = response.data.data;
                loader.hide();
              })
              .catch((error) => {
                loader.hide();
                console.log(error);
              });
          })
          .catch((error) => {
            loader.hide();
            console.log(error);
          });
      } else {
        meta_cms
          .fetchRecommendation({
            client_id: this.$route.params.id,
            id: this.$route.params.url_id,
          })

          .then((response) => {
            // //
            this.campaign = response.data.data;

            this.original_url = this.campaign.url;
            this.url = this.campaign.url;

            KeywordTracker.fetchInspects({
              url: this.campaign.url,
            })
              .then((response) => {
                // //
                this.inspects = response.data.data;
                loader.hide();
              })
              .catch((error) => {
                loader.hide();
                console.log(error);
              });
          })
          .catch((error) => {
            loader.hide();
            console.log(error);
          });
      }
    } else {
      this.original_url = this.$route.params.url;
      this.url = this.$route.params.url;
      KeywordTracker.fetchInspects({
        url: this.$route.params.url,
      })
        .then((response) => {
          // //
          this.inspects = response.data.data;
          loader.hide();
        })
        .catch((error) => {
          loader.hide();
          console.log(error);
        });
    }
  },
};
</script>
<style lang="css" scoped>
aside {
  position: sticky;
  top: 67px;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--white);
  transition: 0.4s ease-out;
  border-right: rgb(207, 207, 207) 1px solid;
  outline: rgb(207, 207, 207) 1px solid;
  transform: translateX(-350px);
  padding: 1.5rem 1.2rem 1.5rem 1.5rem;
  /* margin right sidebar when not expanded */
  margin-right: -350px;
  box-shadow: -2px 3px 20px 2px #c2c2c260;
}
.input__searchSite input {
  padding: 0.375rem 0.75rem;
}
.input__searchSite .input-group-append .btn {
  height: 42px;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
/* aside::-webkit-scrollbar {
  display: none;
} */
aside::-webkit-scrollbar-track {
  background: #f9f9f9;
  box-shadow: transparent;
  border-radius: 5px;
}
/* 
aside::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 5px;
  border-left: 3px solid transparent;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}
aside::-webkit-scrollbar-thumb:hover {
  background: transparent;
  border-left: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
} */
.is-expanded {
  width: 350px;
  transform: translateX(0px);
  transition: 0.4s ease-out;
  margin-right: 0px;
}

/* nexcard css */
.nexcard__content {
  background-color: #ffffff;
  border: 1px solid var(--color-primary);
  outline: 1px solid transparent;
  border-radius: 10px;
  padding-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  margin: 0.5rem 0 0.5rem;
  transition: all 0.4s ease;
}
.nexcard__content h5 {
  margin-bottom: 0;
}
.nexcard__content .nexcard__content__buttons {
  transform: translateY(5px);
  transition: all 0.3s ease;
}
.nexcard__content .nexcard__content__desc {
  margin: 0rem 0.8rem;
  padding: 0rem 0.5rem;
  transition: all 0.3s ease;
  cursor: text;
  border-radius: 6px;
  background-color: #eeeeee;
}
.nexcard__content .nexcard__content__desc:not(:last-child) {
  margin-bottom: 0.5rem;
}
.nexcard__content .nexcard__content__desc:hover {
  background-color: #e4e4e4;
  cursor: pointer;
}
.nexcard__content__title {
  display: flex;
  padding: 1rem;
  user-select: none;
}
.nexcard__content .nexcard__content__desc p {
  padding-top: 0.5rem;
  margin-bottom: 0;
  color: #3a3a3a;
  max-height: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nexcard__content .nexcard__content__desc span {
  display: flex;
  flex-direction: column;
}
.nexcard__content .nexcard__content__desc .btn-copy {
  margin-left: auto;
  line-height: 8px;
  font-size: 18px;
  color: #8b8b8b;
  translate: 10px -15px;
  opacity: 0;
  transition: 0.2s ease-out;
}
.nexcard__content .nexcard__content__desc:hover .btn-copy {
  translate: 0px -15px;
  background-color: #eeeeeea8;
  opacity: 1;
  transition: 0.3s ease-out;
}
</style>
