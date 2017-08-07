const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')
const gulpLoadPlugins = require('gulp-load-plugins')

const hbs = require('./hbs')

/**
 * Config
 * @type {Object}
 */
const config = require('./config')
const { cwd, assets, temp, output, debug, remote, branch, deploy } = config

/**
 * Load all plugin for gulp
 * @type {Object}
 */
const $ = gulpLoadPlugins()

/**
 * BrowserSync Server
 * @type {Object}
 */
const bs = browserSync.create()

// ----------------------------------------------------------------------------
/**
 * Auto generate project structure
 */
gulp.task('init', () => {
  const { log, colors } = $.util
  if (fs.readdirSync(cwd).length) return log(colors.red(cwd), colors.blue('is not empty'))

  const example = path.join(__dirname, '../example')
  return gulp.src(path.join(example, '**/*'), { base: example })
    .pipe($.plumber())
    .pipe($.ignore([
      '**/dist',
      '**/dist/**'
    ]))
    .pipe(gulp.dest(cwd))
})

/**
 * Compile styles task
 */
gulp.task('styles', () => {
  return gulp.src(path.join(assets, '**/*.scss'), { base: cwd })
    .pipe($.plumber())
    .pipe($.if(debug, $.sourcemaps.init()))
    // .pipe($.sass.sync({ outputStyle: 'expanded' }).on('error', $.sass.logError))
    .pipe($.sass.sync({ outputStyle: 'expanded' }))
    // https://github.com/gulp-sourcemaps/gulp-sourcemaps/issues/60
    .pipe($.if(!debug, $.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] })))
    .pipe($.if(!debug, $.cssnano()))
    .pipe($.if(debug, $.sourcemaps.write()))
    .pipe($.rename(p => { p.dirname = p.dirname.replace('scss', 'css') }))
    .pipe(gulp.dest(temp))
    .pipe(bs.reload({ stream: true }))
})

/**
 * Compile scripts task
 */
gulp.task('scripts', () => {
  return gulp.src(path.join(assets, '**/*.js'), { base: cwd })
    .pipe($.plumber())
    .pipe($.if(debug, $.sourcemaps.init()))
    .pipe($.babel({ presets: [require('babel-preset-es2015')] }))
    .pipe($.if(!debug, $.uglify()))
    .pipe($.if(debug, $.sourcemaps.write('.')))
    .pipe(gulp.dest(temp))
    .pipe(bs.reload({ stream: true }))
})

/**
 * Compile pages task
 */
gulp.task('pages', () => {
  // return gulp.src(path.join(cwd, '**/*.html'), { base: cwd })
  return gulp.src(path.join(cwd, '*.html'), { base: cwd })
    .pipe($.plumber())
    // .pipe($.ignore([
    //   `**/${path.relative(cwd, temp)}/**`,
    //   `**/${path.relative(cwd, output)}/**`,
    //   `**/${path.relative(cwd, layouts)}/**`,
    //   `**/${path.relative(cwd, partials)}/**`
    // ]))
    .pipe(hbs(config))
    .pipe($.if(!debug, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: { compress: { drop_console: true } },
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest(temp))
})

/**
 * Compile task
 */
gulp.task('compile', cb => runSequence(['styles', 'scripts', 'pages'], cb))

/**
 * Start develop browser sync serve
 */
gulp.task('serve', ['compile'], () => {
  bs.use(require('bs-html-injector'), {
    // files: [path.join(cwd, '**/*.html'), '!' + temp, '!' + output]
    files: path.join(cwd, '*.html')
  })

  bs.init({
    notify: false,
    port: config.port,
    server: {
      baseDir: [temp, cwd],
      routes: { '/node_modules': 'node_modules' }
    }
  })

  gulp.watch([
    path.join(assets, '**/*.{jpg,jpeg,png,gif,svg}'),
    path.join(assets, '**/*.{woff,woff2,eot,ttf,otf,svg}')
  ]).on('change', bs.reload)

  gulp.watch(path.join(assets, '**/*.scss'), ['styles'])
  gulp.watch(path.join(assets, '**/*.js'), ['scripts'])
  // gulp.watch([path.join(cwd, '**/*.html'), '!' + temp, '!' + output], ['pages'])
  gulp.watch(path.join(cwd, '*.html'), ['pages'])
})

// ----------------------------------------------------------------------------

/**
 * Images task
 */
gulp.task('images', () => {
  // return gulp.src(path.join(assets, '**/img/**'), { base: cwd })
  return gulp.src(path.join(assets, '**/*.{jpg,jpeg,png,gif,svg}'), { base: cwd })
    .pipe($.plumber())
    .pipe($.if(!debug, $.cache($.imagemin())))
    .pipe(gulp.dest(output))
})

/**
 * Extras task
 */
gulp.task('extras', () => {
  gulp.src(path.join(temp, '**/*'), { base: temp })
    .pipe($.plumber())
    .pipe(gulp.dest(output))

  // extra files
  gulp.src(path.join(cwd, '**/*'), { base: cwd })
    .pipe($.plumber())
    .pipe($.ignore({ isDirectory: true }))
    .pipe($.ignore([
      '**/*.html',
      '**/*.js',
      '**/*.scss',
      '**/*.{jpg,jpeg,png,gif,svg}',
      '**/LISCENSE',
      '**/*.md'
    ]))
    .pipe(gulp.dest(output))
})

/**
 * Build task
 */
gulp.task('build', cb => runSequence('compile', ['images', 'extras'], cb))

/**
 * Start browser sync serve
 */
gulp.task('serve:dist', ['build'], () => {
  browserSync.init({
    notify: false,
    port: config.port,
    server: {
      baseDir: [output]
    }
  })
})

/**
 * Deploy to GitHub Pages
 */
gulp.task('deploy', ['build'], () => {
  return gulp.src(path.join(output, '**/*'))
    .pipe($.plumber())
    .pipe($.ghPages({
      remoteUrl: remote,
      branch: branch,
      cacheDir: deploy
    }))
})

module.exports = gulp
