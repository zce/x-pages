const fs = require('fs')
const path = require('path')

const fm = require('front-matter')
const hbs = require('handlebars')
const through = require('through2')

const registerPartial = require('./partials')
const registerHelper = require('./helpers')

module.exports = config => {
  registerHelper(config)

  registerPartial(config)

  const site = Object.assign({}, config)
  const page = Object.assign({}, config.defaults)

  const renderLayout = (layout, body) => {
    const content = fm(fs.readFileSync(path.join(config.layouts, layout + '.html'), 'utf8'))

    Object.assign(page, content.attributes)

    const template = hbs.compile(content.body)

    page.body = new hbs.SafeString(body)

    let result = template(page, { data: { site } })

    if (content.attributes.layout) {
      result = renderLayout(content.attributes.layout, result)
    }

    return result
  }

  return through.obj((file, encoding, callback) => {
    try {
      const content = fm(file.contents.toString(encoding))

      Object.assign(page, content.attributes)

      const template = hbs.compile(content.body)

      let result = template(page, { data: { site } })

      // try to find layout
      if (content.attributes.layout) {
        result = renderLayout(content.attributes.layout, result)
      }

      file.contents = Buffer.from(result)

      callback(null, file)
    } catch (e) {
      callback(e)
    }
  })
}
