/**
 * Site variables
 * @type {Object}
 * @example
 *   {{ site.<property> }}
 */
module.exports = {
  /**
   * Site title
   * @type {String}
   * @example
   *   {{ site.title }}
   */
  title: 'x-pages-example',

  /**
   * Site url
   * @type {String}
   * @example
   *   {{ site.url }}
   */
  url: 'http://example.com',

  /**
   * Exclude list
   * @type {Array}
   */
  exclude: [
    '.gitignore',
    'README.md'
  ]
}
