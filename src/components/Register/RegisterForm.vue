<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-img src="@/assets/logo.png" height="100" contain></v-img>
            <v-divider class="my-4"></v-divider>
            <v-select v-model="loginMethod" :items="loginMethods" label="选择一种注册方式"></v-select>
            <template v-if="loginMethod === 'email'">
              <v-form @submit.prevent="loginWithEmail">
                <v-text-field v-model="email" label="邮箱" outlined prepend-inner-icon="mdi-email" required></v-text-field>
                <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4" block>注册</v-btn>
              </v-form>
              <p class="caption">已经有账号？ <router-link to="/login">登陆</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'phone'">
              <v-form @submit.prevent="loginWithPhone">
                <v-text-field v-model="phone" label="手机号" outlined prepend-inner-icon="mdi-phone" required></v-text-field>
                <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4" block>注册</v-btn>
              </v-form>
              <p class="caption">已经有账号？ <router-link to="/login">登陆</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'account'">
              <v-form @submit.prevent="loginWithAccount">
                <v-text-field v-model="username" label="用户名" outlined prepend-inner-icon="mdi-account" required></v-text-field>
                <v-text-field v-model="password" label="密码" type="password" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4" block>注册</v-btn>
              </v-form>
              <p class="caption">已经有账号？ <router-link to="/login">登陆</router-link></p>
            </template>
            <template v-else>
              <p class="caption">选择一种注册方式</p>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginMethod: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      verificationCode: '',
      loginMethods: ['email', 'phone', 'account'],
    }
  },
  methods: {
    loginWithEmail() {
      // 注册邮箱
      const credentials = {
        email: this.email,
        verificationCode: this.verificationCode
      };
      console.log('Logging in with email:', credentials);
      // 发送请求到后端
      // 处理后端响应
    },
    loginWithPhone() {
      // 注册手机号
      const credentials = {
        phone: this.phone,
        verificationCode: this.verificationCode
      };
      console.log('Logging in with phone:', credentials);
      // 发送请求到后端
      // 处理后端响应
    },
    loginWithAccount() {
      // 注册账户
      const credentials = {
        username: this.username,
        password: this.password
      };
      console.log('Logging in with username:', credentials);
      // 发送请求到后端
      // 处理后端响应
    },
  }
}
</script>

<style scoped>
.logo {
  width: 100px;
}
.caption {
  text-align: center;
}
</style>
