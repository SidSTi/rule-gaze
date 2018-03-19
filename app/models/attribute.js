import DS from 'ember-data';
import { readOnly } from '@ember/object/computed';
import { isEqual } from '@ember/utils';

const { attr, belongsTo, Model } = DS;

export default Model.extend({
  name : attr('string'),
  value: attr('string'),
  type : attr('string'),
  case : belongsTo('case'),
  rule : belongsTo('rule'),

  /**
   * Determine whether an attribute value is lost.
   *
   * @private
   * @property isLost
   * @type {boolean}
   */
  isLost: readOnly('value', {
    get() {
      return isEqual(this.get('value'), '?');
    }
  }),

  /**
   * Determine whether an attribute value is "do not care".
   *
   * @private
   * @property isDoNotCare
   * @type {boolean}
   */
  isDoNotCare: readOnly('value', {
    get() {
      return isEqual(this.get('value'), '*');
    }
  }),

  /**
   * Determine whether an attribute value is "attribute-concept".
   *
   * @private
   * @property isAttributeConcept
   * @type {boolean}
   */
  isAttributeConcept: readOnly('value', {
    get() {
      return isEqual(this.get('value'), '-');
    }
  }),

  /**
   * Determine whether an attribute value is missing.
   *
   * @private
   * @property isMissing
   * @type {boolean}
   */
  isMissing: readOnly('isLostValue', 'isDoNotCareValue', 'isAttributeConceptValue', {
    get() {
      return this.get('isLostValue') && this.get('isDoNotCareValue') && this.get('isAttributeConceptValue');
    }
  })

});
