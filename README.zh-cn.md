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

## 约定项目结构

```
└── example ············································· 项目根目录
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

### 默认配置

```js
module.exports = {
  assets: 'assets',
  layouts: 'layouts',
  partials: 'partials',
  temp: '.tmp',
  output: 'dist',
  port: 2080,
  debug: process.env.NODE_ENV !== 'production'
}
```

## 安装

```sh
# 通过 npm 安装
$ npm i -g x-pages

# 或者通过 yarn 安装
$ yarn global add x-pages
```

## 示例仓库（供参考）

[zce/x-pages-example](https://github.com/zce/x-pages-example)

## 命令行使用

在项目更目录下

```sh
# 启动 Browser Sync HTTP 服务
$ x-pages serve

# 开发模式构建
$ x-pages build

# 生成模式构建（autoprefixer、会压缩处理、无 sourcemaps、无图片压缩）
$ x-pages build --prodution

# 自动部署到 GitHub Pages（必须当前项目目录已经托管到 github，并且已经有了 gh-pages 分支）
$ x-pages deploy --prodution
```

## 授权许可

[MIT](LICENSE) &copy; [汪磊](https://zce.me)
