const path = require('path')

const defaultConfig = {
  cwd: process.cwd(),
  assets: 'assets',
  layouts: 'layouts',
  partials: 'partials',
  temp: '.tmp',
  output: 'dist',
  deploy: '.deploy',
  port: 2080,
  debug: process.env.NODE_ENV !== 'production'
}

// Try to require project config
let projectConfig
try {
  projectConfig = require(path.join(defaultConfig.cwd, 'config.js'))
} catch (e) {
  projectConfig = {}
}

const config = Object.assign({}, defaultConfig, projectConfig)

for (const key in config) {
  if (['assets', 'layouts', 'partials', 'temp', 'output'].includes(key)) {
    config[key] = path.resolve(defaultConfig.cwd, config[key])
  }
}

module.exports = config
