<template>
  <v-btn
      v-if="showButton"
      fixed
      bottom
      right
      fab
      color="primary"
      dark
      @click="scrollToTop"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      showButton: false
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    checkScrollPosition() {
      window.addEventListener("scroll", () => {
        this.showButton = window.scrollY > 100; // 显示按钮当页面滚动超过1000px时
      });
    }
  },
  mounted() {
    this.checkScrollPosition();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkScrollPosition);
  }
};
</script>
