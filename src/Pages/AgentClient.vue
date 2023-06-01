<template>
  <div class="dashboard-agent container">
    <div class="d-flex align-items-center">
      <div class="agentClient-logo" style="user-select: none">
        <img src="../assets/nexmind/nexmind-logo.png" alt="Nexmind" />
        <span style="font-size: 40px; margin-left: 1rem; padding-top: 0.5rem; color: #2c8ee1; margin-bottom: 0.5rem">
          <strong>Nex<span style="color: #333333">Mind</span></strong>
        </span>
      </div>

      <div class="ms-auto">
        <button @click="logout" class="d-flex align-items-center mt-2 btn-logout">
          <h5 class="material-icons-outlined">logout</h5>
          <h5 class="ms-2">Logout</h5>
        </button>
      </div>
    </div>

    <div class="d-flex my-2 mx-1">
      <h4 class="text-muted">Daily Keyword Ranking</h4>
    </div>

    <div class="view-all-table-wrapper">
      <div class="nexcard">
        <!--Search and Add Content button -->
        <div class="d-flex mb-4">
          <div>
            <strong class="me-3">My Project</strong>
            <select
              class="custom-select rounded"
              id="inputGroupSelect04"
              aria-label="Example select with button addon"
              v-model="chosenClient"
              @change="chooseClient(chosenClient)"
              style="width: 480px"
            >
              <option :value="client" :key="index" v-for="(client, index) in Clients">
                {{ client.name }}
              </option>
            </select>
          </div>
          <div>
            <strong class="mx-3">Location</strong>

            <select class="custom-select rounded" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="selectedLoc" @change="ChooseLoc()" style="width: 420px">
              <option disabled v-if="chosenClient.length == 0">--Please select your project--</option>

              <option :value="loc" :key="index" v-for="(loc, index) in locations">
                {{ loc.name | loc }}
              </option>
            </select>
          </div>
        </div>

        <div class="nextable border">
          <div class="row nextable__head g-0">
            <div class="col"><p>Keyword</p></div>
            <div class="col"><p>Rank</p></div>
            <div class="col"><p>URL</p></div>
            <!-- <div class="col"><p>Created By</p></div>
            <div class="col"><p>Create/Update Date</p></div> -->
          </div>

          <div class="nextable__body__collection" v-infinite-scroll="addData" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
            <div class="row nextable__body g-0" v-for="(item, index) in keyword_rank_to_show" :key="'keyword_rank_to_show' + index">
              <div class="col">
                <p>{{ item.keyword }}</p>
              </div>
              <div class="col">
                <p v-if="item.rank !== null && item.url != 'Not Found'">
                  {{ item.rank }}
                </p>

                <p v-else-if="item.url == 'Not Found'">URL not found</p>
              </div>
              <div class="col">
                <p v-if="item.url == null">No Url</p>
                <p v-else>{{ item.url }}</p>
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
import KeywordTracker from "@/store/KeywordTracker.js";

export default {
  components: {},
  data() {
    return {
      chosenClient: "",
      Clients: [],
      selectedLoc: [],
      locations: [],
      allLocation: [],
      all_keywords_rank: [],
      keyword_rank_to_show: [],
      current_all_rank: [],
      pageList: [],
      page: 0,
    };
  },
  methods: {
    ChooseLoc() {
      // //
      this.page = 1;
      console.log(this.selectedLoc, this.allLocation);

      if (this.selectedLoc.name == "All") {
        this.keyword_rank_to_show = this.all_keywords_rank;
      } else {
        this.allLocation.forEach((element) => {
          if (element.key === this.selectedLoc.name) {
            console.log(element);

            this.keyword_rank_to_show = element.value;
          }
        });
      }

      this.current_all_rank = this.keyword_rank_to_show;

      this.keyword_rank_to_show = this.current_all_rank.slice(0, 10);
      this.pageList = this.current_all_rank;
    },

    addData() {
      this.page = this.page + 1;
      let currentList = this.pageList.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10);
      currentList.forEach((element) => {
        this.keyword_rank_to_show.push(element);
      });
    },

    chooseClient(data) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      this.all_keywords_rank = [];
      this.pageList = [];
      this.locations = [{ name: "All" }];
      this.selectedLoc = { name: "All" };
      this.page = 1;

      KeywordTracker.fetchDailyKeyword(data.id).then((response) => {
        //
        loader.hide();

        for (const [key, value] of Object.entries(response.data.data)) {
          // //
          value.forEach((element) => {
            this.all_keywords_rank.push(element);
          });
        }

        for (const [key, value] of Object.entries(response.data.data)) {
          this.allLocation.push({ key: key, value: value });
          this.locations.push({ name: key });
        }

        this.current_all_rank = this.all_keywords_rank;
        this.keyword_rank_to_show = this.all_keywords_rank.slice(0, 10);
        this.pageList = this.all_keywords_rank;
      });
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("me");
      this.$router.push("/login");
    },
  },
  created() {
    if (JSON.parse(localStorage.nexrank_client) != null) {
      this.Clients = JSON.parse(localStorage.nexrank_client).sort((a, b) => a.name.localeCompare(b.name));
    }
  },
};
</script>

<style scoped>
.dashboard-agent {
  position: relative;
  max-width: calc(1200px);
  margin: 0rem auto;
  padding: 0rem 2rem 2rem;
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
  border-radius: 10px;
  padding: 0.5rem;
}

.nextable .nextable__head {
  background-color: transparent !important;
  position: sticky;
  top: 0;
}
.nextable .nextable__body__collection {
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
}
.nextable .nextable__body__collection {
  height: 63vh;
}
@media screen and (max-height: 917px) {
  .nextable .nextable__body__collection {
    height: 62vh;
  }
}
@media screen and (max-height: 850px) {
  .view-all-table-wrapper {
    padding-bottom: 0.2rem;
  }
  .nextable .nextable__body__collection {
    height: 55vh;
  }
}
.nextable .nextable__head {
  margin-right: 8px;
  border-bottom: 2px solid #e8e8e8;
}
.nextable .nextable__head .col {
  padding: 1rem;
  font-weight: bold;
}

.nextable .nextable__body .col {
  padding: 1rem;
  align-items: center;
  display: flex;
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
.grey-bg {
  background-color: #d6d6d6;
}
.row-text {
  font-size: 1.2rem;
}
.text-darkgrey {
  color: #474747;
}

.agentClient-logo {
  margin: 0.5rem 0.5rem 0rem;
  display: flex;
  align-items: center;
}
.agentClient-logo img {
  width: 3rem;
  object-fit: contain;
}
.custom-select {
  border: 1px solid #ced4da !important;
  padding: 0.375rem 0.25rem;
}

.btn-logout {
  border-radius: 8px;
  background-color: #dce8f6;
  padding: 0.5rem 0.5rem 0.1rem;
  color: #6c757d;
}
.btn-logout:hover {
  background-color: #2c8ee1;
  color: #fff;
  transition: all 0.4s ease-out;
}
</style>
