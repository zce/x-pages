# x-pages

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> A static site development workflow (Convention over Configuration)

## Installation

```shell
$ yarn add x-pages --dev

# or npm
$ npm install x-pages --dev
```

package.json

```json
{
  "scripts": {
    "clean": "x-pages clean",
    "lint": "x-pages lint",
    "serve": "x-pages serve",
    "build": "x-pages build",
    "start": "x-pages start",
    "deploy": "x-pages deploy --production"
  }
}
```


## CLI Usage

```shell
$ yarn <task> [options]
```

### e.g.

```shell
$ yarn serve --port 5210 --open
$ yarn build --production
```

## Examples

- [zce/x-pages-example](https://github.com/zce/x-pages-example/tree/x-pages) - x-pages examples

## Folder Structure

```
└── my-project ······································· proj root
   ├─ public ········································· static dir (unprocessed)
   ├─ src ············································ source dir
   │  ├─ assets ······································ assets dir
   │  │  ├─ fonts ···································· fonts dir (imagemin)
   │  │  ├─ images ··································· images dir (imagemin)
   │  │  ├─ scripts ·································· scripts dir (babel / uglify)
   │  │  └─ styles ··································· styles dir (scss / postcss)
   │  ├─ layouts ····································· layouts dir (dont output)
   │  ├─ partials ···································· partials dir (dont output)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .editorconfig ·································· editor config file
   ├─ .gitignore ····································· git ignore file
   ├─ .travis.yml ···································· travis ci config file
   ├─ README.md ······································ repo readme
   ├─ gulpfile.js ···································· gulp tasks file
   └─ package.json ··································· package file
```

## Related

- [zce/pages-boilerplate](https://github.com/zce/pages-boilerplate) - Always a pleasure scaffolding your awesome static sites.
- [zce/pages-tasks](https://github.com/zce/pages-tasks) - A preset static pages project gulp tasks

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)



[travis-image]: https://img.shields.io/travis/zce/x-pages.svg
[travis-url]: https://travis-ci.org/zce/x-pages
[codecov-image]: https://img.shields.io/codecov/c/github/zce/x-pages.svg
[codecov-url]: https://codecov.io/gh/zce/x-pages
[downloads-image]: https://img.shields.io/npm/dm/x-pages.svg
[downloads-url]: https://npmjs.org/package/x-pages
[version-image]: https://img.shields.io/npm/v/x-pages.svg
[version-url]: https://npmjs.org/package/x-pages
[license-image]: https://img.shields.io/github/license/zce/x-pages.svg
[license-url]: https://github.com/zce/x-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/x-pages.svg
[dependency-url]: https://david-dm.org/zce/x-pages
[devdependency-image]: https://img.shields.io/david/dev/zce/x-pages.svg
[devdependency-url]: https://david-dm.org/zce/x-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com
