<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-img src="@/assets/logo.png" height="100" contain></v-img>
      <v-divider class="my-4"></v-divider>
      <v-select v-model="loginMethod" :items="loginMethods" label="选择登录方式"></v-select>
      <div id="g-recaptcha"></div>
      <template v-if="loginMethod === '邮箱'">
        <v-form @submit.prevent="loginWithEmail">
          <v-text-field v-model="email" label="邮箱" outlined prepend-inner-icon="mdi-email" required></v-text-field>
          <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
          <v-btn
              v-if="!verificationSent"
              @click.prevent="triggerCaptcha('email')"
              color="primary"
              class="mt-4"
              block
          >
            点我发送验证码
          </v-btn>
          <v-btn
              v-else
              color="primary"
              class="mt-4"
              block
              :disabled="true"
          >
            已发送验证码 ({{ countdown }}秒)
          </v-btn>
          <v-btn type="submit" color="primary" class="mt-4" block>{{ actionText }}</v-btn>
        </v-form>
        <p class="caption"><router-link :to="'/' + actionLink">{{ actionTitle }}</router-link></p>
      </template>
      <template v-else-if="loginMethod === '手机号'">
        <v-form @submit.prevent="loginWithPhone">
          <v-text-field v-model="phone" label="手机号" outlined prepend-inner-icon="mdi-phone" required></v-text-field>
          <v-text-field v-model="verificationCode" label="验证码" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
          <v-btn
              v-if="!verificationSent"
              @click.prevent="triggerCaptcha('phone')"
              color="primary"
              class="mt-4"
              block
          >
            点我发送验证码
          </v-btn>
          <v-btn
              v-else
              color="primary"
              class="mt-4"
              block
              :disabled="true"
          >
            已发送验证码 ({{ countdown }}秒)
          </v-btn>

          <v-btn type="submit" color="primary" class="mt-4" block>{{ actionText }}</v-btn>
        </v-form>
        <p class="caption"><router-link :to="'/' + actionLink">{{ actionTitle }}</router-link></p>
      </template>
      <template v-else-if="loginMethod === '账号密码'">
        <v-form @submit.prevent="loginWithAccount">
          <v-text-field v-model="username" label="用户名" outlined prepend-inner-icon="mdi-account" required></v-text-field>
          <v-text-field v-model="password" label="密码" type="password" outlined prepend-inner-icon="mdi-lock" required></v-text-field>
          <v-btn type="submit" color="primary" class="mt-4" block>{{ actionText }}</v-btn>
          <div id="g-recaptcha-account"></div>
          <v-btn id="g-recaptcha-account-btn" v-if="!verificationSent" @click.prevent="showRecaptcha('account')" color="primary" class="mt-4" block>
            点击我进行验证
          </v-btn>
          <v-btn v-else color="primary" class="mt-4" block :disabled="true">
            验证完成，时效时间为 ({{ countdown }}秒)
          </v-btn>

        </v-form>
        <p class="caption"><router-link :to="'/' + actionLink">{{ actionTitle }}</router-link></p>
      </template>
      <template v-else>
        <p class="caption">选择一种{{ actionText }}方式</p>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    action: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loginMethod: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      verificationCode: '', // 验证码字段
      loginMethods: ['邮箱', '手机号', '账号密码'], // 登录方式列表
      verificationSent: false, // 是否已发送验证码
      countdown: 0, // 倒计时剩余时间（秒）
      countdownInterval: null, // 倒计时计时器
      recaptchaVerified: false, // reCAPTCHA验证状态
      actionLink:'',
      actionTitle:''
    }
  },
  methods: {
    updateActionLink() {
      if (this.action === 'login') {
        this.actionLink = 'register';
        this.actionTitle = '没有账号？点我注册';
      } else {
        this.actionLink = 'login';
        this.actionTitle = '已经有账号？点我登录';
      }
    },
    triggerCaptcha(method) {
      if (method === 'email') {
        this.$parent.triggerCaptcha(method,this.email);
      } else if (method === 'phone') {
        this.$parent.triggerCaptcha(method,this.phone);
      } else if (method === 'account') {
        this.$parent.triggerCaptcha(method,this.email);
      }
    },
    loginWithEmail() {
      this.$parent.loginWithEmail();
    },
    loginWithPhone() {
      this.$parent.loginWithPhone();
    },
    loginWithAccount() {
      this.$parent.loginWithAccount();
    },
    showRecaptcha(method) {
      if (method === 'email') {
        this.$parent.showRecaptcha(method,this.email);
      } else if (method === 'phone') {
        this.$parent.showRecaptcha(method,this.phone);
      } else if (method === 'account') {
        this.$parent.showRecaptcha(method,this.email);
      }
    },
  },
  computed: {
    actionText() {
      this.updateActionLink();
      if (this.action === 'login') {
        return '登录';
      } else {
        return '注册';
      }
    },
  }
}
</script>
