import path from 'path'

module.exports = {
  process (_sourceText, sourcePath, _options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`
    }
  }
}