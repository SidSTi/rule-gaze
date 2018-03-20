import DS from 'ember-data';
import { isEqual } from '@ember/utils';

const { belongsTo, hasMany, Model } = DS;

export default Model.extend({
  attributes: hasMany('attribute'),
  decision  : belongsTo('decision'),

  /**
   * Print rule.
   *
   * @private
   * @function toString
   *
   * @return {string}
   */
  toString() {
    // concatinate attribute-value pairs
    let attributes = this.get('attributes').reduce((attributes, attribute) => {
      attributes = isEqual(attributes, '') ? attribute.toString() : `${attributes} & ${attribute.toString()}`;

      return attributes;
    }, '');

    return `${attributes} -> ${this.get('decision').toString()}`;
  }
});