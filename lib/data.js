const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const cwd = process.cwd()

const data = {}

try {
  const files = fs.readdirSync(path.join(cwd, 'data'))
  files.forEach(item => {
    const ext = path.extname(item)
    const key = path.basename(item, ext)

    switch (ext) {
      case '.js':
      case '.json':
        data[key] = require(path.join(cwd, 'data', item))
        break
      case '.yml':
      case '.yaml':
        data[key] = ryaml.load(fs.readFileSync(path.join(cwd, 'data', item), 'utf8'))
        break
    }
  })
} catch (e) {}

module.exports = data
