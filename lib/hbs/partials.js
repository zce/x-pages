const fs = require('fs')
const path = require('path')
const glob = require('glob')
const hbs = require('handlebars')
const partials = {}

module.exports = config => {
  glob.sync('**/*.html', { cwd: config.partials })
    .map(item => path.join(config.partials, item))
    .forEach(item => {
      partials[path.basename(item, '.html')] = fs.readFileSync(item, 'utf8')
    })

  hbs.registerPartial(partials)
}
