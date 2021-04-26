/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
const path = require('path');
const process = require('process');
const webpack = require('webpack');
const WebpackBar = require('webpackbar'); // 打包进度条
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取出CSS，不注入JS
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 构建完通知
const TerserWebpackPlugin = require('terser-webpack-plugin'); // 配置压缩JS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩CSS
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 压缩代码
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 打包分析
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空打包文件夹

// 加载目录配置
const {
  foldConfig,
  htmlConfig,
  buildConfig,
} = require('./appConfig'); // 加载配置

// 解析目录
const resolver = (..._path) => path.resolve(..._path);
// 环境配置
const isDev = process.env.NODE_ENV === 'dev'; // 是否开发环境
const isBeta = process.env.NODE_ENV === 'beta'; // 是否预发环境
const isProd = process.env.NODE_ENV === 'prod'; // 是否生产环境

// 优化项配置
const buildOptimization = () => {
  // 压缩配置
  const minimizer = [
    // 压缩JS代码
    new TerserWebpackPlugin({
      cache: true, // 缓存
      parallel: true, // 并行加载
      exclude: /node_modules/, // 不压缩node_modules文件
      sourceMap: true, // 预发生成 sourceMap
    }),
    // 压缩css
    new OptimizeCSSAssetsPlugin(),
  ];
  if (buildConfig.buildGzip) {
    minimizer.push(
      // 构建时开启 gzip 压缩。需要nginx支持支持发送gzip文件
      new CompressionWebpackPlugin({
        test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
        threshold: 8192,
        minRatio: 0.8,
      }),
    );
  }

  return {
    runtimeChunk: 'single',
    mangleWasmImports: true,
    // css、js 压缩设置. 生产环境压缩设置
    minimizer,
    // 打包文件切分设置
    splitChunks: {
      chunks: 'all', // 默认async 可选值 all 和 initial
      maxInitialRequests: 6, // 一个入口文件最大的请求数
      maxAsyncRequests: 8, // 一个入口文件最大的并行请求数
      minSize: 100000, // 拆分前大于30kb才进行拆分
      maxSize: 350000, // chunk打包后最大体积
      minChunks: 2, // 最小引用次数
    },
  };
};

// 插件配置
const buildPlugins = () => {
  // 基础插件
  const configPlugins = [
    new HtmlWebpackPlugin({
      template: resolver(foldConfig.rootDir, 'public/index.html'),
      filename: 'index.html',
      title: htmlConfig.title,
    }),
    new WebpackBuildNotifierPlugin({
      title: htmlConfig.title,
      logo: resolver(foldConfig.rootDir, 'public/favicon.ico'),
      suppressWarning: true,
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
  ];

  // 开发环境
  if (isDev) {
    configPlugins.push(...[
      // 模块热替换
      new webpack.HotModuleReplacementPlugin(),
    ]);
  } else {
    configPlugins.push(...[
      // 打包体积优化
      new MiniCssExtractPlugin({
        filename: '[name].[hash:6].css',
        chunkFilename: '[id].[hash:6].css',
        ignoreOrder: true,
      }),
      // 根据模块的相对路径生成 HASH 作为模块 ID
      new webpack.HashedModuleIdsPlugin(),
    ]);
  }

  // 预发环境需要模块分析数据
  if (isBeta) {
    configPlugins.push(...[
      // 静态资源分析
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ]);
  }

  return configPlugins;
};

module.exports = {
  mode: isDev ? 'development' : 'production', // 预发和生产需要设置为生产环境
  devtool: isDev ? '#eval-source-map' : (isBeta && 'source-map'),
  entry: {
    index: resolver(foldConfig.srcDir, 'index'),
    vendor: ['react', 'react-dom', 'react-router'],
  },
  stats: {
    children: false,
    warnings: false,
    performance: isProd,
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 300000,
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[hash:6].js',
    path: foldConfig.distDir,
  },
  resolve: {
    // 配置解析文件拓展名
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    // 配置别名
    alias: {
      '@Components': resolver(foldConfig.srcDir, 'components'),
      '@Containers': resolver(foldConfig.srcDir, 'containers'),
      '@Views': resolver(foldConfig.srcDir, 'views'),
      '@Redux': resolver(foldConfig.srcDir, 'redux'),
      '@Styles': resolver(foldConfig.srcDir, 'styles'),
      '@Routes': resolver(foldConfig.srcDir, 'routes'),
      '@Assets': resolver(foldConfig.srcDir, 'assets'),
      '@Utils': resolver(foldConfig.srcDir, 'utils'),
    },
  },
  module: {
    rules: [
      // 生产环境不需要 source-map
      !isProd ? {
        test: /\.(js|ts)x?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      } : {},
      {
        test: /\.jsx?$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 启用编译缓存加快打包速度
              compact: false,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 启用编译缓存加快打包速度
              compact: false,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      // 样式
      {
        test: /\.(s(c|a)|c)ss$/,
        exclude: /node_modules/,
        use: [
          // 开发不需要环境提取 css 为单独文件
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 字体、音视频等静态资源直接加载
      {
        test: /\.(mp4|ogg|mp3|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modelues/,
        use: ['file-loader'],
      },
      // 图片资源加载
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'url-loader', // 开发模式不用转base64方便调试
            options: {
              // 生产环境小于 10k 转换成base64编码，其他不考虑
              limit: isProd ? 10000 : Infinity,
            },
          },
        ],
      },
    ],
  },
  // 开发环境不需要优化配置
  optimization: !isDev ? buildOptimization() : {},
  plugins: buildPlugins(),
  devServer: isDev ? {
    contentBase: [foldConfig.distDir], // 打包后文件位置
    clientLogLevel: 'silent', // 打印日志级别，有错误时显示
    stats: 'errors-warnings', // 打包控制台不显示文件细节
    compress: false, // 开发环境不启用压缩
    port: 8000, // 端口
    overlay: true, // 展示错误蒙层
    hot: true, // 启用热替换
    hotOnly: true, // 编译成功后刷新
    open: false, // 是否自动打开浏览器
    host: '0.0.0.0', // 允许通过ip访问
    disableHostCheck: true, // 解决 127.0.0.1 指向其他域名错误
    historyApiFallback: {
      index: '/',
    },
  } : {},
};
