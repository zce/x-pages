#!/usr/bin/env node

const { join } = require('path')
const { log, colors } = require('gulp-util')

const { env, argv, cwd } = process

if (!env.NODE_ENV) {
  env.NODE_ENV = argv.includes('--production') ? 'production' : 'development'
}

log('Running', colors.red(argv[2]), 'in', colors.blue(env.NODE_ENV), 'mode')

argv.push('--cwd')
argv.push(cwd())
argv.push('--gulpfile')
argv.push(join(__dirname, '../lib/tasks.js'))

require('gulp/bin/gulp')
