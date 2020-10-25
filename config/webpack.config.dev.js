const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base'); // 基础 webpack 配置
const { distDir } = require('./foldConfig'); // 目录解析配置

module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 启用编译缓存，加快打包速度
            },
          },
        ],
      },
      {
        test: /\.(s(c|a)|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'url-loader', // 开发模式不用转base64方便调试
          },
        ],
      },
    ],
  },
  devtool: '#eval-source-map',
  devServer: {
    contentBase: distDir, // 打包后文件位置
    compress: false, // 开发环境不启用压缩
    port: 8000, // 端口
    overlay: true, // 展示错误蒙层
    hot: true, // 启用热替换
    hotOnly: true, // 编译成功后刷新
    open: true, // 是否自动打开浏览器
    host: '0.0.0.0', // 允许通过ip访问
    disableHostCheck: true, // 解决 127.0.0.1 指向其他域名错误
    historyApiFallback: {
      index: '/',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
