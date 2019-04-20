const os = require('os')
const path = require('path')
const pkg = require('../package')

const cwd = process.cwd()

let identify = path.basename(cwd)

let config

try {
  config = require(path.join(cwd, 'x-pages.config'))
} catch (e) {
  try {
    const projectPackage = require(path.join(cwd, 'package'))
    config = projectPackage['xPages'] || projectPackage['x-pages'] || {}
    identify = projectPackage.name || identify
  } catch (e) {
    config = {}
  }
}

config.src = config.src || 'src'
config.dest = config.dest || 'dist'
config.public = config.public || 'public'
config.temp = path.join(os.tmpdir(), pkg.name, identify)
config.data = Object.assign({ name: identify }, config.data)

module.exports = config
