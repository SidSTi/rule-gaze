import Component from '@ember/component';

export default Component.extend({

  /**
   * Set the default class names for this component
   *
   * @public
   * @property classNames
   * @type {string[]}
   */
  classNames: ['visualization-container'],

  /**
   * Stores the LERS based classified data
   *
   * @public
   * @property LERS
   * @type {LERS}
   */
  LERS: null
});
