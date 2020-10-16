const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取出CSS，不注入JS
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 配置压缩JS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩CSS
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 压缩代码
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 打包分析

// 基础 webpack 配置
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        enforce: 'pre',
        use: ['source-map-loader'], // 加载source-map
      },
      {
        test: /\.(s(c|a)|c)ss$/,
        exclude: /node_modules/,
        use: [
          // 提取 css 为单独文件
          MiniCssExtractPlugin.loader,
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
      // 图片加载
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 小于 10k 转换成base64编码
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 静态资源分析
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css',
      chunkFilename: '[id].[hash:6].css',
      ignoreOrder: true,
    }),
    new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成 HASH 作为模块 ID
  ],
  optimization: {
    runtimeChunk: 'single',
    mangleWasmImports: true,
    // css、js 压缩设置. 生产环境压缩设置
    minimizer: [
      // 压缩JS代码
      new TerserWebpackPlugin({
        cache: true, // 缓存
        parallel: true, // 并行加载
        exclude: /node_modules/, // 不压缩node_modules文件
        sourceMap: true, // 预发生成 sourceMap
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin(),
      // 构建时开启 gzip 压缩。需要nginx支持支持发送gzip文件
      new CompressionWebpackPlugin({
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 8192,
        minRatio: 0.8,
      }),
    ],
    // 打包文件切分设置
    splitChunks: {
      chunks: 'all', // 默认async 可选值 all 和 initial
      maxInitialRequests: 6, // 一个入口文件最大的请求数
      maxAsyncRequests: 8, // 一个入口文件最大的并行请求数
      minSize: 100000, // 拆分前大于30kb才进行拆分
      maxSize: 350000, // chunk打包后最大体积
      minChunks: 2, // 最小引用次数
    },
  },
});
