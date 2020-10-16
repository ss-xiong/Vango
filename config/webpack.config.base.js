const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 构建完通知
const WebpackBar = require('webpackbar'); // 打包进度条
// 项目目录配置
const {
  resolver, srcDir, distDir, rootDir,
} = require('./foldConfig');

module.exports = {
  entry: {
    index: resolver(srcDir, 'index'),
    vendor: ['react', 'react-dom', 'react-router'],
  },
  stats: {
    children: false,
    warnings: false,
    performance: true,
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 300000,
  },
  output: {
    filename: '[name].[hash:6].js',
    path: distDir,
  },
  resolve: {
    // 配置解析文件拓展名
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    // 配置别名
    alias: {
      '@Components': resolver(srcDir, 'components'),
      '@Containers': resolver(srcDir, 'containers'),
      '@Views': resolver(srcDir, 'views'),
      '@Models': resolver(srcDir, 'models'),
      '@Routes': resolver(srcDir, 'routes'),
      '@Assets': resolver(__dirname, 'assets'),
      '@Utils': resolver(srcDir, 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modelues/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 启用编译缓存加快打包速度
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
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      // 静态资源直接加载
      {
        test: /\.(mp4|ogg|mp3|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modelues/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolver(rootDir, 'public/index.html'),
      filename: 'index.html',
      title: '梵高-智能绘制中心',
    }),
    new WebpackBuildNotifierPlugin({
      title: '梵高-智能绘制中心项目构建完成',
      logo: resolver(rootDir, 'public/favicon.ico'),
      suppressWarning: true,
    }),
    new WebpackBar(),
  ],
};
