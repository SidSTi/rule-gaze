import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  filename: attr('string'),
  filesize: attr('string'),
  url: attr('string'),
  content: attr('string')
});
