/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  // 项目目录配置
  foldConfig: {
    rootDir: path.resolve(__dirname, './'), // 项目根目录
    srcDir: path.resolve(__dirname, './src'), // src 目录
    distDir: path.resolve(__dirname, './dist'), // dist 目录
  },
  htmlConfig: {
    title: '梵高-智能绘制中心',
  },
  buildConfig: {
    buildGzip: false,
  },
};
