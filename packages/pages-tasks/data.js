const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const jsParser = filename => {
  delete require.cache[filename]
  return require(filename)
}

const yamlParser = filename => yaml.load(fs.readFileSync(filename, 'utf8'))

const parsers = {
  '.json': jsParser,
  '.js': jsParser,
  '.yml': yamlParser,
  '.yaml': yamlParser
}

const loadData = dir => {
  dir = path.resolve(dir)
  const data = {}
  try {
    fs.readdirSync(dir).forEach(item => {
      const ext = path.extname(item)
      const key = path.basename(item, ext)
      const itemPath = path.join(dir, item)
      if (fs.statSync(itemPath).isFile()) {
        if (!parsers[ext]) return
        data[key] = parsers[ext](path.join(dir, item))
      } else {
        data[key] = loadData(itemPath)
      }
    })
  } catch (e) {}
  return data
}

module.exports = loadData
