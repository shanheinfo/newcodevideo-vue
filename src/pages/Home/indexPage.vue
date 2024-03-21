<template>
  <v-app id="inspire">
    <HeaderNav/>
    <TopNavigationBar />
    <v-main>

      <v-container>
        <v-row>
          <v-col
              v-for="n in 24"
              :key="n"
              cols="4"
          >
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopNavigationBar from "@/components/Head/TopNavigationBar.vue";
import HeaderNav from "@/components/Head/HeaderNav.vue";
export default {
  components:{
    HeaderNav,
    TopNavigationBar
  }
}
</script>
