# pages-tasks

> A preset gulp tasks for static page sites

## Installation

```shell
$ yarn add pages-tasks

# or npm
$ npm install pages-tasks
```

## Usage

gulpfile.js

```js
module.exports = require('pages-tasks')
```

package.json

```json
{
  "scripts": {
    "clean": "gulp clean",
    "lint": "gulp lint",
    "serve": "gulp serve",
    "build": "gulp build",
    "start": "gulp start",
    "deploy": "gulp deploy --production"
  }
}
```

then

```shell
$ yarn <task> [options]
```

### e.g.

```shell
# Runs the app in development mode
$ yarn serve --port 5210 --open
# Builds the app for production to the `dist` folder
$ yarn build --production
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

- [zce/x-pages](https://github.com/zce/x-pages) - A fully managed gulp workflow for static page sites.
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
