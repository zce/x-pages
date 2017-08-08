# x-pages

[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

[npm-image]: https://badge.fury.io/js/x-pages.svg
[npm-url]: https://npmjs.org/package/x-pages
[download-image]: https://img.shields.io/npm/dm/x-pages.svg
[download-url]: https://npmjs.org/package/x-pages
[travis-image]: https://travis-ci.org/zce/x-pages.svg?branch=master
[travis-url]: https://travis-ci.org/zce/x-pages
[dependency-image]: https://david-dm.org/zce/x-pages/status.svg
[dependency-url]: https://david-dm.org/zce/x-pages
[devdependency-image]: https://david-dm.org/zce/x-pages/dev-status.svg
[devdependency-url]: https://david-dm.org/zce/x-pages?type=dev
[style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[style-url]: http://standardjs.com/

> 一个非常简单的静态页面开发工作流（约定大于配置）

[Readme for English](README.md)

## 安装

```sh
# 通过 npm 安装
$ npm i -g x-pages

# 或者通过 yarn 安装
$ yarn global add x-pages
```

## 命令行使用

在项目更目录下

```sh
# 创建一个空的项目目录并切换工作目录到这个目录
$ mkdir my-project && cd $_

# 自动初始化一个基本的项目结构
$ x-pages init

# 启动 Browser Sync HTTP 服务
$ x-pages serve

# 开发模式构建
$ x-pages build

# 生产模式构建（autoprefixer、会压缩处理、无 sourcemaps、无图片压缩）
$ x-pages build --production

# 自动部署到 GitHub Pages（必须当前项目目录已经托管到 github，并且已经有了 gh-pages 分支）
$ x-pages deploy --production
```

## 约定项目结构

```
└── my-project ·········································· 项目根目录
    ├── assets ·········································· 静态资源目录
    │   ├── css ········································· 样式目录（会自动编译 SCSS 文件）
    │   │   ├── _variables.scss ························· 被 import 的 SCSS 文件（不会输出）
    │   │   └── style.scss ······························ 入口 SCSS 文件
    │   ├── img ········································· 图片目录（自动无损压缩）
    │   │   └── rock.png ································ 图片文件
    │   └── js ·········································· 脚本目录（会自动编译 ES2015 特性）
    │       └── global.js ······························· 脚本文件
    ├── layouts ········································· 布局目录（不会输出）
    │   └── basic.html ·································· 布局文件
    ├── partials ········································ 部分目录（不会输出）
    │   ├── footer.html ································· 部分文件
    │   └── header.html ································· 部分文件
    ├── config.js ······································· 配置文件（可做模板变量）
    ├── favicon.ico ····································· 站点图标文件
    └── index.html ······································ 页面文件（可以使用布局和部分页）
```

## 示例仓库（供参考）

[zce/x-pages-example](https://github.com/zce/x-pages-example)

## 默认配置

```js
module.exports = {
  // 资源目录（此目录下的 js / scss / img 会被自动处理）
  assets: 'assets',
  // 布局文件目录
  layouts: 'layouts',
  // 部分页文件目录
  partials: 'partials',
  // 输出目录
  output: 'dist',
  // HTTP 服务端口
  port: 2080,
  // 调试模式
  debug: process.env.NODE_ENV !== 'production',
  // 忽略清单
  exclude: []
}
```

配置中的所有属性都可以在模板中作为模板变量使用。例如：`{{@site.title}}` => `config.title`

也就是说，您可以在配置文件中添加任何模板变量。

## 为其贡献

1. Fork 该仓库
2. 创建你的新分支: git checkout -b my-new-feature
3. 在新分支上提交你的更改: git commit -am 'Add some feature'
4. 推送到你 Fork 的仓库: git push origin my-new-feature
5. 发起一个 Pull Request :D

## 授权许可

[MIT](LICENSE) &copy; [汪磊](https://zce.me)
