<template>
  <div>
    <b-modal id="modal-assign-client" ref="modal-assign-client" centered hide-footer hide-header>
      <assign-client :reassign_id="reassign_id" />
    </b-modal>

    <div class="view-all-table-wrapper">
      <div class="route__linkpath mb-4 fw-normal">
        <p class="text-muted fw-normal">
          <button @click="$router.go(-1)" class="material-icons-outlined btn-back">arrow_back</button>
          <router-link to="/dashboard" class="route__link">Dashboard</router-link>
          / Search
        </p>
      </div>
      <div class="nexcard">
        <div class="nextable">
          <div class="row nextable__head g-0">
            <div class="col"><p>Keyword</p></div>
            <div class="col"><p>Project Name</p></div>
            <div class="col"><p>Type</p></div>
            <div class="col"><p>Created By</p></div>
            <div class="col"><p>Create Date</p></div>
            <div class="col action"><p>Action</p></div>
          </div>

          <div class="nextable__body__collection">
            <div class="row nextable__body g-0" v-for="(search, index) in all_search_items" :key="'all_search_item' + index">
              <div class="col campaign">
                <p>{{ search.keyword }}</p>
                <!-- ============================================================================= -->
                <!-- Status acc to different feature-->
                <!-- ============================================================================= -->

                <div class="status" v-if="search.key == 'keywordQuery'">
                  <div class="row">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>

                <div class="status" v-if="search.key == 'nexAutomate'">
                  <div class="row" v-if="search.complete_percentage < 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else>
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>

                <div class="status" v-if="search.key == 'nexWriter'">
                  <div class="row" v-if="search.count == 66 && search.completePercentage < 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="search.count == 66 && search.completePercentage >= 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="search.generation_depth == 'new' && search.campaign_type != 'blog_writer' && search.completePercentage > 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="search.generation_depth == 'new' && search.campaign_type != 'blog_writer'">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="search.status == 'Pending step 2' || search.status == 'Collecting Data'">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="search.status == 'Done step 1' && search.completed >= 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="search.status == 'Complete the second step' && search.completed >= 100 && search.last_step == 'finish content generating'">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="search.status == 'Complete the second step' && search.last_step == 'finishing to generate subtopics'">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="search.status == 'Done step 1' && search.completed < 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <div class="row" v-else-if="search.status == 'Complete the second step' && search.completed < 100">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-pending.svg`)" alt="" class="status__icon" />
                      <p class="status__text">pending</p>
                    </div>
                  </div>

                  <!--#attention green-->
                  <div class="row" v-else-if="search.status == 'Done'">
                    <div class="col">
                      <img :src="require(`@/assets/icons/icon-status-complete.svg`)" alt="" class="status__icon" />
                      <p class="status__text">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col" v-if="search.client_id">
                <p>{{ search.client_id | project_name }}</p>
              </div>
              <div class="col" v-else>
                <p>{{ search.client.id | project_name }}</p>
              </div>
              <div class="col">
                <p>{{ search.key | cross_name }}</p>
              </div>
              <div class="col" v-if="search.creator.email">
                <p>{{ search.creator.email }}</p>
              </div>
              <div class="col" v-else>
                <p>{{ search.creator }}</p>
              </div>
              <div class="col date">
                <p>{{ search.created_at | formatDate }}</p>
              </div>
              <div class="col action">
                <div class="action-menu">
                  <button class="text-center">
                    <span class="btn-action material-icons-outlined">more_horiz</span>
                  </button>
                  <div class="action-menu-dropdown">
                    <span @click="select(search)" class="open"><span class="material-icons-outlined">file_open</span>Open</span>
                    <!-- <span class="star"
                      ><span class="material-icons-outlined">star_border</span
                      >Star</span
                    > -->
                    <span @click="share(search.id)" class="move"><span class="material-icons-outlined">forward</span>Move</span>

                    <span v-if="search.key != 'nexAutomate'" @click="openFolder(search.client_id)" class="folder"><span class="material-icons-outlined">folder_open</span>Project</span>
                    <span v-else @click="openFolder(search.client.id)" class="folder"><span class="material-icons-outlined">folder_open</span>Project</span>
                  </div>
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
import Auth from "@/store/Auth.js";
import assignClient from "@/Pages/Projects/ReassignProject.vue";
export default {
  name: "assign_client_modal",
  components: { assignClient },
  data() {
    return {
      n: 1,
      all_search_items: [],
      reassign_id: "",
    };
  },
  watch: {
    $route() {
      if (this.$route.params.keyword == "") {
        this.$router.push({ name: "Dashboard" });
      } else {
        let loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: true,
          onCancel: this.onCancel,
        });
        this.all_search_items = [];
        Auth.platformSearch(this.$route.params.keyword.toLowerCase())
          .then((response) => {
            loader.hide();
            // console.log(response.data.data)
            for (const [key, value] of Object.entries(response.data)) {
              if (key != "keywordAnalyzer" && key != "contentGeneration" && key != "contentOptimization" && key != "pageSpeed") {
                console.log(key, value);
                value.data.data.forEach((element, index) => {
                  element.key = key;
                  this.all_search_items.push(element);
                });
              }
            }

            console.log(this.all_search_items);
          })

          .catch((error) => {
            console.log(error);
            loader.hide();
          });
      }
    },
  },
  methods: {
    openFolder(data) {
      this.$router.push({
        name: "projects",
        params: {
          id: data,
        },
      });
    },

    select(data) {
      if (data.key == "keywordQuery") {
        data.locations.forEach((element) => {
          this.locationId = element.id;
        });

        this.$router.push({
          name: "keyword_discovery",
          params: {
            id: data.id,
            location: this.locationId,
          },
        });
        // data.locations.forEach((element) => {
        //   this.locationId = element.id;
        // });
        // if (this.$route.params.client_id == "fromDefault") {
        //   this.$router.push({
        //     name: "QueryProgress",
        //     params: {
        //       id: data.id,
        //       locationID: this.locationId,
        //       client_id: data.client_id,
        //       fromDefault: "fromDefault",
        //     },
        //   });
        // } else {
        //   this.$router.push({
        //     name: "QueryProgress",
        //     params: {
        //       id: data.id,
        //       locationID: this.locationId,
        //       client_id: data.client_id,
        //     },
        //   });
        // }
      } else if (data.key == "nexWriter") {
        if (data.campaign_type == "blog_writer") {
          this.$router.push({
            name: "content_image_add_fields",
            params: { step: "content", id: data.id, category: "blog writing" },
          });
        } else {
          this.$router.push({
            name: "content_image_add_fields",
            params: {
              step: "content",
              id: data.id,
              category: data.subtopic_case,
            },
          });
        }
      } else if (data.key == "nexAutomate") {
        this.$router.push({
          name: "ai_seo_automation_campaign",
          params: {
            id: data.id,
            location: data.location.id,
          },
        });
        // if (this.$route.params.client_id == "fromDefault") {
        //   if (data.complete_percentage < 100) {
        //     this.$bvToast.toast("The campaign is still processing", {
        //       title: "Info",
        //       variant: "info",
        //       toaster: "b-toaster-bottom-left",
        //       solid: true,
        //     });
        //   } else {
        //     if (data.current_step == "done first step") {
        //       if (data.client == null) {
        //         this.$router.push({
        //           name: "NewOptimizedSelection",
        //           params: {
        //             id: data.id,
        //             locationID: data.location.id,
        //             client_id: "no_client",
        //             fromDefault: "fromDefault",
        //           },
        //         });
        //       } else {
        //         this.$router.push({
        //           name: "NewOptimizedSelection",
        //           params: {
        //             id: data.id,
        //             locationID: data.location.id,
        //             client_id: data.client.id,
        //             fromDefault: "fromDefault",
        //           },
        //         });
        //       }
        //     }
        //   }
        // } else {
        //   if (data.complete_percentage < 100) {
        //     this.$bvToast.toast("The campaign is still processing", {
        //       title: "Info",
        //       variant: "info",
        //       toaster: "b-toaster-bottom-left",
        //       solid: true,
        //     });
        //   } else {
        //     if (data.current_step == "done first step") {
        //       if (data.client == null) {
        //         this.$router.push({
        //           name: "NewOptimizedSelection",
        //           params: {
        //             id: data.id,
        //             locationID: data.location.id,
        //             client_id: "no_client",
        //           },
        //         });
        //       } else {
        //         this.$router.push({
        //           name: "NewOptimizedSelection",
        //           params: {
        //             id: data.id,
        //             locationID: data.location.id,
        //             client_id: data.client.id,
        //           },
        //         });
        //       }
        //     }
        //   }
        // }
      }
    },
    share(id) {
      this.reassign_id = id;
      this.$bvModal.show("modal-assign-client");
    },
  },
  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });

    Auth.platformSearch(this.$route.params.keyword.toLowerCase())
      .then((response) => {
        loader.hide();
        // console.log(response.data.data)
        for (const [key, value] of Object.entries(response.data)) {
          if (key != "keywordAnalyzer" && key != "contentGeneration" && key != "contentOptimization" && key != "pageSpeed") {
            console.log(key, value);
            value.data.data.forEach((element, index) => {
              element.key = key;
              this.all_search_items.push(element);
            });
          }
        }

        console.log(this.all_search_items);
      })

      .catch((error) => {
        console.log(error);
        loader.hide();
      });
  },
};
</script>
<style lang="css" scoped>
.view-all-table-wrapper {
  position: relative;
  max-width: calc(1600px + 3rem);
  margin: 0rem auto;
  padding: 2rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.nexcard {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 1rem;
  /* overflow-y: hidden; */
  /* height: 100vh; */
}
.nextable {
  flex-direction: column;
}

.nextable .nextable__head {
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  position: relative;
}
@media screen and (min-height: 917px) {
  .nextable .nextable__body__collection {
    max-height: 62vh;
  }
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body__collection {
    height: 60vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 2rem;
  }
  .nextable .nextable__body__collection {
    height: 53vh;
  }
}
.nextable .nextable__head {
  /* scroll-bar width */
  margin-right: 8px;
  border-bottom: 1px solid #e6e6e6;
}
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
  /* border: 1px solid black; */
}
.nextable .nextable__head .col.profile {
  text-align: end;
  max-width: 100px;
}
.nextable .nextable__head .col.action {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__head .col:last-child {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body .col {
  padding: 1rem;
  align-items: center;
  display: flex;
  /* border: 1px solid black; */
}
.nextable .nextable__body .col.profile {
  text-align: end;
  max-width: 100px;
  justify-content: end;
}
.nextable .nextable__body .col.action {
  text-align: center;
  max-width: 100px;
  justify-content: center;
}
.nextable .nextable__body .col:last-child {
  text-align: center;
  max-width: 100px;
}
.nextable .nextable__body {
  border-bottom: 1px solid #e6e6e6;
}
p {
  margin: 0;
  color: #323233;
  font-weight: 600;
}
.col.campaign {
  display: flex;
  flex-direction: column;
  align-items: start !important;
}
.profile img {
  max-height: 35px;
  margin-top: 5px;
}
.date p {
  font-weight: normal;
}

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
.status {
  display: flex;
}

.status .col {
  padding: 0.2rem 0.9rem !important;
}
.status__icon {
  max-height: 18px;
  margin-top: 2px;
  margin-left: 0px;
}
.status__text {
  font-weight: normal;
  color: #707070;
  margin-left: 0.4rem;
  text-transform: capitalize;
}
.profile__icon {
  margin-left: auto;
}

/* action menu css */
.action-menu-dropdown {
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  text-align: left;
  transform: translate(-80px, -10px);
  width: 120px;
  color: #272727;
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
  color:#707070;
}
.action-menu-dropdown span .material-icons-outlined {
  font-size: 20px;
  color:#707070
}
.action-menu-dropdown span:hover {
  background-color: #e6e6e69c;
  transition: all 0.2s ease-out;
  border-radius: 5px;
}
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;
  color: grey;
}
.action-menu-dropdown span:hover.star {
  transition: all 0.2s ease-out;

}
.action-menu-dropdown span:hover.edit,
.action-menu-dropdown span:hover.open {
  transition: all 0.2s ease-out;

}
.action-menu-dropdown span:hover.move {
  transition: all 0.2s ease-out;

}
.action-menu-dropdown span:hover.folder {
  transition: all 0.2s ease-out;

}
</style>
