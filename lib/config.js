const path = require('path')
const tmp = require('tmp')
const del = require('del')
const { name } = require('../package')

const cwd = process.cwd()

const defaults = {
  assets: 'assets',
  layouts: 'layouts',
  partials: 'partials',
  output: 'dist',
  port: 2080,
  debug: process.env.NODE_ENV !== 'production'
}

// Try to require project config
let projectConfig
try {
  projectConfig = require(path.join(cwd, 'config'))
} catch (e) {
  projectConfig = {}
}

const config = Object.assign({}, defaults, projectConfig)
config.cwd = cwd

for (const key in config) {
  if (['assets', 'layouts', 'partials', 'output'].includes(key)) {
    config[key] = path.resolve(cwd, config[key])
  }
}

// temp dirs
config.temp = tmp.dirSync({ prefix: `${name}-`, unsafeCleanup: true }).name
config.deploy = tmp.dirSync({ prefix: `${name}-`, unsafeCleanup: true }).name

// clear temp when ctrl+c
process.on('SIGINT', () => del([config.temp, config.deploy], { force: true }).then(process.exit))

module.exports = config
