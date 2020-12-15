# x-pages

[![Build Status][travis-image]][travis-url] [![NPM Downloads][downloads-image]][downloads-url] [![NPM Version][version-image]][version-url] [![License][license-image]][license-url] [![Dependency Status][dependency-image]][dependency-url] [![devDependency Status][devdependency-image]][devdependency-url] [![Code Style][style-image]][style-url]

> A static site development workflow (Convention over Configuration)

## Installation

```shell
$ yarn add x-pages --dev

# or npm
$ npm install x-pages --save-dev
```

in your package.json `scripts`:

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

You can also use the x-pages template provided by the [CAZ](https://github.com/zce/caz) scaffold tool to quickly generate a project that uses x-pages.

```shell
$ npx caz x-pages my-project
```

## CLI Usage

```shell
$ x-pages <task> [options]
```

### e.g.

```shell
# Runs the app in development mode
$ x-pages serve --port 5210 --open
# Builds the app for production to the `dist` folder
$ x-pages build --production
```

### Available Scripts

#### `yarn lint` or `npm run lint`

Lint the styles & scripts files.

#### `yarn compile` or `npm run compile`

Compile the styles & scripts & pages file.

#### `yarn serve` or `npm run serve`

Runs the app in development mode with a automated server.

##### options

- `open`: Open browser on start, Default: `false`
- `port`: Specify server port, Default: `2080`

#### `yarn build` or `npm run build`

Builds the app for production to the `dist` folder. It minify source in production mode for the best performance.

##### options

- `production`: Production mode flag, Default: `false`
- `prod`: Alias to `production`

#### `yarn start` or `npm run start`

Running projects in production mode.

##### options

- `open`: Open browser on start, Default: `false`
- `port`: Specify server port, Default: `2080`

#### `yarn deploy` or `npm run deploy`

Deploy the `dist` folder to [GitHub Pages](https://pages.github.com).

##### options

- `branch`: The name of the branch you'll be pushing to, Default: `'gh-pages'`

#### `yarn clean` or `npm run clean`

Clean the `dist` & `temp` files.

## Examples

- [zce/pages-boilerplate#x-pages](https://github.com/zce/pages-boilerplate/tree/x-pages) - x-pages examples

## Folder Structure

```
└── my-awesome-pages ································· project root
   ├─ public ········································· static folder
   │  └─ favicon.ico ································· static file (unprocessed)
   ├─ src ············································ source folder
   │  ├─ assets ······································ assets folder
   │  │  ├─ fonts ···································· fonts folder
   │  │  │  └─ pages.ttf ····························· font file (imagemin)
   │  │  ├─ images ··································· images folder
   │  │  │  └─ logo.png ······························ image file (imagemin)
   │  │  ├─ scripts ·································· scripts folder
   │  │  │  └─ main.js ······························· script file (babel / uglify)
   │  │  └─ styles ··································· styles folder
   │  │     ├─ _variables.scss ······················· partial sass file (dont output)
   │  │     └─ main.scss ····························· entry scss file (scss / postcss)
   │  ├─ layouts ····································· layouts folder
   │  │  └─ basic.html ······························· layout file (dont output)
   │  ├─ partials ···································· partials folder
   │  │  └─ header.html ······························ partial file (dont output)
   │  ├─ about.html ·································· page file (use layout & partials)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .csscomb.json ·································· csscomb config file
   ├─ .editorconfig ·································· editor config file
   ├─ .gitignore ····································· git ignore file
   ├─ .travis.yml ···································· travis ci config file
   ├─ CHANGELOG.md ··································· repo changelog
   ├─ LICENSE ········································ repo license
   ├─ README.md ······································ repo readme
   ├─ gulpfile.js ···································· gulp tasks file
   ├─ package.json ··································· package file
   └─ yarn.lock ······································ yarn lock file
```

## Related

- [zce/pages-boilerplate](https://github.com/zce/pages-boilerplate) - Always a pleasure scaffolding your awesome static sites.

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

[travis-image]: https://img.shields.io/travis/zce/x-pages/master.svg
[travis-url]: https://travis-ci.org/zce/x-pages
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
