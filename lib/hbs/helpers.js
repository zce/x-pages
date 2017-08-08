const path = require('path')
const moment = require('moment')
const hbs = require('handlebars')

const blocks = {}

module.exports = config => {
  hbs.registerHelper('asset', (uri, options) => {
    return `${path.basename(config.assets)}/${uri}`
  })

  hbs.registerHelper('url', (uri, options) => {
    return uri
  })

  hbs.registerHelper('date', (format, options) => {
    return moment().format(format)
  })

  hbs.registerHelper('block', (key, context) => {
    const block = blocks[key] = blocks[key] || []
    if (context.fn) {
      block.push(context.fn(this))
    } else {
      delete blocks[key]
      return new hbs.SafeString(block.join('\n'))
    }
  })
}
