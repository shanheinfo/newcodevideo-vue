<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <AuthForm :action="action" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthForm from "@/components/Common/AuthForm.vue";

export default {
  components: {
    AuthForm
  },
  data() {
    return {
      action: 'register'
    }
  }
}
</script>
