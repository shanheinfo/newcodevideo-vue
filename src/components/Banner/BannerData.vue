<template>
  <v-row>
    <!-- 左边4/10的宽度 -->
    <v-col cols="12" md="4">
      <v-carousel
          cycle
          height="450"
          hide-delimiter-background
          show-arrows-on-hover
      >
        <v-carousel-item
            v-for="(slide, index) in slides"
            :key="index"
        >
          <v-sheet
              :color="colors[index]"
              height="100%"
          >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
              <div class="text-h2">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <!-- 右边6/10的宽度 -->
    <v-col cols="12" md="8">
      <!-- 右边的区域分成两行三列 -->
      <v-row>
        <v-col cols="12" xs="12" lg="4" md="4" 	xl="4" v-for="cardIndex in 6" :key="cardIndex">
          <v-card height="205"></v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
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
