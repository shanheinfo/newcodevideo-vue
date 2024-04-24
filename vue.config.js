const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
// vue.config.js

module.exports = {
  devServer: {
    proxy: {
      '/userLogin': {
        target: 'http://localhost:9099', // 后端地址和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/userLogin': '/userLogin' // 如果后端 API 地址有特定的路径前缀，可以在这里进行重写
        }
      },
      '/captcha/verify-recaptcha': {
        target: 'http://localhost:9099', // 后端地址和端口号
        changeOrigin: true,
        pathRewrite: {
          '^/captcha/verify-recaptcha': '/captcha/verify-recaptcha' // 如果后端 API 地址有特定的路径前缀，可以在这里进行重写
        }
      }
    }
  }
};
