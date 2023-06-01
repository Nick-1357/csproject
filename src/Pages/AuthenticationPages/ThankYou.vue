<template>
  <div class="form-card">
    <h4>Thank You!</h4>

    <div class="mb-3">
      <small v-for="(item, index) in messages" :key="index">{{ item }}</small>
    </div>

    <button @click="Login" class="btn btn-primary btn-signin mt-3">
      Login
    </button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      // firstname: null,
      email: null,
      messages: [],
    };
  },

  methods: {
    Login() {
       this.$router.push({ name: "SignIn" });
    },
  },
  mounted() {
    const img = document.createElement("img");
    img.id = "_SHRSL_img_1";
    img.width = "1";
    img.height = "1";
    img.setAttribute(
      "src",
      "https://www.shareasale.com/sale.cfm?tracking=OrderID&amount=AA.BB&merchantID=139398&v=dev1.5&transtype=sale"
    );
    document.head.appendChild(img);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.defer = "defer";
    script.src = "https://www.dwin1.com/48543.js";
    document.head.appendChild(script);

    const imgBody = document.createElement("img");
    imgBody.id = "_SHRSL_img_1";
    imgBody.width = "1";
    imgBody.height = "1";
    imgBody.setAttribute(
      "src",
      "https://www.shareasale.com/sale.cfm?tracking=OrderID&amount=AA.BB&merchantID=139398&v=dev1.5&transtype=sale"
    );
    document.body.appendChild(imgBody);

    const scriptBody = document.createElement("script");
    scriptBody.type = "text/javascript";
    scriptBody.defer = "defer";
    scriptBody.src = "https://www.dwin1.com/48543.js";

    document.body.appendChild(scriptBody);
  },
  created() {
    // //

    var vars = [],
      hash;
    var query_string = window.location.search;

    var hashes = query_string.slice(1).split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      vars[hash[0]] = hash[1];
    }

    //

    for (const [key, value] of Object.entries(vars)) {
      //
      this.messages.push(decodeURI(value));
    }

    // //

    // if (localStorage.getItem("accessToken")) {
    //   const token = localStorage.getItem("accessToken");
    //   const token_broken = jwt_decode(token);
    //   if (Date.now() >= token_broken.exp * 1000) {
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("userInfo");
    //     localStorage.removeItem("me");
    //     this.$router.push("/login").catch(() => {});
    //   } else {
    //     this.$router.push("/dashboard");
    //   }
    // } else {
    //   this.$router.push("/login");
    // }
  },
};
</script>

<style lang="css" scoped>
/* .input-group{
  border-radius: 10px;
} */
hr {
  color: #818181;
  width: 100%;
  margin: 0rem;
}
.form-card {
  background-color: #ffffff;
  border-radius: 10px;
  min-width: 350px;
  /* min-height: 300px; */
  padding: 1rem;
  width: 400px;
}
small {
  font-size: 14px;
}
small a {
  text-decoration: none;
}
.btn {
  width: 100%;
}
.btn-white {
  border-color: rgb(207, 207, 207);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-white:hover,
.btn-white:active {
  border-color: #e9e9e9;
  background-color: #e9e9e9;
}
.login.input-group {
  display: block;
}
.login.input-group .text-danger {
  margin-top: 0.5rem;
}
.login.input-group span {
  display: block;
}
.login.input-group input {
  border-radius: 6px !important;
  width: 100%;
}
</style>