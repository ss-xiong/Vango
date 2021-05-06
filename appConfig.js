/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  // 项目目录配置
  foldConfig: {
    rootDir: path.resolve(__dirname, './'), // 项目根目录
    srcDir: path.resolve(__dirname, './src'), // src 目录
    distDir: path.resolve(__dirname, './dist'), // dist 目录
  },
  // HTML 配置，参考 html-webpack-plugin 配置直接传入
  htmlConfig: {
    title: '梵高-智能绘制中心',
  },
  // 打包配置，简化
  buildConfig: {
    buildGzip: false,
  },
  // 请求相关配置
  requestConfig: {
    useMock: true, // **仅开发环境生效** 是否启用 Mock 数据。请求配置在 mock 目录中，mock 内容配置详见 https://github.com/jaywcjlove/mocker-api
    proxy: {}, // **仅开发环境生效** 代理配置，直接传入 webpack，参考 webpack-dev-server 配置
    // 请求 API 配置
    api: {
      baseUrl: '/', // 请求路径。默认为空，通域名访问。启用 Mock 时，baseUrl 必须置位 '/'
      timeout: 10000, // api 请求超时时间设置
    },
  },
};
