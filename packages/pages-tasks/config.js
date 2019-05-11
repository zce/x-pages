const path = require('path')

const cwd = process.cwd()

const config = {}

try {
  const pkg = require(path.join(cwd, 'package'))
  Object.assign(config, pkg['xPages'] || pkg['x-pages'] || {})
  try {
    Object.assign(config, require(path.join(cwd, 'x-pages.config')))
  } catch (e) {}
} catch (e) {}

config.src = config.src || 'src'
config.dest = config.dest || 'dist'
config.public = config.public || 'public'
config.temp = config.temp || 'temp'
config.paths = Object.assign(
  {
    pages: '**/*.html',
    data: 'data/**/*.{json,js,yml,yaml}',
    styles: 'assets/styles/**/*.scss',
    scripts: 'assets/scripts/**/*.js',
    images: 'assets/images/**/*.{jpg,jpeg,png,gif,svg}',
    fonts: 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
  },
  config.paths
)

module.exports = config
