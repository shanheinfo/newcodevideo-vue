<template>
  <v-app id="inspire">
    <HeaderNav/>
    <TopNavigationBar />
    <v-main style="padding: 10px 0px">
      <!--    登陆-->
      <LoginForm/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from "@/components/Head/HeaderNav.vue";
import TopNavigationBar from "@/components/Head/TopNavigationBar.vue";
import LoginForm from "@/components/Login/loginForm.vue";

export default {
  components:{
    HeaderNav,
    TopNavigationBar,
    LoginForm
  },
}
</script>


