const gulp = require('gulp')

// load all tasks
const { clean, serve, build, deploy, init } = require('.')

// register gulp tasks
gulp.task('clean', clean)
gulp.task('serve', serve)
gulp.task('build', build)
gulp.task('deploy', deploy)
gulp.task('init', init)
