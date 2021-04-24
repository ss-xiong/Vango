# Name: Vango

## Description
Webpack4配置React通用开发模板，webpack配置外露可个性化更改也可直接使用。使用技术栈如下：
开发配置：Webpack4 + TypeScript + Eslint + StyleLint，开发框架：React + Dva

项目使用React，支持TypeScript、Eslint、stylelint等

## Project Documents
项目相关文档，包含：GIT地址、PRD文档地址、BRD文档地址、设计稿文档地址等

## Development Documents
项目整体框架采用React + Dva，开发配置包括TypeScript+Webpack+Scss等。
开发相关文档，包括但不限于以下点：
1. 版本更新介绍
2. 开发环境配置
3. 重点功能介绍
以下内容为本项目开发文档，使用此模板后需更新为新项目相关文档

### 一、Webpack打包配置
1. 优化点：
  * 打包添加代码拆分 
  * 配置路由动态加载
  * 预发、生产环境打包添加gzip压缩包，减少服务器压缩负担
  * 预发环境环境添加sourceMap，方便定位问题
2. 使用方式：
  * 开发环境：`npm start`, 支持热替换
  * 预发环境：`npm run build:beta`, 文件在生成于dist目录下
  * 生产环境：`npm run build:prod`, 文件在生成于dist目录下

### 二、Commit规范与发版日志(参考[Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html))

#### 1. Commit 规范
git 可以帮我们很好地管理代码，但是在多人合作的时候，经常会碰到各种随意的 commit message，当你需要会看 commit message 的时候，就会很头疼。首先来看一下被业界广泛认可的 Angular commit message规范：
```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
一个 commit message 由三部分构成：
* 标题行: 必填, 描述主要修改类型和内容
* 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
* 页脚注释: 放 Breaking Changes 或 Closed Issues

在这三部分中，<>中的内容type是指commit 的类型，包括如下：
* feat: 新特性
* fix: 修改问题
* refactor: 代码重构
* docs: 文档修改
* style: 代码格式修改, 注意不是 css 修改
* test: 测试用例修改
* chore: 其他修改, 比如构建流程, 依赖管理.
* pref: 性能提升的修改
* build: 对项目构建或者依赖的改动
* ci: CI 的修改
* revert: revert 前一个 commit

其次：
scope: commit 影响的范围, 比如: route, component, utils, build...
subject: commit 的概述, 建议符合 50/72 formatting
body: commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接

必须符合规范的Message才可以被提交，一般简写`<type>(<scope>):<subject>`就可以，不符合规范的不允许提交

#### 2. ChangeLog
发布新版时需要更新ChangeLog