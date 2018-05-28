#!/usr/bin/env node

const { spawn } = require('child_process')

const ora = require('ora')
const chalk = require('chalk')

const pkg = require('../package')

const help = `
  ${chalk.gray('Usage:')}

    $ ${chalk.cyan(Object.keys(pkg.bin)[0])} <command> [options]

  ${chalk.gray('Commands:')}

    init \t\t\t initial a new x-pages project
    build \t\t\t build this project
    serve \t\t\t run development server
    deploy \t\t\t deploy this project
    clean \t\t\t clean dist files

  ${chalk.gray('Options:')}

    -h, --help \t\t\t output usage information
    -V, --version \t\t output the version number
    -o, --open \t\t\t open browser automatically
    -v, --verbose \t\t enable the verbose reporter
    -p, --production \t\t production environment
`

const gulpArgv = [require.resolve('gulp/bin/gulp')]
const argv = process.argv.slice(2)
const command = argv[0]

// help command
if (argv.includes('-h') || argv.includes('--help')) {
  console.log(help)
  process.exit()
}

// version command
if (argv.includes('-V') || argv.includes('--version')) {
  console.log(pkg.version)
  process.exit()
}

if (!command) {
  console.log(help)
  process.exit()
}

// command scope
if (!['init', 'serve', 'build', 'deploy', 'clean'].includes(command)) {
  console.log(chalk.red(`\n💀  Unknown command: '${command}'.`))
  console.log(help)
  process.exit()
} else {
  gulpArgv.push(command)
}

// open browser automatically
if (argv.includes('-o') || argv.includes('--open')) {
  process.env.OPEN_BROWSER = true
}

// set environment
if (argv.includes('-p') || argv.includes('--production')) {
  process.env.NODE_ENV = 'production'
} else {
  process.env.NODE_ENV = 'development'
}

// silent mode
if (!(argv.includes('-v') || argv.includes('--verbose'))) {
  gulpArgv.push('--silent')
}

// gulp arguments
gulpArgv.push('--cwd')
gulpArgv.push(process.cwd())
gulpArgv.push('--gulpfile')
gulpArgv.push(require.resolve('../lib/gulpfile.js'))
// gulpArgv.push('-LLLL')

// tips
const spinner = ora({
  text: chalk.cyan(`Running ${chalk.red(command)} in ${chalk.blue(process.env.NODE_ENV)} mode...`),
  spinner: { frames: ['🌕 ', '🌖 ', '🌗 ', '🌘 ', '🌑 ', '🌒 ', '🌓 ', '🌔 '] }
})

spinner.start()

// bootstrap gulp
const gulp = spawn(process.argv[0], gulpArgv, {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  windowsHide: true
})

gulp.on('close', code => {
  spinner.stop()
  console.log(chalk.cyan(`🌝  Task ${chalk.green(command)} complete.`))
})
