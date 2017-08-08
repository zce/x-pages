#!/usr/bin/env node

const { join } = require('path')
const { log, colors } = require('gulp-util')
const { name, version } = require('../package')

const { env, argv, cwd } = process

// version
if (['-v', '--version'].includes(argv[2])) {
  console.log(colors.red('v' + version))
  process.exit()
}

// task scope
if (!['init', 'serve', 'build', 'deploy', 'serve:dist'].includes(argv[2])) {
  console.log(`
command '${argv[2]}' not found

Usage:
  ${name} <command> [options]

commands:
  init
  serve
  build
  deploy
  serve:dist

options:
  --production
`)
  process.exit()
}

// mode
if (env.NODE_ENV === undefined) {
  env.NODE_ENV = argv.includes('--production') ? 'production' : 'development'
}

// bootstrap gulp
log('Running', colors.red(argv[2]), 'in', colors.blue(env.NODE_ENV), 'mode')

argv.push('--cwd')
argv.push(cwd())
argv.push('--gulpfile')
argv.push(join(__dirname, '../lib/tasks.js'))

require('gulp/bin/gulp')
