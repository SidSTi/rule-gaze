import DS from 'ember-data';

const { attr, belongsTo, Model } = DS;

export default Model.extend({
  name : attr('string'),
  value: attr('string'),
  type : attr('string'),
  case : belongsTo('case'),
  rule : belongsTo('rule')
});