<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-text>
            <v-img src="@/assets/logo.png" height="100" contain></v-img>
            <v-divider class="my-4"></v-divider>
            <v-select v-model="loginMethod" :items="loginMethods" label="选择登录方式"></v-select>
            <div id="g-recaptcha"></div>
            <template v-if="loginMethod === 'email'">
              <v-form @submit.prevent="loginWithEmail">
                <v-text-field v-model="email" label="邮箱" outlined prepend-inner-icon="mdi-email" required></v-text-field>
                <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn @click.prevent="triggerCaptcha('email')" color="primary" class="mt-4" block>点我发送验证码</v-btn>
                <v-btn type="submit" color="primary" class="mt-4" block>登录</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register">注册</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'phone'">
              <v-form @submit.prevent="loginWithPhone">
                <v-text-field v-model="phone" label="手机号" outlined prepend-inner-icon="mdi-phone" required></v-text-field>
                <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn @click.prevent="triggerCaptcha('phone')" color="primary" class="mt-4" block>点我发送验证码</v-btn>
                <v-btn type="submit" color="primary" class="mt-4" block>登录</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register">注册</router-link></p>
            </template>
            <template v-else-if="loginMethod === 'account'">
              <v-form @submit.prevent="loginWithAccount">
                <v-text-field v-model="username" label="用户名" outlined prepend-inner-icon="mdi-account" required></v-text-field>
                <v-text-field v-model="password" label="密码" type="password" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
                <v-btn type="submit" color="primary" class="mt-4" block>登录</v-btn>
              </v-form>
              <p class="caption">没有账号？ <router-link to="/register">注册</router-link></p>
            </template>
            <template v-else>
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
      loginMethod: '',
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
      const credentials = { email: this.email, verificationCode: this.verificationCode };
      console.log('Logging in with email:', credentials);
    },
    loginWithPhone() {
      const credentials = { phone: this.phone, verificationCode: this.verificationCode };
      console.log('Logging in with phone:', credentials);
    },
    loginWithAccount() {
      const credentials = { username: this.username, password: this.password };
      console.log('Logging in with username:', credentials);
    },
    triggerCaptcha(method) {
      const recaptchaElement = document.getElementById("g-recaptcha");
      console.log(recaptchaElement)
      if (recaptchaElement && recaptchaElement.childNodes.length > 0) {
        // 如果元素已经包含了 reCAPTCHA，则移除它
        // recaptchaElement.removeChild(recaptchaElement.childNodes[0]);
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.render("g-recaptcha", {
          sitekey: "6LfTXrYpAAAAAL2vJoTwfCNs8clsBkrDWqJVVJi4",
          callback: (token) => {
            this.verifyRecaptchaToken(token, method);
          },
        });
      });
    },

    // 后端提交验证Token
    verifyRecaptchaToken(token, method) {
      const postData = {
        recaptchaToken: token
      };
      console.log("这是Token" + token);
      axios.post('/captcha/verify-recaptcha', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            if (response.data.code === 200) {
              // reCAPTCHA 验证成功
              if (method === 'email') {
                this.sendVerificationCode({
                  userMail: this.email
                });
              } else if (method === 'phone') {
                this.sendVerificationCode({
                  userPhone: this.phone
                });
              }
            } else {
              alert('验证失败，请重试'); // 这里需要确保错误处理逻辑被触发
            }
          })
          .catch(error => {
            console.error('Error during reCAPTCHA verification:', error);
            alert('验证失败，请重试'); // 这里需要确保错误处理逻辑被触发
          });
    },
    sendVerificationCode(userInfo) {
      // 实际发送验证码到用户指定的邮箱或手机
      axios.post('/userLogin/captchaKey', userInfo)
          .then(response => {
            console.log('Verification code sent:', response.data);
          })
          .catch(error => {
            console.error('Error sending verification code:', error);
          });
    }
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
