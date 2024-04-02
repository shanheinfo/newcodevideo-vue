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
    <!-- 下方卡片-->
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="3"  sm="6" md="3.5" v-for="cardIndex in 20" :key="cardIndex">
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import TopNavigationBar from "@/components/Head/TopNavigationBar.vue";
import HeaderNav from "@/components/Head/HeaderNav.vue";
import TopBtn from "@/components/ScrollTop/TopBtn.vue";
import BannerData from "@/components/Banner/BannerData.vue";
export default {
  components:{
    HeaderNav,
    TopNavigationBar,
    TopBtn,
    BannerData
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
