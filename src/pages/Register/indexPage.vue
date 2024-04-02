<template>
  <v-app id="inspire">
    <HeaderNav/>
    <TopNavigationBar />
    <v-main style="padding: 10px 0px">
      <!--    注册-->
      <RegisterForm/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from "@/components/Head/HeaderNav.vue";
import TopNavigationBar from "@/components/Head/TopNavigationBar.vue";
import RegisterForm from "@/components/Register/RegisterForm.vue";

export default {
  components:{
    HeaderNav,
    TopNavigationBar,
    RegisterForm
  },
}
</script>


