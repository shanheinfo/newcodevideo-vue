<template>
  <v-card>
    <v-tabs
        color="cyan"
        show-arrows
    >
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

      <v-tab
          v-for="link in links"
          :key="link"
          :href="link"
      >
        {{ link }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      tab: null,
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',
        'Messages',
        'Profile',
        'Updates',

      ],
    }
  },
}
</script>
