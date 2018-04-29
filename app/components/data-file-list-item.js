import Component from '@ember/component';

export default Component.extend({

  /**
   * Set the default class names for this component
   *
   * @public
   * @property classNames
   * @type {string[]}
   */
  classNames: ['data-file-list-item', 'list-group-item', 'd-flex', 'align-items-center'],

  /**
   * Set the default tag name for this component
   *
   * @public
   * @property tagName
   * @type {string}
   */
  tagName: 'li'
});
