const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/cur': {
        target: 'http://192.168.218.252:8888',
        // pathRewrite:{'^/api':''},
      }
    }
  }
})
