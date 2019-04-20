const { src, dest, series, parallel, watch, lastRun } = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const del = require('del')
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const minimist = require('minimist')

const config = require('./config')

const $ = gulpLoadPlugins()
const bs = browserSync.create()
const argv = minimist(process.argv.slice(2))

const paths = {
  styles: 'assets/styles/**/*.scss',
  scripts: 'assets/scripts/**/*.js',
  pages: '**/*.html',
  images: 'assets/images/**/*.{jpg,jpeg,png,gif,svg}',
  fonts: 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
}

const isProd = process.env.NODE_ENV === 'production'

const clean = () => {
  return del([ config.temp, config.dest ], { force: true })
}

const style = () => {
  // TODO: support less, sass
  return src(paths.styles, { cwd: config.src, base: config.src, sourcemaps: !isProd })
    .pipe($.plumber())
    .pipe($.sass.sync({ outputStyle: 'expanded', precision: 10, includePaths: ['.'] }).on('error', $.sass.logError))
    .pipe($.postcss([ autoprefixer() ]))
    .pipe(dest(config.temp, { sourcemaps: '.' }))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src(paths.scripts, { cwd: config.src, base: config.src, sourcemaps: !isProd })
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(dest(config.temp, { sourcemaps: '.' }))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src(paths.pages, { cwd: config.src, base: config.src, ignore: [ '{layouts,partials}/**' ] })
    .pipe($.plumber())
    .pipe($.nunjucks.compile({ site: Object.assign({}, config.data, data) }))
    .pipe(dest(config.temp))
    // use bs-html-injector
    // .pipe(bs.reload({ stream: true }))
}

const useref = () => {
  return src(paths.pages, { cwd: config.temp, base: config.temp })
    .pipe($.plumber())
    .pipe($.useref({ searchPath: [ config.temp, config.src, '.' ] }))
    .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
    .pipe($.if(/\.css$/, $.postcss([ cssnano({ safe: true, autoprefixer: false }) ])))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: { compress: { drop_console: true } },
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(dest(config.dest))
}

const image = () => {
  return src(paths.images, { cwd: config.src, base: config.src, since: lastRun(image) })
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(dest(config.dest))
}

const font = () => {
  return src(paths.fonts, { cwd: config.src, base: config.src })
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(dest(config.dest))
}

const extra = () => {
  return src('**', { cwd: config.public, base: config.public, dot: true })
    .pipe(dest(config.dest))
}

const measure = () => {
  return src('**', { cwd: config.dest })
    .pipe($.plumber())
    .pipe($.size({ title: 'build', gzip: true }))
}

const upload = () => {
  return src('**', { cwd: config.dest })
    .pipe($.plumber())
    .pipe($.ghPages({
      cacheDir: `${config.temp}/publish`,
      branch: argv.branch === undefined ? 'gh-pages' : argv.branch
    }))
}

const devServer = () => {
  watch(paths.styles, { cwd: config.src }, style)
  watch(paths.scripts, { cwd: config.src }, script)
  watch(paths.pages, { cwd: config.src }, page)
  watch([ paths.images, paths.fonts ], { cwd: config.src }, bs.reload)
  watch('**', { cwd: config.public }, bs.reload)

  bs.init({
    notify: false,
    port: argv.port === undefined ? 2080 : argv.port,
    open: argv.open === undefined ? true : argv.open,
    plugins: [ `bs-html-injector?files[]=${config.temp}/*.html` ],
    server: {
      baseDir: [ config.temp, config.src, config.public ],
      routes: { '/node_modules': 'node_modules' }
    }
  })
}

const distServer = () => {
  bs.init({
    notify: false,
    port: argv.port === undefined ? 2080 : argv.port,
    open: argv.open === undefined ? true : argv.open,
    server: config.dest
  })
}

const compile = parallel(style, script, page)

const serve = series(compile, devServer)

const build = series(clean, parallel(series(compile, useref), image, font, extra), measure)

const start = series(build, distServer)

const deploy = series(build, upload)

module.exports = { clean, compile, serve, build, start, deploy }
