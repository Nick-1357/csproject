<template>
  <div>
    <!--http://localhost:8080/TextToWebsite/11/542-->
    <!-- http://localhost:8080/TextToWebsite/11/543/A-->
    <h1 class="m-3">Website</h1>
    <p>save changes to your website before leave the page</p>
    <hr />

    title :
    <input
      type="text"
      autocorrect="off"
      autocomplete="off"
      name="title"
      class="form-control m-2"
      placeholder="Select an element"
      v-model="meta_title"
      aria-label="text"
      aria-describedby="text"
    />
    <button class="btn btn-outline-primary text-center m-2" @click="undoTitle">
      Undo Title
    </button>

    <button
      class="btn btn-outline-primary text-center m-2"
      @click="changeTitle"
    >
      Change title
    </button>
    Description :
    <input
      type="text"
      autocorrect="off"
      autocomplete="off"
      name="desc"
      class="form-control m-2"
      placeholder="Select an element"
      v-model="meta_Desc"
      aria-label="text"
      aria-describedby="text"
    />
    <button class="btn btn-outline-primary text-center m-2" @click="undoDesc">
      Undo Desc
    </button>
    <button class="btn btn-outline-primary text-center m-2" @click="changeDesc">
      Change Description
    </button>

    <span> Get value from Website (iframe) into platform: </span>

    <input
      type="text"
      autocorrect="off"
      autocomplete="off"
      name="text"
      class="form-control m-2"
      placeholder="Select an element"
      v-model="value_to_change"
      aria-label="text"
      aria-describedby="text"
    />

    <button class="btn btn-outline-primary text-center m-2" @click="undoValue">
      Undo
    </button>

    <button class="btn btn-outline-primary text-center m-2" @click="addValue">
      change content
    </button>

    <button
      class="btn btn-outline-primary text-center m-2"
      @click="updateWbsite"
    >
      Save changes
    </button>

    <div class="card">
      <iframe
        id="iframe"
        src="http://localhost:8081/?show_editor=true"
        width="100%"
        height="500px"
      ></iframe>
    </div>

    <!-- <div id="template_website">
      <div :key="index" v-for="(item, index) in value" class="template_inside">
        <div v-html="item.template_name"></div>

        <button
          @click="addNewTemplate()"
          class="btn btn-primary text-center m-2"
        >
          new template
        </button>
        <button
          @click="Regenerate(index)"
          class="btn btn-primary text-center m-2"
        >
          Regenerate
        </button>
        <button @click="move(index)" class="btn btn-primary text-center m-2">
          Move
        </button>
        <button
          @click="deleteValue(index)"
          class="btn btn-primary text-center m-2"
        >
          Delete
        </button>
        <hr />
      </div>
    </div>

    <button class="btn btn-outline-primary text-center m-2" @click="extract">
      Extract
    </button> -->
  </div>
</template>

<script>
/* eslint-disable */
import meta_cms from "@/store/meta-cms.js";
import { variableToUseInVue } from "./template_test.js";
import { variableToUseInVueTwo } from "./template_test_two.js";
import { variableCss } from "./css_code.js";
export default {
  components: {},
  data() {
    return {
    
      local_result: "",
      value: [
        {
          template_name: variableToUseInVue,
          title: "The Noble Gryffindor House: Home of the Brave",
          position: 0,
        },
        {
          template_name: variableToUseInVueTwo,
          title: "1 The Noble Gryffindor House: Home of the Brave",
          position: 1,
        },
        {
          template_name: variableToUseInVue,
          title: "2 The Noble Gryffindor House: Home of the Brave",
          position: 2,
        },
      ],

      value_to_change: "",
      key_to_change: "",
      elements_undo: [],
      title_elements_undo: [],
      desc_elements_undo: [],
      original_key: "",
      original_value: "",
      website_page: [],
      changed_elements: [],
      meta_Desc: [],
      meta_title: [],
      current_variant:''
    };
  },

  methods: {
    changeTitle() {
      var obj = {
        key: "title",
        value: this.meta_title,
      };

      this.title_elements_undo.push(obj);

      // console.log({ nexmind_live: obj });
      iframeWin.postMessage(
        { nexmind_live: obj },
        "http://localhost:8081/?show_editor=true"
      );
    },
    changeDesc() {
      var obj = {
        key: "description",
        value: this.meta_Desc,
      };

      this.desc_elements_undo.push(obj);

      // console.log({ nexmind_live: obj });
      iframeWin.postMessage(
        { nexmind_live: obj },
        "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
      );
    },
    addValue() {
      if (this.key_to_change.length == 0) {
        this.$toast.warning("Select an element to change");
      } else {
        // console.log(document.getElementById("iframe"));
        var iframeWin = document.getElementById("iframe").contentWindow;

        console.log(this.elements_undo);

        var obj = {
          key: this.key_to_change,
          value: this.value_to_change,
        };

        this.elements_undo.push(obj);

        // console.log({ nexmind_live: obj });
        iframeWin.postMessage(
          { nexmind_live: obj },
          "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
        );
      }
    },

    undoTitle() {
      if (this.title_elements_undo.length > 1) {
        console.log(this.title_elements_undo);

        this.title_elements_undo.splice(-1);

        var lastEntry = this.title_elements_undo.slice(-1).pop();

        console.log(lastEntry);

        this.meta_title = lastEntry.value;

        var iframeWin = document.getElementById("iframe").contentWindow;
        // console.log({ nexmind_live: obj });
        iframeWin.postMessage(
          { nexmind_live: lastEntry },
          "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
        );
      }
    },
    undoDesc() {
      if (this.desc_elements_undo.length > 1) {
        console.log(this.desc_elements_undo);

        this.desc_elements_undo.splice(-1);

        var lastEntry = this.desc_elements_undo.slice(-1).pop();

        console.log(lastEntry);

        this.meta_Desc = lastEntry.value;

        var iframeWin = document.getElementById("iframe").contentWindow;
        // console.log({ nexmind_live: obj });
        iframeWin.postMessage(
          { nexmind_live: lastEntry },
          "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
        );
      }
    },

    undoValue() {
      if (this.elements_undo.length != 0) {
        console.log(this.elements_undo);

        this.elements_undo.splice(-1);

        var lastEntry = this.elements_undo.slice(-1).pop();

        console.log(lastEntry);

        this.key_to_change = "";
        this.value_to_change = "";
        this.original_key = "";
        this.original_value = "";

        var iframeWin = document.getElementById("iframe").contentWindow;
        // console.log({ nexmind_live: obj });
        iframeWin.postMessage(
          { nexmind_live: lastEntry },
          "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
        );

        // elements.forEach((item, index) => {
        //   if (item.key == lastEntry.key) {

        //     if (item.value.length != 1) {

        //       item.value.splice(-1)
        //       var changeVal = document.evaluate(item.key, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLInputElement
        //       changeVal.innerHTML = item.value.slice(-1).pop()
        //       elements_undo.splice(-1)

        //     }
        //     else {
        //       elements_undo.splice(-1)

        //     }
        //   }

        // })
      }
    },

    updateWbsite() {},
    addNewTemplate() {
      this.value.push({
        template_name: variableToUseInVueTwo,
        title: "3 The Noble Gryffindor House: Home of the Brave",
        position: 3,
      });
      var getItem = document.getElementById("template_website");
      console.log(getItem.childNodes.length);
      getItem.childNodes[getItem.childNodes.length - 1].getElementsByClassName(
        "title_id"
      )[0].textContent = "3 The Noble Gryffindor House: Home of the Brave";
    },
    Regenerate(index) {},

    move(index) {},
    deleteValue(index_val) {
      var spliceindex = "";

      this.value.forEach((element, index) => {
        if (element.position == index_val) {
          spliceindex = index;
        }
      });

      this.value.splice(spliceindex, 1);
    },
    localStoreHandler(e) {
      console.log(`👉 localStorage.set('${e.key}', '${e.value}') updated`);
      if (e.key == "nexmind_live_editor") {
        //  this.local_result = e.value;
      }
    },

    hearFromChild(e) {
      // console.log("Message received from the child: " + e.data);
      // console.log(
      //   "Message received from the child: ",
      //   JSON.parse(e.data).nexmind_live
      // );
      if (JSON.parse(e.data).nexmind_live) {
        if (JSON.parse(e.data).nexmind_live.key == "title") {
          this.meta_title = JSON.parse(e.data).nexmind_live.value;

          var obj = {
            key: "title",
            value: this.meta_title,
          };

          this.title_elements_undo.push(obj);
        } else if (JSON.parse(e.data).nexmind_live.key == "description") {
          this.meta_Desc = JSON.parse(e.data).nexmind_live.value;
          var obj = {
            key: "title",
            value: this.meta_Desc,
          };

          this.desc_elements_undo.push(obj);
        } else {
          this.value_to_change = JSON.parse(e.data).nexmind_live.value;
          this.key_to_change = JSON.parse(e.data).nexmind_live.key;

          if (this.original_key.length == 0) {
            this.original_key = JSON.parse(e.data).nexmind_live.key;
            this.original_value = JSON.parse(e.data).nexmind_live.value;

            this.elements_undo.push({
              key: this.original_key,
              value: this.original_value,
            });
          }
          if (this.original_key != this.key_to_change) {
            this.original_key = JSON.parse(e.data).nexmind_live.key;
            this.original_value = JSON.parse(e.data).nexmind_live.value;
            this.elements_undo.push({
              key: this.original_key,
              value: this.original_value,
            });
          }
        }
      }
    },

    extract() {
      var header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        `<head><meta charset='utf-8'><title>title here</title></head>` +
        this.css_code +
        `<meta name="description" content="description"><body>`;
      var footer = "</body></html>";

      var content = document.getElementById("template_website").innerHTML;

      var sourceHTML = header + content + footer;

      console.log(sourceHTML);

      var blob = new Blob([sourceHTML], {
        type: "text/html",
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Text.html";
      link.click();
    },
  },

  created() {},

  mounted() {
    window.addEventListener("message", this.hearFromChild);

    if (this.$route.params.id) {
      meta_cms
        .fetchRecommendation(
          this.$route.params.client_id,
          this.$route.params.id
        )
        .then((response) => {
          this.website_page = response.data.data;
          this.changed_elements = response.data.data.elements;

          console.log(this.changed_elements);

          // console.log(response.data.data.campaign_type)
          // console.log(response.data.data.elements)

          if (this.website_page.campaign_type == "single") {
            this.changed_elements.forEach((item, index) => {
              if (item.key == "title") {
              } else if (item.key == "description") {
              } else {
                var iframeWin = document.getElementById("iframe").contentWindow;

                var obj = {
                  key: item.key,
                  value: item.value,
                };

                this.elements_undo.push(obj);

                // console.log({ nexmind_live: obj });
                iframeWin.postMessage(
                  { nexmind_live: obj },
                  "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
                );
              }
            });
          } else {

            this.current_variant='A'
            this.changed_elements.forEach((item, index) => {
              if ('A' == item.variant) {
                if (item.key == "title") {
                } else if (item.key == "description") {
                } else {
                  var iframeWin =
                    document.getElementById("iframe").contentWindow;

                  var obj = {
                    key: item.key,
                    value: item.value,
                  };

                  this.elements_undo.push(obj);

                  // console.log({ nexmind_live: obj });
                  iframeWin.postMessage(
                    { nexmind_live: obj },
                    "http://localhost:8081/?nexmind_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAubmV4bWluZC5uZXhvZG4uY29tXC9taWNyb3NvZnRcL2NhbGxiYWNrIiwiaWF0IjoxNjg0NDU4OTc5LCJleHAiOjE2ODQ0OTQ5NzksIm5iZiI6MTY4NDQ1ODk3OSwianRpIjoiN0RjZ1dFYjVnWXQ0UTVESCIsInN1YiI6NywicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MLABFVA7mK8Bmd5vtaPSymYNgNzgXnPZTkpSBPAWqiE&nexmind_editor_campaign_type=Single&client_id=11&show_editor=true&en=uat"
                  );
                }
              }
            });
          }
        });
    }

    //fetch title and description

    const localStore = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      const event = new Event("localUpdated");
      event.key = key;
      event.value = value;

      document.dispatchEvent(event);
      localStore.apply(this, arguments);
    };

    document.addEventListener("localUpdated", this.localStoreHandler, false);

    // form = document.getElementById("the-form"),

    // myMessage = document.getElementById("my-message");

    // myMessage.select();

    // form.onsubmit = function () {

    // iframeWin.postMessage(myMessage.value, "https://robertnyman.com");

    // };
  },
};
</script>


<style scoped>
.template_inside ::v-deep .title_id {
  color: red;
}
</style>