<template>
  <v-row>
    <v-col
        cols="12" sm="6" md="4" lg="3"
        v-for="cardIndex in 20"
        :key="cardIndex"
        class="pb-4"
    >
    <v-card
        height="280px"
    class="d-flex flex-column"
    @mouseover="shakeCard(cardIndex)"
    :class="{ shake: isShaking[cardIndex] }"
    >
    <v-img
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        height="70%"
    gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)"
    >
    <v-container class="fill-height fluid pa-0" fluid>
      <v-row no-gutters class="fill-height">
        <v-col class="d-flex justify-center align-center">
          <v-icon size="56" class="white--text" @click="playVideo">
            mdi-play-circle
          </v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card-title class="white--text text-truncate" style="position: absolute; bottom: 0; font-size: 14px;">
            这里是标题最多十个字这里是标题最多十个字这里是标题最多十个字这里是标题最多十个字
          </v-card-title>
        </v-col>
      </v-row>
    </v-container>
    </v-img>
    <!-- 新卡片布局：作者和日期 -->
    <v-card-text class="py-1 px-3 d-flex justify-space-between"> <!-- 使用 v-card-text 代替 v-card 并调整内部结构 -->
      <v-chip class="subtitle-2" color="blue-grey lighten-5" text-color="black">
        <v-icon left>
          mdi-account
        </v-icon>
        作者姓名作者姓名作者姓名作者姓名作者姓名
      </v-chip>
      <v-chip class="subtitle-2" color="blue-grey lighten-5" text-color="black">
        <v-icon left>
          mdi-calendar
        </v-icon>
        2024-04-20
      </v-chip>
    </v-card-text>
    </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const isShaking = ref(Array(20).fill(false))

function playVideo() {
  console.log('Playing video...');
  // 实际的播放视频逻辑
}

function shakeCard(cardIndex) {
  isShaking.value[cardIndex] = true;
  setTimeout(() => {
    isShaking.value[cardIndex] = false;
  }, 500);
}
</script>

<style>
.shake {
  animation: shake-animation 0.5s;
}

@keyframes shake-animation {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

.v-chip {
  border: none; /* 为了更清洁的外观去除芯片的边框 */
}
</style>
