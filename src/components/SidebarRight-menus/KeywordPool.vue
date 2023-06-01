<template>
  <div>
    <div class="menu-heading">
      <h5>Keyword Pool</h5>
      <!-- <button class="btn-close"></button> -->
    </div>
    <div class="menu-body" style="padding-right: 12px">
      <div class="input__addkeyword input-group mb-3 pe-1">
        <input v-model="keyword_To_Add" type="text" class="form-control" placeholder="Add Keyword" aria-label="Add Keyword" aria-describedby="basic-addon2" />
        <div class="input-group-append">
          <button @click="addKeywordPool" class="btn btn-primary" type="button">
            <span class="material-icons-outlined">add</span>
          </button>
        </div>
      </div>

      <div v-if="loading" class="d-flex justify-content-center mt-3 mb-3">
        <b-spinner variant="primary" label="Large Spinner"></b-spinner>
      </div>

      <div class="row pt-1 ps-2 pe-1" style="overflow: scroll">
        <!-- <div class=""> -->
        <draggable :sort="false" :clone="cloned" :group="{ name: 'my-group', pull: 'clone', put: true }" class="draggable-list col-auto p-0 w-100" :list="list1" :move="detectMove">
          <!-- Keyword Pill -->
          <button v-for="element in list1" :key="element.keyword" class="keyword-pill justify-space-around">
            <div class="d-flex align-items-center">
              <span class="keyword-pill__word text-muted">{{ element.keyword }}</span>
              <button class="keyword-pill__btn-x p-0">
                <span @click="removeKeyword(element)" class="material-icons text-muted">cancel</span>
              </button>
            </div>
          </button>
        </draggable>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Auth from "@/store/Auth.js";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      list1: [],
      draggedElement: "",
      value_2: "",
      value_2_2: "",
      dragging: false,
      keyword_To_Add: "",
      items: [
        {
          id: 0,
          title: "Item A",
          list: 1,
        },
        {
          id: 1,
          title: "Item B",
          list: 1,
        },
        {
          id: 2,
          title: "Item C",
          list: 2,
        },
      ],
      loading: true,
    };
  },
  watch: {},

  methods: {
    addKeywordPool() {
      this.loading = true;
      Auth.addKeywordsPool(this.keyword_To_Add)
        .then((res) => {
          this.$toast.success(res.data.message);
          // this.$bvToast.toast(res.data.message, {
          //   title: "Success",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.keyword_To_Add = "";
          this.list1 = [];
          for (var count = 1; count < 5; count++) {
            Auth.keywordsPool(count)
              .then((response) => {
                response.data.data.data.forEach((element) => {
                  this.list1.push(element);
                });
                this.loading = false;
              })
              .catch((error) => {
                this.loading = false;
                console.log(error);
              });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },

    cloned(evt) {
      console.log(evt);
      this.draggedElement = evt.keyword;
      localStorage.setItem("draggedElement", this.draggedElement);
    },

    removeKeyword(data) {
      this.loading = true;
      Auth.removeKeywordsPool(data.id)
        .then((res) => {
          this.$toast.success(res.data.message);
          // this.$bvToast.toast(res.data.message, {
          //   title: "Removed",
          //   variant: "success",
          //   toaster: "b-toaster-bottom-left",
          //   solid: true,
          // });
          this.list1 = [];
          for (var count = 1; count < 5; count++) {
            Auth.keywordsPool(count)
              .then((response) => {
                response.data.data.data.forEach((element) => {
                  this.list1.push(element);
                });
                this.loading = false;
              })
              .catch((error) => {
                this.loading = false;
                console.log(error);
              });
          }
        })

        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
  },
  created() {
    for (var count = 1; count < 5; count++) {
      Auth.keywordsPool(count)
        .then((response) => {
          response.data.data.data.forEach((element) => {
            this.list1.push(element);
          });
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    }
  },
};
</script>

<style lang="css">
.keyword-pill {
  margin: 0rem 0.5rem 0.5rem 0rem;
  background-color: #3737371f;
  padding: 3px 5px 3px 10px;
  border-radius: 15px;
}
.keyword-pill:hover {
  background-color: #0101012a;
}
.keyword-pill__word {
  font-size: 15px;
}
.keyword-pill__btn-x {
  margin-left: 5px;
  margin-bottom: -6px;
}
.keyword-pill__btn-x .material-icons {
  font-size: 17px;
  margin-top: 1px;
}
.keyword-pill__btn-x .material-icons:hover {
  color: red !important;
  transition: 0.5 ease-out;
}
.menu-keyword-collection {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0rem 1rem 0rem 0rem;
}

.input__addkeyword.input-group input {
  padding-right: 0rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  border: 1px solid #2c8ee1;
  border-right: 0;
  height: 42px;
}
.input__addkeyword.input-group input {
  border: 1px solid #2c8ee1;
  border-right: 0;
}

.input__addkeyword.input-group input:focus {
  border: 1px solid #2c8ee1;
  border-right: 0;
  box-shadow: none;
}
.input__addkeyword.input-group:focus-within {
  border-radius: 0.375rem;
  border-color: rgba(44, 142, 225, 0.8);
  box-shadow: rgba(44, 142, 225, 0.3) 0px 1px 2px 0px, rgba(44, 142, 225, 0.15) 0px 2px 6px 2px;
  outline: 0 none;
}
.input__addkeyword .input-group-append .btn {
  height: 42px;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.input__addkeyword .input-group-append .btn .material-icons-outlined {
  padding-top: 2px;
}
</style>
