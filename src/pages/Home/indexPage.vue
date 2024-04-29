<template>
  <v-app id="inspire">
    <HeaderNav/>
    <TopNavigationBar />
    <v-main style="padding: 10px 0px">
      <v-container fluid>
        <BannerData/>
        <TopBtn/>
      </v-container>
    </v-main>
   <IndexPageBox/>
  </v-app>
</template>

<script>
import TopNavigationBar from "@/components/Head/TopNavigationBar.vue";
import HeaderNav from "@/components/Head/HeaderNav.vue";
import TopBtn from "@/components/ScrollTop/TopBtn.vue";
import BannerData from "@/components/Banner/BannerData.vue";
import IndexPageBox from "@/components/ContentPageBox/IndexPageBox.vue";
export default {
  components:{
    HeaderNav,
    TopNavigationBar,
    TopBtn,
    BannerData,
    IndexPageBox
  },
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  }
}
</script>
