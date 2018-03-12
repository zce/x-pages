const path = require('path')
const moment = require('moment')
const hbs = require('handlebars')

const blocks = {}

module.exports = config => {
  /**
   * asset helper
   */
  hbs.registerHelper('asset', (uri, opts) => {
    return `${path.basename(config.assets)}/${uri}`
  })

  /**
   * url helper
   * @todo relative url
   */
  hbs.registerHelper('url', (uri, opts) => {
    uri = opts ? uri : '/'
    return uri.startsWith('/') ? uri.substr(1) : uri
  })

  /**
   * equal helper
   */
  hbs.registerHelper('equal', (a, b, opts) => {
    if (!opts) throw new Error('Handlebars Helper `equal` needs 2 parameters')
    return a === b ? opts.fn(opts.data.root) : opts.inverse(opts.data.root)
  })

  /**
   * assert helper
   */
  hbs.registerHelper('assert', (value, a, b, opts) => {
    return new hbs.SafeString(value ? a : b)
  })

  /**
   * date helper
   */
  hbs.registerHelper('date', (format, opts) => {
    return moment().format(format)
  })

  /**
   * block helper
   */
  hbs.registerHelper('block', (key, opts) => {
    const block = blocks[key] = blocks[key] || []
    if (opts.fn) {
      block.push(opts.fn(opts.data.root))
    } else {
      delete blocks[key]
      return new hbs.SafeString(block.join('\n'))
    }
  })
}
