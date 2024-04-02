<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-img src="@/assets/logo.png" height="100" contain></v-img>
            <v-divider class="my-4"></v-divider>
            <!-- 选择登录方式 -->
            <v-select v-model="loginMethod" :items="loginMethods" label="选择登录方式"></v-select>
            <!-- 根据选择的登录方式显示不同的表单 -->
            <template v-if="loginMethod === 'email'">
              <v-form @submit.prevent="loginWithEmail">
                <v-text-field v-model="email" label="Email" outlined prepend-inner-icon="mdi-email" required></v-text-field>
                <v-text-field v-model="verificationCode" label="Verification Code" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn @click.prevent="sendVerificationCode" color="primary" class="mt-4" block>Send Verification Code</v-btn>
                <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register-email">注册</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'phone'">
              <v-form @submit.prevent="loginWithPhone">
                <v-text-field v-model="phone" label="Phone Number" outlined prepend-inner-icon="mdi-phone" required></v-text-field>
                <v-text-field v-model="verificationCode" label="Verification Code" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn @click.prevent="sendVerificationCode" color="primary" class="mt-4" block>Send Verification Code</v-btn>
                <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register-phone">注册</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'account'">
              <v-form @submit.prevent="loginWithAccount">
                <v-text-field v-model="username" label="Username" outlined prepend-inner-icon="mdi-account" required></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register-account">注册</router-link></p>
            </template>
            <template v-else>
              <!-- 如果没有选择登录方式，则显示注册页面 -->
              <p class="caption">选择一种登录方式</p>
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
      loginMethod: '', // 选择的登录方式
      email: '',
      phone: '',
      username: '',
      password: '',
      verificationCode: '', // 验证码字段
      loginMethods: ['email', 'phone', 'account'] // 登录方式列表
    }
  },
  methods: {
    loginWithEmail() {
      // 发送邮箱和验证码到后端进行验证
      const credentials = {
        email: this.email,
        verificationCode: this.verificationCode
      };
      // 在这里发送请求到后端
      console.log('Logging in with email:', credentials);
      // 根据后端响应进行相应处理
    },
    loginWithPhone() {
      // 发送手机号和验证码到后端进行验证
      const credentials = {
        phone: this.phone,
        verificationCode: this.verificationCode
      };
      // 在这里发送请求到后端
      console.log('Logging in with phone:', credentials);
      // 根据后端响应进行相应处理
    },
    loginWithAccount() {
      // 发送用户名和密码到后端进行验证
      const credentials = {
        username: this.username,
        password: this.password
      };
      // 在这里发送请求到后端
      console.log('Logging in with username:', credentials);
      // 根据后端响应进行相应处理
    },
    sendVerificationCode() {
      // 发送验证码到邮箱或手机
      if (this.loginMethod === 'email') {
        // 发送验证码到邮箱
        console.log('Sending verification code to email:', this.email);
      } else if (this.loginMethod === 'phone') {
        // 发送验证码到手机号
        console.log('Sending verification code to phone:', this.phone);
      }
    }
    // 添加其他登录方法的处理函数
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
