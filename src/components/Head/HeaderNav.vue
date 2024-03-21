<template>

  <v-app-bar
      app
      flat

  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>哔哩哔哩</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
    ></v-avatar>
    <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
        class="ml-auto"
    ></v-avatar>
  </v-app-bar>

</template>
