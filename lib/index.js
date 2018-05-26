/**
 * Gulp tasks
 */
const path = require('path')

const del = require('del')
const gulp = require('gulp')
const chalk = require('chalk')
const cssnano = require('cssnano')
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const loadPlugins = require('gulp-load-plugins')
const merge = require('merge-stream')

const config = require('./config')

const $ = loadPlugins()
const bs = browserSync.create()

const errorHandler = err => {
  if (config.debug) {
    console.error(err)
  } else {
    console.log(chalk.red(`\n💀  ${err.name}: '${err.message}'.\n`))
  }
}

/**
 * init task
 */
const init = () => {
  console.log('init task')
}

/**
 * clean task
 */
const clean = () => {
  return del([config.temp, config.dest], { force: true })
}

/**
 * compile style task
 */
const style = () => {
  const plugins = [require('postcss-preset-env')]

  if (!config.debug) {
    plugins.push(autoprefixer())
    plugins.push(cssnano())
  }

  // gulp glob (less|scss|sass) ???
  return gulp.src('assets/css/**/*.{less,scss,sass}', { cwd: config.src, base: config.src })
    .pipe($.plumber({ errorHandler }))
    .pipe($.if(config.debug, $.sourcemaps.init()))
    .pipe($.if(/\.less$/, $.less()))
    .pipe($.if(/\.(scss|sass)$/, $.sass.sync({ outputStyle: 'expanded' })))
    .pipe($.postcss(plugins))
    .pipe($.if(config.debug, $.sourcemaps.write('.')))
    .pipe($.rename(p => { p.dirname = p.dirname.replace(/(less|scss|sass)/, 'css') }))
    .pipe(gulp.dest(config.temp))
    .pipe(bs.reload({ stream: true }))
}

/**
 * compile script task
 */
const script = () => {
  return gulp.src('assets/js/**/*.js', { cwd: config.src, base: config.src })
    .pipe($.plumber({ errorHandler }))
    .pipe($.if(config.debug, $.sourcemaps.init()))
    .pipe($.babel({ presets: [require('babel-preset-env')] }))
    .pipe($.if(!config.debug, $.uglify()))
    .pipe($.if(config.debug, $.sourcemaps.write('.')))
    .pipe(gulp.dest(config.temp))
    .pipe(bs.reload({ stream: true }))
}

/**
 * compile page task
 */
const page = () => {
  return gulp.src('*.html', { cwd: config.src, base: config.src })
    .pipe($.plumber({ errorHandler }))
    .pipe($.nunjucks.compile({ site: config }))
    .pipe($.if(!config.debug, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: { compress: { drop_console: true } },
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest(config.temp))
    // .pipe(bs.reload({ stream: true }))
}

/**
 * extract task
 */
const extract = () => {
  const temp = gulp.src('**', { cwd: config.temp, base: config.temp })
    .pipe($.plumber({ errorHandler }))

  const image = gulp.src('assets/img/**/*.{jpg,jpeg,png,gif,svg}', { cwd: config.src, base: config.src })
    .pipe($.plumber({ errorHandler }))
    .pipe($.if(!config.debug, $.imagemin()))

  const other = gulp.src('**', { cwd: config.src, base: config.src, dot: true })
    .pipe($.plumber({ errorHandler }))
    .pipe($.ignore([
      '*.html',
      'assets/js/**/*.js',
      'assets/**/*.{less,scss,sass}',
      'assets/img/**/*.{jpg,jpeg,png,gif,svg}'
    ].concat(config.exclude || [])))
    .pipe($.ignore({ isDirectory: true }))

  return merge(temp, image, other)
    .pipe(gulp.dest(config.dest))
}

/**
 * server task
 */
const server = () => {
  bs.use(require('bs-html-injector'), {
    files: path.join(config.temp, '*.html')
  })

  bs.init({
    open: config.open,
    port: config.port,
    notify: false,
    server: {
      baseDir: [config.temp, config.src],
      routes: { '/node_modules': 'node_modules' }
    }
  })

  gulp.watch('assets/**/*.{less,scss,sass}', style)
  gulp.watch('assets/js/**/*.js', script)
  gulp.watch('**/*.html', page)
  gulp.watch('assets/img/**/*.{jpg,jpeg,png,gif,svg}', bs.reload)
}

/**
 * upload task
 */
const upload = () => {
  return gulp.src('**', { cwd: config.dest })
    .pipe($.plumber({ errorHandler  }))
    .pipe($.ghPages({
      remoteUrl: config.remote,
      cacheDir: config.temp,
      branch: config.branch
    }))
}

/**
 * compile task
 */
const compile = gulp.parallel(style, script, page)

/**
 * build task
 */
const build = gulp.series(clean, compile, extract)

/**
 * serve task
 */
const serve = gulp.series(compile, server)

/**
 * deploy task
 */
const deploy = gulp.series(build, upload)

/**
 * export tasks
 */
module.exports = { clean, serve, build, deploy, init }
