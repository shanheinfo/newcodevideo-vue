<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-img src="@/assets/logo.png" height="100" contain></v-img>
            <v-divider class="my-4"></v-divider>
            <v-select v-model="loginMethod" :items="loginMethods" label="选择登录方式"></v-select>
            <template v-if="loginMethod === 'email'">
              <v-form @submit.prevent="loginWithEmail">
                <v-text-field v-model="email" label="邮箱" outlined prepend-inner-icon="mdi-email" required></v-text-field>
                <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn @click.prevent="sendVerificationCode" color="primary" class="mt-4" block>点我发送验证码</v-btn>
                <v-btn type="submit" color="primary" class="mt-4" block>登陆</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register">注册</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'phone'">
              <v-form @submit.prevent="loginWithPhone">
                <v-text-field v-model="phone" label="手机号" outlined prepend-inner-icon="mdi-phone" required></v-text-field>
                <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn @click.prevent="sendVerificationCode" color="primary" class="mt-4" block>点我发送验证码</v-btn>
                <v-btn type="submit" color="primary" class="mt-4" block>登陆</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register">注册</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'account'">
              <v-form @submit.prevent="loginWithAccount">
                <v-text-field v-model="username" label="用户名" outlined prepend-inner-icon="mdi-account" required></v-text-field>
                <v-text-field v-model="password" label="密码" type="password" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4" block>登陆</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register">注册</router-link></p>
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
import axios from 'axios';

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
      let userInfo;
      if (this.loginMethod === 'email') {
        userInfo = { userMail: this.email };
      } else if (this.loginMethod === 'phone') {
        userInfo = { userPhone: this.phone };
      }

      // 输出发送验证码请求的信息
      console.log('Sending verification code request:', userInfo);

      // 发送请求到后端获取验证码
      axios.post('/userLogin/captchaKey', userInfo)
          .then(response => {
            console.log('Verification code sent:', response.data);
            // 可根据后端响应进行相应处理，例如提示用户验证码发送成功
          })
          .catch(error => {
            console.error('Error sending verification code:', error);
            // 可根据错误进行相应处理，例如提示用户验证码发送失败
          });
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
