<template>
  <div class="backdrop">
    <div class="login-wrapper row g-0">
      <div class="banner-wrapper col">
        <div class="blue-banner">
          <img src="@/assets/authentication/nexmind-auth-banner.png" alt="Nexmind - The Next Level" class="nexmind-banner" />
        </div>
      </div>
      <div class="col" v-if="this.$route.fullPath.includes('signup')">
        <SignUp />
      </div>
      <div class="form-wrapper col" v-else>
        <div class="form-offset">
          <Login v-if="this.$route.fullPath.includes('login')" />
          <Email v-if="this.$route.fullPath.includes('enter_email')" />
          <reset-password v-if="this.$route.fullPath.includes('Forgot-Password')" />
          <create-account v-if="this.$route.fullPath.includes('Creating-Account')" />
          <result v-if="this.$route.fullPath.includes('result')" />
          <code-config v-if="this.$route.fullPath.includes('code/configuration')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SignUp from "./SignUp.vue";
import Login from "./Login.vue";
import Email from "./EnterEmail.vue";
import ResetPassword from "./ResetPassword.vue";
import CreateAccount from "./CreateAccount.vue";
import result from "./ThankYou.vue";
import codeConfig from "./CodeConfiguration.vue";
export default {
  name: "Background",
  components: {
    Login,
    SignUp,
    Email,
    ResetPassword,
    CreateAccount,
    result,
    codeConfig,
  },
};
</script>
<style lang="css">
.backdrop {
  background-image: linear-gradient(to right, #277ece, #06316d);
  height: 100vh;
  display: grid;
  place-items: center;
}

.login-wrapper {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
}
.banner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-wrapper .form-offset {
  margin-left: -14rem;
}
.blue-banner {
  height: 100vh;
  width: 500px;
  margin: 0rem auto;
  background-image: linear-gradient(to bottom, #010132, #010857);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nexmind-banner {
  height: 100vh;
}
</style>
