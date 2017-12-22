#!/usr/bin/env node

const { join } = require('path')
const { log, colors } = require('gulp-util')
const { name, version } = require('../package')

const { env, argv, cwd } = process

/**
 * version command
 */

if (['-v', '--version'].includes(argv[2])) {
  console.log(colors.red('v' + version))
  process.exit()
}

/**
 * help command
 */

const help = `
${colors.cyan('Usage:')}
  ${name} <command> [options]

${colors.cyan('Commands:')}
  init
  serve
  build
  serve:dist
  deploy
  clean

${colors.cyan('Options:')}
  --production, --prod
`

if (['-h', '--help'].includes(argv[2])) {
  console.log(help)
  process.exit()
}

/**
 * command scope
 */
const allowCommands = ['init', 'serve', 'build', 'serve:dist', 'deploy', 'clean']

if (!allowCommands.includes(argv[2])) {
  console.log(`
Command '${argv[2]}' not found`)
  console.log(help)
  process.exit()
}

/**
 * env mode
 */

if (env.NODE_ENV === undefined) {
  env.NODE_ENV = argv.includes('--production') || argv.includes('--prod') ? 'production' : 'development'
}

log('Running', colors.red(argv[2]), 'in', colors.blue(env.NODE_ENV), 'mode')

/**
 * gulp arguments
 */

argv.push('--cwd')
argv.push(cwd())
argv.push('--gulpfile')
argv.push(join(__dirname, '../lib'))

/**
 * bootstrap gulp
 */

require('gulp/bin/gulp')
