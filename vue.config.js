const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  // ......
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages:['java', 'json', 'javascript', 'typescript']
      })
    ]
  }
});