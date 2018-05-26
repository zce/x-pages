const os = require('os')
const path = require('path')
const pkg = require('../package')

const cwd = process.cwd()
const projectName = path.basename(cwd)

// defaults
const defaultConfig = {
  src: '.',
  dest: 'dist',
  open: process.env.OPEN_BROWSER,
  port: 12581,
  remote: null,
  branch: 'gh-pages',
  exclude: [ 'layouts', 'partials' ],
  debug: process.env.NODE_ENV === 'development'
}

// try to require project config
let projectConfig
try {
  projectConfig = require(path.join(cwd, 'config'))
} catch (e) {
  try {
    const projectPkg = require(path.join(cwd, 'package'))
    projectConfig = projectPkg['x-pages'] || projectPkg['xPages'] || {}
    projectName = projectPkg.name || projectName
  } catch (e) {
    projectConfig = {}
  }
}

// merge config
const config = Object.assign({}, defaultConfig, projectConfig)

// temp
config.temp = path.resolve(os.tmpdir(), 'x-pages', projectName)

// path resolve
for (const key in config) {
  if (['src', 'dest', 'temp'].includes(key)) {
    config[key] = path.resolve(cwd, config[key])
  }
}

module.exports = config
