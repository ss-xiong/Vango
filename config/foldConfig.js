const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'), // 项目根目录
  srcDir: path.resolve(__dirname, '../src'), // src 目录
  distDir: path.resolve(__dirname, '../dist'), // dist 目录
  resolver: (..._path) => path.resolve(..._path), // 解析目录
};
