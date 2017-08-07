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

  return through.obj((file, encoding, callback) => {
    try {
      const content = fm(file.contents.toString(encoding))
      const template = hbs.compile(content.body)
      let output = template({}, { data: { site: config, page: content.attributes } })

      // try to find layout
      if (content.attributes.layout) {
        const parentPath = path.join(config.layouts, content.attributes.layout + '.html')
        const parentContent = fm(fs.readFileSync(parentPath, 'utf8'))
        const parentTemplate = hbs.compile(parentContent.body)
        output = parentTemplate({ body: new hbs.SafeString(output) }, { data: { site: config, page: content.attributes } })
      }

      file.contents = Buffer.from(output)
      callback(null, file)
    } catch (e) {
      callback(e)
    }
  })
}
