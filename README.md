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

> A simple static pages develop workflow (Convention over Configuration)

[中文说明](README.zh-cn.md)

## Installation

```sh
# npm
$ npm i -g x-pages

# or yarn
$ yarn global add x-pages
```

## CLI Usage

```sh
# make project directory & cd into
$ mkdir my-project && cd $_

# init project structure
$ x-pages init

# dev hot reload serve
$ x-pages serve

# development build
$ x-pages build

# production build (minify css, minify js, autoprefixer css, non sourcemaps)
$ x-pages build --production

# deploy to gh pages (make sure proj root is github repo, and it has gh-pages branch)
$ x-pages deploy --production
```

## Project structure

```
└── my-project ·········································· proj root
    ├── assets ·········································· static assets
    │   ├── css ········································· styles (auto compile scss)
    │   │   ├── _variables.scss ························· partials scss (dont output)
    │   │   └── style.scss ······························ entry scss
    │   ├── img ········································· images (auto minify)
    │   │   └── rock.png ································ image file
    │   └── js ·········································· scripts (auto compile es2015)
    │       └── global.js ······························· script file
    ├── layouts ········································· layouts (dont output)
    │   └── basic.html ·································· layout file
    ├── partials ········································ partials (dont output)
    │   ├── footer.html ································· partial file
    │   └── header.html ································· partial file
    ├── config.js ······································· config file
    ├── favicon.ico ····································· site favicon
    └── index.html ······································ page file (use layout & partials)
```

## Example repo

[zce/x-pages-example](https://github.com/zce/x-pages-example)

## Default config

```js
module.exports = {
  // assets dir name
  assets: 'assets',
  // layouts dir name
  layouts: 'layouts',
  // partials dir name
  partials: 'partials',
  // output dir name
  output: 'dist',
  // http server port
  port: 2080,
  // debug mode
  debug: process.env.NODE_ENV !== 'production'
}
```

And all of the properties in the `config.js` can be used as template variables in the template. e.g. `{{@site.title}}` => `config.title`.

In other words, you can add any template variables you need into the configuration file.

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)
