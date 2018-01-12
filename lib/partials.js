const fs = require('fs')
const path = require('path')
const glob = require('glob')
const hbs = require('handlebars')

const partials = {}

module.exports = config => {
  glob.sync('**/*.html', { cwd: config.partials })
    .forEach(item => {
      partials[item.replace('.html', '')] = fs.readFileSync(path.join(config.partials, item), 'utf8')
    })

  hbs.registerPartial(partials)
}
