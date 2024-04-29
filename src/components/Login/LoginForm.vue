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
import axios from 'axios';
import AuthForm from "@/components/Common/AuthForm.vue";

export default {
  components: {AuthForm},
  data() {
    return {
      action: 'login',
      verificationTimeout: {
        email: 300, // 邮箱验证码超时时间（秒）
        phone: 300, // 短信验证码超时时间（秒）
        account: 180 // 普通登录超时时间（秒）
      },
      verificationCode: '', // 验证码字段
      verificationSent: false, // 是否已发送验证码
      countdown: 0, // 倒计时剩余时间（秒）
      countdownInterval: null, // 倒计时计时器
      recaptchaVerified: false, // reCAPTCHA验证状态
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
      if (!this.recaptchaVerified) {
        alert('请先点击底部的验证按钮，然后完成验证');
        return;
      }
      const credentials = { username: this.username, password: this.password };
      console.log('Logging in with username:', credentials);
      // 向后端发送登录信息
      axios.post('/userLogin/login', credentials)
          .then(response => {
            console.log('Login response:', response.data);
            // 处理登录成功的逻辑
          })
          .catch(error => {
            console.error('Error during login:', error);
            // 处理登录失败的逻辑
          });
    },
    showRecaptcha(method,dataPojo) {
      const recaptchaElement = document.getElementById(`g-recaptcha-${method}`);
      if (recaptchaElement && recaptchaElement.childNodes.length > 0) {
        // 如果reCAPTCHA已经显示，则不执行任何操作
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.render(`g-recaptcha-${method}`, {
          sitekey: this.$sitekey,
          callback: (token) => {
            this.verifyRecaptchaToken(token, method,dataPojo);
          },
          hideBadge: true // 隐藏隐私验证悬浮窗
        });
      });
    },

    triggerCaptcha(method,dataPojo) {
      const recaptchaElement = document.getElementById("g-recaptcha");
      if (recaptchaElement && recaptchaElement.childNodes.length > 0) {
        // 重复按就返回空
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.render("g-recaptcha", {
          sitekey: this.$sitekey,
          callback: (token) => {
            this.verifyRecaptchaToken(token, method , dataPojo);
          },
          hideBadge: true // 隐藏隐私验证悬浮窗
        });
      });
    },

    // 后端提交验证Token
    verifyRecaptchaToken(token, method,dataPojo) {
      console.log(dataPojo)
      const postData = {
        recaptchaToken: token
      };
      axios.post('/captcha/verify-recaptcha', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            if (response.data.code === 200) {
              // reCAPTCHA 验证成功
              this.recaptchaVerified = true;
              if (method === 'email') {
                this.sendVerificationCode({
                  userMail: dataPojo
                });
                this.countdown = this.verificationTimeout.email;
              } else if (method === 'phone') {
                this.sendVerificationCode({
                  userPhone: dataPojo
                });
                this.countdown = this.verificationTimeout.phone;
              } else if (method === 'account') {
                // 普通登录方式
                this.countdown = this.verificationTimeout.account;

                // 开始倒计时
                this.startCountdown();
              }

              // 更新状态为已发送验证码
              this.verificationSent = true;
            } else {
              alert('验证失败，请重试'); // 这里需要确保错误处理逻辑被触发
            }
          })
          .catch(error => {
            console.error('Error during reCAPTCHA verification:', error);
            alert('验证失败，请重试'); // 这里需要确保错误处理逻辑被触发
          });
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--; // 倒计时减一秒
        } else {
          clearInterval(this.countdownInterval); // 清除倒计时计时器
          this.verificationSent = false; // 重置验证码发送状态
        }
      }, 1000); // 每秒更新一次倒计时
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
