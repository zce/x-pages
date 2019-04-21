const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
}

module.exports = dir => {
  dir = path.resolve(dir)
  const data = {}

  try {
    fs.readdirSync(dir).forEach(item => {
      const ext = path.extname(item)
      const key = path.basename(item, ext)
      const itemPath = path.join(dir, item)
      if (fs.statSync(itemPath).isFile()) {
        if (!parsers[ext]) return
        const content = fs.readFileSync(path.join(dir, item), 'utf8')
        data[key] = parsers[ext](content)
      } else {
        data[key] = load(itemPath)
      }
    })
  } catch (e) {}

  return data
}
