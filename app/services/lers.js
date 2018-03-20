import Service, { inject as service } from '@ember/service';
import { isEqual } from '@ember/utils';

const ATTRIBUTE = 'attribute';
const CONCEPT = 'concept';
const DECISION = 'decision';
const RULE = 'rule';

export default Service.extend({

  /**
   * The set theory service.
   *
   * @private
   * @property setTheory
   * @type {Object}
   */
  setTheory: service(),

  /**
   * Determine whether an attribute value is lost.
   *
   * @private
   * @function isLost
   * @param {string} attributeValue - the attribute value.
   * @return {boolean}
   */
  isLost(attributeValue = '') {
    return isEqual(attributeValue, '?');
  },

  /**
   * Determine whether an attribute value is "do not care".
   *
   * @private
   * @function isDoNotCare
   * @param {string} attributeValue - the attribute value.
   * @return {boolean}
   */
  isDoNotCare(attributeValue = '') {
    return isEqual(attributeValue, '*');
  },

  /**
   * Determine whether an attribute value is "attribute-concept".
   *
   * @private
   * @function isAttributeConcept
   * @param {string} attributeValue - the attribute value.
   * @return {boolean}
   */
  isAttributeConcept(attributeValue = '') {
    return isEqual(attributeValue, '-');
  },

  /**
   * Determine whether an attribute value is missing.
   *
   * @private
   * @function isMissing
   * @param {string} attributeValue - the attribute value.
   *
   * @return {boolean}
   */
  isMissing(attributeValue = '') {
    return this.isLost(attributeValue) || this.isDoNotCare(attributeValue) || this.isAttributeConcept(attributeValue);
  },

  /**
   * Print the appropriate LERS entitiy.
   *
   * @private
   * @function toString
   *
   * @return {string}
   */
  toString(entity = '', type = ATTRIBUTE) {
    switch (type) {
      case ATTRIBUTE:
        return this.attributeToString(entity);
      case CONCEPT:
        return this.conceptToString(entity);
      case DECISION:
        return this.decisionToString(entity);
      case RULE:
        return this.ruleToString(entity);
      default:
        return '';
    }
  },

  /**
   * Print rule.
   *
   * @private
   * @function toString
   *
   * @return {string}
   */
  ruleToString(ruleSet) {
    // concatinate attribute-value pairs
    let attributes = ruleSet.get('attributes').reduce((attributes, attribute) => {
      attributes = isEqual(attributes, '') ? attribute.toString() : `${attributes} & ${attribute.toString()}`;

      return attributes;
    }, '');

    return `${attributes} -> ${this.get('decision').toString()}`;
  }
});
