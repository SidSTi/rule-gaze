import DS from 'ember-data';

const { attr, belongsTo, hasMany, Model } = DS;

export default Model.extend({
  name : attr('string'),
  value: attr('string'),
  type : attr('string'),
  case : belongsTo('case'),
  rules : hasMany('rule'),

  /**
   * Print decision.
   *
   * @private
   * @function toString
   * @return {string}
   */
  toString() {
    return `(${this.get('name')}, ${this.get('value')})`;
  }
});
