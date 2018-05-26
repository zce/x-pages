# x-pages

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> A static site development workflow

## Installation

```shell
$ yarn add x-pages

# or npm
$ npm install x-pages
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const xPages = require('x-pages')
const result = xPages('zce')
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### xPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## CLI Usage

<!-- TODO: Introduction of CLI -->

```shell
$ yarn global add x-pages

# or npm
$ npm install x-pages -g
```

```shell
$ x-pages --help

  Usage: x-pages <input>

  Options:

    -V, --version  output the version number
    -H, --host     Email host
    -h, --help     output usage information
```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; zce <w@zce.me> (https://zce.me/)



[travis-image]: https://img.shields.io/travis/zce/x-pages.svg
[travis-url]: https://travis-ci.org/zce/x-pages
[codecov-image]: https://img.shields.io/codecov/c/github/zce/x-pages.svg
[codecov-url]: https://codecov.io/gh/zce/x-pages
[downloads-image]: https://img.shields.io/npm/dm/x-pages.svg
[downloads-url]: https://npmjs.org/package/x-pages
[version-image]: https://img.shields.io/npm/v/x-pages.svg
[version-url]: https://npmjs.org/package/x-pages
[license-image]: https://img.shields.io/npm/l/x-pages.svg
[license-url]: https://github.com/zce/x-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/x-pages.svg
[dependency-url]: https://david-dm.org/zce/x-pages
[devdependency-image]: https://img.shields.io/david/dev/zce/x-pages.svg
[devdependency-url]: https://david-dm.org/zce/x-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com
