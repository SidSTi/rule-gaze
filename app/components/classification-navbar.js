import Component from '@ember/component';

export default Component.extend({

  /**
   * Set the default class names for this component
   *
   * @private
   * @property classNames
   * @type {string[]}
   */
  classNames: ['classification-navbar','navigation', 'navbar', 'fixed-bottom', 'navbar-footer'],

  /**
   * Set the default tag name for this component
   *
   * @private
   * @property tagName
   * @type {string}
   */
  tagName: 'nav',

  /**
   * Stores the setting for Matching Factor.
   *
   * @public
   * @property shouldUseMatchingFactor
   * @type {boolean}
   */
  shouldUseMatchingFactor: true,

  /**
   * Stores the setting for Strength Factor.
   *
   * @public
   * @property shouldUseConditionalProbability
   * @type {boolean}
   */
  shouldUseConditionalProbability: true,

  /**
   * Stores the setting for Specificity Factor.
   *
   * @public
   * @property shouldUseSpecificityReturnFactor
   * @type {boolean}
   */
  shouldUseSpecificityReturnFactor: true,

  /**
   * Stores the setting for Support from other rules.
   *
   * @public
   * @property shouldUseSupportFromOtherRules
   * @type {boolean}
   */
  shouldUseSupportFromOtherRules: true
});
