<template>
  <v-app-bar
      app
      flat
  >
    <v-toolbar-title>哔哩哔哩</v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <v-autocomplete
          v-model="search"
          :items="suggestions"
          label="搜索"
          hide-details
          solo-inverted
          dense
          prepend-inner-icon="mdi-magnify"
          hide-no-data
      >
      </v-autocomplete>
    </div>

    <v-spacer></v-spacer>

    <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
        @click="redirectToLogin"
    ></v-avatar>
    <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
        class="ml-auto"
        @click="redirectToLogin"
    ></v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      suggestions: [
        '动画', '游戏', '生活', '音乐', '舞蹈', '科技'
      ]
    };
  },
  methods: {
    redirectToLogin() {
      if (!this.isLoggedIn() && this.$route.path !== '/login') {
        this.$router.push('/login'); // 如果未登录且当前不是在登录页面，则跳转到登录页面
      }
    },
    isLoggedIn() {
      // 检查是否登录，您可以根据存储在浏览器中的 token 来检查用户的登录状态
      const token = localStorage.getItem('token');
      return !!token; // 如果 token 存在，则用户已登录
    }
  }
};
</script>

<style scoped>
  .align-center {
    margin: auto;
  }
</style>
