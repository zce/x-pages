/**
 * Site variables
 * @type {Object}
 * @example
 *   {{@site.<property>}}
 */
module.exports = {
  /**
   * Site title
   * @type {String}
   * @example
   *   {{@site.title}}
   */
  title: 'awesome x-pages',
  /**
   * Site url
   * @type {String}
   * @example
   *   {{@site.url}}
   */
  url: 'http://example.me/',
  /**
   * Exclude list
   * @type {Array}
   */
  exclude: [
    'README.md'
  ]
}
